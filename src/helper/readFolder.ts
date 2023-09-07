import readFolderFs from "fs";
const fileModule = require("./readFile");

module.exports.readFolder = function (path: any, cssLink: any, outputFolder: any) {
    readFolderFs.readdir(path, function (err: any, files: any[]) {
        if (err) return console.log(err);

        files.forEach(function (file) {
            fileModule.readFile(
                `${path}/${file}`,
                cssLink,
                outputFolder
            );
        });
    });
};