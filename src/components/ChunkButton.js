import ChunkText from "../domain/ChunkText";
import Draft from "./Draft.js";

function ChunkButton({nextStep}) {
    return (
        <div>
            <button onClick={() => { ChunkText.selectChunks(); }}>Chunk</button>
            <button onClick={() => { ChunkText.undoChunk(); }}>Undo</button>
            <button onClick={() => { ChunkText.redoChunk(); }}>Redo</button>
            <button onClick={nextStep}>Next</button>
            <button onClick={() => { 
                let root = document.getElementById("root");
                let draft = Draft();
                root.appendChild(draft);
             }}>Create Draft</button>
        </div>
    );
}

export default ChunkButton;