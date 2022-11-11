import { useEffect, useState } from 'react';
import MyDraft from '../domain/MyDraft';

function ChunkingView({isActive}) {

  const [highlightedElement, setHighlightedElement] = useState()
  const [text, setText] = useState([]);

  useEffect(() => {
    setText(MyDraft.getChapterText());
  }, [isActive]);

  let out = [];

  let count = 0

  for (let t of text) {
    var words = t.split(" ");
    for (let word of words) {
      count++;
      out.push((<span chunked="false" id={count} onClick={(event) => {
        if (highlightedElement != null) {
          let elem = document.getElementById(highlightedElement.id);
          if (elem.getAttribute("chunked") === "false") {
            elem.style.backgroundColor = highlightedElement.previousColor;
          }
        }

        let current = event.target.id;
        let elem = document.getElementById(current);
        if (elem.getAttribute("chunked")== "false") {
          let prevColor = elem.style.backgroundColor;
          elem.style.backgroundColor = "#DDDD0080";
          setHighlightedElement({ id: current, previousColor: prevColor });
        }
      }}>{word} </span>));
      out.push((<span> </span>));
    }
    out.push((<br></br>));
  }

  return (
    out
  );
}

export default ChunkingView;
