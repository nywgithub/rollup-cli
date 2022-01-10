export declare const classNamePlugin: {
    name: string;
    defaultValue: string;
    fn(instance: any): {
        onCreate: () => void;
        onBeforeUpdate: () => void;
        onAfterUpdate: () => void;
    };
};
