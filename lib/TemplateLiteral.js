(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './Expression', './Node'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Expression_1 = require('./Expression');
    var Node_1 = require('./Node');
    class TemplateLiteral extends Expression_1.default {
        constructor(quasis, expressions) {
            super();
            this.quasis = quasis;
            this.expressions = expressions;
            if (this.quasis.length !== this.expressions.length + 1) throw new Error('There must be 1 more quasi than expressions.\n' + 'Maybe you need to add an empty quasi to the front or end.');
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TemplateLiteral;
    class TemplateElement extends Node_1.default {
        constructor(tail, value) {
            super();
            this.tail = tail;
            this.value = value;
        }
        static forRawString(str) {
            return new TemplateElement(false, {
                cooked: '',
                raw: str
            });
        }
        static forString(str) {
            return new TemplateElement(false, {
                cooked: str,
                raw: escapeStringForTemplate(str)
            });
        }
    }
    exports.TemplateElement = TemplateElement;
    TemplateElement.empty = TemplateElement.forString('');
    function escapeStringForTemplate(str) {
        return str.replace(/[{\\`\n\t\b\f\v\r\u2028\u2029]/g, ch => templateEscapes.get(ch));
    }
    const templateEscapes = new Map([['{', '\\}'], ['`', '\\`'], ['\\', '\\\\'], ['\n', '\\n'], ['\t', '\\t'], ['\b', '\\b'], ['\f', '\\f'], ['\v', '\\v'], ['\r', '\\r'], ['\u2028', '\\u2028'], ['\u2029', '\\u2029']]);
    class TaggedTemplateExpression extends Expression_1.default {
        constructor(tag, quasi) {
            super();
            this.tag = tag;
            this.quasi = quasi;
        }
    }
    exports.TaggedTemplateExpression = TaggedTemplateExpression;
});
//# sourceMappingURL=TemplateLiteral.js.map
