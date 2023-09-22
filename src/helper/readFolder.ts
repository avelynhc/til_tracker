import * as readFolderFs from 'fs';
import { readFile } from "./readFile";

export function readFolder (path: string, cssLink: string, selectedLang: string,  outputFolder: string) {
    try {
        readFolderFs.readdir(path, function (err: any, files: any[]) {
            if (err) {
                console.log(err);
                process.exit(-1);
            }

            // filter to only get the files with .txt extension
            const textFiles:any[] = files.filter(file => file.split('.').pop()==='txt');
            if(textFiles.length===0) {
                console.error(`Error: There is no text file in path: ${path}`);
                process.exit(-1);
            }

            textFiles.forEach(function (file) {
                readFile(
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