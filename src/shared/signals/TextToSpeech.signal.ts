import {signal} from "@preact/signals-react";
import TextToSpeechService from "../services/TextToSpeech.service";

const tts = signal(new TextToSpeechService());

const playText = (textToPlay: string) => {
    // Stop current playing track
    tts.value.pause().then(() => {
        tts.value.getSpeechByText(textToPlay).then(audioElement => {
            tts.value.setAudioElement(audioElement);
            tts.value.playAudio().then(() => {
            });
        });
    });
};

export {tts, playText};