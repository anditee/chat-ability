import React, {useEffect} from "react";
import {ITutorialPopup} from "./interfaces/TutorialPopup.model";
import './TutorialPopup.css';
import {goToNextStep, showOrHideTutorial} from "../../../../shared/signals/Tutorial.signal";
import {setTextToPlay} from "../../../../shared/signals/TextToSpeech.signal";
import TextButton from "../../../TextButton/TextButton";

const TutorialPopupComponent = (tutorialPopup: ITutorialPopup) => {

    useEffect(() => {
        setTextToPlay(tutorialPopup.content);
    }, [tutorialPopup.content]);

    return <>
        <div className={["tutorial-popup", `step-${tutorialPopup.position}`].join(' ')}>
            <div className={'tutorial-content'}>
                {tutorialPopup.content}
            </div>
            <div className={'tutorial-footer'}>
                <TextButton alternativeText={'Abbrechen'} onClick={() => showOrHideTutorial()}>
                    Abbrechen
                </TextButton>
                <TextButton alternativeText={'Weiter'} onClick={() => goToNextStep()}>
                    Weiter
                </TextButton>
            </div>
        </div>
    </>;
}

export default TutorialPopupComponent;