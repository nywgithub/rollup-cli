import EventEmitter from "eventemitter3";
import extend from "extend";
import IComponent from "./IComponent";
import global from "../global";

const debug = process.env.NODE_ENV !== "production";

type PropsWithCommonFields<P> = P & {
  namespace?: string;
};
type StateFields<S> = S & {};

export default class Component<P, S = any>
  extends EventEmitter
  implements IComponent<P> {
  props: PropsWithCommonFields<P>; // 属性参数
  protected _: any; //私有变量包名
  state: StateFields<S>; //状态管理机制
  el: HTMLElement; //装载DOM
  static defaultProps?: any;

  constructor(props: PropsWithCommonFields<P>) {
    props = props || ({} as PropsWithCommonFields<P>);
    if (!props.namespace) props.namespace = global.namespace;
    super();
    //所有配置参数
    this.props = extend(
      true,
      {},
      (this.constructor as any).defaultProps || {},
      props
    );
    //所有私有变量
    this._ = {};

    this.init();
    return this;
  }

  init() {
    this.emit("init", this);
  }

  beforeUpdate() {
    return true;
  }

  render() {}

  setState<K extends keyof S>(state: Pick<S, K> | S | null) {
    if (!state) return false;
    this.state = {
      ...this.state,
      ...state,
    };
    this.beforeUpdate() && this.render();

    this.updated();
  }
  update<N extends keyof P>(props: Pick<P, N> | P | null) {
    if (!props) return false;
    this.props = {
      ...this.props,
      ...props,
    };

    this.beforeUpdate() && this.render();

    this.updated();
  }

  updated() {
    this.emit("updated", this);
  }

  /* mounted() {
      this.emit("mounted", this);
    }
    unmounted() {
      this.emit("unmounted", this);
    } */
  destroy() {
    this.emit("destroy", this);
  }

  log(...args) {
    debug ? console.log(...args) : "";
  }
}
