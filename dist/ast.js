if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './private/util'], function (exports, _privateUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	// Base type of all Asts.

	class Node {
		toJSON() {
			const obj = {};
			obj.type = this.type;
			// Sort to make JSON rendering deterministic.
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

	// Abstracts
	exports.Node = Node;

	class Declaration extends Node {}

	// Blocks of code have lines that are Statements or Declarations.
	exports.Declaration = Declaration;

	class Statement extends Node {}

	// Code that has a value. To use one in a statement position, see ExpressionStatement.
	exports.Statement = Statement;

	class Expression extends Node {}

	// Can go in a parameter list or on the left side of an assignment.
	exports.Expression = Expression;

	class Pattern extends Node {}

	// A complete program source tree.
	exports.Pattern = Pattern;

	class Program extends Node {
		constructor(body /* Array[Statement] */) {
			super();
			this.body = body;
		}
	}

	// Variables
	/*
 A JavaScript identifier.
 It is assumed that you have called `mangleIdentifier` as appropriate.
 Also look at `esast.util idCached`,
 which mangles and avoids constructing the same identifier twice.
 */
	exports.Program = Program;

	class Identifier extends Expression {
		constructor(name /* String */) {
			super();
			this.name = name;
		}
	}

	exports.Identifier = Identifier;

	class VariableDeclarator extends Node {
		constructor(id, /* Pattern */init /* Opt[Expression] */) {
			// TODO:ES6 Optional args
			if (init === undefined) init = null;
			super();
			this.id = id;
			this.init = init;
		}
	}

	exports.VariableDeclarator = VariableDeclarator;
	const VariableDeclarationKind = new Set(['const', 'let', 'var']);
	exports.VariableDeclarationKind = VariableDeclarationKind;
	/*
 Declares and optionally initializes many variables.
 Must be at least one declaration.
 */

	class VariableDeclaration extends Declaration {
		constructor(kind, // VariableDeclarationKind
		declarations) {
			// Array[VariableDeclarator]
			super();
			this.kind = kind;
			this.declarations = declarations;
			(0, _privateUtil.assert)(this.declarations.length >= 1);
		}
	}

	// Statements
	/*
 An empty statement, i.e., a solitary semicolon.
 Not useful for code generation, but some parsers will return these.
 */
	exports.VariableDeclaration = VariableDeclaration;

	class EmptyStatement extends Statement {}

	// A block statement, i.e., a sequence of statements surrounded by braces.
	exports.EmptyStatement = EmptyStatement;

	class BlockStatement extends Statement {
		constructor(body /* Array[Statement */) {
			super();
			this.body = body;
		}
	}

	/*
 An expression statement, i.e., a statement consisting of a single expression.
 See `esast.util toStatement toStatements`.
 */
	exports.BlockStatement = BlockStatement;

	class ExpressionStatement extends Statement {
		constructor(expression /* Expression */) {
			super();
			this.expression = expression;
		}
	}

	// An if (or if ... else) statement.
	exports.ExpressionStatement = ExpressionStatement;

	class IfStatement extends Statement {
		constructor(test, // Expression
		consequent, // Statement
		alternate) {
			// Opt[Statement]
			// TODO:ES6 Optional arguments
			if (alternate === undefined) alternate = null;
			super();
			this.test = test;
			this.consequent = consequent;
			this.alternate = alternate;
		}
	}

	// A statement prefixed by a label.
	exports.IfStatement = IfStatement;

	class LabeledStatement extends Statement {
		constructor(label, /* Identifier */body /* Statement */) {
			super();
			this.label = label;
			this.body = body;
		}
	}

	exports.LabeledStatement = LabeledStatement;

	class BreakStatement extends Statement {
		// The `break` keyword.
		constructor(label /* Opt[Identifier] */) {
			// TODO:ES6 Optional args
			if (label === undefined) label = null;
			super();
			this.label = label;
		}
	}

	// The `continue` keyword.
	exports.BreakStatement = BreakStatement;

	class ContinueStatement extends Statement {
		constructor(label /* Opt[Identifier] */) {
			// TODO:ES6 Optional args
			if (label === undefined) label = null;
			super();
			this.label = label;
		}
	}

	/*
 switch (discriminant) { cases }
 Only the last entry of `cases` is allowed to be `default`.
 */
	exports.ContinueStatement = ContinueStatement;

	class SwitchStatement extends Statement {
		constructor(discriminant, /* Expression */cases /* Array[SwitchCase] */) {
			super();
			this.discriminant = discriminant;
			this.cases = cases;
		}
	}

	/*
 A single `case` within a SwitchStatement.
 If `test` is `null`, this is the `default` case.
 */
	exports.SwitchStatement = SwitchStatement;

	class SwitchCase extends Statement {
		constructor(test, /* Opt[Expression] */consequent /* Array[Statement] */) {
			// TODO:ES6 Optional args
			if (test === undefined) test = null;
			super();
			this.test = test;
			this.consequent = consequent;
		}
	}

	// The `return` keyword, optionally followed by an Expression to return.
	exports.SwitchCase = SwitchCase;

	class ReturnStatement extends Statement {
		constructor(argument /* Opt[Expression] */) {
			// TODO:ES6 Optional args
			if (argument === undefined) argument = null;
			super();
			this.argument = argument;
		}
	}

	/*
 The `throw` keyword, and something to throw.
 See `esast.util throwError`.
 */
	exports.ReturnStatement = ReturnStatement;

	class ThrowStatement extends Statement {
		constructor(argument /* Expression */) {
			super();
			this.argument = argument;
		}
	}

	// `try { block } catch (handler.param) { handler.body } finally { finalizer }`
	// At least one of `handler` or `finalizer` must be non-null.
	exports.ThrowStatement = ThrowStatement;

	class TryStatement extends Statement {
		constructor(block, /* BlockStatement */
		handler, /* Opt[CatchClause] */
		finalizer /* Opt[BlockStatement] */) {
			// TODO:ES6 Optional args
			if (handler === undefined) handler = null;
			if (finalizer === undefined) finalizer = null;
			super();
			this.block = block;
			this.handler = handler;
			this.finalizer = finalizer;
		}
	}

	// Must be *part* of a TryStatement -- does *not* follow it.
	exports.TryStatement = TryStatement;

	class CatchClause extends Node {
		constructor(param, /* Pattern */body /* BlockStatement */) {
			super();
			this.param = param;
			this.body = body;
		}
	}

	// `while (test) body`
	exports.CatchClause = CatchClause;

	class WhileStatement extends Statement {
		constructor(test, /* Expression */body /* Statement */) {
			super();
			this.test = test;
			this.body = body;
		}
	}

	// `do body while (test)`.
	exports.WhileStatement = WhileStatement;

	class DoWhileStatement extends Statement {
		constructor(body, /* Statement */test /* Expression */) {
			super();
			this.body = body;
			this.test = test;
		}
	}

	/*
 `for (init; test; update) body`.
 Not to be confused with ForInStatement or ForOfStatement.
 */
	exports.DoWhileStatement = DoWhileStatement;

	class ForStatement extends Statement {
		constructor(init, // Opt[Union[VariableDeclaration Expression]]
		test, // Opt[Expression]
		update, // Opt[Expression]
		body) {
			// Statement
			super();
			this.init = init;
			this.test = test;
			this.update = update;
			this.body = body;
		}
	}

	// `for (left in right) body`.
	exports.ForStatement = ForStatement;

	class ForInStatement extends Statement {
		constructor(left, // Union[VariableDeclaration Expression]
		right, // Expression
		body) {
			// Statement
			super();
			this.left = left;
			this.right = right;
			this.body = body;
		}
	}

	// `for (left of right) body`.
	exports.ForInStatement = ForInStatement;

	class ForOfStatement extends Statement {
		constructor(left, // Union[VariableDeclaration Expression]
		right, // Expression
		body) {
			// Statement
			super();
			this.left = left;
			this.right = right;
			this.body = body;
		}
	}

	// The `debugger` keyword.
	exports.ForOfStatement = ForOfStatement;

	class DebuggerStatement extends Statement {}

	// Declarations
	// FunctionDeclaration or FunctionExpression or ArrowFunctionExpression
	exports.DebuggerStatement = DebuggerStatement;

	class FunctionAbstract extends Node {}

	exports.FunctionAbstract = FunctionAbstract;

	class FunctionNonArrow extends FunctionAbstract {
		constructor(id, // Identifier
		params, // Array[Pattern]
		body, // BlockStatement
		generator) {
			// Boolean
			// TODO:ES6 Optional args
			if (generator === undefined) generator = false;
			super();
			this.id = id;
			this.params = params;
			this.body = body;
			this.generator = generator;
		}
	}

	// TODO: Declaration too

	class FunctionDeclaration extends FunctionNonArrow {}

	// Expressions
	// TODO: Literal as abstract type
	// Value: Number | String | null | Boolean
	exports.FunctionDeclaration = FunctionDeclaration;

	class Literal extends Expression {
		constructor(value) {
			super();
			this.value = value;
		}
	}

	// The `this` keyword.
	exports.Literal = Literal;

	class ThisExpression extends Expression {}

	exports.ThisExpression = ThisExpression;

	class ArrayExpression extends Expression {
		constructor(elements /* Array[Opt[Expression]] */) {
			super();
			this.elements = elements;
		}
	}

	exports.ArrayExpression = ArrayExpression;
	const PropertyKind = new Set(['init', 'get', 'set']);
	exports.PropertyKind = PropertyKind;
	/*
 Part of an ObjectExpression.
 If kind is 'get' or 'set', then value should be a FunctionExpression.
 */

	class Property extends Node {
		constructor(kind, // PropertyKind
		key, // Union[Literal Identifier]
		value, // Expression
		method, // Boolean
		shorthand, // Boolean
		computed) {
			// Boolean
			// TODO:ES6 Optional args
			if (method === undefined) method = shorthand = computed = false;
			super();
			this.kind = kind;
			this.key = key;
			this.value = value;
			this.method = method;
			this.shorthand;
			this.computed = computed;
		}
	}

	// An object literal.
	exports.Property = Property;

	class ObjectExpression extends Expression {
		constructor(properties /* Array[Property] */) {
			super();
			this.properties = properties;
		}
	}

	// TODO: Expression too
	exports.ObjectExpression = ObjectExpression;

	class FunctionExpression extends FunctionNonArrow {}

	// Like FunctionExpression but uses the `params => body` form.
	// TODO: extends FunctionAbstract too
	exports.FunctionExpression = FunctionExpression;

	class ArrowFunctionExpression extends Expression {
		constructor(params, /* Array[Pattern] */body /* Union[BlockStatement, Expression] */) {
			super();
			this.params = params;
			this.body = body;
		}
	}

	/*
 `expressions[0], expressions[1], ...`.
 Expression composed of other expressions, separated by the comma operator.
 *Not* for parameter lists.
 */
	exports.ArrowFunctionExpression = ArrowFunctionExpression;

	class SequenceExpression extends Expression {
		constructor(expressions /* Array[Expression] */) {
			super();
			this.expressions = expressions;
		}
	}

	exports.SequenceExpression = SequenceExpression;
	const UnaryOperator = new Set(['-', '+', '!', '~', 'typeof', 'void', 'delete']);

	exports.UnaryOperator = UnaryOperator;
	// `operator argument`. Calls a unary operator.

	class UnaryExpression extends Expression {
		constructor(operator, /* UnaryOperator */argument, /* Expression */prefix /* Boolean */) {
			super();
			this.operator = operator;
			this.argument = argument;
			(0, _privateUtil.assert)(prefix === undefined || prefix === true);
		}

		get prefix() {
			return true;
		}
	}

	exports.UnaryExpression = UnaryExpression;
	const BinaryOperator = new Set(['==', '!=', '===', '!==', '<', '<=', '>', '>=', '<<', '>>', '>>>', '+', '-', '*', '/', '%', '|', '^', '&', 'in', 'instanceof']);
	exports.BinaryOperator = BinaryOperator;
	// `left operator right`. Calls a binary operator.

	class BinaryExpression extends Expression {
		constructor(operator, /* BinaryOperator */left, /* Expression */right /* Expression */) {
			super();
			this.operator = operator;
			this.left = left;
			this.right = right;
		}
	}

	exports.BinaryExpression = BinaryExpression;
	const AssignmentOperator = new Set(['=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '|=', '^=', '&=']);

	exports.AssignmentOperator = AssignmentOperator;
	/*
 `left operator right`.
 Mutates an existing variable.
 Do not confuse with VariableDeclaration.
 */

	class AssignmentExpression extends Expression {
		constructor(operator, /* AssignmentOperator */left, /* Pattern */right /* Expression */) {
			super();
			this.operator = operator;
			this.left = left;
			this.right = right;
		}
	}

	exports.AssignmentExpression = AssignmentExpression;
	const UpdateOperator = new Set(['++', '--']);
	exports.UpdateOperator = UpdateOperator;
	/*
 `++argument` or `argument++`.
 Increments or decrements a number.
 */

	class UpdateExpression extends Expression {
		constructor(operator, // UpdateOperator
		argument, // Expression
		prefix) {
			// Boolean
			super();
			this.operator = operator;
			this.argument = argument;
			this.prefix = prefix;
		}
	}

	exports.UpdateExpression = UpdateExpression;
	const LogicalOperator = new Set(['||', '&&']);
	exports.LogicalOperator = LogicalOperator;
	/*
 `left operator right`.
 Calls a lazy logical operator.
 */

	class LogicalExpression extends Expression {
		constructor(operator, /* LogicalOperator */left, /* Expression */right /* Expression */) {
			super();
			this.operator = operator;
			this.left = left;
			this.right = right;
		}
	}

	// `test ? consequent : alternate`.
	exports.LogicalExpression = LogicalExpression;

	class ConditionalExpression extends Expression {
		constructor(test, // Expression
		consequent, // Expression
		alternate) {
			// Expression
			super();
			this.test = test;
			this.consequent = consequent;
			this.alternate = alternate;
		}
	}

	// Just like CallExpression but with `new` in front.
	exports.ConditionalExpression = ConditionalExpression;

	class NewExpression extends Expression {
		constructor(callee, /* Expression */_arguments /* Array[Expression] */) {
			super();
			this.callee = callee;
			this.arguments = _arguments;
		}
	}

	// `callee(arguments)`.
	exports.NewExpression = NewExpression;

	class CallExpression extends Expression {
		constructor(callee, /* Expression */_arguments /* Array[Expression] */) {
			super();
			this.callee = callee;
			this.arguments = _arguments;
		}
	}

	// `...args` in a CallExpression.
	exports.CallExpression = CallExpression;

	class SpreadElement extends Node {
		constructor(argument /* Expression */) {
			super();
			this.argument = argument;
		}
	}

	/*
 If computed === true, `object[property]`.
 Else, `object.property` -- meaning property should be an Identifier.
 */
	exports.SpreadElement = SpreadElement;

	class MemberExpression extends Expression {
		constructor(object, /* Expression */property, /* Expression */computed /* Boolean */) {
			if (computed === undefined) computed = !(property instanceof Identifier);
			if (!computed) (0, _privateUtil.assert)(property instanceof Identifier);
			super();
			this.object = object;
			this.property = property;
			this.computed = computed;
		}
	}

	// `yield argument` or `yield* argument`.
	exports.MemberExpression = MemberExpression;

	class YieldExpression extends Expression {
		constructor(argument, /* Expression */delegate /* Boolean */) {
			super();
			this.argument = argument;
			this.delegate = delegate;
		}
	}

	// Templates
	// A template with no tag.
	exports.YieldExpression = YieldExpression;

	class TemplateLiteral extends Expression {
		constructor(quasis, /* Array[TemplateElement] */expressions /* Array[Expression] */) {
			super();
			this.quasis = quasis;
			this.expressions = expressions;
			(0, _privateUtil.assert)(this.quasis.length === this.expressions.length + 1);
		}
	}

	// Part of a TemplateLiteral.
	exports.TemplateLiteral = TemplateLiteral;

	class TemplateElement extends Node {
		static forRawString(str) {
			return new TemplateElement(false, {
				// TODO: A way to calculate this?
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

		static get Empty() {
			return this.forString('');
		}

		constructor(tail, /* Boolean */value /* Object */) {
			super();
			this.tail = tail;
			this.value = value;
		}
	}

	exports.TemplateElement = TemplateElement;

	const escapeStringForTemplate = str => str.replace(/[{\\`\n\t\b\f\v\r\u2028\u2029]/g, ch => templateEscapes[ch]),
	      templateEscapes = {
		// Need to make sure "${" is escaped.
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

	// TemplateLiteral with a tag in front, like`this`.

	class TaggedTemplateExpression extends Expression {
		constructor(tag, /* Expression */quasi /* TemplateLiteral */) {
			super();
			this.tag = tag;
			this.quasi = quasi;
		}
	}

	// Patterns
	/*
 `{ a, b: c } = ...`.
 Object deconstructing pattern.
 */
	exports.TaggedTemplateExpression = TaggedTemplateExpression;

	class ObjectPattern extends Pattern {
		constructor(properties /* Array[AssignmentProperty] */) {
			super();
			this.properties = properties;
		}
	}

	/*
 Just like a Property, but kind is always `init`.
 Although technically its own type, `_.type` will be 'Property'.
 */
	exports.ObjectPattern = ObjectPattern;

	class AssignmentProperty extends Node {
		constructor(key, /* Identifier */value /* Pattern */) {
			// TODO:ES6 Optional args
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
			return true;
		}
		get computed() {
			return false;
		}
	}

	/*
 `[ a, b ] = ...`.
 Array deconstructing pattern.
 */
	exports.AssignmentProperty = AssignmentProperty;

	class ArrayPattern extends Pattern {
		constructor(elements /* Array[Opt[Pattern]] */) {
			super();
			this.elements = elements;
		}
	}

	/*
 Can be the last argument to a FunctionExpression/FunctionDeclaration
 or  go at the end of an ArrayPattern.
 */
	exports.ArrayPattern = ArrayPattern;

	class RestElement extends Pattern {
		constructor(argument /* Pattern */) {
			super();
			this.argument = argument;
		}
	}

	// TODO: What is this?
	// AssignmentPattern = p('AssignmentPattern',
	//	'left', Pattern,
	//	'right', Pattern),

	// Classes
	exports.RestElement = RestElement;
	const MethodDefinitionKind = new Set(['constructor', 'method', 'get', 'set']);
	exports.MethodDefinitionKind = MethodDefinitionKind;
	// Part of a ClassBody.

	class MethodDefinition extends Node {
		constructor(key, // Union[Identifier Literal]
		value, // FunctionExpression
		kind, // MethodDefinitionKind
		_static, // Boolean
		computed) {
			// Boolean
			if (kind === 'constructor') (0, _privateUtil.assert)(key instanceof Identifier && key.name === 'constructor');
			super();
			this.key = key;
			this.value = value;
			this.kind = kind;
			this.static = _static;
			this.computed = computed;
		}
	}

	// Contents of a Class.
	exports.MethodDefinition = MethodDefinition;

	class ClassBody extends Node {
		constructor(body /* Array[MethodDefinition] */) {
			super();
			this.body = body;
		}
	}

	// ClassDeclaration or ClassExpression.
	exports.ClassBody = ClassBody;

	class Class extends Node {}

	// TODO: extends Declaration too
	// Class in declaration position.
	exports.Class = Class;

	class ClassDeclaration extends Class {
		constructor(id, /* Identifier */superClass, /* Opt[Expression] */body /* ClassBody */) {
			super();
			this.id = id;
			this.superClass = superClass;
			this.body = body;
		}
	}

	// Class in expression position.
	exports.ClassDeclaration = ClassDeclaration;

	class ClassExpression extends Class {
		constructor(id, // Opt[Identifier]
		superClass, // Opt[Expression]
		body) {
			// ClassBody
			super();
			this.id = id;
			this.superClass = superClass;
			this.body = body;
		}
	}

	// Modules
	// A specifier in an import or export declaration.
	exports.ClassExpression = ClassExpression;

	class ModuleSpecifier extends Node {}

	// ImportSpecifier, ImportDefaultSpecifier, or ImportNamespaceSpecifier.
	exports.ModuleSpecifier = ModuleSpecifier;

	class ImportSpecifierAbstract extends Node {}

	/*
 `import specifiers from source`.
 Only one specifier may be a ImportDefaultSpecifier.
 If there is an ImportNamespaceSpecifier, it must be the only specifier.
 */
	exports.ImportSpecifierAbstract = ImportSpecifierAbstract;

	class ImportDeclaration extends Node {
		constructor(specifiers, /* Array[ImportSpecifierAbstract] */source /* LiteralString */) {
			super();
			this.specifiers = specifiers;
			this.source = source;
		}
	}

	/*
 A non-default import. Used in an ImportDeclaration.
 For `import { a } from "source"`, just pass one argument and local will = imported.
 For `import { a as b } from "source"`, make imported `a` and local `b`.
 */
	exports.ImportDeclaration = ImportDeclaration;

	class ImportSpecifier extends ModuleSpecifier {
		constructor(imported, /* Identifier */local /* Identifier */) {
			// TODO:ES6 Optional args
			if (local === undefined) local = imported;
			super();
			this.imported = imported;
			this.local = local;
		}
	}

	// The default export, as in `import a from "source"`.
	exports.ImportSpecifier = ImportSpecifier;

	class ImportDefaultSpecifier extends ImportSpecifierAbstract {
		constructor(local /* Identifier */) {
			super();
			this.local = local;
		}
	}

	// Object of every export, as in `import * as a from "source"`
	exports.ImportDefaultSpecifier = ImportDefaultSpecifier;

	class ImportNamespaceSpecifier extends ImportSpecifierAbstract {
		constructor(local /* Identifier */) {
			super();
			this.local = local;
		}
	}

	/*
 A non-default export. Used in an ExportNamedDeclaration.
 For `export { a } from "source"`, just pass one argument local will = exported.
 For `export { a as b }`, make exported `b` and local `a`.
 */
	exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;

	class ExportSpecifier extends ModuleSpecifier {
		constructor(exported, /* Identifier */local /* Identifier */) {
			// TODO:ES6 Optional args
			if (local === undefined) local = exported;
			super();
			this.exported = exported;
			this.local = local;
		}
	}

	/*
 Exports multiple values as in `export { a, b as c }`.
 If source !== null,
 re-exports from that module as in `export { ... } from "source"`.
 */
	exports.ExportSpecifier = ExportSpecifier;

	class ExportNamedDeclaration extends Node {
		constructor(declaration, /* Opt[Declaration] */
		specifiers, /* Array[ExportSpecifier] */
		source /* Opt[LiteralString] */) {
			super();
			this.declaration = declaration;
			this.specifiers = specifiers;
			this.source = source;
		}
	}

	// `export default declaration`.
	exports.ExportNamedDeclaration = ExportNamedDeclaration;

	class ExportDefaultDeclaration extends Node {
		constructor(declaration /* Union[Declaration, Expression] */) {
			super();
			this.declaration = declaration;
		}
	}

	// `export * from source`.
	exports.ExportDefaultDeclaration = ExportDefaultDeclaration;

	class ExportAllDeclaration extends Node {
		constructor(source /* LiteralString */) {
			super();
			this.source = source;
		}
	}

	exports.ExportAllDeclaration = ExportAllDeclaration;
});
//# sourceMappingURL=data:application/json;base64,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Q2xELGFBQVcsQ0FBQyxXQUFXLHVDQUF1QztBQUM3RCxRQUFLLEVBQUUsQ0FBQTtBQUNQLE9BQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO0dBQzlCO0VBQ0Q7Ozs7O0FBR00sT0FBTSxvQkFBb0IsU0FBUyxJQUFJLENBQUM7QUFDOUMsYUFBVyxDQUFDLE1BQU0sc0JBQXNCO0FBQ3ZDLFFBQUssRUFBRSxDQUFBO0FBQ1AsT0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7R0FDcEI7RUFDRCIsImZpbGUiOiJhc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuL3ByaXZhdGUvdXRpbCdcblxuLy8gQmFzZSB0eXBlIG9mIGFsbCBBc3RzLlxuZXhwb3J0IGNsYXNzIE5vZGUge1xuXHR0b0pTT04oKSB7XG5cdFx0Y29uc3Qgb2JqID0geyB9XG5cdFx0b2JqLnR5cGUgPSB0aGlzLnR5cGVcblx0XHQvLyBTb3J0IHRvIG1ha2UgSlNPTiByZW5kZXJpbmcgZGV0ZXJtaW5pc3RpYy5cblx0XHRPYmplY3Qua2V5cyh0aGlzKS5zb3J0KCkuZm9yRWFjaChrZXkgPT4geyBvYmpba2V5XSA9IHRoaXNba2V5XSB9KVxuXHRcdHJldHVybiBvYmpcblx0fVxuXG5cdGdldCB0eXBlKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWVcblx0fVxuXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKVxuXHR9XG59XG5cbi8vIEFic3RyYWN0c1xuXHRleHBvcnQgY2xhc3MgRGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8vIEJsb2NrcyBvZiBjb2RlIGhhdmUgbGluZXMgdGhhdCBhcmUgU3RhdGVtZW50cyBvciBEZWNsYXJhdGlvbnMuXG5cdGV4cG9ydCBjbGFzcyBTdGF0ZW1lbnQgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8vIENvZGUgdGhhdCBoYXMgYSB2YWx1ZS4gVG8gdXNlIG9uZSBpbiBhIHN0YXRlbWVudCBwb3NpdGlvbiwgc2VlIEV4cHJlc3Npb25TdGF0ZW1lbnQuXG5cdGV4cG9ydCBjbGFzcyBFeHByZXNzaW9uIGV4dGVuZHMgTm9kZSB7IH1cblxuXHQvLyBDYW4gZ28gaW4gYSBwYXJhbWV0ZXIgbGlzdCBvciBvbiB0aGUgbGVmdCBzaWRlIG9mIGFuIGFzc2lnbm1lbnQuXG5cdGV4cG9ydCBjbGFzcyBQYXR0ZXJuIGV4dGVuZHMgTm9kZSB7IH1cblxuLy8gQSBjb21wbGV0ZSBwcm9ncmFtIHNvdXJjZSB0cmVlLlxuZXhwb3J0IGNsYXNzIFByb2dyYW0gZXh0ZW5kcyBOb2RlIHtcblx0Y29uc3RydWN0b3IoYm9keSAvKiBBcnJheVtTdGF0ZW1lbnRdICovKSB7XG5cdFx0c3VwZXIoKVxuXHRcdHRoaXMuYm9keSA9IGJvZHlcblx0fVxufVxuXG4vLyBWYXJpYWJsZXNcblx0Lypcblx0QSBKYXZhU2NyaXB0IGlkZW50aWZpZXIuXG5cdEl0IGlzIGFzc3VtZWQgdGhhdCB5b3UgaGF2ZSBjYWxsZWQgYG1hbmdsZUlkZW50aWZpZXJgIGFzIGFwcHJvcHJpYXRlLlxuXHRBbHNvIGxvb2sgYXQgYGVzYXN0LnV0aWwgaWRDYWNoZWRgLFxuXHR3aGljaCBtYW5nbGVzIGFuZCBhdm9pZHMgY29uc3RydWN0aW5nIHRoZSBzYW1lIGlkZW50aWZpZXIgdHdpY2UuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBJZGVudGlmaWVyIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IobmFtZSAvKiBTdHJpbmcgKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMubmFtZSA9IG5hbWVcblx0XHR9XG5cdH1cblxuXHRleHBvcnQgY2xhc3MgVmFyaWFibGVEZWNsYXJhdG9yIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoaWQgLyogUGF0dGVybiAqLywgaW5pdCAvKiBPcHRbRXhwcmVzc2lvbl0gKi8pIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChpbml0PT09IHVuZGVmaW5lZClcblx0XHRcdFx0aW5pdCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuaWQgPSBpZFxuXHRcdFx0dGhpcy5pbml0ID0gaW5pdFxuXHRcdH1cblx0fVxuXG5cdGV4cG9ydCBjb25zdCBWYXJpYWJsZURlY2xhcmF0aW9uS2luZCA9IG5ldyBTZXQoWyAnY29uc3QnLCAnbGV0JywgJ3ZhcicgXSlcblx0Lypcblx0RGVjbGFyZXMgYW5kIG9wdGlvbmFsbHkgaW5pdGlhbGl6ZXMgbWFueSB2YXJpYWJsZXMuXG5cdE11c3QgYmUgYXQgbGVhc3Qgb25lIGRlY2xhcmF0aW9uLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgVmFyaWFibGVEZWNsYXJhdGlvbiBleHRlbmRzIERlY2xhcmF0aW9uIHtcblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdGtpbmQsIC8vIFZhcmlhYmxlRGVjbGFyYXRpb25LaW5kXG5cdFx0XHRkZWNsYXJhdGlvbnMpIHsgLy8gQXJyYXlbVmFyaWFibGVEZWNsYXJhdG9yXVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5raW5kID0ga2luZFxuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbnMgPSBkZWNsYXJhdGlvbnNcblx0XHRcdGFzc2VydCh0aGlzLmRlY2xhcmF0aW9ucy5sZW5ndGggPj0gMSlcblx0XHR9XG5cdH1cblxuXG4vLyBTdGF0ZW1lbnRzXG5cdC8qXG5cdEFuIGVtcHR5IHN0YXRlbWVudCwgaS5lLiwgYSBzb2xpdGFyeSBzZW1pY29sb24uXG5cdE5vdCB1c2VmdWwgZm9yIGNvZGUgZ2VuZXJhdGlvbiwgYnV0IHNvbWUgcGFyc2VycyB3aWxsIHJldHVybiB0aGVzZS5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEVtcHR5U3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHsgfVxuXG5cdC8vIEEgYmxvY2sgc3RhdGVtZW50LCBpLmUuLCBhIHNlcXVlbmNlIG9mIHN0YXRlbWVudHMgc3Vycm91bmRlZCBieSBicmFjZXMuXG5cdGV4cG9ydCBjbGFzcyBCbG9ja1N0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYm9keSAvKiBBcnJheVtTdGF0ZW1lbnQgKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRBbiBleHByZXNzaW9uIHN0YXRlbWVudCwgaS5lLiwgYSBzdGF0ZW1lbnQgY29uc2lzdGluZyBvZiBhIHNpbmdsZSBleHByZXNzaW9uLlxuXHRTZWUgYGVzYXN0LnV0aWwgdG9TdGF0ZW1lbnQgdG9TdGF0ZW1lbnRzYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25TdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGV4cHJlc3Npb24gLyogRXhwcmVzc2lvbiAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvblxuXHRcdH1cblx0fVxuXG5cdC8vIEFuIGlmIChvciBpZiAuLi4gZWxzZSkgc3RhdGVtZW50LlxuXHRleHBvcnQgY2xhc3MgSWZTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKFxuXHRcdFx0dGVzdCwgLy8gRXhwcmVzc2lvblxuXHRcdFx0Y29uc2VxdWVudCwgLy8gU3RhdGVtZW50XG5cdFx0XHRhbHRlcm5hdGUpIHsgLy8gT3B0W1N0YXRlbWVudF1cblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3VtZW50c1xuXHRcdFx0aWYgKGFsdGVybmF0ZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRhbHRlcm5hdGUgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnRlc3QgPSB0ZXN0XG5cdFx0XHR0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50XG5cdFx0XHR0aGlzLmFsdGVybmF0ZSA9IGFsdGVybmF0ZVxuXHRcdH1cblx0fVxuXG5cdC8vIEEgc3RhdGVtZW50IHByZWZpeGVkIGJ5IGEgbGFiZWwuXG5cdGV4cG9ydCBjbGFzcyBMYWJlbGVkU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihsYWJlbCAvKiBJZGVudGlmaWVyICovLCBib2R5IC8qIFN0YXRlbWVudCAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5sYWJlbCA9IGxhYmVsXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIEJyZWFrU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHQvLyBUaGUgYGJyZWFrYCBrZXl3b3JkLlxuXHRcdGNvbnN0cnVjdG9yKGxhYmVsIC8qIE9wdFtJZGVudGlmaWVyXSAqLykge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxhYmVsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxhYmVsID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5sYWJlbCA9IGxhYmVsXG5cdFx0fVxuXHR9XG5cblx0Ly8gVGhlIGBjb250aW51ZWAga2V5d29yZC5cblx0ZXhwb3J0IGNsYXNzIENvbnRpbnVlU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihsYWJlbCAvKiBPcHRbSWRlbnRpZmllcl0gKi8pIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChsYWJlbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRsYWJlbCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMubGFiZWwgPSBsYWJlbFxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdHN3aXRjaCAoZGlzY3JpbWluYW50KSB7IGNhc2VzIH1cblx0T25seSB0aGUgbGFzdCBlbnRyeSBvZiBgY2FzZXNgIGlzIGFsbG93ZWQgdG8gYmUgYGRlZmF1bHRgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgU3dpdGNoU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihkaXNjcmltaW5hbnQgLyogRXhwcmVzc2lvbiAqLywgY2FzZXMgLyogQXJyYXlbU3dpdGNoQ2FzZV0gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuZGlzY3JpbWluYW50ID0gZGlzY3JpbWluYW50XG5cdFx0XHR0aGlzLmNhc2VzID0gY2FzZXNcblx0XHR9XG5cdH1cblx0Lypcblx0QSBzaW5nbGUgYGNhc2VgIHdpdGhpbiBhIFN3aXRjaFN0YXRlbWVudC5cblx0SWYgYHRlc3RgIGlzIGBudWxsYCwgdGhpcyBpcyB0aGUgYGRlZmF1bHRgIGNhc2UuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBTd2l0Y2hDYXNlIGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcih0ZXN0IC8qIE9wdFtFeHByZXNzaW9uXSAqLywgY29uc2VxdWVudCAvKiBBcnJheVtTdGF0ZW1lbnRdICovKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAodGVzdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHR0ZXN0ID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0dGhpcy5jb25zZXF1ZW50ID0gY29uc2VxdWVudFxuXHRcdH1cblx0fVxuXG5cdC8vIFRoZSBgcmV0dXJuYCBrZXl3b3JkLCBvcHRpb25hbGx5IGZvbGxvd2VkIGJ5IGFuIEV4cHJlc3Npb24gdG8gcmV0dXJuLlxuXHRleHBvcnQgY2xhc3MgUmV0dXJuU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCAvKiBPcHRbRXhwcmVzc2lvbl0gKi8pIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChhcmd1bWVudCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRhcmd1bWVudCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFRoZSBgdGhyb3dgIGtleXdvcmQsIGFuZCBzb21ldGhpbmcgdG8gdGhyb3cuXG5cdFNlZSBgZXNhc3QudXRpbCB0aHJvd0Vycm9yYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFRocm93U3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCAvKiBFeHByZXNzaW9uICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cdH1cblxuXHQvLyBgdHJ5IHsgYmxvY2sgfSBjYXRjaCAoaGFuZGxlci5wYXJhbSkgeyBoYW5kbGVyLmJvZHkgfSBmaW5hbGx5IHsgZmluYWxpemVyIH1gXG5cdC8vIEF0IGxlYXN0IG9uZSBvZiBgaGFuZGxlcmAgb3IgYGZpbmFsaXplcmAgbXVzdCBiZSBub24tbnVsbC5cblx0ZXhwb3J0IGNsYXNzIFRyeVN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHRibG9jayAvKiBCbG9ja1N0YXRlbWVudCAqLyxcblx0XHRcdGhhbmRsZXIgLyogT3B0W0NhdGNoQ2xhdXNlXSAqLyxcblx0XHRcdGZpbmFsaXplciAvKiBPcHRbQmxvY2tTdGF0ZW1lbnRdICovKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRoYW5kbGVyID0gbnVsbFxuXHRcdFx0aWYgKGZpbmFsaXplciA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRmaW5hbGl6ZXIgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmJsb2NrID0gYmxvY2tcblx0XHRcdHRoaXMuaGFuZGxlciA9IGhhbmRsZXJcblx0XHRcdHRoaXMuZmluYWxpemVyID0gZmluYWxpemVyXG5cdFx0fVxuXHR9XG5cdC8vIE11c3QgYmUgKnBhcnQqIG9mIGEgVHJ5U3RhdGVtZW50IC0tIGRvZXMgKm5vdCogZm9sbG93IGl0LlxuXHRleHBvcnQgY2xhc3MgQ2F0Y2hDbGF1c2UgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihwYXJhbSAvKiBQYXR0ZXJuICovLCBib2R5IC8qIEJsb2NrU3RhdGVtZW50ICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnBhcmFtID0gcGFyYW1cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvLyBgd2hpbGUgKHRlc3QpIGJvZHlgXG5cdGV4cG9ydCBjbGFzcyBXaGlsZVN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IodGVzdCAvKiBFeHByZXNzaW9uICovLCBib2R5IC8qIFN0YXRlbWVudCAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8vIGBkbyBib2R5IHdoaWxlICh0ZXN0KWAuXG5cdGV4cG9ydCBjbGFzcyBEb1doaWxlU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihib2R5IC8qIFN0YXRlbWVudCAqLywgdGVzdCAvKiBFeHByZXNzaW9uICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0XHR0aGlzLnRlc3QgPSB0ZXN0XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0YGZvciAoaW5pdDsgdGVzdDsgdXBkYXRlKSBib2R5YC5cblx0Tm90IHRvIGJlIGNvbmZ1c2VkIHdpdGggRm9ySW5TdGF0ZW1lbnQgb3IgRm9yT2ZTdGF0ZW1lbnQuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBGb3JTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKFxuXHRcdFx0aW5pdCwgLy8gT3B0W1VuaW9uW1ZhcmlhYmxlRGVjbGFyYXRpb24gRXhwcmVzc2lvbl1dXG5cdFx0XHR0ZXN0LCAvLyBPcHRbRXhwcmVzc2lvbl1cblx0XHRcdHVwZGF0ZSwgLy8gT3B0W0V4cHJlc3Npb25dXG5cdFx0XHRib2R5KSB7IC8vIFN0YXRlbWVudFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5pbml0ID0gaW5pdFxuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0dGhpcy51cGRhdGUgPSB1cGRhdGVcblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvLyBgZm9yIChsZWZ0IGluIHJpZ2h0KSBib2R5YC5cblx0ZXhwb3J0IGNsYXNzIEZvckluU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdGxlZnQsIC8vIFVuaW9uW1ZhcmlhYmxlRGVjbGFyYXRpb24gRXhwcmVzc2lvbl1cblx0XHRcdHJpZ2h0LCAvLyBFeHByZXNzaW9uXG5cdFx0XHRib2R5KSB7IC8vIFN0YXRlbWVudFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0Ly8gYGZvciAobGVmdCBvZiByaWdodCkgYm9keWAuXG5cdGV4cG9ydCBjbGFzcyBGb3JPZlN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHRsZWZ0LCAvLyBVbmlvbltWYXJpYWJsZURlY2xhcmF0aW9uIEV4cHJlc3Npb25dXG5cdFx0XHRyaWdodCwgLy8gRXhwcmVzc2lvblxuXHRcdFx0Ym9keSkgeyAvLyBTdGF0ZW1lbnRcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8vIFRoZSBgZGVidWdnZXJgIGtleXdvcmQuXG5cdGV4cG9ydCBjbGFzcyBEZWJ1Z2dlclN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7IH1cblxuLy8gRGVjbGFyYXRpb25zXG5cdC8vIEZ1bmN0aW9uRGVjbGFyYXRpb24gb3IgRnVuY3Rpb25FeHByZXNzaW9uIG9yIEFycm93RnVuY3Rpb25FeHByZXNzaW9uXG5cdGV4cG9ydCBjbGFzcyBGdW5jdGlvbkFic3RyYWN0IGV4dGVuZHMgTm9kZSB7IH1cblxuXHRjbGFzcyBGdW5jdGlvbk5vbkFycm93IGV4dGVuZHMgRnVuY3Rpb25BYnN0cmFjdCB7XG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHRpZCwgLy8gSWRlbnRpZmllclxuXHRcdFx0cGFyYW1zLCAvLyBBcnJheVtQYXR0ZXJuXVxuXHRcdFx0Ym9keSwgLy8gQmxvY2tTdGF0ZW1lbnRcblx0XHRcdGdlbmVyYXRvcikgeyAvLyBCb29sZWFuXG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAoZ2VuZXJhdG9yID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGdlbmVyYXRvciA9IGZhbHNlXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdHRoaXMucGFyYW1zID0gcGFyYW1zXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0XHR0aGlzLmdlbmVyYXRvciA9IGdlbmVyYXRvclxuXHRcdH1cblx0fVxuXG5cdC8vIFRPRE86IERlY2xhcmF0aW9uIHRvb1xuXHRleHBvcnQgY2xhc3MgRnVuY3Rpb25EZWNsYXJhdGlvbiBleHRlbmRzIEZ1bmN0aW9uTm9uQXJyb3cgeyB9XG5cbi8vIEV4cHJlc3Npb25zXG5cdC8vIFRPRE86IExpdGVyYWwgYXMgYWJzdHJhY3QgdHlwZVxuXHQvLyBWYWx1ZTogTnVtYmVyIHwgU3RyaW5nIHwgbnVsbCB8IEJvb2xlYW5cblx0ZXhwb3J0IGNsYXNzIExpdGVyYWwgZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0fVxuXHR9XG5cblx0Ly8gVGhlIGB0aGlzYCBrZXl3b3JkLlxuXHRleHBvcnQgY2xhc3MgVGhpc0V4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHsgfVxuXG5cdGV4cG9ydCBjbGFzcyBBcnJheUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihlbGVtZW50cyAvKiBBcnJheVtPcHRbRXhwcmVzc2lvbl1dICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmVsZW1lbnRzID0gZWxlbWVudHNcblx0XHR9XG5cdH1cblxuXHRleHBvcnQgY29uc3QgUHJvcGVydHlLaW5kID0gbmV3IFNldChbICdpbml0JywgJ2dldCcsICdzZXQnIF0pXG5cdC8qXG5cdFBhcnQgb2YgYW4gT2JqZWN0RXhwcmVzc2lvbi5cblx0SWYga2luZCBpcyAnZ2V0JyBvciAnc2V0JywgdGhlbiB2YWx1ZSBzaG91bGQgYmUgYSBGdW5jdGlvbkV4cHJlc3Npb24uXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBQcm9wZXJ0eSBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKFxuXHRcdFx0a2luZCwgLy8gUHJvcGVydHlLaW5kXG5cdFx0XHRrZXksIC8vIFVuaW9uW0xpdGVyYWwgSWRlbnRpZmllcl1cblx0XHRcdHZhbHVlLCAvLyBFeHByZXNzaW9uXG5cdFx0XHRtZXRob2QsIC8vIEJvb2xlYW5cblx0XHRcdHNob3J0aGFuZCwgLy8gQm9vbGVhblxuXHRcdFx0Y29tcHV0ZWQpIHsgLy8gQm9vbGVhblxuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRtZXRob2QgPSBzaG9ydGhhbmQgPSBjb21wdXRlZCA9IGZhbHNlXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmtpbmQgPSBraW5kXG5cdFx0XHR0aGlzLmtleSA9IGtleVxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0XHR0aGlzLm1ldGhvZCA9IG1ldGhvZFxuXHRcdFx0dGhpcy5zaG9ydGhhbmRcblx0XHRcdHRoaXMuY29tcHV0ZWQgPSBjb21wdXRlZFxuXHRcdH1cblx0fVxuXG5cdC8vIEFuIG9iamVjdCBsaXRlcmFsLlxuXHRleHBvcnQgY2xhc3MgT2JqZWN0RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgLyogQXJyYXlbUHJvcGVydHldICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzXG5cdFx0fVxuXHR9XG5cblx0Ly8gVE9ETzogRXhwcmVzc2lvbiB0b29cblx0ZXhwb3J0IGNsYXNzIEZ1bmN0aW9uRXhwcmVzc2lvbiBleHRlbmRzIEZ1bmN0aW9uTm9uQXJyb3cgeyB9XG5cblx0Ly8gTGlrZSBGdW5jdGlvbkV4cHJlc3Npb24gYnV0IHVzZXMgdGhlIGBwYXJhbXMgPT4gYm9keWAgZm9ybS5cblx0Ly8gVE9ETzogZXh0ZW5kcyBGdW5jdGlvbkFic3RyYWN0IHRvb1xuXHRleHBvcnQgY2xhc3MgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihwYXJhbXMgLyogQXJyYXlbUGF0dGVybl0gKi8sIGJvZHkgLyogVW5pb25bQmxvY2tTdGF0ZW1lbnQsIEV4cHJlc3Npb25dICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnBhcmFtcyA9IHBhcmFtc1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdGBleHByZXNzaW9uc1swXSwgZXhwcmVzc2lvbnNbMV0sIC4uLmAuXG5cdEV4cHJlc3Npb24gY29tcG9zZWQgb2Ygb3RoZXIgZXhwcmVzc2lvbnMsIHNlcGFyYXRlZCBieSB0aGUgY29tbWEgb3BlcmF0b3IuXG5cdCpOb3QqIGZvciBwYXJhbWV0ZXIgbGlzdHMuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBTZXF1ZW5jZUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihleHByZXNzaW9ucyAvKiBBcnJheVtFeHByZXNzaW9uXSAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5leHByZXNzaW9ucyA9IGV4cHJlc3Npb25zXG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGNvbnN0IFVuYXJ5T3BlcmF0b3IgPSBuZXcgU2V0KFsgJy0nLCAnKycsICchJywgJ34nLCAndHlwZW9mJywgJ3ZvaWQnLCAnZGVsZXRlJyBdKVxuXG5cdC8vIGBvcGVyYXRvciBhcmd1bWVudGAuIENhbGxzIGEgdW5hcnkgb3BlcmF0b3IuXG5cdGV4cG9ydCBjbGFzcyBVbmFyeUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciAvKiBVbmFyeU9wZXJhdG9yICovLCBhcmd1bWVudCAvKiBFeHByZXNzaW9uICovLCBwcmVmaXggLyogQm9vbGVhbiAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHRcdGFzc2VydChwcmVmaXggPT09IHVuZGVmaW5lZCB8fCBwcmVmaXggPT09IHRydWUpXG5cdFx0fVxuXG5cdFx0Z2V0IHByZWZpeCgpIHtcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGNvbnN0IEJpbmFyeU9wZXJhdG9yID0gbmV3IFNldChbXG5cdFx0Jz09JywgJyE9JywgJz09PScsICchPT0nLFxuXHRcdCc8JywgJzw9JywgJz4nLCAnPj0nLFxuXHRcdCc8PCcsICc+PicsICc+Pj4nLFxuXHRcdCcrJywgJy0nLCAnKicsICcvJywgJyUnLFxuXHRcdCd8JywgJ14nLCAnJicsICdpbicsXG5cdFx0J2luc3RhbmNlb2YnXSlcblx0Ly8gYGxlZnQgb3BlcmF0b3IgcmlnaHRgLiBDYWxscyBhIGJpbmFyeSBvcGVyYXRvci5cblx0ZXhwb3J0IGNsYXNzIEJpbmFyeUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciAvKiBCaW5hcnlPcGVyYXRvciAqLywgbGVmdCAvKiBFeHByZXNzaW9uICovLCByaWdodCAvKiBFeHByZXNzaW9uICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdH1cblx0fVxuXG5cdGV4cG9ydCBjb25zdCBBc3NpZ25tZW50T3BlcmF0b3IgPSBuZXcgU2V0KFtcblx0XHQnPScsICcrPScsICctPScsICcqPScsICcvPScsICclPScsXG5cdFx0Jzw8PScsICc+Pj0nLCAnPj4+PScsXG5cdFx0J3w9JywgJ149JywgJyY9J1xuXHRdKVxuXG5cdC8qXG5cdGBsZWZ0IG9wZXJhdG9yIHJpZ2h0YC5cblx0TXV0YXRlcyBhbiBleGlzdGluZyB2YXJpYWJsZS5cblx0RG8gbm90IGNvbmZ1c2Ugd2l0aCBWYXJpYWJsZURlY2xhcmF0aW9uLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgQXNzaWdubWVudEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciAvKiBBc3NpZ25tZW50T3BlcmF0b3IgKi8sIGxlZnQgLyogUGF0dGVybiAqLywgcmlnaHQgLyogRXhwcmVzc2lvbiAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHR9XG5cdH1cblxuXHRleHBvcnQgY29uc3QgVXBkYXRlT3BlcmF0b3IgPSBuZXcgU2V0KFsgJysrJywgJy0tJyBdKVxuXHQvKlxuXHRgKythcmd1bWVudGAgb3IgYGFyZ3VtZW50KytgLlxuXHRJbmNyZW1lbnRzIG9yIGRlY3JlbWVudHMgYSBudW1iZXIuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBVcGRhdGVFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHRvcGVyYXRvciwgLy8gVXBkYXRlT3BlcmF0b3Jcblx0XHRcdGFyZ3VtZW50LCAvLyBFeHByZXNzaW9uXG5cdFx0XHRwcmVmaXgpIHsgLy8gQm9vbGVhblxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHRcdHRoaXMucHJlZml4ID0gcHJlZml4XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGNvbnN0IExvZ2ljYWxPcGVyYXRvciA9IG5ldyBTZXQoWyAnfHwnLCAnJiYnIF0pXG5cdC8qXG5cdGBsZWZ0IG9wZXJhdG9yIHJpZ2h0YC5cblx0Q2FsbHMgYSBsYXp5IGxvZ2ljYWwgb3BlcmF0b3IuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBMb2dpY2FsRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yIC8qIExvZ2ljYWxPcGVyYXRvciAqLywgbGVmdCAvKiBFeHByZXNzaW9uICovLCByaWdodCAvKiBFeHByZXNzaW9uICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdH1cblx0fVxuXG5cdC8vIGB0ZXN0ID8gY29uc2VxdWVudCA6IGFsdGVybmF0ZWAuXG5cdGV4cG9ydCBjbGFzcyBDb25kaXRpb25hbEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdHRlc3QsIC8vIEV4cHJlc3Npb25cblx0XHRcdGNvbnNlcXVlbnQsIC8vIEV4cHJlc3Npb25cblx0XHRcdGFsdGVybmF0ZSkgeyAvLyBFeHByZXNzaW9uXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnRlc3QgPSB0ZXN0XG5cdFx0XHR0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50XG5cdFx0XHR0aGlzLmFsdGVybmF0ZSA9IGFsdGVybmF0ZVxuXHRcdH1cblx0fVxuXG5cdC8vIEp1c3QgbGlrZSBDYWxsRXhwcmVzc2lvbiBidXQgd2l0aCBgbmV3YCBpbiBmcm9udC5cblx0ZXhwb3J0IGNsYXNzIE5ld0V4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihjYWxsZWUgLyogRXhwcmVzc2lvbiAqLywgX2FyZ3VtZW50cyAvKiBBcnJheVtFeHByZXNzaW9uXSAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5jYWxsZWUgPSBjYWxsZWVcblx0XHRcdHRoaXMuYXJndW1lbnRzID0gX2FyZ3VtZW50c1xuXHRcdH1cblx0fVxuXG5cdC8vIGBjYWxsZWUoYXJndW1lbnRzKWAuXG5cdGV4cG9ydCBjbGFzcyBDYWxsRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKGNhbGxlZSAvKiBFeHByZXNzaW9uICovLCBfYXJndW1lbnRzIC8qIEFycmF5W0V4cHJlc3Npb25dICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmNhbGxlZSA9IGNhbGxlZVxuXHRcdFx0dGhpcy5hcmd1bWVudHMgPSBfYXJndW1lbnRzXG5cdFx0fVxuXHR9XG5cdC8vIGAuLi5hcmdzYCBpbiBhIENhbGxFeHByZXNzaW9uLlxuXHRleHBvcnQgY2xhc3MgU3ByZWFkRWxlbWVudCBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGFyZ3VtZW50IC8qIEV4cHJlc3Npb24gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdElmIGNvbXB1dGVkID09PSB0cnVlLCBgb2JqZWN0W3Byb3BlcnR5XWAuXG5cdEVsc2UsIGBvYmplY3QucHJvcGVydHlgIC0tIG1lYW5pbmcgcHJvcGVydHkgc2hvdWxkIGJlIGFuIElkZW50aWZpZXIuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBNZW1iZXJFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob2JqZWN0IC8qIEV4cHJlc3Npb24gKi8sIHByb3BlcnR5IC8qIEV4cHJlc3Npb24gKi8sIGNvbXB1dGVkIC8qIEJvb2xlYW4gKi8pIHtcblx0XHRcdGlmIChjb21wdXRlZCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRjb21wdXRlZCA9ICEocHJvcGVydHkgaW5zdGFuY2VvZiBJZGVudGlmaWVyKVxuXHRcdFx0aWYgKCFjb21wdXRlZClcblx0XHRcdFx0YXNzZXJ0KHByb3BlcnR5IGluc3RhbmNlb2YgSWRlbnRpZmllcilcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMub2JqZWN0ID0gb2JqZWN0XG5cdFx0XHR0aGlzLnByb3BlcnR5ID0gcHJvcGVydHlcblx0XHRcdHRoaXMuY29tcHV0ZWQgPSBjb21wdXRlZFxuXHRcdH1cblx0fVxuXG5cdC8vIGB5aWVsZCBhcmd1bWVudGAgb3IgYHlpZWxkKiBhcmd1bWVudGAuXG5cdGV4cG9ydCBjbGFzcyBZaWVsZEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCAvKiBFeHByZXNzaW9uICovLCBkZWxlZ2F0ZSAvKiBCb29sZWFuICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHRcdHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZVxuXHRcdH1cblx0fVxuXG5cdC8vIFRlbXBsYXRlc1xuXHRcdC8vIEEgdGVtcGxhdGUgd2l0aCBubyB0YWcuXG5cdFx0ZXhwb3J0IGNsYXNzIFRlbXBsYXRlTGl0ZXJhbCBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdFx0Y29uc3RydWN0b3IocXVhc2lzIC8qIEFycmF5W1RlbXBsYXRlRWxlbWVudF0gKi8sIGV4cHJlc3Npb25zIC8qIEFycmF5W0V4cHJlc3Npb25dICovKSB7XG5cdFx0XHRcdHN1cGVyKClcblx0XHRcdFx0dGhpcy5xdWFzaXMgPSBxdWFzaXNcblx0XHRcdFx0dGhpcy5leHByZXNzaW9ucyA9IGV4cHJlc3Npb25zXG5cdFx0XHRcdGFzc2VydCh0aGlzLnF1YXNpcy5sZW5ndGggPT09IHRoaXMuZXhwcmVzc2lvbnMubGVuZ3RoICsgMSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBQYXJ0IG9mIGEgVGVtcGxhdGVMaXRlcmFsLlxuXHRcdGV4cG9ydCBjbGFzcyBUZW1wbGF0ZUVsZW1lbnQgZXh0ZW5kcyBOb2RlIHtcblx0XHRcdHN0YXRpYyBmb3JSYXdTdHJpbmcoc3RyKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVGVtcGxhdGVFbGVtZW50KGZhbHNlLCB7XG5cdFx0XHRcdFx0Ly8gVE9ETzogQSB3YXkgdG8gY2FsY3VsYXRlIHRoaXM/XG5cdFx0XHRcdFx0Y29va2VkOiBudWxsLFxuXHRcdFx0XHRcdHJhdzogc3RyXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHRcdHN0YXRpYyBmb3JTdHJpbmcoc3RyKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVGVtcGxhdGVFbGVtZW50KGZhbHNlLCB7XG5cdFx0XHRcdFx0Y29va2VkOiBzdHIsXG5cdFx0XHRcdFx0cmF3OiBlc2NhcGVTdHJpbmdGb3JUZW1wbGF0ZShzdHIpXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHRcdHN0YXRpYyBnZXQgRW1wdHkoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmZvclN0cmluZygnJylcblx0XHRcdH1cblxuXHRcdFx0Y29uc3RydWN0b3IodGFpbCAvKiBCb29sZWFuICovLCB2YWx1ZSAvKiBPYmplY3QgKi8pIHtcblx0XHRcdFx0c3VwZXIoKVxuXHRcdFx0XHR0aGlzLnRhaWwgPSB0YWlsXG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0XG5cdFx0XHRlc2NhcGVTdHJpbmdGb3JUZW1wbGF0ZSA9IHN0ciA9PlxuXHRcdFx0XHRzdHIucmVwbGFjZSgvW3tcXFxcYFxcblxcdFxcYlxcZlxcdlxcclxcdTIwMjhcXHUyMDI5XS9nLCBjaCA9PiB0ZW1wbGF0ZUVzY2FwZXNbY2hdKSxcblx0XHRcdHRlbXBsYXRlRXNjYXBlcyA9IHtcblx0XHRcdFx0Ly8gTmVlZCB0byBtYWtlIHN1cmUgXCIke1wiIGlzIGVzY2FwZWQuXG5cdFx0XHRcdCd7JzogJ1xcXFx7Jyxcblx0XHRcdFx0J2AnOiAnXFxcXGAnLFxuXHRcdFx0XHQnXFxcXCc6ICdcXFxcXFxcXCcsXG5cdFx0XHRcdCdcXG4nOiAnXFxcXG4nLFxuXHRcdFx0XHQnXFx0JzogJ1xcXFx0Jyxcblx0XHRcdFx0J1xcYic6ICdcXFxcYicsXG5cdFx0XHRcdCdcXGYnOiAnXFxcXGYnLFxuXHRcdFx0XHQnXFx2JzogJ1xcXFx2Jyxcblx0XHRcdFx0J1xccic6ICdcXFxccicsXG5cdFx0XHRcdCdcXHUyMDI4JzogJ1xcXFx1MjAyOCcsXG5cdFx0XHRcdCdcXHUyMDI5JzogJ1xcXFx1MjAyOSdcblx0XHRcdH1cblxuXHRcdC8vIFRlbXBsYXRlTGl0ZXJhbCB3aXRoIGEgdGFnIGluIGZyb250LCBsaWtlYHRoaXNgLlxuXHRcdGV4cG9ydCBjbGFzcyBUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRcdGNvbnN0cnVjdG9yKHRhZyAvKiBFeHByZXNzaW9uICovLCBxdWFzaSAvKiBUZW1wbGF0ZUxpdGVyYWwgKi8pIHtcblx0XHRcdFx0c3VwZXIoKVxuXHRcdFx0XHR0aGlzLnRhZyA9IHRhZ1xuXHRcdFx0XHR0aGlzLnF1YXNpID0gcXVhc2lcblx0XHRcdH1cblx0XHR9XG5cbi8vIFBhdHRlcm5zXG5cdC8qXG5cdGB7IGEsIGI6IGMgfSA9IC4uLmAuXG5cdE9iamVjdCBkZWNvbnN0cnVjdGluZyBwYXR0ZXJuLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgT2JqZWN0UGF0dGVybiBleHRlbmRzIFBhdHRlcm4ge1xuXHRcdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgLyogQXJyYXlbQXNzaWdubWVudFByb3BlcnR5XSAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllc1xuXHRcdH1cblx0fVxuXHQvKlxuXHRKdXN0IGxpa2UgYSBQcm9wZXJ0eSwgYnV0IGtpbmQgaXMgYWx3YXlzIGBpbml0YC5cblx0QWx0aG91Z2ggdGVjaG5pY2FsbHkgaXRzIG93biB0eXBlLCBgXy50eXBlYCB3aWxsIGJlICdQcm9wZXJ0eScuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBBc3NpZ25tZW50UHJvcGVydHkgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihrZXkgLyogSWRlbnRpZmllciAqLywgdmFsdWUgLyogUGF0dGVybiAqLykge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdHZhbHVlID0ga2V5XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmtleSA9IGtleVxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0fVxuXG5cdFx0Z2V0IHR5cGUoKSB7IHJldHVybiAnUHJvcGVydHknIH1cblx0XHRnZXQga2luZCgpIHsgcmV0dXJuICdpbml0JyB9XG5cdFx0Z2V0IG1ldGhvZCgpIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRnZXQgc2hvcnRoYW5kKCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0Z2V0IGNvbXB1dGVkKCkgeyByZXR1cm4gZmFsc2UgfVxuXHR9XG5cblx0Lypcblx0YFsgYSwgYiBdID0gLi4uYC5cblx0QXJyYXkgZGVjb25zdHJ1Y3RpbmcgcGF0dGVybi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEFycmF5UGF0dGVybiBleHRlbmRzIFBhdHRlcm4ge1xuXHRcdGNvbnN0cnVjdG9yKGVsZW1lbnRzIC8qIEFycmF5W09wdFtQYXR0ZXJuXV0gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuZWxlbWVudHMgPSBlbGVtZW50c1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdENhbiBiZSB0aGUgbGFzdCBhcmd1bWVudCB0byBhIEZ1bmN0aW9uRXhwcmVzc2lvbi9GdW5jdGlvbkRlY2xhcmF0aW9uXG5cdG9yICBnbyBhdCB0aGUgZW5kIG9mIGFuIEFycmF5UGF0dGVybi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFJlc3RFbGVtZW50IGV4dGVuZHMgUGF0dGVybiB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQgLyogUGF0dGVybiAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0fVxuXHR9XG5cblxuXHQvLyBUT0RPOiBXaGF0IGlzIHRoaXM/XG5cdC8vIEFzc2lnbm1lbnRQYXR0ZXJuID0gcCgnQXNzaWdubWVudFBhdHRlcm4nLFxuXHQvL1x0J2xlZnQnLCBQYXR0ZXJuLFxuXHQvL1x0J3JpZ2h0JywgUGF0dGVybiksXG5cbi8vIENsYXNzZXNcblx0ZXhwb3J0IGNvbnN0IE1ldGhvZERlZmluaXRpb25LaW5kID0gbmV3IFNldChbICdjb25zdHJ1Y3RvcicsICdtZXRob2QnLCAnZ2V0JywgJ3NldCcgXSlcblx0Ly8gUGFydCBvZiBhIENsYXNzQm9keS5cblx0ZXhwb3J0IGNsYXNzIE1ldGhvZERlZmluaXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdGtleSwgLy8gVW5pb25bSWRlbnRpZmllciBMaXRlcmFsXVxuXHRcdFx0dmFsdWUsIC8vIEZ1bmN0aW9uRXhwcmVzc2lvblxuXHRcdFx0a2luZCwgLy8gTWV0aG9kRGVmaW5pdGlvbktpbmRcblx0XHRcdF9zdGF0aWMsIC8vIEJvb2xlYW5cblx0XHRcdGNvbXB1dGVkKSB7IC8vIEJvb2xlYW5cblx0XHRcdGlmIChraW5kID09PSAnY29uc3RydWN0b3InKVxuXHRcdFx0XHRhc3NlcnQoa2V5IGluc3RhbmNlb2YgSWRlbnRpZmllciAmJiBrZXkubmFtZSA9PT0gJ2NvbnN0cnVjdG9yJylcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMua2V5ID0ga2V5XG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHRcdHRoaXMua2luZCA9IGtpbmRcblx0XHRcdHRoaXMuc3RhdGljID0gX3N0YXRpY1xuXHRcdFx0dGhpcy5jb21wdXRlZCA9IGNvbXB1dGVkXG5cdFx0fVxuXHR9XG5cblx0Ly8gQ29udGVudHMgb2YgYSBDbGFzcy5cblx0ZXhwb3J0IGNsYXNzIENsYXNzQm9keSBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGJvZHkgLyogQXJyYXlbTWV0aG9kRGVmaW5pdGlvbl0gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvLyBDbGFzc0RlY2xhcmF0aW9uIG9yIENsYXNzRXhwcmVzc2lvbi5cblx0ZXhwb3J0IGNsYXNzIENsYXNzIGV4dGVuZHMgTm9kZSB7IH1cblxuXHQvLyBUT0RPOiBleHRlbmRzIERlY2xhcmF0aW9uIHRvb1xuXHQvLyBDbGFzcyBpbiBkZWNsYXJhdGlvbiBwb3NpdGlvbi5cblx0ZXhwb3J0IGNsYXNzIENsYXNzRGVjbGFyYXRpb24gZXh0ZW5kcyBDbGFzcyB7XG5cdFx0Y29uc3RydWN0b3IoaWQgLyogSWRlbnRpZmllciAqLywgc3VwZXJDbGFzcyAvKiBPcHRbRXhwcmVzc2lvbl0gKi8sIGJvZHkgLyogQ2xhc3NCb2R5ICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3Ncblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvLyBDbGFzcyBpbiBleHByZXNzaW9uIHBvc2l0aW9uLlxuXHRleHBvcnQgY2xhc3MgQ2xhc3NFeHByZXNzaW9uIGV4dGVuZHMgQ2xhc3Mge1xuXHRcdGNvbnN0cnVjdG9yKFxuXHRcdFx0aWQsIC8vIE9wdFtJZGVudGlmaWVyXVxuXHRcdFx0c3VwZXJDbGFzcywgLy8gT3B0W0V4cHJlc3Npb25dXG5cdFx0XHRib2R5KSB7IC8vIENsYXNzQm9keVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5pZCA9IGlkXG5cdFx0XHR0aGlzLnN1cGVyQ2xhc3MgPSBzdXBlckNsYXNzXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cbi8vIE1vZHVsZXNcblx0Ly8gQSBzcGVjaWZpZXIgaW4gYW4gaW1wb3J0IG9yIGV4cG9ydCBkZWNsYXJhdGlvbi5cblx0ZXhwb3J0IGNsYXNzIE1vZHVsZVNwZWNpZmllciBleHRlbmRzIE5vZGUgeyB9XG5cblx0Ly8gSW1wb3J0U3BlY2lmaWVyLCBJbXBvcnREZWZhdWx0U3BlY2lmaWVyLCBvciBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIuXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCBleHRlbmRzIE5vZGUge1xuXG5cdH1cblxuXHQvKlxuXHRgaW1wb3J0IHNwZWNpZmllcnMgZnJvbSBzb3VyY2VgLlxuXHRPbmx5IG9uZSBzcGVjaWZpZXIgbWF5IGJlIGEgSW1wb3J0RGVmYXVsdFNwZWNpZmllci5cblx0SWYgdGhlcmUgaXMgYW4gSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyLCBpdCBtdXN0IGJlIHRoZSBvbmx5IHNwZWNpZmllci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3Ioc3BlY2lmaWVycyAvKiBBcnJheVtJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdF0gKi8sIHNvdXJjZSAvKiBMaXRlcmFsU3RyaW5nICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnNwZWNpZmllcnMgPSBzcGVjaWZpZXJzXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdEEgbm9uLWRlZmF1bHQgaW1wb3J0LiBVc2VkIGluIGFuIEltcG9ydERlY2xhcmF0aW9uLlxuXHRGb3IgYGltcG9ydCB7IGEgfSBmcm9tIFwic291cmNlXCJgLCBqdXN0IHBhc3Mgb25lIGFyZ3VtZW50IGFuZCBsb2NhbCB3aWxsID0gaW1wb3J0ZWQuXG5cdEZvciBgaW1wb3J0IHsgYSBhcyBiIH0gZnJvbSBcInNvdXJjZVwiYCwgbWFrZSBpbXBvcnRlZCBgYWAgYW5kIGxvY2FsIGBiYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydFNwZWNpZmllciBleHRlbmRzIE1vZHVsZVNwZWNpZmllciB7XG5cdFx0Y29uc3RydWN0b3IoaW1wb3J0ZWQgLyogSWRlbnRpZmllciAqLywgbG9jYWwgLyogSWRlbnRpZmllciAqLykge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxvY2FsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxvY2FsID0gaW1wb3J0ZWRcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuaW1wb3J0ZWQgPSBpbXBvcnRlZFxuXHRcdFx0dGhpcy5sb2NhbCA9IGxvY2FsXG5cdFx0fVxuXHR9XG5cblx0Ly8gVGhlIGRlZmF1bHQgZXhwb3J0LCBhcyBpbiBgaW1wb3J0IGEgZnJvbSBcInNvdXJjZVwiYC5cblx0ZXhwb3J0IGNsYXNzIEltcG9ydERlZmF1bHRTcGVjaWZpZXIgZXh0ZW5kcyBJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCB7XG5cdFx0Y29uc3RydWN0b3IobG9jYWwgLyogSWRlbnRpZmllciAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5sb2NhbCA9IGxvY2FsXG5cdFx0fVxuXHR9XG5cblx0Ly8gT2JqZWN0IG9mIGV2ZXJ5IGV4cG9ydCwgYXMgaW4gYGltcG9ydCAqIGFzIGEgZnJvbSBcInNvdXJjZVwiYFxuXHRleHBvcnQgY2xhc3MgSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyIGV4dGVuZHMgSW1wb3J0U3BlY2lmaWVyQWJzdHJhY3Qge1xuXHRcdGNvbnN0cnVjdG9yKGxvY2FsIC8qIElkZW50aWZpZXIgKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMubG9jYWwgPSBsb2NhbFxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdEEgbm9uLWRlZmF1bHQgZXhwb3J0LiBVc2VkIGluIGFuIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24uXG5cdEZvciBgZXhwb3J0IHsgYSB9IGZyb20gXCJzb3VyY2VcImAsIGp1c3QgcGFzcyBvbmUgYXJndW1lbnQgbG9jYWwgd2lsbCA9IGV4cG9ydGVkLlxuXHRGb3IgYGV4cG9ydCB7IGEgYXMgYiB9YCwgbWFrZSBleHBvcnRlZCBgYmAgYW5kIGxvY2FsIGBhYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cG9ydFNwZWNpZmllciBleHRlbmRzIE1vZHVsZVNwZWNpZmllciB7XG5cdFx0Y29uc3RydWN0b3IoZXhwb3J0ZWQgLyogSWRlbnRpZmllciAqLywgbG9jYWwgLyogSWRlbnRpZmllciAqLykge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxvY2FsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxvY2FsID0gZXhwb3J0ZWRcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuZXhwb3J0ZWQgPSBleHBvcnRlZFxuXHRcdFx0dGhpcy5sb2NhbCA9IGxvY2FsXG5cdFx0fVxuXHR9XG5cblx0Lypcblx0RXhwb3J0cyBtdWx0aXBsZSB2YWx1ZXMgYXMgaW4gYGV4cG9ydCB7IGEsIGIgYXMgYyB9YC5cblx0SWYgc291cmNlICE9PSBudWxsLFxuXHRyZS1leHBvcnRzIGZyb20gdGhhdCBtb2R1bGUgYXMgaW4gYGV4cG9ydCB7IC4uLiB9IGZyb20gXCJzb3VyY2VcImAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnROYW1lZERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHRkZWNsYXJhdGlvbiAvKiBPcHRbRGVjbGFyYXRpb25dICovLFxuXHRcdFx0c3BlY2lmaWVycyAvKiBBcnJheVtFeHBvcnRTcGVjaWZpZXJdICovLFxuXHRcdFx0c291cmNlIC8qIE9wdFtMaXRlcmFsU3RyaW5nXSAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbiA9IGRlY2xhcmF0aW9uXG5cdFx0XHR0aGlzLnNwZWNpZmllcnMgPSBzcGVjaWZpZXJzXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXHRcdH1cblx0fVxuXG5cdC8vIGBleHBvcnQgZGVmYXVsdCBkZWNsYXJhdGlvbmAuXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihkZWNsYXJhdGlvbiAvKiBVbmlvbltEZWNsYXJhdGlvbiwgRXhwcmVzc2lvbl0gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuZGVjbGFyYXRpb24gPSBkZWNsYXJhdGlvblxuXHRcdH1cblx0fVxuXG5cdC8vIGBleHBvcnQgKiBmcm9tIHNvdXJjZWAuXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnRBbGxEZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKHNvdXJjZSAvKiBMaXRlcmFsU3RyaW5nICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXHRcdH1cblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=