import * as path from 'path';
import * as fs from 'fs';
import { readFolder } from './helper/readFolder';
import { readFile } from './helper/readFile';
const yargs = require('yargs');

// read package.json file
const appInfo = fs.readFileSync('./package.json', "utf8");
const parsedInfo = JSON.parse(appInfo);

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
    cssLink = argv.stylesheet;
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
const selectedLang:string = argv.lang;
fs.stat(fileName, (err: any, stats: { isDirectory: () => any; isFile: () => any; }) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }

    // check if input is an individual file or directory
    if (stats.isDirectory()) {
        readFolder(fileName, cssLink, selectedLang, outputFolder);
    } else if (stats.isFile() && path.extname(fileName) === '.txt') {
        readFile(fileName, cssLink, selectedLang, outputFolder);
    } else {
        console.error('Error: file extension should be .txt');
        process.exit(-1);
    }
});