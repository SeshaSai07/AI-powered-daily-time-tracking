// js/firebase-config.js
// Replace the strings below with the values from your Firebase console web app (Project Settings → Your apps → Firebase SDK snippet)
export const firebaseConfig = {
  apiKey: "AIzaSyD--s9G1Oxynhz29Dt8e89Z3tDWH5wCxFc",
  authDomain: "ai-powered-time-tracking-app.firebaseapp.com",
  projectId: "ai-powered-time-tracking-app",
  storageBucket: "ai-powered-time-tracking-app.firebasestorage.app",
  messagingSenderId: "880436144682",
  appId: "1:880436144682:web:e33b4f193f7304ff3ef153"
};

// at top of js/auth.js, after importing firebaseConfig
function isFirebaseConfigValid(cfg) {
  if (!cfg) return false;
  const keys = ['apiKey','authDomain','projectId','appId'];
  return keys.every(k => typeof cfg[k] === 'string' && cfg[k].length > 5);
}

if (!isFirebaseConfigValid(firebaseConfig)) {
  // Friendly message to user and developer
  const msg = `Firebase config not found or incomplete. 
Please: 1) Create a Firebase Web App in the Firebase console, 
2) copy its config (apiKey, authDomain, projectId, appId, etc.) 
and paste into js/firebase-config.js. 
Also enable Email/Google sign-in and add your localhost as Authorized domain.`;
  console.error(msg);
  // Friendly alert so you see it during development
  alert(msg);
  // Stop further execution so no firebase calls are made with bad config
  throw new Error('Missing Firebase config — see console for instructions.');
}
