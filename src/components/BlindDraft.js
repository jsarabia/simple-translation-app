import { useEffect, useState } from 'react';
import myDraft from '../domain/MyDraft';

function BlindDraft({ isActive }) {
    const [chunk, setChunk] = useState({});

    const [chunkNumber, setChunkNumber] = useState(0);

    useEffect(() => {
        setChunk(myDraft.getNextChunk(0));
        setChunkNumber(0)
    }, [isActive]);

    return (
        <div>
            <div id="chunkText">{chunk.text}</div>
            <textarea id="draftText" rows="20" cols="100" onInput={() => {
                document.getElementById("chunkText").style.visibility = "hidden";
            }}></textarea>
            <button onClick={() => {
                let translationText = document.getElementById('draftText');
                myDraft.addTranslation(chunkNumber, translationText.value);
                const newChunk = myDraft.getNextChunk(chunkNumber + 1);
                setChunk(newChunk);
                setChunkNumber(chunkNumber + 1)
                translationText.value = newChunk.translation;
                document.getElementById("chunkText").style.visibility = "visible";
            }}>Next</button>
        </div>
    );
}

export default BlindDraft