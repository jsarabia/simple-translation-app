import MyDraft from "./MyDraft";

let lastElement = 1;
let modulo = 0;

let redo = [];
let undo = [];

class ChunkRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

export default {
    selectChunks() {
        if (window.getSelection) { // non-IE
            let userSelection = window.getSelection();
            let rangeObject = userSelection.getRangeAt(0);
            let id = parseInt(rangeObject.endContainer.parentNode.id);
            let color = (modulo % 2 === 0) ? "#FF0000" : "#0000FF";
            modulo++;
            for (var i = lastElement; i <= id; i++) {
                document.getElementById(i).style.backgroundColor = color;
                document.getElementById(i).setAttribute("chunked", "true");
            }
            undo.push(new ChunkRange(lastElement, id))
            lastElement = id + 1;
            redo = [];
        }
    },
    undoChunk() {
        if (undo.length > 0) {
            let chunk = undo.pop();
            modulo--;
            for (let i = chunk.start; i <= chunk.end; i++) {
                document.getElementById(i).style.backgroundColor = "#00000000";
                document.getElementById(i).setAttribute("chunked", "false");
            }
            redo.push(chunk);
        }
    },
    redoChunk() {
        if (redo.length > 0) {
            let chunk = redo.pop();
            let color = (modulo % 2 === 0) ? "#FF0000" : "#0000FF";
            for (let i = chunk.start; i <= chunk.end; i++) {
                document.getElementById(i).style.backgroundColor = color;
                document.getElementById(i).setAttribute("chunked", "true");
            }
            modulo++;
            undo.push(chunk);
        }
    },
    getText() {
        return undo;
    },
    hasChunks() {
        return undo.length > 0;
    },
    createDraft() {
        MyDraft.clearDraft();
        for (let chunk of undo) {
            let chunkText = "";
            for (let i = chunk.start; i <= chunk.end; i++) {
                chunkText += document.getElementById(i).innerText;
            }
            MyDraft.addChunk(chunk.start, chunkText);
        }
    }
}