export default interface IComponent<P> {
    init: () => void;
    render: () => void;
    beforeUpdate: () => boolean;
    update: (_: any) => void;
    updated: () => void;
    destroy: () => void;
    emit: (eventName: string, ...args: any) => any;
    on: (eventName: string, fn: () => void, context?: any) => any;
    addListener: (eventName: string, fn: () => void, context?: any) => any;
    once: (eventName: string, fn: () => void, context?: any) => any;
    off: (eventName: string, fn?: () => void, context?: any, once?: boolean) => any;
    removeListener: (eventName: string, fn?: () => void, context?: any, once?: boolean) => any;
    log: () => void;
}
