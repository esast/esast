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
			} else if (this.method) {
				if (!(this.value instanceof FunctionExpression)) throw new Error('method Property\'s value must be a FunctionExpression.');
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQUNhLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBQUosSUFBSSxHQUFKLElBQUk7O09BOEJILFdBQVc7O1NBQVgsV0FBVyxHQUFYLFdBQVc7O09BR1gsU0FBUzs7U0FBVCxTQUFTLEdBQVQsU0FBUzs7T0FNVCxVQUFVOztTQUFWLFVBQVUsR0FBVixVQUFVOztPQUtWLE9BQU87O1NBQVAsT0FBTyxHQUFQLE9BQU87O09BR1IsT0FBTzs7Ozs7Ozs7U0FBUCxPQUFPLEdBQVAsT0FBTzs7T0FlTixVQUFVOzs7Ozs7OztTQUFWLFVBQVUsR0FBVixVQUFVOztPQVNWLGtCQUFrQjs7Ozs7Ozs7OztTQUFsQixrQkFBa0IsR0FBbEIsa0JBQWtCO09BY2xCLHVCQUF1QixXQUF2Qix1QkFBdUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7O09BSzFELG1CQUFtQjs7Ozs7Ozs7OztTQUFuQixtQkFBbUIsR0FBbkIsbUJBQW1COztPQWtCbkIsY0FBYzs7U0FBZCxjQUFjLEdBQWQsY0FBYzs7T0FHZCxjQUFjOzs7Ozs7OztTQUFkLGNBQWMsR0FBZCxjQUFjOztPQVlkLG1CQUFtQjs7Ozs7Ozs7U0FBbkIsbUJBQW1CLEdBQW5CLG1CQUFtQjs7T0FTbkIsV0FBVzs7Ozs7Ozs7Ozs7U0FBWCxXQUFXLEdBQVgsV0FBVzs7T0FnQlgsZ0JBQWdCOzs7Ozs7Ozs7U0FBaEIsZ0JBQWdCLEdBQWhCLGdCQUFnQjs7T0FVaEIsY0FBYzs7Ozs7Ozs7O1NBQWQsY0FBYyxHQUFkLGNBQWM7O09BYWQsaUJBQWlCOzs7Ozs7Ozs7U0FBakIsaUJBQWlCLEdBQWpCLGlCQUFpQjs7T0FlakIsZUFBZTs7Ozs7Ozs7O1NBQWYsZUFBZSxHQUFmLGVBQWU7O09BYWYsVUFBVTs7Ozs7Ozs7OztTQUFWLFVBQVUsR0FBVixVQUFVOztPQWNWLGVBQWU7Ozs7Ozs7OztTQUFmLGVBQWUsR0FBZixlQUFlOztPQWVmLGNBQWM7Ozs7Ozs7O1NBQWQsY0FBYyxHQUFkLGNBQWM7O09BWWQsWUFBWTs7Ozs7Ozs7Ozs7O1NBQVosWUFBWSxHQUFaLFlBQVk7O09BaUJaLFdBQVc7Ozs7Ozs7OztTQUFYLFdBQVcsR0FBWCxXQUFXOztPQVdYLGNBQWM7Ozs7Ozs7OztTQUFkLGNBQWMsR0FBZCxjQUFjOztPQVdkLGdCQUFnQjs7Ozs7Ozs7O1NBQWhCLGdCQUFnQixHQUFoQixnQkFBZ0I7O09BY2hCLFlBQVk7Ozs7Ozs7Ozs7O1NBQVosWUFBWSxHQUFaLFlBQVk7O09BZVosY0FBYzs7Ozs7Ozs7OztTQUFkLGNBQWMsR0FBZCxjQUFjOztPQWFkLGNBQWM7Ozs7Ozs7Ozs7U0FBZCxjQUFjLEdBQWQsY0FBYzs7T0FhZCxpQkFBaUI7O1NBQWpCLGlCQUFpQixHQUFqQixpQkFBaUI7O09BSWpCLGdCQUFnQjs7U0FBaEIsZ0JBQWdCLEdBQWhCLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7T0FxQmhCLG1CQUFtQjs7U0FBbkIsbUJBQW1CLEdBQW5CLG1CQUFtQjs7T0FHbkIsT0FBTzs7Ozs7Ozs7U0FBUCxPQUFPLEdBQVAsT0FBTzs7T0FTUCxjQUFjOztTQUFkLGNBQWMsR0FBZCxjQUFjOztPQUdkLGVBQWU7Ozs7Ozs7O1NBQWYsZUFBZSxHQUFmLGVBQWU7T0FTZixZQUFZLFdBQVosWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzs7T0FFOUMsUUFBUTs7T0FDRyxLQUFLLHlEQUFDLEdBQUc7T0FBRSxRQUFRLHlEQUFDLEVBQUUsR0FBRyxZQUFZLFVBQVUsQ0FBQSxBQUFDO09BQUUsTUFBTSx5REFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FEekUsUUFBUSxHQUFSLFFBQVE7O09BcUNSLGdCQUFnQjs7Ozs7Ozs7U0FBaEIsZ0JBQWdCLEdBQWhCLGdCQUFnQjs7T0FVaEIsa0JBQWtCOztTQUFsQixrQkFBa0IsR0FBbEIsa0JBQWtCOztPQUlsQix1QkFBdUI7Ozs7Ozs7OztTQUF2Qix1QkFBdUIsR0FBdkIsdUJBQXVCOztPQWV2QixrQkFBa0I7Ozs7Ozs7O1NBQWxCLGtCQUFrQixHQUFsQixrQkFBa0I7T0FTbEIsYUFBYSxXQUFiLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztPQUt6RSxlQUFlOzs7Ozs7Ozs7Ozs7O1NBQWYsZUFBZSxHQUFmLGVBQWU7T0FnQmYsY0FBYyxXQUFkLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUNyQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQ3hCLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFDcEIsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQ2pCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQ3ZCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFDbkIsWUFBWSxDQUFDLENBQUM7O09BS0YsZ0JBQWdCOzs7Ozs7Ozs7O1NBQWhCLGdCQUFnQixHQUFoQixnQkFBZ0I7T0FhaEIsa0JBQWtCLFdBQWxCLGtCQUFrQixHQUFHLElBQUksR0FBRyxDQUFDLENBQ3pDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUNqQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFDcEIsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQ2hCLENBQUM7O09BTVcsb0JBQW9COzs7Ozs7Ozs7O1NBQXBCLG9CQUFvQixHQUFwQixvQkFBb0I7T0FhcEIsY0FBYyxXQUFkLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7T0FLdEMsZ0JBQWdCOzs7Ozs7Ozs7O1NBQWhCLGdCQUFnQixHQUFoQixnQkFBZ0I7T0FhaEIsZUFBZSxXQUFmLGVBQWUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7T0FLdkMsaUJBQWlCOzs7Ozs7Ozs7O1NBQWpCLGlCQUFpQixHQUFqQixpQkFBaUI7O09BYWpCLHFCQUFxQjs7Ozs7Ozs7OztTQUFyQixxQkFBcUIsR0FBckIscUJBQXFCOztPQWdCckIsYUFBYTs7Ozs7Ozs7O1NBQWIsYUFBYSxHQUFiLGFBQWE7O09BV2IsY0FBYzs7Ozs7Ozs7O1NBQWQsY0FBYyxHQUFkLGNBQWM7O09BVWQsYUFBYTs7Ozs7Ozs7U0FBYixhQUFhLEdBQWIsYUFBYTs7T0FZYixnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7U0FBaEIsZ0JBQWdCLEdBQWhCLGdCQUFnQjs7T0FnQmhCLGVBQWU7Ozs7Ozs7Ozs7U0FBZixlQUFlLEdBQWYsZUFBZTs7T0FvQmQsZUFBZTs7Ozs7Ozs7OztTQUFmLGVBQWUsR0FBZixlQUFlOztPQWVmLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUFmLGVBQWUsR0FBZixlQUFlOzs7Ozs7Ozs7Ozs7Ozs7OztPQTZEZix3QkFBd0I7Ozs7Ozs7OztTQUF4Qix3QkFBd0IsR0FBeEIsd0JBQXdCOztPQWV6QixhQUFhOzs7Ozs7OztTQUFiLGFBQWEsR0FBYixhQUFhOztPQVliLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBQWxCLGtCQUFrQixHQUFsQixrQkFBa0I7O09BMkJsQixZQUFZOzs7Ozs7OztTQUFaLFlBQVksR0FBWixZQUFZOztPQVlaLFdBQVc7Ozs7Ozs7O1NBQVgsV0FBVyxHQUFYLFdBQVc7T0FVWCxvQkFBb0IsV0FBcEIsb0JBQW9CLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzs7T0FFdkUsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUFoQixnQkFBZ0IsR0FBaEIsZ0JBQWdCOztPQW1DaEIsU0FBUzs7Ozs7Ozs7U0FBVCxTQUFTLEdBQVQsU0FBUzs7T0FTVCxLQUFLOztTQUFMLEtBQUssR0FBTCxLQUFLOztPQUlMLGdCQUFnQjs7Ozs7Ozs7OztTQUFoQixnQkFBZ0IsR0FBaEIsZ0JBQWdCOztPQWFoQixlQUFlOzs7Ozs7Ozs7O1NBQWYsZUFBZSxHQUFmLGVBQWU7O09BY2YsZUFBZTs7U0FBZixlQUFlLEdBQWYsZUFBZTs7T0FLZix1QkFBdUI7O1NBQXZCLHVCQUF1QixHQUF2Qix1QkFBdUI7O09BT3ZCLGlCQUFpQjs7Ozs7Ozs7O1NBQWpCLGlCQUFpQixHQUFqQixpQkFBaUI7O09BZWpCLGVBQWU7Ozs7Ozs7Ozs7U0FBZixlQUFlLEdBQWYsZUFBZTs7T0FjZixzQkFBc0I7Ozs7Ozs7O1NBQXRCLHNCQUFzQixHQUF0QixzQkFBc0I7O09BU3RCLHdCQUF3Qjs7Ozs7Ozs7U0FBeEIsd0JBQXdCLEdBQXhCLHdCQUF3Qjs7T0FheEIsZUFBZTs7Ozs7Ozs7OztTQUFmLGVBQWUsR0FBZixlQUFlOztPQWtCZixzQkFBc0I7Ozs7Ozs7Ozs7Ozs7U0FBdEIsc0JBQXNCLEdBQXRCLHNCQUFzQjs7T0FzQnRCLHdCQUF3Qjs7Ozs7Ozs7U0FBeEIsd0JBQXdCLEdBQXhCLHdCQUF3Qjs7T0FTeEIsb0JBQW9COzs7Ozs7OztTQUFwQixvQkFBb0IsR0FBcEIsb0JBQW9CIiwiZmlsZSI6ImFzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBCYXNlIHR5cGUgb2YgYWxsIEFTVHMuICovXG5leHBvcnQgY2xhc3MgTm9kZSB7XG5cdC8qKlxuXHRDb252ZXJ0IHRvIEpTT04uXG5cdEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzdHJlZS9lc3RyZWVcblx0Ki9cblx0dG9KU09OKCkge1xuXHRcdGNvbnN0IG9iaiA9IHsgfVxuXHRcdG9iai50eXBlID0gdGhpcy50eXBlXG5cdFx0Ly8gU29ydCB0byBtYWtlIEpTT04gcmVuZGVyaW5nIGRldGVybWluaXN0aWMuXG5cdFx0T2JqZWN0LmtleXModGhpcykuc29ydCgpLmZvckVhY2goa2V5ID0+IHsgb2JqW2tleV0gPSB0aGlzW2tleV0gfSlcblx0XHRyZXR1cm4gb2JqXG5cdH1cblxuXHQvKipcblx0Rm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvdGhlciBBU1QgcmVwcmVzZW50YXRpb25zLFxuXHRhbGwgTm9kZSBpbnN0YW5jZXMgaGF2ZSBhICd0eXBlJyBwcm9wZXJ0eSB0aGF0IGlzIHRoZSBuYW1lIG9mIHRoYXQgdHlwZS5cblx0QHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXN0cmVlL2VzdHJlZVxuXHQqL1xuXHRnZXQgdHlwZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG5cdH1cblxuXHQvKiogQG92ZXJyaWRlICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKVxuXHR9XG59XG5cbi8vIEFic3RyYWN0c1xuXHQvKiogTGluZSB0aGF0IGRlY2xhcmVzIG5ldyBsb2NhbHMuICovXG5cdGV4cG9ydCBjbGFzcyBEZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqIEJsb2NrcyBvZiBjb2RlIGhhdmUgbGluZXMgdGhhdCBhcmUgU3RhdGVtZW50cyBvciBEZWNsYXJhdGlvbnMuICovXG5cdGV4cG9ydCBjbGFzcyBTdGF0ZW1lbnQgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHRDb2RlIHRoYXQgaGFzIGEgdmFsdWUuXG5cdFRvIHVzZSBvbmUgaW4gYSBzdGF0ZW1lbnQgcG9zaXRpb24sIHNlZSBFeHByZXNzaW9uU3RhdGVtZW50LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRXhwcmVzc2lvbiBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqXG5cdENhbiBnbyBpbiBhIHBhcmFtZXRlciBsaXN0IG9yIG9uIHRoZSBsZWZ0IHNpZGUgb2YgYW4gYXNzaWdubWVudC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFBhdHRlcm4gZXh0ZW5kcyBOb2RlIHsgfVxuXG4vLyBBIGNvbXBsZXRlIHByb2dyYW0gc291cmNlIHRyZWUuXG5leHBvcnQgY2xhc3MgUHJvZ3JhbSBleHRlbmRzIE5vZGUge1xuXHRjb25zdHJ1Y3Rvcihib2R5KSB7XG5cdFx0c3VwZXIoKVxuXHRcdC8qKiBAdHlwZSB7QXJyYXk8U3RhdGVtZW50Pn0gKi9cblx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdH1cbn1cblxuLy8gVmFyaWFibGVzXG5cdC8qKlxuXHRBIEphdmFTY3JpcHQgaWRlbnRpZmllci5cblxuXHRJdCBpcyBhc3N1bWVkIHRoYXQgeW91IGhhdmUgY2FsbGVkIGBtYW5nbGVJZGVudGlmaWVyYCBhcyBhcHByb3ByaWF0ZS5cblx0U2VlIGFsc28ge0BsaW5rIGlkZW50aWZpZXJ9LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgSWRlbnRpZmllciBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG5hbWUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuXHRcdFx0dGhpcy5uYW1lID0gbmFtZVxuXHRcdH1cblx0fVxuXG5cdC8qKiBTaW5nbGUgZGVjbGFyYXRpb24gd2l0aGluIGEge0BsaW5rIFZhcmlhYmxlRGVjbGFyYXRpb259LiAqL1xuXHRleHBvcnQgY2xhc3MgVmFyaWFibGVEZWNsYXJhdG9yIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoaWQsIGluaXQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChpbml0PT09IHVuZGVmaW5lZClcblx0XHRcdFx0aW5pdCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMuaWQgPSBpZFxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuaW5pdCA9IGluaXRcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIFZhcmlhYmxlRGVjbGFyYXRpb259LiAqL1xuXHRleHBvcnQgY29uc3QgVmFyaWFibGVEZWNsYXJhdGlvbktpbmQgPSBuZXcgU2V0KFsnY29uc3QnLCAnbGV0JywgJ3ZhciddKVxuXHQvKipcblx0RGVjbGFyZXMgYW5kIG9wdGlvbmFsbHkgaW5pdGlhbGl6ZXMgbWFueSB2YXJpYWJsZXMuXG5cdE11c3QgYmUgYXQgbGVhc3Qgb25lIGRlY2xhcmF0aW9uLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgVmFyaWFibGVEZWNsYXJhdGlvbiBleHRlbmRzIERlY2xhcmF0aW9uIHtcblx0XHRjb25zdHJ1Y3RvcihraW5kLCBkZWNsYXJhdGlvbnMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VmFyaWFibGVEZWNsYXJhdGlvbktpbmR9ICovXG5cdFx0XHR0aGlzLmtpbmQgPSBraW5kXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PFZhcmlhYmxlRGVjbGFyYXRvcj59ICovXG5cdFx0XHR0aGlzLmRlY2xhcmF0aW9ucyA9IGRlY2xhcmF0aW9uc1xuXHRcdFx0aWYgKHRoaXMuZGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdWYXJpYWJsZURlY2xhcmF0aW9uIG11c3QgaGF2ZSBhdCBsZWFzdCAxIGRlY2xhcmF0aW9uLicpXG5cdFx0fVxuXHR9XG5cblxuLy8gU3RhdGVtZW50c1xuXHQvKipcblx0QW4gZW1wdHkgc3RhdGVtZW50LCBpLmUuLCBhIHNvbGl0YXJ5IHNlbWljb2xvbi5cblx0Tm90IHVzZWZ1bCBmb3IgY29kZSBnZW5lcmF0aW9uLCBidXQgc29tZSBwYXJzZXJzIHdpbGwgcmV0dXJuIHRoZXNlLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRW1wdHlTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQgeyB9XG5cblx0LyoqIEEgYmxvY2sgc3RhdGVtZW50LCBpLmUuLCBhIHNlcXVlbmNlIG9mIHN0YXRlbWVudHMgc3Vycm91bmRlZCBieSBicmFjZXMuICovXG5cdGV4cG9ydCBjbGFzcyBCbG9ja1N0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxTdGF0ZW1lbnQ+fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRBbiBleHByZXNzaW9uIHN0YXRlbWVudCwgaS5lLiwgYSBzdGF0ZW1lbnQgY29uc2lzdGluZyBvZiBhIHNpbmdsZSBleHByZXNzaW9uLlxuXHRTZWUgYGVzYXN0LnV0aWwgdG9TdGF0ZW1lbnQgdG9TdGF0ZW1lbnRzYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25TdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGV4cHJlc3Npb24pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuZXhwcmVzc2lvbiA9IGV4cHJlc3Npb25cblx0XHR9XG5cdH1cblxuXHQvKiogQW4gaWYgKG9yIGlmIC4uLiBlbHNlKSBzdGF0ZW1lbnQuICovXG5cdGV4cG9ydCBjbGFzcyBJZlN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IodGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRcdGlmIChhbHRlcm5hdGUgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0YWx0ZXJuYXRlID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50XG5cdFx0XHQvKiogQHR5cGUgez9TdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmFsdGVybmF0ZSA9IGFsdGVybmF0ZVxuXHRcdH1cblx0fVxuXG5cdC8qKiBBIHN0YXRlbWVudCBwcmVmaXhlZCBieSBhIGxhYmVsLiAqL1xuXHRleHBvcnQgY2xhc3MgTGFiZWxlZFN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IobGFiZWwsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubGFiZWwgPSBsYWJlbFxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIEJyZWFrU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHQvKiogVGhlIGBicmVha2Aga2V5d29yZC4gKi9cblx0XHRjb25zdHJ1Y3RvcihsYWJlbCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxhYmVsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxhYmVsID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubGFiZWwgPSBsYWJlbFxuXHRcdH1cblx0fVxuXG5cdC8qKiBUaGUgYGNvbnRpbnVlYCBrZXl3b3JkLiAqL1xuXHRleHBvcnQgY2xhc3MgQ29udGludWVTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGxhYmVsKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAobGFiZWwgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0bGFiZWwgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez9JZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5sYWJlbCA9IGxhYmVsXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdGBzd2l0Y2ggKGRpc2NyaW1pbmFudCkgeyBjYXNlcyB9YFxuXHRPbmx5IHRoZSBsYXN0IGVudHJ5IG9mIGBjYXNlc2AgaXMgYWxsb3dlZCB0byBiZSBgZGVmYXVsdGAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBTd2l0Y2hTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGRpc2NyaW1pbmFudCwgY2FzZXMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuZGlzY3JpbWluYW50ID0gZGlzY3JpbWluYW50XG5cdFx0XHQvKiogQHR5cGUge0FycmF5PFN3aXRjaENhc2U+fSAqL1xuXHRcdFx0dGhpcy5jYXNlcyA9IGNhc2VzXG5cdFx0fVxuXHR9XG5cdC8qKlxuXHRBIHNpbmdsZSBgY2FzZWAgd2l0aGluIGEgU3dpdGNoU3RhdGVtZW50LlxuXHRJZiBgdGVzdGAgaXMgYG51bGxgLCB0aGlzIGlzIHRoZSBgZGVmYXVsdGAgY2FzZS5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFN3aXRjaENhc2UgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKHRlc3QsIGNvbnNlcXVlbnQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmICh0ZXN0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdHRlc3QgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez9FeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxTdGF0ZW1lbnQ+ICovXG5cdFx0XHR0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50XG5cdFx0fVxuXHR9XG5cblx0LyoqIFRoZSBgcmV0dXJuYCBrZXl3b3JkLCBvcHRpb25hbGx5IGZvbGxvd2VkIGJ5IGFuIEV4cHJlc3Npb24gdG8gcmV0dXJuLiAqL1xuXHRleHBvcnQgY2xhc3MgUmV0dXJuU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGFyZ3VtZW50ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGFyZ3VtZW50ID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRUaGUgYHRocm93YCBrZXl3b3JkLCBhbmQgc29tZXRoaW5nIHRvIHRocm93LlxuXHRTZWUgYGVzYXN0LnV0aWwgdGhyb3dFcnJvcmAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBUaHJvd1N0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgdHJ5IHsgYmxvY2sgfSBjYXRjaCAoaGFuZGxlci5wYXJhbSkgeyBoYW5kbGVyLmJvZHkgfSBmaW5hbGx5IHsgZmluYWxpemVyIH1gXG5cdEF0IGxlYXN0IG9uZSBvZiBgaGFuZGxlcmAgb3IgYGZpbmFsaXplcmAgbXVzdCBiZSBub24tbnVsbC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFRyeVN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYmxvY2ssIGhhbmRsZXIsIGZpbmFsaXplcikge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0aGFuZGxlciA9IG51bGxcblx0XHRcdGlmIChmaW5hbGl6ZXIgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0ZmluYWxpemVyID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtCbG9ja1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYmxvY2sgPSBibG9ja1xuXHRcdFx0LyoqIEB0eXBlIHs/Q2F0Y2hDbGF1c2V9ICovXG5cdFx0XHR0aGlzLmhhbmRsZXIgPSBoYW5kbGVyXG5cdFx0XHQvKiogQHR5cGUgez9CbG9ja1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuZmluYWxpemVyID0gZmluYWxpemVyXG5cdFx0fVxuXHR9XG5cdC8qKiBNdXN0IGJlICpwYXJ0KiBvZiBhIHtAbGluayBUcnlTdGF0ZW1lbnR9IC0tIGRvZXMgKm5vdCogZm9sbG93IGl0LiAqL1xuXHRleHBvcnQgY2xhc3MgQ2F0Y2hDbGF1c2UgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihwYXJhbSwgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtQYXR0ZXJufSAqL1xuXHRcdFx0dGhpcy5wYXJhbSA9IHBhcmFtXG5cdFx0XHQvKiogQHR5cGUge0Jsb2NrU3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgd2hpbGUgKHRlc3QpIGJvZHlgICovXG5cdGV4cG9ydCBjbGFzcyBXaGlsZVN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IodGVzdCwgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIGBkbyBib2R5IHdoaWxlICh0ZXN0KWAgKi9cblx0ZXhwb3J0IGNsYXNzIERvV2hpbGVTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGJvZHksIHRlc3QpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgZm9yIChpbml0OyB0ZXN0OyB1cGRhdGUpIGJvZHlgXG5cdE5vdCB0byBiZSBjb25mdXNlZCB3aXRoIEZvckluU3RhdGVtZW50IG9yIEZvck9mU3RhdGVtZW50LlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRm9yU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihpbml0LCB0ZXN0LCB1cGRhdGUsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7PyhWYXJpYWJsZURlY2xhcmF0aW9uIHwgRXhwcmVzc2lvbil9ICovXG5cdFx0XHR0aGlzLmluaXQgPSBpbml0XG5cdFx0XHQvKiogQHR5cGUgez9FeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudXBkYXRlID0gdXBkYXRlXG5cdFx0XHQvKiogQHR5cGUge1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKiogYGZvciAobGVmdCBpbiByaWdodCkgYm9keWAgKi9cblx0ZXhwb3J0IGNsYXNzIEZvckluU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihsZWZ0LCByaWdodCwgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtWYXJpYWJsZURlY2xhcmF0aW9uIHwgRXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIGBmb3IgKGxlZnQgb2YgcmlnaHQpIGJvZHlgICovXG5cdGV4cG9ydCBjbGFzcyBGb3JPZlN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IobGVmdCwgcmlnaHQsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VmFyaWFibGVEZWNsYXJhdGlvbiB8IEV4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBUaGUgYGRlYnVnZ2VyYCBrZXl3b3JkLiAqL1xuXHRleHBvcnQgY2xhc3MgRGVidWdnZXJTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQgeyB9XG5cbi8vIERlY2xhcmF0aW9uc1xuXHQvKiogRnVuY3Rpb25EZWNsYXJhdGlvbiB8IEZ1bmN0aW9uRXhwcmVzc2lvbiB8IEFycm93RnVuY3Rpb25FeHByZXNzaW9uICovXG5cdGV4cG9ydCBjbGFzcyBGdW5jdGlvbkFic3RyYWN0IGV4dGVuZHMgTm9kZSB7IH1cblxuXHRjbGFzcyBGdW5jdGlvbk5vbkFycm93IGV4dGVuZHMgRnVuY3Rpb25BYnN0cmFjdCB7XG5cdFx0Y29uc3RydWN0b3IoaWQsIHBhcmFtcywgYm9keSwgZ2VuZXJhdG9yKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAoZ2VuZXJhdG9yID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGdlbmVyYXRvciA9IGZhbHNlXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8UGF0dGVybj59ICovXG5cdFx0XHR0aGlzLnBhcmFtcyA9IHBhcmFtc1xuXHRcdFx0LyoqIEB0eXBlIHtCbG9ja1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMuZ2VuZXJhdG9yID0gZ2VuZXJhdG9yXG5cdFx0fVxuXHR9XG5cblx0Ly8gVE9ETzogRGVjbGFyYXRpb24gdG9vXG5cdC8qKiB7QGxpbmsgRnVuY3Rpb259IGluIGRlY2xhcmF0aW9uIHBvc2l0aW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgRnVuY3Rpb25EZWNsYXJhdGlvbiBleHRlbmRzIEZ1bmN0aW9uTm9uQXJyb3cgeyB9XG5cbi8vIEV4cHJlc3Npb25zXG5cdGV4cG9ydCBjbGFzcyBMaXRlcmFsIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IodmFsdWUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7bnVtYmVyfHN0cmluZ3xib29sZWFufG51bGx9ICovXG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHR9XG5cdH1cblxuXHQvKiogVGhlIGB0aGlzYCBrZXl3b3JkLiAqL1xuXHRleHBvcnQgY2xhc3MgVGhpc0V4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHsgfVxuXG5cdC8qKiBgWyBlbGVtZW50cyBdYCAqL1xuXHRleHBvcnQgY2xhc3MgQXJyYXlFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoZWxlbWVudHMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8P0V4cHJlc3Npb24+fSAqL1xuXHRcdFx0dGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBQcm9wZXJ0eX0uICovXG5cdGV4cG9ydCBjb25zdCBQcm9wZXJ0eUtpbmQgPSBuZXcgU2V0KFsnaW5pdCcsICdnZXQnLCAnc2V0J10pXG5cdC8qKiBQYXJ0IG9mIGFuIE9iamVjdEV4cHJlc3Npb24uICovXG5cdGV4cG9ydCBjbGFzcyBQcm9wZXJ0eSBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGtpbmQsIGtleSwgdmFsdWU9a2V5LCBjb21wdXRlZD0hKGtleSBpbnN0YW5jZW9mIElkZW50aWZpZXIpLCBtZXRob2Q9ZmFsc2UpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7UHJvcGVydHlLaW5kfSAqL1xuXHRcdFx0dGhpcy5raW5kID0ga2luZFxuXHRcdFx0LyoqIEB0eXBlIHtMaXRlcmFsIHwgSWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMua2V5ID0ga2V5XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMuY29tcHV0ZWQgPSBjb21wdXRlZFxuXHRcdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdFx0dGhpcy5tZXRob2QgPSBtZXRob2RcblxuXHRcdFx0aWYgKHRoaXMua2luZCAhPT0gJ2luaXQnKSB7XG5cdFx0XHRcdGlmICghKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbkV4cHJlc3Npb24pKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0L3NldCBQcm9wZXJ0eVxcJ3MgdmFsdWUgbXVzdCBiZSBhIEZ1bmN0aW9uRXhwcmVzc2lvbi4nKVxuXHRcdFx0XHRpZiAodGhpcy52YWx1ZS5pZCAhPT0gbnVsbClcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHQnZ2V0L3NldCBQcm9wZXJ0eVxcJ3MgdmFsdWUgbXVzdCBub3QgaGF2ZSBpZDsgJyArXG5cdFx0XHRcdFx0XHQndGhhdCBpcyBzdG9yZWQgaW4gdGhlIGBrZXlgIG9mIHRoZSBQcm9wZXJ0eS4nKVxuXHRcdFx0XHRpZiAodGhpcy52YWx1ZS5nZW5lcmF0b3IpXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdnZXQvc2V0IGNhbiBub3QgYmUgYSBnZW5lcmF0b3IuJylcblx0XHRcdFx0aWYgKHRoaXMubWV0aG9kKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0L3NldCBjYW4gbm90IGhhdmUgbWV0aG9kOiB0cnVlLicpXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMubWV0aG9kKSB7XG5cdFx0XHRcdGlmICghKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbkV4cHJlc3Npb24pKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignbWV0aG9kIFByb3BlcnR5XFwncyB2YWx1ZSBtdXN0IGJlIGEgRnVuY3Rpb25FeHByZXNzaW9uLicpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Z2V0IHNob3J0aGFuZCgpIHtcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlID09PSB0aGlzLmtleVxuXHRcdH1cblx0fVxuXG5cdC8qKiBBbiBvYmplY3QgbGl0ZXJhbC4gKi9cblx0ZXhwb3J0IGNsYXNzIE9iamVjdEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PFByb3BlcnR5Pn0gKi9cblx0XHRcdHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXNcblx0XHR9XG5cdH1cblxuXHQvLyBUT0RPOiBFeHByZXNzaW9uIHRvb1xuXHQvKioge0BsaW5rIEZ1bmN0aW9ufSBpbiBleHByZXNzaW9uIHBvc2l0aW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgRnVuY3Rpb25FeHByZXNzaW9uIGV4dGVuZHMgRnVuY3Rpb25Ob25BcnJvdyB7IH1cblxuXHQvKiogTGlrZSBGdW5jdGlvbkV4cHJlc3Npb24gYnV0IHVzZXMgdGhlIGBwYXJhbXMgPT4gYm9keWAgZm9ybS4gKi9cblx0Ly8gVE9ETzogZXh0ZW5kcyBGdW5jdGlvbkFic3RyYWN0IHRvb1xuXHRleHBvcnQgY2xhc3MgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihwYXJhbXMsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8UGF0dGVybj59ICovXG5cdFx0XHR0aGlzLnBhcmFtcyA9IHBhcmFtc1xuXHRcdFx0LyoqIEB0eXBlIHtCbG9ja1N0YXRlbWVudCB8IEV4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdGBleHByZXNzaW9uc1swXSwgZXhwcmVzc2lvbnNbMV0sIC4uLmBcblx0RXhwcmVzc2lvbiBjb21wb3NlZCBvZiBvdGhlciBleHByZXNzaW9ucywgc2VwYXJhdGVkIGJ5IHRoZSBjb21tYSBvcGVyYXRvci5cblx0Kk5vdCogZm9yIHBhcmFtZXRlciBsaXN0cy5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFNlcXVlbmNlRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKGV4cHJlc3Npb25zKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PEV4cHJlc3Npb24+fSAqL1xuXHRcdFx0dGhpcy5leHByZXNzaW9ucyA9IGV4cHJlc3Npb25zXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBVbmFyeUV4cHJlc3Npb259LiAqL1xuXHRleHBvcnQgY29uc3QgVW5hcnlPcGVyYXRvciA9IG5ldyBTZXQoWyctJywgJysnLCAnIScsICd+JywgJ3R5cGVvZicsICd2b2lkJywgJ2RlbGV0ZSddKVxuXHQvKipcblx0YG9wZXJhdG9yIGFyZ3VtZW50YFxuXHRDYWxscyBhIHVuYXJ5IG9wZXJhdG9yLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgVW5hcnlFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob3BlcmF0b3IsIGFyZ3VtZW50KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1VuYXJ5T3BlcmF0b3J9ICovXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblxuXHRcdC8qKiBBbHdheXMgdHJ1ZS4gTmVlZGVkIGZvciBjb21wYXJpYmlsaXR5IHdpdGggZXN0cmVlLiAqL1xuXHRcdGdldCBwcmVmaXgoKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgQmluYXJ5RXhwcmVzc2lvbn0uICovXG5cdGV4cG9ydCBjb25zdCBCaW5hcnlPcGVyYXRvciA9IG5ldyBTZXQoW1xuXHRcdCc9PScsICchPScsICc9PT0nLCAnIT09Jyxcblx0XHQnPCcsICc8PScsICc+JywgJz49Jyxcblx0XHQnPDwnLCAnPj4nLCAnPj4+Jyxcblx0XHQnKycsICctJywgJyonLCAnLycsICclJyxcblx0XHQnfCcsICdeJywgJyYnLCAnaW4nLFxuXHRcdCdpbnN0YW5jZW9mJ10pXG5cdC8qKlxuXHRgbGVmdCBvcGVyYXRvciByaWdodGBcblx0Q2FsbHMgYSBiaW5hcnkgb3BlcmF0b3IuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBCaW5hcnlFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob3BlcmF0b3IsIGxlZnQsIHJpZ2h0KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0JpbmFyeU9wZXJhdG9yfSAqL1xuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIEFzc2lnbm1lbnRFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IEFzc2lnbm1lbnRPcGVyYXRvciA9IG5ldyBTZXQoW1xuXHRcdCc9JywgJys9JywgJy09JywgJyo9JywgJy89JywgJyU9Jyxcblx0XHQnPDw9JywgJz4+PScsICc+Pj49Jyxcblx0XHQnfD0nLCAnXj0nLCAnJj0nXG5cdF0pXG5cdC8qKlxuXHRgbGVmdCBvcGVyYXRvciByaWdodGBcblx0TXV0YXRlcyBhbiBleGlzdGluZyB2YXJpYWJsZS5cblx0RG8gbm90IGNvbmZ1c2Ugd2l0aCBWYXJpYWJsZURlY2xhcmF0aW9uLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgQXNzaWdubWVudEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciwgbGVmdCwgcmlnaHQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXNzaWdubWVudE9wZXJhdG9yfSAqL1xuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHQvKiogQHR5cGUge1BhdHRlcm59ICovXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIFVwZGF0ZUV4cHJlc3Npb259LiAqL1xuXHRleHBvcnQgY29uc3QgVXBkYXRlT3BlcmF0b3IgPSBuZXcgU2V0KFsnKysnLCAnLS0nXSlcblx0LyoqXG5cdGArK2FyZ3VtZW50YCBvciBgYXJndW1lbnQrK2Bcblx0SW5jcmVtZW50cyBvciBkZWNyZW1lbnRzIGEgbnVtYmVyLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgVXBkYXRlRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yLCBhcmd1bWVudCwgcHJlZml4KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1VwZGF0ZU9wZXJhdG9yfSAqL1xuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMucHJlZml4ID0gcHJlZml4XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBMb2dpY2FsRXhwcmVzc2lvbn0uICovXG5cdGV4cG9ydCBjb25zdCBMb2dpY2FsT3BlcmF0b3IgPSBuZXcgU2V0KFsnfHwnLCAnJiYnXSlcblx0LyoqXG5cdGBsZWZ0IG9wZXJhdG9yIHJpZ2h0YFxuXHRDYWxscyBhIGxhenkgbG9naWNhbCBvcGVyYXRvci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIExvZ2ljYWxFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob3BlcmF0b3IsIGxlZnQsIHJpZ2h0KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0xvZ2ljYWxPcGVyYXRvcn0gKi9cblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0fVxuXHR9XG5cblx0LyoqIGB0ZXN0ID8gY29uc2VxdWVudCA6IGFsdGVybmF0ZWAgKi9cblx0ZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5jb25zZXF1ZW50ID0gY29uc2VxdWVudFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5hbHRlcm5hdGUgPSBhbHRlcm5hdGVcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YG5ldyBjYWxsZWUoYXJndW1lbnRzKWBcblx0SnVzdCBsaWtlIHtAbGluayBDYWxsRXhwcmVzc2lvbn0gYnV0IHdpdGggYG5ld2AgaW4gZnJvbnQuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBOZXdFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoY2FsbGVlLCBfYXJndW1lbnRzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmNhbGxlZSA9IGNhbGxlZVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxFeHByZXNzaW9uPn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnRzID0gX2FyZ3VtZW50c1xuXHRcdH1cblx0fVxuXG5cdC8qKiBgY2FsbGVlKGFyZ3VtZW50cylgICovXG5cdGV4cG9ydCBjbGFzcyBDYWxsRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKGNhbGxlZSwgX2FyZ3VtZW50cykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5jYWxsZWUgPSBjYWxsZWVcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8RXhwcmVzc2lvbj59ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50cyA9IF9hcmd1bWVudHNcblx0XHR9XG5cdH1cblx0LyoqIGAuLi5hcmdzYCBpbiBhIENhbGxFeHByZXNzaW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgU3ByZWFkRWxlbWVudCBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cdH1cblxuXHQvKipcblx0SWYgY29tcHV0ZWQgPT09IHRydWUsIGBvYmplY3RbcHJvcGVydHldYC5cblx0RWxzZSwgYG9iamVjdC5wcm9wZXJ0eWAgLS0gbWVhbmluZyBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gSWRlbnRpZmllci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIE1lbWJlckV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvYmplY3QsIHByb3BlcnR5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLm9iamVjdCA9IG9iamVjdFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5XG5cdFx0fVxuXG5cdFx0LyoqIE5lZWRlZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIGVzdHJlZS4gKi9cblx0XHRnZXQgY29tcHV0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gISh0aGlzLnByb3BlcnR5IGluc3RhbmNlb2YgSWRlbnRpZmllcilcblx0XHR9XG5cdH1cblxuXHQvKiogYHlpZWxkIGFyZ3VtZW50YCBvciBgeWllbGQqIGFyZ3VtZW50YCAqL1xuXHRleHBvcnQgY2xhc3MgWWllbGRFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQsIGRlbGVnYXRlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez9FeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcblxuXHRcdFx0aWYgKHRoaXMuZGVsZWdhdGUgJiYgdGhpcy5hcmd1bWVudCA9PT0gbnVsbClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IHlpZWxkKiB3aXRob3V0IGFyZ3VtZW50LicpXG5cdFx0fVxuXHR9XG5cblx0Ly8gVGVtcGxhdGVzXG5cdFx0LyoqXG5cdFx0QSB0ZW1wbGF0ZSB3aXRoIG5vIHRhZy5cblx0XHRJdCBhbHRlcm5hdGVzIGJldHdlZW4gcXVhc2lzIGFuZCBleHByZXNzaW9ucy5cblx0XHRJdCBzaG91bGQgYmVnaW4gYW5kIGVuZCB3aXRoIHF1YXNpcywgdXNpbmcge0BsaW5rIFRlbXBsYXRlRWxlbWVudC5lbXB0eX0gaWYgbmVjZXNzYXJ5LlxuXHRcdFRoaXMgbWVhbnMgdGhhdCBgJHsxfSR7Mn1gIGhhcyAzIGVtcHR5IHF1YXNpcyFcblx0XHQqL1xuXHRcdGV4cG9ydCBjbGFzcyBUZW1wbGF0ZUxpdGVyYWwgZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRcdGNvbnN0cnVjdG9yKHF1YXNpcywgZXhwcmVzc2lvbnMpIHtcblx0XHRcdFx0c3VwZXIoKVxuXHRcdFx0XHQvKiogQHR5cGUge0FycmF5PFRlbXBsYXRlRWxlbWVudD59ICovXG5cdFx0XHRcdHRoaXMucXVhc2lzID0gcXVhc2lzXG5cdFx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8RXhwcmVzc2lvbj59ICovXG5cdFx0XHRcdHRoaXMuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9uc1xuXHRcdFx0XHRpZiAodGhpcy5xdWFzaXMubGVuZ3RoICE9PSB0aGlzLmV4cHJlc3Npb25zLmxlbmd0aCArIDEpXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0J1RoZXJlIG11c3QgYmUgMSBtb3JlIHF1YXNpIHRoYW4gZXhwcmVzc2lvbnMuXFxuJyArXG5cdFx0XHRcdFx0XHQnTWF5YmUgeW91IG5lZWQgdG8gYWRkIGFuIGVtcHR5IHF1YXNpIHRvIHRoZSBmcm9udCBvciBlbmQuJylcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKiogUGFydCBvZiBhIFRlbXBsYXRlTGl0ZXJhbC4gKi9cblx0XHRleHBvcnQgY2xhc3MgVGVtcGxhdGVFbGVtZW50IGV4dGVuZHMgTm9kZSB7XG5cdFx0XHQvKipcblx0XHRcdFRlbXBsYXRlRWxlbWVudCB3aG9zZSByYXcgc291cmNlIGlzIGBzdHJgLlxuXHRcdFx0QHBhcmFtIHtzdHJpbmd9IHN0clxuXHRcdFx0Ki9cblx0XHRcdHN0YXRpYyBmb3JSYXdTdHJpbmcoc3RyKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVGVtcGxhdGVFbGVtZW50KGZhbHNlLCB7XG5cdFx0XHRcdFx0Ly8gVE9ETzogQSB3YXkgdG8gY2FsY3VsYXRlIHRoaXM/XG5cdFx0XHRcdFx0Y29va2VkOiBudWxsLFxuXHRcdFx0XHRcdHJhdzogc3RyXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0VGVtcGxhdGVFbGVtZW50IGV2YWx1YXRpbmcgdG8gYHN0cmAuXG5cdFx0XHRVc2VzIGVzY2FwZSBzZXF1ZW5jZXMgYXMgbmVjZXNzYXJ5LlxuXHRcdFx0QHBhcmFtIHtzdHJpbmd9IHN0clxuXHRcdFx0Ki9cblx0XHRcdHN0YXRpYyBmb3JTdHJpbmcoc3RyKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVGVtcGxhdGVFbGVtZW50KGZhbHNlLCB7XG5cdFx0XHRcdFx0Y29va2VkOiBzdHIsXG5cdFx0XHRcdFx0cmF3OiBlc2NhcGVTdHJpbmdGb3JUZW1wbGF0ZShzdHIpXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHRcdC8qKiBUZW1wbGF0ZUVsZW1lbnQgd2l0aCBlbXB0eSB2YWx1ZS4gKi9cblx0XHRcdHN0YXRpYyBnZXQgZW1wdHkoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmZvclN0cmluZygnJylcblx0XHRcdH1cblxuXHRcdFx0Y29uc3RydWN0b3IodGFpbCwgdmFsdWUpIHtcblx0XHRcdFx0c3VwZXIoKVxuXHRcdFx0XHQvKipcblx0XHRcdFx0VXNlIHRoaXMgdG8gbWFyayB0aGUgbGFzdCBUZW1wbGF0ZUVsZW1lbnQuXG5cdFx0XHRcdEB0eXBlIHtib29sZWFufVxuXHRcdFx0XHQqL1xuXHRcdFx0XHR0aGlzLnRhaWwgPSB0YWlsXG5cdFx0XHRcdC8qKiBAdHlwZSB7e2Nvb2tlZDogc3RyaW5nLCByYXc6IHN0cmluZ319ICovXG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0XG5cdFx0XHRlc2NhcGVTdHJpbmdGb3JUZW1wbGF0ZSA9IHN0ciA9PlxuXHRcdFx0XHRzdHIucmVwbGFjZSgvW3tcXFxcYFxcblxcdFxcYlxcZlxcdlxcclxcdTIwMjhcXHUyMDI5XS9nLCBjaCA9PiB0ZW1wbGF0ZUVzY2FwZXNbY2hdKSxcblx0XHRcdHRlbXBsYXRlRXNjYXBlcyA9IHtcblx0XHRcdFx0Ly8gTmVlZCB0byBtYWtlIHN1cmUgXCIke1wiIGlzIGVzY2FwZWQuXG5cdFx0XHRcdCd7JzogJ1xcXFx7Jyxcblx0XHRcdFx0J2AnOiAnXFxcXGAnLFxuXHRcdFx0XHQnXFxcXCc6ICdcXFxcXFxcXCcsXG5cdFx0XHRcdCdcXG4nOiAnXFxcXG4nLFxuXHRcdFx0XHQnXFx0JzogJ1xcXFx0Jyxcblx0XHRcdFx0J1xcYic6ICdcXFxcYicsXG5cdFx0XHRcdCdcXGYnOiAnXFxcXGYnLFxuXHRcdFx0XHQnXFx2JzogJ1xcXFx2Jyxcblx0XHRcdFx0J1xccic6ICdcXFxccicsXG5cdFx0XHRcdCdcXHUyMDI4JzogJ1xcXFx1MjAyOCcsXG5cdFx0XHRcdCdcXHUyMDI5JzogJ1xcXFx1MjAyOSdcblx0XHRcdH1cblxuXHRcdC8qKiBUZW1wbGF0ZUxpdGVyYWwgd2l0aCBhIHRhZyBpbiBmcm9udCwgbGlrZWB0aGlzYC4gKi9cblx0XHRleHBvcnQgY2xhc3MgVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0XHRjb25zdHJ1Y3Rvcih0YWcsIHF1YXNpKSB7XG5cdFx0XHRcdHN1cGVyKClcblx0XHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0XHR0aGlzLnRhZyA9IHRhZ1xuXHRcdFx0XHQvKiogQHR5cGUge1RlbXBsYXRlTGl0ZXJhbH0gKi9cblx0XHRcdFx0dGhpcy5xdWFzaSA9IHF1YXNpXG5cdFx0XHR9XG5cdFx0fVxuXG4vLyBQYXR0ZXJuc1xuXHQvKipcblx0YHsgYSwgYjogYyB9ID1gXG5cdE9iamVjdCBkZWNvbnN0cnVjdGluZyBwYXR0ZXJuLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgT2JqZWN0UGF0dGVybiBleHRlbmRzIFBhdHRlcm4ge1xuXHRcdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8QXNzaWdubWVudFByb3BlcnR5Pn0gKi9cblx0XHRcdHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXNcblx0XHR9XG5cdH1cblxuXHQvKipcblx0SnVzdCBsaWtlIGEgUHJvcGVydHksIGJ1dCBraW5kIGlzIGFsd2F5cyBgaW5pdGAuXG5cdEFsdGhvdWdoIHRlY2huaWNhbGx5IGl0cyBvd24gdHlwZSwgYF8udHlwZWAgd2lsbCBiZSAnUHJvcGVydHknLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgQXNzaWdubWVudFByb3BlcnR5IGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3Ioa2V5LCB2YWx1ZSkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdHZhbHVlID0ga2V5XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmtleSA9IGtleVxuXHRcdFx0LyoqIEB0eXBlIHtQYXR0ZXJufSAqL1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0fVxuXG5cdFx0Z2V0IHR5cGUoKSB7IHJldHVybiAnUHJvcGVydHknIH1cblx0XHRnZXQga2luZCgpIHsgcmV0dXJuICdpbml0JyB9XG5cdFx0Z2V0IG1ldGhvZCgpIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRnZXQgc2hvcnRoYW5kKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWUgPT09IHRoaXMua2V5XG5cdFx0fVxuXHRcdGdldCBjb21wdXRlZCgpIHtcblx0XHRcdHJldHVybiAhKHRoaXMua2V5IGluc3RhbmNlb2YgSWRlbnRpZmllcilcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YFsgYSwgYiBdID0gLi4uYC5cblx0QXJyYXkgZGVjb25zdHJ1Y3RpbmcgcGF0dGVybi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEFycmF5UGF0dGVybiBleHRlbmRzIFBhdHRlcm4ge1xuXHRcdGNvbnN0cnVjdG9yKGVsZW1lbnRzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PD9QYXR0ZXJuPn0gKi9cblx0XHRcdHRoaXMuZWxlbWVudHMgPSBlbGVtZW50c1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRDYW4gYmUgdGhlIGxhc3QgYXJndW1lbnQgdG8gYSBGdW5jdGlvbkV4cHJlc3Npb24vRnVuY3Rpb25EZWNsYXJhdGlvblxuXHRvciAgZ28gYXQgdGhlIGVuZCBvZiBhbiBBcnJheVBhdHRlcm4uXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBSZXN0RWxlbWVudCBleHRlbmRzIFBhdHRlcm4ge1xuXHRcdGNvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1BhdHRlcm59ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cdH1cblxuLy8gQ2xhc3Nlc1xuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIE1ldGhvZERlZmluaXRpb259LiAqL1xuXHRleHBvcnQgY29uc3QgTWV0aG9kRGVmaW5pdGlvbktpbmQgPSBuZXcgU2V0KFsnY29uc3RydWN0b3InLCAnbWV0aG9kJywgJ2dldCcsICdzZXQnXSlcblx0LyoqIFBhcnQgb2YgYSB7QGxpbmsgQ2xhc3NCb2R5fS4gKi9cblx0ZXhwb3J0IGNsYXNzIE1ldGhvZERlZmluaXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHQvKiogQHBhcmFtIHtGdW5jdGlvbkV4cHJlc3Npb259IHZhbHVlICovXG5cdFx0c3RhdGljIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gbmV3IE1ldGhvZERlZmluaXRpb24obmV3IElkZW50aWZpZXIoJ2NvbnN0cnVjdG9yJyksIHZhbHVlLCAnY29uc3RydWN0b3InKVxuXHRcdH1cblxuXHRcdGNvbnN0cnVjdG9yKGtleSwgdmFsdWUsIGtpbmQsIF9zdGF0aWMsIGNvbXB1dGVkKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAoX3N0YXRpYyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRfc3RhdGljID0gZmFsc2Vcblx0XHRcdGlmIChjb21wdXRlZCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRjb21wdXRlZCA9IGZhbHNlXG5cdFx0XHRpZiAoa2luZCA9PT0gJ2NvbnN0cnVjdG9yJyAmJiAhKFxuXHRcdFx0XHRrZXkgaW5zdGFuY2VvZiBJZGVudGlmaWVyICAmJiBrZXkubmFtZSA9PT0gJ2NvbnN0cnVjdG9yJyAmJiAhX3N0YXRpYyAmJiAhY29tcHV0ZWQpKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0J0NvbnN0cnVjdG9yIG1ldGhvZCBzaG91bGQgY3JlYXRlZCB3aXRoIGBNZXRob2REZWZpbml0aW9uLmNvbnN0cnVjdG9yYC4nKVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyIHwgTGl0ZXJhbH0gKi9cblx0XHRcdHRoaXMua2V5ID0ga2V5XG5cdFx0XHQvKiogQHR5cGUge0Z1bmN0aW9uRXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZVxuXHRcdFx0LyoqIEB0eXBlIHtNZXRob2REZWZpbml0aW9uS2luZH0gKi9cblx0XHRcdHRoaXMua2luZCA9IGtpbmRcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMuc3RhdGljID0gX3N0YXRpY1xuXHRcdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdFx0dGhpcy5jb21wdXRlZCA9IGNvbXB1dGVkXG5cblx0XHRcdGlmICh2YWx1ZS5pZCAhPT0gbnVsbClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdCdNZXRob2REZWZpbml0aW9uIHZhbHVlIHNob3VsZCBub3QgaGF2ZSBpZDsgdGhhdCBpcyBoYW5kbGVkIGJ5IGBrZXlgLicpXG5cdFx0fVxuXHR9XG5cblx0LyoqIENvbnRlbnRzIG9mIGEge0BsaW5rIENsYXNzfS4gKi9cblx0ZXhwb3J0IGNsYXNzIENsYXNzQm9keSBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8TWV0aG9kRGVmaW5pdGlvbj59ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIHtAbGluayBDbGFzc0RlY2xhcmF0aW9ufSB8IHtAbGluayBDbGFzc0V4cHJlc3Npb259ICovXG5cdGV4cG9ydCBjbGFzcyBDbGFzcyBleHRlbmRzIE5vZGUgeyB9XG5cblx0Ly8gVE9ETzogZXh0ZW5kcyBEZWNsYXJhdGlvbiB0b29cblx0LyoqIHtAbGluayBDbGFzc30gaW4gZGVjbGFyYXRpb24gcG9zaXRpb24uICovXG5cdGV4cG9ydCBjbGFzcyBDbGFzc0RlY2xhcmF0aW9uIGV4dGVuZHMgQ2xhc3Mge1xuXHRcdGNvbnN0cnVjdG9yKGlkLCBzdXBlckNsYXNzLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnN1cGVyQ2xhc3MgPSBzdXBlckNsYXNzXG5cdFx0XHQvKiogQHR5cGUge0NsYXNzQm9keX0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKioge0BsaW5rIENsYXNzfSBpbiBleHByZXNzaW9uIHBvc2l0aW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgQ2xhc3NFeHByZXNzaW9uIGV4dGVuZHMgQ2xhc3Mge1xuXHRcdGNvbnN0cnVjdG9yKGlkLCBzdXBlckNsYXNzLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez9JZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5pZCA9IGlkXG5cdFx0XHQvKiogQHR5cGUgez9FeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5zdXBlckNsYXNzID0gc3VwZXJDbGFzc1xuXHRcdFx0LyoqIEB0eXBlIHtDbGFzc0JvZHl9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cbi8vIE1vZHVsZXNcblx0LyoqIEEgc3BlY2lmaWVyIGluIGFuIGltcG9ydCBvciBleHBvcnQgZGVjbGFyYXRpb24uICovXG5cdGV4cG9ydCBjbGFzcyBNb2R1bGVTcGVjaWZpZXIgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHR7QGxpbmsgSW1wb3J0U3BlY2lmaWVyfSB8IHtAbGluayBJbXBvcnREZWZhdWx0U3BlY2lmaWVyfSB8IHtAbGluayBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXJ9XG5cdCovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqXG5cdGBpbXBvcnQgc3BlY2lmaWVycyBmcm9tIHNvdXJjZWBcblx0T25seSBvbmUgc3BlY2lmaWVyIG1heSBiZSBhIEltcG9ydERlZmF1bHRTcGVjaWZpZXIuXG5cdElmIHRoZXJlIGlzIGFuIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllciwgaXQgbXVzdCBiZSB0aGUgb25seSBzcGVjaWZpZXIuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnREZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKHNwZWNpZmllcnMsIHNvdXJjZSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdD59ICovXG5cdFx0XHR0aGlzLnNwZWNpZmllcnMgPSBzcGVjaWZpZXJzXG5cdFx0XHQvKiogQHR5cGUge0xpdGVyYWw8c3RyaW5nPn0gKi9cblx0XHRcdHRoaXMuc291cmNlID0gc291cmNlXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdEEgbm9uLWRlZmF1bHQgaW1wb3J0LiBVc2VkIGluIGFuIEltcG9ydERlY2xhcmF0aW9uLlxuXHRGb3IgYGltcG9ydCB7IGEgfSBmcm9tIFwic291cmNlXCJgLCBqdXN0IHBhc3Mgb25lIGFyZ3VtZW50IGFuZCBsb2NhbCB3aWxsID0gaW1wb3J0ZWQuXG5cdEZvciBgaW1wb3J0IHsgYSBhcyBiIH0gZnJvbSBcInNvdXJjZVwiYCwgbWFrZSBpbXBvcnRlZCBgYWAgYW5kIGxvY2FsIGBiYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydFNwZWNpZmllciBleHRlbmRzIE1vZHVsZVNwZWNpZmllciB7XG5cdFx0Y29uc3RydWN0b3IoaW1wb3J0ZWQsIGxvY2FsKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAobG9jYWwgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0bG9jYWwgPSBpbXBvcnRlZFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5pbXBvcnRlZCA9IGltcG9ydGVkXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKiogVGhlIGRlZmF1bHQgZXhwb3J0LCBhcyBpbiBgaW1wb3J0IGEgZnJvbSBcInNvdXJjZVwiYC4gKi9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydERlZmF1bHRTcGVjaWZpZXIgZXh0ZW5kcyBJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCB7XG5cdFx0Y29uc3RydWN0b3IobG9jYWwpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubG9jYWwgPSBsb2NhbFxuXHRcdH1cblx0fVxuXG5cdC8qKiBPYmplY3Qgb2YgZXZlcnkgZXhwb3J0LCBhcyBpbiBgaW1wb3J0ICogYXMgYSBmcm9tIFwic291cmNlXCJgLiAqL1xuXHRleHBvcnQgY2xhc3MgSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyIGV4dGVuZHMgSW1wb3J0U3BlY2lmaWVyQWJzdHJhY3Qge1xuXHRcdGNvbnN0cnVjdG9yKGxvY2FsKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0QSBub24tZGVmYXVsdCBleHBvcnQuIFVzZWQgaW4gYW4gRXhwb3J0TmFtZWREZWNsYXJhdGlvbi5cblx0Rm9yIGBleHBvcnQgeyBhIH0gZnJvbSBcInNvdXJjZVwiYCwganVzdCBwYXNzIG9uZSBhcmd1bWVudCBsb2NhbCB3aWxsID0gZXhwb3J0ZWQuXG5cdEZvciBgZXhwb3J0IHsgYSBhcyBiIH1gLCBtYWtlIGV4cG9ydGVkIGBiYCBhbmQgbG9jYWwgYGFgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRXhwb3J0U3BlY2lmaWVyIGV4dGVuZHMgTW9kdWxlU3BlY2lmaWVyIHtcblx0XHRjb25zdHJ1Y3RvcihleHBvcnRlZCwgbG9jYWwpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChsb2NhbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRsb2NhbCA9IGV4cG9ydGVkXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmV4cG9ydGVkID0gZXhwb3J0ZWRcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubG9jYWwgPSBsb2NhbFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRFeHBvcnRzIG11bHRpcGxlIHZhbHVlcyBhcyBpbiBgZXhwb3J0IHsgYSwgYiBhcyBjIH1gLlxuXHRJZiBzb3VyY2UgIT09IG51bGwsXG5cdHJlLWV4cG9ydHMgZnJvbSB0aGF0IG1vZHVsZSBhcyBpbiBgZXhwb3J0IHsgLi4uIH0gZnJvbSBcInNvdXJjZVwiYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihkZWNsYXJhdGlvbiwgc3BlY2lmaWVycywgc291cmNlKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRcdGlmIChzcGVjaWZpZXJzID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdHNwZWNpZmllcnMgPSBbXVxuXHRcdFx0aWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRzb3VyY2UgPSBudWxsXG5cblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0RlY2xhcmF0aW9ufSAqL1xuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbiA9IGRlY2xhcmF0aW9uXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PEV4cG9ydFNwZWNpZmllcj59ICovXG5cdFx0XHR0aGlzLnNwZWNpZmllcnMgPSBzcGVjaWZpZXJzXG5cdFx0XHQvKiogQHR5cGUgez9MaXRlcmFsPHN0cmluZz59ICovXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXG5cdFx0XHRpZiAoZGVjbGFyYXRpb24gIT09IG51bGwgJiYgIShzcGVjaWZpZXJzLmxlbmd0aCA9PT0gMCAmJiBzb3VyY2UgPT09IG51bGwpKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0RlY2xhcmF0aW9uIGNhbiBub3QgYmUgY29tYmluZWQgd2l0aCBzcGVjaWZpZXJzL3NvdXJjZS4nKVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZXhwb3J0IGRlZmF1bHQgZGVjbGFyYXRpb25gICovXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihkZWNsYXJhdGlvbikge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtEZWNsYXJhdGlvbiB8IEV4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmRlY2xhcmF0aW9uID0gZGVjbGFyYXRpb25cblx0XHR9XG5cdH1cblxuXHQvKiogYGV4cG9ydCAqIGZyb20gc291cmNlYCAqL1xuXHRleHBvcnQgY2xhc3MgRXhwb3J0QWxsRGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7TGl0ZXJhbDxzdHJpbmc+fSAqL1xuXHRcdFx0dGhpcy5zb3VyY2UgPSBzb3VyY2Vcblx0XHR9XG5cdH1cbiJdfQ==