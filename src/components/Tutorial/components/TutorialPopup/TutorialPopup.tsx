import React, {useEffect} from "react";
import {ITutorialPopup} from "./interfaces/TutorialPopup.model";
import './TutorialPopup.css';
import {goToNextStep, showOrHideTutorial} from "../../../../shared/signals/Tutorial.signal";
import {playText} from "../../../../shared/signals/TextToSpeech.signal";
import TextButton from "../../../TextButton/TextButton";

const TutorialPopupComponent = (tutorialPopup: ITutorialPopup) => {

    useEffect(() => {
        playText(tutorialPopup.content);
    });

    return <>
        <div className={["tutorial-popup", `step-${tutorialPopup.position}`].join(' ')}>
            <div className={'tutorial-content'}>
                {tutorialPopup.content}
            </div>
            <div className={'tutorial-footer'}>
                <TextButton alternativeText={'Abbrechen'} onClick={() => showOrHideTutorial()}>
                    Abbrechen
                </TextButton>
                <TextButton alternativeText={'nächster Schritt'} onClick={() => goToNextStep()}>
                    Nächster Schritt
                </TextButton>
            </div>
        </div>
    </>;
}

export default TutorialPopupComponent;