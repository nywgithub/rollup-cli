export declare function isType(value: any, type: string): boolean;
export declare function normalizeToArray<T>(value: T | T[]): T[];
export declare function getOwnerDocument(elementOrElements: Element | Element[]): Document;
export declare function isMouseEvent(value: unknown): value is MouseEvent;
export declare const followCursor: {
    name: string;
    defaultValue: boolean;
    fn(instance: any): {
        onCreate: () => void;
        onDestroy: () => void;
        onBeforeUpdate(): void;
        onAfterUpdate(_: any, { followCursor }: any): void;
        onMount(): void;
        onTrigger(_: any, event: any): void;
        onHidden(): void;
    };
};
