import * as React from "react";
import {useEffect, useState} from "react";
import {IChatButton} from "./interfaces/ChatButton.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import './ChatButton.css';
import {showOrHideChat} from "../../shared/signals/ShowChat.signal";
import {setTextToPlay, tts} from "../../shared/signals/TextToSpeech.signal";
import {useSignalEffect} from "@preact/signals-react";

const ChatButtonComponent = (props: IChatButton) => {

    const [didUserInteract, setDidUserInteract] = useState<boolean>(false);
    const [didPlayInstructions, setDidPlayInstructions] = useState<boolean>(false);
    const [audioElementSet, setAudioElementSet] = useState<boolean>(false);

    useEffect(() => {
        setTextToPlay(props.accessibilityText);
    }, [props.accessibilityText]);

    useEffect(() => {
        if (audioElementSet) {
            window.addEventListener('click', () => {
                setDidUserInteract(true);
            });
        }
    }, [audioElementSet]);

    useSignalEffect(() => {
        if (didUserInteract && !didPlayInstructions) {
            tts.value.playAudio().then(() => {
                setDidPlayInstructions(true);
            });
        }
    });

    useEffect(() => {
        // register keydown event on load of view service
        window.addEventListener('keydown', function (event) {
            // check for set trigger key keydown
            if (event.key === props.triggerKey) {
                showOrHideChat();
            }
        });
    }, [props.triggerKey]);

    const getButtonPosition = () => {
        return props.buttonPosition;
    }

    const classes = `ca-chat-button ${getButtonPosition()}`

    return <>
        <button
            className={classes}
            aria-label={props.alternativeText}>
            <FontAwesomeIcon icon={faRobot}/>
        </button>
    </>;
}

export default ChatButtonComponent;