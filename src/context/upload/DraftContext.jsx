import { createContext, useContext, useReducer } from "react";
import draftRepo from "../../domain/storage/DraftRepository";
import { updateProject, removeProject, getProject } from "../../domain/storage/ProjectStorage";
import { loadChapterText, getDocumentCode } from "../../domain/usfm/ParseUSFM";
import ChunkText from "../../domain/ChunkText";
import MyDraft from "../../domain/MyDraft";


const DraftContext = createContext();

const DRAFT_ACTIONS = {
    LOAD: "load",
    LOADING: "loading",
    LOADED: "loaded",
    UPDATE: "update"
}

function loadDraft(dispatch, project, chapterNumber) {
    dispatch({ type: DRAFT_ACTIONS.LOADING });
    (async () => {
        if (project.code == null) {
            let code = await getDocumentCode(project);
            project.code = code;
            await updateProject(project);
        }
        let chapterText = await loadChapterText(project, chapterNumber);
        await draftRepo.createChapterDraft(project.id, chapterNumber);
        const draft = await draftRepo.getChapterDraft(project.id, chapterNumber);
        draft.bookCode = project.code;
        ChunkText.clear();
        ChunkText.loadDraft(draft);
        MyDraft.setChapterText(chapterText);
        dispatch({ draft: draft, type: DRAFT_ACTIONS.LOADED });
    })();
}

async function updateDraft(dispatch, draft) {
    await draftRepo.updateChapterDraft(draft);
    dispatch(draft, DRAFT_ACTIONS.LOADED);
}

function resetDraft(dispatch, draft) {
    console.log("resetDraft");
    (async () => {
        draft.content = [];
        await draftRepo.updateChapterDraft(draft);
        const project = await getProject(draft.sourceId);
        console.log("should reload the chunks");
        await loadDraft(dispatch, project, draft.chapterNumber);
    })();
}

function draftActionReducer(state, action) {
    switch (action.type) {
        case DRAFT_ACTIONS.LOADED: {
            return { draft: action.draft, status: DRAFT_ACTIONS.LOADED };
        }
    }
    return { draft: {}, status: action.type };
}

function DraftContextProvider({ children }) {
    const [draft, dispatch] = useReducer(draftActionReducer, { draft: {}, status: "loading" });

    const value = [draft, dispatch];
    return (<DraftContext.Provider value={value}>{children}</DraftContext.Provider>);
}

function useDraft() {
    const context = useContext(DraftContext);
    if (context === undefined) {
        throw new Error('useProject must be used within a DraftContextProvider');
    }
    return context;
}

export { DraftContextProvider, DRAFT_ACTIONS, useDraft, loadDraft, updateDraft, resetDraft };