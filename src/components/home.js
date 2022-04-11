/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import { onNavigate } from '../main.js';
import {
  post, getPost, getPostEdit, updateText, db, likes, dislike,
} from '../database/firestore.js';
import { doc, deleteDoc } from '../database/firebase-import.js';
import { logOut } from '../database/firebase.js';
import { createModal } from './modal.js';

let localDoc;
export const renderPost = async () => {
  const posts = await getPost();
  const arrayPost = [];
  posts.forEach((doc) => {
    localDoc = { ...doc.data() };
    localDoc.id = doc.id;
    arrayPost.push(localDoc);
  });
  return arrayPost;
};

export const postHome = (displayName, inputHome, isOwner, postId, postLikes) => {
  // Elements
  const postDiv = document.createElement('div');
  const postName = document.createElement('p');
  const postText = document.createElement('textarea');
  const imgPost = document.createElement('img');
  const under = document.createElement('div');
  const update = document.createElement('button');
  const cancel = document.createElement('button');
  const countAndHeart = document.createElement('div');
  const likesCounter = document.createElement('div');
  const heart = document.createElement('img');
  const heartWithLike = document.createElement('img');
  const homeHeader = document.createElement('header');
  const logoHeader = document.createElement('img');
  const divPages = document.createElement('div');
  const btnHome = document.createElement('img');
  const btnProfile = document.createElement('img');
  const btnNotifications = document.createElement('img');
  const btnLogout = document.createElement('img');

  const editPost = document.createElement('img');
  const deletePost = document.createElement('img');
  const options = document.createElement('div');

  // Attributes
  postDiv.setAttribute('class', 'postDiv');
  postName.setAttribute('class', 'postName');
  postText.setAttribute('class', 'postText');
  postText.setAttribute('disabled', 'true');
  imgPost.setAttribute('src', '../assets/img/perfil.webp');
  imgPost.setAttribute('id', 'imgPost');
  editPost.setAttribute('src', '../assets/img/edit.png');
  editPost.setAttribute('id', 'editPost');
  deletePost.setAttribute('src', '../assets/img/delete.png');
  deletePost.setAttribute('id', 'deletePost');
  deletePost.setAttribute('postId', postId);
  options.setAttribute('id', 'options');
  update.setAttribute('type', 'button');
  update.setAttribute('id', 'update');
  update.setAttribute('data-id', postId);
  cancel.setAttribute('type', 'button');
  cancel.setAttribute('id', 'cancel');
  likesCounter.setAttribute('id', 'likesCounter');
  heart.setAttribute('src', '../assets/img/heart.png');
  heart.setAttribute('postId', postId);
  countAndHeart.setAttribute('id', 'countAndHeart');
  heart.setAttribute('id', 'heart');
  heart.setAttribute('class', 'heartLike');
  heart.setAttribute('type', 'submit');
  heartWithLike.setAttribute('src', '../assets/img/like.png');
  heartWithLike.setAttribute('postId', postId);
  heartWithLike.setAttribute('id', 'heartWithLike');
  heartWithLike.setAttribute('class', 'dislike');
  heartWithLike.setAttribute('type', 'submit');
  under.setAttribute('id', 'under');

  // Iner text
  postName.innerText = displayName;
  postText.innerText = inputHome;
  likesCounter.innerText = postLikes.length;
  update.innerText = 'Update';
  cancel.innerText = 'Cancel';

  // Append
  countAndHeart.append(likesCounter, heart);
  under.append(countAndHeart, cancel, update);
  options.appendChild(imgPost);
  if (isOwner) { options.append(editPost, deletePost); }
  postDiv.append(options, postName, postText, under);

  editPost.addEventListener('click', () => {
    postText.removeAttribute('disabled');
    cancel.style.display = 'block';
    update.style.display = 'block';
  });
  update.addEventListener('click', async (event) => {
    postText.setAttribute('disabled', 'true');
    cancel.style.display = 'none';
    update.style.display = 'none';
    const docId = event.target.dataset.id;
    console.log (docId);
    const postEdit = await getPostEdit(docId);
    const postData = postEdit.data();

    postData.text = postText.value;
    updateText(
      docId,
      postData,
    );
  });

  cancel.addEventListener('click', () => {
    postText.setAttribute('disabled', 'true');
    cancel.style.display = 'none';
    update.style.display = 'none';
  });

  // Delete Post
  deletePost.addEventListener('click', (event) => {
    createModal();
    console.log(event.srcElement.attributes.postId.nodeValue);
    document.getElementById('btnDelete').addEventListener('click', async () => {
      await deleteDoc(doc(db, 'Posts', event.srcElement.attributes.postId.nodeValue));
      document.location.reload();
    });
  });

  const actualUser = JSON.parse(sessionStorage.getItem('userData'));
  const containsLikes = postLikes.includes(actualUser.uid);
  if (containsLikes) {
    countAndHeart.removeChild(heart);
    countAndHeart.appendChild(heartWithLike);
  }
  let totalLike;
  heart.addEventListener('click', (event) => {
    likes(event.srcElement.attributes.postid.nodeValue);
    heart.style.display = 'none';
    countAndHeart.appendChild(heartWithLike);
    totalLike = postLikes.length + 1;
    likesCounter.innerText = totalLike;
  });

  heartWithLike.addEventListener('click', (event) => {
    dislike(event.srcElement.attributes.postid.nodeValue);
    countAndHeart.removeChild(heartWithLike);
    heart.style.display = 'block';
    likesCounter.innerText = totalLike - 1;
  });
  return postDiv;
};

