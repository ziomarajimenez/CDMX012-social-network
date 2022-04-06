/* eslint-disable import/named */
import {
  getFirestore, collection, addDoc, getAuth, serverTimestamp, getDocs, query, orderBy, getDoc, doc, updateDoc,
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

export const getPost = async () => {
  const postRef = collection(db, 'Posts');
  const orderPost = await getDocs(query(postRef, orderBy('timestamp', 'desc')));
  return orderPost;
};

export const getPostEdit = (id) => getDoc(doc(db, 'Posts', id));
export const updateText = (id, newFields) => updateDoc(doc(db, 'Posts', id), newFields);

