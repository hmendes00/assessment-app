export const ObserveDOM = (function () {
  return function (obj: any, callback: any) {
    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
      // define a new observer
      let mutationObserver = new MutationObserver(callback);

      // have the observer observe foo for changes in children
      mutationObserver.observe(obj, { childList: true, subtree: true });
      return mutationObserver;
    }

    // browser support fallback
    else {
      obj.addEventListener('DOMNodeInserted', callback, false);
    }
  };
})();