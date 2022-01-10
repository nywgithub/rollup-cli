import React, { ReactElement } from "react";
export declare type TextAreaNativeProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & React.RefAttributes<HTMLTextAreaElement>;
export interface TextAreaExtendedProps {
    error?: boolean;
    counter?: boolean | ((length: number, maxlength: number) => string | ReactElement);
}
export declare const TextArea: React.FC<TextAreaExtendedProps & TextAreaNativeProps>;
