import OpenAI from "openai";
import {environment} from "../../../environment";
import {MuteState} from "../enums/MuteState.enum";

class TextToSpeechService {
    private audioElement: HTMLAudioElement | undefined;

    setAudioElement(audioElement: HTMLAudioElement | undefined) {
        this.audioElement = audioElement;
    }

    async playAudio() {
        const currentMuteState = localStorage.getItem('mute') ?? MuteState.UNMUTED;
        const disabled = currentMuteState === MuteState.MUTED;
        if (this.audioElement && !disabled) {
            return this.audioElement.play();
        }
    }

    async handleAudioStream(stream: ReadableStream<Uint8Array>) {
        const audioElement = new Audio();
        audioElement.src = URL.createObjectURL(new Blob([await this.streamToArrayBuffer(stream)], {type: "audio/mpeg"}));
        return audioElement;
    }

    async streamToArrayBuffer(stream: ReadableStream<Uint8Array>) {
        const chunks: Uint8Array[] = [];
        const reader = stream.getReader();
        let result;
        while (!(result = await reader.read()).done) {
            chunks.push(result.value);
        }
        return new Blob(chunks).arrayBuffer();
    }

    async getSpeechByText(text: string) {
        const openai = new OpenAI({
            apiKey: environment.apiKey,
            dangerouslyAllowBrowser: true
        });

        const response = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova",
            input: text,
        });

        if (response.body) {
            const audioStream = response.body;
            return await this.handleAudioStream(audioStream);
        }
    }
}

export default TextToSpeechService;