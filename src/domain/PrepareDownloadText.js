function stripExcessNewlines(textToProcess) {
    const regex = /\n+/g;
    return textToProcess.replace(regex, "\n");
}

function convertNewlinesToVerseMarkers(textToProcess) {
    let verses = textToProcess.split("\n");
    let builder = "";
    for (const verse of verses) {
        if (verse != null && verse.trim() !== '') {
            builder += `\\p ${verse}\n`;
        }
    }
    return builder;
}

function prependHeader(bookSlug, chapterNumber, draftText) {
    return `\\toc3 ${bookSlug}

\\c ${chapterNumber}
${draftText}`;
}

export default {
    process(bookSlug, chapterNumber, draftText) {
        let outputText = stripExcessNewlines(draftText);
        outputText = convertNewlinesToVerseMarkers(outputText);
        outputText = prependHeader(bookSlug, chapterNumber, outputText);
        return outputText;
    }
}