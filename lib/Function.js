(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './Declaration', './Expression'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Declaration_1 = require('./Declaration');
    var Expression_1 = require('./Expression');
    function isFunction(_) {
        return 'isFunction' in _;
    }
    exports.isFunction = isFunction;
    function isFunctionNonArrow(_) {
        return 'isFunctionNonArrow' in _;
    }
    exports.isFunctionNonArrow = isFunctionNonArrow;
    class FunctionDeclaration extends Declaration_1.default {
        constructor(id, params, body) {
            let options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            super();
            this.id = id;
            this.params = params;
            this.body = body;
            this.generator = Boolean(options.generator);
            this.async = Boolean(options.async);
        }
        isFunction() {}
        isFunctionNonArrow() {}
    }
    exports.FunctionDeclaration = FunctionDeclaration;
    class FunctionExpression extends Expression_1.default {
        constructor(id, params, body) {
            let options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            super();
            this.id = id;
            this.params = params;
            this.body = body;
            this.generator = Boolean(options.generator);
            this.async = Boolean(options.async);
        }
        isFunction() {}
        isFunctionNonArrow() {}
    }
    exports.FunctionExpression = FunctionExpression;
    class ArrowFunctionExpression extends Expression_1.default {
        constructor(params, body) {
            super();
            this.params = params;
            this.body = body;
        }
        isFunction() {}
    }
    exports.ArrowFunctionExpression = ArrowFunctionExpression;
});
//# sourceMappingURL=Function.js.map
