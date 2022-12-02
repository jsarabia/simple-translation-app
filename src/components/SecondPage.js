import ChunkText from '../domain/ChunkText';
import DraftRepository from '../domain/storage/DraftRepository';
import MyDraft from '../domain/MyDraft';
import { useState, useEffect } from 'react';
import myDraft from '../domain/MyDraft';
import { Button } from '@mui/material';


function TopBar({ hasPreviousChunks, hasMoreChunks, onNext, onPrevious, onFinish }) {

    const nextButton = (<Button component="div" disabled={!hasMoreChunks} onClick={onNext} variant="contained" color="info">Next</Button>);
    const finishButton = (<Button component="div" disabled={hasMoreChunks} onClick={onFinish} variant="contained" color="secondary">Finish</Button>);

    return (<div class="second_page__actions__container">
        <div class="second_page__actions--left">
            <Button component="div" variant="contained" color="info" disabled={!hasPreviousChunks} onClick={onPrevious}>Previous</Button>
        </div>
        <div class="second_page__actions--right">
            {hasMoreChunks ? nextButton : finishButton}
        </div >
    </div>);
}

function SecondPage({ nextStep, isActive }) {

    const [sourceText, setSourceText] = useState("");
    const [chunkNumber, setChunkNumber] = useState(0);
    const [hasMoreChunks, setHasMoreChunks] = useState(false);

    function onNextChunk() {
        let translationText = document.getElementById('draftText');
        myDraft.addTranslation(chunkNumber, translationText.value);
        const newChunk = myDraft.getNextChunk(chunkNumber + 1);
        setSourceText(newChunk.text);
        document.getElementById('draftText').value = newChunk.translation;
        setChunkNumber(chunkNumber + 1)
        document.getElementById("chunkText").style.visibility = "visible";
        setHasMoreChunks(myDraft.hasMoreChunks(chunkNumber));
    }

    function onPreviousChunk() {
        let translationText = document.getElementById('draftText');
        myDraft.addTranslation(chunkNumber, translationText.value);
        const newChunk = myDraft.getNextChunk(chunkNumber - 1);
        setSourceText(newChunk.text);
        document.getElementById('draftText').value = newChunk.translation;
        setChunkNumber(chunkNumber - 1)
        document.getElementById("chunkText").style.visibility = "visible";
        setHasMoreChunks(myDraft.hasMoreChunks(chunkNumber));
    }

    async function onFinishChunk() {
        let translationText = document.getElementById('draftText');
        myDraft.addTranslation(chunkNumber, translationText.value);
        ChunkText.updateDraft();
        const draft = ChunkText.getDraft()
        await DraftRepository.updateChapterDraft(draft);
        MyDraft.loadDraft(draft);
        nextStep();
    }

    useEffect(() => {
        if (isActive) {
            const chunk = myDraft.getNextChunk(0)
            setHasMoreChunks(myDraft.hasMoreChunks(0))
            setSourceText(chunk.text);
            document.getElementById('draftText').value = chunk.translation;
        }
    }, [isActive]);

    return (
        <div class="second_page__container">
            <TopBar hasPreviousChunks={chunkNumber >= 1} hasMoreChunks={hasMoreChunks} onNext={onNextChunk} onPrevious={onPreviousChunk} onFinish={() => {
                (async () => {
                    await onFinishChunk();
                })();
            }} />
            <div class="blind_draft__container">
                <div id="chunkText">{sourceText}</div>
                <textarea id="draftText" rows="20" cols="100" onInput={() => {
                    document.getElementById("chunkText").style.visibility = "hidden";
                }}></textarea>
            </div>
        </div>
    )
}

export default SecondPage;