(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";

    function enumerable(target, key, descriptor) {
        descriptor.enumerable = true;
        return descriptor;
    }
    exports.enumerable = enumerable;
});
//# sourceMappingURL=util.js.map
