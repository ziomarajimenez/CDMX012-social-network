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

const postHome = (userlogin, inputHome) => {
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
  postName.innerText = userlogin.displayName;
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
  buttonHome.setAttribute('id', 'buttonHome');
  buttonLogOut.setAttribute('id', 'buttonLogOut');

  divHome.appendChild(inputHome);
  divHome.appendChild(buttonHome);
  divHome.appendChild(buttonLogOut);
  divHome.appendChild(divPosts);
  console.log(arrayPost);
  arrayPost.forEach((post) => {
    const postDiv = postHome(userlogin, post.text);
    divPosts.appendChild(postDiv);
  });
  buttonHome.textContent = 'Click here';
  buttonLogOut.textContent = 'LOGOUT';
  buttonHome.addEventListener('click', () => {
    const postDiv = postHome(userlogin, inputHome.value);
    const toShare = inputHome.value;
    post(toShare);
    divPosts.appendChild(postDiv);
    // onNavigate('/home');
  });

  buttonLogOut.addEventListener('click', () => {
    logOut().then(() => {
      onNavigate('/');
    });
  });
  return divHome;
};
