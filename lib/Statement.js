(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './Node'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Node_1 = require('./Node');
    class Statement extends Node_1.default {
        isStatement() {}
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Statement;
    class EmptyStatement extends Statement {}
    exports.EmptyStatement = EmptyStatement;
    class BlockStatement extends Statement {
        constructor(body) {
            super();
            this.body = body;
        }
    }
    exports.BlockStatement = BlockStatement;
    class ExpressionStatement extends Statement {
        constructor(expression) {
            super();
            this.expression = expression;
        }
    }
    exports.ExpressionStatement = ExpressionStatement;
    class IfStatement extends Statement {
        constructor(test, consequent) {
            let alternate = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            super();
            this.test = test;
            this.consequent = consequent;
            this.alternate = alternate;
        }
    }
    exports.IfStatement = IfStatement;
    class SwitchStatement extends Statement {
        constructor(discriminant, cases) {
            super();
            this.discriminant = discriminant;
            this.cases = cases;
        }
    }
    exports.SwitchStatement = SwitchStatement;
    class SwitchCase extends Node_1.default {
        constructor(test, consequent) {
            super();
            this.test = test;
            this.consequent = consequent;
        }
    }
    exports.SwitchCase = SwitchCase;
    class ReturnStatement extends Statement {
        constructor() {
            let argument = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            super();
            this.argument = argument;
        }
    }
    exports.ReturnStatement = ReturnStatement;
    class ThrowStatement extends Statement {
        constructor(argument) {
            super();
            this.argument = argument;
        }
    }
    exports.ThrowStatement = ThrowStatement;
    class TryStatement extends Statement {
        constructor(block) {
            let handler = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            let finalizer = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            super();
            this.block = block;
            this.handler = handler;
            this.finalizer = finalizer;
        }
    }
    exports.TryStatement = TryStatement;
    class CatchClause extends Node_1.default {
        constructor(param, body) {
            super();
            this.param = param;
            this.body = body;
        }
    }
    exports.CatchClause = CatchClause;
    class DebuggerStatement extends Statement {}
    exports.DebuggerStatement = DebuggerStatement;
});
//# sourceMappingURL=Statement.js.map
