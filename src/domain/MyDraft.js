let chunks = [
    {
        verseStart: 1,
        text: '',
        translation: ""
    }
];

let chapterText = [];

export default {

    setChapterText(chapterTextList) {
        chapterText = chapterTextList;
    },

    getChapterText() {
        return chapterText;
    },

    clearDraft() {
        chunks = [];
    },
    addChunk(verseStart, text) {
        chunks.push({ verseStart: verseStart, text: text, translation: "" });
    },

    addTranslation(chunkNumber, translation) {
        if (chunkNumber >= 0 && chunkNumber < chunks.length) {
            chunks[chunkNumber].translation = translation;
        }
    },

    getTranslation() {
        return chunks.map(x => x.translation+"\n").reduce((x, y) => x+y, "");
    },

    translationComplete() {
        let values = chunks.map(x => x.translation != "");
        return values.every(complete => complete == true);
    },

    getNextChunk(num) {
        let clamped = Math.max(Math.min(num, chunks.length - 1), 0);
        return chunks[clamped];
    }
}