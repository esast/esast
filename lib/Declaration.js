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
        define(["require", "exports", './Node', './Statement', './private/util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Node_1 = require('./Node');
    var Statement_1 = require('./Statement');
    var util_1 = require('./private/util');
    class Declaration extends Statement_1.default {
        isDeclaration() {}
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Declaration;
    class VariableDeclaration extends Declaration {
        constructor(declarations) {
            super();
            this.declarations = declarations;
            if (this.declarations.length === 0) throw new Error('VariableDeclaration must have at least 1 declaration.');
        }
        get type() {
            return 'VariableDeclaration';
        }
    }
    __decorate([util_1.enumerable], VariableDeclaration.prototype, "type", null);
    exports.VariableDeclaration = VariableDeclaration;
    class VariableDeclarationConst extends VariableDeclaration {
        get kind() {
            return 'const';
        }
    }
    __decorate([util_1.enumerable], VariableDeclarationConst.prototype, "kind", null);
    exports.VariableDeclarationConst = VariableDeclarationConst;
    class VariableDeclarationLet extends VariableDeclaration {
        get kind() {
            return 'let';
        }
    }
    __decorate([util_1.enumerable], VariableDeclarationLet.prototype, "kind", null);
    exports.VariableDeclarationLet = VariableDeclarationLet;
    class VariableDeclarationVar extends VariableDeclaration {
        get kind() {
            return 'var';
        }
    }
    __decorate([util_1.enumerable], VariableDeclarationVar.prototype, "kind", null);
    exports.VariableDeclarationVar = VariableDeclarationVar;
    class VariableDeclarator extends Node_1.default {
        constructor(id) {
            let init = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            super();
            this.id = id;
            this.init = init;
        }
    }
    exports.VariableDeclarator = VariableDeclarator;
});
//# sourceMappingURL=Declaration.js.map
