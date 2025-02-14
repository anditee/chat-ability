import {ReactElement} from "react";
import TextToSpeechService from "../services/TextToSpeech.service";

export interface IChatControl {
    alternativeDescription: string,
    children: ReactElement<any, any>,
    onClick?: () => void,
}