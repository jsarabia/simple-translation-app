import { useEffect, useState } from 'react';
import ChunkingView from './ChunkingView';
import ChunkText from '../domain/ChunkText';
import MyDraft from '../domain/MyDraft';
import ChunkButton from './ChunkButton';
import PrepareDownloadText from '../domain/PrepareDownloadText'

function ThirdPage({isActive}) {

    const [draft, setDraft] = useState("");

    function saveTextAsFile(textToWrite, fileNameToSaveAs) {
        function destroyClickedElement(event){
            document.body.removeChild(event.target);
        }
    	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}); 
    	var downloadLink = document.createElement("a");
    	downloadLink.download = fileNameToSaveAs;
    	downloadLink.innerHTML = "Download File";
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    	downloadLink.click();
    }

    useEffect(() => {
        document.getElementById("final").value = MyDraft.getTranslation();
    }, [isActive]);

    return (
        <div>
            <textarea id="final" rows="40" cols="100">{draft}</textarea>
            <button onClick={() => {
                saveTextAsFile(PrepareDownloadText.process("jas", 1, document.getElementById("final").value), "doc.usfm");
            }}>download</button>
      </div>
      )
}

export default ThirdPage;