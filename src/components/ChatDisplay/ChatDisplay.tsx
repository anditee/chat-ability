import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {IChatDisplay} from "./interfaces/ChatDisplay.model";
import './ChatDisplay.css';
import ChatMessageComponent from "./components/ChatMessage";
import {IMessage, IMessagePosition, IMessageType} from "../../shared/interfaces/Message.model";
import ChatControl from "./components/ChatControl";
import {
    faDownLeftAndUpRightToCenter,
    faUpRightAndDownLeftFromCenter,
    faVolumeHigh,
    faVolumeMute,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons";
import {v4 as uuidv4} from 'uuid';
import {MuteState} from "../../shared/enums/MuteState.enum";
import {ViewState} from "../../shared/enums/ViewState.enum";
import ChatInput from "./components/ChatInput";

const ChatDisplayComponent = (props: IChatDisplay) => {

    const [messageGroup, setMessageGroup] = useState<IMessage[][]>([]);
    const [muteIcon, setMuteIcon] = useState<IconDefinition>(faVolumeMute);
    const [muteText, setMuteText] = useState<string>('Sprachausgabe deaktiviert');

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

    const disableOrEnableTts = useCallback(() => {
        const currentMuteState = localStorage.getItem('mute') ?? MuteState.UNMUTED;

        if (currentMuteState && currentMuteState === MuteState.UNMUTED) {
            localStorage.setItem('mute', MuteState.MUTED);
            setMuteIcon(faVolumeHigh);
            setMuteText('Sprachausgabe aktiviert');
        } else {
            localStorage.setItem('mute', MuteState.UNMUTED);
            setMuteIcon(faVolumeMute);
            setMuteText('Sprachausgabe deaktiviert');
        }
    }, []);

    return <>
        <div className={["chat-display", props.show ? ViewState.SHOW : ViewState.HIDE].join(' ')}>
            <div className={"chat"}>
                <div className={"header"}>
                    <div className={"healdine"}>
                        Chatbot
                    </div>
                    <div className={"controls"}>
                        <ChatControl alternativeDescription={'Textgröße verkleinert'} key={uuidv4()}>
                            <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter}/>
                        </ChatControl>
                        <ChatControl alternativeDescription={'Textgröße vergrößert'} key={uuidv4()}>
                            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter}/>
                        </ChatControl>
                        <ChatControl alternativeDescription={muteText} onClick={() => disableOrEnableTts()} key={uuidv4()}>
                            <FontAwesomeIcon icon={muteIcon}/>
                        </ChatControl>
                        <ChatControl alternativeDescription={'Tutorial'} key={uuidv4()}>
                            <FontAwesomeIcon icon={faQuestionCircle}/>
                        </ChatControl>
                    </div>
                </div>
                <div className={"inner-container"} key={uuidv4()}>
                    {messageGroup.map(messageGroup => (
                        <div className={"message-group"} key={uuidv4()}>
                            {messageGroup.map(message => (
                                <ChatMessageComponent
                                    content={message.content}
                                    type={message.type}
                                    position={message.position}
                                    key={uuidv4()}>
                                </ChatMessageComponent>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={"footer"}>
                    <ChatInput></ChatInput>
                </div>
            </div>
        </div>
    </>;
}

export default ChatDisplayComponent;