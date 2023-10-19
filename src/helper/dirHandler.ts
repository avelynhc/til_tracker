const fs = require('fs');
const readFilePath = require('path');
const { SUPPORTED_FILE_EXTENSIONS } = require('./htmlConversion');
const { fileHandler } = require('./fileHandler');
const { errorHandling } =  require('../fileParser');

export function dirHandler (path: string, cssLink: string, selectedLang: string, outputFolder: string) {
    try {
        fs.readdir(path, function (err: any, files: string[]) {
            if (err) {
                errorHandling(err.message);
            }

            // filter to only get the files with supported file extension
            const supportedFiles:string[] = files.filter(file => SUPPORTED_FILE_EXTENSIONS.includes(readFilePath.extname(file)));
            if(supportedFiles.length===0) {
                errorHandling(`Error: There is no file with extension ${SUPPORTED_FILE_EXTENSIONS} in directory: ${path}`);
            }
            supportedFiles.forEach(function (file: string) {
                fileHandler(
                    `${path}/${file}`,
                    cssLink,
                    selectedLang,
                    outputFolder
                );
            });
        });
    } catch (err: any) {
        errorHandling(err);
    }
}