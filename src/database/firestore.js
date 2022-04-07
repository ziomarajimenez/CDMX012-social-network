import {
  getFirestore, collection, addDoc, getAuth, serverTimestamp, getDocs, query, where, orderBy,
  updateDoc, doc, arrayUnion, arrayRemove,
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
// export const getPost = () => getDocs(collection(db, 'Posts'));

export const getPost = async () => {
  const postRef = collection(db, 'Posts');
  const orderPost = await getDocs(query(postRef, orderBy('timestamp', 'desc')));
  return orderPost;
};

// const data = collection
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

export const likeCounter = () => getDoc(collection(db, 'Posts'), {
  likes: [],
});

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
