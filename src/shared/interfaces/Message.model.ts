import {MutableRefObject} from "react";

export interface IMessage {
    content: string;
    type: IMessageType;
}

export interface IMessageProps extends IMessage {
    tabIndex: number;
    ref: MutableRefObject<HTMLDivElement | null> | null;
}

export enum IMessageType {
    RESPONSE = 'response',
    REQUEST = 'request'
}

export enum IMessagePosition {
    LEFT = 'left',
    RIGHT = 'right'
}