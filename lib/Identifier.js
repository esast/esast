(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './Expression'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Expression_1 = require('./Expression');
    class Identifier extends Expression_1.default {
        constructor(name) {
            super();
            this.name = name;
        }
        isPattern() {}
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Identifier;
});
//# sourceMappingURL=Identifier.js.map
