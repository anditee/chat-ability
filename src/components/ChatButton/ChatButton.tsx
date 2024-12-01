import * as React from "react";
import {IChatButton} from "./interfaces/ChatButton.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import './ChatButton.css';

const ChatButtonComponent = (props: IChatButton) => {
    const getButtonPosition = () => {
        return props.buttonPosition;
    }

    const classes = `ca-chat-button ${getButtonPosition()}`

    return <>
        <button className={classes}>
            <FontAwesomeIcon icon={faRobot} />
        </button>
    </>;
}

export default ChatButtonComponent;