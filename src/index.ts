import fs = require('fs');
import path = require('path');
import toml = require('@ltd/j-toml');
/* eslint-disable */
const { parseCommandLineArgs } = require('./commandLineParser');
/* eslint-enable */
import { errorHandling, parseFiles } from './fileParser';
import { isURL } from './helper/check';

const OUTPUT_DIR = './til';

const argv = parseCommandLineArgs();

// extract options from command line arguments
const fileName: string = argv._[0];
let selectedLang: string = typeof argv.lang === 'string' ? argv.lang : 'en-CA';
let cssLink: string = '';

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

    const configOptions = toml.parse(fs.readFileSync(configPath));
    if (typeof configOptions.lang === 'string') {
      selectedLang = configOptions.lang || 'en-CA';
    }
    if (typeof configOptions.stylesheet === 'string') {
      cssLink = configOptions.stylesheet || '';
    }
  } catch (err) {
    errorHandling(err as string);
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
