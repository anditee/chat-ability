import React, {useEffect, useState} from "react";
import {ITutorial} from "./interfaces/Tutorial.model";
import TutorialPopup from "./components/TutorialPopup/TutorialPopup";
import {useSignalEffect} from "@preact/signals-react";
import {currentStep, setCurrentTutorialLength} from "../../shared/signals/Tutorial.signal";

const TutorialComponent = (tutorialPopup: ITutorial) => {

    const [currentTutorialStep, setCurrentTutorialStep] = useState<number>(0);

    useEffect(() => {
        setCurrentTutorialLength(tutorialPopup.steps.length);
    }, [tutorialPopup.steps]);

    useSignalEffect(() => {
        setCurrentTutorialStep(currentStep.value);
    });

    return <>
        <TutorialPopup
            content={tutorialPopup.steps[currentTutorialStep].content}
            position={tutorialPopup.steps[currentTutorialStep].position}/>
    </>;
}

export default TutorialComponent;