import ChunkingView from './ChunkingView';
import ChunkText from '../domain/ChunkText';
import ChunkButton from './ChunkButton';
import MyDraft from '../domain/MyDraft';
import DraftRepository from '../domain/storage/DraftRepository';

function FirstPage({ nextStep, isActive }) {
    return (
        <div>
            <ChunkButton isActive={isActive} nextStep={() => {
                (async () => {
                    ChunkText.updateDraft();
                    const draft = ChunkText.getDraft()
                    await DraftRepository.updateChapterDraft(draft);
                    MyDraft.loadDraft(draft);
                    nextStep();
                })();
            }
            } />
            <ChunkingView isActive={isActive} />
        </div>
    )
}

export default FirstPage;