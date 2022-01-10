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
    static defaultProps: I18nProps;
    init(): void;
    getLocales(): any[];
    addLocale(local: string, lang?: any): void;
    locale(local: string): boolean;
    _locale(local: string): boolean;
    prop(key: string): any;
    getAllProps(): any;
    _findLocale(local: string): boolean;
}
