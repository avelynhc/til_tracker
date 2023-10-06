import * as fs from 'fs';
const yargs = require('yargs');

export function parseCommandLindArgs() {
    // read package.json file
    const appInfo = fs.readFileSync('./package.json', "utf8");
    const parsedInfo = JSON.parse(appInfo);

    return yargs
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
}