import {
  loginUserWithEmail, loginUserWithGoogle,
} from '../../../src/database/firebase.js';
import { signInWithPopup } from '../../../src/database/firebase-import.js';

jest.mock('../../../src/database/firebase-import.js');

describe('loginUserWithEmail', () => {
  it('Should return an object', () => {
    const email = 'laboratoriars5@gmail.com';
    const password = 'laboratoriars5';
    expect(typeof loginUserWithEmail(email, password)).toBe('object');
  });
  it('Should return true', async () => {
    const email = 'laboratoriars5@gmail.com';
    const password = 'laboratoriars5';
    const result = await loginUserWithEmail(email, password);
    expect(result).toBe(true);
  });
  it('Should return false', async () => {
    const email = 'rs5@gmail.com';
    const password = 'laboratoriars5';
    const result = await loginUserWithEmail(email, password);
    expect(result).toBe(false);
  });
});

describe('loginUserWithGoogle', () => {
  it('Should be a function', async () => {
    expect(typeof loginUserWithGoogle).toBe('function');
  });
  it('Should return true', async () => {
    const login = await loginUserWithGoogle();
    expect(login).toBe(true);
  });
  it('Should return false', async () => {
    signInWithPopup.mockRejectedValue();
    const login = await loginUserWithGoogle();
    expect(login).toBe(false);
  });
});
