/// <reference types="react" />
import { FormikContextType, FormikValues } from "formik";
/**
 * This component focus the first error in the Formik form after the validation.
 * Note: The first is not necessary the first on the screen, it's just the first
 * key in the touched object, order is not guaranteed.
 * */
export interface FocusErrorProps {
    /**
     * Values from Formik provider.
     */
    formik: Pick<FormikContextType<FormikValues>, "isSubmitting" | "touched" | "isValidating" | "errors">;
    options?: ScrollIntoViewOptions;
    /**
     * Time in ms to execute the focus in the component with the error, by default 100ms.
     */
    focusDelay?: number;
    onFocus?: () => void;
}
export declare function FocusError({ formik: { isSubmitting, touched, isValidating, errors }, options, focusDelay, onFocus }: FocusErrorProps): JSX.Element;
