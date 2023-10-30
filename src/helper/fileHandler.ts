import readFileFs = require('fs');
import readFilePath = require('path');
import showdown = require('showdown');
import { htmlConversion } from './htmlConversion';
import { errorHandling } from '../fileParser';
import { isMarkdownFile, isTextFile } from './check';

const converter = new showdown.Converter();
let body: string = '';

export function fileHandler(
  inputPath: string,
  cssLink: string,
  selectedLang: string,
  outputFolder: string
) {
  // parse a title from the input file, which will be used to populate <title>...</title>
  const title: string = readFilePath.basename(inputPath, readFilePath.extname(inputPath));

  try {
    const data: string = readFileFs.readFileSync(inputPath, 'utf8');

    // Check the type of file and parse accordingly
    if (isTextFile(inputPath)) {
      body = parseTextFileContent(data);
    } else if (isMarkdownFile(inputPath)) {
      body = converter.makeHtml(data);
    } else {
      // Reaching this branch is only possible when user provides a file (not folder) as commandline argument.
      // The dirHandler function automatically filters out unsupported files.
      errorHandling(
        `Only text(.txt) and markdown(.md) files are supported! Skipping file ${inputPath}`
      );
    }
  } catch (err) {
    errorHandling(err as string);
  }

  htmlConversion(title, cssLink, body, selectedLang, outputFolder);
}

// Body parser functions
// Parses the content of a text file
function parseTextFileContent(content: string): string {
  return content
    .split(/\r?\n\r?\n/)
    .map((para: string) => `<p>${para.replace(/\r?\n/, ' ')}</p>`)
    .join('\n');
}
