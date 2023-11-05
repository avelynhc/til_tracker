import { parseFiles } from '../../src/fileParser';

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

  test('fileParser() should be able to handle error', async () => {
    const exitMock = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

    await new Promise((resolve) => {
      parseFiles(
        'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
        'fr-CA',
        './til',
        'examples/text4.html'
      );
      setTimeout(resolve, 100);
    });
    expect(exitMock).toHaveBeenCalledWith(-1);
    exitMock.mockRestore();
  });
});
