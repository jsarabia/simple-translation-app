import ChunkingView from './ChunkingView';
import ChunkText from '../domain/ChunkText';
import BlindDraft from './BlindDraft';
import ChunkButton from './ChunkButton';
import DraftRepository from '../domain/storage/DraftRepository';

function SecondPage({ nextStep, isActive }) {
    return (
        <div>
            <button onClick={() => { 
                (async () => {
                    ChunkText.updateDraft();
                    const draft = ChunkText.getDraft()
                    await DraftRepository.updateChapterDraft(draft);
                    nextStep(); 
                })();
                }}>Finish</button>
            <BlindDraft isActive={isActive} />
        </div>
    )
}

export default SecondPage;