var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './private/util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var util_1 = require('./private/util');
    class Node {
        toJSON() {
            const obj = { type: this.type };
            for (const key in this) obj[key] = this[key];
            return obj;
        }
        get type() {
            return this.constructor.name;
        }
        toString() {
            return JSON.stringify(this);
        }
    }
    __decorate([util_1.enumerable], Node.prototype, "type", null);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Node;
});
//# sourceMappingURL=Node.js.map
