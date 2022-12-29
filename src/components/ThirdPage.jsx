import { useEffect, useState } from 'react';
import MyDraft from '../domain/MyDraft';
import PrepareDownloadText from '../domain/PrepareDownloadText'
import { Button, Fab, TextareaAutosize } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

function TopBar({bookCode, chapterNumber}) {

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

    return (<div className="home_page__top_bar">
        <Button component="div" color="secondary" variant="contained" onClick={() => {
            saveTextAsFile(PrepareDownloadText.process(bookCode, chapterNumber, document.getElementById("final").value), `${bookCode}_${chapterNumber}_draft.usfm`);
        }}>
            <DownloadIcon/>
            Download
        </Button>
    </div>);
}


function ThirdPage({ isActive }) {

    const [draft, setDraft] = useState({});

    useEffect(() => {
        if (isActive) {
            MyDraft.updateDraft();
            console.log(MyDraft.getDraft());
            setDraft(MyDraft.getDraft);
        }
    }, [isActive]);

    useEffect(() => {
        document.getElementById("final").value = MyDraft.getTranslation();
    }, [isActive]);

    return (
        <div className="third_page__container">
            <TopBar bookCode={draft.bookCode} chapterNumber={draft.chapterNumber}/>
            <div className="third_page__draft_container">
                <textarea className="" id="final"></textarea>
            </div>
        </div>
    )
}

export default ThirdPage;