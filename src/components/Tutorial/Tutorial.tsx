import React, {useEffect, useState} from "react";
import {ITutorial} from "./interfaces/Tutorial.model";
import TutorialPopup from "./components/TutorialPopup/TutorialPopup";
import {useSignalEffect} from "@preact/signals-react";
import {currentStep, setCurrentTutorialLength} from "../../shared/signals/Tutorial.signal";
import "./Tutorial.css";

const TutorialComponent = (tutorialPopup: ITutorial) => {

    const [currentTutorialStep, setCurrentTutorialStep] = useState<number>(currentStep.value);

    useSignalEffect(() => {
        setCurrentTutorialLength(tutorialPopup.steps.length);
        setCurrentTutorialStep(currentStep.value);
    });

    return <>
        {tutorialPopup.steps.length > 0 ?
            <div className={'tutorial-container'}>
                <TutorialPopup
                    content={tutorialPopup.steps[currentTutorialStep].content}
                    position={tutorialPopup.steps[currentTutorialStep].position}/>
            </div>
            : ''
        }
    </>;
}

export default TutorialComponent;