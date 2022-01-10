import React, { ReactElement } from "react";
declare type PartialInputProps = Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "className" | "name" | "onChange" | "onBlur">;
interface CheckboxGroupProps extends PartialInputProps {
    defaultValue?: string[];
    value?: string[];
    children?: ReactElement[];
}
export declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
export {};
