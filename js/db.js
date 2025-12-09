import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, getDoc, query, where, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { auth } from './auth.js';


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// helpers
export const dayDocRef = (uid, dateStr) => doc(db, `users/${uid}/days`, dateStr);
export const activitiesCollectionRef = (uid, dateStr) => collection(db, `users/${uid}/days/${dateStr}/activities`);


// Add activity
export async function addActivity(uid, dateStr, activity) {
const col = activitiesCollectionRef(uid, dateStr);
await addDoc(col, activity);
}


// get activities
export async function getActivities(uid, dateStr) {
const col = activitiesCollectionRef(uid, dateStr);
const snap = await getDocs(col);
return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}


// delete
export async function deleteActivity(uid, dateStr, id) {
await deleteDoc(doc(db, `users/${uid}/days/${dateStr}/activities`, id));
}


// update
export async function updateActivity(uid, dateStr, id, payload) {
await updateDoc(doc(db, `users/${uid}/days/${dateStr}/activities`, id), payload);
}