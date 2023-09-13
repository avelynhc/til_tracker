import readFolderFs from "fs";
const fileModule = require("./readFile");

module.exports.readFolder = function (path: string, cssLink: string, selectedLang: string,  outputFolder: string) {
    try {
        readFolderFs.readdir(path, function (err: any, files: any[]) {
            if (err) return console.log(err);
            const textFiles:any[] = files.filter(file => file.split('.').pop()==='txt');
            textFiles.forEach(function (file) {
                fileModule.readFile(
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