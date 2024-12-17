class RecordService {

    public listening = false;
    public stream: MediaStream | null | undefined = null;
    public audioContext: AudioContext;

    constructor() {
        this.audioContext = new AudioContext();
    }

    async getAudioByMedia() {
        try {
            return await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
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

            this.stream = stream;
            console.log(stream);
        });
    }

    async endRecording() {
        await this.getAudioByMedia().then(stream => {
            stream?.getTracks().forEach((track) => {
                track.stop();
            });
        });
    }

}

export default RecordService;