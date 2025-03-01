import React, {useEffect, useState} from "react";
import {ITutorialPopup} from "./interfaces/TutorialPopup.model";
import './TutorialPopup.css';
import TextToSpeechService from "../../../../shared/services/TextToSpeech.service";
import {goToNextStep, showOrHideTutorial} from "../../../../shared/signals/Tutorial.signal";

const TutorialPopupComponent = (tutorialPopup: ITutorialPopup) => {
    const [tts] = useState<TextToSpeechService>(new TextToSpeechService());

    useEffect(() => {
        tts.getSpeechByText(tutorialPopup.content).then(audioElement => {
            tts.setAudioElement(audioElement);
            tts.playAudio().then();
        });
    }, [tutorialPopup.content]);

    return <>
        <div className={["tutorial-popup", `step-${tutorialPopup.position}`].join(' ')}>
            <div className={'tutorial-content'}>
                {tutorialPopup.content}
            </div>
            <div className={'tutorial-footer'}>
                <button className={'cancel'} tabIndex={0} onClick={() => showOrHideTutorial()}>
                    Abbrechen
                </button>
                <button className={'next-step'} tabIndex={0} onClick={() => goToNextStep()}>
                    Nächster Schritt
                </button>
            </div>
        </div>
    </>;
}

export default TutorialPopupComponent;