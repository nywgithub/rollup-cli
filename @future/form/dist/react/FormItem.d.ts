import React, { ReactElement } from "react";
interface FormItemProps {
    className?: string;
    label?: string | ReactElement;
    required?: boolean;
}
export declare const FormItem: React.FC<FormItemProps>;
export {};
