import * as React from "react";
import {useEffect, useState} from "react";
import {IChatDisplay} from "./interfaces/ChatButton.model";
import './ChatDisplay.css';
import ChatMessageComponent from "./components/ChatMessage";
import {IMessage, IMessagePosition, IMessageType} from "../../shared/interfaces/Message.model";

const ChatDisplayComponent = (props: IChatDisplay) => {

    const [messageGroup, setMessageGroup] = useState<IMessage[][]>([]);

    useEffect(() => {
        setMessageGroup(
            [
                [
                    {
                        content: 'Hallo! Wie kann ich Ihnen bei Ihrer Studienwahl helfen?',
                        type: IMessageType.RESPONSE,
                        position: IMessagePosition.LEFT
                    },
                ],
                [
                    {
                        content: 'Ich bin mir nicht sicher, welches Studienfach zu mir passt.',
                        type: IMessageType.REQUEST,
                        position: IMessagePosition.RIGHT
                    },
                    {
                        content: 'Kein Problem! Welche Fächer interessieren Sie am meisten?',
                        type: IMessageType.RESPONSE,
                        position: IMessagePosition.LEFT
                    },
                ],
                [
                    {
                        content: 'Ich mag Informatik und Mathematik.',
                        type: IMessageType.REQUEST,
                        position: IMessagePosition.RIGHT
                    },
                    {
                        content: 'Das klingt spannend! Sie könnten sich Studiengänge wie Informatik, Data Science oder Wirtschaftsinformatik anschauen.',
                        type: IMessageType.RESPONSE,
                        position: IMessagePosition.LEFT
                    },
                ],
                [
                    {
                        content: 'Welche Karrieremöglichkeiten gibt es in diesen Bereichen?',
                        type: IMessageType.REQUEST,
                        position: IMessagePosition.RIGHT
                    },
                    {
                        content: 'In diesen Bereichen gibt es viele Möglichkeiten, z. B. als Softwareentwickler, Datenanalyst oder IT-Consultant.',
                        type: IMessageType.RESPONSE,
                        position: IMessagePosition.LEFT
                    },
                ],
            ]
        )
    }, []);

    return <>
        <div className={"chat-display"}>
            <div className={"chat"}>
                <div className={"header"}>
                    Chatbot
                </div>
                <div className={"inner-container"}>
                    {messageGroup.map(messageGroup => (
                        <div className={"message-group"}>
                            {messageGroup.map(message => (
                                <ChatMessageComponent
                                    content={message.content}
                                    type={message.type}
                                    position={message.position}>
                                </ChatMessageComponent>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={"footer"}>

                </div>
            </div>
        </div>
    </>;
}

export default ChatDisplayComponent;