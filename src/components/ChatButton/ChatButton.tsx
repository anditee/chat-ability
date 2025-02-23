import * as React from "react";
import {useEffect, useState} from "react";
import {IChatButton} from "./interfaces/ChatButton.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import './ChatButton.css';
import TextToSpeechService from "../../shared/services/TextToSpeech.service";
import ChatDisplay from "../ChatDisplay";

const ChatButtonComponent = (props: IChatButton) => {

    const [didUserInteract, setDidUserInteract] = useState<boolean>(false);
    const [didPlayInstructions, setDidPlayInstructions] = useState<boolean>(false);
    const [audioElementSet, setAudioElementSet] = useState<boolean>(false);
    const [showChatDisplay, setShowChatDisplay] = useState<boolean>(false);
    const [tts] = useState<TextToSpeechService>(new TextToSpeechService());

    useEffect(() => {
        tts.getSpeechByText(props.accessibilityText).then(audioElement => {
            tts.setAudioElement(audioElement);
            setAudioElementSet(true);
        });
    }, [props.accessibilityText]);

    useEffect(() => {
        if (audioElementSet) {
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
        // register keydown event on load of view service
        window.addEventListener('keydown', function (event) {
            // check for set trigger key keydown
            if (event.key === props.triggerKey) {
                setShowChatDisplay(!showChatDisplay);
            }
        });
    }, [props.triggerKey, showChatDisplay]);

    const getButtonPosition = () => {
        return props.buttonPosition;
    }

    const classes = `ca-chat-button ${getButtonPosition()}`

    return <>
        <ChatDisplay messages={[]} show={showChatDisplay}></ChatDisplay>
        <button className={classes}>
            <FontAwesomeIcon icon={faRobot}/>
        </button>
    </>;
}

export default ChatButtonComponent;