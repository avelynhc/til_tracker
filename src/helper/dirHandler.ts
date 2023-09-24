import * as readFolderFs from 'fs';
import * as readFilePath from 'path';
import { SUPPORTED_FILE_EXTENSIONS } from './htmlConversion';
import { fileHandler } from "./fileHandler";

export function dirHandler (path: string, cssLink: string, selectedLang: string, outputFolder: string) {
    try {
        readFolderFs.readdir(path, function (err: any, files: any[]) {
            if (err) {
                console.log(err);
                process.exit(-1);
            }

            // filter to only get the files with supported file extension
            const supportedFiles:any[] = files.filter(file => SUPPORTED_FILE_EXTENSIONS.includes(readFilePath.extname(file)));
            if(supportedFiles.length===0) {
                console.error(`Error: There is no text file in path: ${path}`);
                process.exit(-1);
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
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
}