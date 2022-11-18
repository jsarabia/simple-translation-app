import ChunkingView from './ChunkingView';
import ChunkText from '../domain/ChunkText';
import BlindDraft from './BlindDraft';
import ChunkButton from './ChunkButton';
import DraftRepository from '../domain/storage/DraftRepository';
import MyDraft from '../domain/MyDraft';

function SecondPage({ nextStep, isActive }) {
    return (
        <div>
            <button onClick={() => { 
                (async () => {
                    ChunkText.updateDraft();
                    const draft = ChunkText.getDraft()
                    await DraftRepository.updateChapterDraft(draft);
                    MyDraft.loadDraft(draft);
                    nextStep(); 
                })();
                }}>Finish</button>
            <BlindDraft isActive={isActive} />
        </div>
    )
}

export default SecondPage;