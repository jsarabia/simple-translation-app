import ChunkingView from './ChunkingView';
import ChunkText from '../domain/ChunkText';
import ChunkButton from './ChunkButton';

function FirstPage({ nextStep, isActive }) {
    return (
        <div>
            <ChunkButton isActive={isActive} nextStep={
                () => {
                    ChunkText.createDraft();
                    nextStep();
                }
            } />
            <ChunkingView />
        </div>
    )
}

export default FirstPage;