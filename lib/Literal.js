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
        define(["require", "exports", './Expression', './private/util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Expression_1 = require('./Expression');
    var util_1 = require('./private/util');
    class Literal extends Expression_1.default {
        get type() {
            return 'Literal';
        }
        isLiteral() {}
    }
    __decorate([util_1.enumerable], Literal.prototype, "type", null);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Literal;
    class LiteralNull extends Literal {
        get value() {
            return null;
        }
    }
    __decorate([util_1.enumerable], LiteralNull.prototype, "value", null);
    exports.LiteralNull = LiteralNull;
    class LiteralString extends Literal {
        constructor(value) {
            super();
            this.value = value;
        }
    }
    exports.LiteralString = LiteralString;
    class LiteralBoolean extends Literal {
        constructor(value) {
            super();
            this.value = value;
        }
    }
    exports.LiteralBoolean = LiteralBoolean;
    class LiteralNumber extends Literal {
        constructor(value) {
            super();
            this.value = value;
        }
    }
    exports.LiteralNumber = LiteralNumber;
    class LiteralRegExp extends Literal {
        constructor(value) {
            super();
            this.value = value;
        }
        toJSON() {
            const obj = super.toJSON();
            obj.value = { pattern: this.value.source, flags: this.value.flags };
            return obj;
        }
    }
    exports.LiteralRegExp = LiteralRegExp;
    if (RegExp.prototype.flags === undefined) Object.defineProperty(RegExp.prototype, 'flags', {
        get() {
            return this.toString().match(/[gimy]*$/)[0];
        }
    });
});
//# sourceMappingURL=Literal.js.map
