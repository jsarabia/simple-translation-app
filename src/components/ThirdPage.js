import { useEffect, useState } from 'react';
import MyDraft from '../domain/MyDraft';
import PrepareDownloadText from '../domain/PrepareDownloadText'
import { Button, Fab, TextareaAutosize } from '@mui/material';

function TopBar() {

    function saveTextAsFile(textToWrite, fileNameToSaveAs) {
        function destroyClickedElement(event) {
            document.body.removeChild(event.target);
        }
        var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    return (<div class="home_page__top_bar">
        <Button component="div" color="secondary" variant="contained" onClick={() => {
            saveTextAsFile(PrepareDownloadText.process("jas", 1, document.getElementById("final").value), "doc.usfm");
        }}>
            Download
        </Button>
    </div>);
}


function ThirdPage({ isActive }) {

    const [draft, setDraft] = useState("");

    useEffect(() => {
        if (isActive) {
            MyDraft.updateDraft();
            console.log(MyDraft.getDraft());
        }
    }, [isActive]);

    useEffect(() => {
        document.getElementById("final").value = MyDraft.getTranslation();
    }, [isActive]);

    return (
        <div class="third_page__container">
            <TopBar />
            <div class="third_page__draft_container">
                <TextareaAutosize class="draft_text" sx={{width: 600}} id="final">{draft}</TextareaAutosize>
            </div>
        </div>
    )
}

export default ThirdPage;