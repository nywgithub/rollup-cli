import EventEmitter from "eventemitter3";
import IComponent from "./IComponent";
declare type PropsWithCommonFields<P> = P & {
    namespace?: string;
};
declare type StateFields<S> = S & {};
export default class Component<P, S = any> extends EventEmitter implements IComponent<P> {
    props: PropsWithCommonFields<P>;
    protected _: any;
    state: StateFields<S>;
    el: HTMLElement;
    static defaultProps?: any;
    constructor(props: PropsWithCommonFields<P>);
    init(): void;
    beforeUpdate(): boolean;
    render(): void;
    setState<K extends keyof S>(state: Pick<S, K> | S | null): boolean;
    update<N extends keyof P>(props: Pick<P, N> | P | null): boolean;
    updated(): void;
    destroy(): void;
    log(...args: any[]): void;
}
export {};
