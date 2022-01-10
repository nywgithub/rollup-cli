import "../css/index.scss";
import React from "react";
export declare type NativeProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export interface ExtendedProps {
    error?: boolean;
}
export declare const Input: React.ForwardRefExoticComponent<Pick<React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement> & ExtendedProps, "error" | "key" | keyof React.InputHTMLAttributes<HTMLInputElement>> & React.RefAttributes<HTMLInputElement>>;
