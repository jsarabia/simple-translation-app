import ChunkText from '../domain/ChunkText';
import DraftRepository from '../domain/storage/DraftRepository';
import MyDraft from '../domain/MyDraft';
import { useState, useEffect } from 'react';
import myDraft from '../domain/MyDraft';
import { Button, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function TopBar({ hasPreviousChunks, hasMoreChunks, onNext, onPrevious, onFinish }) {

    const finishButton = (<Button component="div" disabled={hasMoreChunks} onClick={onFinish} variant="contained" color="secondary" endIcon={<ArrowForwardIcon />}>Finish</Button>);

    return (<div className="second_page__actions__container">
        <div className="second_page__actions--right">
            {finishButton}
        </div >
    </div>);
}

function ReviewList({ chunks }) {

    return (
        <ul className='mr-auto ml-auto w-5/6 mt-1 mb-1'>
            {
                chunks.map(chunk => {
                    return (
                        <Paper elevation={6} sx= {{margin: 2}} >
                            <div className='grid grid-cols-2 min-w-full h-80 p-4'>
                                <p className='col-start-1 overflow-scroll p-4 justify-start align-start'>
                                    {chunk.text}
                                </p>
                                <textarea className="col-start-2" defaultValue={chunk.translation}
                                    onChange={(event) => {chunk.translation = event.target.value;}}
                                ></textarea>
                            </div>
                    </Paper>
                    );
                })
            }
        </ul>
    )
}

function ReviewPage({ nextStep, isActive }) {

    const [chunks, setChunks] = useState([]);

    async function onFinishChunk() {
        myDraft.updateDraft();
        const draft = myDraft.getDraft()
        await DraftRepository.updateChapterDraft(draft);
        MyDraft.loadDraft(draft);
        nextStep();
    }

    useEffect(() => {
        if (isActive) {
            setChunks(myDraft.getChunks());
        }
    }, [isActive]);

    return (
        <div className="second_page__container">
            <TopBar onFinish={() => {
                (async () => {
                    await onFinishChunk();
                })();
            }} />
            <div className="overflow-scroll m-h-full m-w-full row-start-2 col-start-2">
                <ReviewList chunks={chunks}/>
            </div>
        </div>
    )
}

export default ReviewPage;