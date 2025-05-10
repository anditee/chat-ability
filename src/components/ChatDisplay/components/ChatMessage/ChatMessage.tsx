import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import './ChatMessage.css';
import {IMessagePosition, IMessageProps, IMessageType} from "../../../../shared/interfaces/Message.model";
import aiImage from '../../../../assets/images/ai_profile_picture.png';
import userImage from '../../../../assets/images/profile_picture.png';
import {setTextToPlay} from "../../../../shared/signals/TextToSpeech.signal";
import ReactMarkdown from 'react-markdown';

const ChatMessageComponent = (message: IMessageProps) => {

    const [imgSrc, setImgSrc] = useState<string>(aiImage.src);
    const [alternativeDescription, setAlternativeDescription] = useState<string>('Antwort des Chatbots');
    const [position, setPosition] = useState<IMessagePosition>(IMessagePosition.LEFT);

    useEffect(() => {
        if (message.type === IMessageType.REQUEST) {
            setImgSrc(userImage.src);
            setAlternativeDescription('Ihre Anfrage');
            setPosition(IMessagePosition.RIGHT);
        }
    }, [message.type]);

    const generateAndPlayAudio = useCallback(() => {
        setTextToPlay(generateSpeechText());
    }, [message.content, alternativeDescription]);

    const generateSpeechText = useCallback(() => {
        return alternativeDescription + " " + message.content;
    }, [alternativeDescription]);

    return <>
        <div
            tabIndex={message.tabIndex ?? 0}
            className={["chat-message", position].join(' ')}
            onClick={(e) => e.currentTarget.focus()}
            onFocus={() => generateAndPlayAudio()}
            onKeyDown={e => e.key === 'Enter' ? generateAndPlayAudio() : ''}
            ref={message.ref}>
            <div className={"icon"}>
                <img src={imgSrc} alt={alternativeDescription}/>
            </div>
            <div className={"content"}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        </div>
    </>;
}

export default ChatMessageComponent;