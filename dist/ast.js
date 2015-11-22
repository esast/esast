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
			Object.keys(this).sort().forEach(key => {
				obj[key] = this[key];
			});
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

	}

	exports.Literal = Literal;

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
//# sourceMappingURL=data:application/json;base64,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LGdCQUFnQixHQUFoQixnQkFBZ0I7O09BbUNoQixTQUFTOzs7Ozs7OztTQUFULFNBQVMsR0FBVCxTQUFTOztPQVNULEtBQUs7O1NBQUwsS0FBSyxHQUFMLEtBQUs7O09BSUwsZ0JBQWdCOzs7Ozs7Ozs7O1NBQWhCLGdCQUFnQixHQUFoQixnQkFBZ0I7O09BYWhCLGVBQWU7Ozs7Ozs7Ozs7U0FBZixlQUFlLEdBQWYsZUFBZTs7T0FjZixlQUFlOztTQUFmLGVBQWUsR0FBZixlQUFlOztPQUtmLHVCQUF1Qjs7U0FBdkIsdUJBQXVCLEdBQXZCLHVCQUF1Qjs7T0FPdkIsaUJBQWlCOzs7Ozs7Ozs7U0FBakIsaUJBQWlCLEdBQWpCLGlCQUFpQjs7T0FlakIsZUFBZTs7Ozs7Ozs7OztTQUFmLGVBQWUsR0FBZixlQUFlOztPQWNmLHNCQUFzQjs7Ozs7Ozs7U0FBdEIsc0JBQXNCLEdBQXRCLHNCQUFzQjs7T0FTdEIsd0JBQXdCOzs7Ozs7OztTQUF4Qix3QkFBd0IsR0FBeEIsd0JBQXdCOztPQWF4QixlQUFlOzs7Ozs7Ozs7O1NBQWYsZUFBZSxHQUFmLGVBQWU7O09Ba0JmLHNCQUFzQjs7Ozs7Ozs7Ozs7OztTQUF0QixzQkFBc0IsR0FBdEIsc0JBQXNCOztPQXNCdEIsd0JBQXdCOzs7Ozs7OztTQUF4Qix3QkFBd0IsR0FBeEIsd0JBQXdCOztPQVN4QixvQkFBb0I7Ozs7Ozs7O1NBQXBCLG9CQUFvQixHQUFwQixvQkFBb0IiLCJmaWxlIjoiYXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW5kZW50ICovXG5cbi8qKiBCYXNlIHR5cGUgb2YgYWxsIEFTVHMuICovXG5leHBvcnQgY2xhc3MgTm9kZSB7XG5cdC8qKlxuXHRDb252ZXJ0IHRvIEpTT04uXG5cdEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzdHJlZS9lc3RyZWVcblx0Ki9cblx0dG9KU09OKCkge1xuXHRcdGNvbnN0IG9iaiA9IHsgfVxuXHRcdG9iai50eXBlID0gdGhpcy50eXBlXG5cdFx0Ly8gU29ydCB0byBtYWtlIEpTT04gcmVuZGVyaW5nIGRldGVybWluaXN0aWMuXG5cdFx0T2JqZWN0LmtleXModGhpcykuc29ydCgpLmZvckVhY2goa2V5ID0+IHsgb2JqW2tleV0gPSB0aGlzW2tleV0gfSlcblx0XHRyZXR1cm4gb2JqXG5cdH1cblxuXHQvKipcblx0Rm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvdGhlciBBU1QgcmVwcmVzZW50YXRpb25zLFxuXHRhbGwgTm9kZSBpbnN0YW5jZXMgaGF2ZSBhICd0eXBlJyBwcm9wZXJ0eSB0aGF0IGlzIHRoZSBuYW1lIG9mIHRoYXQgdHlwZS5cblx0QHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXN0cmVlL2VzdHJlZVxuXHQqL1xuXHRnZXQgdHlwZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG5cdH1cblxuXHQvKiogQG92ZXJyaWRlICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKVxuXHR9XG59XG5cbi8vIEFic3RyYWN0c1xuXHQvKiogTGluZSB0aGF0IGRlY2xhcmVzIG5ldyBsb2NhbHMuICovXG5cdGV4cG9ydCBjbGFzcyBEZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqIEJsb2NrcyBvZiBjb2RlIGhhdmUgbGluZXMgdGhhdCBhcmUgU3RhdGVtZW50cyBvciBEZWNsYXJhdGlvbnMuICovXG5cdGV4cG9ydCBjbGFzcyBTdGF0ZW1lbnQgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHRDb2RlIHRoYXQgaGFzIGEgdmFsdWUuXG5cdFRvIHVzZSBvbmUgaW4gYSBzdGF0ZW1lbnQgcG9zaXRpb24sIHNlZSBFeHByZXNzaW9uU3RhdGVtZW50LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqXG5cdENhbiBnbyBpbiBhIHBhcmFtZXRlciBsaXN0IG9yIG9uIHRoZSBsZWZ0IHNpZGUgb2YgYW4gYXNzaWdubWVudC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFBhdHRlcm4gZXh0ZW5kcyBOb2RlIHsgfVxuXG4vLyBBIGNvbXBsZXRlIHByb2dyYW0gc291cmNlIHRyZWUuXG5leHBvcnQgY2xhc3MgUHJvZ3JhbSBleHRlbmRzIE5vZGUge1xuXHRjb25zdHJ1Y3Rvcihib2R5KSB7XG5cdFx0c3VwZXIoKVxuXHRcdC8qKiBAdHlwZSB7QXJyYXk8U3RhdGVtZW50Pn0gKi9cblx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdH1cbn1cblxuLy8gVmFyaWFibGVzXG5cdC8qKlxuXHRBIEphdmFTY3JpcHQgaWRlbnRpZmllci5cblxuXHRJdCBpcyBhc3N1bWVkIHRoYXQgeW91IGhhdmUgY2FsbGVkIGBtYW5nbGVJZGVudGlmaWVyYCBhcyBhcHByb3ByaWF0ZS5cblx0U2VlIGFsc28ge0BsaW5rIGlkZW50aWZpZXJ9LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgSWRlbnRpZmllciBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG5hbWUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuXHRcdFx0dGhpcy5uYW1lID0gbmFtZVxuXHRcdH1cblx0fVxuXG5cdC8qKiBTaW5nbGUgZGVjbGFyYXRpb24gd2l0aGluIGEge0BsaW5rIFZhcmlhYmxlRGVjbGFyYXRpb259LiAqL1xuXHRleHBvcnQgY2xhc3MgVmFyaWFibGVEZWNsYXJhdG9yIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoaWQsIGluaXQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChpbml0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGluaXQgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1BhdHRlcm59ICovXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmluaXQgPSBpbml0XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBWYXJpYWJsZURlY2xhcmF0aW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IFZhcmlhYmxlRGVjbGFyYXRpb25LaW5kID0gbmV3IFNldChbJ2NvbnN0JywgJ2xldCcsICd2YXInXSlcblx0LyoqXG5cdERlY2xhcmVzIGFuZCBvcHRpb25hbGx5IGluaXRpYWxpemVzIG1hbnkgdmFyaWFibGVzLlxuXHRNdXN0IGJlIGF0IGxlYXN0IG9uZSBkZWNsYXJhdGlvbi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFZhcmlhYmxlRGVjbGFyYXRpb24gZXh0ZW5kcyBEZWNsYXJhdGlvbiB7XG5cdFx0Y29uc3RydWN0b3Ioa2luZCwgZGVjbGFyYXRpb25zKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1ZhcmlhYmxlRGVjbGFyYXRpb25LaW5kfSAqL1xuXHRcdFx0dGhpcy5raW5kID0ga2luZFxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxWYXJpYWJsZURlY2xhcmF0b3I+fSAqL1xuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbnMgPSBkZWNsYXJhdGlvbnNcblx0XHRcdGlmICh0aGlzLmRlY2xhcmF0aW9ucy5sZW5ndGggPT09IDApXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignVmFyaWFibGVEZWNsYXJhdGlvbiBtdXN0IGhhdmUgYXQgbGVhc3QgMSBkZWNsYXJhdGlvbi4nKVxuXHRcdH1cblx0fVxuXG5cbi8vIFN0YXRlbWVudHNcblx0LyoqXG5cdEFuIGVtcHR5IHN0YXRlbWVudCwgaS5lLiwgYSBzb2xpdGFyeSBzZW1pY29sb24uXG5cdE5vdCB1c2VmdWwgZm9yIGNvZGUgZ2VuZXJhdGlvbiwgYnV0IHNvbWUgcGFyc2VycyB3aWxsIHJldHVybiB0aGVzZS5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEVtcHR5U3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHsgfVxuXG5cdC8qKiBBIGJsb2NrIHN0YXRlbWVudCwgaS5lLiwgYSBzZXF1ZW5jZSBvZiBzdGF0ZW1lbnRzIHN1cnJvdW5kZWQgYnkgYnJhY2VzLiAqL1xuXHRleHBvcnQgY2xhc3MgQmxvY2tTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8U3RhdGVtZW50Pn0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKipcblx0QW4gZXhwcmVzc2lvbiBzdGF0ZW1lbnQsIGkuZS4sIGEgc3RhdGVtZW50IGNvbnNpc3Rpbmcgb2YgYSBzaW5nbGUgZXhwcmVzc2lvbi5cblx0U2VlIGBlc2FzdC51dGlsIHRvU3RhdGVtZW50IHRvU3RhdGVtZW50c2AuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBFeHByZXNzaW9uU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihleHByZXNzaW9uKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFuIGlmIChvciBpZiAuLi4gZWxzZSkgc3RhdGVtZW50LiAqL1xuXHRleHBvcnQgY2xhc3MgSWZTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJndW1lbnRzXG5cdFx0XHRpZiAoYWx0ZXJuYXRlID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGFsdGVybmF0ZSA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5jb25zZXF1ZW50ID0gY29uc2VxdWVudFxuXHRcdFx0LyoqIEB0eXBlIHs/U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5hbHRlcm5hdGUgPSBhbHRlcm5hdGVcblx0XHR9XG5cdH1cblxuXHQvKiogQSBzdGF0ZW1lbnQgcHJlZml4ZWQgYnkgYSBsYWJlbC4gKi9cblx0ZXhwb3J0IGNsYXNzIExhYmVsZWRTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGxhYmVsLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxhYmVsID0gbGFiZWxcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdGV4cG9ydCBjbGFzcyBCcmVha1N0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0LyoqIFRoZSBgYnJlYWtgIGtleXdvcmQuICovXG5cdFx0Y29uc3RydWN0b3IobGFiZWwpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChsYWJlbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRsYWJlbCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxhYmVsID0gbGFiZWxcblx0XHR9XG5cdH1cblxuXHQvKiogVGhlIGBjb250aW51ZWAga2V5d29yZC4gKi9cblx0ZXhwb3J0IGNsYXNzIENvbnRpbnVlU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihsYWJlbCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxhYmVsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxhYmVsID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubGFiZWwgPSBsYWJlbFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgc3dpdGNoIChkaXNjcmltaW5hbnQpIHsgY2FzZXMgfWBcblx0T25seSB0aGUgbGFzdCBlbnRyeSBvZiBgY2FzZXNgIGlzIGFsbG93ZWQgdG8gYmUgYGRlZmF1bHRgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgU3dpdGNoU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihkaXNjcmltaW5hbnQsIGNhc2VzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmRpc2NyaW1pbmFudCA9IGRpc2NyaW1pbmFudFxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxTd2l0Y2hDYXNlPn0gKi9cblx0XHRcdHRoaXMuY2FzZXMgPSBjYXNlc1xuXHRcdH1cblx0fVxuXHQvKipcblx0QSBzaW5nbGUgYGNhc2VgIHdpdGhpbiBhIFN3aXRjaFN0YXRlbWVudC5cblx0SWYgYHRlc3RgIGlzIGBudWxsYCwgdGhpcyBpcyB0aGUgYGRlZmF1bHRgIGNhc2UuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBTd2l0Y2hDYXNlIGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcih0ZXN0LCBjb25zZXF1ZW50KSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAodGVzdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHR0ZXN0ID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8U3RhdGVtZW50PiAqL1xuXHRcdFx0dGhpcy5jb25zZXF1ZW50ID0gY29uc2VxdWVudFxuXHRcdH1cblx0fVxuXG5cdC8qKiBUaGUgYHJldHVybmAga2V5d29yZCwgb3B0aW9uYWxseSBmb2xsb3dlZCBieSBhbiBFeHByZXNzaW9uIHRvIHJldHVybi4gKi9cblx0ZXhwb3J0IGNsYXNzIFJldHVyblN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChhcmd1bWVudCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRhcmd1bWVudCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cdH1cblxuXHQvKipcblx0VGhlIGB0aHJvd2Aga2V5d29yZCwgYW5kIHNvbWV0aGluZyB0byB0aHJvdy5cblx0U2VlIGBlc2FzdC51dGlsIHRocm93RXJyb3JgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgVGhyb3dTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YHRyeSB7IGJsb2NrIH0gY2F0Y2ggKGhhbmRsZXIucGFyYW0pIHsgaGFuZGxlci5ib2R5IH0gZmluYWxseSB7IGZpbmFsaXplciB9YFxuXHRBdCBsZWFzdCBvbmUgb2YgYGhhbmRsZXJgIG9yIGBmaW5hbGl6ZXJgIG11c3QgYmUgbm9uLW51bGwuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBUcnlTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGJsb2NrLCBoYW5kbGVyLCBmaW5hbGl6ZXIpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGhhbmRsZXIgPSBudWxsXG5cdFx0XHRpZiAoZmluYWxpemVyID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGZpbmFsaXplciA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QmxvY2tTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJsb2NrID0gYmxvY2tcblx0XHRcdC8qKiBAdHlwZSB7P0NhdGNoQ2xhdXNlfSAqL1xuXHRcdFx0dGhpcy5oYW5kbGVyID0gaGFuZGxlclxuXHRcdFx0LyoqIEB0eXBlIHs/QmxvY2tTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmZpbmFsaXplciA9IGZpbmFsaXplclxuXHRcdH1cblx0fVxuXHQvKiogTXVzdCBiZSAqcGFydCogb2YgYSB7QGxpbmsgVHJ5U3RhdGVtZW50fSAtLSBkb2VzICpub3QqIGZvbGxvdyBpdC4gKi9cblx0ZXhwb3J0IGNsYXNzIENhdGNoQ2xhdXNlIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IocGFyYW0sIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMucGFyYW0gPSBwYXJhbVxuXHRcdFx0LyoqIEB0eXBlIHtCbG9ja1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKiogYHdoaWxlICh0ZXN0KSBib2R5YCAqL1xuXHRleHBvcnQgY2xhc3MgV2hpbGVTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKHRlc3QsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZG8gYm9keSB3aGlsZSAodGVzdClgICovXG5cdGV4cG9ydCBjbGFzcyBEb1doaWxlU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihib2R5LCB0ZXN0KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YGZvciAoaW5pdDsgdGVzdDsgdXBkYXRlKSBib2R5YFxuXHROb3QgdG8gYmUgY29uZnVzZWQgd2l0aCBGb3JJblN0YXRlbWVudCBvciBGb3JPZlN0YXRlbWVudC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEZvclN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoaW5pdCwgdGVzdCwgdXBkYXRlLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez8oVmFyaWFibGVEZWNsYXJhdGlvbiB8IEV4cHJlc3Npb24pfSAqL1xuXHRcdFx0dGhpcy5pbml0ID0gaW5pdFxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnVwZGF0ZSA9IHVwZGF0ZVxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIGBmb3IgKGxlZnQgaW4gcmlnaHQpIGJvZHlgICovXG5cdGV4cG9ydCBjbGFzcyBGb3JJblN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IobGVmdCwgcmlnaHQsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VmFyaWFibGVEZWNsYXJhdGlvbiB8IEV4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZm9yIChsZWZ0IG9mIHJpZ2h0KSBib2R5YCAqL1xuXHRleHBvcnQgY2xhc3MgRm9yT2ZTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGxlZnQsIHJpZ2h0LCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1ZhcmlhYmxlRGVjbGFyYXRpb24gfCBFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0XHQvKiogQHR5cGUge1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKiogVGhlIGBkZWJ1Z2dlcmAga2V5d29yZC4gKi9cblx0ZXhwb3J0IGNsYXNzIERlYnVnZ2VyU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHsgfVxuXG4vLyBEZWNsYXJhdGlvbnNcblx0LyoqIEZ1bmN0aW9uRGVjbGFyYXRpb24gfCBGdW5jdGlvbkV4cHJlc3Npb24gfCBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbiAqL1xuXHRleHBvcnQgY2xhc3MgRnVuY3Rpb25BYnN0cmFjdCBleHRlbmRzIE5vZGUgeyB9XG5cblx0Y2xhc3MgRnVuY3Rpb25Ob25BcnJvdyBleHRlbmRzIEZ1bmN0aW9uQWJzdHJhY3Qge1xuXHRcdGNvbnN0cnVjdG9yKGlkLCBwYXJhbXMsIGJvZHksIGdlbmVyYXRvcikge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGdlbmVyYXRvciA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRnZW5lcmF0b3IgPSBmYWxzZVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5pZCA9IGlkXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PFBhdHRlcm4+fSAqL1xuXHRcdFx0dGhpcy5wYXJhbXMgPSBwYXJhbXNcblx0XHRcdC8qKiBAdHlwZSB7QmxvY2tTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLmdlbmVyYXRvciA9IGdlbmVyYXRvclxuXHRcdH1cblx0fVxuXG5cdC8vIFRPRE86IERlY2xhcmF0aW9uIHRvb1xuXHQvKioge0BsaW5rIEZ1bmN0aW9ufSBpbiBkZWNsYXJhdGlvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIEZ1bmN0aW9uRGVjbGFyYXRpb24gZXh0ZW5kcyBGdW5jdGlvbk5vbkFycm93IHsgfVxuXG4vLyBFeHByZXNzaW9uc1xuXHRleHBvcnQgY2xhc3MgTGl0ZXJhbCBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKHZhbHVlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge251bWJlcnxzdHJpbmd8Ym9vbGVhbnxudWxsfSAqL1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0fVxuXHR9XG5cblx0LyoqIFRoZSBgdGhpc2Aga2V5d29yZC4gKi9cblx0ZXhwb3J0IGNsYXNzIFRoaXNFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7IH1cblxuXHQvKiogYFsgZWxlbWVudHMgXWAgKi9cblx0ZXhwb3J0IGNsYXNzIEFycmF5RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKGVsZW1lbnRzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PD9FeHByZXNzaW9uPn0gKi9cblx0XHRcdHRoaXMuZWxlbWVudHMgPSBlbGVtZW50c1xuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgUHJvcGVydHl9LiAqL1xuXHRleHBvcnQgY29uc3QgUHJvcGVydHlLaW5kID0gbmV3IFNldChbJ2luaXQnLCAnZ2V0JywgJ3NldCddKVxuXHQvKiogUGFydCBvZiBhbiBPYmplY3RFeHByZXNzaW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgUHJvcGVydHkgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihraW5kLCBrZXksXG5cdFx0XHR2YWx1ZSA9IGtleSwgY29tcHV0ZWQgPSAhKGtleSBpbnN0YW5jZW9mIElkZW50aWZpZXIpLCBtZXRob2QgPSBmYWxzZSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtQcm9wZXJ0eUtpbmR9ICovXG5cdFx0XHR0aGlzLmtpbmQgPSBraW5kXG5cdFx0XHQvKiogQHR5cGUge0xpdGVyYWwgfCBJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5rZXkgPSBrZXlcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZVxuXHRcdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdFx0dGhpcy5jb21wdXRlZCA9IGNvbXB1dGVkXG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLm1ldGhvZCA9IG1ldGhvZFxuXG5cdFx0XHRpZiAodGhpcy5raW5kICE9PSAnaW5pdCcpIHtcblx0XHRcdFx0aWYgKCEodGhpcy52YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uRXhwcmVzc2lvbikpXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQvc2V0IFByb3BlcnR5XFwncyB2YWx1ZSBtdXN0IGJlIGEgRnVuY3Rpb25FeHByZXNzaW9uLicpXG5cdFx0XHRcdGlmICh0aGlzLnZhbHVlLmlkICE9PSBudWxsKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdCdnZXQvc2V0IFByb3BlcnR5XFwncyB2YWx1ZSBtdXN0IG5vdCBoYXZlIGlkOyAnICtcblx0XHRcdFx0XHRcdCd0aGF0IGlzIHN0b3JlZCBpbiB0aGUgYGtleWAgb2YgdGhlIFByb3BlcnR5LicpXG5cdFx0XHRcdGlmICh0aGlzLnZhbHVlLmdlbmVyYXRvcilcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldC9zZXQgY2FuIG5vdCBiZSBhIGdlbmVyYXRvci4nKVxuXHRcdFx0XHRpZiAodGhpcy5tZXRob2QpXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQvc2V0IGNhbiBub3QgaGF2ZSBtZXRob2Q6IHRydWUuJylcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5tZXRob2QgJiYgISh0aGlzLnZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb25FeHByZXNzaW9uKSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdtZXRob2QgUHJvcGVydHlcXCdzIHZhbHVlIG11c3QgYmUgYSBGdW5jdGlvbkV4cHJlc3Npb24uJylcblx0XHR9XG5cblx0XHRnZXQgc2hvcnRoYW5kKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWUgPT09IHRoaXMua2V5XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFuIG9iamVjdCBsaXRlcmFsLiAqL1xuXHRleHBvcnQgY2xhc3MgT2JqZWN0RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8UHJvcGVydHk+fSAqL1xuXHRcdFx0dGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllc1xuXHRcdH1cblx0fVxuXG5cdC8vIFRPRE86IEV4cHJlc3Npb24gdG9vXG5cdC8qKiB7QGxpbmsgRnVuY3Rpb259IGluIGV4cHJlc3Npb24gcG9zaXRpb24uICovXG5cdGV4cG9ydCBjbGFzcyBGdW5jdGlvbkV4cHJlc3Npb24gZXh0ZW5kcyBGdW5jdGlvbk5vbkFycm93IHsgfVxuXG5cdC8qKiBMaWtlIEZ1bmN0aW9uRXhwcmVzc2lvbiBidXQgdXNlcyB0aGUgYHBhcmFtcyA9PiBib2R5YCBmb3JtLiAqL1xuXHQvLyBUT0RPOiBleHRlbmRzIEZ1bmN0aW9uQWJzdHJhY3QgdG9vXG5cdGV4cG9ydCBjbGFzcyBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKHBhcmFtcywgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxQYXR0ZXJuPn0gKi9cblx0XHRcdHRoaXMucGFyYW1zID0gcGFyYW1zXG5cdFx0XHQvKiogQHR5cGUge0Jsb2NrU3RhdGVtZW50IHwgRXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YGV4cHJlc3Npb25zWzBdLCBleHByZXNzaW9uc1sxXSwgLi4uYFxuXHRFeHByZXNzaW9uIGNvbXBvc2VkIG9mIG90aGVyIGV4cHJlc3Npb25zLCBzZXBhcmF0ZWQgYnkgdGhlIGNvbW1hIG9wZXJhdG9yLlxuXHQqTm90KiBmb3IgcGFyYW1ldGVyIGxpc3RzLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgU2VxdWVuY2VFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoZXhwcmVzc2lvbnMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8RXhwcmVzc2lvbj59ICovXG5cdFx0XHR0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnNcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIFVuYXJ5RXhwcmVzc2lvbn0uICovXG5cdGV4cG9ydCBjb25zdCBVbmFyeU9wZXJhdG9yID0gbmV3IFNldChbJy0nLCAnKycsICchJywgJ34nLCAndHlwZW9mJywgJ3ZvaWQnLCAnZGVsZXRlJ10pXG5cdC8qKlxuXHRgb3BlcmF0b3IgYXJndW1lbnRgXG5cdENhbGxzIGEgdW5hcnkgb3BlcmF0b3IuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBVbmFyeUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciwgYXJndW1lbnQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VW5hcnlPcGVyYXRvcn0gKi9cblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0fVxuXG5cdFx0LyoqIEFsd2F5cyB0cnVlLiBOZWVkZWQgZm9yIGNvbXBhcmliaWxpdHkgd2l0aCBlc3RyZWUuICovXG5cdFx0Z2V0IHByZWZpeCgpIHtcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBCaW5hcnlFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IEJpbmFyeU9wZXJhdG9yID0gbmV3IFNldChbXG5cdFx0Jz09JywgJyE9JywgJz09PScsICchPT0nLFxuXHRcdCc8JywgJzw9JywgJz4nLCAnPj0nLFxuXHRcdCc8PCcsICc+PicsICc+Pj4nLFxuXHRcdCcrJywgJy0nLCAnKicsICcvJywgJyUnLFxuXHRcdCd8JywgJ14nLCAnJicsICdpbicsXG5cdFx0J2luc3RhbmNlb2YnXSlcblx0LyoqXG5cdGBsZWZ0IG9wZXJhdG9yIHJpZ2h0YFxuXHRDYWxscyBhIGJpbmFyeSBvcGVyYXRvci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEJpbmFyeUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciwgbGVmdCwgcmlnaHQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QmluYXJ5T3BlcmF0b3J9ICovXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgQXNzaWdubWVudEV4cHJlc3Npb259LiAqL1xuXHRleHBvcnQgY29uc3QgQXNzaWdubWVudE9wZXJhdG9yID0gbmV3IFNldChbXG5cdFx0Jz0nLCAnKz0nLCAnLT0nLCAnKj0nLCAnLz0nLCAnJT0nLFxuXHRcdCc8PD0nLCAnPj49JywgJz4+Pj0nLFxuXHRcdCd8PScsICdePScsICcmPSdcblx0XSlcblx0LyoqXG5cdGBsZWZ0IG9wZXJhdG9yIHJpZ2h0YFxuXHRNdXRhdGVzIGFuIGV4aXN0aW5nIHZhcmlhYmxlLlxuXHREbyBub3QgY29uZnVzZSB3aXRoIFZhcmlhYmxlRGVjbGFyYXRpb24uXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBBc3NpZ25tZW50RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yLCBsZWZ0LCByaWdodCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBc3NpZ25tZW50T3BlcmF0b3J9ICovXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgVXBkYXRlRXhwcmVzc2lvbn0uICovXG5cdGV4cG9ydCBjb25zdCBVcGRhdGVPcGVyYXRvciA9IG5ldyBTZXQoWycrKycsICctLSddKVxuXHQvKipcblx0YCsrYXJndW1lbnRgIG9yIGBhcmd1bWVudCsrYFxuXHRJbmNyZW1lbnRzIG9yIGRlY3JlbWVudHMgYSBudW1iZXIuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBVcGRhdGVFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob3BlcmF0b3IsIGFyZ3VtZW50LCBwcmVmaXgpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VXBkYXRlT3BlcmF0b3J9ICovXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdFx0dGhpcy5wcmVmaXggPSBwcmVmaXhcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIExvZ2ljYWxFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IExvZ2ljYWxPcGVyYXRvciA9IG5ldyBTZXQoWyd8fCcsICcmJiddKVxuXHQvKipcblx0YGxlZnQgb3BlcmF0b3IgcmlnaHRgXG5cdENhbGxzIGEgbGF6eSBsb2dpY2FsIG9wZXJhdG9yLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgTG9naWNhbEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciwgbGVmdCwgcmlnaHQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7TG9naWNhbE9wZXJhdG9yfSAqL1xuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHR9XG5cdH1cblxuXHQvKiogYHRlc3QgPyBjb25zZXF1ZW50IDogYWx0ZXJuYXRlYCAqL1xuXHRleHBvcnQgY2xhc3MgQ29uZGl0aW9uYWxFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IodGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnRlc3QgPSB0ZXN0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFsdGVybmF0ZSA9IGFsdGVybmF0ZVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgbmV3IGNhbGxlZShhcmd1bWVudHMpYFxuXHRKdXN0IGxpa2Uge0BsaW5rIENhbGxFeHByZXNzaW9ufSBidXQgd2l0aCBgbmV3YCBpbiBmcm9udC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIE5ld0V4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihjYWxsZWUsIF9hcmd1bWVudHMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuY2FsbGVlID0gY2FsbGVlXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PEV4cHJlc3Npb24+fSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudHMgPSBfYXJndW1lbnRzXG5cdFx0fVxuXHR9XG5cblx0LyoqIGBjYWxsZWUoYXJndW1lbnRzKWAgKi9cblx0ZXhwb3J0IGNsYXNzIENhbGxFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoY2FsbGVlLCBfYXJndW1lbnRzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmNhbGxlZSA9IGNhbGxlZVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxFeHByZXNzaW9uPn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnRzID0gX2FyZ3VtZW50c1xuXHRcdH1cblx0fVxuXHQvKiogYC4uLmFyZ3NgIGluIGEgQ2FsbEV4cHJlc3Npb24uICovXG5cdGV4cG9ydCBjbGFzcyBTcHJlYWRFbGVtZW50IGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRJZiBjb21wdXRlZCA9PT0gdHJ1ZSwgYG9iamVjdFtwcm9wZXJ0eV1gLlxuXHRFbHNlLCBgb2JqZWN0LnByb3BlcnR5YCAtLSBtZWFuaW5nIHByb3BlcnR5IHNob3VsZCBiZSBhbiBJZGVudGlmaWVyLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgTWVtYmVyRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9iamVjdCwgcHJvcGVydHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMub2JqZWN0ID0gb2JqZWN0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnByb3BlcnR5ID0gcHJvcGVydHlcblx0XHR9XG5cblx0XHQvKiogTmVlZGVkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggZXN0cmVlLiAqL1xuXHRcdGdldCBjb21wdXRlZCgpIHtcblx0XHRcdHJldHVybiAhKHRoaXMucHJvcGVydHkgaW5zdGFuY2VvZiBJZGVudGlmaWVyKVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgeWllbGQgYXJndW1lbnRgIG9yIGB5aWVsZCogYXJndW1lbnRgICovXG5cdGV4cG9ydCBjbGFzcyBZaWVsZEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCwgZGVsZWdhdGUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZVxuXG5cdFx0XHRpZiAodGhpcy5kZWxlZ2F0ZSAmJiB0aGlzLmFyZ3VtZW50ID09PSBudWxsKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgeWllbGQqIHdpdGhvdXQgYXJndW1lbnQuJylcblx0XHR9XG5cdH1cblxuXHQvLyBUZW1wbGF0ZXNcblx0XHQvKipcblx0XHRBIHRlbXBsYXRlIHdpdGggbm8gdGFnLlxuXHRcdEl0IGFsdGVybmF0ZXMgYmV0d2VlbiBxdWFzaXMgYW5kIGV4cHJlc3Npb25zLlxuXHRcdEl0IHNob3VsZCBiZWdpbiBhbmQgZW5kIHdpdGggcXVhc2lzLCB1c2luZyB7QGxpbmsgVGVtcGxhdGVFbGVtZW50LmVtcHR5fSBpZiBuZWNlc3NhcnkuXG5cdFx0VGhpcyBtZWFucyB0aGF0IGAkezF9JHsyfWAgaGFzIDMgZW1wdHkgcXVhc2lzIVxuXHRcdCovXG5cdFx0ZXhwb3J0IGNsYXNzIFRlbXBsYXRlTGl0ZXJhbCBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdFx0Y29uc3RydWN0b3IocXVhc2lzLCBleHByZXNzaW9ucykge1xuXHRcdFx0XHRzdXBlcigpXG5cdFx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8VGVtcGxhdGVFbGVtZW50Pn0gKi9cblx0XHRcdFx0dGhpcy5xdWFzaXMgPSBxdWFzaXNcblx0XHRcdFx0LyoqIEB0eXBlIHtBcnJheTxFeHByZXNzaW9uPn0gKi9cblx0XHRcdFx0dGhpcy5leHByZXNzaW9ucyA9IGV4cHJlc3Npb25zXG5cdFx0XHRcdGlmICh0aGlzLnF1YXNpcy5sZW5ndGggIT09IHRoaXMuZXhwcmVzc2lvbnMubGVuZ3RoICsgMSlcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHQnVGhlcmUgbXVzdCBiZSAxIG1vcmUgcXVhc2kgdGhhbiBleHByZXNzaW9ucy5cXG4nICtcblx0XHRcdFx0XHRcdCdNYXliZSB5b3UgbmVlZCB0byBhZGQgYW4gZW1wdHkgcXVhc2kgdG8gdGhlIGZyb250IG9yIGVuZC4nKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKiBQYXJ0IG9mIGEgVGVtcGxhdGVMaXRlcmFsLiAqL1xuXHRcdGV4cG9ydCBjbGFzcyBUZW1wbGF0ZUVsZW1lbnQgZXh0ZW5kcyBOb2RlIHtcblx0XHRcdC8qKlxuXHRcdFx0VGVtcGxhdGVFbGVtZW50IHdob3NlIHJhdyBzb3VyY2UgaXMgYHN0cmAuXG5cdFx0XHRAcGFyYW0ge3N0cmluZ30gc3RyXG5cdFx0XHQqL1xuXHRcdFx0c3RhdGljIGZvclJhd1N0cmluZyhzdHIpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUZW1wbGF0ZUVsZW1lbnQoZmFsc2UsIHtcblx0XHRcdFx0XHQvLyBUT0RPOiBBIHdheSB0byBjYWxjdWxhdGUgdGhpcz9cblx0XHRcdFx0XHRjb29rZWQ6IG51bGwsXG5cdFx0XHRcdFx0cmF3OiBzdHJcblx0XHRcdFx0fSlcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHRUZW1wbGF0ZUVsZW1lbnQgZXZhbHVhdGluZyB0byBgc3RyYC5cblx0XHRcdFVzZXMgZXNjYXBlIHNlcXVlbmNlcyBhcyBuZWNlc3NhcnkuXG5cdFx0XHRAcGFyYW0ge3N0cmluZ30gc3RyXG5cdFx0XHQqL1xuXHRcdFx0c3RhdGljIGZvclN0cmluZyhzdHIpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUZW1wbGF0ZUVsZW1lbnQoZmFsc2UsIHtcblx0XHRcdFx0XHRjb29rZWQ6IHN0cixcblx0XHRcdFx0XHRyYXc6IGVzY2FwZVN0cmluZ0ZvclRlbXBsYXRlKHN0cilcblx0XHRcdFx0fSlcblx0XHRcdH1cblxuXHRcdFx0LyoqIFRlbXBsYXRlRWxlbWVudCB3aXRoIGVtcHR5IHZhbHVlLiAqL1xuXHRcdFx0c3RhdGljIGdldCBlbXB0eSgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZm9yU3RyaW5nKCcnKVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdHJ1Y3Rvcih0YWlsLCB2YWx1ZSkge1xuXHRcdFx0XHRzdXBlcigpXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHRVc2UgdGhpcyB0byBtYXJrIHRoZSBsYXN0IFRlbXBsYXRlRWxlbWVudC5cblx0XHRcdFx0QHR5cGUge2Jvb2xlYW59XG5cdFx0XHRcdCovXG5cdFx0XHRcdHRoaXMudGFpbCA9IHRhaWxcblx0XHRcdFx0LyoqIEB0eXBlIHt7Y29va2VkOiBzdHJpbmcsIHJhdzogc3RyaW5nfX0gKi9cblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3Rcblx0XHRcdGVzY2FwZVN0cmluZ0ZvclRlbXBsYXRlID0gc3RyID0+XG5cdFx0XHRcdHN0ci5yZXBsYWNlKC9be1xcXFxgXFxuXFx0XFxiXFxmXFx2XFxyXFx1MjAyOFxcdTIwMjldL2csIGNoID0+IHRlbXBsYXRlRXNjYXBlc1tjaF0pLFxuXHRcdFx0dGVtcGxhdGVFc2NhcGVzID0ge1xuXHRcdFx0XHQvLyBOZWVkIHRvIG1ha2Ugc3VyZSBcIiR7XCIgaXMgZXNjYXBlZC5cblx0XHRcdFx0J3snOiAnXFxcXHsnLFxuXHRcdFx0XHQnYCc6ICdcXFxcYCcsXG5cdFx0XHRcdCdcXFxcJzogJ1xcXFxcXFxcJyxcblx0XHRcdFx0J1xcbic6ICdcXFxcbicsXG5cdFx0XHRcdCdcXHQnOiAnXFxcXHQnLFxuXHRcdFx0XHQnXFxiJzogJ1xcXFxiJyxcblx0XHRcdFx0J1xcZic6ICdcXFxcZicsXG5cdFx0XHRcdCdcXHYnOiAnXFxcXHYnLFxuXHRcdFx0XHQnXFxyJzogJ1xcXFxyJyxcblx0XHRcdFx0J1xcdTIwMjgnOiAnXFxcXHUyMDI4Jyxcblx0XHRcdFx0J1xcdTIwMjknOiAnXFxcXHUyMDI5J1xuXHRcdFx0fVxuXG5cdFx0LyoqIFRlbXBsYXRlTGl0ZXJhbCB3aXRoIGEgdGFnIGluIGZyb250LCBsaWtlYHRoaXNgLiAqL1xuXHRcdGV4cG9ydCBjbGFzcyBUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRcdGNvbnN0cnVjdG9yKHRhZywgcXVhc2kpIHtcblx0XHRcdFx0c3VwZXIoKVxuXHRcdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHRcdHRoaXMudGFnID0gdGFnXG5cdFx0XHRcdC8qKiBAdHlwZSB7VGVtcGxhdGVMaXRlcmFsfSAqL1xuXHRcdFx0XHR0aGlzLnF1YXNpID0gcXVhc2lcblx0XHRcdH1cblx0XHR9XG5cbi8vIFBhdHRlcm5zXG5cdC8qKlxuXHRgeyBhLCBiOiBjIH0gPWBcblx0T2JqZWN0IGRlY29uc3RydWN0aW5nIHBhdHRlcm4uXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBPYmplY3RQYXR0ZXJuIGV4dGVuZHMgUGF0dGVybiB7XG5cdFx0Y29uc3RydWN0b3IocHJvcGVydGllcykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxBc3NpZ25tZW50UHJvcGVydHk+fSAqL1xuXHRcdFx0dGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllc1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRKdXN0IGxpa2UgYSBQcm9wZXJ0eSwgYnV0IGtpbmQgaXMgYWx3YXlzIGBpbml0YC5cblx0QWx0aG91Z2ggdGVjaG5pY2FsbHkgaXRzIG93biB0eXBlLCBgXy50eXBlYCB3aWxsIGJlICdQcm9wZXJ0eScuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBBc3NpZ25tZW50UHJvcGVydHkgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihrZXksIHZhbHVlKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0dmFsdWUgPSBrZXlcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMua2V5ID0ga2V5XG5cdFx0XHQvKiogQHR5cGUge1BhdHRlcm59ICovXG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHR9XG5cblx0XHRnZXQgdHlwZSgpIHsgcmV0dXJuICdQcm9wZXJ0eScgfVxuXHRcdGdldCBraW5kKCkgeyByZXR1cm4gJ2luaXQnIH1cblx0XHRnZXQgbWV0aG9kKCkgeyByZXR1cm4gZmFsc2UgfVxuXHRcdGdldCBzaG9ydGhhbmQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZSA9PT0gdGhpcy5rZXlcblx0XHR9XG5cdFx0Z2V0IGNvbXB1dGVkKCkge1xuXHRcdFx0cmV0dXJuICEodGhpcy5rZXkgaW5zdGFuY2VvZiBJZGVudGlmaWVyKVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgWyBhLCBiIF0gPSAuLi5gLlxuXHRBcnJheSBkZWNvbnN0cnVjdGluZyBwYXR0ZXJuLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgQXJyYXlQYXR0ZXJuIGV4dGVuZHMgUGF0dGVybiB7XG5cdFx0Y29uc3RydWN0b3IoZWxlbWVudHMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8P1BhdHRlcm4+fSAqL1xuXHRcdFx0dGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdENhbiBiZSB0aGUgbGFzdCBhcmd1bWVudCB0byBhIEZ1bmN0aW9uRXhwcmVzc2lvbi9GdW5jdGlvbkRlY2xhcmF0aW9uXG5cdG9yICBnbyBhdCB0aGUgZW5kIG9mIGFuIEFycmF5UGF0dGVybi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFJlc3RFbGVtZW50IGV4dGVuZHMgUGF0dGVybiB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG4vLyBDbGFzc2VzXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgTWV0aG9kRGVmaW5pdGlvbn0uICovXG5cdGV4cG9ydCBjb25zdCBNZXRob2REZWZpbml0aW9uS2luZCA9IG5ldyBTZXQoWydjb25zdHJ1Y3RvcicsICdtZXRob2QnLCAnZ2V0JywgJ3NldCddKVxuXHQvKiogUGFydCBvZiBhIHtAbGluayBDbGFzc0JvZHl9LiAqL1xuXHRleHBvcnQgY2xhc3MgTWV0aG9kRGVmaW5pdGlvbiBleHRlbmRzIE5vZGUge1xuXHRcdC8qKiBAcGFyYW0ge0Z1bmN0aW9uRXhwcmVzc2lvbn0gdmFsdWUgKi9cblx0XHRzdGF0aWMgY29uc3RydWN0b3IodmFsdWUpIHtcblx0XHRcdHJldHVybiBuZXcgTWV0aG9kRGVmaW5pdGlvbihuZXcgSWRlbnRpZmllcignY29uc3RydWN0b3InKSwgdmFsdWUsICdjb25zdHJ1Y3RvcicpXG5cdFx0fVxuXG5cdFx0Y29uc3RydWN0b3Ioa2V5LCB2YWx1ZSwga2luZCwgX3N0YXRpYywgY29tcHV0ZWQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChfc3RhdGljID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdF9zdGF0aWMgPSBmYWxzZVxuXHRcdFx0aWYgKGNvbXB1dGVkID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGNvbXB1dGVkID0gZmFsc2Vcblx0XHRcdGlmIChraW5kID09PSAnY29uc3RydWN0b3InICYmICEoXG5cdFx0XHRcdGtleSBpbnN0YW5jZW9mIElkZW50aWZpZXIgJiYga2V5Lm5hbWUgPT09ICdjb25zdHJ1Y3RvcicgJiYgIV9zdGF0aWMgJiYgIWNvbXB1dGVkKSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdCdDb25zdHJ1Y3RvciBtZXRob2Qgc2hvdWxkIGNyZWF0ZWQgd2l0aCBgTWV0aG9kRGVmaW5pdGlvbi5jb25zdHJ1Y3RvcmAuJylcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllciB8IExpdGVyYWx9ICovXG5cdFx0XHR0aGlzLmtleSA9IGtleVxuXHRcdFx0LyoqIEB0eXBlIHtGdW5jdGlvbkV4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHRcdC8qKiBAdHlwZSB7TWV0aG9kRGVmaW5pdGlvbktpbmR9ICovXG5cdFx0XHR0aGlzLmtpbmQgPSBraW5kXG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLnN0YXRpYyA9IF9zdGF0aWNcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMuY29tcHV0ZWQgPSBjb21wdXRlZFxuXG5cdFx0XHRpZiAodmFsdWUuaWQgIT09IG51bGwpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHQnTWV0aG9kRGVmaW5pdGlvbiB2YWx1ZSBzaG91bGQgbm90IGhhdmUgaWQ7IHRoYXQgaXMgaGFuZGxlZCBieSBga2V5YC4nKVxuXHRcdH1cblx0fVxuXG5cdC8qKiBDb250ZW50cyBvZiBhIHtAbGluayBDbGFzc30uICovXG5cdGV4cG9ydCBjbGFzcyBDbGFzc0JvZHkgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3Rvcihib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PE1ldGhvZERlZmluaXRpb24+fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiB7QGxpbmsgQ2xhc3NEZWNsYXJhdGlvbn0gfCB7QGxpbmsgQ2xhc3NFeHByZXNzaW9ufSAqL1xuXHRleHBvcnQgY2xhc3MgQ2xhc3MgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8vIFRPRE86IGV4dGVuZHMgRGVjbGFyYXRpb24gdG9vXG5cdC8qKiB7QGxpbmsgQ2xhc3N9IGluIGRlY2xhcmF0aW9uIHBvc2l0aW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgQ2xhc3NEZWNsYXJhdGlvbiBleHRlbmRzIENsYXNzIHtcblx0XHRjb25zdHJ1Y3RvcihpZCwgc3VwZXJDbGFzcywgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5pZCA9IGlkXG5cdFx0XHQvKiogQHR5cGUgez9FeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5zdXBlckNsYXNzID0gc3VwZXJDbGFzc1xuXHRcdFx0LyoqIEB0eXBlIHtDbGFzc0JvZHl9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIHtAbGluayBDbGFzc30gaW4gZXhwcmVzc2lvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIENsYXNzRXhwcmVzc2lvbiBleHRlbmRzIENsYXNzIHtcblx0XHRjb25zdHJ1Y3RvcihpZCwgc3VwZXJDbGFzcywgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMuaWQgPSBpZFxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3Ncblx0XHRcdC8qKiBAdHlwZSB7Q2xhc3NCb2R5fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG4vLyBNb2R1bGVzXG5cdC8qKiBBIHNwZWNpZmllciBpbiBhbiBpbXBvcnQgb3IgZXhwb3J0IGRlY2xhcmF0aW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgTW9kdWxlU3BlY2lmaWVyIGV4dGVuZHMgTm9kZSB7IH1cblxuXHQvKipcblx0e0BsaW5rIEltcG9ydFNwZWNpZmllcn0gfCB7QGxpbmsgSW1wb3J0RGVmYXVsdFNwZWNpZmllcn0gfCB7QGxpbmsgSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyfVxuXHQqL1xuXHRleHBvcnQgY2xhc3MgSW1wb3J0U3BlY2lmaWVyQWJzdHJhY3QgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHRgaW1wb3J0IHNwZWNpZmllcnMgZnJvbSBzb3VyY2VgXG5cdE9ubHkgb25lIHNwZWNpZmllciBtYXkgYmUgYSBJbXBvcnREZWZhdWx0U3BlY2lmaWVyLlxuXHRJZiB0aGVyZSBpcyBhbiBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIsIGl0IG11c3QgYmUgdGhlIG9ubHkgc3BlY2lmaWVyLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgSW1wb3J0RGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihzcGVjaWZpZXJzLCBzb3VyY2UpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8SW1wb3J0U3BlY2lmaWVyQWJzdHJhY3Q+fSAqL1xuXHRcdFx0dGhpcy5zcGVjaWZpZXJzID0gc3BlY2lmaWVyc1xuXHRcdFx0LyoqIEB0eXBlIHtMaXRlcmFsPHN0cmluZz59ICovXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRBIG5vbi1kZWZhdWx0IGltcG9ydC4gVXNlZCBpbiBhbiBJbXBvcnREZWNsYXJhdGlvbi5cblx0Rm9yIGBpbXBvcnQgeyBhIH0gZnJvbSBcInNvdXJjZVwiYCwganVzdCBwYXNzIG9uZSBhcmd1bWVudCBhbmQgbG9jYWwgd2lsbCA9IGltcG9ydGVkLlxuXHRGb3IgYGltcG9ydCB7IGEgYXMgYiB9IGZyb20gXCJzb3VyY2VcImAsIG1ha2UgaW1wb3J0ZWQgYGFgIGFuZCBsb2NhbCBgYmAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnRTcGVjaWZpZXIgZXh0ZW5kcyBNb2R1bGVTcGVjaWZpZXIge1xuXHRcdGNvbnN0cnVjdG9yKGltcG9ydGVkLCBsb2NhbCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxvY2FsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxvY2FsID0gaW1wb3J0ZWRcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMuaW1wb3J0ZWQgPSBpbXBvcnRlZFxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5sb2NhbCA9IGxvY2FsXG5cdFx0fVxuXHR9XG5cblx0LyoqIFRoZSBkZWZhdWx0IGV4cG9ydCwgYXMgaW4gYGltcG9ydCBhIGZyb20gXCJzb3VyY2VcImAuICovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnREZWZhdWx0U3BlY2lmaWVyIGV4dGVuZHMgSW1wb3J0U3BlY2lmaWVyQWJzdHJhY3Qge1xuXHRcdGNvbnN0cnVjdG9yKGxvY2FsKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKiogT2JqZWN0IG9mIGV2ZXJ5IGV4cG9ydCwgYXMgaW4gYGltcG9ydCAqIGFzIGEgZnJvbSBcInNvdXJjZVwiYC4gKi9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllciBleHRlbmRzIEltcG9ydFNwZWNpZmllckFic3RyYWN0IHtcblx0XHRjb25zdHJ1Y3Rvcihsb2NhbCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5sb2NhbCA9IGxvY2FsXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdEEgbm9uLWRlZmF1bHQgZXhwb3J0LiBVc2VkIGluIGFuIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24uXG5cdEZvciBgZXhwb3J0IHsgYSB9IGZyb20gXCJzb3VyY2VcImAsIGp1c3QgcGFzcyBvbmUgYXJndW1lbnQgbG9jYWwgd2lsbCA9IGV4cG9ydGVkLlxuXHRGb3IgYGV4cG9ydCB7IGEgYXMgYiB9YCwgbWFrZSBleHBvcnRlZCBgYmAgYW5kIGxvY2FsIGBhYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cG9ydFNwZWNpZmllciBleHRlbmRzIE1vZHVsZVNwZWNpZmllciB7XG5cdFx0Y29uc3RydWN0b3IoZXhwb3J0ZWQsIGxvY2FsKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAobG9jYWwgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0bG9jYWwgPSBleHBvcnRlZFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5leHBvcnRlZCA9IGV4cG9ydGVkXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0RXhwb3J0cyBtdWx0aXBsZSB2YWx1ZXMgYXMgaW4gYGV4cG9ydCB7IGEsIGIgYXMgYyB9YC5cblx0SWYgc291cmNlICE9PSBudWxsLFxuXHRyZS1leHBvcnRzIGZyb20gdGhhdCBtb2R1bGUgYXMgaW4gYGV4cG9ydCB7IC4uLiB9IGZyb20gXCJzb3VyY2VcImAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnROYW1lZERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoZGVjbGFyYXRpb24sIHNwZWNpZmllcnMsIHNvdXJjZSkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJndW1lbnRzXG5cdFx0XHRpZiAoc3BlY2lmaWVycyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRzcGVjaWZpZXJzID0gW11cblx0XHRcdGlmIChzb3VyY2UgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0c291cmNlID0gbnVsbFxuXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez9EZWNsYXJhdGlvbn0gKi9cblx0XHRcdHRoaXMuZGVjbGFyYXRpb24gPSBkZWNsYXJhdGlvblxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxFeHBvcnRTcGVjaWZpZXI+fSAqL1xuXHRcdFx0dGhpcy5zcGVjaWZpZXJzID0gc3BlY2lmaWVyc1xuXHRcdFx0LyoqIEB0eXBlIHs/TGl0ZXJhbDxzdHJpbmc+fSAqL1xuXHRcdFx0dGhpcy5zb3VyY2UgPSBzb3VyY2VcblxuXHRcdFx0aWYgKGRlY2xhcmF0aW9uICE9PSBudWxsICYmICEoc3BlY2lmaWVycy5sZW5ndGggPT09IDAgJiYgc291cmNlID09PSBudWxsKSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEZWNsYXJhdGlvbiBjYW4gbm90IGJlIGNvbWJpbmVkIHdpdGggc3BlY2lmaWVycy9zb3VyY2UuJylcblx0XHR9XG5cdH1cblxuXHQvKiogYGV4cG9ydCBkZWZhdWx0IGRlY2xhcmF0aW9uYCAqL1xuXHRleHBvcnQgY2xhc3MgRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoZGVjbGFyYXRpb24pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RGVjbGFyYXRpb24gfCBFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbiA9IGRlY2xhcmF0aW9uXG5cdFx0fVxuXHR9XG5cblx0LyoqIGBleHBvcnQgKiBmcm9tIHNvdXJjZWAgKi9cblx0ZXhwb3J0IGNsYXNzIEV4cG9ydEFsbERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3Ioc291cmNlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0xpdGVyYWw8c3RyaW5nPn0gKi9cblx0XHRcdHRoaXMuc291cmNlID0gc291cmNlXG5cdFx0fVxuXHR9XG4iXX0=