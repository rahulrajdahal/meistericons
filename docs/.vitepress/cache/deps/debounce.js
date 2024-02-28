import {
  __commonJS
} from "./chunk-NIBQISYW.js";

// node_modules/debounce/index.js
var require_debounce = __commonJS({
  "node_modules/debounce/index.js"(exports, module) {
    function debounce(function_, wait = 100, options = {}) {
      if (typeof function_ !== "function") {
        throw new TypeError(`Expected the first parameter to be a function, got \`${typeof function_}\`.`);
      }
      if (wait < 0) {
        throw new RangeError("`wait` must not be negative.");
      }
      const { immediate } = typeof options === "boolean" ? { immediate: options } : options;
      let storedContext;
      let storedArguments;
      let timeoutId;
      let timestamp;
      let result;
      function later() {
        const last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
          timeoutId = setTimeout(later, wait - last);
        } else {
          timeoutId = void 0;
          if (!immediate) {
            const callContext = storedContext;
            const callArguments = storedArguments;
            storedContext = void 0;
            storedArguments = void 0;
            result = function_.apply(callContext, callArguments);
          }
        }
      }
      const debounced = function(...arguments_) {
        if (storedContext && this !== storedContext) {
          throw new Error("Debounced method called with different contexts.");
        }
        storedContext = this;
        storedArguments = arguments_;
        timestamp = Date.now();
        const callNow = immediate && !timeoutId;
        if (!timeoutId) {
          timeoutId = setTimeout(later, wait);
        }
        if (callNow) {
          const callContext = storedContext;
          const callArguments = storedArguments;
          storedContext = void 0;
          storedArguments = void 0;
          result = function_.apply(callContext, callArguments);
        }
        return result;
      };
      debounced.clear = () => {
        if (!timeoutId) {
          return;
        }
        clearTimeout(timeoutId);
        timeoutId = void 0;
      };
      debounced.flush = () => {
        if (!timeoutId) {
          return;
        }
        const callContext = storedContext;
        const callArguments = storedArguments;
        storedContext = void 0;
        storedArguments = void 0;
        result = function_.apply(callContext, callArguments);
        clearTimeout(timeoutId);
        timeoutId = void 0;
      };
      return debounced;
    }
    module.exports.debounce = debounce;
    module.exports = debounce;
  }
});
export default require_debounce();
//# sourceMappingURL=debounce.js.map
