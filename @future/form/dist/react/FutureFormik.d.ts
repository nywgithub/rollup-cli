import React from "react";
import { FormikConfig, FormikErrors, FormikValues } from "formik/dist/types";
export interface FutureValidation {
    rules: any;
    messages: any;
}
interface FutureFormikProps<Values extends FormikValues = FormikValues> extends FormikConfig<Values> {
    futureValidation?: FutureValidation;
    scrollToFirstError?: boolean | {
        options?: ScrollIntoViewOptions;
        scrollDelay?: number;
    };
}
export declare class FutureFormik extends React.Component<FutureFormikProps> {
    constructor(props: FutureFormikProps);
    convert2Validate: (validation: FutureValidation) => (values: FormikValues) => Promise<FormikErrors<FormikValues>>;
    render(): React.ReactNode;
    componentDidMount(): void;
}
export {};
