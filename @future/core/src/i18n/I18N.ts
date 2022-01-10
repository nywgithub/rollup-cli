import Component from "../core/Component";

export interface I18nProps {
  locales?: any;
  currLocal?: string;
  [propName: string]: any;
}
export interface I18nState {
  [propName: string]: any;
}
export default class I18N extends Component<I18nProps, I18nState> {
  static defaultProps: I18nProps = {
    locales: {},
    currLocal: "",
  };
  init() {
    super.init();
  }
  //获取所有语种
  getLocales() {
    let ret = [];
    const { locales } = this.props;
    for (var k in locales) {
      ret.push(k);
    }
    return ret;
  }
  //添加指定语种
  addLocale(local: string, lang: any = {}) {
    const { locales } = this.props;
    locales[local] = lang;
    if (!this.props.currLocal) {
      this.props.currLocal = local;
    }
  }
  //更换当前语言
  locale(local: string) {
    const { locales, currLocal } = this.props;
    if (!this._findLocale(local)) return false;
    if (local != currLocal) {
      return this._locale(local);
    }
    return true;
  }
  _locale(local: string) {
    this.props.currLocal = local;
    this.emit("change", this);
    return true;
  }
  //获取指定字段文案
  prop(key: string) {
    const { locales, currLocal } = this.props;
    let _arr = key.split(".");
    let obj = locales[currLocal];
    for(let i =0;i<_arr.length;i++){
        if(obj[_arr[i]]){
            obj = obj[_arr[i]];
        }else{
            return '';
        }
    }
    return obj;
  }
  //获取当前语种所有文案
  getAllProps() {
    const { locales, currLocal } = this.props;
    return locales[currLocal];
  }

  _findLocale(local: string) {
    let ret = false;
    const { locales } = this.props;
    for (var k in locales) {
      if (k == local) {
        ret = true;
        break;
      }
    }
    return ret;
  }
}
