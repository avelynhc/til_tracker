import path from "path";
import fs from "fs";
const appInfo = require("../package.json");
const folder = require("./helper/readFolder");
const file = require("./helper/readFile");
const yargs = require("yargs");

const argv = yargs
    .usage("Usage: $0 -i <txtFilename> or <folderContainingTxtFiles>  [-s <css-link>]")
    .option("i", {
        alias: "input",
        describe: "Input .txt file(s)",
        type: "string",
        demandOption: true,
    })
    .option("s", {
        alias: "stylesheet",
        describe: "Optional CSS Link",
        default: "",
        type: "string",
        demandOption: false,
    })
    .alias("h", "help")
    .alias("v", "version")
    .version(appInfo.name + " " + appInfo.version)
    .help().argv;

let cssLink = "";
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
        process.exit(-1);
    }

    if (stats.isDirectory()) {
        folder.readFolder(argv.input, cssLink, outputFolder);
    } else if (stats.isFile() && path.extname(argv.input) === ".txt") {
        file.readFile(argv.input, cssLink, outputFolder);
    } else {
        console.error("Error: file extension should be .txt");
        process.exit(-1);
    }
});