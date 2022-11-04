import { useEffect, useState } from 'react';
import myDraft from '../domain/MyDraft';

function BlindDraft({isActive}) {
    const [chunk, setChunk] = useState({});

    const [chunkNumber, setChunkNumber] = useState(0);

    useEffect(() => {
        setChunk(myDraft.getNextChunk(0));
        setChunkNumber(0)
    }, [isActive]);

    return (
        <div>
            <div>{chunk.text}</div>
            <textarea id="draftText" rows="20" cols="100"></textarea>
            <button onClick={() => {
                let translationText = document.getElementById('draftText');
                myDraft.addTranslation(chunkNumber, translationText.value);
                const newChunk = myDraft.getNextChunk(chunkNumber+1);
                setChunk(newChunk);
                setChunkNumber(chunkNumber+1)
                translationText.value = "";
            }}>Next</button>
        </div>
    );
}

export default BlindDraft