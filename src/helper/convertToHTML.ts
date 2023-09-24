import * as htmlFs from 'fs';

export const SUPPORTED_FILE_EXTENSIONS = ['.md', '.txt'];

export function convertToHTML(title: string, cssLink: string, body: string, selectedLang: string, outputFolder: string) {
    const result:string = `<!doctype html>
<html lang="${selectedLang}">
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${
        cssLink
            ? `<link rel="stylesheet" href="${cssLink}">`
            : ""
    }
</head>
<body>
<h1>${title}</h1>
${body}
</body>
</html>`;

    htmlFs.writeFile(`${outputFolder}/${title}.html`, result, function (err: any) {
        if (err) {
            console.error(err);
            process.exit(-1);
        }
    });
    console.log(`${title}.html is created successfully!`);
}

// Special Tokens
const MarkdownRegexes = {
    H1: new RegExp(/^# (.+?)(?=\n|$)/g),
    H2: new RegExp(/^## (.+?)(?=\n|$)/g),
    H3: new RegExp(/^### (.+?)(?=\n|$)/g),
    H4: new RegExp(/^#### (.+?)(?=\n|$)/g),
    H5: new RegExp(/^##### (.+?)(?=\n|$)/g),
    H6: new RegExp(/^###### (.+?)(?=\n|$)/g),
}

function isHeadingLevel1(line: string): boolean {
    return !!line.match(MarkdownRegexes.H1);
}

function isHeadingLevel2(line: string): boolean {
    return !!line.match(MarkdownRegexes.H2);
}

function isHeadingLevel3(line: string): boolean {
    return !!line.match(MarkdownRegexes.H3);
}

function isHeadingLevel4(line: string): boolean {
    return !!line.match(MarkdownRegexes.H4);
}

function isHeadingLevel5(line: string): boolean {
    return !!line.match(MarkdownRegexes.H5);
}

function isHeadingLevel6(line: string): boolean {
    return !!line.match(MarkdownRegexes.H6);
}

// Line formatter
export function formatHtmlForMarkdownLine(line: string) {
    let formattedLine = line;

    if (isHeadingLevel1(line)) {
        formattedLine = `<h1>${line.replace(MarkdownRegexes.H1, '$1')}</h1>`;
    }
    else if (isHeadingLevel2(line)) {
        formattedLine = `<h2>${line.replace(MarkdownRegexes.H2, '$1')}</h2>`;
    }
    else if (isHeadingLevel3(line)) {
        formattedLine = `<h3>${line.replace(MarkdownRegexes.H3, '$1')}</h3>`;
    }
    else if (isHeadingLevel4(line)) {
        formattedLine = `<h4>${line.replace(MarkdownRegexes.H4, '$1')}</h4>`;
    }
    else if (isHeadingLevel5(line)) {
        formattedLine = `<h5>${line.replace(MarkdownRegexes.H5, '$1')}</h5>`;
    }
    else if (isHeadingLevel6(line)) {
        formattedLine = `<h6>${line.replace(MarkdownRegexes.H6, '$1')}</h6>`;
    }
    else {
        // Default to paragraph
        formattedLine = `<p>${line}</p>`
    }

    return formattedLine;
}
