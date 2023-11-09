import { fileHandler } from '../../src/helper/fileHandler';

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

describe('file handler', () => {
  test('fileHandler() should be able to handle text file', () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});

    fileHandler(
      'examples/test1.txt',
      'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
      'fr-CA',
      './til'
    );

    expect(consoleLogMock).toHaveBeenCalledWith('test1.html is created successfully!');
    consoleLogMock.mockRestore();
  });

  test('fileHandler() should be able to handle md file', () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});

    fileHandler(
      'examples/test.md',
      'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
      'fr-CA',
      './til'
    );

    expect(consoleLogMock).toHaveBeenCalledWith('test.html is created successfully!');
    consoleLogMock.mockRestore();
  });

  test('should log the error and exit the process when given file is not not supported', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    await new Promise((resolve) => {
      fileHandler(
        'examples/text4.html',
        'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
        'fr-CA',
        './til'
      );
      setTimeout(resolve, 100);
    });

    expect(consoleErrorMock).toHaveBeenCalledWith(
      `Only text(.txt) and markdown(.md) files are supported! Skipping file examples/text4.html`
    );
    consoleErrorMock.mockRestore();
  });
});
