import { useEffect, useState } from 'react';
import MyDraft from '../domain/MyDraft';
import ChunkText from '../domain/ChunkText';
import { useDraft, DRAFT_ACTIONS } from '../context/upload/DraftContext';

function ChunkingView({ isActive }) {

  const [{ draft, status }, reducer] = useDraft();
  const [highlightedElement, setHighlightedElement] = useState()
  const [text, setText] = useState([]);
  const [firstRenderDone, setFirstRenderDone] = useState(false);

  useEffect(() => {
    setText(MyDraft.getChapterText());
    if (isActive && status == DRAFT_ACTIONS.LOADED) {
      console.log("should update first render");
      setFirstRenderDone(true);
    } else {
      console.log(draft);
    }
  }, [status]);

  useEffect(() => {
    if (firstRenderDone) {
      ChunkText.restoreHighlight();
      console.log("restored highlight");
    }
  }, [firstRenderDone, draft]);

  let out = [];

  let count = 0;

  for (let t of text) {
    var words = t.split(" ");
    out.push(
      <p className="paragraph_text">
        {words.map((word) => {
          let spannedText = (<span class="draft_text" chunked="false" id={count} onClick={(event) => {
            if (highlightedElement != null) {
              let elem = document.getElementById(highlightedElement.id);
              if (elem.getAttribute("chunked") === "false") {
                elem.style.backgroundColor = highlightedElement.previousColor;
              }
            }

            let current = event.target.id;
            let elem = document.getElementById(current);
            if (elem.getAttribute("chunked") === "false") {
              let prevColor = elem.style.backgroundColor;
              elem.style.backgroundColor = "#DDDD0080";
              setHighlightedElement({ id: current, previousColor: prevColor });
            }
          }}>{word} </span>);
          count++;
          return spannedText;
        })}
      </p>
    );
    out.push((<span class="draft_text"> </span>));
  }

  return (
    <div class="first_page__content">
      <div class="source_text_wrap">
        <div id="chunk_holder">
          {out}
        </div>
      </div>
    </div>
  );
}

export default ChunkingView;
