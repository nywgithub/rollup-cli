import React from 'react';
import { ErrorMessageProps } from 'formik';
export interface FutureErrorMessage extends Omit<ErrorMessageProps, "render"> {
}
export declare const FutureErrorMessage: React.FC<FutureErrorMessage>;
