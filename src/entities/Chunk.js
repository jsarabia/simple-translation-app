export class Chunk {
    constructor(startWord, endWord, text = "", translation = "") {
        this.start = startWord;
        this.end = endWord;
        this.text = text;
        this.translation = translation
        this.blindDrafted = translation !== "";
    }
}