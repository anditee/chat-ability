import * as React from "react";
import {useEffect, useState} from "react";
import './ChatControl.css';
import TextToSpeechService from "../../../../shared/services/TextToSpeech.service";
import {IChatControl} from "../../../../shared/interfaces/ChatControl.model";

const ChatControl = (control: IChatControl) => {

    const [tts] = useState<TextToSpeechService>(new TextToSpeechService());

    useEffect(() => {
        tts.getSpeechByText(control.alternativeDescription).then(audioElement => {
            tts.setAudioElement(audioElement);
        });
    }, [control.alternativeDescription]);

    return <>
        <div tabIndex={0} className={["chat-control"].join(' ')} onClick={() => tts.playAudio()}>
            {control.children}
        </div>
    </>;
}

export default ChatControl;