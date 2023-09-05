var fs = require("fs");
var html = require("./convertToHTML");
var path = require("path");
var body = "";

module.exports.readFile = function (inputPath: any, cssLink: any, outputContainer: any) {
    try {
        const data = fs.readFileSync(inputPath, "utf8");
        body = data
            .split(/\r?\n\r?\n/)
            .map((para: string) => `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`)
            .join(" ");
    } catch (err) {
        console.error(err);
    }

    var title = path.basename(inputPath, ".txt");

    html.convertToHTML(title, cssLink, body, outputContainer);
    return title;
};
