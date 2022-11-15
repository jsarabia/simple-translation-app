import { useEffect, useState } from "react";
import MyDraft from "../domain/MyDraft";
import { loadProjects } from "../domain/storage/ProjectStorage";
import { importUSFM } from "../domain/ImportFile";
import {loadChapterText, getChapterList} from "../domain/usfm/ParseUSFM";
import draftRepo from "../domain/storage/DraftRepository";

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
                        await draftRepo.createChapterDraft(activeProject.id, chapter);
                        MyDraft.setChapterText(chapterText);
                        props.nextStep();
                    })()
                }
                }>{chapter}</button>
            })}
        </li>
        <input type="file" accept=".usfm, .usfm3, .USFM, .USFM3" onChange={(event) => {
            const files = event.target.files;
            for (const file of files) {
                importUSFM(file);
            }
        }}></input>
    </div>;
}

export default HomePage;