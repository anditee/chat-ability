import React, {useEffect, useRef} from "react";

// @ts-ignore
const AudioPlayerFromStream = ({audioStream}) => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

    useEffect(() => {
        if (!audioStream) return;

        // Initialisiere den AudioContext
        const audioContext = new (window.AudioContext || window.AudioContext)();
        audioContextRef.current = audioContext;

        // Funktion zum Streamen und Abspielen
        const processStream = async () => {
            const reader = audioStream.getReader();

            let isPlaying = true;

            while (isPlaying) {
                const {done, value} = await reader.read();
                if (done) {
                    console.log("Stream abgeschlossen.");
                    break;
                }

                if (value) {
                    try {
                        // Decode Audio-Daten
                        const audioBuffer = await audioContext.decodeAudioData(value.buffer);
                        const source = audioContext.createBufferSource();
                        source.buffer = audioBuffer;

                        // Verbinde zur Ausgabe
                        source.connect(audioContext.destination);
                        source.start();

                        // Speichere das aktuelle Source-Node
                        sourceNodeRef.current = source;

                        // Warten bis der Buffer abgespielt ist
                        source.onended = () => {
                            sourceNodeRef.current = null;
                        };
                    } catch (error) {
                        console.error("Fehler beim Dekodieren des Audio-Streams:", error);
                    }
                }
            }
        };

        processStream();

        // Cleanup
        return () => {
            let isPlaying = false;
            if (sourceNodeRef.current) {
                sourceNodeRef.current.stop();
                sourceNodeRef.current.disconnect();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [audioStream]);

    return <div>Audio wird abgespielt...</div>;
};

export default AudioPlayerFromStream;