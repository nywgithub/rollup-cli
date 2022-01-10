export default abstract class LitComponent<P, S = any> {
    protected readonly el: HTMLElement;
    protected props: P;
    protected state: S;
    private isMounted;
    private hasRenderTask?;
    protected constructor(el: HTMLElement, props: P);
    private mount;
    protected componentDidMount(): void;
    protected componentWillUnmount(): void;
    protected componentWillReceiveProps(nextProps: Readonly<P>): void;
    protected componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any): void;
    protected shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>): boolean;
    private renderTask;
    private execRender;
    protected abstract render(): unknown;
    protected setState<K extends keyof S>(state: Pick<S, K> | S | null, callback?: () => void): void;
    update<N extends keyof P>(props: Pick<P, N> | P | null): boolean;
    abstract destroy(): void;
}
export { html as html } from "lit-html";
