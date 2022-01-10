import { render } from "lit-html";

export default abstract class LitComponent<P, S = any> {
    protected readonly el: HTMLElement;

    protected props: P;
    protected state: S;

    private isMounted: boolean;
    private hasRenderTask?: boolean;

    protected constructor(el: HTMLElement, props: P) {
        this.el = el;

        this.props = { ...props };

        this.state = {} as any;

        this.isMounted = false;

        Promise.resolve().then(() => {
            this.mount();
        });
    }


    private mount() {
        if (!this.isMounted) {
            this.execRender();

            this.isMounted = true;

            this.componentDidMount();
        }
    }

    protected componentDidMount() {};

    protected componentWillUnmount() {}

    protected componentWillReceiveProps(nextProps: Readonly<P>){}

    protected componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any) {}

    protected shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>) {
        return true;
    }

    private renderTask(prevProps: Readonly<P>, prevState: Readonly<S>){
        if(!this.hasRenderTask){
            this.hasRenderTask = true;
            window.requestAnimationFrame(() => {
                this.hasRenderTask = false;
                if(this.shouldComponentUpdate(prevProps, prevState)){
                    this.execRender();
                    this.componentDidUpdate(prevProps, prevState);
                }
            })
        }
    }

    private execRender() {
        render((this.render()), this.el);
    }

    protected abstract render(): unknown;

    protected setState<K extends keyof S>(state: Pick<S, K> | S | null, callback?: () => void) {
        if (state && this.state) {
            const prevState = { ...this.state };

            const nextState = {
                ...this.state,
                ...state,
            };

            Promise.resolve().then(() => {
                this.state = { ...this.state, ...state };

                callback && callback();

                this.renderTask(this.props, prevState);
            });
        }
    }

    update<N extends keyof P>(props: Pick<P, N> | P | null) {
        if (!props) return false;

        const prevProps = { ...this.props };

        const nextProps = {
            ...this.props,
            ...props,
        };

        this.componentWillReceiveProps(nextProps);

        this.props = {
            ...nextProps
        }

        this.renderTask(prevProps, this.state);
    }

    abstract destroy(): void;
}

export { html as html } from "lit-html";