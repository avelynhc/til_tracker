import * as readFileFs from 'fs';
import * as readFilePath from 'path';
import { htmlConversion } from './htmlConversion';
import { errorHandling } from '../fileParser';
import { isMarkdownFile, isTextFile } from "./check";
let body: string = '';

export function fileHandler(inputPath: string, cssLink: string, selectedLang: string, outputFolder: string) {
    // parse a title from the input file, which will be used to populate <title>...</title>
    const title: string = readFilePath.basename(inputPath, readFilePath.extname(inputPath));

    try {
        const data: string = readFileFs.readFileSync(inputPath, 'utf8');

        // Check the type of file and parse accordingly
        if (isTextFile(inputPath)) {
            body = parseTextFileContent(data);
        } else if (isMarkdownFile(inputPath)) {
            body = parseMarkdownFileContent(data);
        } else {
            // Reaching this branch is only possible when user provides a file (not folder) as commandline argument.
            // The dirHandler function automatically filters out unsupported files.
            errorHandling(`Only text(.txt) and markdown(.md) files are supported! Skipping file ${inputPath}`);
        }
    } catch (err: any) {
        errorHandling(err.message);
    }

    htmlConversion(title, cssLink, body, selectedLang, outputFolder);
}

// Body parser functions
// Parses the content of a text file
function parseTextFileContent(content: string): string {
    return content
        .split(/\r?\n\r?\n/)
        .map((para: string) =>
            `<p>${para.replace(/\r?\n/, ' ')}</p>`)
        .join('\n');
}

// Parses the content of a markdown file
function parseMarkdownFileContent(content: string): string {
    return content
        .replace(/(\r?\n){1}/, ' ') // Aggregate text at gaps of single newlines
        .split(/\r?\n/)
        .filter(line => line?.length > 0) // Remove empty lines
        .map((line: string) => {
            return formatHtmlForMarkdownLine(line)
        })
        .join('\n'); // Join all the generated tags
}

function formatHtmlForMarkdownLine(line: string) {
    return line
        .replace(/^#\s(.+)$/gm, '<h1>$1</h1>') // heading 1
        .replace(/^##\s(.+)$/gm, '<h2>$1</h2>') // heading 2
        .replace(/^###\s(.+)$/gm, '<h3>$1</h3>') // heading 3
        .replace(/^####\s(.+)$/gm, '<h4>$1</h4>') // heading 4
        .replace(/^#####\s(.+)$/gm, '<h5>$1</h5>') // heading 5
        .replace(/^######\s(.+)$/gm, '<h6>$1</h6>') // heading 6
        .replace(/^(?!<h[1-6]>|<ul>|<ol>|<li>|<a>).+$/gm, '<p>$&</p>') // paragraph
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href=$2>$1</a>') //  link
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // bold
        .replace(/\*(.*?)\*/g, '<i>$1</i>') // italic
}