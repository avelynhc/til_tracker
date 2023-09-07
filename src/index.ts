import path from "path";
import fs from "fs";
const appInfo = require("../package.json");
const folder = require("./helper/readFolder");
const file = require("./helper/readFile");
let cssLink = "";

const argv = require("yargs")
    .usage("Usage: $0 -i <txtFilename>  [-s <css-link>]")
    .alias("v", "version")
    .version(appInfo.name + " " + appInfo.version)
    .option("i", {
        alias: "input",
        describe: ".txt File Name",
        type: "string",
        demandOption: true,
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

// check if outputFolder already exists and remove existing folder for containing the latest output
const outputFolder = "./dist";
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
} else {
    fs.rmSync(outputFolder, { recursive: true, force: true });
    console.log('Existing folder was successfully removed');
    fs.mkdirSync(outputFolder);
}
console.log('Output folder is successfully created!');

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