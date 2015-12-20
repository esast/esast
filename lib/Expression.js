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
    class Expression extends Node_1.default {
        isExpression() {}
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Expression;
    class ThisExpression extends Expression {}
    exports.ThisExpression = ThisExpression;
    class ArrayExpression extends Expression {
        constructor(elements) {
            super();
            this.elements = elements;
        }
    }
    exports.ArrayExpression = ArrayExpression;
    class SequenceExpression extends Expression {
        constructor(expressions) {
            super();
            this.expressions = expressions;
        }
    }
    exports.SequenceExpression = SequenceExpression;
    class UnaryExpression extends Expression {
        constructor(operator, argument) {
            super();
            this.operator = operator;
            this.argument = argument;
        }
        get prefix() {
            return true;
        }
    }
    __decorate([util_1.enumerable], UnaryExpression.prototype, "prefix", null);
    exports.UnaryExpression = UnaryExpression;
    class BinaryExpression extends Expression {
        constructor(operator, left, right) {
            super();
            this.operator = operator;
            this.left = left;
            this.right = right;
        }
    }
    exports.BinaryExpression = BinaryExpression;
    class AssignmentExpression extends Expression {
        constructor(operator, left, right) {
            super();
            this.operator = operator;
            this.left = left;
            this.right = right;
        }
    }
    exports.AssignmentExpression = AssignmentExpression;
    class UpdateExpression extends Expression {
        constructor(operator, argument, prefix) {
            super();
            this.operator = operator;
            this.argument = argument;
            this.prefix = prefix;
        }
    }
    exports.UpdateExpression = UpdateExpression;
    class LogicalExpression extends Expression {
        constructor(operator, left, right) {
            super();
            this.operator = operator;
            this.left = left;
            this.right = right;
        }
    }
    exports.LogicalExpression = LogicalExpression;
    class ConditionalExpression extends Expression {
        constructor(test, consequent, alternate) {
            super();
            this.test = test;
            this.consequent = consequent;
            this.alternate = alternate;
        }
    }
    exports.ConditionalExpression = ConditionalExpression;
    class NewExpression extends Expression {
        constructor(callee, args) {
            super();
            this.callee = callee;
            this.arguments = args;
        }
    }
    exports.NewExpression = NewExpression;
    class CallExpression extends Expression {
        constructor(callee, args) {
            super();
            this.callee = callee;
            this.arguments = args;
        }
    }
    exports.CallExpression = CallExpression;
    class SpreadElement extends Node_1.default {
        constructor(argument) {
            super();
            this.argument = argument;
        }
    }
    exports.SpreadElement = SpreadElement;
    class MemberExpression extends Expression {
        constructor(object) {
            super();
            this.object = object;
        }
        get type() {
            return 'MemberExpression';
        }
        get computed() {
            throw new Error();
        }
    }
    __decorate([util_1.enumerable], MemberExpression.prototype, "type", null);
    __decorate([util_1.enumerable], MemberExpression.prototype, "computed", null);
    exports.MemberExpression = MemberExpression;
    class MemberExpressionPlain extends MemberExpression {
        constructor(object, property) {
            super(object);
            this.property = property;
        }
        get computed() {
            return false;
        }
    }
    exports.MemberExpressionPlain = MemberExpressionPlain;
    class MemberExpressionComputed extends MemberExpression {
        constructor(object, property) {
            super(object);
            this.property = property;
        }
        get computed() {
            return true;
        }
    }
    exports.MemberExpressionComputed = MemberExpressionComputed;
    class YieldLike extends Expression {
        get type() {
            return 'YieldExpression';
        }
    }
    exports.YieldLike = YieldLike;
    class YieldExpression extends YieldLike {
        constructor(argument) {
            super();
            this.argument = argument;
        }
        get delegate() {
            return false;
        }
    }
    exports.YieldExpression = YieldExpression;
    class YieldDelegateExpression extends YieldLike {
        constructor(argument) {
            super();
            this.argument = argument;
        }
        get delegate() {
            return true;
        }
    }
    exports.YieldDelegateExpression = YieldDelegateExpression;
    class MetaProperty extends Expression {
        constructor(meta, property) {
            super();
            this.meta = meta;
            this.property = property;
        }
    }
    exports.MetaProperty = MetaProperty;
});
//# sourceMappingURL=Expression.js.map
