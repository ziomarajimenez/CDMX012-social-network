/* eslint-disable prefer-promise-reject-errors */
// eslint-disable-next-line max-classes-per-file
export const initializeApp = (secret) => ({});
export const getDatabase = (initializeAppObject) => ({});
export const getAuth = (initializeAppObject) => ({});
export const createUserWithEmailAndPassword = (auth, email, password) => {
  const userCredential = {
    user: { uid: '123' },
  };
  if (email === 'hola@gmail.com') {
    const error = {
      code: 'auth/email-already-in-use',
    };
    return Promise.reject(error);
  }
  return Promise.resolve(userCredential);
};

export const set = (ref) => ({});

export const signInWithPopup = jest.fn((auth, provider) =>

  new Promise((resolve, reject) => {
    resolve({ user: 'álgo' });
  }));

export class loginUserWithEmail {
  constructor() {
    this.id = 'email';
  }
}

// Mock logIn
export const signInWithEmailAndPassword = (auth, email, password) => {
  const userCredential = {
    user: { uid: '123' },
  };
  if (email === 'rs5@gmail.com') {
    const error = {
      code: 'auth/user-not-found',
    };
    return Promise.reject(error);
  }
  return Promise.resolve(userCredential);
};
export const ref = jest.fn((database, user) => ({}));
export const update = (ref) => ({});

export const Date = () => ({});

export class GoogleAuthProvider {
  constructor() {
    this.id = 'google.com';
  }

  static credentialFromResult(userCredential) {
    return { accessToken: 123 };
  }
}

export class TwitterAuthProvider {
  constructor() {
    this.id = 'twitter';
  }

  static credentialFromResult(userCredential) {
    return { accessToken: '123' };
  }
}
