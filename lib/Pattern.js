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
        define(["require", "exports", './Node', './private/util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Node_1 = require('./Node');
    var util_1 = require('./private/util');
    function isPattern(_) {
        return 'isPattern' in _;
    }
    exports.isPattern = isPattern;
    class ObjectPattern extends Node_1.default {
        constructor(properties) {
            super();
            this.properties = properties;
        }
        isPattern() {}
    }
    exports.ObjectPattern = ObjectPattern;
    class AssignmentProperty extends Node_1.default {
        constructor(key) {
            let value = arguments.length <= 1 || arguments[1] === undefined ? key : arguments[1];

            super();
            this.key = key;
            this.value = value;
        }
        get type() {
            return 'Property';
        }
        get kind() {
            return 'init';
        }
        get method() {
            return false;
        }
        get shorthand() {
            return this.value === this.key;
        }
        get computed() {
            return false;
        }
    }
    __decorate([util_1.enumerable], AssignmentProperty.prototype, "type", null);
    __decorate([util_1.enumerable], AssignmentProperty.prototype, "kind", null);
    __decorate([util_1.enumerable], AssignmentProperty.prototype, "method", null);
    __decorate([util_1.enumerable], AssignmentProperty.prototype, "shorthand", null);
    __decorate([util_1.enumerable], AssignmentProperty.prototype, "computed", null);
    exports.AssignmentProperty = AssignmentProperty;
    class ArrayPattern extends Node_1.default {
        constructor(elements) {
            super();
            this.elements = elements;
        }
        isPattern() {}
    }
    exports.ArrayPattern = ArrayPattern;
    class RestElement extends Node_1.default {
        constructor(argument) {
            super();
            this.argument = argument;
        }
        isPattern() {}
    }
    exports.RestElement = RestElement;
});
//# sourceMappingURL=Pattern.js.map
