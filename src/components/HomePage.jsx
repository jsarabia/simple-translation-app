import { useEffect, useState } from "react";
import MyDraft from "../domain/MyDraft";
import ChunkText from "../domain/ChunkText";
import { updateProject, removeProject } from "../domain/storage/ProjectStorage";
import { loadChapterText, getChapterList, getDocumentCode } from "../domain/usfm/ParseUSFM";
import draftRepo from "../domain/storage/DraftRepository";
import List from "@mui/material/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from '@mui/icons-material/Book';
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import DescriptionIcon from '@mui/icons-material/Description';
import { Button, IconButton, ListItem } from "@mui/material";
import { useProjects, loadProjects, createProject, deleteProject } from "../context/upload/ProjectsContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Cancel } from "@mui/icons-material";


function DeleteProjectDialog({ onConfirm, onCancel, open }) {
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Book?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this book will delete all of its chapers.
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


function SourcesListItem(props) {
    const [open, setOpen] = useState(false);
    const [projects, dispatch] = useProjects();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (<>
        <ListItemButton sx={{ border: .1, margin: "10px" }} onClick={() => {
            handleClick();
            props.onClick(props.source);
        }
        }>
            <ListItemIcon>
                <BookIcon />
            </ListItemIcon>
            <ListItemText primary={props.source.title} secondary={props.source.version} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit class="text_content">
            <List component="div" disablePadding>

                <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => {
                            setDialogOpen(true);
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemText primary="Delete Book" />
                    <DeleteProjectDialog
                        open={dialogOpen} onCancel={() => { setDialogOpen(false); }}
                        onConfirm={() => { 
                            setDialogOpen(false);
                            deleteProject(dispatch, props.source, props.chapters); 
                            }}>
                    </DeleteProjectDialog>
                </ListItem>,

                {props.chapters.map(x => {
                    return (<ListItemButton sx={{ pl: 8 }} onClick={() => {
                        props.onChapterClick(x);
                    }
                    }>
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Chapter ${x}`} />
                    </ListItemButton>)
                })}
            </List>
        </Collapse></>
    );
}

function SourcesList(props) {
    return (<List>
        {props.sources.map(x => {
            return (<SourcesListItem onClick={props.onClick} onChapterClick={props.onChapterClick} source={x} chapters={props.chapters} />)
        }
        )}
    </List>)
}

function TopBar() {
    return (<div class="home_page__top_bar"></div>);
}

function HomePage(props) {

    const [activeProject, setActiveProject] = useState({});
    const [chapterList, setChapterList] = useState([]);

    const [{ projects, type }, dispatch] = useProjects();

    const projectCount = projects ?? [];

    useEffect(() => {
        console.log(`status is ${type}`);
        //if (status === "idle") {
        loadProjects(dispatch);
        //}
    }, []);

    return <div class="home_page_container">
        <TopBar />
        <div class="home_page__list">
            <SourcesList chapters={chapterList} sources={projectCount} onClick={async (source) => {
                const list = await getChapterList(source);
                setActiveProject(source);
                setChapterList(list);

            }}
                onChapterClick={
                    async (_chapter) => {
                        if (activeProject.code == null) {
                            let code = await getDocumentCode(activeProject);
                            activeProject.code = code;
                            await updateProject(activeProject);
                        }
                        let chapterText = await loadChapterText(activeProject, _chapter);
                        await draftRepo.createChapterDraft(activeProject.id, _chapter);
                        const draft = await draftRepo.getChapterDraft(activeProject.id, _chapter);
                        draft.bookCode = activeProject.code;
                        ChunkText.loadDraft(draft);
                        MyDraft.setChapterText(chapterText);
                        props.nextStep();
                    }
                }>
            </SourcesList>
            <input type="file" accept=".usfm, .usfm3, .USFM, .USFM3" onChange={(event) => {
                const files = event.target.files;
                for (const file of files) {
                    createProject(dispatch, projectCount, file);
                }
            }}></input>
        </div>
    </div>;
}

export default HomePage;