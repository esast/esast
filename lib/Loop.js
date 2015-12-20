(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './Statement'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Statement_1 = require('./Statement');
    class Loop extends Statement_1.default {
        isLoop() {}
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Loop;
    class WhileStatement extends Loop {
        constructor(test, body) {
            super();
            this.test = test;
            this.body = body;
        }
    }
    exports.WhileStatement = WhileStatement;
    class DoWhileStatement extends Loop {
        constructor(body, test) {
            super();
            this.body = body;
            this.test = test;
        }
    }
    exports.DoWhileStatement = DoWhileStatement;
    class ForStatement extends Loop {
        constructor(init, test, update, body) {
            super();
            this.init = init;
            this.test = test;
            this.update = update;
            this.body = body;
        }
    }
    exports.ForStatement = ForStatement;
    class ForInOfStatement extends Loop {
        constructor(left, right, body) {
            super();
            this.left = left;
            this.right = right;
            this.body = body;
        }
    }
    exports.ForInOfStatement = ForInOfStatement;
    class ForInStatement extends ForInOfStatement {
        constructor(left, right, body) {
            super(left, right, body);
        }
    }
    exports.ForInStatement = ForInStatement;
    class ForOfStatement extends ForInOfStatement {
        constructor(left, right, body) {
            super(left, right, body);
        }
    }
    exports.ForOfStatement = ForOfStatement;
    class BreakStatement extends Statement_1.default {
        constructor() {
            let label = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            super();
            this.label = label;
        }
    }
    exports.BreakStatement = BreakStatement;
    class ContinueStatement extends Statement_1.default {
        constructor() {
            let label = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            super();
            this.label = label;
        }
    }
    exports.ContinueStatement = ContinueStatement;
    class LabeledStatement extends Statement_1.default {
        constructor(label, body) {
            super();
            this.label = label;
            this.body = body;
        }
    }
    exports.LabeledStatement = LabeledStatement;
});
//# sourceMappingURL=Loop.js.map
