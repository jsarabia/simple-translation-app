let chunks = [
    {
        verseStart: 1,
        text: 'James, a servant of God and of the Lord Jesus Christ, to the twelve tribes in the dispersion: Greetings! Consider it all joy, my brothers, when you experience various troubles. You know that the testing of your faith produces endurance. Let endurance complete its work so that you may become fully developed and complete, not lacking anything. But if any of you needs wisdom, let him ask for it from God, the one who gives generously and without rebuke to all who ask, and he will give it to him. But let him ask in faith, doubting nothing. For anyone who doubts is like a wave in the sea that is driven by the wind and tossed around. For that person must not think that he will receive anything from the Lord; he is a double-minded man, unstable in all his ways.',
        translation: ""
    },
    {
        verseStart: 2,
        text: 'Let the lowly brother boast of his high position, but the rich man of his low position, because he will pass away as a wild flower in the grass. For the sun rises with burning heat and dries up the grass. The flower falls off, and its beauty perishes. In the same way, the rich man will fade away in the middle of his journey. Blessed is the man who endures testing. For after he has passed the test, he will receive the crown of life, which has been promised to those who love God. Let no one say when he is tempted, "I am tempted by God," because God is not tempted by evil, nor does he himself tempt anyone. But each person is tempted by his own desire, which drags him away and entices him. Then after the desire conceives, it gives birth to sin, and after the sin is full grown, it gives birth to death. Do not be deceived, my beloved brothers. Every good gift and every perfect gift is from above. It comes down from the Father of lights. With him there is no changing or shadow because of turning. God chose to give us birth by the word of truth, so that we would be a kind of firstfruits of all his creatures. You know this, my beloved brothers: Let every man be quick to hear, slow to speak, and slow to anger. For the anger of man does not accomplish the righteousness of God.',
        translation: ""
    }
];

export default {
    clearDraft() {
        chunks = [];
    },
    addChunk(verseStart, text) {
        chunks.push({ verseStart: verseStart, text: text, translation: "" });
        alert("adding " + text);
    },

    addTranslation(chunkNumber, translation) {
        if (chunkNumber >= 0 && chunkNumber < chunks.length) {
            chunks[chunkNumber].translation = translation;
        }
    },

    getTranslation() {
        return chunks.map(x => x.translation+"\n").reduce((x, y) => x+y, "");
    },

    translationComplete() {
        let values = chunks.map(x => x.translation != "");
        return values.every(complete => complete == true);
    },

    getNextChunk(num) {
        let clamped = Math.max(Math.min(num, chunks.length - 1), 0);
        return chunks[clamped];
    }
}