import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {IChatButton} from "./interfaces/ChatButton.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import './ChatButton.css';
import TextToSpeechService from "../../shared/services/TextToSpeech.service";
import RecordService from "../../shared/services/Record.service";

const ChatButtonComponent = (props: IChatButton) => {

    const [didUserInteract, setDidUserInteract] = useState<boolean>(false);
    const [didPlayInstructions, setDidPlayInstructions] = useState<boolean>(false);
    const [audioElementSet, setAudioElementSet] = useState<boolean>(false);
    const [tts] = useState<TextToSpeechService>(new TextToSpeechService());

    useEffect(() => {
        tts.getSpeechByText(props.accessibilityText).then(audioElement => {
            tts.setAudioElement(audioElement);
            setAudioElementSet(true);
        });
    }, [props.accessibilityText]);

    useEffect(() => {
        if(audioElementSet) {
            window.addEventListener('click', () => {
                setDidUserInteract(true);
            });
        }
    }, [audioElementSet]);

    useEffect(() => {
        if (didUserInteract && !didPlayInstructions) {
            tts.playAudio().then(() => {
                setDidPlayInstructions(true);
            });
        }
    }, [didUserInteract, didPlayInstructions]);

    useEffect(() => {
        const rs = new RecordService();
        let isRecording = false;

        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && !isRecording) {
                isRecording = true;
                event.preventDefault();
                rs.startRecording().then();
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.code === 'Space' && isRecording) {
                event.preventDefault();
                rs.endRecording().then(() => {
                });
                isRecording = false;
            }
        });
    }, []);

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