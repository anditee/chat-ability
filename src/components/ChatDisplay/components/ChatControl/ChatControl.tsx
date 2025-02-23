import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import './ChatControl.css';
import TextToSpeechService from "../../../../shared/services/TextToSpeech.service";
import {IChatControl} from "../../../../shared/interfaces/ChatControl.model";

const ChatControl = (control: IChatControl) => {

    const [tts] = useState<TextToSpeechService>(new TextToSpeechService());

    const generateAndPlayAudio = useCallback(() => {
        if (control.onClick) {
            control.onClick();
        }
        tts.getSpeechByText(control.alternativeDescription).then(audioElement => {
            tts.setAudioElement(audioElement);
            tts.playAudio().then();
        });
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