import {IMessage} from "../../../shared/interfaces/Message.model";

export interface IChatDisplay {
    messages: IMessage[];
    show: boolean;
}