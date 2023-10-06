import * as fs from 'fs';
import * as path from 'path';
import { SUPPORTED_FILE_EXTENSIONS } from './helper/convertToHTML';
import { readFile } from './helper/readFile';
import { readFolder } from './helper/readFolder';
const yargs = require('yargs');

// read package.json file
const appInfo = fs.readFileSync('./package.json', "utf8");
const parsedInfo = JSON.parse(appInfo);
const OUTPUT_DIR = './til';

const argv = yargs
    .usage('Usage: $0 <txtFilename> or <folderContainingTxtFiles>  [-s <css-link>] [-l <language-code>]')
    .option('s', {
        alias: 'stylesheet',
        describe: 'Optional CSS Link',
        default: '',
        type: 'string',
        demandOption: false,
    })
    .option('l', {
        alias: 'lang',
        describe: 'Language used in generated file',
        default: 'en-CA',
        type: 'string',
        demandOption: false,
    })
    .alias('h', 'help')
    .alias('v', 'version')
    .version(parsedInfo.name + ' ' + parsedInfo.version)
    .help().argv;

let cssLink = '';
if (argv.stylesheet !== '') {
    if (isURL(argv.stylesheet)) {
        cssLink = argv.stylesheet;
    }
    else {
        const ouptutDirectory = OUTPUT_DIR;
        const filePath = argv.stylesheet;
        const relativePath = path.relative(ouptutDirectory, filePath);

        cssLink = relativePath;
    }
}

// check if outputFolder already exists and remove existing folder for containing the latest output
const outputFolder = './til';
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
} else {
    fs.rmSync(outputFolder, { recursive: true, force: true });
    console.log('Existing folder was successfully removed');
    fs.mkdirSync(outputFolder);
}
console.log('Output folder is successfully created!');

// extract file name and language from argument passed
const fileName = argv._[0];
const selectedLang: string = argv.lang;
fs.stat(fileName, (err: any, stats: { isDirectory: () => any; isFile: () => any; }) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }

    // check if input is an individual file or directory
    if (stats.isDirectory()) {
        readFolder(fileName, cssLink, selectedLang, outputFolder);
    } else if (stats.isFile() && SUPPORTED_FILE_EXTENSIONS.includes(path.extname(fileName))) {
        readFile(fileName, cssLink, selectedLang, outputFolder);
    } else {
        console.error(`Error: Only these file extensions are supported: ${SUPPORTED_FILE_EXTENSIONS}`);
        process.exit(-1);
    }
});

function isURL(str: string): boolean {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(str);
}