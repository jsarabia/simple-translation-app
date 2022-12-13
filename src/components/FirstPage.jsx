import ChunkingView from './ChunkingView';
import ChunkText from '../domain/ChunkText';
import MyDraft from '../domain/MyDraft';
import DraftRepository from '../domain/storage/DraftRepository';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDraft, resetDraft } from '../context/upload/DraftContext';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Cancel } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import BackspaceIcon from '@mui/icons-material/Backspace';


function ResetChunksDialog({ onConfirm, onCancel, open }) {
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Reset chunks?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Resetting chunks will delete the blind draft for this chapter. This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>
                        <Cancel />
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} autoFocus>
                        <DeleteIcon />
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function TopBar({ onNext, onReset }) {

    const [dialogOpen, setDialogOpen] = useState(false);

    function openResetDialog() {
        setDialogOpen(!dialogOpen);
    }

    return (<div className="grid grid-cols-3 grid-rows-1 items-center h-16 min-h-full col-start-1 col-end-7 bg-blue-800">
        <div className="col-start-2 flex-grow flex justify-center align-center">
            <Button component="div" color="info" variant="contained" onClick={openResetDialog}>
                Reset
            </Button>
        </div>
        <ResetChunksDialog
            open={dialogOpen} onCancel={() => { setDialogOpen(false); }}
            onConfirm={() => {
                setDialogOpen(false);
                onReset();
            }}>
        </ResetChunksDialog>
        <div className="col-start-3 row-start-1 flex justify-end pr-5">
            <Button component="div" color="info" variant="contained" onClick={onNext} endIcon={<ArrowForwardIcon />}>
                Next
            </Button>
        </div>
    </div>);
}

function FirstPage({ nextStep, isActive }) {

    const [{ draft, status }, dispatch] = useDraft();

    async function completeBlindDraft() {
        ChunkText.updateDraft();
        const draft = ChunkText.getDraft()
        await DraftRepository.updateChapterDraft(draft);
        MyDraft.loadDraft(draft);
        nextStep();
    }

    useEffect(() => {
        console.log("ye");
    }, [draft]);

    function resetChunks() {
        console.log("reset chunks clicked");
        resetDraft(dispatch, draft);
    }

    return (
        <div className="first_page_container">
            <TopBar onNext={async () => {
                if (ChunkText.hasChunks()) {
                    await completeBlindDraft();
                }
            }}
                onReset={resetChunks}
            />
            <ChunkingView isActive={isActive} />
            <div className="first_page__fab_container">
                <Fab color="info" variant="extended" onClick={() => { ChunkText.undoChunk(); }}>
                    <UndoIcon />
                    Undo
                </Fab>
                <Fab color="secondary" variant="extended" onClick={() => { ChunkText.selectChunks(); }}>
                    <AddIcon />
                    Chunk
                </Fab>
                <Fab color="info" variant="extended" onClick={() => { ChunkText.redoChunk(); }}>
                    <RedoIcon />
                    Redo
                </Fab>
            </div>
            <div className="first_page__fab_next">

            </div>
        </div>
    )
}

export default FirstPage;