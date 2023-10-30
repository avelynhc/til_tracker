import fs = require('fs');
import path = require('path');
import { SUPPORTED_FILE_EXTENSIONS } from './helper/htmlConversion';
import { fileHandler } from './helper/fileHandler';
import { dirHandler } from './helper/dirHandler';

export function errorHandling(err: string) {
  console.error(err);
  process.exit(-1);
}

export function parseFiles(
  cssLink: string,
  selectedLang: string,
  outputFolder: string,
  fileName: string
) {
  fs.stat(fileName, (err, stats) => {
    if (err) {
      errorHandling(err.message);
    }

    // check if input is a file or directory
    if (stats.isDirectory()) {
      dirHandler(fileName, cssLink, selectedLang, outputFolder);
    } else if (stats.isFile() && SUPPORTED_FILE_EXTENSIONS.includes(path.extname(fileName))) {
      fileHandler(fileName, cssLink, selectedLang, outputFolder);
    } else {
      errorHandling(
        `Error: Only these file extensions are supported: ${SUPPORTED_FILE_EXTENSIONS}`
      );
    }
  });
}
