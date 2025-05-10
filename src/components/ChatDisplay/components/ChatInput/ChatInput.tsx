import * as React from "react";
import {useCallback, useState} from "react";
import './ChatInput.css';
import ChatControl from "../ChatControl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import RecordService from "../../../../shared/services/Record.service";
import OpenAIService from "../../../../shared/services/OpenAI.service";
import {IMessage, IMessageType} from "../../../../shared/interfaces/Message.model";

interface ChatInputProps {
    messages: IMessage[][];
    addConversationPart: React.Dispatch<React.SetStateAction<IMessage[][]>>
}

const ChatInput = ({messages, addConversationPart}: ChatInputProps) => {

    const [userInput, setUserInput] = useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [rs] = useState(new RecordService());
    const [openAi] = useState(new OpenAIService());

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

    const handleKeyDownEvent = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        const sendRequest = async () => {
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

        if (e.key === 'Enter') {
            sendRequest().then();
            setUserInput('');
            playBeep();
        }

    }, [userInput, messages]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const playBeep = (volume: number = 0.2, frequency: number = 880) => {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime); // Hz

        // Lautstärke einstellen (0.0 bis 1.0)
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);

        oscillator.connect(gainNode).connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.1); // 100ms
    };

    return <>
        <div className={'chat-input'}>
            <input tabIndex={0} value={userInput} onChange={handleChange} onKeyDown={handleKeyDownEvent}/>
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