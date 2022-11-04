import ChunkingView from './ChunkingView';
import ChunkText from '../domain/ChunkText';
import BlindDraft from './BlindDraft';
import ChunkButton from './ChunkButton';

function SecondPage({ nextStep, isActive }) {
    return (
        <div>
            <button onClick={() => { nextStep(); }}>Finish</button>
            <BlindDraft isActive={isActive} />
        </div>
    )
}

export default SecondPage;