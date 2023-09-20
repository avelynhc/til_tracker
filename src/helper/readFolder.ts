import * as readFolderFs from 'fs';
import { readFile } from "./readFile";

export function readFolder (path: string, cssLink: string, selectedLang: string,  outputFolder: string) {
    try {
        readFolderFs.readdir(path, function (err: any, files: any[]) {
            if (err) {
                console.log(err);
                process.exit(-1);
            }
            const textFiles:any[] = files.filter(file => file.split('.').pop()==='txt');
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
};