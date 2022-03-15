import { ObserveDOM } from './dom-observer';
import { getCurrentInstance, getCurrentScope, RendererNode } from 'vue';

let rootElName = '';

export const InjectCssInShadowRoot = (root: HTMLElement, selectors: string) => {
  const styleSheets = document.querySelectorAll(selectors);
  let innerHTML = '';
  for (let i = 0; i < styleSheets.length; i++) {
    innerHTML += styleSheets[i].innerHTML;
  }
  const shadowRoot = root.getRootNode();
  const styleElement = document.createElement('style');
  styleElement.innerHTML = innerHTML;
  shadowRoot.appendChild(styleElement);
};

export const GetShadowRoot = () => {
  if (!rootElName) {
    return;
  }

  return document.querySelector(rootElName)?.shadowRoot;
};

export const InjectCssInShadowRootFromString = (css: string) => {
  const shadowRoot = GetShadowRoot();
  const styleElement = document.createElement('style');
  styleElement.innerHTML = css;
  shadowRoot?.appendChild(styleElement);
};

const OnStyleInsertedInDom = (m: any) => {
  const shadowRoot = GetShadowRoot();
  console.log('haaa', shadowRoot);
  if (!shadowRoot) {
    return;
  }
  for (let index = 0; index < m.length; index++) {
    const element = m[index];

    // only move when it's same baseURI (meaning it comes from our own app)
    if (new URL(element.addedNodes[0]?.baseURI || '').host !== new URL(import.meta.url).host) {
      if (['STYLE', 'LINK'].includes(element.addedNodes[0]?.tagName.toUpperCase())) {
        console.log(element);
      }
      continue;
    }

    if (['STYLE', 'LINK'].includes(element.addedNodes[0]?.tagName.toUpperCase())) {
      shadowRoot.appendChild(element.addedNodes[0]);
    }
  }
};

export const CssInjectorForShadowDom = (appName: string) => {
  rootElName = appName;
  ObserveDOM(document.querySelector('head'), OnStyleInsertedInDom);
};
