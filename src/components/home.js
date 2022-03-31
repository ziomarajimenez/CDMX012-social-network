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
  // Attributes
  postDiv.setAttribute('class', 'postDiv');
  postName.setAttribute('class', 'postName');
  postText.setAttribute('class', 'postText');
  imgPost.setAttribute('src', '../assets/img/perfil.webp');

  // Iner text
  postName.innerText = displayName;
  postText.innerText = inputHome;

  // Append
  postDiv.appendChild(imgPost);
  postDiv.appendChild(postName);
  postDiv.appendChild(postText);

  return postDiv;
};
export const home = async () => {
  const userlogin = JSON.parse(sessionStorage.getItem('userData'));
  const arrayPost = await renderPost();
  const divHome = document.createElement('div');
  const divPosts = document.createElement('div');
  const inputHome = document.createElement('input');
  const buttonHome = document.createElement('button');
  const buttonLogOut = document.createElement('button');

  divHome.setAttribute('id', 'divHome');
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
  globalContainer.append(homeHeader, divPages, divHome);
  divHome.append(imgUser, inputHome, buttonHome);
  globalContainer.appendChild(divPosts);

  console.log(arrayPost);
  arrayPost.forEach((post) => {
    const postDiv = postHome(post.displayName, post.text);
    divPosts.appendChild(postDiv);
  });
  buttonHome.textContent = 'Post';
  buttonHome.addEventListener('click', () => {
    const postDiv = postHome(userlogin.displayName, inputHome.value);
    const toShare = inputHome.value;
    post(toShare, userlogin.displayName);
    divPosts.appendChild(postDiv);
    inputHome.value = '';
    // onNavigate('/home');
  });

  buttonLogOut.addEventListener('click', () => {
    logOut().then(() => {
      onNavigate('/');
    });
  });
};
