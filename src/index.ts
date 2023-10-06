import * as fs from 'fs';
import * as path from 'path';
import { parseCommandLineArgs } from "./commandLineParser";
import { errorHandling, parseFiles } from "./fileParser";
import { isURL } from "./helper/check";
const TOML = require('@ltd/j-toml');
const OUTPUT_DIR = './til';

const argv = parseCommandLineArgs();

// extract options from command line arguments
const fileName = argv._[0];
let selectedLang: string = argv.lang;
let cssLink = '';

if (argv.stylesheet !== '') {
    if (isURL(argv.stylesheet)) {
        cssLink = argv.stylesheet;
    } else {
        cssLink = path.relative(OUTPUT_DIR, argv.stylesheet);
        const cssPath: string = path.resolve(argv.stylesheet);
        if (!fs.existsSync(cssPath)) {
            errorHandling(`${cssPath} does not exist`);
        }
    }
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
if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    console.log('Existing folder was successfully removed');
}
fs.mkdirSync(OUTPUT_DIR);
console.log('Output folder ./til is successfully created');

parseFiles(cssLink, selectedLang, OUTPUT_DIR, fileName);