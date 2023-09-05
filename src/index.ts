const appInfo = require("../package.json");
const folder = require("./modules/readFolder");
const file = require("./modules/readFile");
var path = require("path");
var fs = require("fs");
var chalk = require("chalk");
let cssLink = "";

const argv = require("yargs")
    .usage("Usage: $0 --input <filename>  [-s <css-link>]")
    .alias("v", "version")
    .version(appInfo.name + " " + appInfo.version)
    .option("i", {
        alias: "input",
        describe: ".txt File Name",
        type: "string",
        demandOption: true,
    })
    .option("o", {
        alias: "output",
        describe: "Result Directory",
        type: "string",
        demandOption: false,
    })
    .option("s", {
        alias: "stylesheet",
        describe: "CSS Link",
        default: "",
        type: "string",
        demandOption: false,
    })
    .alias("h", "help")
    .help().argv;

if (argv.stylesheet !== "") {
    cssLink = argv.stylesheet;
}

// delete output folder if it exists then create a new one
const outputFolder = "./dist";
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
} else {
    fs.rm(outputFolder, { recursive: true }, (err: any) => {
        if (err) {
            throw err;
        }
    });
    fs.mkdirSync(outputFolder);
    console.log(chalk.bold.green('Output folder(til_tracker) is successfully created!'));
}

// check if input is an individual file or directory
fs.stat(argv.input, (err: any, stats: { isDirectory: () => any; isFile: () => any; }) => {
    if (err) {
        console.error(err);
        return;
    }

    if (stats.isDirectory()) {
        folder.readFolder(argv.input, cssLink, outputFolder);
    } else if (stats.isFile() && path.extname(argv.input) === ".txt") {
        file.readFile(argv.input, cssLink, outputFolder);
    } else {
        console.error("Error: file extension should be .txt");
    }
});