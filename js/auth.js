// js/auth.js (replace existing file with this)
import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

import {
  getFirestore,
  doc,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

// init firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// small UI toast (non-blocking)
function toast(msg, level = 'info') {
  console.log(`[toast ${level}]`, msg);
  // fallback to alert for visibility if no custom UI exists
  // but prefer console for debugging
  if (typeof window !== 'undefined' && window.alert) {
    // only show alert for errors to avoid annoyance
    if (level === 'error') alert(msg);
  }
}

function isPasswordStrong(pw) {
  return typeof pw === 'string' && pw.length >= 6;
}

// Wait for DOM load so elements exist
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const gBtn = document.getElementById('googleSignIn');
    const emailForm = document.getElementById('emailSignIn');
    const signupBtn = document.getElementById('signupBtn');
    const enterApp = document.getElementById('enterApp');
    const displayNameInput = document.getElementById('displayName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signOutBtn = document.getElementById('signOut');

    console.log('auth.js: DOM loaded, wiring handlers...', { gBtn, emailForm, signupBtn });

    if (gBtn) {
      gBtn.addEventListener('click', async () => {
        try {
          await signInWithPopup(auth, provider);
          toast('Signed in with Google!');
        } catch (e) {
          console.error('Google sign-in error:', e);
          toast(e.message || 'Google sign-in failed', 'error');
        }
      });
    }

    if (emailForm) {
      emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (emailInput?.value || '').trim();
        const password = passwordInput?.value || '';
        if (!email || !password) {
          toast('Enter email and password.', 'error');
          return;
        }
        try {
          await signInWithEmailAndPassword(auth, email, password);
          toast('Signed in successfully!');
        } catch (err) {
          console.error('Email sign-in failed:', err);
          toast(err.message || 'Sign-in failed', 'error');
        }
      });
    }

    if (signupBtn) {
      signupBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const name = (displayNameInput?.value || '').trim();
        const email = (emailInput?.value || '').trim();
        const password = passwordInput?.value || '';

        if (!email || !password) {
          toast('Enter email and password to sign up.', 'error');
          return;
        }
        if (!isPasswordStrong(password)) {
          toast('Password too weak. Use at least 6 characters.', 'error');
          return;
        }

        try {
          console.log('Creating user with email:', email);
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log('User created:', user.uid);

          if (name) {
            try {
              await updateProfile(user, { displayName: name });
              console.log('Auth profile updated with displayName:', name);
            } catch (uErr) {
              console.warn('updateProfile failed:', uErr);
            }
          }

          // create Firestore user doc
          try {
            await setDoc(doc(db, 'users', user.uid), {
              displayName: name || null,
              email: user.email,
              createdAt: new Date().toISOString()
            });
            console.log('Firestore user profile created');
          } catch (dbErr) {
            console.warn('Could not create user profile in Firestore:', dbErr);
          }

          toast('Account created! You are now signed in.');
        } catch (e) {
          console.error('Sign up failed:', e);
          toast(e.message || 'Sign up failed', 'error');
        }
      });
    }

    if (signOutBtn) {
      signOutBtn.addEventListener('click', async () => {
        try {
          await signOut(auth);
          window.location = 'index.html';
        } catch (e) {
          console.error('Sign out error:', e);
          toast('Sign out failed: ' + (e.message || e), 'error');
        }
      });
    }

    // Update UI on auth change
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log('Auth state changed: signed-in', user.uid, user.email, user.displayName);
        if (enterApp) enterApp.classList.remove('hidden');
        const nameEls = document.querySelectorAll('.user-name');
        nameEls.forEach(el => el.textContent = user.displayName || user.email || 'You');
      } else {
        console.log('Auth state: signed-out');
        const current = window.location.pathname.split('/').pop();
        if (current !== 'index.html' && current !== '') {
          window.location = 'index.html';
        }
      }
    });
  });
}
