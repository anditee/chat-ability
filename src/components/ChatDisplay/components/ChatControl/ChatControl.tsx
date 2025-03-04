import * as React from "react";
import './ChatControl.css';
import {IChatControl} from "../../../../shared/interfaces/ChatControl.model";
import {playText} from "../../../../shared/signals/TextToSpeech.signal";

const ChatControl = (control: IChatControl) => {
    return <>
        <button
            tabIndex={0}
            className={["chat-control"].join(' ')}
            onClick={control.onClick}
            onBlur={() => playText(control.alternativeDescription)}
            aria-label={control.alternativeDescription}>
            {control.children}
        </button>
    </>;
}

export default ChatControl;