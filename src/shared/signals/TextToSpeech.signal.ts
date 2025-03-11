import {signal} from "@preact/signals-react";
import TextToSpeechService from "../services/TextToSpeech.service";

const tts = signal(new TextToSpeechService());
const textToPlay = signal<string>('');
let isPlaying = false;

const playText = () => {
    // Stop current playing track
    tts.value.pause().then(() => {
        tts.value.getSpeechByText(textToPlay.value).then(audioElement => {
            tts.value.setAudioElement(audioElement);
            tts.value.playAudio().then(() => {
                isPlaying = false;
            });
        });
    });
};

const setTextToPlay = (text: string) => {
    textToPlay.value = text;

    playText();
    if (!isPlaying) {
        isPlaying = true;
    }
}

export {tts, setTextToPlay};