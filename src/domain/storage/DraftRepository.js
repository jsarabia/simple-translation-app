import { v4 as uuidv4 } from 'uuid';
import localForage from 'localforage';

const mapperTable = "draft_mapper";
const repoTable = "draft_repository";

const draftRepo = localForage.createInstance({name: repoTable});

/**
 * Finds the draft list for the
 * @param {string} sourceId 
 * @param {int} chapterNumber 
 * @returns the chapter draft for the given source and chapter
 */
async function getChapterDraft(sourceId, chapterNumber) {
    const books = await draftRepo.getItem(mapperTable);
    const drafts = books[sourceId];
    const draftId = drafts.find((x) => x.chapter === chapterNumber);
    const draft = await draftRepo.getItem(draftId);
    return draft;
}

async function updateChapterDraft(draft) {
    const book = await draftRepo.getItem(draft.sourceId);
    book[draft.id] = draft;   
    await draftRepo.setItem(draft.sourceId, draft);
}

/**
 * Creates a draft which it stores by a uuid key.
 * 
 * A draft exists per chapter of a book. When created, its id is added to a list of draft ids
 * stored in the draft table.
 * 
 * The draft table is a mapping of a uuid key (the source document uuid) to a list containing 
 * all associated draft ids.
 * 
 * Thus, if the draft table does not exist, it is created and a key for the source document is added,
 * with a list containing the chapter draft id being created.
 * 
 * if the table exists and the source id had not been added, the draft id is added to the list.
 * 
 * Otherwise, the draft id is added to the source id's draft list if it does not already exist.
 * 
 * The draft table is then updated.
 * 
 * @param {string} sourceId the uuid of the source document
 * @param {int} chapterNumber the chapter number
 * @returns void
 */
async function createChapterDraft(sourceId, chapterNumber) {
    const draftId = uuidv4().replaceAll("-", "");
    const draft = {id: draftId, sourceId: sourceId, chapterNumber: chapterNumber, content: []};
    let drafts = await draftRepo.getItem(mapperTable);
    const draftToken = {'chapter': chapterNumber, 'id': draftId};
    if (drafts === null) {
        drafts = {};
        drafts[sourceId] = [draftToken];
    } else if (!drafts.hasOwnProperty(sourceId)) {
        drafts[sourceId] = [draftToken];
    } else {
        if (drafts[sourceId].some((x) => x.id === draftId)) {
            return; // already contains the chapter draft
        }
        drafts[sourceId].push(draft);
    }

    await draftRepo.setItem(draftId, draft);
    await draftRepo.setItem(mapperTable, drafts);
}

export default { getChapterDraft, updateChapterDraft, createChapterDraft };