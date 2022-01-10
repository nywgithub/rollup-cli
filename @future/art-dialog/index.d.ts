interface DefaultFunction {
    (this: ArtDialog): void
}

type Length = number | string;

type DialogContent = string | HTMLElement;

type DialogButton = {
    name: string;
    callback: DefaultFunction;
    focus?: boolean;
    disabled?: boolean;
}

type DialogControlFunction = (this: ArtDialog) => boolean | void;

export declare interface ArtDialogOptions {
    id?: string;

    title?: string | boolean;
    content?: DialogContent;
    ok?: DefaultFunction;
    cancel?: DefaultFunction;
    okVal?: string;
    cancelVal?: string;
    button?: DialogButton[];

    left?: Length;
    top?: Length;
    padding?: number;
    width?: Length;
    height?: Length;
    background?: string;
    opacity?: number;
    zIndex?: number;

    show?: boolean;
    fixed?: boolean;
    lock?: boolean;
    drag?: boolean;
    resize?: boolean;
    esc?: boolean;
    follow?: string | HTMLElement;

    time?: number;

    init?: (this: ArtDialog) => void;
    close?: DialogControlFunction;
}



declare class ArtDialog {
    constructor(options: ArtDialogOptions, ok?: DialogControlFunction, cancel?: DialogControlFunction);

    static list: { [key: string]: ArtDialog };

    close: DefaultFunction;
    show: DefaultFunction;
    hide: DefaultFunction;

    title: (title?: string) => string;

    content: (content?: DialogContent) => HTMLElement;

    button: (...btn: DialogButton[]) => void;

    follow: (element: HTMLElement) => void;

    position: (left: Length, top: Length) => void;

    size: (width: Length, height: Length) => void;

    time: (second: number, callback?: DefaultFunction) => void;

    footer: (html: string | HTMLElement) => void;

    clickButton: (name: string) => void;

    lock: DefaultFunction;
    unlock: DefaultFunction;
    focus: DefaultFunction;
    zIndex: DefaultFunction;

    reset: DefaultFunction;

    _left: Length;
    _top: Length;
    _lockMaskWrap: any;
    DOM: any;
}

export default ArtDialog;