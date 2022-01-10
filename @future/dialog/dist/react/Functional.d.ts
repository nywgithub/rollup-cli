import ArtDialog, { ArtDialogOptions } from '@future/art-dialog';
import { ReactChild } from "react";
declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
export declare type Options = Overwrite<Omit<ArtDialogOptions, "content">, {
    classList?: string[];
}>;
export declare const getDialogInstance: (content: ReactChild, options: Options) => ArtDialog;
export declare type ArtDialogCalleeOptions = Overwrite<Options, {
    ok?: (this: ArtDialog, dialogPromiseResolve: (result?: any) => void) => void;
    cancel?: (this: ArtDialog, dialogPromiseReject: (error?: any) => void) => void;
}>;
export declare function callDialog<T = void>(content: ReactChild, options?: ArtDialogCalleeOptions): Promise<T>;
export interface DialogInjectProps {
    confirmDialog?: (data?: any) => void;
    cancelDialog?: (err?: any) => void;
}
export declare type NoticeType = "success" | "error" | "warning" | "info";
export declare type NoticeOption = Options & {
    type?: NoticeType;
};
export declare const callConfirmDialog: (content: ReactChild, options?: NoticeOption | undefined) => Promise<void>;
export declare const callAlertDialog: (content: ReactChild, options?: NoticeOption | undefined) => Promise<void>;
export {};
