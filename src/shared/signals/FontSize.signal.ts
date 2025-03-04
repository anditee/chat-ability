import {signal} from "@preact/signals-react";

const fontSize = signal(1);

const MIN_SIZE = 1;
const MAX_SIZE = 3.0;
const STEP_SIZE = 0.5;

const increaseFontSize = () => {
    console.log(fontSize.value);
    if (fontSize.value < MAX_SIZE) {
        fontSize.value = Math.round((fontSize.value + STEP_SIZE) * 100) / 100;
    }
    console.log(fontSize.value);
};

const decreaseFontSize = () => {
    if (fontSize.value > MIN_SIZE) {
        fontSize.value = Math.round((fontSize.value - STEP_SIZE) * 100) / 100;
    }
};

export {fontSize, increaseFontSize, decreaseFontSize};