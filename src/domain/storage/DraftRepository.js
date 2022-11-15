import { v4 as uuidv4 } from 'uuid';
import localForage from 'localforage';

const mapperTable = "draft_mapper";
const repoTable = "draft_repository";

const draftRepo = localForage.createInstance({name: repoTable});

async function getChapterDraft(sourceId, chapterNumber) {
    const drafts = await draftRepo.getItem(mapperTable);
    const entries = Object.entries.map((x) => x[1]);
    const draft = entries.find((x) => x.chapterNumber === chapterNumber);
    return draft;
}

async function updateChapterDraft(draft) {
    const book = await draftRepo.getItem(draft.sourceId);
    book
    await draftRepo.setItem(draft.id, draft);
}

async function createChapterDraft(sourceId, chapterNumber) {
    const draftId = uuidv4().replaceAll("-", "");
    const draft = {id: draftId, sourceId: sourceId, chapterNumber: chapterNumber, content: []};
    let drafts = await draftRepo.getItem(mapperTable);
    if (drafts === null) {
        drafts = {};
        drafts[sourceId] = [draft];
    } else if (!drafts.hasOwnProperty(sourceId)) {
        drafts[sourceId] = [draft];
    } else {
        // draft[sourceId].push(draft);
        return; // if the key exists, maybe we shouldn't update it?
    }

    await draftRepo.setItem(sourceId, drafts);
}

export default { getChapterDraft, updateChapterDraft, createChapterDraft };