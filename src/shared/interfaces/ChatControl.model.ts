import {ReactElement} from "react";

export interface IChatControl {
    alternativeDescription: string,
    children: ReactElement<any, any>,
    onClick?: () => void
}