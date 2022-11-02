import { useEffect, useState } from 'react';
import App from '../App';
import ChunkText from '../domain/ChunkText';
import MyDraft from '../domain/MyDraft';
import ChunkButton from './ChunkButton';

function ThirdPage({isActive}) {

    const [draft, setDraft] = useState("no");

    useEffect(() => {
        document.getElementById("final").value = MyDraft.getTranslation();
    }, [isActive]);

    return (
        <div>
            <textarea id="final">{draft}</textarea>
            <button onClick={() => alert("what") + isActive}>download</button>
      </div>
      )
}

export default ThirdPage;