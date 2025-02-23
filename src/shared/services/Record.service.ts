import {RecorderState} from "../enums/RecorderState.enum";
import OpenAI from "openai";
import {environment} from "../../../environment";

class RecordService {

    public listening = false;
    public stream: MediaStream | null | undefined = null;
    public audioContext: AudioContext | null;
    public recorder: MediaRecorder | null;
    public transcription = '';
    private audioUrl = '';
    private blob: Blob | null = null;
    private chunks: Blob[] = [];

    constructor() {
        this.audioContext = null;
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
        if (!this.audioContext) {
            this.audioContext = new AudioContext();
        }

        await this.audioContext.resume();

        this.getAudioByMedia().then(stream => {
            if (this.audioContext && this.audioContext.state === 'closed') {
                return;
            }
            this.recorder = new MediaRecorder(stream!);

            this.recorder.ondataavailable = (event) => {
                this.chunks.push(event.data);
            };

            this.recorder.start();
        });
    }

    async endRecording() {
        if (this.recorder && this.recorder.state !== RecorderState.INACTIVE) {
            this.recorder.stop();
            this.recorder.stream.getTracks().forEach((track) => {
                this.recorder!.stream!.removeTrack(track);
                track.stop()
            });
            this.listening = false;
        }

        return new Promise<string>((resolve, reject) => {
            if (this.recorder) {
                this.recorder.onstop = async () => {
                    const blob = new Blob(this.chunks, {type: "audio/webm"});
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

                    openAi.audio.transcriptions.create({
                        file: audioFile,
                        model: "whisper-1",
                        response_format: "text",
                        language: "de",
                    }).then(response => resolve(response));

                };
            }
        });
    }

}

export default RecordService;