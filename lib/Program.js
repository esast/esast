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
    class Program extends Node_1.default {
        get sourceType() {
            throw new Error('abstract');
        }
        get type() {
            return 'Program';
        }
    }
    __decorate([util_1.enumerable], Program.prototype, "sourceType", null);
    __decorate([util_1.enumerable], Program.prototype, "type", null);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Program;
    class Script extends Program {
        constructor(body) {
            super();
            this.body = body;
        }
        get sourceType() {
            return 'script';
        }
    }
    __decorate([util_1.enumerable], Script.prototype, "sourceType", null);
    exports.Script = Script;
    class Module extends Program {
        constructor(body) {
            super();
            this.body = body;
        }
        get sourceType() {
            return 'module';
        }
    }
    __decorate([util_1.enumerable], Module.prototype, "sourceType", null);
    exports.Module = Module;
    class ModuleDeclaration extends Node_1.default {
        isModuleDeclaration() {}
    }
    exports.ModuleDeclaration = ModuleDeclaration;
    class ModuleSpecifier extends Node_1.default {
        isModuleSpecifier() {}
    }
    exports.ModuleSpecifier = ModuleSpecifier;
    class ImportDeclaration extends ModuleDeclaration {
        constructor(specifiers, source) {
            super();
            this.specifiers = specifiers;
            this.source = source;
        }
    }
    exports.ImportDeclaration = ImportDeclaration;
    class ImportSpecifierAbstract extends ModuleSpecifier {
        constructor(local) {
            super();
            this.local = local;
        }
    }
    exports.ImportSpecifierAbstract = ImportSpecifierAbstract;
    class ImportSpecifier extends ImportSpecifierAbstract {
        constructor(imported) {
            let local = arguments.length <= 1 || arguments[1] === undefined ? imported : arguments[1];

            super(local);
            this.imported = imported;
        }
        get shorthand() {
            return this.imported === this.local;
        }
    }
    exports.ImportSpecifier = ImportSpecifier;
    class ImportDefaultSpecifier extends ImportSpecifierAbstract {
        constructor(local) {
            super(local);
        }
    }
    exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
    class ImportNamespaceSpecifier extends ImportSpecifierAbstract {
        constructor(local) {
            super(local);
        }
    }
    exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
    class Export extends ModuleDeclaration {
        isExport() {}
    }
    exports.Export = Export;
    class ExportNamedDeclaration extends Export {
        constructor(declaration) {
            let specifiers = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
            let source = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            super();
            this.declaration = declaration;
            this.specifiers = specifiers;
            this.source = source;
            if (declaration !== null && !(specifiers.length === 0 && source === null)) throw new Error('Declaration can not be combined with specifiers/source.');
        }
    }
    exports.ExportNamedDeclaration = ExportNamedDeclaration;
    class ExportSpecifier extends ModuleSpecifier {
        constructor(exported) {
            let local = arguments.length <= 1 || arguments[1] === undefined ? exported : arguments[1];

            super();
            this.exported = exported;
            this.local = local;
        }
        get shorthand() {
            return this.exported === this.local;
        }
    }
    exports.ExportSpecifier = ExportSpecifier;
    class ExportDefaultDeclaration extends Export {
        constructor(declaration) {
            super();
            this.declaration = declaration;
        }
    }
    exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
    class ExportAllDeclaration extends Export {
        constructor(source) {
            super();
            this.source = source;
        }
    }
    exports.ExportAllDeclaration = ExportAllDeclaration;
});
//# sourceMappingURL=Program.js.map
