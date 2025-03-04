import {signal} from "@preact/signals-react";

const showTutorial = signal(false);
const currentStep = signal(0);
const currentTutorialLength = signal(0);

const showOrHideTutorial = () => {
    showTutorial.value = !showTutorial.value;
};

const setCurrentTutorialLength = (length: number) => {
    currentTutorialLength.value = length;
}

const goToNextStep = () => {
    if (currentStep.value < currentTutorialLength.value - 1) {
        currentStep.value += 1;
    } else {
        currentStep.value = 0;
    }
}

export {currentStep, showTutorial, currentTutorialLength, showOrHideTutorial, goToNextStep, setCurrentTutorialLength};