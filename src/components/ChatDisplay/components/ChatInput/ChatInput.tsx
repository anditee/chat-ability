import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import './ChatInput.css';
import ChatControl from "../ChatControl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import RecordService from "../../../../shared/services/Record.service";
import OpenAIService from "../../../../shared/services/OpenAI.service";
import {IMessage, IMessageType} from "../../../../shared/interfaces/Message.model";
import {setTextToPlay} from "../../../../shared/signals/TextToSpeech.signal";

interface ChatInputProps {
    messages: IMessage[][];
    addConversationPart: React.Dispatch<React.SetStateAction<IMessage[][]>>
}

const ChatInput = ({messages, addConversationPart}: ChatInputProps) => {

    const [userInput, setUserInput] = useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [rs] = useState(new RecordService());
    const [openAi] = useState(new OpenAIService());
    const inputRef = useRef<HTMLInputElement>(null);

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

    const sendRequest = async () => {
        setUserInput('');
        playBeep();

        const responseText = await openAi.sendRequest(userInput, messages);

        const request = {
            content: userInput,
            type: IMessageType.REQUEST
        };

        const response = {
            content: responseText ?? '',
            type: IMessageType.RESPONSE
        };

        const newMessageGroup = [request, response];
        addConversationPart([...messages, newMessageGroup]);
    }

    const handleKeyDownEvent = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendRequest().then();
        }

    }, [userInput, messages]);

    const playBeep = (volume: number = 0.2, frequency: number = 880) => {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime); // Hz

        gainNode.gain.setValueAtTime(volume, ctx.currentTime);

        oscillator.connect(gainNode).connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.1);
    };

    const playUserInput = useCallback(() => {
        if (userInput.trim()) {
            setTextToPlay("Ihre Eingabe lautet: " + userInput);
        }
    }, [userInput]);

    return <>
        <div className={'chat-input'}>
            <input
                tabIndex={0}
                value={userInput}
                onKeyDown={handleKeyDownEvent}
                ref={inputRef}
                onChange={(e) => setUserInput(e.target.value)}
                onClick={(e) => e.currentTarget.focus()}
                onFocus={(e) => {
                    const value = e.target.value;
                    if (value.trim()) {
                        setTextToPlay('Ihre Eingabe lautet: ' + value);
                    }
                }}/>
            <ChatControl alternativeDescription={'Aufnahme starten'} onClick={() => {
                startOrStopRecording();
            }}>
                <FontAwesomeIcon icon={faMicrophone}></FontAwesomeIcon>
            </ChatControl>
            <ChatControl alternativeDescription={'Nachricht senden'} onClick={() => sendRequest().then()}>
                <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
            </ChatControl>
        </div>
    </>;
}

export default ChatInput;