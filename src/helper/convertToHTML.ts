const htmlFs = require("fs");

module.exports.convertToHTML = function (title: string, cssLink: any, body: any, outputFolder: any) {
    const result:string = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${
        cssLink
            ? `<link rel="stylesheet" href="${cssLink}">`
            : ""
    }
</head>
<h1>${title}</h1>
<body>
${body}
</body>
</html>`;

    htmlFs.writeFile(`${outputFolder}/${title}.html`, result, function (err: any) {
        if (err) console.error(err);
    });
    console.log(`${title}.html is created successfully!`);
};