import { renderPost } from '../../../src/components/home.js';

jest.mock('../../../src/database/firebase-import.js');
jest.mock('../../../src/database/firestore.js');
jest.mock('../../../src/main.js');

describe('renderPots', () => {
  it('Should return an object', async () => {
    const posts = await renderPost();
    expect(typeof posts).toBe('object');
  });

  it('Should return an object  with displayName propiety typeof string', async () => {
    const posts = await renderPost();
    expect(typeof posts[0].displayName).toBe('string');
  });
  it('Should return an object  with text propiety typeof string', async () => {
    const posts = await renderPost();
    expect(typeof posts[0].text).toBe('string');
  });
});
