/* eslint-disable import/named */
import {
  getFirestore, collection, addDoc, getAuth, serverTimestamp, getDocs, query, where, orderBy,
  updateDoc, doc, arrayUnion, arrayRemove, getDoc,
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

export const likes = async (postId) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    const postCollection = doc(db, 'Posts', postId);
    await updateDoc(postCollection, {
      likes: arrayUnion(userId),
    });
    console.log('si dio like');
  }
};

export const dislike = async (postId) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    const postCollection = doc(db, 'Posts', postId);
    // console.log(postCollection);
    await updateDoc(postCollection, {
      likes: arrayRemove(userId),
    });
    console.log('Quitó el like');
  }
};

export const getPostEdit = (id) => getDoc(doc(db, 'Posts', id));
export const updateText = (id, newFields) => updateDoc(doc(db, 'Posts', id), newFields);
