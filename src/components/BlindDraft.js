import { useEffect, useState } from 'react';
import myDraft from '../domain/MyDraft';

function BlindDraft({ isActive }) {
    const [sourceText, setSourceText] = useState("");
    const [draftText, setDraftText] = useState("");

    const [chunkNumber, setChunkNumber] = useState(0);

    useEffect(() => {
        if (isActive) {
            const chunk = myDraft.getNextChunk(0)
            setSourceText(chunk.text);
            document.getElementById('draftText').value = chunk.translation;
        }
    }, [isActive]);

    return (
        <div>
            <div id="chunkText">{sourceText}</div>
            <textarea id="draftText" rows="20" cols="100" onInput={() => {
                document.getElementById("chunkText").style.visibility = "hidden";
            }}></textarea>
            <button onClick={() => {
                let translationText = document.getElementById('draftText');
                myDraft.addTranslation(chunkNumber, translationText.value);
                const newChunk = myDraft.getNextChunk(chunkNumber + 1);
                setSourceText(newChunk.text);
                document.getElementById('draftText').value = newChunk.translation;
                setChunkNumber(chunkNumber + 1)
                document.getElementById("chunkText").style.visibility = "visible";
            }}>Next</button>
        </div>
    );
}

export default BlindDraft