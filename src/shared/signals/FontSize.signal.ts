import {signal} from "@preact/signals-react";

const fontSize = signal(1);

const MIN_SIZE = 1;
const MAX_SIZE = 3.0;
const STEP_SIZE = 0.5;

const increaseFontSize = () => {
    if (fontSize.value < MAX_SIZE) {
        fontSize.value = Math.round((fontSize.value + STEP_SIZE) * 100) / 100;
    }
};

const decreaseFontSize = () => {
    if (fontSize.value > MIN_SIZE) {
        fontSize.value = Math.round((fontSize.value - STEP_SIZE) * 100) / 100;
    }
};

export {fontSize, increaseFontSize, decreaseFontSize};