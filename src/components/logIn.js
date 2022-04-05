/* eslint-disable import/no-cycle */
// // eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { loginUserWithEmail, loginUserWithGoogle, loginUserWithTwitter } from '../database/firebase.js';

export const login = () => {
  // elements
  const globalContainer = document.getElementById('globalContainer');
  const pinkContainerLogin = document.createElement('div');
  const pinkTextOne = document.createElement('div');
  const pinkTexTwo = document.createElement('div');
  const pinkTextThree = document.createElement('div');
  const imgTextOne = document.createElement('img');
  const imgTextTwo = document.createElement('img');
  const imgTextThree = document.createElement('img');
  const globalLogInDiv = document.createElement('div');
  const header = document.createElement('header');
  const imgLogo = document.createElement('img');
  const divLogo = document.createElement('div');
  const pLogo = document.createElement('p');
  const baseLogin = document.createElement('div');
  const pLogin = document.createElement('p');
  const pLoginMovil = document.createElement('p');
  const loginEmail = document.createElement('input');
  const loginPassword = document.createElement('input');
  const spanLoginPassword = document.createElement('span');
  const imgEyePassword = document.createElement('i');
  const pForgotPassword = document.createElement('p');
  const errorMessage = document.createElement('div');
  const buttonLogin = document.createElement('button');
  const divLoginWith = document.createElement('div');
  const loginWithP = document.createElement('p');
  const divButtons = document.createElement('div');
  const loginWithGoogle = document.createElement('button');
  const loginWithTwitter = document.createElement('button');
  const imgGoogle = document.createElement('img');
  const imgTwitter = document.createElement('img');
  const divSignUp = document.createElement('div');
  const pSignUp = document.createElement('p');

  // attributes
  imgLogo.setAttribute('src', '../assets/img/logosmall.png');
  pLogo.setAttribute('class', 'pLogo');
  divLogo.setAttribute('id', 'divLogo');
  imgLogo.setAttribute('src', '../assets/img/logosmall.png');
  pinkContainerLogin.setAttribute('class', 'pinkContainerLogin');
  pinkTextOne.setAttribute('class', 'pinkTextOneAndThree');
  imgTextOne.setAttribute('src', '../assets/img/mujeres.png');
  imgTextOne.setAttribute('class', 'imgTextPink');
  imgTextTwo.setAttribute('class', 'imgTextPink');
  imgTextThree.setAttribute('class', 'imgTextPink');
  imgTextTwo.setAttribute('src', '../assets/img/pensamiento.png');
  imgTextThree.setAttribute('src', '../assets/img/unidas.png');
  pinkTexTwo.setAttribute('class', 'pinkTextTwo');
  pinkTextThree.setAttribute('class', 'pinkTextOneAndThree');
  globalLogInDiv.setAttribute('class', 'globalLogInDiv');
  baseLogin.setAttribute('class', 'baseLogin');
  pLogin.setAttribute('class', 'pLogin');
  pLoginMovil.setAttribute('class', 'pLoginMovil');
  loginPassword.setAttribute('class', 'inputLogin');
  loginPassword.setAttribute('type', 'password');
  loginPassword.setAttribute('placeholder', 'Password');
  loginPassword.setAttribute('id', 'loginPassword');
  loginEmail.setAttribute('type', 'text');
  loginEmail.setAttribute('class', 'inputLogin');
  loginEmail.setAttribute('placeholder', 'Email');
  loginEmail.setAttribute('id', 'loginEmail');

  spanLoginPassword.setAttribute('class', 'eyePassword');
  imgEyePassword.setAttribute('id', 'imgEyePassword2');
  imgEyePassword.setAttribute('class', 'fa-solid fa-eye');

  pForgotPassword.setAttribute('class', 'pForgotPassword');
  buttonLogin.setAttribute('class', 'buttonLogin');
  divLoginWith.setAttribute('class', 'divLoginWith');
  loginWithP.setAttribute('class', 'loginWithP');
  divButtons.setAttribute('class', 'divButtons');
  loginWithGoogle.setAttribute('class', 'loginWith');
  loginWithTwitter.setAttribute('class', 'loginWith');
  loginWithGoogle.setAttribute('id', 'loginGoogle');
  imgGoogle.setAttribute('src', '../assets/img/google-logo.png');
  imgGoogle.setAttribute('id', 'imgGoogle');
  loginWithTwitter.setAttribute('id', 'loginTwitter');
  imgTwitter.setAttribute('src', '../assets/img/logo.png');
  imgTwitter.setAttribute('id', 'imgTwitter');
  errorMessage.setAttribute('id', 'errorMessage');
  divSignUp.setAttribute('id', 'divSignUp');
  pSignUp.setAttribute('class', 'pSignUp');

  // innerText
  divLogo.innerText = 'Mukí';
  pLogo.innerText = 'A safe network for women';
  pinkTextOne.innerText = 'Connect with women from all over the world.';
  pinkTexTwo.innerText = 'Tell us what you think, in a safe space to share ideas.';
  pinkTextThree.innerText = 'Create support networks among women.';
  pLogin.innerText = 'Log in';
  pLoginMovil.innerText = 'Log in';
  buttonLogin.textContent = 'Login';
  pForgotPassword.innerText = 'Forgot password?';
  loginWithP.innerText = 'Or login with';
  divSignUp.innerText = 'You don’t have an account?';
  pSignUp.innerText = 'Sign up';

  // append
  header.appendChild(divLogo);
  header.appendChild(imgLogo);
  divLogo.appendChild(pLogo);
  spanLoginPassword.appendChild(loginPassword);
  spanLoginPassword.appendChild(imgEyePassword);
  globalContainer.appendChild(pinkContainerLogin);
  globalContainer.appendChild(globalLogInDiv);
  pinkContainerLogin.appendChild(pinkTextOne);
  pinkContainerLogin.appendChild(pinkTexTwo);
  pinkContainerLogin.appendChild(pinkTextThree);
  pinkTextOne.appendChild(imgTextOne);
  pinkTexTwo.appendChild(imgTextTwo);
  pinkTextThree.appendChild(imgTextThree);
  globalLogInDiv.appendChild(header);
  globalLogInDiv.appendChild(pLogin);
  globalLogInDiv.appendChild(baseLogin);
  baseLogin.appendChild(pLoginMovil);
  baseLogin.appendChild(loginEmail);
  baseLogin.appendChild(spanLoginPassword);
  baseLogin.appendChild(pForgotPassword);
  baseLogin.appendChild(buttonLogin);
  baseLogin.appendChild(divLoginWith);
  baseLogin.appendChild(errorMessage);
  baseLogin.appendChild(divSignUp);
  divSignUp.appendChild(pSignUp);

  divLoginWith.appendChild(loginWithP);

  divLoginWith.appendChild(divButtons);
  divButtons.appendChild(loginWithGoogle);
  divButtons.appendChild(loginWithTwitter);
  loginWithGoogle.appendChild(imgGoogle);
  loginWithTwitter.appendChild(imgTwitter);
  globalLogInDiv.appendChild(errorMessage);

  buttonLogin.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    loginUserWithEmail(email, password).then((userCredential) => {
      if (userCredential) {
        onNavigate('/home');
      } else {
        errorMessage.innerText = 'Invalid email or password';
      }
    });
  });

  loginWithGoogle.addEventListener('click', () => {
    loginUserWithGoogle().then((result) => {
      if (result) {
        onNavigate('/home');
      }
    });
  });

  loginWithTwitter.addEventListener('click', () => {
    loginUserWithTwitter().then((result) => {
      if (result) {
        onNavigate('/home');
      }
    });
  });

  divSignUp.addEventListener('click', () => {
    onNavigate('/signup');
  });

  imgEyePassword.addEventListener('click', () => {
    if (loginPassword.type === 'password') {
      loginPassword.type = 'text';
    } else {
      loginPassword.type = 'password';
    }
  });

  spanLoginPassword.addEventListener('focus', () => spanLoginPassword.classList.add('focused'), true);
  spanLoginPassword.addEventListener('blur', () => spanLoginPassword.classList.remove('focused'), true);

  return globalLogInDiv;
};
