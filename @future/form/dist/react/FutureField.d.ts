import React, { ReactElement } from "react";
export interface FutureFieldProps {
    name: string;
    type?: "checkbox" | "radio";
    futureValidation?: any;
    errorMessage?: boolean | ((message: string) => ReactElement);
    thirdPartyValidateOnChange?: boolean;
    thirdPartyTouchOnChange?: boolean;
    dependencies?: string[];
    onDependenciesChange?: (event: {
        value: any;
        dependentValues?: any;
    }) => any | Promise<any> | undefined;
    children: ReactElement;
}
export declare const FutureField: React.FC<FutureFieldProps>;
