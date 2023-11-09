import { parseFiles } from '../../src/fileParser';

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

describe('file parser', () => {
  test('fileParser() should be able to handle file', async () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});

    await new Promise((resolve) => {
      parseFiles(
        'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
        'fr-CA',
        './til',
        'examples/test.md'
      );
      setTimeout(resolve, 100);
    });
    expect(consoleLogMock).toHaveBeenCalledWith('test.html is created successfully!');
    consoleLogMock.mockRestore();
  });

  test('fileParser() should be able to handle directory', async () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});

    await new Promise((resolve) => {
      parseFiles(
        'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
        'fr-CA',
        './til',
        'examples'
      );
      setTimeout(resolve, 100);
    });
    expect(consoleLogMock).toHaveBeenCalledWith('test.html is created successfully!');
    consoleLogMock.mockRestore();
  });

  test('fileParser() should be able to handle error when given file is not supported', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    await new Promise((resolve) => {
      parseFiles(
        'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
        'fr-CA',
        './til',
        'examples/text4.html'
      );
      setTimeout(resolve, 100);
    });

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error: Only these file extensions are supported: .md,.txt'
    );
    consoleErrorMock.mockRestore();
  });

  test('fileParser() should be able to handle error when given file name does not exist', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    await new Promise((resolve) => {
      parseFiles(
        'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
        'fr-CA',
        './til',
        'examples/empty.txt'
      );
      setTimeout(resolve, 100);
    });

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "ENOENT: no such file or directory, stat 'examples/empty.txt'"
    );
    consoleErrorMock.mockRestore();
  });
});
