import "../css/index.scss";
import { ReactElement } from "react";
import { NoticeContent } from "./Notification";
import { ToastPositionEnum } from "./types";
declare type PartialNoticeContent = Partial<Pick<NoticeContent, "namespace" | "className" | "duration" | "type" | "icon" | "key">>;
export interface ToastOptions extends PartialNoticeContent {
    position?: ToastPositionEnum;
    offset?: [number, number];
    above?: HTMLElement;
}
export declare const toast: (content: string | ReactElement, options?: ToastOptions | undefined) => Promise<void>;
export {};
