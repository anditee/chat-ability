import React, {ReactElement} from "react";

export interface ITextButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactElement<any, any> | string,
    alternativeText: string
}