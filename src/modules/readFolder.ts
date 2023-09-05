var fs = require("fs");
var fileModule = require("./readFile");
var html = require("./convertToHTML");
var body = "";

module.exports.readFolder = function (path: any, cssLink: any, outputContainer: any) {
    fs.readdir(path, function (err: any, files: any[]) {
        if (err) {
            return console.log(err);
        }

        files.forEach(function (file) {
            var fileName = fileModule.readFile(
                `${path}/${file}`,
                cssLink,
                outputContainer
            );

            // index.html body
            body += `<h5><a href={${path}/${encodeURI(
                fileName
            )}.html}>${fileName}</h5>\n`;
        });

        // create index.html
        html.convertToHTML(
            "index",
            cssLink,
            `<h4>Generated Sites</h4>\n${body}`,
            outputContainer
        );
    });
};