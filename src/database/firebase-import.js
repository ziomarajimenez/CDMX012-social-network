/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
export { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
export {
  getDatabase, set, ref, update,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js';
export {
  getAuth, createUserWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup, TwitterAuthProvider, signInWithEmailAndPassword, signInWithRedirect,
  getRedirectResult, signOut, onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
export {
  getFirestore, collection, addDoc, getDocs, getDoc, serverTimestamp, doc, increment,
  deleteDoc, query, where, orderBy, updateDoc, arrayUnion, arrayRemove,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
