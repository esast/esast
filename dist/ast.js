'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.ast = mod.exports;
	}
})(this, function (exports) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	class Node {
		toJSON() {
			const obj = {};
			obj.type = this.type;

			for (const key of Object.keys(this).sort()) obj[key] = this[key];

			return obj;
		}

		get type() {
			return this.constructor.name;
		}

		toString() {
			return JSON.stringify(this);
		}

	}

	exports.Node = Node;

	class Declaration extends Node {}

	exports.Declaration = Declaration;

	class Statement extends Node {}

	exports.Statement = Statement;

	class Expression extends Node {}

	exports.Expression = Expression;

	class Pattern extends Node {}

	exports.Pattern = Pattern;

	class Program extends Node {
		constructor(body) {
			super();
			this.body = body;
		}

	}

	exports.Program = Program;

	class Identifier extends Expression {
		constructor(name) {
			super();
			this.name = name;
		}

	}

	exports.Identifier = Identifier;

	class VariableDeclarator extends Node {
		constructor(id, init) {
			if (init === undefined) init = null;
			super();
			this.id = id;
			this.init = init;
		}

	}

	exports.VariableDeclarator = VariableDeclarator;
	const VariableDeclarationKind = exports.VariableDeclarationKind = new Set(['const', 'let', 'var']);

	class VariableDeclaration extends Declaration {
		constructor(kind, declarations) {
			super();
			this.kind = kind;
			this.declarations = declarations;
			if (this.declarations.length === 0) throw new Error('VariableDeclaration must have at least 1 declaration.');
		}

	}

	exports.VariableDeclaration = VariableDeclaration;

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
		constructor(test, consequent, alternate) {
			if (alternate === undefined) alternate = null;
			super();
			this.test = test;
			this.consequent = consequent;
			this.alternate = alternate;
		}

	}

	exports.IfStatement = IfStatement;

	class LabeledStatement extends Statement {
		constructor(label, body) {
			super();
			this.label = label;
			this.body = body;
		}

	}

	exports.LabeledStatement = LabeledStatement;

	class BreakStatement extends Statement {
		constructor(label) {
			if (label === undefined) label = null;
			super();
			this.label = label;
		}

	}

	exports.BreakStatement = BreakStatement;

	class ContinueStatement extends Statement {
		constructor(label) {
			if (label === undefined) label = null;
			super();
			this.label = label;
		}

	}

	exports.ContinueStatement = ContinueStatement;

	class SwitchStatement extends Statement {
		constructor(discriminant, cases) {
			super();
			this.discriminant = discriminant;
			this.cases = cases;
		}

	}

	exports.SwitchStatement = SwitchStatement;

	class SwitchCase extends Statement {
		constructor(test, consequent) {
			if (test === undefined) test = null;
			super();
			this.test = test;
			this.consequent = consequent;
		}

	}

	exports.SwitchCase = SwitchCase;

	class ReturnStatement extends Statement {
		constructor(argument) {
			if (argument === undefined) argument = null;
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
		constructor(block, handler, finalizer) {
			if (handler === undefined) handler = null;
			if (finalizer === undefined) finalizer = null;
			super();
			this.block = block;
			this.handler = handler;
			this.finalizer = finalizer;
		}

	}

	exports.TryStatement = TryStatement;

	class CatchClause extends Node {
		constructor(param, body) {
			super();
			this.param = param;
			this.body = body;
		}

	}

	exports.CatchClause = CatchClause;

	class WhileStatement extends Statement {
		constructor(test, body) {
			super();
			this.test = test;
			this.body = body;
		}

	}

	exports.WhileStatement = WhileStatement;

	class DoWhileStatement extends Statement {
		constructor(body, test) {
			super();
			this.body = body;
			this.test = test;
		}

	}

	exports.DoWhileStatement = DoWhileStatement;

	class ForStatement extends Statement {
		constructor(init, test, update, body) {
			super();
			this.init = init;
			this.test = test;
			this.update = update;
			this.body = body;
		}

	}

	exports.ForStatement = ForStatement;

	class ForInStatement extends Statement {
		constructor(left, right, body) {
			super();
			this.left = left;
			this.right = right;
			this.body = body;
		}

	}

	exports.ForInStatement = ForInStatement;

	class ForOfStatement extends Statement {
		constructor(left, right, body) {
			super();
			this.left = left;
			this.right = right;
			this.body = body;
		}

	}

	exports.ForOfStatement = ForOfStatement;

	class DebuggerStatement extends Statement {}

	exports.DebuggerStatement = DebuggerStatement;

	class FunctionAbstract extends Node {}

	exports.FunctionAbstract = FunctionAbstract;

	class FunctionNonArrow extends FunctionAbstract {
		constructor(id, params, body, generator) {
			if (generator === undefined) generator = false;
			super();
			this.id = id;
			this.params = params;
			this.body = body;
			this.generator = generator;
		}

	}

	class FunctionDeclaration extends FunctionNonArrow {}

	exports.FunctionDeclaration = FunctionDeclaration;

	class Literal extends Expression {
		constructor(value) {
			super();
			this.value = value;
		}

		toJSON() {
			const value = this.value instanceof RegExp ? {
				pattern: this.value.source,
				flags: this.value.flags
			} : this.value;
			return {
				type: 'Literal',
				value
			};
		}

	}

	exports.Literal = Literal;
	if (RegExp.prototype.flags === undefined) Object.defineProperty(RegExp.prototype, 'flags', {
		get() {
			return this.toString().match(/[gimy]*$/)[0];
		}

	});

	class ThisExpression extends Expression {}

	exports.ThisExpression = ThisExpression;

	class ArrayExpression extends Expression {
		constructor(elements) {
			super();
			this.elements = elements;
		}

	}

	exports.ArrayExpression = ArrayExpression;
	const PropertyKind = exports.PropertyKind = new Set(['init', 'get', 'set']);

	class Property extends Node {
		constructor(kind, key) {
			let value = arguments.length <= 2 || arguments[2] === undefined ? key : arguments[2];
			let computed = arguments.length <= 3 || arguments[3] === undefined ? !(key instanceof Identifier) : arguments[3];
			let method = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
			super();
			this.kind = kind;
			this.key = key;
			this.value = value;
			this.computed = computed;
			this.method = method;

			if (this.kind !== 'init') {
				if (!(this.value instanceof FunctionExpression)) throw new Error('get/set Property\'s value must be a FunctionExpression.');
				if (this.value.id !== null) throw new Error('get/set Property\'s value must not have id; ' + 'that is stored in the `key` of the Property.');
				if (this.value.generator) throw new Error('get/set can not be a generator.');
				if (this.method) throw new Error('get/set can not have method: true.');
			} else if (this.method && !(this.value instanceof FunctionExpression)) throw new Error('method Property\'s value must be a FunctionExpression.');
		}

		get shorthand() {
			return this.value === this.key;
		}

	}

	exports.Property = Property;

	class ObjectExpression extends Expression {
		constructor(properties) {
			super();
			this.properties = properties;
		}

	}

	exports.ObjectExpression = ObjectExpression;

	class FunctionExpression extends FunctionNonArrow {}

	exports.FunctionExpression = FunctionExpression;

	class ArrowFunctionExpression extends Expression {
		constructor(params, body) {
			super();
			this.params = params;
			this.body = body;
		}

	}

	exports.ArrowFunctionExpression = ArrowFunctionExpression;

	class SequenceExpression extends Expression {
		constructor(expressions) {
			super();
			this.expressions = expressions;
		}

	}

	exports.SequenceExpression = SequenceExpression;
	const UnaryOperator = exports.UnaryOperator = new Set(['-', '+', '!', '~', 'typeof', 'void', 'delete']);

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

	exports.UnaryExpression = UnaryExpression;
	const BinaryOperator = exports.BinaryOperator = new Set(['==', '!=', '===', '!==', '<', '<=', '>', '>=', '<<', '>>', '>>>', '+', '-', '*', '/', '%', '|', '^', '&', 'in', 'instanceof']);

	class BinaryExpression extends Expression {
		constructor(operator, left, right) {
			super();
			this.operator = operator;
			this.left = left;
			this.right = right;
		}

	}

	exports.BinaryExpression = BinaryExpression;
	const AssignmentOperator = exports.AssignmentOperator = new Set(['=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '|=', '^=', '&=']);

	class AssignmentExpression extends Expression {
		constructor(operator, left, right) {
			super();
			this.operator = operator;
			this.left = left;
			this.right = right;
		}

	}

	exports.AssignmentExpression = AssignmentExpression;
	const UpdateOperator = exports.UpdateOperator = new Set(['++', '--']);

	class UpdateExpression extends Expression {
		constructor(operator, argument, prefix) {
			super();
			this.operator = operator;
			this.argument = argument;
			this.prefix = prefix;
		}

	}

	exports.UpdateExpression = UpdateExpression;
	const LogicalOperator = exports.LogicalOperator = new Set(['||', '&&']);

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
		constructor(callee, _arguments) {
			super();
			this.callee = callee;
			this.arguments = _arguments;
		}

	}

	exports.NewExpression = NewExpression;

	class CallExpression extends Expression {
		constructor(callee, _arguments) {
			super();
			this.callee = callee;
			this.arguments = _arguments;
		}

	}

	exports.CallExpression = CallExpression;

	class SpreadElement extends Node {
		constructor(argument) {
			super();
			this.argument = argument;
		}

	}

	exports.SpreadElement = SpreadElement;

	class MemberExpression extends Expression {
		constructor(object, property) {
			super();
			this.object = object;
			this.property = property;
		}

		get computed() {
			return !(this.property instanceof Identifier);
		}

	}

	exports.MemberExpression = MemberExpression;

	class YieldExpression extends Expression {
		constructor(argument, delegate) {
			super();
			this.argument = argument;
			this.delegate = delegate;
			if (this.delegate && this.argument === null) throw new Error('Can not yield* without argument.');
		}

	}

	exports.YieldExpression = YieldExpression;

	class TemplateLiteral extends Expression {
		constructor(quasis, expressions) {
			super();
			this.quasis = quasis;
			this.expressions = expressions;
			if (this.quasis.length !== this.expressions.length + 1) throw new Error('There must be 1 more quasi than expressions.\n' + 'Maybe you need to add an empty quasi to the front or end.');
		}

	}

	exports.TemplateLiteral = TemplateLiteral;

	class TemplateElement extends Node {
		static forRawString(str) {
			return new TemplateElement(false, {
				cooked: null,
				raw: str
			});
		}

		static forString(str) {
			return new TemplateElement(false, {
				cooked: str,
				raw: escapeStringForTemplate(str)
			});
		}

		static get empty() {
			return this.forString('');
		}

		constructor(tail, value) {
			super();
			this.tail = tail;
			this.value = value;
		}

	}

	exports.TemplateElement = TemplateElement;

	const escapeStringForTemplate = str => str.replace(/[{\\`\n\t\b\f\v\r\u2028\u2029]/g, ch => templateEscapes[ch]),
	      templateEscapes = {
		'{': '\\{',
		'`': '\\`',
		'\\': '\\\\',
		'\n': '\\n',
		'\t': '\\t',
		'\b': '\\b',
		'\f': '\\f',
		'\v': '\\v',
		'\r': '\\r',
		'\u2028': '\\u2028',
		'\u2029': '\\u2029'
	};

	class TaggedTemplateExpression extends Expression {
		constructor(tag, quasi) {
			super();
			this.tag = tag;
			this.quasi = quasi;
		}

	}

	exports.TaggedTemplateExpression = TaggedTemplateExpression;

	class ObjectPattern extends Pattern {
		constructor(properties) {
			super();
			this.properties = properties;
		}

	}

	exports.ObjectPattern = ObjectPattern;

	class AssignmentProperty extends Node {
		constructor(key, value) {
			if (value === undefined) value = key;
			super();
			this.key = key;
			this.value = value;
		}

		get type() {
			return 'Property';
		}

		get kind() {
			return 'init';
		}

		get method() {
			return false;
		}

		get shorthand() {
			return this.value === this.key;
		}

		get computed() {
			return !(this.key instanceof Identifier);
		}

	}

	exports.AssignmentProperty = AssignmentProperty;

	class ArrayPattern extends Pattern {
		constructor(elements) {
			super();
			this.elements = elements;
		}

	}

	exports.ArrayPattern = ArrayPattern;

	class RestElement extends Pattern {
		constructor(argument) {
			super();
			this.argument = argument;
		}

	}

	exports.RestElement = RestElement;
	const MethodDefinitionKind = exports.MethodDefinitionKind = new Set(['constructor', 'method', 'get', 'set']);

	class MethodDefinition extends Node {
		static constructor(value) {
			return new MethodDefinition(new Identifier('constructor'), value, 'constructor');
		}

		constructor(key, value, kind, _static, computed) {
			if (_static === undefined) _static = false;
			if (computed === undefined) computed = false;
			if (kind === 'constructor' && !(key instanceof Identifier && key.name === 'constructor' && !_static && !computed)) throw new Error('Constructor method should created with `MethodDefinition.constructor`.');
			super();
			this.key = key;
			this.value = value;
			this.kind = kind;
			this.static = _static;
			this.computed = computed;
			if (value.id !== null) throw new Error('MethodDefinition value should not have id; that is handled by `key`.');
		}

	}

	exports.MethodDefinition = MethodDefinition;

	class ClassBody extends Node {
		constructor(body) {
			super();
			this.body = body;
		}

	}

	exports.ClassBody = ClassBody;

	class Class extends Node {}

	exports.Class = Class;

	class ClassDeclaration extends Class {
		constructor(id, superClass, body) {
			super();
			this.id = id;
			this.superClass = superClass;
			this.body = body;
		}

	}

	exports.ClassDeclaration = ClassDeclaration;

	class ClassExpression extends Class {
		constructor(id, superClass, body) {
			super();
			this.id = id;
			this.superClass = superClass;
			this.body = body;
		}

	}

	exports.ClassExpression = ClassExpression;

	class ModuleSpecifier extends Node {}

	exports.ModuleSpecifier = ModuleSpecifier;

	class ImportSpecifierAbstract extends Node {}

	exports.ImportSpecifierAbstract = ImportSpecifierAbstract;

	class ImportDeclaration extends Node {
		constructor(specifiers, source) {
			super();
			this.specifiers = specifiers;
			this.source = source;
		}

	}

	exports.ImportDeclaration = ImportDeclaration;

	class ImportSpecifier extends ModuleSpecifier {
		constructor(imported, local) {
			if (local === undefined) local = imported;
			super();
			this.imported = imported;
			this.local = local;
		}

	}

	exports.ImportSpecifier = ImportSpecifier;

	class ImportDefaultSpecifier extends ImportSpecifierAbstract {
		constructor(local) {
			super();
			this.local = local;
		}

	}

	exports.ImportDefaultSpecifier = ImportDefaultSpecifier;

	class ImportNamespaceSpecifier extends ImportSpecifierAbstract {
		constructor(local) {
			super();
			this.local = local;
		}

	}

	exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;

	class ExportSpecifier extends ModuleSpecifier {
		constructor(exported, local) {
			if (local === undefined) local = exported;
			super();
			this.exported = exported;
			this.local = local;
		}

	}

	exports.ExportSpecifier = ExportSpecifier;

	class ExportNamedDeclaration extends Node {
		constructor(declaration, specifiers, source) {
			if (specifiers === undefined) specifiers = [];
			if (source === undefined) source = null;
			super();
			this.declaration = declaration;
			this.specifiers = specifiers;
			this.source = source;
			if (declaration !== null && !(specifiers.length === 0 && source === null)) throw new Error('Declaration can not be combined with specifiers/source.');
		}

	}

	exports.ExportNamedDeclaration = ExportNamedDeclaration;

	class ExportDefaultDeclaration extends Node {
		constructor(declaration) {
			super();
			this.declaration = declaration;
		}

	}

	exports.ExportDefaultDeclaration = ExportDefaultDeclaration;

	class ExportAllDeclaration extends Node {
		constructor(source) {
			super();
			this.source = source;
		}

	}

	exports.ExportAllDeclaration = ExportAllDeclaration;
});
//# sourceMappingURL=data:application/json;base64,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Ozs7Ozs7Ozs7Ozs7O1NBQWhCLGdCQUFnQixHQUFoQixnQkFBZ0I7O09BbUNoQixTQUFTOzs7Ozs7OztTQUFULFNBQVMsR0FBVCxTQUFTOztPQVNULEtBQUs7O1NBQUwsS0FBSyxHQUFMLEtBQUs7O09BSUwsZ0JBQWdCOzs7Ozs7Ozs7O1NBQWhCLGdCQUFnQixHQUFoQixnQkFBZ0I7O09BYWhCLGVBQWU7Ozs7Ozs7Ozs7U0FBZixlQUFlLEdBQWYsZUFBZTs7T0FjZixlQUFlOztTQUFmLGVBQWUsR0FBZixlQUFlOztPQUtmLHVCQUF1Qjs7U0FBdkIsdUJBQXVCLEdBQXZCLHVCQUF1Qjs7T0FPdkIsaUJBQWlCOzs7Ozs7Ozs7U0FBakIsaUJBQWlCLEdBQWpCLGlCQUFpQjs7T0FlakIsZUFBZTs7Ozs7Ozs7OztTQUFmLGVBQWUsR0FBZixlQUFlOztPQWNmLHNCQUFzQjs7Ozs7Ozs7U0FBdEIsc0JBQXNCLEdBQXRCLHNCQUFzQjs7T0FTdEIsd0JBQXdCOzs7Ozs7OztTQUF4Qix3QkFBd0IsR0FBeEIsd0JBQXdCOztPQWF4QixlQUFlOzs7Ozs7Ozs7O1NBQWYsZUFBZSxHQUFmLGVBQWU7O09Ba0JmLHNCQUFzQjs7Ozs7Ozs7Ozs7OztTQUF0QixzQkFBc0IsR0FBdEIsc0JBQXNCOztPQXNCdEIsd0JBQXdCOzs7Ozs7OztTQUF4Qix3QkFBd0IsR0FBeEIsd0JBQXdCOztPQVN4QixvQkFBb0I7Ozs7Ozs7O1NBQXBCLG9CQUFvQixHQUFwQixvQkFBb0IiLCJmaWxlIjoiYXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW5kZW50ICovXG5cbi8qKiBCYXNlIHR5cGUgb2YgYWxsIEFTVHMuICovXG5leHBvcnQgY2xhc3MgTm9kZSB7XG5cdC8qKlxuXHRDb252ZXJ0IHRvIEpTT04uXG5cdEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzdHJlZS9lc3RyZWVcblx0Ki9cblx0dG9KU09OKCkge1xuXHRcdGNvbnN0IG9iaiA9IHsgfVxuXHRcdG9iai50eXBlID0gdGhpcy50eXBlXG5cdFx0Ly8gU29ydCB0byBtYWtlIEpTT04gcmVuZGVyaW5nIGRldGVybWluaXN0aWMuXG5cdFx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcykuc29ydCgpKVxuXHRcdFx0b2JqW2tleV0gPSB0aGlzW2tleV1cblx0XHRyZXR1cm4gb2JqXG5cdH1cblxuXHQvKipcblx0Rm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvdGhlciBBU1QgcmVwcmVzZW50YXRpb25zLFxuXHRhbGwgTm9kZSBpbnN0YW5jZXMgaGF2ZSBhICd0eXBlJyBwcm9wZXJ0eSB0aGF0IGlzIHRoZSBuYW1lIG9mIHRoYXQgdHlwZS5cblx0QHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXN0cmVlL2VzdHJlZVxuXHQqL1xuXHRnZXQgdHlwZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG5cdH1cblxuXHQvKiogQG92ZXJyaWRlICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKVxuXHR9XG59XG5cbi8vIEFic3RyYWN0c1xuXHQvKiogTGluZSB0aGF0IGRlY2xhcmVzIG5ldyBsb2NhbHMuICovXG5cdGV4cG9ydCBjbGFzcyBEZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqIEJsb2NrcyBvZiBjb2RlIGhhdmUgbGluZXMgdGhhdCBhcmUgU3RhdGVtZW50cyBvciBEZWNsYXJhdGlvbnMuICovXG5cdGV4cG9ydCBjbGFzcyBTdGF0ZW1lbnQgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHRDb2RlIHRoYXQgaGFzIGEgdmFsdWUuXG5cdFRvIHVzZSBvbmUgaW4gYSBzdGF0ZW1lbnQgcG9zaXRpb24sIHNlZSBFeHByZXNzaW9uU3RhdGVtZW50LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqXG5cdENhbiBnbyBpbiBhIHBhcmFtZXRlciBsaXN0IG9yIG9uIHRoZSBsZWZ0IHNpZGUgb2YgYW4gYXNzaWdubWVudC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFBhdHRlcm4gZXh0ZW5kcyBOb2RlIHsgfVxuXG4vLyBBIGNvbXBsZXRlIHByb2dyYW0gc291cmNlIHRyZWUuXG5leHBvcnQgY2xhc3MgUHJvZ3JhbSBleHRlbmRzIE5vZGUge1xuXHRjb25zdHJ1Y3Rvcihib2R5KSB7XG5cdFx0c3VwZXIoKVxuXHRcdC8qKiBAdHlwZSB7QXJyYXk8U3RhdGVtZW50Pn0gKi9cblx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdH1cbn1cblxuLy8gVmFyaWFibGVzXG5cdC8qKlxuXHRBIEphdmFTY3JpcHQgaWRlbnRpZmllci5cblxuXHRJdCBpcyBhc3N1bWVkIHRoYXQgeW91IGhhdmUgY2FsbGVkIGBtYW5nbGVJZGVudGlmaWVyYCBhcyBhcHByb3ByaWF0ZS5cblx0U2VlIGFsc28ge0BsaW5rIGlkZW50aWZpZXJ9LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgSWRlbnRpZmllciBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG5hbWUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuXHRcdFx0dGhpcy5uYW1lID0gbmFtZVxuXHRcdH1cblx0fVxuXG5cdC8qKiBTaW5nbGUgZGVjbGFyYXRpb24gd2l0aGluIGEge0BsaW5rIFZhcmlhYmxlRGVjbGFyYXRpb259LiAqL1xuXHRleHBvcnQgY2xhc3MgVmFyaWFibGVEZWNsYXJhdG9yIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoaWQsIGluaXQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChpbml0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGluaXQgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1BhdHRlcm59ICovXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmluaXQgPSBpbml0XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBWYXJpYWJsZURlY2xhcmF0aW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IFZhcmlhYmxlRGVjbGFyYXRpb25LaW5kID0gbmV3IFNldChbJ2NvbnN0JywgJ2xldCcsICd2YXInXSlcblx0LyoqXG5cdERlY2xhcmVzIGFuZCBvcHRpb25hbGx5IGluaXRpYWxpemVzIG1hbnkgdmFyaWFibGVzLlxuXHRNdXN0IGJlIGF0IGxlYXN0IG9uZSBkZWNsYXJhdGlvbi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFZhcmlhYmxlRGVjbGFyYXRpb24gZXh0ZW5kcyBEZWNsYXJhdGlvbiB7XG5cdFx0Y29uc3RydWN0b3Ioa2luZCwgZGVjbGFyYXRpb25zKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1ZhcmlhYmxlRGVjbGFyYXRpb25LaW5kfSAqL1xuXHRcdFx0dGhpcy5raW5kID0ga2luZFxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxWYXJpYWJsZURlY2xhcmF0b3I+fSAqL1xuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbnMgPSBkZWNsYXJhdGlvbnNcblx0XHRcdGlmICh0aGlzLmRlY2xhcmF0aW9ucy5sZW5ndGggPT09IDApXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignVmFyaWFibGVEZWNsYXJhdGlvbiBtdXN0IGhhdmUgYXQgbGVhc3QgMSBkZWNsYXJhdGlvbi4nKVxuXHRcdH1cblx0fVxuXG5cbi8vIFN0YXRlbWVudHNcblx0LyoqXG5cdEFuIGVtcHR5IHN0YXRlbWVudCwgaS5lLiwgYSBzb2xpdGFyeSBzZW1pY29sb24uXG5cdE5vdCB1c2VmdWwgZm9yIGNvZGUgZ2VuZXJhdGlvbiwgYnV0IHNvbWUgcGFyc2VycyB3aWxsIHJldHVybiB0aGVzZS5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEVtcHR5U3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHsgfVxuXG5cdC8qKiBBIGJsb2NrIHN0YXRlbWVudCwgaS5lLiwgYSBzZXF1ZW5jZSBvZiBzdGF0ZW1lbnRzIHN1cnJvdW5kZWQgYnkgYnJhY2VzLiAqL1xuXHRleHBvcnQgY2xhc3MgQmxvY2tTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8U3RhdGVtZW50Pn0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKipcblx0QW4gZXhwcmVzc2lvbiBzdGF0ZW1lbnQsIGkuZS4sIGEgc3RhdGVtZW50IGNvbnNpc3Rpbmcgb2YgYSBzaW5nbGUgZXhwcmVzc2lvbi5cblx0U2VlIGBlc2FzdC51dGlsIHRvU3RhdGVtZW50IHRvU3RhdGVtZW50c2AuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBFeHByZXNzaW9uU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihleHByZXNzaW9uKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFuIGlmIChvciBpZiAuLi4gZWxzZSkgc3RhdGVtZW50LiAqL1xuXHRleHBvcnQgY2xhc3MgSWZTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJndW1lbnRzXG5cdFx0XHRpZiAoYWx0ZXJuYXRlID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGFsdGVybmF0ZSA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5jb25zZXF1ZW50ID0gY29uc2VxdWVudFxuXHRcdFx0LyoqIEB0eXBlIHs/U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5hbHRlcm5hdGUgPSBhbHRlcm5hdGVcblx0XHR9XG5cdH1cblxuXHQvKiogQSBzdGF0ZW1lbnQgcHJlZml4ZWQgYnkgYSBsYWJlbC4gKi9cblx0ZXhwb3J0IGNsYXNzIExhYmVsZWRTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGxhYmVsLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxhYmVsID0gbGFiZWxcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdGV4cG9ydCBjbGFzcyBCcmVha1N0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0LyoqIFRoZSBgYnJlYWtgIGtleXdvcmQuICovXG5cdFx0Y29uc3RydWN0b3IobGFiZWwpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChsYWJlbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRsYWJlbCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxhYmVsID0gbGFiZWxcblx0XHR9XG5cdH1cblxuXHQvKiogVGhlIGBjb250aW51ZWAga2V5d29yZC4gKi9cblx0ZXhwb3J0IGNsYXNzIENvbnRpbnVlU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihsYWJlbCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxhYmVsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxhYmVsID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubGFiZWwgPSBsYWJlbFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgc3dpdGNoIChkaXNjcmltaW5hbnQpIHsgY2FzZXMgfWBcblx0T25seSB0aGUgbGFzdCBlbnRyeSBvZiBgY2FzZXNgIGlzIGFsbG93ZWQgdG8gYmUgYGRlZmF1bHRgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgU3dpdGNoU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihkaXNjcmltaW5hbnQsIGNhc2VzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmRpc2NyaW1pbmFudCA9IGRpc2NyaW1pbmFudFxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxTd2l0Y2hDYXNlPn0gKi9cblx0XHRcdHRoaXMuY2FzZXMgPSBjYXNlc1xuXHRcdH1cblx0fVxuXHQvKipcblx0QSBzaW5nbGUgYGNhc2VgIHdpdGhpbiBhIFN3aXRjaFN0YXRlbWVudC5cblx0SWYgYHRlc3RgIGlzIGBudWxsYCwgdGhpcyBpcyB0aGUgYGRlZmF1bHRgIGNhc2UuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBTd2l0Y2hDYXNlIGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcih0ZXN0LCBjb25zZXF1ZW50KSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAodGVzdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHR0ZXN0ID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8U3RhdGVtZW50PiAqL1xuXHRcdFx0dGhpcy5jb25zZXF1ZW50ID0gY29uc2VxdWVudFxuXHRcdH1cblx0fVxuXG5cdC8qKiBUaGUgYHJldHVybmAga2V5d29yZCwgb3B0aW9uYWxseSBmb2xsb3dlZCBieSBhbiBFeHByZXNzaW9uIHRvIHJldHVybi4gKi9cblx0ZXhwb3J0IGNsYXNzIFJldHVyblN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChhcmd1bWVudCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRhcmd1bWVudCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cdH1cblxuXHQvKipcblx0VGhlIGB0aHJvd2Aga2V5d29yZCwgYW5kIHNvbWV0aGluZyB0byB0aHJvdy5cblx0U2VlIGBlc2FzdC51dGlsIHRocm93RXJyb3JgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgVGhyb3dTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YHRyeSB7IGJsb2NrIH0gY2F0Y2ggKGhhbmRsZXIucGFyYW0pIHsgaGFuZGxlci5ib2R5IH0gZmluYWxseSB7IGZpbmFsaXplciB9YFxuXHRBdCBsZWFzdCBvbmUgb2YgYGhhbmRsZXJgIG9yIGBmaW5hbGl6ZXJgIG11c3QgYmUgbm9uLW51bGwuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBUcnlTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGJsb2NrLCBoYW5kbGVyLCBmaW5hbGl6ZXIpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGhhbmRsZXIgPSBudWxsXG5cdFx0XHRpZiAoZmluYWxpemVyID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGZpbmFsaXplciA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QmxvY2tTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJsb2NrID0gYmxvY2tcblx0XHRcdC8qKiBAdHlwZSB7P0NhdGNoQ2xhdXNlfSAqL1xuXHRcdFx0dGhpcy5oYW5kbGVyID0gaGFuZGxlclxuXHRcdFx0LyoqIEB0eXBlIHs/QmxvY2tTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmZpbmFsaXplciA9IGZpbmFsaXplclxuXHRcdH1cblx0fVxuXHQvKiogTXVzdCBiZSAqcGFydCogb2YgYSB7QGxpbmsgVHJ5U3RhdGVtZW50fSAtLSBkb2VzICpub3QqIGZvbGxvdyBpdC4gKi9cblx0ZXhwb3J0IGNsYXNzIENhdGNoQ2xhdXNlIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IocGFyYW0sIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMucGFyYW0gPSBwYXJhbVxuXHRcdFx0LyoqIEB0eXBlIHtCbG9ja1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKiogYHdoaWxlICh0ZXN0KSBib2R5YCAqL1xuXHRleHBvcnQgY2xhc3MgV2hpbGVTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKHRlc3QsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZG8gYm9keSB3aGlsZSAodGVzdClgICovXG5cdGV4cG9ydCBjbGFzcyBEb1doaWxlU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihib2R5LCB0ZXN0KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YGZvciAoaW5pdDsgdGVzdDsgdXBkYXRlKSBib2R5YFxuXHROb3QgdG8gYmUgY29uZnVzZWQgd2l0aCBGb3JJblN0YXRlbWVudCBvciBGb3JPZlN0YXRlbWVudC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEZvclN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoaW5pdCwgdGVzdCwgdXBkYXRlLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez8oVmFyaWFibGVEZWNsYXJhdGlvbiB8IEV4cHJlc3Npb24pfSAqL1xuXHRcdFx0dGhpcy5pbml0ID0gaW5pdFxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnVwZGF0ZSA9IHVwZGF0ZVxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIGBmb3IgKGxlZnQgaW4gcmlnaHQpIGJvZHlgICovXG5cdGV4cG9ydCBjbGFzcyBGb3JJblN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IobGVmdCwgcmlnaHQsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VmFyaWFibGVEZWNsYXJhdGlvbiB8IEV4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZm9yIChsZWZ0IG9mIHJpZ2h0KSBib2R5YCAqL1xuXHRleHBvcnQgY2xhc3MgRm9yT2ZTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGxlZnQsIHJpZ2h0LCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1ZhcmlhYmxlRGVjbGFyYXRpb24gfCBFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0XHQvKiogQHR5cGUge1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKiogVGhlIGBkZWJ1Z2dlcmAga2V5d29yZC4gKi9cblx0ZXhwb3J0IGNsYXNzIERlYnVnZ2VyU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHsgfVxuXG4vLyBEZWNsYXJhdGlvbnNcblx0LyoqIEZ1bmN0aW9uRGVjbGFyYXRpb24gfCBGdW5jdGlvbkV4cHJlc3Npb24gfCBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbiAqL1xuXHRleHBvcnQgY2xhc3MgRnVuY3Rpb25BYnN0cmFjdCBleHRlbmRzIE5vZGUgeyB9XG5cblx0Y2xhc3MgRnVuY3Rpb25Ob25BcnJvdyBleHRlbmRzIEZ1bmN0aW9uQWJzdHJhY3Qge1xuXHRcdGNvbnN0cnVjdG9yKGlkLCBwYXJhbXMsIGJvZHksIGdlbmVyYXRvcikge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGdlbmVyYXRvciA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRnZW5lcmF0b3IgPSBmYWxzZVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5pZCA9IGlkXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PFBhdHRlcm4+fSAqL1xuXHRcdFx0dGhpcy5wYXJhbXMgPSBwYXJhbXNcblx0XHRcdC8qKiBAdHlwZSB7QmxvY2tTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLmdlbmVyYXRvciA9IGdlbmVyYXRvclxuXHRcdH1cblx0fVxuXG5cdC8vIFRPRE86IERlY2xhcmF0aW9uIHRvb1xuXHQvKioge0BsaW5rIEZ1bmN0aW9ufSBpbiBkZWNsYXJhdGlvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIEZ1bmN0aW9uRGVjbGFyYXRpb24gZXh0ZW5kcyBGdW5jdGlvbk5vbkFycm93IHsgfVxuXG4vLyBFeHByZXNzaW9uc1xuXHRleHBvcnQgY2xhc3MgTGl0ZXJhbCBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKHZhbHVlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge3N0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgbnVtYmVyIHwgUmVnRXhwfSAqL1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0fVxuXG5cdFx0dG9KU09OKCkge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlIGluc3RhbmNlb2YgUmVnRXhwID9cblx0XHRcdFx0e3BhdHRlcm46IHRoaXMudmFsdWUuc291cmNlLCBmbGFnczogdGhpcy52YWx1ZS5mbGFnc30gOlxuXHRcdFx0XHR0aGlzLnZhbHVlXG5cdFx0XHRyZXR1cm4ge3R5cGU6ICdMaXRlcmFsJywgdmFsdWV9XG5cdFx0fVxuXHR9XG5cblx0Ly8gVE9ETzpFUzYga2lsbFxuXHRpZiAoUmVnRXhwLnByb3RvdHlwZS5mbGFncyA9PT0gdW5kZWZpbmVkKVxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWV4dGVuZC1uYXRpdmUgKi9cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnRXhwLnByb3RvdHlwZSwgJ2ZsYWdzJywge1xuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy50b1N0cmluZygpLm1hdGNoKC9bZ2lteV0qJC8pWzBdXG5cdFx0XHR9XG5cdFx0fSlcblxuXHQvKiogVGhlIGB0aGlzYCBrZXl3b3JkLiAqL1xuXHRleHBvcnQgY2xhc3MgVGhpc0V4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHsgfVxuXG5cdC8qKiBgWyBlbGVtZW50cyBdYCAqL1xuXHRleHBvcnQgY2xhc3MgQXJyYXlFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoZWxlbWVudHMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8P0V4cHJlc3Npb24+fSAqL1xuXHRcdFx0dGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBQcm9wZXJ0eX0uICovXG5cdGV4cG9ydCBjb25zdCBQcm9wZXJ0eUtpbmQgPSBuZXcgU2V0KFsnaW5pdCcsICdnZXQnLCAnc2V0J10pXG5cdC8qKiBQYXJ0IG9mIGFuIE9iamVjdEV4cHJlc3Npb24uICovXG5cdGV4cG9ydCBjbGFzcyBQcm9wZXJ0eSBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGtpbmQsIGtleSxcblx0XHRcdHZhbHVlID0ga2V5LCBjb21wdXRlZCA9ICEoa2V5IGluc3RhbmNlb2YgSWRlbnRpZmllciksIG1ldGhvZCA9IGZhbHNlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1Byb3BlcnR5S2luZH0gKi9cblx0XHRcdHRoaXMua2luZCA9IGtpbmRcblx0XHRcdC8qKiBAdHlwZSB7TGl0ZXJhbCB8IElkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmtleSA9IGtleVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLmNvbXB1dGVkID0gY29tcHV0ZWRcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMubWV0aG9kID0gbWV0aG9kXG5cblx0XHRcdGlmICh0aGlzLmtpbmQgIT09ICdpbml0Jykge1xuXHRcdFx0XHRpZiAoISh0aGlzLnZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb25FeHByZXNzaW9uKSlcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldC9zZXQgUHJvcGVydHlcXCdzIHZhbHVlIG11c3QgYmUgYSBGdW5jdGlvbkV4cHJlc3Npb24uJylcblx0XHRcdFx0aWYgKHRoaXMudmFsdWUuaWQgIT09IG51bGwpXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0J2dldC9zZXQgUHJvcGVydHlcXCdzIHZhbHVlIG11c3Qgbm90IGhhdmUgaWQ7ICcgK1xuXHRcdFx0XHRcdFx0J3RoYXQgaXMgc3RvcmVkIGluIHRoZSBga2V5YCBvZiB0aGUgUHJvcGVydHkuJylcblx0XHRcdFx0aWYgKHRoaXMudmFsdWUuZ2VuZXJhdG9yKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0L3NldCBjYW4gbm90IGJlIGEgZ2VuZXJhdG9yLicpXG5cdFx0XHRcdGlmICh0aGlzLm1ldGhvZClcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldC9zZXQgY2FuIG5vdCBoYXZlIG1ldGhvZDogdHJ1ZS4nKVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm1ldGhvZCAmJiAhKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbkV4cHJlc3Npb24pKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ21ldGhvZCBQcm9wZXJ0eVxcJ3MgdmFsdWUgbXVzdCBiZSBhIEZ1bmN0aW9uRXhwcmVzc2lvbi4nKVxuXHRcdH1cblxuXHRcdGdldCBzaG9ydGhhbmQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZSA9PT0gdGhpcy5rZXlcblx0XHR9XG5cdH1cblxuXHQvKiogQW4gb2JqZWN0IGxpdGVyYWwuICovXG5cdGV4cG9ydCBjbGFzcyBPYmplY3RFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IocHJvcGVydGllcykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxQcm9wZXJ0eT59ICovXG5cdFx0XHR0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzXG5cdFx0fVxuXHR9XG5cblx0Ly8gVE9ETzogRXhwcmVzc2lvbiB0b29cblx0LyoqIHtAbGluayBGdW5jdGlvbn0gaW4gZXhwcmVzc2lvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIEZ1bmN0aW9uRXhwcmVzc2lvbiBleHRlbmRzIEZ1bmN0aW9uTm9uQXJyb3cgeyB9XG5cblx0LyoqIExpa2UgRnVuY3Rpb25FeHByZXNzaW9uIGJ1dCB1c2VzIHRoZSBgcGFyYW1zID0+IGJvZHlgIGZvcm0uICovXG5cdC8vIFRPRE86IGV4dGVuZHMgRnVuY3Rpb25BYnN0cmFjdCB0b29cblx0ZXhwb3J0IGNsYXNzIEFycm93RnVuY3Rpb25FeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IocGFyYW1zLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PFBhdHRlcm4+fSAqL1xuXHRcdFx0dGhpcy5wYXJhbXMgPSBwYXJhbXNcblx0XHRcdC8qKiBAdHlwZSB7QmxvY2tTdGF0ZW1lbnQgfCBFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgZXhwcmVzc2lvbnNbMF0sIGV4cHJlc3Npb25zWzFdLCAuLi5gXG5cdEV4cHJlc3Npb24gY29tcG9zZWQgb2Ygb3RoZXIgZXhwcmVzc2lvbnMsIHNlcGFyYXRlZCBieSB0aGUgY29tbWEgb3BlcmF0b3IuXG5cdCpOb3QqIGZvciBwYXJhbWV0ZXIgbGlzdHMuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBTZXF1ZW5jZUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihleHByZXNzaW9ucykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxFeHByZXNzaW9uPn0gKi9cblx0XHRcdHRoaXMuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9uc1xuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgVW5hcnlFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IFVuYXJ5T3BlcmF0b3IgPSBuZXcgU2V0KFsnLScsICcrJywgJyEnLCAnficsICd0eXBlb2YnLCAndm9pZCcsICdkZWxldGUnXSlcblx0LyoqXG5cdGBvcGVyYXRvciBhcmd1bWVudGBcblx0Q2FsbHMgYSB1bmFyeSBvcGVyYXRvci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFVuYXJ5RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yLCBhcmd1bWVudCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtVbmFyeU9wZXJhdG9yfSAqL1xuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cblx0XHQvKiogQWx3YXlzIHRydWUuIE5lZWRlZCBmb3IgY29tcGFyaWJpbGl0eSB3aXRoIGVzdHJlZS4gKi9cblx0XHRnZXQgcHJlZml4KCkge1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIEJpbmFyeUV4cHJlc3Npb259LiAqL1xuXHRleHBvcnQgY29uc3QgQmluYXJ5T3BlcmF0b3IgPSBuZXcgU2V0KFtcblx0XHQnPT0nLCAnIT0nLCAnPT09JywgJyE9PScsXG5cdFx0JzwnLCAnPD0nLCAnPicsICc+PScsXG5cdFx0Jzw8JywgJz4+JywgJz4+PicsXG5cdFx0JysnLCAnLScsICcqJywgJy8nLCAnJScsXG5cdFx0J3wnLCAnXicsICcmJywgJ2luJyxcblx0XHQnaW5zdGFuY2VvZiddKVxuXHQvKipcblx0YGxlZnQgb3BlcmF0b3IgcmlnaHRgXG5cdENhbGxzIGEgYmluYXJ5IG9wZXJhdG9yLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgQmluYXJ5RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yLCBsZWZ0LCByaWdodCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtCaW5hcnlPcGVyYXRvcn0gKi9cblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBBc3NpZ25tZW50RXhwcmVzc2lvbn0uICovXG5cdGV4cG9ydCBjb25zdCBBc3NpZ25tZW50T3BlcmF0b3IgPSBuZXcgU2V0KFtcblx0XHQnPScsICcrPScsICctPScsICcqPScsICcvPScsICclPScsXG5cdFx0Jzw8PScsICc+Pj0nLCAnPj4+PScsXG5cdFx0J3w9JywgJ149JywgJyY9J1xuXHRdKVxuXHQvKipcblx0YGxlZnQgb3BlcmF0b3IgcmlnaHRgXG5cdE11dGF0ZXMgYW4gZXhpc3RpbmcgdmFyaWFibGUuXG5cdERvIG5vdCBjb25mdXNlIHdpdGggVmFyaWFibGVEZWNsYXJhdGlvbi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEFzc2lnbm1lbnRFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob3BlcmF0b3IsIGxlZnQsIHJpZ2h0KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0Fzc2lnbm1lbnRPcGVyYXRvcn0gKi9cblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0LyoqIEB0eXBlIHtQYXR0ZXJufSAqL1xuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBVcGRhdGVFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IFVwZGF0ZU9wZXJhdG9yID0gbmV3IFNldChbJysrJywgJy0tJ10pXG5cdC8qKlxuXHRgKythcmd1bWVudGAgb3IgYGFyZ3VtZW50KytgXG5cdEluY3JlbWVudHMgb3IgZGVjcmVtZW50cyBhIG51bWJlci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFVwZGF0ZUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciwgYXJndW1lbnQsIHByZWZpeCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtVcGRhdGVPcGVyYXRvcn0gKi9cblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLnByZWZpeCA9IHByZWZpeFxuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgTG9naWNhbEV4cHJlc3Npb259LiAqL1xuXHRleHBvcnQgY29uc3QgTG9naWNhbE9wZXJhdG9yID0gbmV3IFNldChbJ3x8JywgJyYmJ10pXG5cdC8qKlxuXHRgbGVmdCBvcGVyYXRvciByaWdodGBcblx0Q2FsbHMgYSBsYXp5IGxvZ2ljYWwgb3BlcmF0b3IuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBMb2dpY2FsRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yLCBsZWZ0LCByaWdodCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtMb2dpY2FsT3BlcmF0b3J9ICovXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdH1cblx0fVxuXG5cdC8qKiBgdGVzdCA/IGNvbnNlcXVlbnQgOiBhbHRlcm5hdGVgICovXG5cdGV4cG9ydCBjbGFzcyBDb25kaXRpb25hbEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3Rvcih0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuY29uc2VxdWVudCA9IGNvbnNlcXVlbnRcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYWx0ZXJuYXRlID0gYWx0ZXJuYXRlXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdGBuZXcgY2FsbGVlKGFyZ3VtZW50cylgXG5cdEp1c3QgbGlrZSB7QGxpbmsgQ2FsbEV4cHJlc3Npb259IGJ1dCB3aXRoIGBuZXdgIGluIGZyb250LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgTmV3RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKGNhbGxlZSwgX2FyZ3VtZW50cykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5jYWxsZWUgPSBjYWxsZWVcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8RXhwcmVzc2lvbj59ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50cyA9IF9hcmd1bWVudHNcblx0XHR9XG5cdH1cblxuXHQvKiogYGNhbGxlZShhcmd1bWVudHMpYCAqL1xuXHRleHBvcnQgY2xhc3MgQ2FsbEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihjYWxsZWUsIF9hcmd1bWVudHMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuY2FsbGVlID0gY2FsbGVlXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PEV4cHJlc3Npb24+fSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudHMgPSBfYXJndW1lbnRzXG5cdFx0fVxuXHR9XG5cdC8qKiBgLi4uYXJnc2AgaW4gYSBDYWxsRXhwcmVzc2lvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIFNwcmVhZEVsZW1lbnQgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdElmIGNvbXB1dGVkID09PSB0cnVlLCBgb2JqZWN0W3Byb3BlcnR5XWAuXG5cdEVsc2UsIGBvYmplY3QucHJvcGVydHlgIC0tIG1lYW5pbmcgcHJvcGVydHkgc2hvdWxkIGJlIGFuIElkZW50aWZpZXIuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBNZW1iZXJFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob2JqZWN0LCBwcm9wZXJ0eSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5vYmplY3QgPSBvYmplY3Rcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eVxuXHRcdH1cblxuXHRcdC8qKiBOZWVkZWQgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBlc3RyZWUuICovXG5cdFx0Z2V0IGNvbXB1dGVkKCkge1xuXHRcdFx0cmV0dXJuICEodGhpcy5wcm9wZXJ0eSBpbnN0YW5jZW9mIElkZW50aWZpZXIpXG5cdFx0fVxuXHR9XG5cblx0LyoqIGB5aWVsZCBhcmd1bWVudGAgb3IgYHlpZWxkKiBhcmd1bWVudGAgKi9cblx0ZXhwb3J0IGNsYXNzIFlpZWxkRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKGFyZ3VtZW50LCBkZWxlZ2F0ZSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlXG5cblx0XHRcdGlmICh0aGlzLmRlbGVnYXRlICYmIHRoaXMuYXJndW1lbnQgPT09IG51bGwpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCB5aWVsZCogd2l0aG91dCBhcmd1bWVudC4nKVxuXHRcdH1cblx0fVxuXG5cdC8vIFRlbXBsYXRlc1xuXHRcdC8qKlxuXHRcdEEgdGVtcGxhdGUgd2l0aCBubyB0YWcuXG5cdFx0SXQgYWx0ZXJuYXRlcyBiZXR3ZWVuIHF1YXNpcyBhbmQgZXhwcmVzc2lvbnMuXG5cdFx0SXQgc2hvdWxkIGJlZ2luIGFuZCBlbmQgd2l0aCBxdWFzaXMsIHVzaW5nIHtAbGluayBUZW1wbGF0ZUVsZW1lbnQuZW1wdHl9IGlmIG5lY2Vzc2FyeS5cblx0XHRUaGlzIG1lYW5zIHRoYXQgYCR7MX0kezJ9YCBoYXMgMyBlbXB0eSBxdWFzaXMhXG5cdFx0Ki9cblx0XHRleHBvcnQgY2xhc3MgVGVtcGxhdGVMaXRlcmFsIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0XHRjb25zdHJ1Y3RvcihxdWFzaXMsIGV4cHJlc3Npb25zKSB7XG5cdFx0XHRcdHN1cGVyKClcblx0XHRcdFx0LyoqIEB0eXBlIHtBcnJheTxUZW1wbGF0ZUVsZW1lbnQ+fSAqL1xuXHRcdFx0XHR0aGlzLnF1YXNpcyA9IHF1YXNpc1xuXHRcdFx0XHQvKiogQHR5cGUge0FycmF5PEV4cHJlc3Npb24+fSAqL1xuXHRcdFx0XHR0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnNcblx0XHRcdFx0aWYgKHRoaXMucXVhc2lzLmxlbmd0aCAhPT0gdGhpcy5leHByZXNzaW9ucy5sZW5ndGggKyAxKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdCdUaGVyZSBtdXN0IGJlIDEgbW9yZSBxdWFzaSB0aGFuIGV4cHJlc3Npb25zLlxcbicgK1xuXHRcdFx0XHRcdFx0J01heWJlIHlvdSBuZWVkIHRvIGFkZCBhbiBlbXB0eSBxdWFzaSB0byB0aGUgZnJvbnQgb3IgZW5kLicpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqIFBhcnQgb2YgYSBUZW1wbGF0ZUxpdGVyYWwuICovXG5cdFx0ZXhwb3J0IGNsYXNzIFRlbXBsYXRlRWxlbWVudCBleHRlbmRzIE5vZGUge1xuXHRcdFx0LyoqXG5cdFx0XHRUZW1wbGF0ZUVsZW1lbnQgd2hvc2UgcmF3IHNvdXJjZSBpcyBgc3RyYC5cblx0XHRcdEBwYXJhbSB7c3RyaW5nfSBzdHJcblx0XHRcdCovXG5cdFx0XHRzdGF0aWMgZm9yUmF3U3RyaW5nKHN0cikge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFRlbXBsYXRlRWxlbWVudChmYWxzZSwge1xuXHRcdFx0XHRcdC8vIFRPRE86IEEgd2F5IHRvIGNhbGN1bGF0ZSB0aGlzP1xuXHRcdFx0XHRcdGNvb2tlZDogbnVsbCxcblx0XHRcdFx0XHRyYXc6IHN0clxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdFRlbXBsYXRlRWxlbWVudCBldmFsdWF0aW5nIHRvIGBzdHJgLlxuXHRcdFx0VXNlcyBlc2NhcGUgc2VxdWVuY2VzIGFzIG5lY2Vzc2FyeS5cblx0XHRcdEBwYXJhbSB7c3RyaW5nfSBzdHJcblx0XHRcdCovXG5cdFx0XHRzdGF0aWMgZm9yU3RyaW5nKHN0cikge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFRlbXBsYXRlRWxlbWVudChmYWxzZSwge1xuXHRcdFx0XHRcdGNvb2tlZDogc3RyLFxuXHRcdFx0XHRcdHJhdzogZXNjYXBlU3RyaW5nRm9yVGVtcGxhdGUoc3RyKVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXG5cdFx0XHQvKiogVGVtcGxhdGVFbGVtZW50IHdpdGggZW1wdHkgdmFsdWUuICovXG5cdFx0XHRzdGF0aWMgZ2V0IGVtcHR5KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5mb3JTdHJpbmcoJycpXG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0cnVjdG9yKHRhaWwsIHZhbHVlKSB7XG5cdFx0XHRcdHN1cGVyKClcblx0XHRcdFx0LyoqXG5cdFx0XHRcdFVzZSB0aGlzIHRvIG1hcmsgdGhlIGxhc3QgVGVtcGxhdGVFbGVtZW50LlxuXHRcdFx0XHRAdHlwZSB7Ym9vbGVhbn1cblx0XHRcdFx0Ki9cblx0XHRcdFx0dGhpcy50YWlsID0gdGFpbFxuXHRcdFx0XHQvKiogQHR5cGUge3tjb29rZWQ6IHN0cmluZywgcmF3OiBzdHJpbmd9fSAqL1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdFxuXHRcdFx0ZXNjYXBlU3RyaW5nRm9yVGVtcGxhdGUgPSBzdHIgPT5cblx0XHRcdFx0c3RyLnJlcGxhY2UoL1t7XFxcXGBcXG5cXHRcXGJcXGZcXHZcXHJcXHUyMDI4XFx1MjAyOV0vZywgY2ggPT4gdGVtcGxhdGVFc2NhcGVzW2NoXSksXG5cdFx0XHR0ZW1wbGF0ZUVzY2FwZXMgPSB7XG5cdFx0XHRcdC8vIE5lZWQgdG8gbWFrZSBzdXJlIFwiJHtcIiBpcyBlc2NhcGVkLlxuXHRcdFx0XHQneyc6ICdcXFxceycsXG5cdFx0XHRcdCdgJzogJ1xcXFxgJyxcblx0XHRcdFx0J1xcXFwnOiAnXFxcXFxcXFwnLFxuXHRcdFx0XHQnXFxuJzogJ1xcXFxuJyxcblx0XHRcdFx0J1xcdCc6ICdcXFxcdCcsXG5cdFx0XHRcdCdcXGInOiAnXFxcXGInLFxuXHRcdFx0XHQnXFxmJzogJ1xcXFxmJyxcblx0XHRcdFx0J1xcdic6ICdcXFxcdicsXG5cdFx0XHRcdCdcXHInOiAnXFxcXHInLFxuXHRcdFx0XHQnXFx1MjAyOCc6ICdcXFxcdTIwMjgnLFxuXHRcdFx0XHQnXFx1MjAyOSc6ICdcXFxcdTIwMjknXG5cdFx0XHR9XG5cblx0XHQvKiogVGVtcGxhdGVMaXRlcmFsIHdpdGggYSB0YWcgaW4gZnJvbnQsIGxpa2VgdGhpc2AuICovXG5cdFx0ZXhwb3J0IGNsYXNzIFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdFx0Y29uc3RydWN0b3IodGFnLCBxdWFzaSkge1xuXHRcdFx0XHRzdXBlcigpXG5cdFx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdFx0dGhpcy50YWcgPSB0YWdcblx0XHRcdFx0LyoqIEB0eXBlIHtUZW1wbGF0ZUxpdGVyYWx9ICovXG5cdFx0XHRcdHRoaXMucXVhc2kgPSBxdWFzaVxuXHRcdFx0fVxuXHRcdH1cblxuLy8gUGF0dGVybnNcblx0LyoqXG5cdGB7IGEsIGI6IGMgfSA9YFxuXHRPYmplY3QgZGVjb25zdHJ1Y3RpbmcgcGF0dGVybi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIE9iamVjdFBhdHRlcm4gZXh0ZW5kcyBQYXR0ZXJuIHtcblx0XHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PEFzc2lnbm1lbnRQcm9wZXJ0eT59ICovXG5cdFx0XHR0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdEp1c3QgbGlrZSBhIFByb3BlcnR5LCBidXQga2luZCBpcyBhbHdheXMgYGluaXRgLlxuXHRBbHRob3VnaCB0ZWNobmljYWxseSBpdHMgb3duIHR5cGUsIGBfLnR5cGVgIHdpbGwgYmUgJ1Byb3BlcnR5Jy5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEFzc2lnbm1lbnRQcm9wZXJ0eSBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGtleSwgdmFsdWUpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHR2YWx1ZSA9IGtleVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5rZXkgPSBrZXlcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZVxuXHRcdH1cblxuXHRcdGdldCB0eXBlKCkge1xuXHRcdFx0cmV0dXJuICdQcm9wZXJ0eSdcblx0XHR9XG5cdFx0Z2V0IGtpbmQoKSB7XG5cdFx0XHRyZXR1cm4gJ2luaXQnXG5cdFx0fVxuXHRcdGdldCBtZXRob2QoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdFx0Z2V0IHNob3J0aGFuZCgpIHtcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlID09PSB0aGlzLmtleVxuXHRcdH1cblx0XHRnZXQgY29tcHV0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gISh0aGlzLmtleSBpbnN0YW5jZW9mIElkZW50aWZpZXIpXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdGBbIGEsIGIgXSA9IC4uLmAuXG5cdEFycmF5IGRlY29uc3RydWN0aW5nIHBhdHRlcm4uXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBBcnJheVBhdHRlcm4gZXh0ZW5kcyBQYXR0ZXJuIHtcblx0XHRjb25zdHJ1Y3RvcihlbGVtZW50cykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTw/UGF0dGVybj59ICovXG5cdFx0XHR0aGlzLmVsZW1lbnRzID0gZWxlbWVudHNcblx0XHR9XG5cdH1cblxuXHQvKipcblx0Q2FuIGJlIHRoZSBsYXN0IGFyZ3VtZW50IHRvIGEgRnVuY3Rpb25FeHByZXNzaW9uL0Z1bmN0aW9uRGVjbGFyYXRpb25cblx0b3IgIGdvIGF0IHRoZSBlbmQgb2YgYW4gQXJyYXlQYXR0ZXJuLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgUmVzdEVsZW1lbnQgZXh0ZW5kcyBQYXR0ZXJuIHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtQYXR0ZXJufSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0fVxuXHR9XG5cbi8vIENsYXNzZXNcblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBNZXRob2REZWZpbml0aW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IE1ldGhvZERlZmluaXRpb25LaW5kID0gbmV3IFNldChbJ2NvbnN0cnVjdG9yJywgJ21ldGhvZCcsICdnZXQnLCAnc2V0J10pXG5cdC8qKiBQYXJ0IG9mIGEge0BsaW5rIENsYXNzQm9keX0uICovXG5cdGV4cG9ydCBjbGFzcyBNZXRob2REZWZpbml0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0LyoqIEBwYXJhbSB7RnVuY3Rpb25FeHByZXNzaW9ufSB2YWx1ZSAqL1xuXHRcdHN0YXRpYyBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIG5ldyBNZXRob2REZWZpbml0aW9uKG5ldyBJZGVudGlmaWVyKCdjb25zdHJ1Y3RvcicpLCB2YWx1ZSwgJ2NvbnN0cnVjdG9yJylcblx0XHR9XG5cblx0XHRjb25zdHJ1Y3RvcihrZXksIHZhbHVlLCBraW5kLCBfc3RhdGljLCBjb21wdXRlZCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKF9zdGF0aWMgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0X3N0YXRpYyA9IGZhbHNlXG5cdFx0XHRpZiAoY29tcHV0ZWQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Y29tcHV0ZWQgPSBmYWxzZVxuXHRcdFx0aWYgKGtpbmQgPT09ICdjb25zdHJ1Y3RvcicgJiYgIShcblx0XHRcdFx0a2V5IGluc3RhbmNlb2YgSWRlbnRpZmllciAmJiBrZXkubmFtZSA9PT0gJ2NvbnN0cnVjdG9yJyAmJiAhX3N0YXRpYyAmJiAhY29tcHV0ZWQpKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0J0NvbnN0cnVjdG9yIG1ldGhvZCBzaG91bGQgY3JlYXRlZCB3aXRoIGBNZXRob2REZWZpbml0aW9uLmNvbnN0cnVjdG9yYC4nKVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyIHwgTGl0ZXJhbH0gKi9cblx0XHRcdHRoaXMua2V5ID0ga2V5XG5cdFx0XHQvKiogQHR5cGUge0Z1bmN0aW9uRXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZVxuXHRcdFx0LyoqIEB0eXBlIHtNZXRob2REZWZpbml0aW9uS2luZH0gKi9cblx0XHRcdHRoaXMua2luZCA9IGtpbmRcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMuc3RhdGljID0gX3N0YXRpY1xuXHRcdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdFx0dGhpcy5jb21wdXRlZCA9IGNvbXB1dGVkXG5cblx0XHRcdGlmICh2YWx1ZS5pZCAhPT0gbnVsbClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdCdNZXRob2REZWZpbml0aW9uIHZhbHVlIHNob3VsZCBub3QgaGF2ZSBpZDsgdGhhdCBpcyBoYW5kbGVkIGJ5IGBrZXlgLicpXG5cdFx0fVxuXHR9XG5cblx0LyoqIENvbnRlbnRzIG9mIGEge0BsaW5rIENsYXNzfS4gKi9cblx0ZXhwb3J0IGNsYXNzIENsYXNzQm9keSBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8TWV0aG9kRGVmaW5pdGlvbj59ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIHtAbGluayBDbGFzc0RlY2xhcmF0aW9ufSB8IHtAbGluayBDbGFzc0V4cHJlc3Npb259ICovXG5cdGV4cG9ydCBjbGFzcyBDbGFzcyBleHRlbmRzIE5vZGUgeyB9XG5cblx0Ly8gVE9ETzogZXh0ZW5kcyBEZWNsYXJhdGlvbiB0b29cblx0LyoqIHtAbGluayBDbGFzc30gaW4gZGVjbGFyYXRpb24gcG9zaXRpb24uICovXG5cdGV4cG9ydCBjbGFzcyBDbGFzc0RlY2xhcmF0aW9uIGV4dGVuZHMgQ2xhc3Mge1xuXHRcdGNvbnN0cnVjdG9yKGlkLCBzdXBlckNsYXNzLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnN1cGVyQ2xhc3MgPSBzdXBlckNsYXNzXG5cdFx0XHQvKiogQHR5cGUge0NsYXNzQm9keX0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKioge0BsaW5rIENsYXNzfSBpbiBleHByZXNzaW9uIHBvc2l0aW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgQ2xhc3NFeHByZXNzaW9uIGV4dGVuZHMgQ2xhc3Mge1xuXHRcdGNvbnN0cnVjdG9yKGlkLCBzdXBlckNsYXNzLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez9JZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5pZCA9IGlkXG5cdFx0XHQvKiogQHR5cGUgez9FeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5zdXBlckNsYXNzID0gc3VwZXJDbGFzc1xuXHRcdFx0LyoqIEB0eXBlIHtDbGFzc0JvZHl9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cbi8vIE1vZHVsZXNcblx0LyoqIEEgc3BlY2lmaWVyIGluIGFuIGltcG9ydCBvciBleHBvcnQgZGVjbGFyYXRpb24uICovXG5cdGV4cG9ydCBjbGFzcyBNb2R1bGVTcGVjaWZpZXIgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHR7QGxpbmsgSW1wb3J0U3BlY2lmaWVyfSB8IHtAbGluayBJbXBvcnREZWZhdWx0U3BlY2lmaWVyfSB8IHtAbGluayBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXJ9XG5cdCovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqXG5cdGBpbXBvcnQgc3BlY2lmaWVycyBmcm9tIHNvdXJjZWBcblx0T25seSBvbmUgc3BlY2lmaWVyIG1heSBiZSBhIEltcG9ydERlZmF1bHRTcGVjaWZpZXIuXG5cdElmIHRoZXJlIGlzIGFuIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllciwgaXQgbXVzdCBiZSB0aGUgb25seSBzcGVjaWZpZXIuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnREZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKHNwZWNpZmllcnMsIHNvdXJjZSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdD59ICovXG5cdFx0XHR0aGlzLnNwZWNpZmllcnMgPSBzcGVjaWZpZXJzXG5cdFx0XHQvKiogQHR5cGUge0xpdGVyYWw8c3RyaW5nPn0gKi9cblx0XHRcdHRoaXMuc291cmNlID0gc291cmNlXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdEEgbm9uLWRlZmF1bHQgaW1wb3J0LiBVc2VkIGluIGFuIEltcG9ydERlY2xhcmF0aW9uLlxuXHRGb3IgYGltcG9ydCB7IGEgfSBmcm9tIFwic291cmNlXCJgLCBqdXN0IHBhc3Mgb25lIGFyZ3VtZW50IGFuZCBsb2NhbCB3aWxsID0gaW1wb3J0ZWQuXG5cdEZvciBgaW1wb3J0IHsgYSBhcyBiIH0gZnJvbSBcInNvdXJjZVwiYCwgbWFrZSBpbXBvcnRlZCBgYWAgYW5kIGxvY2FsIGBiYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydFNwZWNpZmllciBleHRlbmRzIE1vZHVsZVNwZWNpZmllciB7XG5cdFx0Y29uc3RydWN0b3IoaW1wb3J0ZWQsIGxvY2FsKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAobG9jYWwgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0bG9jYWwgPSBpbXBvcnRlZFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5pbXBvcnRlZCA9IGltcG9ydGVkXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKiogVGhlIGRlZmF1bHQgZXhwb3J0LCBhcyBpbiBgaW1wb3J0IGEgZnJvbSBcInNvdXJjZVwiYC4gKi9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydERlZmF1bHRTcGVjaWZpZXIgZXh0ZW5kcyBJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCB7XG5cdFx0Y29uc3RydWN0b3IobG9jYWwpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubG9jYWwgPSBsb2NhbFxuXHRcdH1cblx0fVxuXG5cdC8qKiBPYmplY3Qgb2YgZXZlcnkgZXhwb3J0LCBhcyBpbiBgaW1wb3J0ICogYXMgYSBmcm9tIFwic291cmNlXCJgLiAqL1xuXHRleHBvcnQgY2xhc3MgSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyIGV4dGVuZHMgSW1wb3J0U3BlY2lmaWVyQWJzdHJhY3Qge1xuXHRcdGNvbnN0cnVjdG9yKGxvY2FsKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0QSBub24tZGVmYXVsdCBleHBvcnQuIFVzZWQgaW4gYW4gRXhwb3J0TmFtZWREZWNsYXJhdGlvbi5cblx0Rm9yIGBleHBvcnQgeyBhIH0gZnJvbSBcInNvdXJjZVwiYCwganVzdCBwYXNzIG9uZSBhcmd1bWVudCBsb2NhbCB3aWxsID0gZXhwb3J0ZWQuXG5cdEZvciBgZXhwb3J0IHsgYSBhcyBiIH1gLCBtYWtlIGV4cG9ydGVkIGBiYCBhbmQgbG9jYWwgYGFgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRXhwb3J0U3BlY2lmaWVyIGV4dGVuZHMgTW9kdWxlU3BlY2lmaWVyIHtcblx0XHRjb25zdHJ1Y3RvcihleHBvcnRlZCwgbG9jYWwpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChsb2NhbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRsb2NhbCA9IGV4cG9ydGVkXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmV4cG9ydGVkID0gZXhwb3J0ZWRcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubG9jYWwgPSBsb2NhbFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRFeHBvcnRzIG11bHRpcGxlIHZhbHVlcyBhcyBpbiBgZXhwb3J0IHsgYSwgYiBhcyBjIH1gLlxuXHRJZiBzb3VyY2UgIT09IG51bGwsXG5cdHJlLWV4cG9ydHMgZnJvbSB0aGF0IG1vZHVsZSBhcyBpbiBgZXhwb3J0IHsgLi4uIH0gZnJvbSBcInNvdXJjZVwiYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihkZWNsYXJhdGlvbiwgc3BlY2lmaWVycywgc291cmNlKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRcdGlmIChzcGVjaWZpZXJzID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdHNwZWNpZmllcnMgPSBbXVxuXHRcdFx0aWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRzb3VyY2UgPSBudWxsXG5cblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0RlY2xhcmF0aW9ufSAqL1xuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbiA9IGRlY2xhcmF0aW9uXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PEV4cG9ydFNwZWNpZmllcj59ICovXG5cdFx0XHR0aGlzLnNwZWNpZmllcnMgPSBzcGVjaWZpZXJzXG5cdFx0XHQvKiogQHR5cGUgez9MaXRlcmFsPHN0cmluZz59ICovXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXG5cdFx0XHRpZiAoZGVjbGFyYXRpb24gIT09IG51bGwgJiYgIShzcGVjaWZpZXJzLmxlbmd0aCA9PT0gMCAmJiBzb3VyY2UgPT09IG51bGwpKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0RlY2xhcmF0aW9uIGNhbiBub3QgYmUgY29tYmluZWQgd2l0aCBzcGVjaWZpZXJzL3NvdXJjZS4nKVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZXhwb3J0IGRlZmF1bHQgZGVjbGFyYXRpb25gICovXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihkZWNsYXJhdGlvbikge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtEZWNsYXJhdGlvbiB8IEV4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmRlY2xhcmF0aW9uID0gZGVjbGFyYXRpb25cblx0XHR9XG5cdH1cblxuXHQvKiogYGV4cG9ydCAqIGZyb20gc291cmNlYCAqL1xuXHRleHBvcnQgY2xhc3MgRXhwb3J0QWxsRGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7TGl0ZXJhbDxzdHJpbmc+fSAqL1xuXHRcdFx0dGhpcy5zb3VyY2UgPSBzb3VyY2Vcblx0XHR9XG5cdH1cbiJdfQ==