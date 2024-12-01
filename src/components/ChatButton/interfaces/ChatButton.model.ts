import {ChatButtonPosition} from "../enums/ChatButtonPosition.enum";

export interface IChatButton {
    accessibilityText: string;
    buttonPosition: ChatButtonPosition;
}