var createHTML = require("create-html");

module.exports.generateHTML = function (title: string, cssLink: any, body: any, htmlContainer: any) {
    var html = createHTML({
        title: `${title}`,
        head: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
        body: `${body}`,
        css: `${cssLink}`,
    });

    fs.writeFile(`${htmlContainer}/${title}.html`, html, function (err: any) {
        if (err) console.log(err);
    });

    if(title==='index'){
        console.log(chalk.bold.yellow(`${title}.html is created successfully!`));
    } else {
        console.log(chalk.yellow(`${title}.html is created successfully!`));
    }
};