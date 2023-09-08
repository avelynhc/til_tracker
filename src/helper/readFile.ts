import readFileFs from "fs";
import readFilePath from "path";
const html = require("./convertToHTML");
let body = "";

module.exports.readFile = function (inputPath: any, cssLink: any, outputFolder: any) {
    // parse a title from the input file, which will be used to populate <title>...</title>
    const title = readFilePath.basename(inputPath, ".txt");

    try {
        const data = readFileFs.readFileSync(inputPath, "utf8");
        body = data
            .split(/\r?\n\r?\n/)
            .map((para: string) => `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`)
            .join("");
    } catch (err) {
        console.error(err);
    }

    html.convertToHTML(title, cssLink, body, outputFolder);
    return title;
};