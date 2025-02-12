import * as React from "react";
import {useEffect, useState} from "react";
import {IChatDisplay} from "./interfaces/ChatDisplay.model";
import './ChatDisplay.css';
import ChatMessageComponent from "./components/ChatMessage";
import {IMessage, IMessagePosition, IMessageType} from "../../shared/interfaces/Message.model";
import ChatControl from "./components/ChatControl";
import {
    faDownLeftAndUpRightToCenter,
    faRobot,
    faTextHeight,
    faTextSlash, faUpRightAndDownLeftFromCenter,
    faVolumeMute
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons";
import TextToSpeechService from "../../shared/services/TextToSpeech.service";

const ChatDisplayComponent = (props: IChatDisplay) => {

    const [messageGroup, setMessageGroup] = useState<IMessage[][]>([]);
    const [tts] = useState<TextToSpeechService>(new TextToSpeechService());

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
                    <div className={"healdine"}>
                        Chatbot
                    </div>
                    <div className={"controls"}>
                        <ChatControl alternativeDescription={'Textgröße verkleinern'}>
                            <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter}/>
                        </ChatControl>
                        <ChatControl alternativeDescription={'Textgröße vergrößern'}>
                            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter}/>
                        </ChatControl>
                        <ChatControl alternativeDescription={'Stummschalten'} onClick={() => tts.invertDisabled()}>
                            <FontAwesomeIcon icon={faVolumeMute}/>
                        </ChatControl>
                        <ChatControl alternativeDescription={'Tutorial'} >
                            <FontAwesomeIcon icon={faQuestionCircle}/>
                        </ChatControl>
                    </div>
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