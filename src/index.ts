const { Command } = require("commander");
const figlet = require("figlet");

const program = new Command();

console.log(figlet.textSync("til_tracker"));

program
    .name("til_tracker")
    .version("Name: til_tracker | Version: 1.0.0\"")
    .description("CLI for processing input .txt file(s) into generated .html file(s)")
    .argument("fileName or folderName", ".txt file you want to convert to .html file or directory containing .txt files you wish to convert")
    .parse(process.argv);


const options = program.opts();