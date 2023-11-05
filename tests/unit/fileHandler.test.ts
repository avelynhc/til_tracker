import { fileHandler } from '../../src/helper/fileHandler';

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
    const exitMock = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

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
    expect(exitMock).toHaveBeenCalledWith(-1);
    consoleErrorMock.mockRestore();
    exitMock.mockRestore();
  });

  test('should log the error and exit the process when given file does not exist', async () => {
    const exitMock = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

    await new Promise((resolve) => {
      fileHandler(
        'examples/non-exist-file.txt',
        'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
        'fr-CA',
        './til'
      );
      setTimeout(resolve, 100);
    });

    expect(exitMock).toHaveBeenCalledWith(-1);
    exitMock.mockRestore();
  });
});
