import * as React from "react";
import {useEffect, useState} from "react";
import './ChatMessage.css';
import {IMessage, IMessagePosition, IMessageType} from "../../../../shared/interfaces/Message.model";

const ChatMessageComponent = (message: IMessage) => {

    const [imgSrc, setImgSrc] = useState<string>('../../../../_assets/images/ai_profile_picture.png');
    const [alternativeDescription, setAlternativeDescription] = useState<string>('Antwort des Chatbots');
    const [position, setPosition] = useState<IMessagePosition>(IMessagePosition.LEFT);

    useEffect(() => {
        if (message.type === IMessageType.REQUEST) {
            setImgSrc('../../../../_assets/images/ai_profile_picture.png');
            setAlternativeDescription('Ihre Anfrage');
            setPosition(IMessagePosition.RIGHT);
        }
    }, [message.type]);

    return <>
        <div className={["chat-message", position].join(' ')}>
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