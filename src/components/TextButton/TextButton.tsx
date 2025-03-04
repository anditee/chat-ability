import React from "react";
import "./TextButton.css";
import {ITextButton} from "./interfaces/TextButton.model";
import {playText} from "../../shared/signals/TextToSpeech.signal";
import {v4 as uuidv4} from "uuid";

const TextButtonComponent = (textButton: ITextButton) => {

    return <>
        <button
            className={'text-button'}
            aria-label={textButton.alternativeText}
            tabIndex={textButton.tabIndex ?? 0}
            onClick={textButton.onClick}
            onBlur={() => playText(textButton.alternativeText)}
            type={'button'}
            key={uuidv4()}>
            {textButton.children}
        </button>
    </>;
}

export default TextButtonComponent;