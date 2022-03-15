import { CssInjectorForShadowDom } from './helpers/css-injector';
// If you change this file, your app might not be registered properly
const appRegister = (ToguroVueComponent: CustomElementConstructor) => {
  const appName =
    document.querySelector(`script[data-appid='${import.meta.env.VITE_APP_ID}']`)?.getAttribute('data-appName') ||
    'toguro-toguro';

  CssInjectorForShadowDom(appName);
  customElements.define(appName, ToguroVueComponent);
};

export default appRegister;
