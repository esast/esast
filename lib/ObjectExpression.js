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
        define(["require", "exports", './Expression', './Node', './private/util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Expression_1 = require('./Expression');
    var Node_1 = require('./Node');
    var util_1 = require('./private/util');
    class ObjectExpression extends Expression_1.default {
        constructor(properties) {
            super();
            this.properties = properties;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ObjectExpression;
    class Property extends Node_1.default {
        constructor(name, value) {
            super();
            this.name = name;
            this.value = value;
        }
        get key() {
            const name = this.name;

            return name instanceof ComputedName ? name.value : name;
        }
        get computed() {
            return this.name instanceof ComputedName;
        }
        get type() {
            return 'Property';
        }
        get shorthand() {
            return this.value === this.key;
        }
        get method() {
            return false;
        }
    }
    __decorate([util_1.enumerable], Property.prototype, "key", null);
    __decorate([util_1.enumerable], Property.prototype, "computed", null);
    __decorate([util_1.enumerable], Property.prototype, "type", null);
    __decorate([util_1.enumerable], Property.prototype, "shorthand", null);
    __decorate([util_1.enumerable], Property.prototype, "method", null);
    exports.Property = Property;
    class ComputedName {
        constructor(value) {
            this.value = value;
        }
    }
    exports.ComputedName = ComputedName;
    class PropertyInit extends Property {
        get kind() {
            return 'init';
        }
    }
    __decorate([util_1.enumerable], PropertyInit.prototype, "kind", null);
    exports.PropertyInit = PropertyInit;
    class PropertyPlain extends PropertyInit {
        constructor(name, value) {
            super(name, value);
        }
    }
    exports.PropertyPlain = PropertyPlain;
    class PropertyMethod extends PropertyInit {
        constructor(name, value) {
            super(name, value);
        }
        get method() {
            return true;
        }
    }
    __decorate([util_1.enumerable], PropertyMethod.prototype, "method", null);
    exports.PropertyMethod = PropertyMethod;
    class PropertyGetSet extends Property {
        constructor(name, value) {
            super(name, value);
            if (value.id !== null) throw new Error('PropertyGetSet\'s value must not have id; that is stored in `key`.');
            if (value.async || value.generator) throw new Error('getter/setter can not be async/generator.');
        }
    }
    exports.PropertyGetSet = PropertyGetSet;
    class PropertyGet extends PropertyGetSet {
        get kind() {
            return 'get';
        }
    }
    __decorate([util_1.enumerable], PropertyGet.prototype, "kind", null);
    exports.PropertyGet = PropertyGet;
    class PropertySet extends PropertyGetSet {
        constructor(name, value) {
            super(name, value);
            if (value.params.length !== 1) throw new Error('Setter should have 1 parameter.');
        }
        get kind() {
            return 'set';
        }
    }
    __decorate([util_1.enumerable], PropertySet.prototype, "kind", null);
    exports.PropertySet = PropertySet;
});
//# sourceMappingURL=ObjectExpression.js.map
