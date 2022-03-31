/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import { onNavigate } from '../main.js';
import { post, getPost } from '../database/firestore.js';
import { logOut } from '../database/firebase.js';

const renderPost = async () => {
  const posts = await getPost();
  // console.log(posts);
  const arrayPost = [];
  posts.forEach((doc) => {
    arrayPost.push(doc.data());
    // console.log(doc.data());
  });
  return arrayPost;
};
const postHome = (displayName, inputHome) => {
  // Elements
  const postDiv = document.createElement('div');
  const postName = document.createElement('p');
  const postText = document.createElement('p');
  const imgPost = document.createElement('img');
  const options = document.createElement('img');
  const under = document.createElement('div');
  const coment = document.createElement('img');
  const countAndHeart = document.createElement('div');
  const likesCounter = document.createElement('div');
  const heart = document.createElement('img');
  const homeHeader = document.createElement('header');
  const logoHeader = document.createElement('img');
  const divPages = document.createElement('div');
  const btnHome = document.createElement('img');
  const btnProfile = document.createElement('img');
  const btnNotifications = document.createElement('img');
  const btnLogout = document.createElement('img');

  // Attributes
  postDiv.setAttribute('class', 'postDiv');
  postName.setAttribute('class', 'postName');
  postText.setAttribute('class', 'postText');
  imgPost.setAttribute('src', '../assets/img/perfil.webp');
  imgPost.setAttribute('id', 'imgPost');
  options.setAttribute('src', '../assets/img/three.png');
  options.setAttribute('id', 'options');
  coment.setAttribute('src', '../assets/img/coment.png');
  coment.setAttribute('id', 'coment');
  likesCounter.setAttribute('id', 'likesCounter');
  heart.setAttribute('src', '../assets/img/heart.png');
  countAndHeart.setAttribute('id', 'countAndHeart');
  heart.setAttribute('id', 'heart');
  under.setAttribute('id', 'under');

  // Iner text
  postName.innerText = displayName;
  postText.innerText = inputHome;
  likesCounter.innerText = '5';

  // Append
  countAndHeart.append(likesCounter, heart);
  under.append(coment, countAndHeart);
  postDiv.append(options, imgPost, postName, postText, under);

  return postDiv;
};

export const home = async () => {
  const userlogin = JSON.parse(sessionStorage.getItem('userData'));
  const arrayPost = await renderPost();
  const divHome = document.createElement('div');
  const imgUser = document.createElement('img');
  const divPosts = document.createElement('div');
  const inputHome = document.createElement('input');
  const buttonHome = document.createElement('button');
  const homeHeader = document.createElement('header');
  const logoHeader = document.createElement('img');
  const divPages = document.createElement('div');
  const btnHome = document.createElement('img');
  const btnProfile = document.createElement('img');
  const btnNotifications = document.createElement('img');
  const btnLogout = document.createElement('img');

  divHome.setAttribute('id', 'divHome');
  imgUser.setAttribute('src', '../assets/img/perfil.webp');
  imgUser.setAttribute('id', 'imgUser');
  divPosts.setAttribute('class', 'divPosts');
  inputHome.setAttribute('id', 'inputHome');
  inputHome.setAttribute('placeholder', 'Tell us what you are thinking');
  buttonHome.setAttribute('id', 'buttonHome');

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

  divPages.append(btnHome, btnProfile, btnNotifications, btnLogout);
  homeHeader.appendChild(logoHeader);
  divHome.append(imgUser, inputHome, buttonHome);
  console.log(arrayPost);
  arrayPost.forEach((post) => {
    const postDiv = postHome(post.displayName, post.text);
    divPosts.appendChild(postDiv);
  });

  globalContainer.appendChild(homeHeader);
  globalContainer.appendChild(divPages);
  globalContainer.appendChild(divHome);
  globalContainer.appendChild(divPosts);

  buttonHome.textContent = 'Post';
  buttonHome.addEventListener('click', () => {
    const postDiv = postHome(userlogin.displayName, inputHome.value);
    const toShare = inputHome.value;
    post(toShare, userlogin.displayName);
    divPosts.appendChild(postDiv);
    inputHome.value = '';
    // onNavigate('/home');
  });

  btnLogout.addEventListener('click', () => {
    logOut().then(() => {
      onNavigate('/');
    });
  });
  // return divHome;
};
