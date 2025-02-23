import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import './ChatInput.css';
import ChatControl from "../ChatControl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import RecordService from "../../../../shared/services/Record.service";

const ChatInput = ({}) => {

    const [userInput, setUserInput] = useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [rs] = useState(new RecordService());

    const startOrStopRecording = useCallback(() => {
        setIsRecording((prev) => {
            if (!prev) {
                rs.startRecording().then();
                return true;
            } else {
                rs.endRecording().then((transcription) => {
                    setUserInput(transcription);
                });
                return false;
            }
        });
    }, []);

    return <>
        <div className={'chat-input'}>
            <input tabIndex={0} value={userInput} onChange={console.log}/>
            <ChatControl alternativeDescription={'Aufnahme starten'} onClick={() => {
                startOrStopRecording();
            }}>
                <FontAwesomeIcon icon={faMicrophone}></FontAwesomeIcon>
            </ChatControl>
            <ChatControl alternativeDescription={'Nachricht senden'}>
                <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
            </ChatControl>
        </div>
    </>;
}

export default ChatInput;