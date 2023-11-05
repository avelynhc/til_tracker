import { isMarkdownFile, isTextFile, isURL } from '../../src/helper/check';

describe('check argument', () => {
  test('isURL() with correct url should be true', () => {
    const response = isURL('https://www.google.ca');
    expect(response).toBe(true);
  });

  test('isURL() with incorrect url should be false', () => {
    const response = isURL('ws://www.google.ca');
    expect(response).toBe(false);
  });

  test('isTextFile() with .txt should be true', () => {
    const response = isTextFile('test.txt');
    expect(response).toBe(true);
  });

  test('isTextFile() with .html should be false', () => {
    const response = isTextFile('test.html');
    expect(response).toBe(false);
  });

  test('isMarkdownFile() with .md should be true', () => {
    const response = isMarkdownFile('test.md');
    expect(response).toBe(true);
  });

  test('isMarkdownFile() with .html should be false', () => {
    const response = isMarkdownFile('test.html');
    expect(response).toBe(false);
  });
});
