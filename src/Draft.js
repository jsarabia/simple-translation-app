import ChunkText from "./domain/ChunkText"

function Draft() {
    let undo = ChunkText.getText();
    for (let item of undo) {
        let text = "";
        for (let i = item.start; i < item.end; i++) {
            text += document.getElementById(i).innerText;
        }
        alert(text);
    }

    return (<div>chunkedyeye</div>)
}

export default Draft;