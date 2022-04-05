import {
  getFirestore, collection, addDoc, getAuth, serverTimestamp, getDocs,
} from './firebase-import.js';

export const db = getFirestore();

export const post = (text, displayName) => {
  const db = getFirestore();
  const auth = getAuth();
  const userlogin = auth.currentUser;
  const uid = userlogin.uid;
  addDoc(collection(db, 'Posts'), {
    displayName, text, uid, likes: [], timestamp: serverTimestamp(),
  });
};

// const q = query(getPost, orderBy('timestamp'));
export const getPost = () => getDocs(collection(db, 'Posts'));

// export async function getPostInOrder() {
//   try {
//     const q = query(collection(db, 'Posts'), orderBy("timestamp"));
//     const querySnapshot = await getDocs(q);
//     return querySnapshot;
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
//   getPostInOrder();
// }

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
