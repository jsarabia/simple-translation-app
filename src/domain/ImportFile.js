import { storeProject } from "../domain/storage/ProjectStorage";

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
  
      reader.readAsText(file);
    })
  }

async function importUSFM(file) {
    const s5Regex = /\\s5\n*/g;
    let usfm = await readFileAsync(file)
    usfm = usfm.replaceAll(s5Regex, "");
    console.log(usfm);
    await storeProject(usfm, file.name);
}

export { importUSFM };