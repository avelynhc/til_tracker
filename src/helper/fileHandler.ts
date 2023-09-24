import * as readFileFs from 'fs';
import * as readFilePath from 'path';
import { htmlConversion, formatHtmlForMarkdownLine } from "./htmlConversion";
let body: string = "";

export function readFile(inputPath: string, cssLink: string, selectedLang: string, outputFolder: string) {
    // parse a title from the input file, which will be used to populate <title>...</title>
    const title: string = readFilePath.basename(inputPath, readFilePath.extname(inputPath));

    try {
        const data: string = readFileFs.readFileSync(inputPath, "utf8");
        
        // Check the type of file and parse accordingly
        if (isTextFile(inputPath)) {
            body = parseTextFileContent(data);
        }
        else if (isMarkdownFile(inputPath)) {
            body = parseMarkdownFileContent(data);
        }
        else {
            // Reaching this branch is only possible when user provides a file (not folder) as commandline argument.
            // The readFolder function automatically filters out unsupported files.
            console.error(`Only text(.txt) and markdown(.md) files are supported! Skipping file ${inputPath}`);
        }
        
    } catch (err) {
        console.error(err);
        process.exit(-1);
    }

    htmlConversion(title, cssLink, body, selectedLang, outputFolder);
}

// Body parser functions

/**
 * Parses the content of a text file
 * 
 * @param content The content that needs to be transformed to HTML markup
 * @returns The transformed content
 */
function parseTextFileContent(content: string): string {
    return content
        .split(/\r?\n\r?\n/)
        .map((para: string) =>
            `<p>${para.replace(/\r?\n/, " ")}</p>`)
        .join("");
}

/**
 * Parses the content of a markdown file
 * 
 * @param content The content that needs to be transformed to HTML markup
 * @returns The transformed content
 */
function parseMarkdownFileContent(content: string): string {
    return content
        .replace(/(\r?\n){1}/, ' ') // Aggregate text at gaps of single newlines
        .split(/\r?\n/)
        .filter(line => line?.length > 0) // Remove empty lines
        .map((line: string) => {
            return formatHtmlForMarkdownLine(line)
        })
        .join("\n"); // Join all the generated tags
}

// General file queries
function isTextFile(filename: string): boolean {
    return readFilePath.extname(filename) === '.txt';
}

function isMarkdownFile(filename: string): boolean {
    return readFilePath.extname(filename) === '.md';
}