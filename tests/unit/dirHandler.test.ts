import { dirHandler } from '../../src/helper/dirHandler';

let consoleLogMock: jest.SpyInstance;
let consoleErrorMock: jest.SpyInstance;

beforeAll(() => {
  consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
  consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  consoleLogMock.mockRestore();
  consoleErrorMock.mockRestore();
});

describe('directory handler', () => {
  test('dirHandler() should be able to handle files inside the directory', async () => {
    await new Promise<void>((resolve) => {
      dirHandler('examples', '', 'fr-CA', './til');
      setTimeout(resolve, 100);
    });

    expect(consoleLogMock).toHaveBeenCalledWith('test.html is created successfully!');
  });

  test('dirHandler() should be able to handle error when given directory is not found', async () => {
    await new Promise<void>((resolve) => {
      dirHandler(
        'non-exist-directory',
        'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
        'fr-CA',
        './til'
      );
      setTimeout(resolve, 100);
    });

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "ENOENT: no such file or directory, scandir 'non-exist-directory'"
    );
  });

  test('dirHandler() should be able to handle error when given directory does not have supported files', async () => {
    await new Promise<void>((resolve) => {
      dirHandler(
        'invalid-dir',
        'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
        'fr-CA',
        './til'
      );
      setTimeout(resolve, 100);
    });

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error: There is no file with extension .md,.txt in directory: invalid-dir'
    );
  });
});
