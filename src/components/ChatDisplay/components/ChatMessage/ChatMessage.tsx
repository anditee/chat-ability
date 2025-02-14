import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import './ChatMessage.css';
import {IMessage, IMessagePosition, IMessageType} from "../../../../shared/interfaces/Message.model";
import aiImage from '../../../../assets/images/ai_profile_picture.png';
import userImage from '../../../../assets/images/profile_picture.png';
import TextToSpeechService from "../../../../shared/services/TextToSpeech.service";

const ChatMessageComponent = (message: IMessage) => {

    const [imgSrc, setImgSrc] = useState<string>(aiImage.src);
    const [alternativeDescription, setAlternativeDescription] = useState<string>('Antwort des Chatbots');
    const [position, setPosition] = useState<IMessagePosition>(IMessagePosition.LEFT);
    const [tts] = useState<TextToSpeechService>(new TextToSpeechService());

    useEffect(() => {
        if (message.type === IMessageType.REQUEST) {
            setImgSrc(userImage.src);
            setAlternativeDescription('Ihre Anfrage');
            setPosition(IMessagePosition.RIGHT);
        }

        tts.getSpeechByText(generateSpeechText()).then(audioElement => {
            tts.setAudioElement(audioElement);
        });
    }, [message.type, message.content, alternativeDescription]);

    const generateSpeechText = useCallback(() => {
        return alternativeDescription + " " + message.content;
    }, [alternativeDescription]);

    return <>
        <div className={["chat-message", position].join(' ')} onClick={() => tts.playAudio()}>
            <div className={"icon"}>
                <img src={imgSrc} alt={alternativeDescription}/>
            </div>
            <div className={"content"}>
                {message.content}
            </div>
        </div>
    </>;
}

export default ChatMessageComponent;