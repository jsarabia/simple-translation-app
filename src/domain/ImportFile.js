import { storeProject } from "../domain/storage/ProjectStorage";

function importUSFM(file) {
    const reader = new FileReader();
    const s5Regex = /\\s5\n*/g;

        reader.onload = async function () {
            const usfm = reader.result.replaceAll(s5Regex, "");
            console.log(usfm);
            await storeProject(usfm, file.name);
            window.location.reload();
        };

    reader.readAsText(file);
}

export { importUSFM };