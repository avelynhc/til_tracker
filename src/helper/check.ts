import * as readFilePath from 'path';

export function isTextFile(filename: string): boolean {
    return readFilePath.extname(filename) === '.txt';
}

export function isMarkdownFile(filename: string): boolean {
    return readFilePath.extname(filename) === '.md';
}