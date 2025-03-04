import React from "react";
import "./TextButton.css";
import {ITextButton} from "./interfaces/TextButton.model";

const TextButtonComponent = (textButton: ITextButton) => {

    return <>
        <button
            className={'text-button'}
            aria-label={textButton.alternativeText}
            tabIndex={textButton.tabIndex ?? 0}
            onClick={textButton.onClick}
            type={'button'}>
            {textButton.children}
        </button>
    </>;
}

export default TextButtonComponent;