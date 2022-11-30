import ChunkingView from './ChunkingView';
import ChunkText from '../domain/ChunkText';
import ChunkButton from './ChunkButton';
import MyDraft from '../domain/MyDraft';
import DraftRepository from '../domain/storage/DraftRepository';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

function FirstPage({ nextStep, isActive }) {
    return (
        <div class="first_page_container">
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
                <Fab color="primary" variant="extended" onClick={() => {
                    if (ChunkText.hasChunks()) {
                        nextStep()
                    }
                }}>
                    Next
                </Fab>
                </div>
        </div>
    )
}

export default FirstPage;