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
		constructor(kind, key, value, method) {
			if (value === undefined) value = key;
			if (method === undefined) method = false;
			super();
			this.kind = kind;
			this.key = key;
			this.value = value;
			this.method = method;

			if (this.kind !== 'init') {
				if (!(this.value instanceof FunctionExpression)) throw new Error('get/set Property\'s value must be a FunctionExpression.');
				if (this.value.id !== null) throw new Error('get/set Property\'s value must not have id; ' + 'that is stored in the `key` of the Property.');
				if (this.value.generator) throw new Error('get/set can not be a generator.');
			}
		}

		get shorthand() {
			return this.value === this.key;
		}

		get computed() {
			return !(this.key instanceof Identifier);
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
//# sourceMappingURL=data:application/json;base64,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TCxLQUFLOztPQUlMLGdCQUFnQjs7Ozs7Ozs7OztTQUFoQixnQkFBZ0IsR0FBaEIsZ0JBQWdCOztPQWFoQixlQUFlOzs7Ozs7Ozs7O1NBQWYsZUFBZSxHQUFmLGVBQWU7O09BY2YsZUFBZTs7U0FBZixlQUFlLEdBQWYsZUFBZTs7T0FLZix1QkFBdUI7O1NBQXZCLHVCQUF1QixHQUF2Qix1QkFBdUI7O09BT3ZCLGlCQUFpQjs7Ozs7Ozs7O1NBQWpCLGlCQUFpQixHQUFqQixpQkFBaUI7O09BZWpCLGVBQWU7Ozs7Ozs7Ozs7U0FBZixlQUFlLEdBQWYsZUFBZTs7T0FjZixzQkFBc0I7Ozs7Ozs7O1NBQXRCLHNCQUFzQixHQUF0QixzQkFBc0I7O09BU3RCLHdCQUF3Qjs7Ozs7Ozs7U0FBeEIsd0JBQXdCLEdBQXhCLHdCQUF3Qjs7T0FheEIsZUFBZTs7Ozs7Ozs7OztTQUFmLGVBQWUsR0FBZixlQUFlOztPQWtCZixzQkFBc0I7Ozs7Ozs7Ozs7Ozs7U0FBdEIsc0JBQXNCLEdBQXRCLHNCQUFzQjs7T0FzQnRCLHdCQUF3Qjs7Ozs7Ozs7U0FBeEIsd0JBQXdCLEdBQXhCLHdCQUF3Qjs7T0FTeEIsb0JBQW9COzs7Ozs7OztTQUFwQixvQkFBb0IsR0FBcEIsb0JBQW9CIiwiZmlsZSI6ImFzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBCYXNlIHR5cGUgb2YgYWxsIEFTVHMuICovXG5leHBvcnQgY2xhc3MgTm9kZSB7XG5cdC8qKlxuXHRDb252ZXJ0IHRvIEpTT04uXG5cdEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzdHJlZS9lc3RyZWVcblx0Ki9cblx0dG9KU09OKCkge1xuXHRcdGNvbnN0IG9iaiA9IHsgfVxuXHRcdG9iai50eXBlID0gdGhpcy50eXBlXG5cdFx0Ly8gU29ydCB0byBtYWtlIEpTT04gcmVuZGVyaW5nIGRldGVybWluaXN0aWMuXG5cdFx0T2JqZWN0LmtleXModGhpcykuc29ydCgpLmZvckVhY2goa2V5ID0+IHsgb2JqW2tleV0gPSB0aGlzW2tleV0gfSlcblx0XHRyZXR1cm4gb2JqXG5cdH1cblxuXHQvKipcblx0Rm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvdGhlciBBU1QgcmVwcmVzZW50YXRpb25zLFxuXHRhbGwgTm9kZSBpbnN0YW5jZXMgaGF2ZSBhICd0eXBlJyBwcm9wZXJ0eSB0aGF0IGlzIHRoZSBuYW1lIG9mIHRoYXQgdHlwZS5cblx0QHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXN0cmVlL2VzdHJlZVxuXHQqL1xuXHRnZXQgdHlwZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG5cdH1cblxuXHQvKiogQG92ZXJyaWRlICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKVxuXHR9XG59XG5cbi8vIEFic3RyYWN0c1xuXHQvKiogTGluZSB0aGF0IGRlY2xhcmVzIG5ldyBsb2NhbHMuICovXG5cdGV4cG9ydCBjbGFzcyBEZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqIEJsb2NrcyBvZiBjb2RlIGhhdmUgbGluZXMgdGhhdCBhcmUgU3RhdGVtZW50cyBvciBEZWNsYXJhdGlvbnMuICovXG5cdGV4cG9ydCBjbGFzcyBTdGF0ZW1lbnQgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHRDb2RlIHRoYXQgaGFzIGEgdmFsdWUuXG5cdFRvIHVzZSBvbmUgaW4gYSBzdGF0ZW1lbnQgcG9zaXRpb24sIHNlZSBFeHByZXNzaW9uU3RhdGVtZW50LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqXG5cdENhbiBnbyBpbiBhIHBhcmFtZXRlciBsaXN0IG9yIG9uIHRoZSBsZWZ0IHNpZGUgb2YgYW4gYXNzaWdubWVudC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFBhdHRlcm4gZXh0ZW5kcyBOb2RlIHsgfVxuXG4vLyBBIGNvbXBsZXRlIHByb2dyYW0gc291cmNlIHRyZWUuXG5leHBvcnQgY2xhc3MgUHJvZ3JhbSBleHRlbmRzIE5vZGUge1xuXHRjb25zdHJ1Y3Rvcihib2R5KSB7XG5cdFx0c3VwZXIoKVxuXHRcdC8qKiBAdHlwZSB7QXJyYXk8U3RhdGVtZW50Pn0gKi9cblx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdH1cbn1cblxuLy8gVmFyaWFibGVzXG5cdC8qKlxuXHRBIEphdmFTY3JpcHQgaWRlbnRpZmllci5cblxuXHRJdCBpcyBhc3N1bWVkIHRoYXQgeW91IGhhdmUgY2FsbGVkIGBtYW5nbGVJZGVudGlmaWVyYCBhcyBhcHByb3ByaWF0ZS5cblx0U2VlIGFsc28ge0BsaW5rIGlkZW50aWZpZXJ9LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgSWRlbnRpZmllciBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG5hbWUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuXHRcdFx0dGhpcy5uYW1lID0gbmFtZVxuXHRcdH1cblx0fVxuXG5cdC8qKiBTaW5nbGUgZGVjbGFyYXRpb24gd2l0aGluIGEge0BsaW5rIFZhcmlhYmxlRGVjbGFyYXRpb259LiAqL1xuXHRleHBvcnQgY2xhc3MgVmFyaWFibGVEZWNsYXJhdG9yIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoaWQsIGluaXQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChpbml0PT09IHVuZGVmaW5lZClcblx0XHRcdFx0aW5pdCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMuaWQgPSBpZFxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuaW5pdCA9IGluaXRcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIFZhcmlhYmxlRGVjbGFyYXRpb259LiAqL1xuXHRleHBvcnQgY29uc3QgVmFyaWFibGVEZWNsYXJhdGlvbktpbmQgPSBuZXcgU2V0KFsnY29uc3QnLCAnbGV0JywgJ3ZhciddKVxuXHQvKipcblx0RGVjbGFyZXMgYW5kIG9wdGlvbmFsbHkgaW5pdGlhbGl6ZXMgbWFueSB2YXJpYWJsZXMuXG5cdE11c3QgYmUgYXQgbGVhc3Qgb25lIGRlY2xhcmF0aW9uLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgVmFyaWFibGVEZWNsYXJhdGlvbiBleHRlbmRzIERlY2xhcmF0aW9uIHtcblx0XHRjb25zdHJ1Y3RvcihraW5kLCBkZWNsYXJhdGlvbnMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VmFyaWFibGVEZWNsYXJhdGlvbktpbmR9ICovXG5cdFx0XHR0aGlzLmtpbmQgPSBraW5kXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PFZhcmlhYmxlRGVjbGFyYXRvcj59ICovXG5cdFx0XHR0aGlzLmRlY2xhcmF0aW9ucyA9IGRlY2xhcmF0aW9uc1xuXHRcdFx0aWYgKHRoaXMuZGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdWYXJpYWJsZURlY2xhcmF0aW9uIG11c3QgaGF2ZSBhdCBsZWFzdCAxIGRlY2xhcmF0aW9uLicpXG5cdFx0fVxuXHR9XG5cblxuLy8gU3RhdGVtZW50c1xuXHQvKipcblx0QW4gZW1wdHkgc3RhdGVtZW50LCBpLmUuLCBhIHNvbGl0YXJ5IHNlbWljb2xvbi5cblx0Tm90IHVzZWZ1bCBmb3IgY29kZSBnZW5lcmF0aW9uLCBidXQgc29tZSBwYXJzZXJzIHdpbGwgcmV0dXJuIHRoZXNlLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRW1wdHlTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQgeyB9XG5cblx0LyoqIEEgYmxvY2sgc3RhdGVtZW50LCBpLmUuLCBhIHNlcXVlbmNlIG9mIHN0YXRlbWVudHMgc3Vycm91bmRlZCBieSBicmFjZXMuICovXG5cdGV4cG9ydCBjbGFzcyBCbG9ja1N0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxTdGF0ZW1lbnQ+fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRBbiBleHByZXNzaW9uIHN0YXRlbWVudCwgaS5lLiwgYSBzdGF0ZW1lbnQgY29uc2lzdGluZyBvZiBhIHNpbmdsZSBleHByZXNzaW9uLlxuXHRTZWUgYGVzYXN0LnV0aWwgdG9TdGF0ZW1lbnQgdG9TdGF0ZW1lbnRzYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25TdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGV4cHJlc3Npb24pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuZXhwcmVzc2lvbiA9IGV4cHJlc3Npb25cblx0XHR9XG5cdH1cblxuXHQvKiogQW4gaWYgKG9yIGlmIC4uLiBlbHNlKSBzdGF0ZW1lbnQuICovXG5cdGV4cG9ydCBjbGFzcyBJZlN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IodGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRcdGlmIChhbHRlcm5hdGUgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0YWx0ZXJuYXRlID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50XG5cdFx0XHQvKiogQHR5cGUgez9TdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmFsdGVybmF0ZSA9IGFsdGVybmF0ZVxuXHRcdH1cblx0fVxuXG5cdC8qKiBBIHN0YXRlbWVudCBwcmVmaXhlZCBieSBhIGxhYmVsLiAqL1xuXHRleHBvcnQgY2xhc3MgTGFiZWxlZFN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IobGFiZWwsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubGFiZWwgPSBsYWJlbFxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIEJyZWFrU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHQvKiogVGhlIGBicmVha2Aga2V5d29yZC4gKi9cblx0XHRjb25zdHJ1Y3RvcihsYWJlbCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxhYmVsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxhYmVsID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubGFiZWwgPSBsYWJlbFxuXHRcdH1cblx0fVxuXG5cdC8qKiBUaGUgYGNvbnRpbnVlYCBrZXl3b3JkLiAqL1xuXHRleHBvcnQgY2xhc3MgQ29udGludWVTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGxhYmVsKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAobGFiZWwgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0bGFiZWwgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez9JZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5sYWJlbCA9IGxhYmVsXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdGBzd2l0Y2ggKGRpc2NyaW1pbmFudCkgeyBjYXNlcyB9YFxuXHRPbmx5IHRoZSBsYXN0IGVudHJ5IG9mIGBjYXNlc2AgaXMgYWxsb3dlZCB0byBiZSBgZGVmYXVsdGAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBTd2l0Y2hTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGRpc2NyaW1pbmFudCwgY2FzZXMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuZGlzY3JpbWluYW50ID0gZGlzY3JpbWluYW50XG5cdFx0XHQvKiogQHR5cGUge0FycmF5PFN3aXRjaENhc2U+fSAqL1xuXHRcdFx0dGhpcy5jYXNlcyA9IGNhc2VzXG5cdFx0fVxuXHR9XG5cdC8qKlxuXHRBIHNpbmdsZSBgY2FzZWAgd2l0aGluIGEgU3dpdGNoU3RhdGVtZW50LlxuXHRJZiBgdGVzdGAgaXMgYG51bGxgLCB0aGlzIGlzIHRoZSBgZGVmYXVsdGAgY2FzZS5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFN3aXRjaENhc2UgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKHRlc3QsIGNvbnNlcXVlbnQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmICh0ZXN0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdHRlc3QgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez9FeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxTdGF0ZW1lbnQ+ICovXG5cdFx0XHR0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50XG5cdFx0fVxuXHR9XG5cblx0LyoqIFRoZSBgcmV0dXJuYCBrZXl3b3JkLCBvcHRpb25hbGx5IGZvbGxvd2VkIGJ5IGFuIEV4cHJlc3Npb24gdG8gcmV0dXJuLiAqL1xuXHRleHBvcnQgY2xhc3MgUmV0dXJuU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGFyZ3VtZW50ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGFyZ3VtZW50ID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRUaGUgYHRocm93YCBrZXl3b3JkLCBhbmQgc29tZXRoaW5nIHRvIHRocm93LlxuXHRTZWUgYGVzYXN0LnV0aWwgdGhyb3dFcnJvcmAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBUaHJvd1N0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgdHJ5IHsgYmxvY2sgfSBjYXRjaCAoaGFuZGxlci5wYXJhbSkgeyBoYW5kbGVyLmJvZHkgfSBmaW5hbGx5IHsgZmluYWxpemVyIH1gXG5cdEF0IGxlYXN0IG9uZSBvZiBgaGFuZGxlcmAgb3IgYGZpbmFsaXplcmAgbXVzdCBiZSBub24tbnVsbC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFRyeVN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYmxvY2ssIGhhbmRsZXIsIGZpbmFsaXplcikge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0aGFuZGxlciA9IG51bGxcblx0XHRcdGlmIChmaW5hbGl6ZXIgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0ZmluYWxpemVyID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtCbG9ja1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYmxvY2sgPSBibG9ja1xuXHRcdFx0LyoqIEB0eXBlIHs/Q2F0Y2hDbGF1c2V9ICovXG5cdFx0XHR0aGlzLmhhbmRsZXIgPSBoYW5kbGVyXG5cdFx0XHQvKiogQHR5cGUgez9CbG9ja1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuZmluYWxpemVyID0gZmluYWxpemVyXG5cdFx0fVxuXHR9XG5cdC8qKiBNdXN0IGJlICpwYXJ0KiBvZiBhIHtAbGluayBUcnlTdGF0ZW1lbnR9IC0tIGRvZXMgKm5vdCogZm9sbG93IGl0LiAqL1xuXHRleHBvcnQgY2xhc3MgQ2F0Y2hDbGF1c2UgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihwYXJhbSwgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtQYXR0ZXJufSAqL1xuXHRcdFx0dGhpcy5wYXJhbSA9IHBhcmFtXG5cdFx0XHQvKiogQHR5cGUge0Jsb2NrU3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgd2hpbGUgKHRlc3QpIGJvZHlgICovXG5cdGV4cG9ydCBjbGFzcyBXaGlsZVN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IodGVzdCwgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIGBkbyBib2R5IHdoaWxlICh0ZXN0KWAgKi9cblx0ZXhwb3J0IGNsYXNzIERvV2hpbGVTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGJvZHksIHRlc3QpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgZm9yIChpbml0OyB0ZXN0OyB1cGRhdGUpIGJvZHlgXG5cdE5vdCB0byBiZSBjb25mdXNlZCB3aXRoIEZvckluU3RhdGVtZW50IG9yIEZvck9mU3RhdGVtZW50LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRm9yU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihpbml0LCB0ZXN0LCB1cGRhdGUsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7PyhWYXJpYWJsZURlY2xhcmF0aW9uIHwgRXhwcmVzc2lvbil9ICovXG5cdFx0XHR0aGlzLmluaXQgPSBpbml0XG5cdFx0XHQvKiogQHR5cGUgez9FeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudXBkYXRlID0gdXBkYXRlXG5cdFx0XHQvKiogQHR5cGUge1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKiogYGZvciAobGVmdCBpbiByaWdodCkgYm9keWAgKi9cblx0ZXhwb3J0IGNsYXNzIEZvckluU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihsZWZ0LCByaWdodCwgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtWYXJpYWJsZURlY2xhcmF0aW9uIHwgRXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIGBmb3IgKGxlZnQgb2YgcmlnaHQpIGJvZHlgICovXG5cdGV4cG9ydCBjbGFzcyBGb3JPZlN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IobGVmdCwgcmlnaHQsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VmFyaWFibGVEZWNsYXJhdGlvbiB8IEV4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBUaGUgYGRlYnVnZ2VyYCBrZXl3b3JkLiAqL1xuXHRleHBvcnQgY2xhc3MgRGVidWdnZXJTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQgeyB9XG5cbi8vIERlY2xhcmF0aW9uc1xuXHQvKiogRnVuY3Rpb25EZWNsYXJhdGlvbiB8IEZ1bmN0aW9uRXhwcmVzc2lvbiB8IEFycm93RnVuY3Rpb25FeHByZXNzaW9uICovXG5cdGV4cG9ydCBjbGFzcyBGdW5jdGlvbkFic3RyYWN0IGV4dGVuZHMgTm9kZSB7IH1cblxuXHRjbGFzcyBGdW5jdGlvbk5vbkFycm93IGV4dGVuZHMgRnVuY3Rpb25BYnN0cmFjdCB7XG5cdFx0Y29uc3RydWN0b3IoaWQsIHBhcmFtcywgYm9keSwgZ2VuZXJhdG9yKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAoZ2VuZXJhdG9yID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGdlbmVyYXRvciA9IGZhbHNlXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8UGF0dGVybj59ICovXG5cdFx0XHR0aGlzLnBhcmFtcyA9IHBhcmFtc1xuXHRcdFx0LyoqIEB0eXBlIHtCbG9ja1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMuZ2VuZXJhdG9yID0gZ2VuZXJhdG9yXG5cdFx0fVxuXHR9XG5cblx0Ly8gVE9ETzogRGVjbGFyYXRpb24gdG9vXG5cdC8qKiB7QGxpbmsgRnVuY3Rpb259IGluIGRlY2xhcmF0aW9uIHBvc2l0aW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgRnVuY3Rpb25EZWNsYXJhdGlvbiBleHRlbmRzIEZ1bmN0aW9uTm9uQXJyb3cgeyB9XG5cbi8vIEV4cHJlc3Npb25zXG5cdGV4cG9ydCBjbGFzcyBMaXRlcmFsIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IodmFsdWUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7bnVtYmVyfHN0cmluZ3xib29sZWFufG51bGx9ICovXG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHR9XG5cdH1cblxuXHQvKiogVGhlIGB0aGlzYCBrZXl3b3JkLiAqL1xuXHRleHBvcnQgY2xhc3MgVGhpc0V4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHsgfVxuXG5cdC8qKiBgWyBlbGVtZW50cyBdYCAqL1xuXHRleHBvcnQgY2xhc3MgQXJyYXlFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoZWxlbWVudHMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8P0V4cHJlc3Npb24+fSAqL1xuXHRcdFx0dGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBQcm9wZXJ0eX0uICovXG5cdGV4cG9ydCBjb25zdCBQcm9wZXJ0eUtpbmQgPSBuZXcgU2V0KFsnaW5pdCcsICdnZXQnLCAnc2V0J10pXG5cdC8qKlxuXHRQYXJ0IG9mIGFuIE9iamVjdEV4cHJlc3Npb24uXG5cdElmIGtpbmQgaXMgJ2dldCcgb3IgJ3NldCcsIHRoZW4gdmFsdWUgc2hvdWxkIGJlIGEgRnVuY3Rpb25FeHByZXNzaW9uLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgUHJvcGVydHkgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihraW5kLCBrZXksIHZhbHVlLCBtZXRob2QpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHR2YWx1ZSA9IGtleVxuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRtZXRob2QgPSBmYWxzZVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtQcm9wZXJ0eUtpbmR9ICovXG5cdFx0XHR0aGlzLmtpbmQgPSBraW5kXG5cdFx0XHQvKiogQHR5cGUge0xpdGVyYWwgfCBJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5rZXkgPSBrZXlcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZVxuXHRcdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdFx0dGhpcy5tZXRob2QgPSBtZXRob2RcblxuXHRcdFx0aWYgKHRoaXMua2luZCAhPT0gJ2luaXQnKSB7XG5cdFx0XHRcdGlmICghKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbkV4cHJlc3Npb24pKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0L3NldCBQcm9wZXJ0eVxcJ3MgdmFsdWUgbXVzdCBiZSBhIEZ1bmN0aW9uRXhwcmVzc2lvbi4nKVxuXHRcdFx0XHRpZiAodGhpcy52YWx1ZS5pZCAhPT0gbnVsbClcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHQnZ2V0L3NldCBQcm9wZXJ0eVxcJ3MgdmFsdWUgbXVzdCBub3QgaGF2ZSBpZDsgJyArXG5cdFx0XHRcdFx0XHQndGhhdCBpcyBzdG9yZWQgaW4gdGhlIGBrZXlgIG9mIHRoZSBQcm9wZXJ0eS4nKVxuXHRcdFx0XHRpZiAodGhpcy52YWx1ZS5nZW5lcmF0b3IpXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQvc2V0IGNhbiBub3QgYmUgYSBnZW5lcmF0b3IuJylcblx0XHRcdH1cblx0XHR9XG5cblx0XHRnZXQgc2hvcnRoYW5kKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWUgPT09IHRoaXMua2V5XG5cdFx0fVxuXHRcdGdldCBjb21wdXRlZCgpIHtcblx0XHRcdHJldHVybiAhKHRoaXMua2V5IGluc3RhbmNlb2YgSWRlbnRpZmllcilcblx0XHR9XG5cdH1cblxuXHQvKiogQW4gb2JqZWN0IGxpdGVyYWwuICovXG5cdGV4cG9ydCBjbGFzcyBPYmplY3RFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IocHJvcGVydGllcykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxQcm9wZXJ0eT59ICovXG5cdFx0XHR0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzXG5cdFx0fVxuXHR9XG5cblx0Ly8gVE9ETzogRXhwcmVzc2lvbiB0b29cblx0LyoqIHtAbGluayBGdW5jdGlvbn0gaW4gZXhwcmVzc2lvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIEZ1bmN0aW9uRXhwcmVzc2lvbiBleHRlbmRzIEZ1bmN0aW9uTm9uQXJyb3cgeyB9XG5cblx0LyoqIExpa2UgRnVuY3Rpb25FeHByZXNzaW9uIGJ1dCB1c2VzIHRoZSBgcGFyYW1zID0+IGJvZHlgIGZvcm0uICovXG5cdC8vIFRPRE86IGV4dGVuZHMgRnVuY3Rpb25BYnN0cmFjdCB0b29cblx0ZXhwb3J0IGNsYXNzIEFycm93RnVuY3Rpb25FeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IocGFyYW1zLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PFBhdHRlcm4+fSAqL1xuXHRcdFx0dGhpcy5wYXJhbXMgPSBwYXJhbXNcblx0XHRcdC8qKiBAdHlwZSB7QmxvY2tTdGF0ZW1lbnQgfCBFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgZXhwcmVzc2lvbnNbMF0sIGV4cHJlc3Npb25zWzFdLCAuLi5gXG5cdEV4cHJlc3Npb24gY29tcG9zZWQgb2Ygb3RoZXIgZXhwcmVzc2lvbnMsIHNlcGFyYXRlZCBieSB0aGUgY29tbWEgb3BlcmF0b3IuXG5cdCpOb3QqIGZvciBwYXJhbWV0ZXIgbGlzdHMuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBTZXF1ZW5jZUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihleHByZXNzaW9ucykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxFeHByZXNzaW9uPn0gKi9cblx0XHRcdHRoaXMuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9uc1xuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgVW5hcnlFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IFVuYXJ5T3BlcmF0b3IgPSBuZXcgU2V0KFsnLScsICcrJywgJyEnLCAnficsICd0eXBlb2YnLCAndm9pZCcsICdkZWxldGUnXSlcblx0LyoqXG5cdGBvcGVyYXRvciBhcmd1bWVudGBcblx0Q2FsbHMgYSB1bmFyeSBvcGVyYXRvci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFVuYXJ5RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yLCBhcmd1bWVudCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtVbmFyeU9wZXJhdG9yfSAqL1xuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cblx0XHQvKiogQWx3YXlzIHRydWUuIE5lZWRlZCBmb3IgY29tcGFyaWJpbGl0eSB3aXRoIGVzdHJlZS4gKi9cblx0XHRnZXQgcHJlZml4KCkge1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIEJpbmFyeUV4cHJlc3Npb259LiAqL1xuXHRleHBvcnQgY29uc3QgQmluYXJ5T3BlcmF0b3IgPSBuZXcgU2V0KFtcblx0XHQnPT0nLCAnIT0nLCAnPT09JywgJyE9PScsXG5cdFx0JzwnLCAnPD0nLCAnPicsICc+PScsXG5cdFx0Jzw8JywgJz4+JywgJz4+PicsXG5cdFx0JysnLCAnLScsICcqJywgJy8nLCAnJScsXG5cdFx0J3wnLCAnXicsICcmJywgJ2luJyxcblx0XHQnaW5zdGFuY2VvZiddKVxuXHQvKipcblx0YGxlZnQgb3BlcmF0b3IgcmlnaHRgXG5cdENhbGxzIGEgYmluYXJ5IG9wZXJhdG9yLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgQmluYXJ5RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yLCBsZWZ0LCByaWdodCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtCaW5hcnlPcGVyYXRvcn0gKi9cblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBBc3NpZ25tZW50RXhwcmVzc2lvbn0uICovXG5cdGV4cG9ydCBjb25zdCBBc3NpZ25tZW50T3BlcmF0b3IgPSBuZXcgU2V0KFtcblx0XHQnPScsICcrPScsICctPScsICcqPScsICcvPScsICclPScsXG5cdFx0Jzw8PScsICc+Pj0nLCAnPj4+PScsXG5cdFx0J3w9JywgJ149JywgJyY9J1xuXHRdKVxuXHQvKipcblx0YGxlZnQgb3BlcmF0b3IgcmlnaHRgXG5cdE11dGF0ZXMgYW4gZXhpc3RpbmcgdmFyaWFibGUuXG5cdERvIG5vdCBjb25mdXNlIHdpdGggVmFyaWFibGVEZWNsYXJhdGlvbi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEFzc2lnbm1lbnRFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob3BlcmF0b3IsIGxlZnQsIHJpZ2h0KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0Fzc2lnbm1lbnRPcGVyYXRvcn0gKi9cblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0LyoqIEB0eXBlIHtQYXR0ZXJufSAqL1xuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBVcGRhdGVFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IFVwZGF0ZU9wZXJhdG9yID0gbmV3IFNldChbJysrJywgJy0tJ10pXG5cdC8qKlxuXHRgKythcmd1bWVudGAgb3IgYGFyZ3VtZW50KytgXG5cdEluY3JlbWVudHMgb3IgZGVjcmVtZW50cyBhIG51bWJlci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFVwZGF0ZUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciwgYXJndW1lbnQsIHByZWZpeCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtVcGRhdGVPcGVyYXRvcn0gKi9cblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLnByZWZpeCA9IHByZWZpeFxuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgTG9naWNhbEV4cHJlc3Npb259LiAqL1xuXHRleHBvcnQgY29uc3QgTG9naWNhbE9wZXJhdG9yID0gbmV3IFNldChbJ3x8JywgJyYmJ10pXG5cdC8qKlxuXHRgbGVmdCBvcGVyYXRvciByaWdodGBcblx0Q2FsbHMgYSBsYXp5IGxvZ2ljYWwgb3BlcmF0b3IuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBMb2dpY2FsRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yLCBsZWZ0LCByaWdodCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtMb2dpY2FsT3BlcmF0b3J9ICovXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdH1cblx0fVxuXG5cdC8qKiBgdGVzdCA/IGNvbnNlcXVlbnQgOiBhbHRlcm5hdGVgICovXG5cdGV4cG9ydCBjbGFzcyBDb25kaXRpb25hbEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3Rvcih0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuY29uc2VxdWVudCA9IGNvbnNlcXVlbnRcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYWx0ZXJuYXRlID0gYWx0ZXJuYXRlXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdGBuZXcgY2FsbGVlKGFyZ3VtZW50cylgXG5cdEp1c3QgbGlrZSB7QGxpbmsgQ2FsbEV4cHJlc3Npb259IGJ1dCB3aXRoIGBuZXdgIGluIGZyb250LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgTmV3RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKGNhbGxlZSwgX2FyZ3VtZW50cykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5jYWxsZWUgPSBjYWxsZWVcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8RXhwcmVzc2lvbj59ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50cyA9IF9hcmd1bWVudHNcblx0XHR9XG5cdH1cblxuXHQvKiogYGNhbGxlZShhcmd1bWVudHMpYCAqL1xuXHRleHBvcnQgY2xhc3MgQ2FsbEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihjYWxsZWUsIF9hcmd1bWVudHMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuY2FsbGVlID0gY2FsbGVlXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PEV4cHJlc3Npb24+fSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudHMgPSBfYXJndW1lbnRzXG5cdFx0fVxuXHR9XG5cdC8qKiBgLi4uYXJnc2AgaW4gYSBDYWxsRXhwcmVzc2lvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIFNwcmVhZEVsZW1lbnQgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdElmIGNvbXB1dGVkID09PSB0cnVlLCBgb2JqZWN0W3Byb3BlcnR5XWAuXG5cdEVsc2UsIGBvYmplY3QucHJvcGVydHlgIC0tIG1lYW5pbmcgcHJvcGVydHkgc2hvdWxkIGJlIGFuIElkZW50aWZpZXIuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBNZW1iZXJFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob2JqZWN0LCBwcm9wZXJ0eSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5vYmplY3QgPSBvYmplY3Rcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eVxuXHRcdH1cblxuXHRcdC8qKiBOZWVkZWQgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBlc3RyZWUuICovXG5cdFx0Z2V0IGNvbXB1dGVkKCkge1xuXHRcdFx0cmV0dXJuICEodGhpcy5wcm9wZXJ0eSBpbnN0YW5jZW9mIElkZW50aWZpZXIpXG5cdFx0fVxuXHR9XG5cblx0LyoqIGB5aWVsZCBhcmd1bWVudGAgb3IgYHlpZWxkKiBhcmd1bWVudGAgKi9cblx0ZXhwb3J0IGNsYXNzIFlpZWxkRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKGFyZ3VtZW50LCBkZWxlZ2F0ZSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlXG5cblx0XHRcdGlmICh0aGlzLmRlbGVnYXRlICYmIHRoaXMuYXJndW1lbnQgPT09IG51bGwpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCB5aWVsZCogd2l0aG91dCBhcmd1bWVudC4nKVxuXHRcdH1cblx0fVxuXG5cdC8vIFRlbXBsYXRlc1xuXHRcdC8qKlxuXHRcdEEgdGVtcGxhdGUgd2l0aCBubyB0YWcuXG5cdFx0SXQgYWx0ZXJuYXRlcyBiZXR3ZWVuIHF1YXNpcyBhbmQgZXhwcmVzc2lvbnMuXG5cdFx0SXQgc2hvdWxkIGJlZ2luIGFuZCBlbmQgd2l0aCBxdWFzaXMsIHVzaW5nIHtAbGluayBUZW1wbGF0ZUVsZW1lbnQuZW1wdHl9IGlmIG5lY2Vzc2FyeS5cblx0XHRUaGlzIG1lYW5zIHRoYXQgYCR7MX0kezJ9YCBoYXMgMyBlbXB0eSBxdWFzaXMhXG5cdFx0Ki9cblx0XHRleHBvcnQgY2xhc3MgVGVtcGxhdGVMaXRlcmFsIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0XHRjb25zdHJ1Y3RvcihxdWFzaXMsIGV4cHJlc3Npb25zKSB7XG5cdFx0XHRcdHN1cGVyKClcblx0XHRcdFx0LyoqIEB0eXBlIHtBcnJheTxUZW1wbGF0ZUVsZW1lbnQ+fSAqL1xuXHRcdFx0XHR0aGlzLnF1YXNpcyA9IHF1YXNpc1xuXHRcdFx0XHQvKiogQHR5cGUge0FycmF5PEV4cHJlc3Npb24+fSAqL1xuXHRcdFx0XHR0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnNcblx0XHRcdFx0aWYgKHRoaXMucXVhc2lzLmxlbmd0aCAhPT0gdGhpcy5leHByZXNzaW9ucy5sZW5ndGggKyAxKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdCdUaGVyZSBtdXN0IGJlIDEgbW9yZSBxdWFzaSB0aGFuIGV4cHJlc3Npb25zLlxcbicgK1xuXHRcdFx0XHRcdFx0J01heWJlIHlvdSBuZWVkIHRvIGFkZCBhbiBlbXB0eSBxdWFzaSB0byB0aGUgZnJvbnQgb3IgZW5kLicpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqIFBhcnQgb2YgYSBUZW1wbGF0ZUxpdGVyYWwuICovXG5cdFx0ZXhwb3J0IGNsYXNzIFRlbXBsYXRlRWxlbWVudCBleHRlbmRzIE5vZGUge1xuXHRcdFx0LyoqXG5cdFx0XHRUZW1wbGF0ZUVsZW1lbnQgd2hvc2UgcmF3IHNvdXJjZSBpcyBgc3RyYC5cblx0XHRcdEBwYXJhbSB7c3RyaW5nfSBzdHJcblx0XHRcdCovXG5cdFx0XHRzdGF0aWMgZm9yUmF3U3RyaW5nKHN0cikge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFRlbXBsYXRlRWxlbWVudChmYWxzZSwge1xuXHRcdFx0XHRcdC8vIFRPRE86IEEgd2F5IHRvIGNhbGN1bGF0ZSB0aGlzP1xuXHRcdFx0XHRcdGNvb2tlZDogbnVsbCxcblx0XHRcdFx0XHRyYXc6IHN0clxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdFRlbXBsYXRlRWxlbWVudCBldmFsdWF0aW5nIHRvIGBzdHJgLlxuXHRcdFx0VXNlcyBlc2NhcGUgc2VxdWVuY2VzIGFzIG5lY2Vzc2FyeS5cblx0XHRcdEBwYXJhbSB7c3RyaW5nfSBzdHJcblx0XHRcdCovXG5cdFx0XHRzdGF0aWMgZm9yU3RyaW5nKHN0cikge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFRlbXBsYXRlRWxlbWVudChmYWxzZSwge1xuXHRcdFx0XHRcdGNvb2tlZDogc3RyLFxuXHRcdFx0XHRcdHJhdzogZXNjYXBlU3RyaW5nRm9yVGVtcGxhdGUoc3RyKVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXG5cdFx0XHQvKiogVGVtcGxhdGVFbGVtZW50IHdpdGggZW1wdHkgdmFsdWUuICovXG5cdFx0XHRzdGF0aWMgZ2V0IGVtcHR5KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5mb3JTdHJpbmcoJycpXG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0cnVjdG9yKHRhaWwsIHZhbHVlKSB7XG5cdFx0XHRcdHN1cGVyKClcblx0XHRcdFx0LyoqXG5cdFx0XHRcdFVzZSB0aGlzIHRvIG1hcmsgdGhlIGxhc3QgVGVtcGxhdGVFbGVtZW50LlxuXHRcdFx0XHRAdHlwZSB7Ym9vbGVhbn1cblx0XHRcdFx0Ki9cblx0XHRcdFx0dGhpcy50YWlsID0gdGFpbFxuXHRcdFx0XHQvKiogQHR5cGUge3tjb29rZWQ6IHN0cmluZywgcmF3OiBzdHJpbmd9fSAqL1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdFxuXHRcdFx0ZXNjYXBlU3RyaW5nRm9yVGVtcGxhdGUgPSBzdHIgPT5cblx0XHRcdFx0c3RyLnJlcGxhY2UoL1t7XFxcXGBcXG5cXHRcXGJcXGZcXHZcXHJcXHUyMDI4XFx1MjAyOV0vZywgY2ggPT4gdGVtcGxhdGVFc2NhcGVzW2NoXSksXG5cdFx0XHR0ZW1wbGF0ZUVzY2FwZXMgPSB7XG5cdFx0XHRcdC8vIE5lZWQgdG8gbWFrZSBzdXJlIFwiJHtcIiBpcyBlc2NhcGVkLlxuXHRcdFx0XHQneyc6ICdcXFxceycsXG5cdFx0XHRcdCdgJzogJ1xcXFxgJyxcblx0XHRcdFx0J1xcXFwnOiAnXFxcXFxcXFwnLFxuXHRcdFx0XHQnXFxuJzogJ1xcXFxuJyxcblx0XHRcdFx0J1xcdCc6ICdcXFxcdCcsXG5cdFx0XHRcdCdcXGInOiAnXFxcXGInLFxuXHRcdFx0XHQnXFxmJzogJ1xcXFxmJyxcblx0XHRcdFx0J1xcdic6ICdcXFxcdicsXG5cdFx0XHRcdCdcXHInOiAnXFxcXHInLFxuXHRcdFx0XHQnXFx1MjAyOCc6ICdcXFxcdTIwMjgnLFxuXHRcdFx0XHQnXFx1MjAyOSc6ICdcXFxcdTIwMjknXG5cdFx0XHR9XG5cblx0XHQvKiogVGVtcGxhdGVMaXRlcmFsIHdpdGggYSB0YWcgaW4gZnJvbnQsIGxpa2VgdGhpc2AuICovXG5cdFx0ZXhwb3J0IGNsYXNzIFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdFx0Y29uc3RydWN0b3IodGFnLCBxdWFzaSkge1xuXHRcdFx0XHRzdXBlcigpXG5cdFx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdFx0dGhpcy50YWcgPSB0YWdcblx0XHRcdFx0LyoqIEB0eXBlIHtUZW1wbGF0ZUxpdGVyYWx9ICovXG5cdFx0XHRcdHRoaXMucXVhc2kgPSBxdWFzaVxuXHRcdFx0fVxuXHRcdH1cblxuLy8gUGF0dGVybnNcblx0LyoqXG5cdGB7IGEsIGI6IGMgfSA9YFxuXHRPYmplY3QgZGVjb25zdHJ1Y3RpbmcgcGF0dGVybi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIE9iamVjdFBhdHRlcm4gZXh0ZW5kcyBQYXR0ZXJuIHtcblx0XHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PEFzc2lnbm1lbnRQcm9wZXJ0eT59ICovXG5cdFx0XHR0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdEp1c3QgbGlrZSBhIFByb3BlcnR5LCBidXQga2luZCBpcyBhbHdheXMgYGluaXRgLlxuXHRBbHRob3VnaCB0ZWNobmljYWxseSBpdHMgb3duIHR5cGUsIGBfLnR5cGVgIHdpbGwgYmUgJ1Byb3BlcnR5Jy5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEFzc2lnbm1lbnRQcm9wZXJ0eSBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGtleSwgdmFsdWUpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHR2YWx1ZSA9IGtleVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5rZXkgPSBrZXlcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZVxuXHRcdH1cblxuXHRcdGdldCB0eXBlKCkgeyByZXR1cm4gJ1Byb3BlcnR5JyB9XG5cdFx0Z2V0IGtpbmQoKSB7IHJldHVybiAnaW5pdCcgfVxuXHRcdGdldCBtZXRob2QoKSB7IHJldHVybiBmYWxzZSB9XG5cdFx0Z2V0IHNob3J0aGFuZCgpIHtcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlID09PSB0aGlzLmtleVxuXHRcdH1cblx0XHRnZXQgY29tcHV0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gISh0aGlzLmtleSBpbnN0YW5jZW9mIElkZW50aWZpZXIpXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdGBbIGEsIGIgXSA9IC4uLmAuXG5cdEFycmF5IGRlY29uc3RydWN0aW5nIHBhdHRlcm4uXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBBcnJheVBhdHRlcm4gZXh0ZW5kcyBQYXR0ZXJuIHtcblx0XHRjb25zdHJ1Y3RvcihlbGVtZW50cykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTw/UGF0dGVybj59ICovXG5cdFx0XHR0aGlzLmVsZW1lbnRzID0gZWxlbWVudHNcblx0XHR9XG5cdH1cblxuXHQvKipcblx0Q2FuIGJlIHRoZSBsYXN0IGFyZ3VtZW50IHRvIGEgRnVuY3Rpb25FeHByZXNzaW9uL0Z1bmN0aW9uRGVjbGFyYXRpb25cblx0b3IgIGdvIGF0IHRoZSBlbmQgb2YgYW4gQXJyYXlQYXR0ZXJuLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgUmVzdEVsZW1lbnQgZXh0ZW5kcyBQYXR0ZXJuIHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtQYXR0ZXJufSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0fVxuXHR9XG5cbi8vIENsYXNzZXNcblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBNZXRob2REZWZpbml0aW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IE1ldGhvZERlZmluaXRpb25LaW5kID0gbmV3IFNldChbJ2NvbnN0cnVjdG9yJywgJ21ldGhvZCcsICdnZXQnLCAnc2V0J10pXG5cdC8qKiBQYXJ0IG9mIGEge0BsaW5rIENsYXNzQm9keX0uICovXG5cdGV4cG9ydCBjbGFzcyBNZXRob2REZWZpbml0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0LyoqIEBwYXJhbSB7RnVuY3Rpb25FeHByZXNzaW9ufSB2YWx1ZSAqL1xuXHRcdHN0YXRpYyBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIG5ldyBNZXRob2REZWZpbml0aW9uKG5ldyBJZGVudGlmaWVyKCdjb25zdHJ1Y3RvcicpLCB2YWx1ZSwgJ2NvbnN0cnVjdG9yJylcblx0XHR9XG5cblx0XHRjb25zdHJ1Y3RvcihrZXksIHZhbHVlLCBraW5kLCBfc3RhdGljLCBjb21wdXRlZCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKF9zdGF0aWMgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0X3N0YXRpYyA9IGZhbHNlXG5cdFx0XHRpZiAoY29tcHV0ZWQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Y29tcHV0ZWQgPSBmYWxzZVxuXHRcdFx0aWYgKGtpbmQgPT09ICdjb25zdHJ1Y3RvcicgJiYgIShcblx0XHRcdFx0a2V5IGluc3RhbmNlb2YgSWRlbnRpZmllciAgJiYga2V5Lm5hbWUgPT09ICdjb25zdHJ1Y3RvcicgJiYgIV9zdGF0aWMgJiYgIWNvbXB1dGVkKSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdCdDb25zdHJ1Y3RvciBtZXRob2Qgc2hvdWxkIGNyZWF0ZWQgd2l0aCBgTWV0aG9kRGVmaW5pdGlvbi5jb25zdHJ1Y3RvcmAuJylcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllciB8IExpdGVyYWx9ICovXG5cdFx0XHR0aGlzLmtleSA9IGtleVxuXHRcdFx0LyoqIEB0eXBlIHtGdW5jdGlvbkV4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHRcdC8qKiBAdHlwZSB7TWV0aG9kRGVmaW5pdGlvbktpbmR9ICovXG5cdFx0XHR0aGlzLmtpbmQgPSBraW5kXG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLnN0YXRpYyA9IF9zdGF0aWNcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMuY29tcHV0ZWQgPSBjb21wdXRlZFxuXG5cdFx0XHRpZiAodmFsdWUuaWQgIT09IG51bGwpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHQnTWV0aG9kRGVmaW5pdGlvbiB2YWx1ZSBzaG91bGQgbm90IGhhdmUgaWQ7IHRoYXQgaXMgaGFuZGxlZCBieSBga2V5YC4nKVxuXHRcdH1cblx0fVxuXG5cdC8qKiBDb250ZW50cyBvZiBhIHtAbGluayBDbGFzc30uICovXG5cdGV4cG9ydCBjbGFzcyBDbGFzc0JvZHkgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3Rvcihib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PE1ldGhvZERlZmluaXRpb24+fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiB7QGxpbmsgQ2xhc3NEZWNsYXJhdGlvbn0gfCB7QGxpbmsgQ2xhc3NFeHByZXNzaW9ufSAqL1xuXHRleHBvcnQgY2xhc3MgQ2xhc3MgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8vIFRPRE86IGV4dGVuZHMgRGVjbGFyYXRpb24gdG9vXG5cdC8qKiB7QGxpbmsgQ2xhc3N9IGluIGRlY2xhcmF0aW9uIHBvc2l0aW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgQ2xhc3NEZWNsYXJhdGlvbiBleHRlbmRzIENsYXNzIHtcblx0XHRjb25zdHJ1Y3RvcihpZCwgc3VwZXJDbGFzcywgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5pZCA9IGlkXG5cdFx0XHQvKiogQHR5cGUgez9FeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5zdXBlckNsYXNzID0gc3VwZXJDbGFzc1xuXHRcdFx0LyoqIEB0eXBlIHtDbGFzc0JvZHl9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIHtAbGluayBDbGFzc30gaW4gZXhwcmVzc2lvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIENsYXNzRXhwcmVzc2lvbiBleHRlbmRzIENsYXNzIHtcblx0XHRjb25zdHJ1Y3RvcihpZCwgc3VwZXJDbGFzcywgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMuaWQgPSBpZFxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3Ncblx0XHRcdC8qKiBAdHlwZSB7Q2xhc3NCb2R5fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG4vLyBNb2R1bGVzXG5cdC8qKiBBIHNwZWNpZmllciBpbiBhbiBpbXBvcnQgb3IgZXhwb3J0IGRlY2xhcmF0aW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgTW9kdWxlU3BlY2lmaWVyIGV4dGVuZHMgTm9kZSB7IH1cblxuXHQvKipcblx0e0BsaW5rIEltcG9ydFNwZWNpZmllcn0gfCB7QGxpbmsgSW1wb3J0RGVmYXVsdFNwZWNpZmllcn0gfCB7QGxpbmsgSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyfVxuXHQqL1xuXHRleHBvcnQgY2xhc3MgSW1wb3J0U3BlY2lmaWVyQWJzdHJhY3QgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHRgaW1wb3J0IHNwZWNpZmllcnMgZnJvbSBzb3VyY2VgXG5cdE9ubHkgb25lIHNwZWNpZmllciBtYXkgYmUgYSBJbXBvcnREZWZhdWx0U3BlY2lmaWVyLlxuXHRJZiB0aGVyZSBpcyBhbiBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIsIGl0IG11c3QgYmUgdGhlIG9ubHkgc3BlY2lmaWVyLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgSW1wb3J0RGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihzcGVjaWZpZXJzLCBzb3VyY2UpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8SW1wb3J0U3BlY2lmaWVyQWJzdHJhY3Q+fSAqL1xuXHRcdFx0dGhpcy5zcGVjaWZpZXJzID0gc3BlY2lmaWVyc1xuXHRcdFx0LyoqIEB0eXBlIHtMaXRlcmFsPHN0cmluZz59ICovXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRBIG5vbi1kZWZhdWx0IGltcG9ydC4gVXNlZCBpbiBhbiBJbXBvcnREZWNsYXJhdGlvbi5cblx0Rm9yIGBpbXBvcnQgeyBhIH0gZnJvbSBcInNvdXJjZVwiYCwganVzdCBwYXNzIG9uZSBhcmd1bWVudCBhbmQgbG9jYWwgd2lsbCA9IGltcG9ydGVkLlxuXHRGb3IgYGltcG9ydCB7IGEgYXMgYiB9IGZyb20gXCJzb3VyY2VcImAsIG1ha2UgaW1wb3J0ZWQgYGFgIGFuZCBsb2NhbCBgYmAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnRTcGVjaWZpZXIgZXh0ZW5kcyBNb2R1bGVTcGVjaWZpZXIge1xuXHRcdGNvbnN0cnVjdG9yKGltcG9ydGVkLCBsb2NhbCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxvY2FsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxvY2FsID0gaW1wb3J0ZWRcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMuaW1wb3J0ZWQgPSBpbXBvcnRlZFxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5sb2NhbCA9IGxvY2FsXG5cdFx0fVxuXHR9XG5cblx0LyoqIFRoZSBkZWZhdWx0IGV4cG9ydCwgYXMgaW4gYGltcG9ydCBhIGZyb20gXCJzb3VyY2VcImAuICovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnREZWZhdWx0U3BlY2lmaWVyIGV4dGVuZHMgSW1wb3J0U3BlY2lmaWVyQWJzdHJhY3Qge1xuXHRcdGNvbnN0cnVjdG9yKGxvY2FsKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKiogT2JqZWN0IG9mIGV2ZXJ5IGV4cG9ydCwgYXMgaW4gYGltcG9ydCAqIGFzIGEgZnJvbSBcInNvdXJjZVwiYC4gKi9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllciBleHRlbmRzIEltcG9ydFNwZWNpZmllckFic3RyYWN0IHtcblx0XHRjb25zdHJ1Y3Rvcihsb2NhbCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5sb2NhbCA9IGxvY2FsXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdEEgbm9uLWRlZmF1bHQgZXhwb3J0LiBVc2VkIGluIGFuIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24uXG5cdEZvciBgZXhwb3J0IHsgYSB9IGZyb20gXCJzb3VyY2VcImAsIGp1c3QgcGFzcyBvbmUgYXJndW1lbnQgbG9jYWwgd2lsbCA9IGV4cG9ydGVkLlxuXHRGb3IgYGV4cG9ydCB7IGEgYXMgYiB9YCwgbWFrZSBleHBvcnRlZCBgYmAgYW5kIGxvY2FsIGBhYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cG9ydFNwZWNpZmllciBleHRlbmRzIE1vZHVsZVNwZWNpZmllciB7XG5cdFx0Y29uc3RydWN0b3IoZXhwb3J0ZWQsIGxvY2FsKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAobG9jYWwgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0bG9jYWwgPSBleHBvcnRlZFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5leHBvcnRlZCA9IGV4cG9ydGVkXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0RXhwb3J0cyBtdWx0aXBsZSB2YWx1ZXMgYXMgaW4gYGV4cG9ydCB7IGEsIGIgYXMgYyB9YC5cblx0SWYgc291cmNlICE9PSBudWxsLFxuXHRyZS1leHBvcnRzIGZyb20gdGhhdCBtb2R1bGUgYXMgaW4gYGV4cG9ydCB7IC4uLiB9IGZyb20gXCJzb3VyY2VcImAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnROYW1lZERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoZGVjbGFyYXRpb24sIHNwZWNpZmllcnMsIHNvdXJjZSkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJndW1lbnRzXG5cdFx0XHRpZiAoc3BlY2lmaWVycyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRzcGVjaWZpZXJzID0gW11cblx0XHRcdGlmIChzb3VyY2UgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0c291cmNlID0gbnVsbFxuXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez9EZWNsYXJhdGlvbn0gKi9cblx0XHRcdHRoaXMuZGVjbGFyYXRpb24gPSBkZWNsYXJhdGlvblxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxFeHBvcnRTcGVjaWZpZXI+fSAqL1xuXHRcdFx0dGhpcy5zcGVjaWZpZXJzID0gc3BlY2lmaWVyc1xuXHRcdFx0LyoqIEB0eXBlIHs/TGl0ZXJhbDxzdHJpbmc+fSAqL1xuXHRcdFx0dGhpcy5zb3VyY2UgPSBzb3VyY2VcblxuXHRcdFx0aWYgKGRlY2xhcmF0aW9uICE9PSBudWxsICYmICEoc3BlY2lmaWVycy5sZW5ndGggPT09IDAgJiYgc291cmNlID09PSBudWxsKSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEZWNsYXJhdGlvbiBjYW4gbm90IGJlIGNvbWJpbmVkIHdpdGggc3BlY2lmaWVycy9zb3VyY2UuJylcblx0XHR9XG5cdH1cblxuXHQvKiogYGV4cG9ydCBkZWZhdWx0IGRlY2xhcmF0aW9uYCAqL1xuXHRleHBvcnQgY2xhc3MgRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoZGVjbGFyYXRpb24pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RGVjbGFyYXRpb24gfCBFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbiA9IGRlY2xhcmF0aW9uXG5cdFx0fVxuXHR9XG5cblx0LyoqIGBleHBvcnQgKiBmcm9tIHNvdXJjZWAgKi9cblx0ZXhwb3J0IGNsYXNzIEV4cG9ydEFsbERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3Ioc291cmNlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0xpdGVyYWw8c3RyaW5nPn0gKi9cblx0XHRcdHRoaXMuc291cmNlID0gc291cmNlXG5cdFx0fVxuXHR9XG4iXX0=