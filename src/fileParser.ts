const fs = require('fs');
const path = require('path');
const { SUPPORTED_FILE_EXTENSIONS } = require('./helper/htmlConversion');
const { fileHandler } = require('./helper/fileHandler');
const { dirHandler } = require('./helper/dirHandler');

export function errorHandling(err: string) {
    console.error(err);
    process.exit(-1);
}

export function parseFiles(cssLink: string, selectedLang: string, outputFolder: string, fileName: string) {
    fs.stat(fileName, (err: any, stats: { isDirectory: () => any; isFile: () => any; }) => {
        if (err) {
            errorHandling(err.message);
        }

        // check if input is a file or directory
        if (stats.isDirectory()) {
            dirHandler(fileName, cssLink, selectedLang, outputFolder);
        } else if (stats.isFile() && SUPPORTED_FILE_EXTENSIONS.includes(path.extname(fileName))) {
            fileHandler(fileName, cssLink, selectedLang, outputFolder);
        } else {
            errorHandling(`Error: Only these file extensions are supported: ${SUPPORTED_FILE_EXTENSIONS}`);
        }
    });
}