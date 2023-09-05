// const { Command } = require("commander");
// const figlet = require("figlet");
//
// const program = new Command();
//
// console.log(figlet.textSync("til_tracker"));
//
// program
//     .name("til_tracker")
//     .version("Name: til_tracker | Version: 1.0.0\"")
//     .description("CLI for processing input .txt file(s) into generated .html file(s)")
//     .argument("fileName or folderName", ".txt file you want to convert to .html file or directory containing .txt files you wish to convert")
//     .parse(process.argv);
//
//
// const options = program.opts();

var pjson = require("../package.json");
var folder = require("./modules/readFolder");
var file = require("./modules/readFile");
var path = require("path");
const fs = require("fs");
const chalk = require("chalk");
var cssLink = "";

const argv = require("yargs")
    .usage("Usage: $0 --input <'filename'>  [-s <'css-link'>]")
    .option("i", {
        alias: "input",
        describe: ".txt file name",
        type: "string",
        demandOption: true,
    })
    .option("s", {
        alias: "stylesheet",
        describe: "css link",
        default: "",
        type: "string",
        demandOption: false,
    })
    .option("o", {
        alias: "output",
        describe: "store output directory",
        type: "string",
        demandOption: false,
    })
    .alias("v", "version")
    .version(pjson.name + " " + pjson.version)
    .alias("h", "help")
    .help().argv;

if (argv.stylesheet !== "") {
    cssLink = argv.stylesheet;
}

// delete output folder "dist" if it exists then create new one
const htmlContainer = "./dist";
if (!fs.existsSync(htmlContainer)) {
    fs.mkdirSync(htmlContainer);
} else {
    fs.rmdirSync(htmlContainer, { recursive: true }, (err: any) => {
        if (err) {
            throw err;
        }
    });

    fs.mkdirSync(htmlContainer);
    console.log(chalk.bold.green('dist folder is created successfully!'));
}

// check input path status
fs.stat(argv.input, (err: any, stats: { isDirectory: () => any; isFile: () => any; }) => {
    if (err) {
        console.error(err);
        return;
    }

    if (stats.isDirectory()) {
        folder.readFolder(argv.input, cssLink, htmlContainer);  // folder
    } else if (stats.isFile() && path.extname(argv.input) === ".txt") {
        file.readFile(argv.input, cssLink, htmlContainer);      // file
    } else {
        console.log("Invalid file extension, it should be .txt");
    }
});