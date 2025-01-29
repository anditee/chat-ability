export interface IMessage {
    content: string;
    type: IMessageType;
}

export enum IMessageType {
    RESPONSE = 'response',
    REQUEST = 'request'
}