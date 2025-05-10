import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
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
    const bottomRef = useRef<HTMLDivElement>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

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

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        lastMessageRef.current?.focus();
    }, [messageGroup]);

    return <>
        <div
            className={["chat-display", showChatValue ? ViewState.SHOW : ViewState.HIDE, `fs-${localFontSize * 10}rem`].join(' ')}>
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
                    {messageGroup.map((group, groupIndex) => (
                        <div className="message-group" key={`group-${groupIndex}`}>
                            {group.map((message, messageIndex) => {
                                const isLastGroup = groupIndex === messageGroup.length - 1;
                                const isLastMessage = messageIndex === group.length - 1;

                                return (
                                    <ChatMessageComponent
                                        key={`message-${groupIndex}-${messageIndex}`}
                                        content={message.content}
                                        type={message.type}
                                        tabIndex={0}
                                        ref={isLastGroup && isLastMessage ? lastMessageRef : null}
                                    />
                                );
                            })}
                        </div>
                    ))}
                    <div ref={bottomRef}/>
                </div>
                <div className={"footer"}>
                    <ChatInput messages={messageGroup} addConversationPart={setMessageGroup}></ChatInput>
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