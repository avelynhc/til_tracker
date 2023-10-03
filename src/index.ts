import * as fs from 'fs';
import * as path from 'path';
import {parseCommandLindArgs} from "./commandLineParser";
import {errorHandling, parseFiles} from "./fileParser";
const TOML = require('@ltd/j-toml');

const argv = parseCommandLindArgs();

// extract options from command line arguments
const fileName = argv._[0];
let cssLink: string = argv.stylesheet || '';
let selectedLang: string = argv.lang;

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

parseFiles(cssLink, selectedLang, outputFolder, fileName);