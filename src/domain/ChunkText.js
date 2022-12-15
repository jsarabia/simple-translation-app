import MyDraft from "./MyDraft";
import { Chunk } from "../entities/Chunk";

let lastElement = 1;
let modulo = 0;

let redo = [];
let undo = [];

let _draft = {};

const primaryColor = "#e54686";
const secondaryColor = "#2692d0";

function loadDraft(draft) {
    lastElement = 1;
    modulo = 0;
    redo = [];
    undo = [];
    if (draft.content.length > 0) {
        for (const chunk of draft.content) {
            addChunk(new Chunk(chunk.start, chunk.end, chunk.text, chunk.translation, chunk.blindDrafted));
        }
        setLastElement(draft.content[draft.content.length - 1].end + 1);
    }
    _draft = draft;
}

function updateDraft() {
    _draft.content = [];
    for (const chunk of undo) {
        _draft.content.push(chunk);
    }
}

function getDraft() {
    return _draft;
}

function addChunk(chunkRange) {
    undo.push(chunkRange);
    redo = [];
}

function selectChunks() {
    if (window.getSelection) { // non-IE
        let userSelection = window.getSelection();
        let rangeObject = userSelection.getRangeAt(0);
        let id = parseInt(rangeObject.endContainer.parentNode.id);
        const text = highlightChunks(lastElement, id);
        addChunk(new Chunk(lastElement, id, text));
        lastElement = id + 1;
        redo = [];
    }
}

function restoreHighlight() {
    if (_draft == null) return;
    if (_draft.content == null) return;

    for (const chunk of _draft.content) {
        highlightChunks(chunk.start, chunk.end);
    }
}

function clearHighlight() {
    const draft_holder = document.getElementById("chunk_holder");
    for (const elm of draft_holder.children) {
        elm.style.backgroundColor = "#00000000";
        elm.setAttribute("chunked", "false");
    }
}

function highlightChunks(start, end) {
    let color = (modulo % 2 === 0) ? primaryColor : secondaryColor;
    modulo++;
    let text = "";
    for (var i = start; i <= end; i++) {
        const element = document.getElementById(i)
        element.style.backgroundColor = color;
        element.setAttribute("chunked", "true");
        text += element.textContent;
    }
    return text;
}

function setLastElement(last) {
    lastElement = last;
}

function undoChunk() {
    if (undo.length > 0) {
        let chunk = undo.pop();
        modulo++;
        for (let i = chunk.start; i <= chunk.end; i++) {
            document.getElementById(i).style.backgroundColor = "#00000000";
            document.getElementById(i).setAttribute("chunked", "false");
        }
        lastElement = (undo.length > 0)? undo[undo.length - 1].end + 1: 0;
        redo.push(chunk);
    }
}
function redoChunk() {
    if (redo.length > 0) {
        let chunk = redo.pop();
        let color = (modulo % 2 === 0) ? primaryColor : secondaryColor;
        for (let i = chunk.start; i <= chunk.end; i++) {
            document.getElementById(i).style.backgroundColor = color;
            document.getElementById(i).setAttribute("chunked", "true");
        }
        modulo++;
        lastElement = (undo.length > 0)? undo[undo.length - 1].end + 1 : 0;
        undo.push(chunk);
    }
}

function getText() {
    return undo;
}

function hasChunks() {
    return undo.length > 0;
}

function getChunks() {
    return undo.map(x => x);
}

function clear() {
    undo = [];
    redo = [];
    lastElement = 1;
    modulo = 0;
    _draft = {};
    clearHighlight();
}


export default {
    addChunk,
    selectChunks,
    undoChunk,
    redoChunk,
    getText,
    hasChunks,
    setLastElement,
    loadDraft,
    updateDraft,
    getDraft,
    restoreHighlight,
    clear
}