import "../css/index.scss";
import React from "react";
export declare type NativeProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & React.RefAttributes<HTMLInputElement>;
export interface ExtendedProps {
    indeterminate?: boolean;
    tag?: boolean;
}
export declare const Checkbox: React.FC<ExtendedProps & NativeProps>;
