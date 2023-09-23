// Special Tokens
enum HtmlTokens {
    H1 = '# ',
    H2 = '## ',
    H3 = '### ',
    H4 = '#### ',
    H5 = '##### ',
    H6 = '###### ',
}

function isHeadingLevel1(line: string): boolean {
    return line.startsWith(HtmlTokens.H1);
}

function isHeadingLevel2(line: string): boolean {
    return line.startsWith(HtmlTokens.H2);
}

function isHeadingLevel3(line: string): boolean {
    return line.startsWith(HtmlTokens.H3);
}

function isHeadingLevel4(line: string): boolean {
    return line.startsWith(HtmlTokens.H4);
}

function isHeadingLevel5(line: string): boolean {
    return line.startsWith(HtmlTokens.H5);
}

function isHeadingLevel6(line: string): boolean {
    return line.startsWith(HtmlTokens.H6);
}

// Line formatter
export function formatHtmlForMarkdownLine(line: string) {
    let formattedLine = line;

    if (isHeadingLevel1(line)) {
        formattedLine = `<h1>${line.replace(HtmlTokens.H1, '')}</h1>`;
    }
    else if (isHeadingLevel2(line)) {
        formattedLine = `<h2>${line.replace(HtmlTokens.H2, '')}</h2>`;
    }
    else if (isHeadingLevel3(line)) {
        formattedLine = `<h3>${line.replace(HtmlTokens.H3, '')}</h3>`;
    }
    else if (isHeadingLevel4(line)) {
        formattedLine = `<h4>${line.replace(HtmlTokens.H4, '')}</h4>`;
    }
    else if (isHeadingLevel5(line)) {
        formattedLine = `<h5>${line.replace(HtmlTokens.H5, '')}</h5>`;
    }
    else if (isHeadingLevel6(line)) {
        formattedLine = `<h6>${line.replace(HtmlTokens.H6, '')}</h6>`;
    }
    else {
        // Default to paragraph
        formattedLine = `<p>${line}</p>`
    }

    return formattedLine;
}
