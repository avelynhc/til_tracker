import * as readFolderFs from 'fs';
import * as readFilePath from 'path';
import { SUPPORTED_FILE_EXTENSIONS } from './htmlConversion';
import { fileHandler } from './fileHandler';
import { errorHandling } from '../fileParser';

export function dirHandler (path: string, cssLink: string, selectedLang: string, outputFolder: string) {
    try {
        readFolderFs.readdir(path, function (err: any, files: any[]) {
            if (err) {
                errorHandling(err.message);
            }

            // filter to only get the files with supported file extension
            const supportedFiles:any[] = files.filter(file => SUPPORTED_FILE_EXTENSIONS.includes(readFilePath.extname(file)));
            if(supportedFiles.length===0) {
                errorHandling(`Error: There is no file with extension ${SUPPORTED_FILE_EXTENSIONS} in directory: ${path}`);
            }
            supportedFiles.forEach(function (file) {
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