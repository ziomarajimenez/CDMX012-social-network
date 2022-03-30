import {
  getFirestore, collection, addDoc, getAuth, serverTimestamp, getDocs,
} from './firebase-import.js';

const db = getFirestore();

export const post = (text) => {
  const db = getFirestore();
  const auth = getAuth();
  const userlogin = auth.currentUser;
  const uid = userlogin.uid;
  addDoc(collection(db, 'Posts'), {
    text, uid, likes: [], timestamp: serverTimestamp(),
  });
};
export const getPost = () => getDocs(collection(db, 'Posts'));

// const publi = doc(db, 'Posts');
// console.log(publi);

// import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
// const db = getFirestore();
// // Add a new document in collection "cities"
// export const post = async (text) => {
//   const uid = userlogin.uid;
//   await setDoc(doc(db, 'Posteo'), {
//     text,
//     uid,
//     likes: [],
//     timestamp: serverTimestamp(),
//   });
// };
