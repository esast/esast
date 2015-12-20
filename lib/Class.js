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
        define(["require", "exports", './Identifier', './Node', './Declaration', './Expression', './ObjectExpression', './private/util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Identifier_1 = require('./Identifier');
    var Node_1 = require('./Node');
    var Declaration_1 = require('./Declaration');
    var Expression_1 = require('./Expression');
    var ObjectExpression_1 = require('./ObjectExpression');
    var util_1 = require('./private/util');
    class ClassDeclaration extends Declaration_1.default {
        constructor(id, superClass, body) {
            super();
            this.id = id;
            this.superClass = superClass;
            this.body = body;
        }
    }
    exports.ClassDeclaration = ClassDeclaration;
    class ClassExpression extends Expression_1.default {
        constructor(id, superClass, body) {
            super();
            this.id = id;
            this.superClass = superClass;
            this.body = body;
        }
    }
    exports.ClassExpression = ClassExpression;
    class ClassBody extends Node_1.default {
        constructor(body) {
            super();
            this.body = body;
        }
    }
    exports.ClassBody = ClassBody;
    class MethodDefinition extends Node_1.default {
        constructor(value) {
            super();
            this.value = value;
            if (this.value.id !== null) throw new Error('Function should not have id; MethodDefinition will take care of that.');
        }
        get type() {
            return 'MethodDefinition';
        }
    }
    __decorate([util_1.enumerable], MethodDefinition.prototype, "type", null);
    exports.MethodDefinition = MethodDefinition;
    class MethodDefinitionNonConstructor extends MethodDefinition {
        constructor(name, value, options) {
            super(value);
            this.name = name;
            this.static = Boolean(options.static);
        }
        get key() {
            const name = this.name;

            return name instanceof ObjectExpression_1.ComputedName ? name.value : name;
        }
        get computed() {
            return this.name instanceof ObjectExpression_1.ComputedName;
        }
    }
    __decorate([util_1.enumerable], MethodDefinitionNonConstructor.prototype, "key", null);
    __decorate([util_1.enumerable], MethodDefinitionNonConstructor.prototype, "computed", null);
    exports.MethodDefinitionNonConstructor = MethodDefinitionNonConstructor;
    class MethodDefinitionPlain extends MethodDefinitionNonConstructor {
        constructor(name, value) {
            let options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            super(name, value, options);
        }
        get kind() {
            return 'method';
        }
    }
    __decorate([util_1.enumerable], MethodDefinitionPlain.prototype, "kind", null);
    exports.MethodDefinitionPlain = MethodDefinitionPlain;
    class MethodDefinitionGet extends MethodDefinitionNonConstructor {
        constructor(name, value) {
            let options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            super(name, value, options);
            if (value.params.length !== 0) throw new Error('Getter should not have any parameters.');
        }
        get kind() {
            return 'get';
        }
    }
    __decorate([util_1.enumerable], MethodDefinitionGet.prototype, "kind", null);
    exports.MethodDefinitionGet = MethodDefinitionGet;
    class MethodDefinitionSet extends MethodDefinitionNonConstructor {
        constructor(name, value) {
            let options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            super(name, value, options);
            if (value.params.length !== 1) throw new Error('Setter should have 1 parameter.');
        }
        get kind() {
            return 'set';
        }
    }
    __decorate([util_1.enumerable], MethodDefinitionSet.prototype, "kind", null);
    exports.MethodDefinitionSet = MethodDefinitionSet;
    class MethodDefinitionConstructor extends MethodDefinition {
        constructor(value) {
            super(value);
        }
        get key() {
            return new Identifier_1.default('constructor');
        }
        get kind() {
            return 'constructor';
        }
        get static() {
            return false;
        }
        get computed() {
            return false;
        }
    }
    __decorate([util_1.enumerable], MethodDefinitionConstructor.prototype, "key", null);
    __decorate([util_1.enumerable], MethodDefinitionConstructor.prototype, "kind", null);
    __decorate([util_1.enumerable], MethodDefinitionConstructor.prototype, "static", null);
    __decorate([util_1.enumerable], MethodDefinitionConstructor.prototype, "computed", null);
    exports.MethodDefinitionConstructor = MethodDefinitionConstructor;
    class Super extends Node_1.default {
        isSuper() {}
    }
    exports.Super = Super;
});
//# sourceMappingURL=Class.js.map
