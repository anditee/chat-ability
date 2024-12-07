import * as React from "react";
import {useEffect} from "react";
import {IChatButton} from "./interfaces/ChatButton.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import './ChatButton.css';
import OpenAI from "openai";
import AudioPlayerFromStream from "./helpers/StreamAudio";

const ChatButtonComponent = (props: IChatButton) => {

    useEffect(() => {
        const tts = async () => {
            const openai = new OpenAI({ apiKey: 'sk-svcacct-ECrbLVbnY4YCnjcq3X_KUZhpzv3wP86XB2eXhvNsSNb6_1LrvfcqWlrHaeZvSnAy58qgPRT3BlbkFJJc23BWnQVmz3Pn15rTbB5GiIEliEbGJ_oqwkGRDu-ZDPNWpwFx8nNGVSyCNkFFOgymOpwA', dangerouslyAllowBrowser: true });

            const mp3 = await openai.audio.speech.create({
                model: "tts-1",
                voice: "alloy",
                input: "Today is a wonderful day to build something people love!",
            });

            // @ts-ignore
            AudioPlayerFromStream(mp3.body);
        }
        tts();
    }, [props.accessibilityText]);

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