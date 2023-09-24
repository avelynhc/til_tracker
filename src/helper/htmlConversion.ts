import * as htmlFs from 'fs';

export const SUPPORTED_FILE_EXTENSIONS = ['.md', '.txt'];

export function htmlConversion(title: string, cssLink: string, body: string, selectedLang: string, outputFolder: string) {
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

export function formatHtmlForMarkdownLine(line: string) {
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