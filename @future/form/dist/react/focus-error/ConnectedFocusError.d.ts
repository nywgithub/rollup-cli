/// <reference types="react" />
import { FocusErrorProps } from "./FocusError";
/**
 * This component focus the first error in the Formik form after the validation.
 * Note: The first is not necessary the first on the screen, it's just the first
 * key in the touched object.
 * */
export interface ConnectedFocusErrorProps extends FocusErrorProps {
}
export declare const ConnectedFocusError: import("react").ComponentType<Omit<FocusErrorProps, "formik">>;
