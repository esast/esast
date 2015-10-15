if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './private/util'], function (exports, _privateUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	/** Base type of all ASTs. */

	class Node {
		/**
  Convert to JSON.
  @see https://github.com/estree/estree
  */
		toJSON() {
			const obj = {};
			obj.type = this.type;
			// Sort to make JSON rendering deterministic.
			Object.keys(this).sort().forEach(key => {
				obj[key] = this[key];
			});
			return obj;
		}

		/**
  For compatibility with other AST representations,
  all Node instances have a 'type' property that is the name of that type.
  @see https://github.com/estree/estree
  */
		get type() {
			return this.constructor.name;
		}

		toString() {
			return JSON.stringify(this);
		}
	}

	// Abstracts
	/** Line that declares new locals. */
	exports.Node = Node;

	class Declaration extends Node {}

	/** Blocks of code have lines that are Statements or Declarations. */
	exports.Declaration = Declaration;

	class Statement extends Node {}

	/**
 Code that has a value.
 To use one in a statement position, see ExpressionStatement.
 */
	exports.Statement = Statement;

	class Expression extends Node {}

	/**
 Can go in a parameter list or on the left side of an assignment.
 */
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
	/**
 A JavaScript identifier.
 	It is assumed that you have called `mangleIdentifier` as appropriate.
 See also {@link identifier}.
 */
	exports.Program = Program;

	class Identifier extends Expression {
		constructor(name /* String */) {
			super();
			this.name = name;
		}
	}

	/** Single declaration within a {@link VariableDeclaration}. */
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

	/** Accepted kinds of {@link VariableDeclaration}. */
	exports.VariableDeclarator = VariableDeclarator;
	const VariableDeclarationKind = new Set(['const', 'let', 'var']);
	exports.VariableDeclarationKind = VariableDeclarationKind;
	/**
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
	/**
 An empty statement, i.e., a solitary semicolon.
 Not useful for code generation, but some parsers will return these.
 */
	exports.VariableDeclaration = VariableDeclaration;

	class EmptyStatement extends Statement {}

	/** A block statement, i.e., a sequence of statements surrounded by braces. */
	exports.EmptyStatement = EmptyStatement;

	class BlockStatement extends Statement {
		constructor(body /* Array[Statement */) {
			super();
			this.body = body;
		}
	}

	/**
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

	/** An if (or if ... else) statement. */
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

	/** A statement prefixed by a label. */
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
		/** The `break` keyword. */
		constructor(label /* Opt[Identifier] */) {
			// TODO:ES6 Optional args
			if (label === undefined) label = null;
			super();
			this.label = label;
		}
	}

	/** The `continue` keyword. */
	exports.BreakStatement = BreakStatement;

	class ContinueStatement extends Statement {
		constructor(label /* Opt[Identifier] */) {
			// TODO:ES6 Optional args
			if (label === undefined) label = null;
			super();
			this.label = label;
		}
	}

	/**
 `switch (discriminant) { cases }`
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

	/**
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

	/** The `return` keyword, optionally followed by an Expression to return. */
	exports.SwitchCase = SwitchCase;

	class ReturnStatement extends Statement {
		constructor(argument /* Opt[Expression] */) {
			// TODO:ES6 Optional args
			if (argument === undefined) argument = null;
			super();
			this.argument = argument;
		}
	}

	/**
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

	/**
 `try { block } catch (handler.param) { handler.body } finally { finalizer }`
 At least one of `handler` or `finalizer` must be non-null.
 */
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

	/** Must be *part* of a {@link TryStatement} -- does *not* follow it. */
	exports.TryStatement = TryStatement;

	class CatchClause extends Node {
		constructor(param, /* Pattern */body /* BlockStatement */) {
			super();
			this.param = param;
			this.body = body;
		}
	}

	/** `while (test) body` */
	exports.CatchClause = CatchClause;

	class WhileStatement extends Statement {
		constructor(test, /* Expression */body /* Statement */) {
			super();
			this.test = test;
			this.body = body;
		}
	}

	/** `do body while (test)` */
	exports.WhileStatement = WhileStatement;

	class DoWhileStatement extends Statement {
		constructor(body, /* Statement */test /* Expression */) {
			super();
			this.body = body;
			this.test = test;
		}
	}

	/**
 `for (init; test; update) body`
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

	/** `for (left in right) body` */
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

	/** `for (left of right) body` */
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

	/** The `debugger` keyword. */
	exports.ForOfStatement = ForOfStatement;

	class DebuggerStatement extends Statement {}

	// Declarations
	/** FunctionDeclaration | FunctionExpression | ArrowFunctionExpression */
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
	/** {@link Function} in declaration position. */

	class FunctionDeclaration extends FunctionNonArrow {}

	// Expressions
	// Value: Number | String | null | Boolean
	exports.FunctionDeclaration = FunctionDeclaration;

	class Literal extends Expression {
		constructor(value) {
			super();
			this.value = value;
		}
	}

	/** The `this` keyword. */
	exports.Literal = Literal;

	class ThisExpression extends Expression {}

	/** `[ elements ]` */
	exports.ThisExpression = ThisExpression;

	class ArrayExpression extends Expression {
		constructor(elements /* Array[Opt[Expression]] */) {
			super();
			this.elements = elements;
		}
	}

	/** Accepted kinds of {@link Property}. */
	exports.ArrayExpression = ArrayExpression;
	const PropertyKind = new Set(['init', 'get', 'set']);
	exports.PropertyKind = PropertyKind;
	/**
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

	/** An object literal. */
	exports.Property = Property;

	class ObjectExpression extends Expression {
		constructor(properties /* Array[Property] */) {
			super();
			this.properties = properties;
		}
	}

	// TODO: Expression too
	/** {@link Function} in expression position. */
	exports.ObjectExpression = ObjectExpression;

	class FunctionExpression extends FunctionNonArrow {}

	/** Like FunctionExpression but uses the `params => body` form. */
	// TODO: extends FunctionAbstract too
	exports.FunctionExpression = FunctionExpression;

	class ArrowFunctionExpression extends Expression {
		constructor(params, /* Array[Pattern] */body /* Union[BlockStatement, Expression] */) {
			super();
			this.params = params;
			this.body = body;
		}
	}

	/**
 `expressions[0], expressions[1], ...`
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

	/** Accepted kinds of {@link UnaryExpression}. */
	exports.SequenceExpression = SequenceExpression;
	const UnaryOperator = new Set(['-', '+', '!', '~', 'typeof', 'void', 'delete']);
	exports.UnaryOperator = UnaryOperator;
	/**
 `operator argument`
 Calls a unary operator.
 */

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

	/** Accepted kinds of {@link BinaryExpression}. */
	exports.UnaryExpression = UnaryExpression;
	const BinaryOperator = new Set(['==', '!=', '===', '!==', '<', '<=', '>', '>=', '<<', '>>', '>>>', '+', '-', '*', '/', '%', '|', '^', '&', 'in', 'instanceof']);
	exports.BinaryOperator = BinaryOperator;
	/**
 `left operator right`
 Calls a binary operator.
 */

	class BinaryExpression extends Expression {
		constructor(operator, /* BinaryOperator */left, /* Expression */right /* Expression */) {
			super();
			this.operator = operator;
			this.left = left;
			this.right = right;
		}
	}

	/** Accepted kinds of {@link AssignmentExpression}. */
	exports.BinaryExpression = BinaryExpression;
	const AssignmentOperator = new Set(['=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '|=', '^=', '&=']);
	exports.AssignmentOperator = AssignmentOperator;
	/**
 `left operator right`
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

	/** Accepted kinds of {@link UpdateExpression}. */
	exports.AssignmentExpression = AssignmentExpression;
	const UpdateOperator = new Set(['++', '--']);
	exports.UpdateOperator = UpdateOperator;
	/**
 `++argument` or `argument++`
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

	/** Accepted kinds of {@link LogicalExpression}. */
	exports.UpdateExpression = UpdateExpression;
	const LogicalOperator = new Set(['||', '&&']);
	exports.LogicalOperator = LogicalOperator;
	/**
 `left operator right`
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

	/** `test ? consequent : alternate` */
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

	/**
 `new callee(arguments)`
 Just like {@link CallExpression} but with `new` in front.
 */
	exports.ConditionalExpression = ConditionalExpression;

	class NewExpression extends Expression {
		constructor(callee, /* Expression */_arguments /* Array[Expression] */) {
			super();
			this.callee = callee;
			this.arguments = _arguments;
		}
	}

	/** `callee(arguments)` */
	exports.NewExpression = NewExpression;

	class CallExpression extends Expression {
		constructor(callee, /* Expression */_arguments /* Array[Expression] */) {
			super();
			this.callee = callee;
			this.arguments = _arguments;
		}
	}

	/** `...args` in a CallExpression. */
	exports.CallExpression = CallExpression;

	class SpreadElement extends Node {
		constructor(argument /* Expression */) {
			super();
			this.argument = argument;
		}
	}

	/**
 If computed === true, `object[property]`.
 Else, `object.property` -- meaning property should be an Identifier.
 */
	exports.SpreadElement = SpreadElement;

	class MemberExpression extends Expression {
		constructor(object, /* Expression */property /* Expression */) {
			super();
			this.object = object;
			this.property = property;
			this.computed = !(property instanceof Identifier);
		}
	}

	/** `yield argument` or `yield* argument` */
	exports.MemberExpression = MemberExpression;

	class YieldExpression extends Expression {
		constructor(argument, /* Expression */delegate /* Boolean */) {
			super();
			this.argument = argument;
			this.delegate = delegate;
		}
	}

	// Templates
	/** A template with no tag. */
	exports.YieldExpression = YieldExpression;

	class TemplateLiteral extends Expression {
		constructor(quasis, /* Array[TemplateElement] */expressions /* Array[Expression] */) {
			super();
			this.quasis = quasis;
			this.expressions = expressions;
			(0, _privateUtil.assert)(this.quasis.length === this.expressions.length + 1);
		}
	}

	/** Part of a TemplateLiteral. */
	exports.TemplateLiteral = TemplateLiteral;

	class TemplateElement extends Node {
		/** TemplateElement whose raw source is `str`. */
		static forRawString(str) {
			return new TemplateElement(false, {
				// TODO: A way to calculate this?
				cooked: null,
				raw: str
			});
		}

		/**
  TemplateElement evaluating to `str`.
  Uses escape sequences as necessary.
  */
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

	/** TemplateLiteral with a tag in front, like`this`. */

	class TaggedTemplateExpression extends Expression {
		constructor(tag, /* Expression */quasi /* TemplateLiteral */) {
			super();
			this.tag = tag;
			this.quasi = quasi;
		}
	}

	// Patterns
	/**
 `{ a, b: c } =`
 Object deconstructing pattern.
 */
	exports.TaggedTemplateExpression = TaggedTemplateExpression;

	class ObjectPattern extends Pattern {
		constructor(properties /* Array[AssignmentProperty] */) {
			super();
			this.properties = properties;
		}
	}

	/**
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

	/**
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

	/**
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

	// Classes
	/** Accepted kinds of {@link MethodDefinition}. */
	exports.RestElement = RestElement;
	const MethodDefinitionKind = new Set(['constructor', 'method', 'get', 'set']);
	exports.MethodDefinitionKind = MethodDefinitionKind;
	/** Part of a {@link ClassBody}. */

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

	/** Contents of a {@link Class}. */
	exports.MethodDefinition = MethodDefinition;

	class ClassBody extends Node {
		constructor(body /* Array[MethodDefinition] */) {
			super();
			this.body = body;
		}
	}

	/** {@link ClassDeclaration} | {@link ClassExpression} */
	exports.ClassBody = ClassBody;

	class Class extends Node {}

	// TODO: extends Declaration too
	/** {@link Class} in declaration position. */
	exports.Class = Class;

	class ClassDeclaration extends Class {
		constructor(id, /* Identifier */superClass, /* Opt[Expression] */body /* ClassBody */) {
			super();
			this.id = id;
			this.superClass = superClass;
			this.body = body;
		}
	}

	/** {@link Class} in expression position. */
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
	/** A specifier in an import or export declaration. */
	exports.ClassExpression = ClassExpression;

	class ModuleSpecifier extends Node {}

	/**
 {@link ImportSpecifier} | {@link ImportDefaultSpecifier} | {@link ImportNamespaceSpecifier}
 */
	exports.ModuleSpecifier = ModuleSpecifier;

	class ImportSpecifierAbstract extends Node {}

	/**
 `import specifiers from source`
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

	/**
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

	/** The default export, as in `import a from "source"`. */
	exports.ImportSpecifier = ImportSpecifier;

	class ImportDefaultSpecifier extends ImportSpecifierAbstract {
		constructor(local /* Identifier */) {
			super();
			this.local = local;
		}
	}

	/** Object of every export, as in `import * as a from "source"`. */
	exports.ImportDefaultSpecifier = ImportDefaultSpecifier;

	class ImportNamespaceSpecifier extends ImportSpecifierAbstract {
		constructor(local /* Identifier */) {
			super();
			this.local = local;
		}
	}

	/**
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

	/**
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

	/** `export default declaration` */
	exports.ExportNamedDeclaration = ExportNamedDeclaration;

	class ExportDefaultDeclaration extends Node {
		constructor(declaration /* Union[Declaration, Expression] */) {
			super();
			this.declaration = declaration;
		}
	}

	/** `export * from source` */
	exports.ExportDefaultDeclaration = ExportDefaultDeclaration;

	class ExportAllDeclaration extends Node {
		constructor(source /* LiteralString */) {
			super();
			this.source = source;
		}
	}

	exports.ExportAllDeclaration = ExportAllDeclaration;
});
//# sourceMappingURL=data:application/json;base64,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R00sT0FBTSxvQkFBb0IsU0FBUyxJQUFJLENBQUM7QUFDOUMsYUFBVyxDQUFDLE1BQU0sc0JBQXNCO0FBQ3ZDLFFBQUssRUFBRSxDQUFBO0FBQ1AsT0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7R0FDcEI7RUFDRCIsImZpbGUiOiJhc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Fzc2VydH0gZnJvbSAnLi9wcml2YXRlL3V0aWwnXG5cbi8qKiBCYXNlIHR5cGUgb2YgYWxsIEFTVHMuICovXG5leHBvcnQgY2xhc3MgTm9kZSB7XG5cdC8qKlxuXHRDb252ZXJ0IHRvIEpTT04uXG5cdEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzdHJlZS9lc3RyZWVcblx0Ki9cblx0dG9KU09OKCkge1xuXHRcdGNvbnN0IG9iaiA9IHsgfVxuXHRcdG9iai50eXBlID0gdGhpcy50eXBlXG5cdFx0Ly8gU29ydCB0byBtYWtlIEpTT04gcmVuZGVyaW5nIGRldGVybWluaXN0aWMuXG5cdFx0T2JqZWN0LmtleXModGhpcykuc29ydCgpLmZvckVhY2goa2V5ID0+IHsgb2JqW2tleV0gPSB0aGlzW2tleV0gfSlcblx0XHRyZXR1cm4gb2JqXG5cdH1cblxuXHQvKipcblx0Rm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvdGhlciBBU1QgcmVwcmVzZW50YXRpb25zLFxuXHRhbGwgTm9kZSBpbnN0YW5jZXMgaGF2ZSBhICd0eXBlJyBwcm9wZXJ0eSB0aGF0IGlzIHRoZSBuYW1lIG9mIHRoYXQgdHlwZS5cblx0QHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXN0cmVlL2VzdHJlZVxuXHQqL1xuXHRnZXQgdHlwZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG5cdH1cblxuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcylcblx0fVxufVxuXG4vLyBBYnN0cmFjdHNcblx0LyoqIExpbmUgdGhhdCBkZWNsYXJlcyBuZXcgbG9jYWxzLiAqL1xuXHRleHBvcnQgY2xhc3MgRGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKiBCbG9ja3Mgb2YgY29kZSBoYXZlIGxpbmVzIHRoYXQgYXJlIFN0YXRlbWVudHMgb3IgRGVjbGFyYXRpb25zLiAqL1xuXHRleHBvcnQgY2xhc3MgU3RhdGVtZW50IGV4dGVuZHMgTm9kZSB7IH1cblxuXHQvKipcblx0Q29kZSB0aGF0IGhhcyBhIHZhbHVlLlxuXHRUbyB1c2Ugb25lIGluIGEgc3RhdGVtZW50IHBvc2l0aW9uLCBzZWUgRXhwcmVzc2lvblN0YXRlbWVudC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cHJlc3Npb24gZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHRDYW4gZ28gaW4gYSBwYXJhbWV0ZXIgbGlzdCBvciBvbiB0aGUgbGVmdCBzaWRlIG9mIGFuIGFzc2lnbm1lbnQuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBQYXR0ZXJuIGV4dGVuZHMgTm9kZSB7IH1cblxuLy8gQSBjb21wbGV0ZSBwcm9ncmFtIHNvdXJjZSB0cmVlLlxuZXhwb3J0IGNsYXNzIFByb2dyYW0gZXh0ZW5kcyBOb2RlIHtcblx0Y29uc3RydWN0b3IoYm9keSAvKiBBcnJheVtTdGF0ZW1lbnRdICovKSB7XG5cdFx0c3VwZXIoKVxuXHRcdHRoaXMuYm9keSA9IGJvZHlcblx0fVxufVxuXG4vLyBWYXJpYWJsZXNcblx0LyoqXG5cdEEgSmF2YVNjcmlwdCBpZGVudGlmaWVyLlxuXG5cdEl0IGlzIGFzc3VtZWQgdGhhdCB5b3UgaGF2ZSBjYWxsZWQgYG1hbmdsZUlkZW50aWZpZXJgIGFzIGFwcHJvcHJpYXRlLlxuXHRTZWUgYWxzbyB7QGxpbmsgaWRlbnRpZmllcn0uXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBJZGVudGlmaWVyIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IobmFtZSAvKiBTdHJpbmcgKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMubmFtZSA9IG5hbWVcblx0XHR9XG5cdH1cblxuXHQvKiogU2luZ2xlIGRlY2xhcmF0aW9uIHdpdGhpbiBhIHtAbGluayBWYXJpYWJsZURlY2xhcmF0aW9ufS4gKi9cblx0ZXhwb3J0IGNsYXNzIFZhcmlhYmxlRGVjbGFyYXRvciBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGlkIC8qIFBhdHRlcm4gKi8sIGluaXQgLyogT3B0W0V4cHJlc3Npb25dICovKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAoaW5pdD09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGluaXQgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdHRoaXMuaW5pdCA9IGluaXRcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIFZhcmlhYmxlRGVjbGFyYXRpb259LiAqL1xuXHRleHBvcnQgY29uc3QgVmFyaWFibGVEZWNsYXJhdGlvbktpbmQgPSBuZXcgU2V0KFsnY29uc3QnLCAnbGV0JywgJ3ZhciddKVxuXHQvKipcblx0RGVjbGFyZXMgYW5kIG9wdGlvbmFsbHkgaW5pdGlhbGl6ZXMgbWFueSB2YXJpYWJsZXMuXG5cdE11c3QgYmUgYXQgbGVhc3Qgb25lIGRlY2xhcmF0aW9uLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgVmFyaWFibGVEZWNsYXJhdGlvbiBleHRlbmRzIERlY2xhcmF0aW9uIHtcblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdGtpbmQsIC8vIFZhcmlhYmxlRGVjbGFyYXRpb25LaW5kXG5cdFx0XHRkZWNsYXJhdGlvbnMpIHsgLy8gQXJyYXlbVmFyaWFibGVEZWNsYXJhdG9yXVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5raW5kID0ga2luZFxuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbnMgPSBkZWNsYXJhdGlvbnNcblx0XHRcdGFzc2VydCh0aGlzLmRlY2xhcmF0aW9ucy5sZW5ndGggPj0gMSlcblx0XHR9XG5cdH1cblxuXG4vLyBTdGF0ZW1lbnRzXG5cdC8qKlxuXHRBbiBlbXB0eSBzdGF0ZW1lbnQsIGkuZS4sIGEgc29saXRhcnkgc2VtaWNvbG9uLlxuXHROb3QgdXNlZnVsIGZvciBjb2RlIGdlbmVyYXRpb24sIGJ1dCBzb21lIHBhcnNlcnMgd2lsbCByZXR1cm4gdGhlc2UuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBFbXB0eVN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7IH1cblxuXHQvKiogQSBibG9jayBzdGF0ZW1lbnQsIGkuZS4sIGEgc2VxdWVuY2Ugb2Ygc3RhdGVtZW50cyBzdXJyb3VuZGVkIGJ5IGJyYWNlcy4gKi9cblx0ZXhwb3J0IGNsYXNzIEJsb2NrU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihib2R5IC8qIEFycmF5W1N0YXRlbWVudCAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRBbiBleHByZXNzaW9uIHN0YXRlbWVudCwgaS5lLiwgYSBzdGF0ZW1lbnQgY29uc2lzdGluZyBvZiBhIHNpbmdsZSBleHByZXNzaW9uLlxuXHRTZWUgYGVzYXN0LnV0aWwgdG9TdGF0ZW1lbnQgdG9TdGF0ZW1lbnRzYC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25TdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGV4cHJlc3Npb24gLyogRXhwcmVzc2lvbiAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvblxuXHRcdH1cblx0fVxuXG5cdC8qKiBBbiBpZiAob3IgaWYgLi4uIGVsc2UpIHN0YXRlbWVudC4gKi9cblx0ZXhwb3J0IGNsYXNzIElmU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdHRlc3QsIC8vIEV4cHJlc3Npb25cblx0XHRcdGNvbnNlcXVlbnQsIC8vIFN0YXRlbWVudFxuXHRcdFx0YWx0ZXJuYXRlKSB7IC8vIE9wdFtTdGF0ZW1lbnRdXG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRcdGlmIChhbHRlcm5hdGUgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0YWx0ZXJuYXRlID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0dGhpcy5jb25zZXF1ZW50ID0gY29uc2VxdWVudFxuXHRcdFx0dGhpcy5hbHRlcm5hdGUgPSBhbHRlcm5hdGVcblx0XHR9XG5cdH1cblxuXHQvKiogQSBzdGF0ZW1lbnQgcHJlZml4ZWQgYnkgYSBsYWJlbC4gKi9cblx0ZXhwb3J0IGNsYXNzIExhYmVsZWRTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGxhYmVsIC8qIElkZW50aWZpZXIgKi8sIGJvZHkgLyogU3RhdGVtZW50ICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmxhYmVsID0gbGFiZWxcblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHRleHBvcnQgY2xhc3MgQnJlYWtTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdC8qKiBUaGUgYGJyZWFrYCBrZXl3b3JkLiAqL1xuXHRcdGNvbnN0cnVjdG9yKGxhYmVsIC8qIE9wdFtJZGVudGlmaWVyXSAqLykge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxhYmVsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxhYmVsID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5sYWJlbCA9IGxhYmVsXG5cdFx0fVxuXHR9XG5cblx0LyoqIFRoZSBgY29udGludWVgIGtleXdvcmQuICovXG5cdGV4cG9ydCBjbGFzcyBDb250aW51ZVN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IobGFiZWwgLyogT3B0W0lkZW50aWZpZXJdICovKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAobGFiZWwgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0bGFiZWwgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmxhYmVsID0gbGFiZWxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YHN3aXRjaCAoZGlzY3JpbWluYW50KSB7IGNhc2VzIH1gXG5cdE9ubHkgdGhlIGxhc3QgZW50cnkgb2YgYGNhc2VzYCBpcyBhbGxvd2VkIHRvIGJlIGBkZWZhdWx0YC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFN3aXRjaFN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoZGlzY3JpbWluYW50IC8qIEV4cHJlc3Npb24gKi8sIGNhc2VzIC8qIEFycmF5W1N3aXRjaENhc2VdICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmRpc2NyaW1pbmFudCA9IGRpc2NyaW1pbmFudFxuXHRcdFx0dGhpcy5jYXNlcyA9IGNhc2VzXG5cdFx0fVxuXHR9XG5cdC8qKlxuXHRBIHNpbmdsZSBgY2FzZWAgd2l0aGluIGEgU3dpdGNoU3RhdGVtZW50LlxuXHRJZiBgdGVzdGAgaXMgYG51bGxgLCB0aGlzIGlzIHRoZSBgZGVmYXVsdGAgY2FzZS5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFN3aXRjaENhc2UgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKHRlc3QgLyogT3B0W0V4cHJlc3Npb25dICovLCBjb25zZXF1ZW50IC8qIEFycmF5W1N0YXRlbWVudF0gKi8pIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmICh0ZXN0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdHRlc3QgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnRlc3QgPSB0ZXN0XG5cdFx0XHR0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50XG5cdFx0fVxuXHR9XG5cblx0LyoqIFRoZSBgcmV0dXJuYCBrZXl3b3JkLCBvcHRpb25hbGx5IGZvbGxvd2VkIGJ5IGFuIEV4cHJlc3Npb24gdG8gcmV0dXJuLiAqL1xuXHRleHBvcnQgY2xhc3MgUmV0dXJuU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCAvKiBPcHRbRXhwcmVzc2lvbl0gKi8pIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChhcmd1bWVudCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRhcmd1bWVudCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRUaGUgYHRocm93YCBrZXl3b3JkLCBhbmQgc29tZXRoaW5nIHRvIHRocm93LlxuXHRTZWUgYGVzYXN0LnV0aWwgdGhyb3dFcnJvcmAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBUaHJvd1N0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQgLyogRXhwcmVzc2lvbiAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdGB0cnkgeyBibG9jayB9IGNhdGNoIChoYW5kbGVyLnBhcmFtKSB7IGhhbmRsZXIuYm9keSB9IGZpbmFsbHkgeyBmaW5hbGl6ZXIgfWBcblx0QXQgbGVhc3Qgb25lIG9mIGBoYW5kbGVyYCBvciBgZmluYWxpemVyYCBtdXN0IGJlIG5vbi1udWxsLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgVHJ5U3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdGJsb2NrIC8qIEJsb2NrU3RhdGVtZW50ICovLFxuXHRcdFx0aGFuZGxlciAvKiBPcHRbQ2F0Y2hDbGF1c2VdICovLFxuXHRcdFx0ZmluYWxpemVyIC8qIE9wdFtCbG9ja1N0YXRlbWVudF0gKi8pIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGhhbmRsZXIgPSBudWxsXG5cdFx0XHRpZiAoZmluYWxpemVyID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGZpbmFsaXplciA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuYmxvY2sgPSBibG9ja1xuXHRcdFx0dGhpcy5oYW5kbGVyID0gaGFuZGxlclxuXHRcdFx0dGhpcy5maW5hbGl6ZXIgPSBmaW5hbGl6ZXJcblx0XHR9XG5cdH1cblx0LyoqIE11c3QgYmUgKnBhcnQqIG9mIGEge0BsaW5rIFRyeVN0YXRlbWVudH0gLS0gZG9lcyAqbm90KiBmb2xsb3cgaXQuICovXG5cdGV4cG9ydCBjbGFzcyBDYXRjaENsYXVzZSBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKHBhcmFtIC8qIFBhdHRlcm4gKi8sIGJvZHkgLyogQmxvY2tTdGF0ZW1lbnQgKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMucGFyYW0gPSBwYXJhbVxuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgd2hpbGUgKHRlc3QpIGJvZHlgICovXG5cdGV4cG9ydCBjbGFzcyBXaGlsZVN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IodGVzdCAvKiBFeHByZXNzaW9uICovLCBib2R5IC8qIFN0YXRlbWVudCAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZG8gYm9keSB3aGlsZSAodGVzdClgICovXG5cdGV4cG9ydCBjbGFzcyBEb1doaWxlU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihib2R5IC8qIFN0YXRlbWVudCAqLywgdGVzdCAvKiBFeHByZXNzaW9uICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0XHR0aGlzLnRlc3QgPSB0ZXN0XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdGBmb3IgKGluaXQ7IHRlc3Q7IHVwZGF0ZSkgYm9keWBcblx0Tm90IHRvIGJlIGNvbmZ1c2VkIHdpdGggRm9ySW5TdGF0ZW1lbnQgb3IgRm9yT2ZTdGF0ZW1lbnQuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBGb3JTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKFxuXHRcdFx0aW5pdCwgLy8gT3B0W1VuaW9uW1ZhcmlhYmxlRGVjbGFyYXRpb24gRXhwcmVzc2lvbl1dXG5cdFx0XHR0ZXN0LCAvLyBPcHRbRXhwcmVzc2lvbl1cblx0XHRcdHVwZGF0ZSwgLy8gT3B0W0V4cHJlc3Npb25dXG5cdFx0XHRib2R5KSB7IC8vIFN0YXRlbWVudFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5pbml0ID0gaW5pdFxuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0dGhpcy51cGRhdGUgPSB1cGRhdGVcblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKiogYGZvciAobGVmdCBpbiByaWdodCkgYm9keWAgKi9cblx0ZXhwb3J0IGNsYXNzIEZvckluU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdGxlZnQsIC8vIFVuaW9uW1ZhcmlhYmxlRGVjbGFyYXRpb24gRXhwcmVzc2lvbl1cblx0XHRcdHJpZ2h0LCAvLyBFeHByZXNzaW9uXG5cdFx0XHRib2R5KSB7IC8vIFN0YXRlbWVudFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIGBmb3IgKGxlZnQgb2YgcmlnaHQpIGJvZHlgICovXG5cdGV4cG9ydCBjbGFzcyBGb3JPZlN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHRsZWZ0LCAvLyBVbmlvbltWYXJpYWJsZURlY2xhcmF0aW9uIEV4cHJlc3Npb25dXG5cdFx0XHRyaWdodCwgLy8gRXhwcmVzc2lvblxuXHRcdFx0Ym9keSkgeyAvLyBTdGF0ZW1lbnRcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBUaGUgYGRlYnVnZ2VyYCBrZXl3b3JkLiAqL1xuXHRleHBvcnQgY2xhc3MgRGVidWdnZXJTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQgeyB9XG5cbi8vIERlY2xhcmF0aW9uc1xuXHQvKiogRnVuY3Rpb25EZWNsYXJhdGlvbiB8IEZ1bmN0aW9uRXhwcmVzc2lvbiB8IEFycm93RnVuY3Rpb25FeHByZXNzaW9uICovXG5cdGV4cG9ydCBjbGFzcyBGdW5jdGlvbkFic3RyYWN0IGV4dGVuZHMgTm9kZSB7IH1cblxuXHRjbGFzcyBGdW5jdGlvbk5vbkFycm93IGV4dGVuZHMgRnVuY3Rpb25BYnN0cmFjdCB7XG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHRpZCwgLy8gSWRlbnRpZmllclxuXHRcdFx0cGFyYW1zLCAvLyBBcnJheVtQYXR0ZXJuXVxuXHRcdFx0Ym9keSwgLy8gQmxvY2tTdGF0ZW1lbnRcblx0XHRcdGdlbmVyYXRvcikgeyAvLyBCb29sZWFuXG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAoZ2VuZXJhdG9yID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGdlbmVyYXRvciA9IGZhbHNlXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdHRoaXMucGFyYW1zID0gcGFyYW1zXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0XHR0aGlzLmdlbmVyYXRvciA9IGdlbmVyYXRvclxuXHRcdH1cblx0fVxuXG5cdC8vIFRPRE86IERlY2xhcmF0aW9uIHRvb1xuXHQvKioge0BsaW5rIEZ1bmN0aW9ufSBpbiBkZWNsYXJhdGlvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIEZ1bmN0aW9uRGVjbGFyYXRpb24gZXh0ZW5kcyBGdW5jdGlvbk5vbkFycm93IHsgfVxuXG4vLyBFeHByZXNzaW9uc1xuXHQvLyBWYWx1ZTogTnVtYmVyIHwgU3RyaW5nIHwgbnVsbCB8IEJvb2xlYW5cblx0ZXhwb3J0IGNsYXNzIExpdGVyYWwgZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0fVxuXHR9XG5cblx0LyoqIFRoZSBgdGhpc2Aga2V5d29yZC4gKi9cblx0ZXhwb3J0IGNsYXNzIFRoaXNFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7IH1cblxuXHQvKiogYFsgZWxlbWVudHMgXWAgKi9cblx0ZXhwb3J0IGNsYXNzIEFycmF5RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKGVsZW1lbnRzIC8qIEFycmF5W09wdFtFeHByZXNzaW9uXV0gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuZWxlbWVudHMgPSBlbGVtZW50c1xuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgUHJvcGVydHl9LiAqL1xuXHRleHBvcnQgY29uc3QgUHJvcGVydHlLaW5kID0gbmV3IFNldChbJ2luaXQnLCAnZ2V0JywgJ3NldCddKVxuXHQvKipcblx0UGFydCBvZiBhbiBPYmplY3RFeHByZXNzaW9uLlxuXHRJZiBraW5kIGlzICdnZXQnIG9yICdzZXQnLCB0aGVuIHZhbHVlIHNob3VsZCBiZSBhIEZ1bmN0aW9uRXhwcmVzc2lvbi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFByb3BlcnR5IGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHRraW5kLCAvLyBQcm9wZXJ0eUtpbmRcblx0XHRcdGtleSwgLy8gVW5pb25bTGl0ZXJhbCBJZGVudGlmaWVyXVxuXHRcdFx0dmFsdWUsIC8vIEV4cHJlc3Npb25cblx0XHRcdG1ldGhvZCwgLy8gQm9vbGVhblxuXHRcdFx0c2hvcnRoYW5kLCAvLyBCb29sZWFuXG5cdFx0XHRjb21wdXRlZCkgeyAvLyBCb29sZWFuXG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAobWV0aG9kID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdG1ldGhvZCA9IHNob3J0aGFuZCA9IGNvbXB1dGVkID0gZmFsc2Vcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMua2luZCA9IGtpbmRcblx0XHRcdHRoaXMua2V5ID0ga2V5XG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHRcdHRoaXMubWV0aG9kID0gbWV0aG9kXG5cdFx0XHR0aGlzLnNob3J0aGFuZFxuXHRcdFx0dGhpcy5jb21wdXRlZCA9IGNvbXB1dGVkXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFuIG9iamVjdCBsaXRlcmFsLiAqL1xuXHRleHBvcnQgY2xhc3MgT2JqZWN0RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgLyogQXJyYXlbUHJvcGVydHldICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzXG5cdFx0fVxuXHR9XG5cblx0Ly8gVE9ETzogRXhwcmVzc2lvbiB0b29cblx0LyoqIHtAbGluayBGdW5jdGlvbn0gaW4gZXhwcmVzc2lvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIEZ1bmN0aW9uRXhwcmVzc2lvbiBleHRlbmRzIEZ1bmN0aW9uTm9uQXJyb3cgeyB9XG5cblx0LyoqIExpa2UgRnVuY3Rpb25FeHByZXNzaW9uIGJ1dCB1c2VzIHRoZSBgcGFyYW1zID0+IGJvZHlgIGZvcm0uICovXG5cdC8vIFRPRE86IGV4dGVuZHMgRnVuY3Rpb25BYnN0cmFjdCB0b29cblx0ZXhwb3J0IGNsYXNzIEFycm93RnVuY3Rpb25FeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IocGFyYW1zIC8qIEFycmF5W1BhdHRlcm5dICovLCBib2R5IC8qIFVuaW9uW0Jsb2NrU3RhdGVtZW50LCBFeHByZXNzaW9uXSAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5wYXJhbXMgPSBwYXJhbXNcblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YGV4cHJlc3Npb25zWzBdLCBleHByZXNzaW9uc1sxXSwgLi4uYFxuXHRFeHByZXNzaW9uIGNvbXBvc2VkIG9mIG90aGVyIGV4cHJlc3Npb25zLCBzZXBhcmF0ZWQgYnkgdGhlIGNvbW1hIG9wZXJhdG9yLlxuXHQqTm90KiBmb3IgcGFyYW1ldGVyIGxpc3RzLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgU2VxdWVuY2VFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoZXhwcmVzc2lvbnMgLyogQXJyYXlbRXhwcmVzc2lvbl0gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9uc1xuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgVW5hcnlFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IFVuYXJ5T3BlcmF0b3IgPSBuZXcgU2V0KFsnLScsICcrJywgJyEnLCAnficsICd0eXBlb2YnLCAndm9pZCcsICdkZWxldGUnXSlcblx0LyoqXG5cdGBvcGVyYXRvciBhcmd1bWVudGBcblx0Q2FsbHMgYSB1bmFyeSBvcGVyYXRvci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFVuYXJ5RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yIC8qIFVuYXJ5T3BlcmF0b3IgKi8sIGFyZ3VtZW50IC8qIEV4cHJlc3Npb24gKi8sIHByZWZpeCAvKiBCb29sZWFuICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdFx0YXNzZXJ0KHByZWZpeCA9PT0gdW5kZWZpbmVkIHx8IHByZWZpeCA9PT0gdHJ1ZSlcblx0XHR9XG5cblx0XHRnZXQgcHJlZml4KCkge1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIEJpbmFyeUV4cHJlc3Npb259LiAqL1xuXHRleHBvcnQgY29uc3QgQmluYXJ5T3BlcmF0b3IgPSBuZXcgU2V0KFtcblx0XHQnPT0nLCAnIT0nLCAnPT09JywgJyE9PScsXG5cdFx0JzwnLCAnPD0nLCAnPicsICc+PScsXG5cdFx0Jzw8JywgJz4+JywgJz4+PicsXG5cdFx0JysnLCAnLScsICcqJywgJy8nLCAnJScsXG5cdFx0J3wnLCAnXicsICcmJywgJ2luJyxcblx0XHQnaW5zdGFuY2VvZiddKVxuXHQvKipcblx0YGxlZnQgb3BlcmF0b3IgcmlnaHRgXG5cdENhbGxzIGEgYmluYXJ5IG9wZXJhdG9yLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgQmluYXJ5RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yIC8qIEJpbmFyeU9wZXJhdG9yICovLCBsZWZ0IC8qIEV4cHJlc3Npb24gKi8sIHJpZ2h0IC8qIEV4cHJlc3Npb24gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBBc3NpZ25tZW50RXhwcmVzc2lvbn0uICovXG5cdGV4cG9ydCBjb25zdCBBc3NpZ25tZW50T3BlcmF0b3IgPSBuZXcgU2V0KFtcblx0XHQnPScsICcrPScsICctPScsICcqPScsICcvPScsICclPScsXG5cdFx0Jzw8PScsICc+Pj0nLCAnPj4+PScsXG5cdFx0J3w9JywgJ149JywgJyY9J1xuXHRdKVxuXHQvKipcblx0YGxlZnQgb3BlcmF0b3IgcmlnaHRgXG5cdE11dGF0ZXMgYW4gZXhpc3RpbmcgdmFyaWFibGUuXG5cdERvIG5vdCBjb25mdXNlIHdpdGggVmFyaWFibGVEZWNsYXJhdGlvbi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEFzc2lnbm1lbnRFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob3BlcmF0b3IgLyogQXNzaWdubWVudE9wZXJhdG9yICovLCBsZWZ0IC8qIFBhdHRlcm4gKi8sIHJpZ2h0IC8qIEV4cHJlc3Npb24gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBVcGRhdGVFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IFVwZGF0ZU9wZXJhdG9yID0gbmV3IFNldChbJysrJywgJy0tJ10pXG5cdC8qKlxuXHRgKythcmd1bWVudGAgb3IgYGFyZ3VtZW50KytgXG5cdEluY3JlbWVudHMgb3IgZGVjcmVtZW50cyBhIG51bWJlci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFVwZGF0ZUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdG9wZXJhdG9yLCAvLyBVcGRhdGVPcGVyYXRvclxuXHRcdFx0YXJndW1lbnQsIC8vIEV4cHJlc3Npb25cblx0XHRcdHByZWZpeCkgeyAvLyBCb29sZWFuXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdFx0dGhpcy5wcmVmaXggPSBwcmVmaXhcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIExvZ2ljYWxFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IExvZ2ljYWxPcGVyYXRvciA9IG5ldyBTZXQoWyd8fCcsICcmJiddKVxuXHQvKipcblx0YGxlZnQgb3BlcmF0b3IgcmlnaHRgXG5cdENhbGxzIGEgbGF6eSBsb2dpY2FsIG9wZXJhdG9yLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgTG9naWNhbEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciAvKiBMb2dpY2FsT3BlcmF0b3IgKi8sIGxlZnQgLyogRXhwcmVzc2lvbiAqLywgcmlnaHQgLyogRXhwcmVzc2lvbiAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHR9XG5cdH1cblxuXHQvKiogYHRlc3QgPyBjb25zZXF1ZW50IDogYWx0ZXJuYXRlYCAqL1xuXHRleHBvcnQgY2xhc3MgQ29uZGl0aW9uYWxFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHR0ZXN0LCAvLyBFeHByZXNzaW9uXG5cdFx0XHRjb25zZXF1ZW50LCAvLyBFeHByZXNzaW9uXG5cdFx0XHRhbHRlcm5hdGUpIHsgLy8gRXhwcmVzc2lvblxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy50ZXN0ID0gdGVzdFxuXHRcdFx0dGhpcy5jb25zZXF1ZW50ID0gY29uc2VxdWVudFxuXHRcdFx0dGhpcy5hbHRlcm5hdGUgPSBhbHRlcm5hdGVcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YG5ldyBjYWxsZWUoYXJndW1lbnRzKWBcblx0SnVzdCBsaWtlIHtAbGluayBDYWxsRXhwcmVzc2lvbn0gYnV0IHdpdGggYG5ld2AgaW4gZnJvbnQuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBOZXdFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoY2FsbGVlIC8qIEV4cHJlc3Npb24gKi8sIF9hcmd1bWVudHMgLyogQXJyYXlbRXhwcmVzc2lvbl0gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuY2FsbGVlID0gY2FsbGVlXG5cdFx0XHR0aGlzLmFyZ3VtZW50cyA9IF9hcmd1bWVudHNcblx0XHR9XG5cdH1cblxuXHQvKiogYGNhbGxlZShhcmd1bWVudHMpYCAqL1xuXHRleHBvcnQgY2xhc3MgQ2FsbEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihjYWxsZWUgLyogRXhwcmVzc2lvbiAqLywgX2FyZ3VtZW50cyAvKiBBcnJheVtFeHByZXNzaW9uXSAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5jYWxsZWUgPSBjYWxsZWVcblx0XHRcdHRoaXMuYXJndW1lbnRzID0gX2FyZ3VtZW50c1xuXHRcdH1cblx0fVxuXHQvKiogYC4uLmFyZ3NgIGluIGEgQ2FsbEV4cHJlc3Npb24uICovXG5cdGV4cG9ydCBjbGFzcyBTcHJlYWRFbGVtZW50IGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQgLyogRXhwcmVzc2lvbiAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdElmIGNvbXB1dGVkID09PSB0cnVlLCBgb2JqZWN0W3Byb3BlcnR5XWAuXG5cdEVsc2UsIGBvYmplY3QucHJvcGVydHlgIC0tIG1lYW5pbmcgcHJvcGVydHkgc2hvdWxkIGJlIGFuIElkZW50aWZpZXIuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBNZW1iZXJFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob2JqZWN0IC8qIEV4cHJlc3Npb24gKi8sIHByb3BlcnR5IC8qIEV4cHJlc3Npb24gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMub2JqZWN0ID0gb2JqZWN0XG5cdFx0XHR0aGlzLnByb3BlcnR5ID0gcHJvcGVydHlcblx0XHRcdHRoaXMuY29tcHV0ZWQgPSAhKHByb3BlcnR5IGluc3RhbmNlb2YgSWRlbnRpZmllcilcblx0XHR9XG5cdH1cblxuXHQvKiogYHlpZWxkIGFyZ3VtZW50YCBvciBgeWllbGQqIGFyZ3VtZW50YCAqL1xuXHRleHBvcnQgY2xhc3MgWWllbGRFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQgLyogRXhwcmVzc2lvbiAqLywgZGVsZWdhdGUgLyogQm9vbGVhbiAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0XHR0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcblx0XHR9XG5cdH1cblxuXHQvLyBUZW1wbGF0ZXNcblx0XHQvKiogQSB0ZW1wbGF0ZSB3aXRoIG5vIHRhZy4gKi9cblx0XHRleHBvcnQgY2xhc3MgVGVtcGxhdGVMaXRlcmFsIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0XHRjb25zdHJ1Y3RvcihxdWFzaXMgLyogQXJyYXlbVGVtcGxhdGVFbGVtZW50XSAqLywgZXhwcmVzc2lvbnMgLyogQXJyYXlbRXhwcmVzc2lvbl0gKi8pIHtcblx0XHRcdFx0c3VwZXIoKVxuXHRcdFx0XHR0aGlzLnF1YXNpcyA9IHF1YXNpc1xuXHRcdFx0XHR0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnNcblx0XHRcdFx0YXNzZXJ0KHRoaXMucXVhc2lzLmxlbmd0aCA9PT0gdGhpcy5leHByZXNzaW9ucy5sZW5ndGggKyAxKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKiBQYXJ0IG9mIGEgVGVtcGxhdGVMaXRlcmFsLiAqL1xuXHRcdGV4cG9ydCBjbGFzcyBUZW1wbGF0ZUVsZW1lbnQgZXh0ZW5kcyBOb2RlIHtcblx0XHRcdC8qKiBUZW1wbGF0ZUVsZW1lbnQgd2hvc2UgcmF3IHNvdXJjZSBpcyBgc3RyYC4gKi9cblx0XHRcdHN0YXRpYyBmb3JSYXdTdHJpbmcoc3RyKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVGVtcGxhdGVFbGVtZW50KGZhbHNlLCB7XG5cdFx0XHRcdFx0Ly8gVE9ETzogQSB3YXkgdG8gY2FsY3VsYXRlIHRoaXM/XG5cdFx0XHRcdFx0Y29va2VkOiBudWxsLFxuXHRcdFx0XHRcdHJhdzogc3RyXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0VGVtcGxhdGVFbGVtZW50IGV2YWx1YXRpbmcgdG8gYHN0cmAuXG5cdFx0XHRVc2VzIGVzY2FwZSBzZXF1ZW5jZXMgYXMgbmVjZXNzYXJ5LlxuXHRcdFx0Ki9cblx0XHRcdHN0YXRpYyBmb3JTdHJpbmcoc3RyKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVGVtcGxhdGVFbGVtZW50KGZhbHNlLCB7XG5cdFx0XHRcdFx0Y29va2VkOiBzdHIsXG5cdFx0XHRcdFx0cmF3OiBlc2NhcGVTdHJpbmdGb3JUZW1wbGF0ZShzdHIpXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHRcdHN0YXRpYyBnZXQgRW1wdHkoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmZvclN0cmluZygnJylcblx0XHRcdH1cblxuXHRcdFx0Y29uc3RydWN0b3IodGFpbCAvKiBCb29sZWFuICovLCB2YWx1ZSAvKiBPYmplY3QgKi8pIHtcblx0XHRcdFx0c3VwZXIoKVxuXHRcdFx0XHR0aGlzLnRhaWwgPSB0YWlsXG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0XG5cdFx0XHRlc2NhcGVTdHJpbmdGb3JUZW1wbGF0ZSA9IHN0ciA9PlxuXHRcdFx0XHRzdHIucmVwbGFjZSgvW3tcXFxcYFxcblxcdFxcYlxcZlxcdlxcclxcdTIwMjhcXHUyMDI5XS9nLCBjaCA9PiB0ZW1wbGF0ZUVzY2FwZXNbY2hdKSxcblx0XHRcdHRlbXBsYXRlRXNjYXBlcyA9IHtcblx0XHRcdFx0Ly8gTmVlZCB0byBtYWtlIHN1cmUgXCIke1wiIGlzIGVzY2FwZWQuXG5cdFx0XHRcdCd7JzogJ1xcXFx7Jyxcblx0XHRcdFx0J2AnOiAnXFxcXGAnLFxuXHRcdFx0XHQnXFxcXCc6ICdcXFxcXFxcXCcsXG5cdFx0XHRcdCdcXG4nOiAnXFxcXG4nLFxuXHRcdFx0XHQnXFx0JzogJ1xcXFx0Jyxcblx0XHRcdFx0J1xcYic6ICdcXFxcYicsXG5cdFx0XHRcdCdcXGYnOiAnXFxcXGYnLFxuXHRcdFx0XHQnXFx2JzogJ1xcXFx2Jyxcblx0XHRcdFx0J1xccic6ICdcXFxccicsXG5cdFx0XHRcdCdcXHUyMDI4JzogJ1xcXFx1MjAyOCcsXG5cdFx0XHRcdCdcXHUyMDI5JzogJ1xcXFx1MjAyOSdcblx0XHRcdH1cblxuXHRcdC8qKiBUZW1wbGF0ZUxpdGVyYWwgd2l0aCBhIHRhZyBpbiBmcm9udCwgbGlrZWB0aGlzYC4gKi9cblx0XHRleHBvcnQgY2xhc3MgVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0XHRjb25zdHJ1Y3Rvcih0YWcgLyogRXhwcmVzc2lvbiAqLywgcXVhc2kgLyogVGVtcGxhdGVMaXRlcmFsICovKSB7XG5cdFx0XHRcdHN1cGVyKClcblx0XHRcdFx0dGhpcy50YWcgPSB0YWdcblx0XHRcdFx0dGhpcy5xdWFzaSA9IHF1YXNpXG5cdFx0XHR9XG5cdFx0fVxuXG4vLyBQYXR0ZXJuc1xuXHQvKipcblx0YHsgYSwgYjogYyB9ID1gXG5cdE9iamVjdCBkZWNvbnN0cnVjdGluZyBwYXR0ZXJuLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgT2JqZWN0UGF0dGVybiBleHRlbmRzIFBhdHRlcm4ge1xuXHRcdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgLyogQXJyYXlbQXNzaWdubWVudFByb3BlcnR5XSAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllc1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRKdXN0IGxpa2UgYSBQcm9wZXJ0eSwgYnV0IGtpbmQgaXMgYWx3YXlzIGBpbml0YC5cblx0QWx0aG91Z2ggdGVjaG5pY2FsbHkgaXRzIG93biB0eXBlLCBgXy50eXBlYCB3aWxsIGJlICdQcm9wZXJ0eScuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBBc3NpZ25tZW50UHJvcGVydHkgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihrZXkgLyogSWRlbnRpZmllciAqLywgdmFsdWUgLyogUGF0dGVybiAqLykge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdHZhbHVlID0ga2V5XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmtleSA9IGtleVxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0fVxuXG5cdFx0Z2V0IHR5cGUoKSB7IHJldHVybiAnUHJvcGVydHknIH1cblx0XHRnZXQga2luZCgpIHsgcmV0dXJuICdpbml0JyB9XG5cdFx0Z2V0IG1ldGhvZCgpIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRnZXQgc2hvcnRoYW5kKCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0Z2V0IGNvbXB1dGVkKCkgeyByZXR1cm4gZmFsc2UgfVxuXHR9XG5cblx0LyoqXG5cdGBbIGEsIGIgXSA9IC4uLmAuXG5cdEFycmF5IGRlY29uc3RydWN0aW5nIHBhdHRlcm4uXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBBcnJheVBhdHRlcm4gZXh0ZW5kcyBQYXR0ZXJuIHtcblx0XHRjb25zdHJ1Y3RvcihlbGVtZW50cyAvKiBBcnJheVtPcHRbUGF0dGVybl1dICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmVsZW1lbnRzID0gZWxlbWVudHNcblx0XHR9XG5cdH1cblxuXHQvKipcblx0Q2FuIGJlIHRoZSBsYXN0IGFyZ3VtZW50IHRvIGEgRnVuY3Rpb25FeHByZXNzaW9uL0Z1bmN0aW9uRGVjbGFyYXRpb25cblx0b3IgIGdvIGF0IHRoZSBlbmQgb2YgYW4gQXJyYXlQYXR0ZXJuLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgUmVzdEVsZW1lbnQgZXh0ZW5kcyBQYXR0ZXJuIHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCAvKiBQYXR0ZXJuICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cdH1cblxuLy8gQ2xhc3Nlc1xuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIE1ldGhvZERlZmluaXRpb259LiAqL1xuXHRleHBvcnQgY29uc3QgTWV0aG9kRGVmaW5pdGlvbktpbmQgPSBuZXcgU2V0KFsnY29uc3RydWN0b3InLCAnbWV0aG9kJywgJ2dldCcsICdzZXQnXSlcblx0LyoqIFBhcnQgb2YgYSB7QGxpbmsgQ2xhc3NCb2R5fS4gKi9cblx0ZXhwb3J0IGNsYXNzIE1ldGhvZERlZmluaXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3Rvcihcblx0XHRcdGtleSwgLy8gVW5pb25bSWRlbnRpZmllciBMaXRlcmFsXVxuXHRcdFx0dmFsdWUsIC8vIEZ1bmN0aW9uRXhwcmVzc2lvblxuXHRcdFx0a2luZCwgLy8gTWV0aG9kRGVmaW5pdGlvbktpbmRcblx0XHRcdF9zdGF0aWMsIC8vIEJvb2xlYW5cblx0XHRcdGNvbXB1dGVkKSB7IC8vIEJvb2xlYW5cblx0XHRcdGlmIChraW5kID09PSAnY29uc3RydWN0b3InKVxuXHRcdFx0XHRhc3NlcnQoa2V5IGluc3RhbmNlb2YgSWRlbnRpZmllciAmJiBrZXkubmFtZSA9PT0gJ2NvbnN0cnVjdG9yJylcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMua2V5ID0ga2V5XG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHRcdHRoaXMua2luZCA9IGtpbmRcblx0XHRcdHRoaXMuc3RhdGljID0gX3N0YXRpY1xuXHRcdFx0dGhpcy5jb21wdXRlZCA9IGNvbXB1dGVkXG5cdFx0fVxuXHR9XG5cblx0LyoqIENvbnRlbnRzIG9mIGEge0BsaW5rIENsYXNzfS4gKi9cblx0ZXhwb3J0IGNsYXNzIENsYXNzQm9keSBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGJvZHkgLyogQXJyYXlbTWV0aG9kRGVmaW5pdGlvbl0gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKioge0BsaW5rIENsYXNzRGVjbGFyYXRpb259IHwge0BsaW5rIENsYXNzRXhwcmVzc2lvbn0gKi9cblx0ZXhwb3J0IGNsYXNzIENsYXNzIGV4dGVuZHMgTm9kZSB7IH1cblxuXHQvLyBUT0RPOiBleHRlbmRzIERlY2xhcmF0aW9uIHRvb1xuXHQvKioge0BsaW5rIENsYXNzfSBpbiBkZWNsYXJhdGlvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIENsYXNzRGVjbGFyYXRpb24gZXh0ZW5kcyBDbGFzcyB7XG5cdFx0Y29uc3RydWN0b3IoaWQgLyogSWRlbnRpZmllciAqLywgc3VwZXJDbGFzcyAvKiBPcHRbRXhwcmVzc2lvbl0gKi8sIGJvZHkgLyogQ2xhc3NCb2R5ICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3Ncblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKioge0BsaW5rIENsYXNzfSBpbiBleHByZXNzaW9uIHBvc2l0aW9uLiAqL1xuXHRleHBvcnQgY2xhc3MgQ2xhc3NFeHByZXNzaW9uIGV4dGVuZHMgQ2xhc3Mge1xuXHRcdGNvbnN0cnVjdG9yKFxuXHRcdFx0aWQsIC8vIE9wdFtJZGVudGlmaWVyXVxuXHRcdFx0c3VwZXJDbGFzcywgLy8gT3B0W0V4cHJlc3Npb25dXG5cdFx0XHRib2R5KSB7IC8vIENsYXNzQm9keVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5pZCA9IGlkXG5cdFx0XHR0aGlzLnN1cGVyQ2xhc3MgPSBzdXBlckNsYXNzXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cbi8vIE1vZHVsZXNcblx0LyoqIEEgc3BlY2lmaWVyIGluIGFuIGltcG9ydCBvciBleHBvcnQgZGVjbGFyYXRpb24uICovXG5cdGV4cG9ydCBjbGFzcyBNb2R1bGVTcGVjaWZpZXIgZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHR7QGxpbmsgSW1wb3J0U3BlY2lmaWVyfSB8IHtAbGluayBJbXBvcnREZWZhdWx0U3BlY2lmaWVyfSB8IHtAbGluayBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXJ9XG5cdCovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCBleHRlbmRzIE5vZGUge1xuXG5cdH1cblxuXHQvKipcblx0YGltcG9ydCBzcGVjaWZpZXJzIGZyb20gc291cmNlYFxuXHRPbmx5IG9uZSBzcGVjaWZpZXIgbWF5IGJlIGEgSW1wb3J0RGVmYXVsdFNwZWNpZmllci5cblx0SWYgdGhlcmUgaXMgYW4gSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyLCBpdCBtdXN0IGJlIHRoZSBvbmx5IHNwZWNpZmllci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3Ioc3BlY2lmaWVycyAvKiBBcnJheVtJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdF0gKi8sIHNvdXJjZSAvKiBMaXRlcmFsU3RyaW5nICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnNwZWNpZmllcnMgPSBzcGVjaWZpZXJzXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRBIG5vbi1kZWZhdWx0IGltcG9ydC4gVXNlZCBpbiBhbiBJbXBvcnREZWNsYXJhdGlvbi5cblx0Rm9yIGBpbXBvcnQgeyBhIH0gZnJvbSBcInNvdXJjZVwiYCwganVzdCBwYXNzIG9uZSBhcmd1bWVudCBhbmQgbG9jYWwgd2lsbCA9IGltcG9ydGVkLlxuXHRGb3IgYGltcG9ydCB7IGEgYXMgYiB9IGZyb20gXCJzb3VyY2VcImAsIG1ha2UgaW1wb3J0ZWQgYGFgIGFuZCBsb2NhbCBgYmAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnRTcGVjaWZpZXIgZXh0ZW5kcyBNb2R1bGVTcGVjaWZpZXIge1xuXHRcdGNvbnN0cnVjdG9yKGltcG9ydGVkIC8qIElkZW50aWZpZXIgKi8sIGxvY2FsIC8qIElkZW50aWZpZXIgKi8pIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChsb2NhbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRsb2NhbCA9IGltcG9ydGVkXG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmltcG9ydGVkID0gaW1wb3J0ZWRcblx0XHRcdHRoaXMubG9jYWwgPSBsb2NhbFxuXHRcdH1cblx0fVxuXG5cdC8qKiBUaGUgZGVmYXVsdCBleHBvcnQsIGFzIGluIGBpbXBvcnQgYSBmcm9tIFwic291cmNlXCJgLiAqL1xuXHRleHBvcnQgY2xhc3MgSW1wb3J0RGVmYXVsdFNwZWNpZmllciBleHRlbmRzIEltcG9ydFNwZWNpZmllckFic3RyYWN0IHtcblx0XHRjb25zdHJ1Y3Rvcihsb2NhbCAvKiBJZGVudGlmaWVyICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKiogT2JqZWN0IG9mIGV2ZXJ5IGV4cG9ydCwgYXMgaW4gYGltcG9ydCAqIGFzIGEgZnJvbSBcInNvdXJjZVwiYC4gKi9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllciBleHRlbmRzIEltcG9ydFNwZWNpZmllckFic3RyYWN0IHtcblx0XHRjb25zdHJ1Y3Rvcihsb2NhbCAvKiBJZGVudGlmaWVyICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0QSBub24tZGVmYXVsdCBleHBvcnQuIFVzZWQgaW4gYW4gRXhwb3J0TmFtZWREZWNsYXJhdGlvbi5cblx0Rm9yIGBleHBvcnQgeyBhIH0gZnJvbSBcInNvdXJjZVwiYCwganVzdCBwYXNzIG9uZSBhcmd1bWVudCBsb2NhbCB3aWxsID0gZXhwb3J0ZWQuXG5cdEZvciBgZXhwb3J0IHsgYSBhcyBiIH1gLCBtYWtlIGV4cG9ydGVkIGBiYCBhbmQgbG9jYWwgYGFgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRXhwb3J0U3BlY2lmaWVyIGV4dGVuZHMgTW9kdWxlU3BlY2lmaWVyIHtcblx0XHRjb25zdHJ1Y3RvcihleHBvcnRlZCAvKiBJZGVudGlmaWVyICovLCBsb2NhbCAvKiBJZGVudGlmaWVyICovKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAobG9jYWwgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0bG9jYWwgPSBleHBvcnRlZFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5leHBvcnRlZCA9IGV4cG9ydGVkXG5cdFx0XHR0aGlzLmxvY2FsID0gbG9jYWxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0RXhwb3J0cyBtdWx0aXBsZSB2YWx1ZXMgYXMgaW4gYGV4cG9ydCB7IGEsIGIgYXMgYyB9YC5cblx0SWYgc291cmNlICE9PSBudWxsLFxuXHRyZS1leHBvcnRzIGZyb20gdGhhdCBtb2R1bGUgYXMgaW4gYGV4cG9ydCB7IC4uLiB9IGZyb20gXCJzb3VyY2VcImAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnROYW1lZERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoXG5cdFx0XHRkZWNsYXJhdGlvbiAvKiBPcHRbRGVjbGFyYXRpb25dICovLFxuXHRcdFx0c3BlY2lmaWVycyAvKiBBcnJheVtFeHBvcnRTcGVjaWZpZXJdICovLFxuXHRcdFx0c291cmNlIC8qIE9wdFtMaXRlcmFsU3RyaW5nXSAqLykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbiA9IGRlY2xhcmF0aW9uXG5cdFx0XHR0aGlzLnNwZWNpZmllcnMgPSBzcGVjaWZpZXJzXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZXhwb3J0IGRlZmF1bHQgZGVjbGFyYXRpb25gICovXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihkZWNsYXJhdGlvbiAvKiBVbmlvbltEZWNsYXJhdGlvbiwgRXhwcmVzc2lvbl0gKi8pIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXMuZGVjbGFyYXRpb24gPSBkZWNsYXJhdGlvblxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZXhwb3J0ICogZnJvbSBzb3VyY2VgICovXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnRBbGxEZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKHNvdXJjZSAvKiBMaXRlcmFsU3RyaW5nICovKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXHRcdH1cblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=
