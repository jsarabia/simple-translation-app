import { useEffect } from "react";
import ChunkText from "../domain/ChunkText";
import Draft from "./Draft.js";

function ChunkButton({nextStep, isActive}) {

    function handleChunkPress(event) {
        if (event.key === " ") {
            console.log("space pressed");
            ChunkText.selectChunks();
        }
    }

    useEffect(() => {
        if (isActive) {
            document.addEventListener('keydown', handleChunkPress)
        } else {
            document.removeEventListener('keydown', handleChunkPress);
        }
    }, [isActive]);

    return (
        <div>
            <button id="chunkAction" onClick={() => { ChunkText.selectChunks(); }}>Chunk</button>
            <button onClick={() => { ChunkText.undoChunk(); }}>Undo</button>
            <button onClick={() => { ChunkText.redoChunk(); }}>Redo</button>
            <button onClick={
                () => {
                    if (ChunkText.hasChunks()) {
                        nextStep()
                    }
                }
            }>Next</button>
            <button onClick={() => { 
                let root = document.getElementById("root");
                let draft = Draft();
                root.appendChild(draft);
             }}>Create Draft</button>
        </div>
    );
}

export default ChunkButton;