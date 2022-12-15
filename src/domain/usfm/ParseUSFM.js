import { Proskomma } from 'proskomma';

const pk = new Proskomma();

async function getChapterList(project) {
    const usfm = project.usfm;
    const mutationQuery = `mutation { 
        addDocument(
            selectors: [{key: "lang", value: "eng"}, {key: "abbr", value: "ust"}],
            contentType: "usfm",
            content: """${usfm}""",
            tags: ["uuid_${project.id}"]
        )
    }`;

    const result = await pk.gqlQuery(mutationQuery);

    const chapterListQuery = `{documents(withTags: "uuid_${project.id}") {cvIndexes {chapter} }}`;

    const chapterResult = await pk.gqlQuery(chapterListQuery);
    const chapterList = chapterResult["data"]["documents"][0]["cvIndexes"].map(x => x.chapter);
    return chapterList;
}

async function loadChapterText(project, chapterNumber, byParagraph = true) {
    switch (byParagraph) {
        case true: { return loadChapterTextByParagraphs(project, chapterNumber); }
        case false: { return loadChapterTextByVerses(project, chapterNumber); }
    }
}

async function loadChapterTextByParagraphs(project, chapterNumber) {
    const paragraphsQuery = `{
        documents(withTags: "uuid_${project.id}") {
            mainSequence {
                blocks(withScriptureCV: "${chapterNumber}") {
                    text(normalizeSpace: true)
                }
            }
        }
    }`;

    const result = await pk.gqlQuery(paragraphsQuery);

    const paragraphList = result["data"]["documents"][0]["mainSequence"]["blocks"].map(x => x.text);
    return paragraphList;
}

async function loadChapterTextByVerses(project, chapterNumber) {
    const versesQuery = `{
        documents(withTags: "uuid_${project.id}") {
           cv(chapterVerses:"${chapterNumber}") {
              text(normalizeSpace: true)
           }
        }
     }`;

    const result = await pk.gqlQuery(versesQuery);

    const versesList = result["data"]["documents"][0]["cv"].map(x => x.text);
    return versesList;
}

async function getDocumentCode(project) {
    const bookCodeQuery = `{
        documents(withTags: "uuid_${project.id}") { 
          header(id:"bookCode") 
        } 
      }`;

    const result = await pk.gqlQuery(bookCodeQuery);

    return result["data"]["documents"][0]["header"];
}

export { getChapterList, loadChapterText, getDocumentCode };