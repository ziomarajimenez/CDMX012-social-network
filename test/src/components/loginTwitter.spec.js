import {
  loginUserWithTwitter,
} from '../../../src/database/firebase.js';
import { signInWithPopup } from '../../../src/database/firebase-import.js';

jest.mock('../../../src/database/firebase-import.js');

describe('loginUserWithTwitter', () => {
  it('Should be a function', async () => {
    expect(typeof loginUserWithTwitter).toBe('function');
  });
  it('Should return true', async () => {
    const login = await loginUserWithTwitter();
    console.log(login);
    expect(login).toBe(true);
  });
  it('Should return false', async () => {
    signInWithPopup.mockRejectedValue();
    const login = await loginUserWithTwitter();
    expect(login).toBe(false);
  });
});
