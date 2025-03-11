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
import {decreaseFontSize, fontSize, increaseFontSize} from "../../shared/signals/FontSize.signal";
import {useSignalEffect} from "@preact/signals-react";
import {showChat} from "../../shared/signals/ShowChat.signal";
import Tutorial from "../Tutorial/Tutorial";
import {generateDefaultTutorial} from "../Tutorial/helpers/generateDefaultTutorial.helper";
import {showOrHideTutorial, showTutorial} from "../../shared/signals/Tutorial.signal";

const ChatDisplayComponent = (props: IChatDisplay) => {

    const [messageGroup, setMessageGroup] = useState<IMessage[][]>([]);
    const [muteIcon, setMuteIcon] = useState<IconDefinition>(faVolumeMute);
    const [localFontSize, setLocalFontSize] = useState<number>(1);
    const [showChatValue, setShowChatValue] = useState<boolean>(false);
    const [showTutorialValue, setShowTutorialValue] = useState<boolean>(false);

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
        } else {
            localStorage.setItem('mute', MuteState.UNMUTED);
            setMuteIcon(faVolumeMute);
        }
    }, []);

    useSignalEffect(() => {
        setLocalFontSize(fontSize.value);
        setShowChatValue(showChat.value);
        setShowTutorialValue(showTutorial.value);
    });

    return <>
        <div className={["chat-display", showChatValue ? ViewState.SHOW : ViewState.HIDE, `fs-${localFontSize * 10}rem`].join(' ')}>
            <div className={"chat"}>
                <div className={"header"}>
                    <div className={"headline"}>
                        Chatbot
                    </div>
                    <div className={"controls"}>
                        <ChatControl
                            alternativeDescription={'Textgröße verkleinern'}
                            key={uuidv4()}
                            onClick={() => decreaseFontSize()}>
                            <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter}/>
                        </ChatControl>
                        <ChatControl
                            alternativeDescription={'Textgröße vergrößern'}
                            key={uuidv4()}
                            onClick={() => increaseFontSize()}>
                            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter}/>
                        </ChatControl>
                        <ChatControl
                            alternativeDescription={'Sprachausgabe deaktivieren oder aktivieren'}
                            onClick={() => disableOrEnableTts()}
                            key={uuidv4()}>
                            <FontAwesomeIcon icon={muteIcon}/>
                        </ChatControl>
                        <ChatControl
                            alternativeDescription={'Anleitung'}
                            onClick={() => showOrHideTutorial()}
                            key={uuidv4()}>
                            <FontAwesomeIcon icon={faQuestionCircle}/>
                        </ChatControl>
                    </div>
                </div>
                <div className={"inner-container"} key={uuidv4()} aria-live={"assertive"}>
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
        {showTutorialValue ?
            <Tutorial steps={generateDefaultTutorial()}></Tutorial>
            : ''
        }
    </>;
}

export default ChatDisplayComponent;