
// eslint-disable-next-line max-classes-per-file

export const initializeApp = (secret) => ({});
export const getDatabase = (initializeAppObject) => ({});
export const getAuth = (initializeAppObject) => ({});
export const createUserWithEmailAndPassword = (auth, email, password) => {
  const userCredentials = {
    user: { uid: '123' },
  };
  if (email === 'hola@gmail.com') {
    const error = {
      code: 'auth/email-already-in-use',
    };
    return Promise.reject(error);
  }
  return Promise.resolve(userCredentials);
};

export const ref = jest.fn((database, user) => ({}));

export const set = (ref) => ({});

export class GoogleAuthProvider {
  constructor() {
    this.id = 'google.com';
  }
}

export const signInWithPopup = jest.fn((auth, provider) => Promise.resolve({}));

export class TwitterAuthProvider {
  constructor() {
    this.id = 'twitter';
  }
}

export class loginUserWithEmail {
  constructor() {
    this.id = 'email';
  }
}

export const signInWithEmailAndPassword = (auth, email, password) => {
  const userCredentials = {
    user: { uid: '123' },
  };
  return Promise.resolve(userCredentials);
};
export const ref = jest.fn((database, user) => ({}));
export const update = (ref) => ({});

