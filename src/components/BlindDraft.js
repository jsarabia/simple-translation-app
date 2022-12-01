import { useEffect, useState } from 'react';

function BlindDraft({ draftText, sourceText }) {

    useEffect(() => {
        let chunkText=document.getElementById("chunkText");
        chunkText.style.visibility = "visible";
        chunkText.value = draftText;
    }, [sourceText]);

    return (
        (<></>)
    );
}

export default BlindDraft