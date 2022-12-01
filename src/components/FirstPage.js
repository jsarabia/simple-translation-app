import ChunkingView from './ChunkingView';
import ChunkText from '../domain/ChunkText';
import ChunkButton from './ChunkButton';
import MyDraft from '../domain/MyDraft';
import DraftRepository from '../domain/storage/DraftRepository';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

function TopBar({ onNext }) {
    return (<div class="home_page__top_bar">
        <Button component="div" color="primary" variant="contained" onClick={onNext}>
            Next
        </Button>
    </div>);
}

function FirstPage({ nextStep, isActive }) {

    async function completeBlindDraft() {
        ChunkText.updateDraft();
        const draft = ChunkText.getDraft()
        await DraftRepository.updateChapterDraft(draft);
        MyDraft.loadDraft(draft);
        nextStep();
    }

    return (
        <div class="first_page_container">
            <TopBar onNext={async () => {
                if (ChunkText.hasChunks()) {
                    await completeBlindDraft();
                }
            }} />
            <ChunkingView isActive={isActive} />
            <div class="first_page__fab_container">
                <Fab color="tertiary" variant="extended" onClick={() => { ChunkText.undoChunk(); }}>
                    <UndoIcon />
                    Undo
                </Fab>
                <Fab color="secondary" variant="extended" onClick={() => { ChunkText.selectChunks(); }}>
                    <AddIcon />
                    Chunk
                </Fab>
                <Fab color="tertiary" variant="extended" onClick={() => { ChunkText.redoChunk(); }}>
                    <RedoIcon />
                    Redo
                </Fab>
            </div>
            <div class="first_page__fab_next">

            </div>
        </div>
    )
}

export default FirstPage;