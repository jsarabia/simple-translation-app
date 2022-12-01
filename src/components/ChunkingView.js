import { useEffect, useState } from 'react';
import MyDraft from '../domain/MyDraft';
import ChunkText from '../domain/ChunkText';

function ChunkingView({ isActive }) {

  const [highlightedElement, setHighlightedElement] = useState()
  const [text, setText] = useState([]);
  const [firstRenderDone, setFirstRenderDone] = useState(false);

  useEffect(() => {
    setText(MyDraft.getChapterText());
    if (isActive) {
      setFirstRenderDone(true);
    }
  }, [isActive]);

  // your other useEffect (that works as componetDidUpdate)
  useEffect(() => {
    if (firstRenderDone) {
      console.log("should restore highlight");
      ChunkText.restoreHighlight();
    }
  }, [firstRenderDone]);

  let out = [];

  let count = 0

  for (let t of text) {
    var words = t.split(" ");
    for (let word of words) {
      count++;
      out.push((<span class="draft_text" chunked="false" id={count} onClick={(event) => {
        if (highlightedElement != null) {
          let elem = document.getElementById(highlightedElement.id);
          if (elem.getAttribute("chunked") === "false") {
            elem.style.backgroundColor = highlightedElement.previousColor;
          }
        }

        let current = event.target.id;
        let elem = document.getElementById(current);
        if (elem.getAttribute("chunked") == "false") {
          let prevColor = elem.style.backgroundColor;
          elem.style.backgroundColor = "#DDDD0080";
          setHighlightedElement({ id: current, previousColor: prevColor });
        }
      }}>{word} </span>));
      out.push((<span class="draft_text"> </span>));
    }
    count++;
    out.push((<br chunked="false" id={count}></br>));
  }

  return (
    <div class="first_page__content">
      <div class="draft_wrap">
        <div>
          <p class="">
          {out}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChunkingView;