export const home = async () => {
  const userlogin = JSON.parse(sessionStorage.getItem('userData'));
  const arrayPost = await renderPost();
  const divHome = document.createElement('div');
  const divPosts = document.createElement('div');
  const inputHome = document.createElement('textarea');
  const btnPost = document.createElement('img');
  const homeHeader = document.createElement('header');
  const logoHeader = document.createElement('img');
  const divPages = document.createElement('div');
  const btnHome = document.createElement('img');
  const btnProfile = document.createElement('img');
  const btnNotifications = document.createElement('img');
  const btnLogout = document.createElement('img');
  const containerPosts = document.createElement('div');

  divHome.setAttribute('id', 'divHome');
  divPosts.setAttribute('class', 'divPosts');
  inputHome.setAttribute('id', 'inputHome');
  inputHome.setAttribute('placeholder', 'Tell us what you are thinking...');
  inputHome.setAttribute('rows', '4');
  inputHome.setAttribute('cols', '50');
  btnPost.setAttribute('id', 'btnPost');
  btnPost.setAttribute('src', '../assets/img/post.png');
  containerPosts.setAttribute('id', 'containerPosts');

  homeHeader.setAttribute('id', 'homeHeader');
  logoHeader.setAttribute('src', '../assets/img/logoymuki.png');
  logoHeader.setAttribute('id', 'logoHeader');
  divPages.setAttribute('id', 'divPages');
  btnHome.setAttribute('src', '../assets/img/home.png');
  btnHome.setAttribute('id', 'btnHome');
  btnProfile.setAttribute('src', '../assets/img/perfil.png');
  btnProfile.setAttribute('id', 'btnProfile');
  btnNotifications.setAttribute('src', '../assets/img/notificaciones.png');
  btnNotifications.setAttribute('id', 'btnNotifications');
  btnLogout.setAttribute('src', '../assets/img/logout.png');
  btnLogout.setAttribute('id', 'btnNotifications');
  const globalContainer = document.getElementById('globalContainer');
  const displayHome = document.createElement('section');
  displayHome.setAttribute = ('id', 'displayHome');

  containerPosts.appendChild(divPosts);
  divPages.append(btnHome, btnProfile, btnNotifications, btnLogout);
  homeHeader.appendChild(logoHeader);
  divHome.append(inputHome, btnPost);
  const actualUser = JSON.parse(sessionStorage.getItem('userData'));
  arrayPost.forEach((post) => {
    const isOwner = actualUser.uid === post.uid;
    const postDiv = postHome(post.displayName, post.text, isOwner, post.id, post.likes);
    divPosts.appendChild(postDiv);
  });

  displayHome.appendChild(homeHeader);
  displayHome.appendChild(divPages);
  displayHome.appendChild(divHome);
  displayHome.appendChild(containerPosts);
  globalContainer.appendChild(displayHome);

  btnPost.addEventListener('click', () => {
    const postDiv = postHome(userlogin.displayName, inputHome.value, true, null, 'id 1234');
    const toShare = inputHome.value;
    post(toShare, userlogin.displayName);
    divPosts.insertBefore(postDiv, divPosts.firstChild);
    inputHome.value = '';
    document.getElementById('likesCounter').innerText = 0;
  });

  function OnInput() {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
  }

  const tx = document.getElementsByTagName('textarea');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', `height:${(tx[i].scrollHeight * 1.1)}px;overflow-y:hidden;`);
    tx[i].addEventListener('input', OnInput, false);
  }

  btnLogout.addEventListener('click', () => {
    logOut().then(() => {
      onNavigate('/');
    });
  });
};
