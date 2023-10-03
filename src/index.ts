import * as fs from 'fs';
import * as path from 'path';
import { SUPPORTED_FILE_EXTENSIONS } from './helper/htmlConversion';
import { fileHandler } from './helper/fileHandler';
import { dirHandler } from './helper/dirHandler';
const yargs = require('yargs');
const TOML = require('@ltd/j-toml');

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
    .option('c', {
        alias: 'config',
        describe: 'Path to .toml config file',
        default: '',
        type: 'string',
        demandOption: false,
    })
    .alias('h', 'help')
    .alias('v', 'version')
    .version(parsedInfo.name + ' ' + parsedInfo.version)
    .help().argv;

let cssLink: string = '';
if (argv.stylesheet) cssLink = argv.stylesheet;
let selectedLang: string = argv.lang;

export function errorHandling(err: string) {
    console.error(err);
    process.exit(-1);
}

if (argv.config) {
    try {
        const configPath: string = path.resolve(argv.config);
        if (!fs.existsSync(configPath)) {
            errorHandling(`${argv.config} does not exist`);
        }
        if (path.extname(configPath) !== '.toml') {
            errorHandling('Config file must be a .toml file');
        }
        const configOptions = TOML.parse(fs.readFileSync(configPath));
        selectedLang = configOptions.lang || 'en-CA';
        cssLink = configOptions.stylesheet || '';
    } catch (err: any) {
        errorHandling(err.message);
    }
} 

// check if outputFolder already exists and remove existing folder for containing the latest output
const outputFolder = './til';
if (fs.existsSync(outputFolder)) {
    fs.rmSync(outputFolder, { recursive: true, force: true });
    console.log('Existing folder was successfully removed');
}
fs.mkdirSync(outputFolder);
console.log('Output folder ./til is successfully created');

// extract file name
const fileName = argv._[0];
fs.stat(fileName, (err: any, stats: { isDirectory: () => any; isFile: () => any; }) => {
    if (err) {
        errorHandling(err.message);
    }

    // check if input is a file or directory
    if (stats.isDirectory()) {
        dirHandler(fileName, cssLink, selectedLang, outputFolder);
    } else if (stats.isFile() && SUPPORTED_FILE_EXTENSIONS.includes(path.extname(fileName))) {
        fileHandler(fileName, cssLink, selectedLang, outputFolder);
    } else {
        errorHandling(`Error: Only these file extensions are supported: ${SUPPORTED_FILE_EXTENSIONS}`);
    }
});