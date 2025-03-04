import * as React from "react";
import {useCallback} from "react";
import './ChatControl.css';
import {IChatControl} from "../../../../shared/interfaces/ChatControl.model";
import {playText} from "../../../../shared/signals/TextToSpeech.signal";

const ChatControl = (control: IChatControl) => {

    const generateAndPlayAudio = useCallback(() => {
        if (control.onClick) {
            control.onClick();
        }

        playText(control.alternativeDescription);
    }, [control.alternativeDescription]);
    return <>
        <button
            tabIndex={0}
            className={["chat-control"].join(' ')}
            onClick={generateAndPlayAudio}
            aria-label={control.alternativeDescription}>
            {control.children}
        </button>
    </>;
}

export default ChatControl;