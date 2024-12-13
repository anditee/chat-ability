import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {IChatButton} from "./interfaces/ChatButton.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import './ChatButton.css';
import OpenAI from "openai";

const ChatButtonComponent = (props: IChatButton) => {

    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement>();
    const [didUserInteract, setDidUserInteract] = useState<boolean>(false);
    const [didPlayInstructions, setDidPlayInstructions] = useState<boolean>(false);

    useEffect(() => {
        const handleAudioStream = async (stream: ReadableStream<Uint8Array>) => {
            const audioElement = new Audio();
            audioElement.src = URL.createObjectURL(new Blob([await streamToArrayBuffer(stream)], {type: "audio/mpeg"}));
            setAudioElement(audioElement);
        };

        const streamToArrayBuffer = async (stream: ReadableStream<Uint8Array>) => {
            const chunks: Uint8Array[] = [];
            const reader = stream.getReader();
            let result;
            while (!(result = await reader.read()).done) {
                chunks.push(result.value);
            }
            return new Blob(chunks).arrayBuffer();
        };

        const tts = async () => {
            const openai = new OpenAI({
                apiKey: 'sk-svcacct-ECrbLVbnY4YCnjcq3X_KUZhpzv3wP86XB2eXhvNsSNb6_1LrvfcqWlrHaeZvSnAy58qgPRT3BlbkFJJc23BWnQVmz3Pn15rTbB5GiIEliEbGJ_oqwkGRDu-ZDPNWpwFx8nNGVSyCNkFFOgymOpwA',
                dangerouslyAllowBrowser: true
            });

            const response = await openai.audio.speech.create({
                model: "tts-1",
                voice: "alloy",
                input: props.accessibilityText,
            });

            if (response.body) {
                const audioStream = response.body;
                await handleAudioStream(audioStream);
            }
        }
        tts();
    }, [props.accessibilityText]);

    useEffect(() => {
        window.addEventListener('click', () => {
            setDidUserInteract(true);
        });

    }, []);

    useEffect(() => {
        if (audioElement && !didPlayInstructions) {
            audioElement.play().then(() => {
                setDidPlayInstructions(true);
            });
        }
    }, [didUserInteract])

    const getButtonPosition = () => {
        return props.buttonPosition;
    }

    const classes = `ca-chat-button ${getButtonPosition()}`

    return <>
        <button className={classes}>
            <FontAwesomeIcon icon={faRobot}/>
        </button>
    </>;
}

export default ChatButtonComponent;