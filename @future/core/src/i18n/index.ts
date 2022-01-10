import I18N from "./I18N";
import en from "./lang/en";
import zh_cn from "./lang/zh-cn";

const i18n = new I18N({});
i18n.addLocale(en[0] as string, en[1]);
i18n.addLocale(zh_cn[0] as string, zh_cn[1]);
i18n.locale('en')
export default i18n;
