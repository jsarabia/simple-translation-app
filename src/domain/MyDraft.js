let chunks = [
    {
        verseStart: 1,
        text: '',
        translation: ""
    }
]; 

let chapterText = [];

let _draft = null;

export default {

    loadDraft(draft) {
        if (draft == null) return;
        if (draft.content == null) return;

        chunks = [];
        for (const chunk of draft.content) {
            chunks.push(chunk);
        }
        _draft = draft;
    },

    updateDraft() {
        _draft.content = [];
        for (const chunk of chunks) {
            _draft.content.push(chunk);
        }
    },

    getDraft() {
        return _draft;
    },

    setChapterText(chapterTextList) {
        chapterText = chapterTextList;
    },

    getChapterText() {
        return chapterText;
    },

    clearDraft() {
        chunks = [];
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
        let values = chunks.map(x => x.translation !== "");
        return values.every(complete => complete === true);
    },

    getNextChunk(num) {
        let clamped = Math.max(Math.min(num, chunks.length - 1), 0);
        return chunks[clamped];
    },

    hasMoreChunks(num) {
        if (num >= chunks.length - 2) return false;
    
        return true;
    }
}