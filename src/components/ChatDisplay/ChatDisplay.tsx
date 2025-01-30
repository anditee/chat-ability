import * as React from "react";
import {useEffect, useState} from "react";
import {IChatDisplay} from "./interfaces/ChatButton.model";
import './ChatDisplay.css';
import ChatMessageComponent from "./components/ChatMessage";
import {IMessage, IMessagePosition, IMessageType} from "../../shared/interfaces/Message.model";

const ChatDisplayComponent = (props: IChatDisplay) => {

    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        setMessages(
            [
                {
                    content: 'Das ist eine Testnachricht von mir',
                    type: IMessageType.REQUEST,
                    position: IMessagePosition.RIGHT
                },
                {
                    content: 'Das ist eine Testantwort von CHATGPT',
                    type: IMessageType.RESPONSE,
                    position: IMessagePosition.LEFT
                },
                {
                    content: 'Das ist eine Testnachricht von mir',
                    type: IMessageType.REQUEST,
                    position: IMessagePosition.RIGHT
                },
                {
                    content: 'Das ist eine Testantwort von CHATGPT',
                    type: IMessageType.RESPONSE,
                    position: IMessagePosition.LEFT
                },
            ]
        )
    }, []);

    return <>
        <div className={"chat-display"}>
            {messages.map(message => (
                    <ChatMessageComponent
                        content={message.content}
                        type={message.type}
                        position={message.position}>
                    </ChatMessageComponent>
                )
            )}
        </div>
    </>;
}

export default ChatDisplayComponent;