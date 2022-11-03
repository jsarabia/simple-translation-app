import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

let text = [
  'James, a servant of God and of the Lord Jesus Christ, to the twelve tribes in the dispersion: Greetings!',
  'Consider it all joy, my brothers, when you experience various troubles.',
  'You know that the testing of your faith produces endurance.',
  'Let endurance complete its work so that you may become fully developed and complete, not lacking anything.',
  'But if any of you needs wisdom, let him ask for it from God, the one who gives generously and without rebuke to all who ask, and he will give it to him.',
  'But let him ask in faith, doubting nothing. For anyone who doubts is like a wave in the sea that is driven by the wind and tossed around.',
  'For that person must not think that he will receive anything from the Lord;',
  'he is a double-minded man, unstable in all his ways.',
  'Let the lowly brother boast of his high position,',
  'but the rich man of his low position, because he will pass away as a wild flower in the grass.',
  'For the sun rises with burning heat and dries up the grass. The flower falls off, and its beauty perishes. In the same way, the rich man will fade away in the middle of his journey.',
  'Blessed is the man who endures testing. For after he has passed the test, he will receive the crown of life, which has been promised to those who love God.',
  'Let no one say when he is tempted, "I am tempted by God," because God is not tempted by evil, nor does he himself tempt anyone.',
  'But each person is tempted by his own desire, which drags him away and entices him.',
  'Then after the desire conceives, it gives birth to sin, and after the sin is full grown, it gives birth to death.',
  'Do not be deceived, my beloved brothers.',
  'Every good gift and every perfect gift is from above. It comes down from the Father of lights. With him there is no changing or shadow because of turning.',
  'God chose to give us birth by the word of truth, so that we would be a kind of firstfruits of all his creatures.',
  'You know this, my beloved brothers: Let every man be quick to hear, slow to speak, and slow to anger.',
  'For the anger of man does not accomplish the righteousness of God.',
  'Therefore take off all sinful filth and abundant amounts of evil. In humility receive the implanted word, which is able to save your souls.',
  'Be doers of the word and not only hearers, deceiving yourselves.',
  'For if anyone is a hearer of the word but not a doer, he is like a man who examines his natural face in a mirror.',
  'He examines himself and then goes away and immediately forgets what he was like.',
  'But the person who looks carefully into the perfect law of freedom, and continues to do so, not just being a hearer who forgets, this man will be blessed in his actions.',
  'If anyone thinks he is religious and does not control his tongue, he deceives his heart and his religion is worthless.',
  'Religion that is pure and unspoiled before our God and Father is to help the fatherless and widows in their affliction, and to keep oneself unstained by the world.',
];

function App() {

  const [highlightedElement, setHighlightedElement] = useState()

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

export default App;
