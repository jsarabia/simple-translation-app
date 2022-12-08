import { v4 as uuidv4 } from 'uuid';
import localForage from 'localforage';

const projectRepo = localForage.createInstance({name: "project_repository"});

async function getProjects() {
    let sources = await projectRepo.getItem("sources_list");
    if (sources === null) {
        sources = [];
    }

    let projects = [];
    for (let source of sources) {
        let project = await projectRepo.getItem(source);
        if (project != null) {
            projects.push(project);
        }
    }

    return projects;
}

/**
 * 
 * @param {id: str, version: str, title: str, usfm: str} project 
 */
async function updateProject(project) {
    await projectRepo.setItem(project.id, project);
}

async function removeProject(project) {
    await projectRepo.removeItem(project.id);
    const registry = await projectRepo.getItem("sources_list");
    const updated = registry.filter(x => x !== project.id);
    await projectRepo.setItem("sources_list", updated);
}

async function storeProject(usfmContent, filename, version = null) {
    let vs = version;
    if (vs == null) {
        vs = new Date().toISOString().slice(0, 10)
    }

    const title = filename.split(".usfm")[0].split(".USFM")[0];

    const uuid = uuidv4().replaceAll("-", "");
    const source = { id: uuid, title: title, version: vs, usfm: usfmContent };

    let sources = await projectRepo.getItem("sources_list");
    if (sources === null) {
        sources = [];
    }
    if (!sources.includes(uuid)) {
        sources.push(uuid);
        await projectRepo.setItem("sources_list", sources);
    }

    await projectRepo.setItem(uuid, source);
}

async function loadProjects() {
    const projects = await getProjects();
    return projects;
}

export { getProjects, updateProject, removeProject, storeProject, loadProjects };