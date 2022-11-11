import { storeProject } from "../domain/storage/ProjectStorage";

function importUSFM(file) {
    const reader = new FileReader();
    const s5Regex = ///s5\n*/g;

        reader.onload = async function () {
            const usfm = reader.result.replace(s5Regex, "");
            console.log(usfm);
            await storeProject(usfm, file.name);
        };

    reader.readAsText(file);
}

export { importUSFM };