import { useEffect, useState } from "react";
import localForage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import { Proskomma } from 'proskomma';
import MyDraft from "../domain/MyDraft";

const pk = new Proskomma();

async function getChapter(projectId) {

}

async function getProjects() {
    let sources = await localForage.getItem("sources_list");
    if (sources === null) {
        sources = [];
    }

    let projects = [];
    for (let source of sources) {
        let project = await localForage.getItem(source);
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
    await localForage.setItem(project.id, project);
}

async function removeProject(project) {
    await localForage.removeItem(project.id);
    const registry = await localForage.getItem("sources_list");
    const updated = registry.filter(x => x === project.id);
    await localForage.setItem("sources_list", updated);
}

async function storeProject(usfmContent, title, version = null) {
    let vs = version;
    if (vs == null) {
        vs = new Date().toISOString().slice(0, 10)
    }

    const uuid = uuidv4();
    const source = { id: uuid, title: title, version: vs, usfm: usfmContent };

    let sources = await localForage.getItem("sources_list");
    if (sources === null) {
        sources = [];
    }
    if (!sources.includes(uuid)) {
        sources.push(uuid);
        await localForage.setItem("sources_list", sources);
    }

    localForage.setItem(uuid, source);
}

function importUSFM(file) {
    const reader = new FileReader();
    const s5Regex = ///s5\n*/g;

        reader.onload = async function () {
            const usfm = reader.result.replace(s5Regex, "");
            console.log(usfm);
            await storeProject(usfm, "okay");
        };

    reader.readAsText(file);
}

async function loadProjects() {
    const projects = await getProjects();
    return projects;
}

async function getChapterList(project) {
    const usfm = project.usfm;
    const mutationQuery = `mutation { addDocument(` +
        `selectors: [{key: "lang", value: "eng"}, {key: "abbr", value: "ust"}], ` +
        `contentType: "usfm", ` +
        `content: """${usfm}""") }`;

    const result = await pk.gqlQuery(mutationQuery);

    const chapterListQuery = `{documents {cvIndexes {chapter} }}`;

    const chapterResult = await pk.gqlQuery(chapterListQuery);
    const chapterList = chapterResult["data"]["documents"][0]["cvIndexes"].map(x => x.chapter);
    return chapterList;
}

async function loadChapterText(project, chapterNumber) {
    const versesQuery = `{
        documents {
           cv(chapterVerses:"${chapterNumber}") {
              text(normalizeSpace: true)
           }
        }
     }`;

     const result = await pk.gqlQuery(versesQuery);

    const versesList = result["data"]["documents"][0]["cv"].map(x => x.text);
    return versesList;
}

function HomePage(props) {

    const [projectCount, setProjectCount] = useState([]);
    const [activeProject, setActiveProject] = useState({});
    const [chapterList, setChapterList] = useState([]);

    useEffect(() => {
        async function setup() {
            let projects = await loadProjects();
            setProjectCount(projects);
        }
        setup();
    }, []);

    return <div>
        <li>
            {projectCount.map(x => {
                return <button onClick={() => {
                    (async () => {
                        const list = await getChapterList(x);
                        setActiveProject(x);
                        setChapterList(list);
                    })()
                }
                }>{x.version} {x.title}</button>
            })}
        </li>
        <li>
            {chapterList.map(chapter => {
                return <button onClick={() => {
                    (async () => {
                        let chapterText = await loadChapterText(activeProject, chapter);
                        MyDraft.setChapterText(chapterText);
                        props.nextStep();
                    })()
                }
                }>{chapter}</button>
            })}
        </li>
        <input type="file" accept=".usfm, .usfm3, .USFM, .USFM3" onChange={(event) => {
            importUSFM(event.target.files[0]);
        }}></input>
    </div>;
}

export default HomePage;