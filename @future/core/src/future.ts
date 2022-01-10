declare var __WEBPACK_VERSION: string;

export { default as Component } from "./core/Component";
export { default as LitComponent, html } from "./core/LitComponent";
export { default as util } from "./util";
export { default as global } from "./global";
export { default as i18n } from "./i18n";

export const getVersion = () => {
  return __WEBPACK_VERSION;
};
