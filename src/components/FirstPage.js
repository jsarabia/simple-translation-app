import App from '../App';
import ChunkText from '../domain/ChunkText';
import ChunkButton from './ChunkButton';

function FirstPage({nextStep}) {
    return (
        <div>
            <ChunkButton nextStep={
                () => {
                    ChunkText.createDraft();
                    nextStep();
                }
            }/>
            <App/>
      </div>
      )
}

export default FirstPage;