import readFileFs from "fs";
import readFilePath from "path";
const html = require("./convertToHTML");
let body:string = "";

module.exports.readFile = function (inputPath: string, cssLink: string, selectedLang: string, outputFolder: string) {
    // parse a title from the input file, which will be used to populate <title>...</title>
    const title:string = readFilePath.basename(inputPath, ".txt");

    try {
        const data:string = readFileFs.readFileSync(inputPath, "utf8");
        body = data
            .split(/\r?\n\r?\n/)
            .map((para: string) =>
                `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`)
            .join("");
    } catch (err) {
        console.error(err);
        process.exit(-1);
    }

    html.convertToHTML(title, cssLink, body, selectedLang, outputFolder);
};