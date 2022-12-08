import { createContext, useContext, useReducer } from "react";
import { importUSFM } from "../../domain/ImportFile";
import { loadProjects as loadProjectsFromRepo, removeProject } from "../../domain/storage/ProjectStorage";
import draftRepo from "../../domain/storage/DraftRepository";

const ProjectContext = createContext();

const PROJECT_STATUS = {
    UPLOAD: "uploading",
    DELETE: "deleting",
    LOADING: "loading",
    LOADED: "loaded",
    IDLE: "idle"
}

function createProject(dispatch, projects, usfmFile) {
    dispatch({ type: PROJECT_STATUS.UPLOAD, projects });
    (async () => {
        await importUSFM(usfmFile);
        const newProjects = await loadProjectsFromRepo();
        dispatch({ type: PROJECT_STATUS.LOADED, projects: newProjects });
    })();
}

function deleteProject(dispatch, project, chapterNumbers) {
    dispatch({ type: PROJECT_STATUS.DELETE, projects: [] });
    (async () => {
        await removeProject(project);
        for (const chapterNum of chapterNumbers) {
            const chapter = await draftRepo.getChapterDraft(project.id, chapterNum);
            if (chapter != undefined) {
                await draftRepo.removeDraft(chapter.id);
            }
        }
        loadProjects(dispatch);
    })();
}

function loadProjects(dispatch) {
    dispatch({ type: PROJECT_STATUS.LOADING });
    (async () => {
        const newProjects = await loadProjectsFromRepo();
        dispatch({ type: PROJECT_STATUS.LOADED, projects: newProjects });
    })();
}

function uploadActionReducer(state, action) {
    switch (action.type) {
        case PROJECT_STATUS.UPLOAD: {
            return { ...state, type: PROJECT_STATUS.UPLOAD };
        }
        case PROJECT_STATUS.LOADING: {
            return { projects: [], type: PROJECT_STATUS.LOADING };
        }
        case PROJECT_STATUS.LOADED: {
            return { projects: action.projects, type: PROJECT_STATUS.LOADED };
        }
        case PROJECT_STATUS.IDLE: {
            return { ...state, type: PROJECT_STATUS.IDLE };
        }
        case PROJECT_STATUS.DELETE: {
            return { ...state, type: PROJECT_STATUS.IDLE };
        }
    }
}

function ProjectContextProvider({ children }) {
    const [projects, dispatch] = useReducer(uploadActionReducer, { projects: [], type: PROJECT_STATUS.IDLE });

    const value = [projects, dispatch];

    return (<ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>);
}

function useProjects() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider');
    }
    return context;
}

export { ProjectContextProvider, useProjects, loadProjects, createProject, deleteProject };