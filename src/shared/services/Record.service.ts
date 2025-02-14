import {RecorderState} from "../enums/RecorderState.enum";
import OpenAI from "openai";
import {environment} from "../../../environment";

class RecordService {

    public listening = false;
    public stream: MediaStream | null | undefined = null;
    public audioContext: AudioContext;
    public recorder: MediaRecorder | null;
    private audioUrl = '';
    private blob: Blob | null = null;

    constructor() {
        this.audioContext = new AudioContext();
        this.recorder = null;
    }

    async getAudioByMedia() {
        try {
            return await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
        } catch (e) {
            // TODO: Notify user to enable audio
            console.error(e);
        }
    }

    async startRecording() {
        await this.audioContext.resume();

        this.getAudioByMedia().then(stream => {
            if (this.audioContext.state === 'closed') {
                return;
            }
            this.recorder = new MediaRecorder(stream!);

            const chunks: Blob[] = [];

            this.recorder.ondataavailable = (event) => {
                chunks.push(event.data);
            };

            this.recorder.onstop = () => {
                const blob = new Blob(chunks, {type: "audio/webm"});
                this.blob = blob;
                this.audioUrl = URL.createObjectURL(blob);
                this.listening = false;

                const openAi = new OpenAI({
                    apiKey: environment.apiKey,
                    dangerouslyAllowBrowser: true
                });

                const audioFile = new File([blob], 'audioFile', {
                    type: 'audio/wav',
                });

                const transcription = openAi.audio.transcriptions.create({
                    file: audioFile,
                    model: "whisper-1",
                    response_format: "text",
                }).then(response => {
                });
            };

            this.recorder.start();
        });
    }

    async endRecording() {
        if (this.recorder && this.recorder.state !== RecorderState.INACTIVE) {
            this.recorder.stop();
            this.recorder.stream.getTracks().forEach((track) => track.stop());
            this.listening = false;
        }
    }

}

export default RecordService;