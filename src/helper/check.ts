const path = require('path');

export function isURL(str: string): boolean {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(str);
}

export function isTextFile(filename: string): boolean {
    return path.extname(filename) === '.txt';
}

export function isMarkdownFile(filename: string): boolean {
    return path.extname(filename) === '.md';
}