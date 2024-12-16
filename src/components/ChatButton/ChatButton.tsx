import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {IChatButton} from "./interfaces/ChatButton.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import './ChatButton.css';
import TextToSpeechService from "../../shared/TextToSpeech.service";

const ChatButtonComponent = (props: IChatButton) => {

    const [audioElement, setAudioElement] = useState<HTMLAudioElement>();
    const [didUserInteract, setDidUserInteract] = useState<boolean>(false);
    const [didPlayInstructions, setDidPlayInstructions] = useState<boolean>(false);

    useEffect(() => {
        const tts = new TextToSpeechService();
        tts.getSpeechByText(props.accessibilityText).then(audioElement => {
            setAudioElement(audioElement);
        });
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