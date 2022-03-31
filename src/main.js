/* eslint-disable import/no-cycle */
import { login } from './components/logIn.js';
import { signup } from './components/signUp.js';
import { home } from './components/home.js';
import { getAuth, onAuthStateChanged } from './database/firebase-import.js';

const rootDiv = document.getElementById('globalContainer');

export const routes = {
  '/': login,
  '/signup': signup,
  '/home': home,
};

// To navigate in diferent pathnames
export const onNavigate = async (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  const divPage = await routes[pathname]();
  rootDiv.appendChild(divPage);
};

window.onpopstate = async () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  const divPage = await routes[window.location.pathname]();
  rootDiv.appendChild(divPage);
};

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userlogin = auth.currentUser;

    sessionStorage.setItem('userData', JSON.stringify(userlogin));
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // onNavigate('/home');
    // ...
  } else {
    onNavigate('/');
  }
});

const component = routes[window.location.pathname];

const renderRootDiv = async () => {
  const divPage = await component();
  rootDiv.appendChild(divPage);
};

renderRootDiv();
