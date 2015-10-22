(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== 'undefined') {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.ast = mod.exports;
	}
})(this, function (exports) {
	/** Base type of all ASTs. */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

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

		/** @override */
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
		constructor(body) {
			super();
			/** @type {Array<Statement>} */
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
		constructor(name) {
			super();
			/** @type {String} */
			this.name = name;
		}
	}

	/** Single declaration within a {@link VariableDeclaration}. */
	exports.Identifier = Identifier;

	class VariableDeclarator extends Node {
		constructor(id, init) {
			// TODO:ES6 Optional args
			if (init === undefined) init = null;
			super();
			/** @type {Pattern} */
			this.id = id;
			/** @type {?Expression} */
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
		constructor(kind, declarations) {
			super();
			/** @type {VariableDeclarationKind} */
			this.kind = kind;
			/** @type {Array<VariableDeclarator>} */
			this.declarations = declarations;
			if (this.declarations.length === 0) throw new Error('VariableDeclaration must have at least 1 declaration.');
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
		constructor(body) {
			super();
			/** @type {Array<Statement>} */
			this.body = body;
		}
	}

	/**
 An expression statement, i.e., a statement consisting of a single expression.
 See `esast.util toStatement toStatements`.
 */
	exports.BlockStatement = BlockStatement;

	class ExpressionStatement extends Statement {
		constructor(expression) {
			super();
			/** @type {Expression} */
			this.expression = expression;
		}
	}

	/** An if (or if ... else) statement. */
	exports.ExpressionStatement = ExpressionStatement;

	class IfStatement extends Statement {
		constructor(test, consequent, alternate) {
			// TODO:ES6 Optional arguments
			if (alternate === undefined) alternate = null;
			super();
			/** @type {Expression} */
			this.test = test;
			/** @type {Statement} */
			this.consequent = consequent;
			/** @type {?Statement} */
			this.alternate = alternate;
		}
	}

	/** A statement prefixed by a label. */
	exports.IfStatement = IfStatement;

	class LabeledStatement extends Statement {
		constructor(label, body) {
			super();
			/** @type {Identifier} */
			this.label = label;
			/** @type {Statement} */
			this.body = body;
		}
	}

	exports.LabeledStatement = LabeledStatement;

	class BreakStatement extends Statement {
		/** The `break` keyword. */
		constructor(label) {
			// TODO:ES6 Optional args
			if (label === undefined) label = null;
			super();
			/** @type {?Identifier} */
			this.label = label;
		}
	}

	/** The `continue` keyword. */
	exports.BreakStatement = BreakStatement;

	class ContinueStatement extends Statement {
		constructor(label) {
			// TODO:ES6 Optional args
			if (label === undefined) label = null;
			super();
			/** @type {?Identifier} */
			this.label = label;
		}
	}

	/**
 `switch (discriminant) { cases }`
 Only the last entry of `cases` is allowed to be `default`.
 */
	exports.ContinueStatement = ContinueStatement;

	class SwitchStatement extends Statement {
		constructor(discriminant, cases) {
			super();
			/** @type {Expression} */
			this.discriminant = discriminant;
			/** @type {Array<SwitchCase>} */
			this.cases = cases;
		}
	}

	/**
 A single `case` within a SwitchStatement.
 If `test` is `null`, this is the `default` case.
 */
	exports.SwitchStatement = SwitchStatement;

	class SwitchCase extends Statement {
		constructor(test, consequent) {
			// TODO:ES6 Optional args
			if (test === undefined) test = null;
			super();
			/** @type {?Expression} */
			this.test = test;
			/** @type {Array<Statement> */
			this.consequent = consequent;
		}
	}

	/** The `return` keyword, optionally followed by an Expression to return. */
	exports.SwitchCase = SwitchCase;

	class ReturnStatement extends Statement {
		constructor(argument) {
			// TODO:ES6 Optional args
			if (argument === undefined) argument = null;
			super();
			/** @type {?Expression} */
			this.argument = argument;
		}
	}

	/**
 The `throw` keyword, and something to throw.
 See `esast.util throwError`.
 */
	exports.ReturnStatement = ReturnStatement;

	class ThrowStatement extends Statement {
		constructor(argument) {
			super();
			/** @type {Expression} */
			this.argument = argument;
		}
	}

	/**
 `try { block } catch (handler.param) { handler.body } finally { finalizer }`
 At least one of `handler` or `finalizer` must be non-null.
 */
	exports.ThrowStatement = ThrowStatement;

	class TryStatement extends Statement {
		constructor(block, handler, finalizer) {
			// TODO:ES6 Optional args
			if (handler === undefined) handler = null;
			if (finalizer === undefined) finalizer = null;
			super();
			/** @type {BlockStatement} */
			this.block = block;
			/** @type {?CatchClause} */
			this.handler = handler;
			/** @type {?BlockStatement} */
			this.finalizer = finalizer;
		}
	}

	/** Must be *part* of a {@link TryStatement} -- does *not* follow it. */
	exports.TryStatement = TryStatement;

	class CatchClause extends Node {
		constructor(param, body) {
			super();
			/** @type {Pattern} */
			this.param = param;
			/** @type {BlockStatement} */
			this.body = body;
		}
	}

	/** `while (test) body` */
	exports.CatchClause = CatchClause;

	class WhileStatement extends Statement {
		constructor(test, body) {
			super();
			/** @type {Expression} */
			this.test = test;
			/** @type {Statement} */
			this.body = body;
		}
	}

	/** `do body while (test)` */
	exports.WhileStatement = WhileStatement;

	class DoWhileStatement extends Statement {
		constructor(body, test) {
			super();
			/** @type {Statement} */
			this.body = body;
			/** @type {Expression} */
			this.test = test;
		}
	}

	/**
 `for (init; test; update) body`
 Not to be confused with ForInStatement or ForOfStatement.
 */
	exports.DoWhileStatement = DoWhileStatement;

	class ForStatement extends Statement {
		constructor(init, test, update, body) {
			super();
			/** @type {?(VariableDeclaration | Expression)} */
			this.init = init;
			/** @type {?Expression} */
			this.test = test;
			/** @type {?Expression} */
			this.update = update;
			/** @type {Statement} */
			this.body = body;
		}
	}

	/** `for (left in right) body` */
	exports.ForStatement = ForStatement;

	class ForInStatement extends Statement {
		constructor(left, right, body) {
			super();
			/** @type {VariableDeclaration | Expression} */
			this.left = left;
			/** @type {Expression} */
			this.right = right;
			/** @type {Statement} */
			this.body = body;
		}
	}

	/** `for (left of right) body` */
	exports.ForInStatement = ForInStatement;

	class ForOfStatement extends Statement {
		constructor(left, right, body) {
			super();
			/** @type {VariableDeclaration | Expression} */
			this.left = left;
			/** @type {Expression} */
			this.right = right;
			/** @type {Statement} */
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
		constructor(id, params, body, generator) {
			// TODO:ES6 Optional args
			if (generator === undefined) generator = false;
			super();
			/** @type {Identifier} */
			this.id = id;
			/** @type {Array<Pattern>} */
			this.params = params;
			/** @type {BlockStatement} */
			this.body = body;
			/** @type {boolean} */
			this.generator = generator;
		}
	}

	// TODO: Declaration too
	/** {@link Function} in declaration position. */

	class FunctionDeclaration extends FunctionNonArrow {}

	// Expressions
	exports.FunctionDeclaration = FunctionDeclaration;

	class Literal extends Expression {
		constructor(value) {
			super();
			/** @type {number|string|boolean|null} */
			this.value = value;
		}
	}

	/** The `this` keyword. */
	exports.Literal = Literal;

	class ThisExpression extends Expression {}

	/** `[ elements ]` */
	exports.ThisExpression = ThisExpression;

	class ArrayExpression extends Expression {
		constructor(elements) {
			super();
			/** @type {Array<?Expression>} */
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
		constructor(kind, key, value, method) {
			// TODO:ES6 Optional args
			if (value === undefined) value = key;
			// TODO:ES6 Optional args
			if (method === undefined) method = false;
			super();
			/** @type {PropertyKind} */
			this.kind = kind;
			/** @type {Literal | Identifier} */
			this.key = key;
			/** @type {Expression} */
			this.value = value;
			/** @type {boolean} */
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

	/** An object literal. */
	exports.Property = Property;

	class ObjectExpression extends Expression {
		constructor(properties) {
			super();
			/** @type {Array<Property>} */
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
		constructor(params, body) {
			super();
			/** @type {Array<Pattern>} */
			this.params = params;
			/** @type {BlockStatement | Expression} */
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
		constructor(expressions) {
			super();
			/** @type {Array<Expression>} */
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
		constructor(operator, argument) {
			super();
			/** @type {UnaryOperator} */
			this.operator = operator;
			/** @type {Expression} */
			this.argument = argument;
		}

		/** Always true. Needed for comparibility with estree. */
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
		constructor(operator, left, right) {
			super();
			/** @type {BinaryOperator} */
			this.operator = operator;
			/** @type {Expression} */
			this.left = left;
			/** @type {Expression} */
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
		constructor(operator, left, right) {
			super();
			/** @type {AssignmentOperator} */
			this.operator = operator;
			/** @type {Pattern} */
			this.left = left;
			/** @type {Expression} */
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
		constructor(operator, argument, prefix) {
			super();
			/** @type {UpdateOperator} */
			this.operator = operator;
			/** @type {Expression} */
			this.argument = argument;
			/** @type {boolean} */
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
		constructor(operator, left, right) {
			super();
			/** @type {LogicalOperator} */
			this.operator = operator;
			/** @type {Expression} */
			this.left = left;
			/** @type {Expression} */
			this.right = right;
		}
	}

	/** `test ? consequent : alternate` */
	exports.LogicalExpression = LogicalExpression;

	class ConditionalExpression extends Expression {
		constructor(test, consequent, alternate) {
			super();
			/** @type {Expression} */
			this.test = test;
			/** @type {Expression} */
			this.consequent = consequent;
			/** @type {Expression} */
			this.alternate = alternate;
		}
	}

	/**
 `new callee(arguments)`
 Just like {@link CallExpression} but with `new` in front.
 */
	exports.ConditionalExpression = ConditionalExpression;

	class NewExpression extends Expression {
		constructor(callee, _arguments) {
			super();
			/** @type {Expression} */
			this.callee = callee;
			/** @type {Array<Expression>} */
			this.arguments = _arguments;
		}
	}

	/** `callee(arguments)` */
	exports.NewExpression = NewExpression;

	class CallExpression extends Expression {
		constructor(callee, _arguments) {
			super();
			/** @type {Expression} */
			this.callee = callee;
			/** @type {Array<Expression>} */
			this.arguments = _arguments;
		}
	}

	/** `...args` in a CallExpression. */
	exports.CallExpression = CallExpression;

	class SpreadElement extends Node {
		constructor(argument) {
			super();
			/** @type {Expression} */
			this.argument = argument;
		}
	}

	/**
 If computed === true, `object[property]`.
 Else, `object.property` -- meaning property should be an Identifier.
 */
	exports.SpreadElement = SpreadElement;

	class MemberExpression extends Expression {
		constructor(object, property) {
			super();
			/** @type {Expression} */
			this.object = object;
			/** @type {Expression} */
			this.property = property;
		}

		/** Needed for compatibility with estree. */
		get computed() {
			return !(this.property instanceof Identifier);
		}
	}

	/** `yield argument` or `yield* argument` */
	exports.MemberExpression = MemberExpression;

	class YieldExpression extends Expression {
		constructor(argument, delegate) {
			super();
			/** @type {?Expression} */
			this.argument = argument;
			/** @type {boolean} */
			this.delegate = delegate;

			if (this.delegate && this.argument === null) throw new Error('Can not yield* without argument.');
		}
	}

	// Templates
	/**
 A template with no tag.
 It alternates between quasis and expressions.
 It should begin and end with quasis, using {@link TemplateElement.empty} if necessary.
 This means that `${1}${2}` has 3 empty quasis!
 */
	exports.YieldExpression = YieldExpression;

	class TemplateLiteral extends Expression {
		constructor(quasis, expressions) {
			super();
			/** @type {Array<TemplateElement>} */
			this.quasis = quasis;
			/** @type {Array<Expression>} */
			this.expressions = expressions;
			if (this.quasis.length !== this.expressions.length + 1) throw new Error('There must be 1 more quasi than expressions.\n' + 'Maybe you need to add an empty quasi to the front or end.');
		}
	}

	/** Part of a TemplateLiteral. */
	exports.TemplateLiteral = TemplateLiteral;

	class TemplateElement extends Node {
		/**
  TemplateElement whose raw source is `str`.
  @param {string} str
  */
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
  @param {string} str
  */
		static forString(str) {
			return new TemplateElement(false, {
				cooked: str,
				raw: escapeStringForTemplate(str)
			});
		}

		/** TemplateElement with empty value. */
		static get empty() {
			return this.forString('');
		}

		constructor(tail, value) {
			super();
			/**
   Use this to mark the last TemplateElement.
   @type {boolean}
   */
			this.tail = tail;
			/** @type {{cooked: string, raw: string}} */
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
		constructor(tag, quasi) {
			super();
			/** @type {Expression} */
			this.tag = tag;
			/** @type {TemplateLiteral} */
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
		constructor(properties) {
			super();
			/** @type {Array<AssignmentProperty>} */
			this.properties = properties;
		}
	}

	/**
 Just like a Property, but kind is always `init`.
 Although technically its own type, `_.type` will be 'Property'.
 */
	exports.ObjectPattern = ObjectPattern;

	class AssignmentProperty extends Node {
		constructor(key, value) {
			// TODO:ES6 Optional args
			if (value === undefined) value = key;
			super();
			/** @type {Identifier} */
			this.key = key;
			/** @type {Pattern} */
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

	/**
 `[ a, b ] = ...`.
 Array deconstructing pattern.
 */
	exports.AssignmentProperty = AssignmentProperty;

	class ArrayPattern extends Pattern {
		constructor(elements) {
			super();
			/** @type {Array<?Pattern>} */
			this.elements = elements;
		}
	}

	/**
 Can be the last argument to a FunctionExpression/FunctionDeclaration
 or  go at the end of an ArrayPattern.
 */
	exports.ArrayPattern = ArrayPattern;

	class RestElement extends Pattern {
		constructor(argument) {
			super();
			/** @type {Pattern} */
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
		/** @param {FunctionExpression} value */
		static constructor(value) {
			return new MethodDefinition(new Identifier('constructor'), value, 'constructor');
		}

		constructor(key, value, kind, _static, computed) {
			// TODO:ES6 Optional args
			if (_static === undefined) _static = false;
			if (computed === undefined) computed = false;
			if (kind === 'constructor' && !(key instanceof Identifier && key.name === 'constructor' && !_static && !computed)) throw new Error('Constructor method should created with `MethodDefinition.constructor`.');
			super();
			/** @type {Identifier | Literal} */
			this.key = key;
			/** @type {FunctionExpression} */
			this.value = value;
			/** @type {MethodDefinitionKind} */
			this.kind = kind;
			/** @type {boolean} */
			this.static = _static;
			/** @type {boolean} */
			this.computed = computed;

			if (value.id !== null) throw new Error('MethodDefinition value should not have id; that is handled by `key`.');
		}
	}

	/** Contents of a {@link Class}. */
	exports.MethodDefinition = MethodDefinition;

	class ClassBody extends Node {
		constructor(body) {
			super();
			/** @type {Array<MethodDefinition>} */
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
		constructor(id, superClass, body) {
			super();
			/** @type {Identifier} */
			this.id = id;
			/** @type {?Expression} */
			this.superClass = superClass;
			/** @type {ClassBody} */
			this.body = body;
		}
	}

	/** {@link Class} in expression position. */
	exports.ClassDeclaration = ClassDeclaration;

	class ClassExpression extends Class {
		constructor(id, superClass, body) {
			super();
			/** @type {?Identifier} */
			this.id = id;
			/** @type {?Expression} */
			this.superClass = superClass;
			/** @type {ClassBody} */
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
		constructor(specifiers, source) {
			super();
			/** @type {Array<ImportSpecifierAbstract>} */
			this.specifiers = specifiers;
			/** @type {Literal<string>} */
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
		constructor(imported, local) {
			// TODO:ES6 Optional args
			if (local === undefined) local = imported;
			super();
			/** @type {Identifier} */
			this.imported = imported;
			/** @type {Identifier} */
			this.local = local;
		}
	}

	/** The default export, as in `import a from "source"`. */
	exports.ImportSpecifier = ImportSpecifier;

	class ImportDefaultSpecifier extends ImportSpecifierAbstract {
		constructor(local) {
			super();
			/** @type {Identifier} */
			this.local = local;
		}
	}

	/** Object of every export, as in `import * as a from "source"`. */
	exports.ImportDefaultSpecifier = ImportDefaultSpecifier;

	class ImportNamespaceSpecifier extends ImportSpecifierAbstract {
		constructor(local) {
			super();
			/** @type {Identifier} */
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
		constructor(exported, local) {
			// TODO:ES6 Optional args
			if (local === undefined) local = exported;
			super();
			/** @type {Identifier} */
			this.exported = exported;
			/** @type {Identifier} */
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
		constructor(declaration, specifiers, source) {
			// TODO:ES6 Optional arguments
			if (specifiers === undefined) specifiers = [];
			if (source === undefined) source = null;

			super();
			/** @type {?Declaration} */
			this.declaration = declaration;
			/** @type {Array<ExportSpecifier>} */
			this.specifiers = specifiers;
			/** @type {?Literal<string>} */
			this.source = source;

			if (declaration !== null && !(specifiers.length === 0 && source === null)) throw new Error('Declaration can not be combined with specifiers/source.');
		}
	}

	/** `export default declaration` */
	exports.ExportNamedDeclaration = ExportNamedDeclaration;

	class ExportDefaultDeclaration extends Node {
		constructor(declaration) {
			super();
			/** @type {Declaration | Expression} */
			this.declaration = declaration;
		}
	}

	/** `export * from source` */
	exports.ExportDefaultDeclaration = ExportDefaultDeclaration;

	class ExportAllDeclaration extends Node {
		constructor(source) {
			super();
			/** @type {Literal<string>} */
			this.source = source;
		}
	}

	exports.ExportAllDeclaration = ExportAllDeclaration;
});
//# sourceMappingURL=data:application/json;base64,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LEdBQUcsTUFBTSxDQUFBOztBQUVwQixPQUFJLFdBQVcsS0FBSyxJQUFJLElBQUksRUFBRSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFBLEFBQUMsRUFDeEUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFBO0dBQzNFO0VBQ0Q7Ozs7O0FBR00sT0FBTSx3QkFBd0IsU0FBUyxJQUFJLENBQUM7QUFDbEQsYUFBVyxDQUFDLFdBQVcsRUFBRTtBQUN4QixRQUFLLEVBQUUsQ0FBQTs7QUFFUCxPQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQTtHQUM5QjtFQUNEOzs7OztBQUdNLE9BQU0sb0JBQW9CLFNBQVMsSUFBSSxDQUFDO0FBQzlDLGFBQVcsQ0FBQyxNQUFNLEVBQUU7QUFDbkIsUUFBSyxFQUFFLENBQUE7O0FBRVAsT0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7R0FDcEI7RUFDRCIsImZpbGUiOiJhc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQmFzZSB0eXBlIG9mIGFsbCBBU1RzLiAqL1xuZXhwb3J0IGNsYXNzIE5vZGUge1xuXHQvKipcblx0Q29udmVydCB0byBKU09OLlxuXHRAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lc3RyZWUvZXN0cmVlXG5cdCovXG5cdHRvSlNPTigpIHtcblx0XHRjb25zdCBvYmogPSB7IH1cblx0XHRvYmoudHlwZSA9IHRoaXMudHlwZVxuXHRcdC8vIFNvcnQgdG8gbWFrZSBKU09OIHJlbmRlcmluZyBkZXRlcm1pbmlzdGljLlxuXHRcdE9iamVjdC5rZXlzKHRoaXMpLnNvcnQoKS5mb3JFYWNoKGtleSA9PiB7IG9ialtrZXldID0gdGhpc1trZXldIH0pXG5cdFx0cmV0dXJuIG9ialxuXHR9XG5cblx0LyoqXG5cdEZvciBjb21wYXRpYmlsaXR5IHdpdGggb3RoZXIgQVNUIHJlcHJlc2VudGF0aW9ucyxcblx0YWxsIE5vZGUgaW5zdGFuY2VzIGhhdmUgYSAndHlwZScgcHJvcGVydHkgdGhhdCBpcyB0aGUgbmFtZSBvZiB0aGF0IHR5cGUuXG5cdEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzdHJlZS9lc3RyZWVcblx0Ki9cblx0Z2V0IHR5cGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IubmFtZVxuXHR9XG5cblx0LyoqIEBvdmVycmlkZSAqL1xuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcylcblx0fVxufVxuXG4vLyBBYnN0cmFjdHNcblx0LyoqIExpbmUgdGhhdCBkZWNsYXJlcyBuZXcgbG9jYWxzLiAqL1xuXHRleHBvcnQgY2xhc3MgRGVjbGFyYXRpb24gZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKiBCbG9ja3Mgb2YgY29kZSBoYXZlIGxpbmVzIHRoYXQgYXJlIFN0YXRlbWVudHMgb3IgRGVjbGFyYXRpb25zLiAqL1xuXHRleHBvcnQgY2xhc3MgU3RhdGVtZW50IGV4dGVuZHMgTm9kZSB7IH1cblxuXHQvKipcblx0Q29kZSB0aGF0IGhhcyBhIHZhbHVlLlxuXHRUbyB1c2Ugb25lIGluIGEgc3RhdGVtZW50IHBvc2l0aW9uLCBzZWUgRXhwcmVzc2lvblN0YXRlbWVudC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEV4cHJlc3Npb24gZXh0ZW5kcyBOb2RlIHsgfVxuXG5cdC8qKlxuXHRDYW4gZ28gaW4gYSBwYXJhbWV0ZXIgbGlzdCBvciBvbiB0aGUgbGVmdCBzaWRlIG9mIGFuIGFzc2lnbm1lbnQuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBQYXR0ZXJuIGV4dGVuZHMgTm9kZSB7IH1cblxuLy8gQSBjb21wbGV0ZSBwcm9ncmFtIHNvdXJjZSB0cmVlLlxuZXhwb3J0IGNsYXNzIFByb2dyYW0gZXh0ZW5kcyBOb2RlIHtcblx0Y29uc3RydWN0b3IoYm9keSkge1xuXHRcdHN1cGVyKClcblx0XHQvKiogQHR5cGUge0FycmF5PFN0YXRlbWVudD59ICovXG5cdFx0dGhpcy5ib2R5ID0gYm9keVxuXHR9XG59XG5cbi8vIFZhcmlhYmxlc1xuXHQvKipcblx0QSBKYXZhU2NyaXB0IGlkZW50aWZpZXIuXG5cblx0SXQgaXMgYXNzdW1lZCB0aGF0IHlvdSBoYXZlIGNhbGxlZCBgbWFuZ2xlSWRlbnRpZmllcmAgYXMgYXBwcm9wcmlhdGUuXG5cdFNlZSBhbHNvIHtAbGluayBpZGVudGlmaWVyfS5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIElkZW50aWZpZXIgZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihuYW1lKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1N0cmluZ30gKi9cblx0XHRcdHRoaXMubmFtZSA9IG5hbWVcblx0XHR9XG5cdH1cblxuXHQvKiogU2luZ2xlIGRlY2xhcmF0aW9uIHdpdGhpbiBhIHtAbGluayBWYXJpYWJsZURlY2xhcmF0aW9ufS4gKi9cblx0ZXhwb3J0IGNsYXNzIFZhcmlhYmxlRGVjbGFyYXRvciBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGlkLCBpbml0KSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAoaW5pdD09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGluaXQgPSBudWxsXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1BhdHRlcm59ICovXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmluaXQgPSBpbml0XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBWYXJpYWJsZURlY2xhcmF0aW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IFZhcmlhYmxlRGVjbGFyYXRpb25LaW5kID0gbmV3IFNldChbJ2NvbnN0JywgJ2xldCcsICd2YXInXSlcblx0LyoqXG5cdERlY2xhcmVzIGFuZCBvcHRpb25hbGx5IGluaXRpYWxpemVzIG1hbnkgdmFyaWFibGVzLlxuXHRNdXN0IGJlIGF0IGxlYXN0IG9uZSBkZWNsYXJhdGlvbi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFZhcmlhYmxlRGVjbGFyYXRpb24gZXh0ZW5kcyBEZWNsYXJhdGlvbiB7XG5cdFx0Y29uc3RydWN0b3Ioa2luZCwgZGVjbGFyYXRpb25zKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1ZhcmlhYmxlRGVjbGFyYXRpb25LaW5kfSAqL1xuXHRcdFx0dGhpcy5raW5kID0ga2luZFxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxWYXJpYWJsZURlY2xhcmF0b3I+fSAqL1xuXHRcdFx0dGhpcy5kZWNsYXJhdGlvbnMgPSBkZWNsYXJhdGlvbnNcblx0XHRcdGlmICh0aGlzLmRlY2xhcmF0aW9ucy5sZW5ndGggPT09IDApXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignVmFyaWFibGVEZWNsYXJhdGlvbiBtdXN0IGhhdmUgYXQgbGVhc3QgMSBkZWNsYXJhdGlvbi4nKVxuXHRcdH1cblx0fVxuXG5cbi8vIFN0YXRlbWVudHNcblx0LyoqXG5cdEFuIGVtcHR5IHN0YXRlbWVudCwgaS5lLiwgYSBzb2xpdGFyeSBzZW1pY29sb24uXG5cdE5vdCB1c2VmdWwgZm9yIGNvZGUgZ2VuZXJhdGlvbiwgYnV0IHNvbWUgcGFyc2VycyB3aWxsIHJldHVybiB0aGVzZS5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEVtcHR5U3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHsgfVxuXG5cdC8qKiBBIGJsb2NrIHN0YXRlbWVudCwgaS5lLiwgYSBzZXF1ZW5jZSBvZiBzdGF0ZW1lbnRzIHN1cnJvdW5kZWQgYnkgYnJhY2VzLiAqL1xuXHRleHBvcnQgY2xhc3MgQmxvY2tTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8U3RhdGVtZW50Pn0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKipcblx0QW4gZXhwcmVzc2lvbiBzdGF0ZW1lbnQsIGkuZS4sIGEgc3RhdGVtZW50IGNvbnNpc3Rpbmcgb2YgYSBzaW5nbGUgZXhwcmVzc2lvbi5cblx0U2VlIGBlc2FzdC51dGlsIHRvU3RhdGVtZW50IHRvU3RhdGVtZW50c2AuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBFeHByZXNzaW9uU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihleHByZXNzaW9uKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFuIGlmIChvciBpZiAuLi4gZWxzZSkgc3RhdGVtZW50LiAqL1xuXHRleHBvcnQgY2xhc3MgSWZTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJndW1lbnRzXG5cdFx0XHRpZiAoYWx0ZXJuYXRlID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGFsdGVybmF0ZSA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5jb25zZXF1ZW50ID0gY29uc2VxdWVudFxuXHRcdFx0LyoqIEB0eXBlIHs/U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5hbHRlcm5hdGUgPSBhbHRlcm5hdGVcblx0XHR9XG5cdH1cblxuXHQvKiogQSBzdGF0ZW1lbnQgcHJlZml4ZWQgYnkgYSBsYWJlbC4gKi9cblx0ZXhwb3J0IGNsYXNzIExhYmVsZWRTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGxhYmVsLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxhYmVsID0gbGFiZWxcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdGV4cG9ydCBjbGFzcyBCcmVha1N0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0LyoqIFRoZSBgYnJlYWtgIGtleXdvcmQuICovXG5cdFx0Y29uc3RydWN0b3IobGFiZWwpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChsYWJlbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRsYWJlbCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmxhYmVsID0gbGFiZWxcblx0XHR9XG5cdH1cblxuXHQvKiogVGhlIGBjb250aW51ZWAga2V5d29yZC4gKi9cblx0ZXhwb3J0IGNsYXNzIENvbnRpbnVlU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihsYWJlbCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxhYmVsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxhYmVsID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubGFiZWwgPSBsYWJlbFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgc3dpdGNoIChkaXNjcmltaW5hbnQpIHsgY2FzZXMgfWBcblx0T25seSB0aGUgbGFzdCBlbnRyeSBvZiBgY2FzZXNgIGlzIGFsbG93ZWQgdG8gYmUgYGRlZmF1bHRgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgU3dpdGNoU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcihkaXNjcmltaW5hbnQsIGNhc2VzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmRpc2NyaW1pbmFudCA9IGRpc2NyaW1pbmFudFxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxTd2l0Y2hDYXNlPn0gKi9cblx0XHRcdHRoaXMuY2FzZXMgPSBjYXNlc1xuXHRcdH1cblx0fVxuXHQvKipcblx0QSBzaW5nbGUgYGNhc2VgIHdpdGhpbiBhIFN3aXRjaFN0YXRlbWVudC5cblx0SWYgYHRlc3RgIGlzIGBudWxsYCwgdGhpcyBpcyB0aGUgYGRlZmF1bHRgIGNhc2UuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBTd2l0Y2hDYXNlIGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcih0ZXN0LCBjb25zZXF1ZW50KSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAodGVzdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHR0ZXN0ID0gbnVsbFxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8U3RhdGVtZW50PiAqL1xuXHRcdFx0dGhpcy5jb25zZXF1ZW50ID0gY29uc2VxdWVudFxuXHRcdH1cblx0fVxuXG5cdC8qKiBUaGUgYHJldHVybmAga2V5d29yZCwgb3B0aW9uYWxseSBmb2xsb3dlZCBieSBhbiBFeHByZXNzaW9uIHRvIHJldHVybi4gKi9cblx0ZXhwb3J0IGNsYXNzIFJldHVyblN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChhcmd1bWVudCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRhcmd1bWVudCA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cdH1cblxuXHQvKipcblx0VGhlIGB0aHJvd2Aga2V5d29yZCwgYW5kIHNvbWV0aGluZyB0byB0aHJvdy5cblx0U2VlIGBlc2FzdC51dGlsIHRocm93RXJyb3JgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgVGhyb3dTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YHRyeSB7IGJsb2NrIH0gY2F0Y2ggKGhhbmRsZXIucGFyYW0pIHsgaGFuZGxlci5ib2R5IH0gZmluYWxseSB7IGZpbmFsaXplciB9YFxuXHRBdCBsZWFzdCBvbmUgb2YgYGhhbmRsZXJgIG9yIGBmaW5hbGl6ZXJgIG11c3QgYmUgbm9uLW51bGwuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBUcnlTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGJsb2NrLCBoYW5kbGVyLCBmaW5hbGl6ZXIpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGhhbmRsZXIgPSBudWxsXG5cdFx0XHRpZiAoZmluYWxpemVyID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGZpbmFsaXplciA9IG51bGxcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QmxvY2tTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJsb2NrID0gYmxvY2tcblx0XHRcdC8qKiBAdHlwZSB7P0NhdGNoQ2xhdXNlfSAqL1xuXHRcdFx0dGhpcy5oYW5kbGVyID0gaGFuZGxlclxuXHRcdFx0LyoqIEB0eXBlIHs/QmxvY2tTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmZpbmFsaXplciA9IGZpbmFsaXplclxuXHRcdH1cblx0fVxuXHQvKiogTXVzdCBiZSAqcGFydCogb2YgYSB7QGxpbmsgVHJ5U3RhdGVtZW50fSAtLSBkb2VzICpub3QqIGZvbGxvdyBpdC4gKi9cblx0ZXhwb3J0IGNsYXNzIENhdGNoQ2xhdXNlIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IocGFyYW0sIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMucGFyYW0gPSBwYXJhbVxuXHRcdFx0LyoqIEB0eXBlIHtCbG9ja1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKiogYHdoaWxlICh0ZXN0KSBib2R5YCAqL1xuXHRleHBvcnQgY2xhc3MgV2hpbGVTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKHRlc3QsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZG8gYm9keSB3aGlsZSAodGVzdClgICovXG5cdGV4cG9ydCBjbGFzcyBEb1doaWxlU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcblx0XHRjb25zdHJ1Y3Rvcihib2R5LCB0ZXN0KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YGZvciAoaW5pdDsgdGVzdDsgdXBkYXRlKSBib2R5YFxuXHROb3QgdG8gYmUgY29uZnVzZWQgd2l0aCBGb3JJblN0YXRlbWVudCBvciBGb3JPZlN0YXRlbWVudC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEZvclN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IoaW5pdCwgdGVzdCwgdXBkYXRlLCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUgez8oVmFyaWFibGVEZWNsYXJhdGlvbiB8IEV4cHJlc3Npb24pfSAqL1xuXHRcdFx0dGhpcy5pbml0ID0gaW5pdFxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMudGVzdCA9IHRlc3Rcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnVwZGF0ZSA9IHVwZGF0ZVxuXHRcdFx0LyoqIEB0eXBlIHtTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0fVxuXHR9XG5cblx0LyoqIGBmb3IgKGxlZnQgaW4gcmlnaHQpIGJvZHlgICovXG5cdGV4cG9ydCBjbGFzcyBGb3JJblN0YXRlbWVudCBleHRlbmRzIFN0YXRlbWVudCB7XG5cdFx0Y29uc3RydWN0b3IobGVmdCwgcmlnaHQsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VmFyaWFibGVEZWNsYXJhdGlvbiB8IEV4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHRcdC8qKiBAdHlwZSB7U3RhdGVtZW50fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZm9yIChsZWZ0IG9mIHJpZ2h0KSBib2R5YCAqL1xuXHRleHBvcnQgY2xhc3MgRm9yT2ZTdGF0ZW1lbnQgZXh0ZW5kcyBTdGF0ZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKGxlZnQsIHJpZ2h0LCBib2R5KSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge1ZhcmlhYmxlRGVjbGFyYXRpb24gfCBFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5sZWZ0ID0gbGVmdFxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5yaWdodCA9IHJpZ2h0XG5cdFx0XHQvKiogQHR5cGUge1N0YXRlbWVudH0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKiogVGhlIGBkZWJ1Z2dlcmAga2V5d29yZC4gKi9cblx0ZXhwb3J0IGNsYXNzIERlYnVnZ2VyU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHsgfVxuXG4vLyBEZWNsYXJhdGlvbnNcblx0LyoqIEZ1bmN0aW9uRGVjbGFyYXRpb24gfCBGdW5jdGlvbkV4cHJlc3Npb24gfCBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbiAqL1xuXHRleHBvcnQgY2xhc3MgRnVuY3Rpb25BYnN0cmFjdCBleHRlbmRzIE5vZGUgeyB9XG5cblx0Y2xhc3MgRnVuY3Rpb25Ob25BcnJvdyBleHRlbmRzIEZ1bmN0aW9uQWJzdHJhY3Qge1xuXHRcdGNvbnN0cnVjdG9yKGlkLCBwYXJhbXMsIGJvZHksIGdlbmVyYXRvcikge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGdlbmVyYXRvciA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRnZW5lcmF0b3IgPSBmYWxzZVxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5pZCA9IGlkXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PFBhdHRlcm4+fSAqL1xuXHRcdFx0dGhpcy5wYXJhbXMgPSBwYXJhbXNcblx0XHRcdC8qKiBAdHlwZSB7QmxvY2tTdGF0ZW1lbnR9ICovXG5cdFx0XHR0aGlzLmJvZHkgPSBib2R5XG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLmdlbmVyYXRvciA9IGdlbmVyYXRvclxuXHRcdH1cblx0fVxuXG5cdC8vIFRPRE86IERlY2xhcmF0aW9uIHRvb1xuXHQvKioge0BsaW5rIEZ1bmN0aW9ufSBpbiBkZWNsYXJhdGlvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIEZ1bmN0aW9uRGVjbGFyYXRpb24gZXh0ZW5kcyBGdW5jdGlvbk5vbkFycm93IHsgfVxuXG4vLyBFeHByZXNzaW9uc1xuXHRleHBvcnQgY2xhc3MgTGl0ZXJhbCBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKHZhbHVlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge251bWJlcnxzdHJpbmd8Ym9vbGVhbnxudWxsfSAqL1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0fVxuXHR9XG5cblx0LyoqIFRoZSBgdGhpc2Aga2V5d29yZC4gKi9cblx0ZXhwb3J0IGNsYXNzIFRoaXNFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7IH1cblxuXHQvKiogYFsgZWxlbWVudHMgXWAgKi9cblx0ZXhwb3J0IGNsYXNzIEFycmF5RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKGVsZW1lbnRzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PD9FeHByZXNzaW9uPn0gKi9cblx0XHRcdHRoaXMuZWxlbWVudHMgPSBlbGVtZW50c1xuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgUHJvcGVydHl9LiAqL1xuXHRleHBvcnQgY29uc3QgUHJvcGVydHlLaW5kID0gbmV3IFNldChbJ2luaXQnLCAnZ2V0JywgJ3NldCddKVxuXHQvKipcblx0UGFydCBvZiBhbiBPYmplY3RFeHByZXNzaW9uLlxuXHRJZiBraW5kIGlzICdnZXQnIG9yICdzZXQnLCB0aGVuIHZhbHVlIHNob3VsZCBiZSBhIEZ1bmN0aW9uRXhwcmVzc2lvbi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFByb3BlcnR5IGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3Ioa2luZCwga2V5LCB2YWx1ZSwgbWV0aG9kKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0dmFsdWUgPSBrZXlcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChtZXRob2QgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0bWV0aG9kID0gZmFsc2Vcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7UHJvcGVydHlLaW5kfSAqL1xuXHRcdFx0dGhpcy5raW5kID0ga2luZFxuXHRcdFx0LyoqIEB0eXBlIHtMaXRlcmFsIHwgSWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMua2V5ID0ga2V5XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMubWV0aG9kID0gbWV0aG9kXG5cblx0XHRcdGlmICh0aGlzLmtpbmQgIT09ICdpbml0Jykge1xuXHRcdFx0XHRpZiAoISh0aGlzLnZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb25FeHByZXNzaW9uKSlcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldC9zZXQgUHJvcGVydHlcXCdzIHZhbHVlIG11c3QgYmUgYSBGdW5jdGlvbkV4cHJlc3Npb24uJylcblx0XHRcdFx0aWYgKHRoaXMudmFsdWUuaWQgIT09IG51bGwpXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0J2dldC9zZXQgUHJvcGVydHlcXCdzIHZhbHVlIG11c3Qgbm90IGhhdmUgaWQ7ICcgK1xuXHRcdFx0XHRcdFx0J3RoYXQgaXMgc3RvcmVkIGluIHRoZSBga2V5YCBvZiB0aGUgUHJvcGVydHkuJylcblx0XHRcdFx0aWYgKHRoaXMudmFsdWUuZ2VuZXJhdG9yKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignZ2V0L3NldCBjYW4gbm90IGJlIGEgZ2VuZXJhdG9yLicpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Z2V0IHNob3J0aGFuZCgpIHtcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlID09PSB0aGlzLmtleVxuXHRcdH1cblx0XHRnZXQgY29tcHV0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gISh0aGlzLmtleSBpbnN0YW5jZW9mIElkZW50aWZpZXIpXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFuIG9iamVjdCBsaXRlcmFsLiAqL1xuXHRleHBvcnQgY2xhc3MgT2JqZWN0RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8UHJvcGVydHk+fSAqL1xuXHRcdFx0dGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllc1xuXHRcdH1cblx0fVxuXG5cdC8vIFRPRE86IEV4cHJlc3Npb24gdG9vXG5cdC8qKiB7QGxpbmsgRnVuY3Rpb259IGluIGV4cHJlc3Npb24gcG9zaXRpb24uICovXG5cdGV4cG9ydCBjbGFzcyBGdW5jdGlvbkV4cHJlc3Npb24gZXh0ZW5kcyBGdW5jdGlvbk5vbkFycm93IHsgfVxuXG5cdC8qKiBMaWtlIEZ1bmN0aW9uRXhwcmVzc2lvbiBidXQgdXNlcyB0aGUgYHBhcmFtcyA9PiBib2R5YCBmb3JtLiAqL1xuXHQvLyBUT0RPOiBleHRlbmRzIEZ1bmN0aW9uQWJzdHJhY3QgdG9vXG5cdGV4cG9ydCBjbGFzcyBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKHBhcmFtcywgYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxQYXR0ZXJuPn0gKi9cblx0XHRcdHRoaXMucGFyYW1zID0gcGFyYW1zXG5cdFx0XHQvKiogQHR5cGUge0Jsb2NrU3RhdGVtZW50IHwgRXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKipcblx0YGV4cHJlc3Npb25zWzBdLCBleHByZXNzaW9uc1sxXSwgLi4uYFxuXHRFeHByZXNzaW9uIGNvbXBvc2VkIG9mIG90aGVyIGV4cHJlc3Npb25zLCBzZXBhcmF0ZWQgYnkgdGhlIGNvbW1hIG9wZXJhdG9yLlxuXHQqTm90KiBmb3IgcGFyYW1ldGVyIGxpc3RzLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgU2VxdWVuY2VFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoZXhwcmVzc2lvbnMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8RXhwcmVzc2lvbj59ICovXG5cdFx0XHR0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnNcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIFVuYXJ5RXhwcmVzc2lvbn0uICovXG5cdGV4cG9ydCBjb25zdCBVbmFyeU9wZXJhdG9yID0gbmV3IFNldChbJy0nLCAnKycsICchJywgJ34nLCAndHlwZW9mJywgJ3ZvaWQnLCAnZGVsZXRlJ10pXG5cdC8qKlxuXHRgb3BlcmF0b3IgYXJndW1lbnRgXG5cdENhbGxzIGEgdW5hcnkgb3BlcmF0b3IuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBVbmFyeUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciwgYXJndW1lbnQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VW5hcnlPcGVyYXRvcn0gKi9cblx0XHRcdHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvclxuXHRcdFx0LyoqIEB0eXBlIHtFeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudCA9IGFyZ3VtZW50XG5cdFx0fVxuXG5cdFx0LyoqIEFsd2F5cyB0cnVlLiBOZWVkZWQgZm9yIGNvbXBhcmliaWxpdHkgd2l0aCBlc3RyZWUuICovXG5cdFx0Z2V0IHByZWZpeCgpIHtcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHR9XG5cblx0LyoqIEFjY2VwdGVkIGtpbmRzIG9mIHtAbGluayBCaW5hcnlFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IEJpbmFyeU9wZXJhdG9yID0gbmV3IFNldChbXG5cdFx0Jz09JywgJyE9JywgJz09PScsICchPT0nLFxuXHRcdCc8JywgJzw9JywgJz4nLCAnPj0nLFxuXHRcdCc8PCcsICc+PicsICc+Pj4nLFxuXHRcdCcrJywgJy0nLCAnKicsICcvJywgJyUnLFxuXHRcdCd8JywgJ14nLCAnJicsICdpbicsXG5cdFx0J2luc3RhbmNlb2YnXSlcblx0LyoqXG5cdGBsZWZ0IG9wZXJhdG9yIHJpZ2h0YFxuXHRDYWxscyBhIGJpbmFyeSBvcGVyYXRvci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEJpbmFyeUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciwgbGVmdCwgcmlnaHQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QmluYXJ5T3BlcmF0b3J9ICovXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgQXNzaWdubWVudEV4cHJlc3Npb259LiAqL1xuXHRleHBvcnQgY29uc3QgQXNzaWdubWVudE9wZXJhdG9yID0gbmV3IFNldChbXG5cdFx0Jz0nLCAnKz0nLCAnLT0nLCAnKj0nLCAnLz0nLCAnJT0nLFxuXHRcdCc8PD0nLCAnPj49JywgJz4+Pj0nLFxuXHRcdCd8PScsICdePScsICcmPSdcblx0XSlcblx0LyoqXG5cdGBsZWZ0IG9wZXJhdG9yIHJpZ2h0YFxuXHRNdXRhdGVzIGFuIGV4aXN0aW5nIHZhcmlhYmxlLlxuXHREbyBub3QgY29uZnVzZSB3aXRoIFZhcmlhYmxlRGVjbGFyYXRpb24uXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBBc3NpZ25tZW50RXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9wZXJhdG9yLCBsZWZ0LCByaWdodCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBc3NpZ25tZW50T3BlcmF0b3J9ICovXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMubGVmdCA9IGxlZnRcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMucmlnaHQgPSByaWdodFxuXHRcdH1cblx0fVxuXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgVXBkYXRlRXhwcmVzc2lvbn0uICovXG5cdGV4cG9ydCBjb25zdCBVcGRhdGVPcGVyYXRvciA9IG5ldyBTZXQoWycrKycsICctLSddKVxuXHQvKipcblx0YCsrYXJndW1lbnRgIG9yIGBhcmd1bWVudCsrYFxuXHRJbmNyZW1lbnRzIG9yIGRlY3JlbWVudHMgYSBudW1iZXIuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBVcGRhdGVFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3Iob3BlcmF0b3IsIGFyZ3VtZW50LCBwcmVmaXgpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7VXBkYXRlT3BlcmF0b3J9ICovXG5cdFx0XHR0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3Jcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdFx0dGhpcy5wcmVmaXggPSBwcmVmaXhcblx0XHR9XG5cdH1cblxuXHQvKiogQWNjZXB0ZWQga2luZHMgb2Yge0BsaW5rIExvZ2ljYWxFeHByZXNzaW9ufS4gKi9cblx0ZXhwb3J0IGNvbnN0IExvZ2ljYWxPcGVyYXRvciA9IG5ldyBTZXQoWyd8fCcsICcmJiddKVxuXHQvKipcblx0YGxlZnQgb3BlcmF0b3IgcmlnaHRgXG5cdENhbGxzIGEgbGF6eSBsb2dpY2FsIG9wZXJhdG9yLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgTG9naWNhbEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihvcGVyYXRvciwgbGVmdCwgcmlnaHQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7TG9naWNhbE9wZXJhdG9yfSAqL1xuXHRcdFx0dGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmxlZnQgPSBsZWZ0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnJpZ2h0ID0gcmlnaHRcblx0XHR9XG5cdH1cblxuXHQvKiogYHRlc3QgPyBjb25zZXF1ZW50IDogYWx0ZXJuYXRlYCAqL1xuXHRleHBvcnQgY2xhc3MgQ29uZGl0aW9uYWxFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IodGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnRlc3QgPSB0ZXN0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmNvbnNlcXVlbnQgPSBjb25zZXF1ZW50XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFsdGVybmF0ZSA9IGFsdGVybmF0ZVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgbmV3IGNhbGxlZShhcmd1bWVudHMpYFxuXHRKdXN0IGxpa2Uge0BsaW5rIENhbGxFeHByZXNzaW9ufSBidXQgd2l0aCBgbmV3YCBpbiBmcm9udC5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIE5ld0V4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3RvcihjYWxsZWUsIF9hcmd1bWVudHMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuY2FsbGVlID0gY2FsbGVlXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PEV4cHJlc3Npb24+fSAqL1xuXHRcdFx0dGhpcy5hcmd1bWVudHMgPSBfYXJndW1lbnRzXG5cdFx0fVxuXHR9XG5cblx0LyoqIGBjYWxsZWUoYXJndW1lbnRzKWAgKi9cblx0ZXhwb3J0IGNsYXNzIENhbGxFeHByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbiB7XG5cdFx0Y29uc3RydWN0b3IoY2FsbGVlLCBfYXJndW1lbnRzKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmNhbGxlZSA9IGNhbGxlZVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxFeHByZXNzaW9uPn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnRzID0gX2FyZ3VtZW50c1xuXHRcdH1cblx0fVxuXHQvKiogYC4uLmFyZ3NgIGluIGEgQ2FsbEV4cHJlc3Npb24uICovXG5cdGV4cG9ydCBjbGFzcyBTcHJlYWRFbGVtZW50IGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRJZiBjb21wdXRlZCA9PT0gdHJ1ZSwgYG9iamVjdFtwcm9wZXJ0eV1gLlxuXHRFbHNlLCBgb2JqZWN0LnByb3BlcnR5YCAtLSBtZWFuaW5nIHByb3BlcnR5IHNob3VsZCBiZSBhbiBJZGVudGlmaWVyLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgTWVtYmVyRXhwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdGNvbnN0cnVjdG9yKG9iamVjdCwgcHJvcGVydHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMub2JqZWN0ID0gb2JqZWN0XG5cdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnByb3BlcnR5ID0gcHJvcGVydHlcblx0XHR9XG5cblx0XHQvKiogTmVlZGVkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggZXN0cmVlLiAqL1xuXHRcdGdldCBjb21wdXRlZCgpIHtcblx0XHRcdHJldHVybiAhKHRoaXMucHJvcGVydHkgaW5zdGFuY2VvZiBJZGVudGlmaWVyKVxuXHRcdH1cblx0fVxuXG5cdC8qKiBgeWllbGQgYXJndW1lbnRgIG9yIGB5aWVsZCogYXJndW1lbnRgICovXG5cdGV4cG9ydCBjbGFzcyBZaWVsZEV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRjb25zdHJ1Y3Rvcihhcmd1bWVudCwgZGVsZWdhdGUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLmFyZ3VtZW50ID0gYXJndW1lbnRcblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHRcdHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZVxuXG5cdFx0XHRpZiAodGhpcy5kZWxlZ2F0ZSAmJiB0aGlzLmFyZ3VtZW50ID09PSBudWxsKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgeWllbGQqIHdpdGhvdXQgYXJndW1lbnQuJylcblx0XHR9XG5cdH1cblxuXHQvLyBUZW1wbGF0ZXNcblx0XHQvKipcblx0XHRBIHRlbXBsYXRlIHdpdGggbm8gdGFnLlxuXHRcdEl0IGFsdGVybmF0ZXMgYmV0d2VlbiBxdWFzaXMgYW5kIGV4cHJlc3Npb25zLlxuXHRcdEl0IHNob3VsZCBiZWdpbiBhbmQgZW5kIHdpdGggcXVhc2lzLCB1c2luZyB7QGxpbmsgVGVtcGxhdGVFbGVtZW50LmVtcHR5fSBpZiBuZWNlc3NhcnkuXG5cdFx0VGhpcyBtZWFucyB0aGF0IGAkezF9JHsyfWAgaGFzIDMgZW1wdHkgcXVhc2lzIVxuXHRcdCovXG5cdFx0ZXhwb3J0IGNsYXNzIFRlbXBsYXRlTGl0ZXJhbCBleHRlbmRzIEV4cHJlc3Npb24ge1xuXHRcdFx0Y29uc3RydWN0b3IocXVhc2lzLCBleHByZXNzaW9ucykge1xuXHRcdFx0XHRzdXBlcigpXG5cdFx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8VGVtcGxhdGVFbGVtZW50Pn0gKi9cblx0XHRcdFx0dGhpcy5xdWFzaXMgPSBxdWFzaXNcblx0XHRcdFx0LyoqIEB0eXBlIHtBcnJheTxFeHByZXNzaW9uPn0gKi9cblx0XHRcdFx0dGhpcy5leHByZXNzaW9ucyA9IGV4cHJlc3Npb25zXG5cdFx0XHRcdGlmICh0aGlzLnF1YXNpcy5sZW5ndGggIT09IHRoaXMuZXhwcmVzc2lvbnMubGVuZ3RoICsgMSlcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHQnVGhlcmUgbXVzdCBiZSAxIG1vcmUgcXVhc2kgdGhhbiBleHByZXNzaW9ucy5cXG4nICtcblx0XHRcdFx0XHRcdCdNYXliZSB5b3UgbmVlZCB0byBhZGQgYW4gZW1wdHkgcXVhc2kgdG8gdGhlIGZyb250IG9yIGVuZC4nKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKiBQYXJ0IG9mIGEgVGVtcGxhdGVMaXRlcmFsLiAqL1xuXHRcdGV4cG9ydCBjbGFzcyBUZW1wbGF0ZUVsZW1lbnQgZXh0ZW5kcyBOb2RlIHtcblx0XHRcdC8qKlxuXHRcdFx0VGVtcGxhdGVFbGVtZW50IHdob3NlIHJhdyBzb3VyY2UgaXMgYHN0cmAuXG5cdFx0XHRAcGFyYW0ge3N0cmluZ30gc3RyXG5cdFx0XHQqL1xuXHRcdFx0c3RhdGljIGZvclJhd1N0cmluZyhzdHIpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUZW1wbGF0ZUVsZW1lbnQoZmFsc2UsIHtcblx0XHRcdFx0XHQvLyBUT0RPOiBBIHdheSB0byBjYWxjdWxhdGUgdGhpcz9cblx0XHRcdFx0XHRjb29rZWQ6IG51bGwsXG5cdFx0XHRcdFx0cmF3OiBzdHJcblx0XHRcdFx0fSlcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHRUZW1wbGF0ZUVsZW1lbnQgZXZhbHVhdGluZyB0byBgc3RyYC5cblx0XHRcdFVzZXMgZXNjYXBlIHNlcXVlbmNlcyBhcyBuZWNlc3NhcnkuXG5cdFx0XHRAcGFyYW0ge3N0cmluZ30gc3RyXG5cdFx0XHQqL1xuXHRcdFx0c3RhdGljIGZvclN0cmluZyhzdHIpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUZW1wbGF0ZUVsZW1lbnQoZmFsc2UsIHtcblx0XHRcdFx0XHRjb29rZWQ6IHN0cixcblx0XHRcdFx0XHRyYXc6IGVzY2FwZVN0cmluZ0ZvclRlbXBsYXRlKHN0cilcblx0XHRcdFx0fSlcblx0XHRcdH1cblxuXHRcdFx0LyoqIFRlbXBsYXRlRWxlbWVudCB3aXRoIGVtcHR5IHZhbHVlLiAqL1xuXHRcdFx0c3RhdGljIGdldCBlbXB0eSgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZm9yU3RyaW5nKCcnKVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdHJ1Y3Rvcih0YWlsLCB2YWx1ZSkge1xuXHRcdFx0XHRzdXBlcigpXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHRVc2UgdGhpcyB0byBtYXJrIHRoZSBsYXN0IFRlbXBsYXRlRWxlbWVudC5cblx0XHRcdFx0QHR5cGUge2Jvb2xlYW59XG5cdFx0XHRcdCovXG5cdFx0XHRcdHRoaXMudGFpbCA9IHRhaWxcblx0XHRcdFx0LyoqIEB0eXBlIHt7Y29va2VkOiBzdHJpbmcsIHJhdzogc3RyaW5nfX0gKi9cblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3Rcblx0XHRcdGVzY2FwZVN0cmluZ0ZvclRlbXBsYXRlID0gc3RyID0+XG5cdFx0XHRcdHN0ci5yZXBsYWNlKC9be1xcXFxgXFxuXFx0XFxiXFxmXFx2XFxyXFx1MjAyOFxcdTIwMjldL2csIGNoID0+IHRlbXBsYXRlRXNjYXBlc1tjaF0pLFxuXHRcdFx0dGVtcGxhdGVFc2NhcGVzID0ge1xuXHRcdFx0XHQvLyBOZWVkIHRvIG1ha2Ugc3VyZSBcIiR7XCIgaXMgZXNjYXBlZC5cblx0XHRcdFx0J3snOiAnXFxcXHsnLFxuXHRcdFx0XHQnYCc6ICdcXFxcYCcsXG5cdFx0XHRcdCdcXFxcJzogJ1xcXFxcXFxcJyxcblx0XHRcdFx0J1xcbic6ICdcXFxcbicsXG5cdFx0XHRcdCdcXHQnOiAnXFxcXHQnLFxuXHRcdFx0XHQnXFxiJzogJ1xcXFxiJyxcblx0XHRcdFx0J1xcZic6ICdcXFxcZicsXG5cdFx0XHRcdCdcXHYnOiAnXFxcXHYnLFxuXHRcdFx0XHQnXFxyJzogJ1xcXFxyJyxcblx0XHRcdFx0J1xcdTIwMjgnOiAnXFxcXHUyMDI4Jyxcblx0XHRcdFx0J1xcdTIwMjknOiAnXFxcXHUyMDI5J1xuXHRcdFx0fVxuXG5cdFx0LyoqIFRlbXBsYXRlTGl0ZXJhbCB3aXRoIGEgdGFnIGluIGZyb250LCBsaWtlYHRoaXNgLiAqL1xuXHRcdGV4cG9ydCBjbGFzcyBUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9uIHtcblx0XHRcdGNvbnN0cnVjdG9yKHRhZywgcXVhc2kpIHtcblx0XHRcdFx0c3VwZXIoKVxuXHRcdFx0XHQvKiogQHR5cGUge0V4cHJlc3Npb259ICovXG5cdFx0XHRcdHRoaXMudGFnID0gdGFnXG5cdFx0XHRcdC8qKiBAdHlwZSB7VGVtcGxhdGVMaXRlcmFsfSAqL1xuXHRcdFx0XHR0aGlzLnF1YXNpID0gcXVhc2lcblx0XHRcdH1cblx0XHR9XG5cbi8vIFBhdHRlcm5zXG5cdC8qKlxuXHRgeyBhLCBiOiBjIH0gPWBcblx0T2JqZWN0IGRlY29uc3RydWN0aW5nIHBhdHRlcm4uXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBPYmplY3RQYXR0ZXJuIGV4dGVuZHMgUGF0dGVybiB7XG5cdFx0Y29uc3RydWN0b3IocHJvcGVydGllcykge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxBc3NpZ25tZW50UHJvcGVydHk+fSAqL1xuXHRcdFx0dGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllc1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRKdXN0IGxpa2UgYSBQcm9wZXJ0eSwgYnV0IGtpbmQgaXMgYWx3YXlzIGBpbml0YC5cblx0QWx0aG91Z2ggdGVjaG5pY2FsbHkgaXRzIG93biB0eXBlLCBgXy50eXBlYCB3aWxsIGJlICdQcm9wZXJ0eScuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBBc3NpZ25tZW50UHJvcGVydHkgZXh0ZW5kcyBOb2RlIHtcblx0XHRjb25zdHJ1Y3RvcihrZXksIHZhbHVlKSB7XG5cdFx0XHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdFx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0dmFsdWUgPSBrZXlcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMua2V5ID0ga2V5XG5cdFx0XHQvKiogQHR5cGUge1BhdHRlcm59ICovXG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWVcblx0XHR9XG5cblx0XHRnZXQgdHlwZSgpIHsgcmV0dXJuICdQcm9wZXJ0eScgfVxuXHRcdGdldCBraW5kKCkgeyByZXR1cm4gJ2luaXQnIH1cblx0XHRnZXQgbWV0aG9kKCkgeyByZXR1cm4gZmFsc2UgfVxuXHRcdGdldCBzaG9ydGhhbmQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZSA9PT0gdGhpcy5rZXlcblx0XHR9XG5cdFx0Z2V0IGNvbXB1dGVkKCkge1xuXHRcdFx0cmV0dXJuICEodGhpcy5rZXkgaW5zdGFuY2VvZiBJZGVudGlmaWVyKVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRgWyBhLCBiIF0gPSAuLi5gLlxuXHRBcnJheSBkZWNvbnN0cnVjdGluZyBwYXR0ZXJuLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgQXJyYXlQYXR0ZXJuIGV4dGVuZHMgUGF0dGVybiB7XG5cdFx0Y29uc3RydWN0b3IoZWxlbWVudHMpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8P1BhdHRlcm4+fSAqL1xuXHRcdFx0dGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdENhbiBiZSB0aGUgbGFzdCBhcmd1bWVudCB0byBhIEZ1bmN0aW9uRXhwcmVzc2lvbi9GdW5jdGlvbkRlY2xhcmF0aW9uXG5cdG9yICBnbyBhdCB0aGUgZW5kIG9mIGFuIEFycmF5UGF0dGVybi5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIFJlc3RFbGVtZW50IGV4dGVuZHMgUGF0dGVybiB7XG5cdFx0Y29uc3RydWN0b3IoYXJndW1lbnQpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7UGF0dGVybn0gKi9cblx0XHRcdHRoaXMuYXJndW1lbnQgPSBhcmd1bWVudFxuXHRcdH1cblx0fVxuXG4vLyBDbGFzc2VzXG5cdC8qKiBBY2NlcHRlZCBraW5kcyBvZiB7QGxpbmsgTWV0aG9kRGVmaW5pdGlvbn0uICovXG5cdGV4cG9ydCBjb25zdCBNZXRob2REZWZpbml0aW9uS2luZCA9IG5ldyBTZXQoWydjb25zdHJ1Y3RvcicsICdtZXRob2QnLCAnZ2V0JywgJ3NldCddKVxuXHQvKiogUGFydCBvZiBhIHtAbGluayBDbGFzc0JvZHl9LiAqL1xuXHRleHBvcnQgY2xhc3MgTWV0aG9kRGVmaW5pdGlvbiBleHRlbmRzIE5vZGUge1xuXHRcdC8qKiBAcGFyYW0ge0Z1bmN0aW9uRXhwcmVzc2lvbn0gdmFsdWUgKi9cblx0XHRzdGF0aWMgY29uc3RydWN0b3IodmFsdWUpIHtcblx0XHRcdHJldHVybiBuZXcgTWV0aG9kRGVmaW5pdGlvbihuZXcgSWRlbnRpZmllcignY29uc3RydWN0b3InKSwgdmFsdWUsICdjb25zdHJ1Y3RvcicpXG5cdFx0fVxuXG5cdFx0Y29uc3RydWN0b3Ioa2V5LCB2YWx1ZSwga2luZCwgX3N0YXRpYywgY29tcHV0ZWQpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChfc3RhdGljID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdF9zdGF0aWMgPSBmYWxzZVxuXHRcdFx0aWYgKGNvbXB1dGVkID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGNvbXB1dGVkID0gZmFsc2Vcblx0XHRcdGlmIChraW5kID09PSAnY29uc3RydWN0b3InICYmICEoXG5cdFx0XHRcdGtleSBpbnN0YW5jZW9mIElkZW50aWZpZXIgICYmIGtleS5uYW1lID09PSAnY29uc3RydWN0b3InICYmICFfc3RhdGljICYmICFjb21wdXRlZCkpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHQnQ29uc3RydWN0b3IgbWV0aG9kIHNob3VsZCBjcmVhdGVkIHdpdGggYE1ldGhvZERlZmluaXRpb24uY29uc3RydWN0b3JgLicpXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXIgfCBMaXRlcmFsfSAqL1xuXHRcdFx0dGhpcy5rZXkgPSBrZXlcblx0XHRcdC8qKiBAdHlwZSB7RnVuY3Rpb25FeHByZXNzaW9ufSAqL1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlXG5cdFx0XHQvKiogQHR5cGUge01ldGhvZERlZmluaXRpb25LaW5kfSAqL1xuXHRcdFx0dGhpcy5raW5kID0ga2luZFxuXHRcdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdFx0dGhpcy5zdGF0aWMgPSBfc3RhdGljXG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0XHR0aGlzLmNvbXB1dGVkID0gY29tcHV0ZWRcblxuXHRcdFx0aWYgKHZhbHVlLmlkICE9PSBudWxsKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0J01ldGhvZERlZmluaXRpb24gdmFsdWUgc2hvdWxkIG5vdCBoYXZlIGlkOyB0aGF0IGlzIGhhbmRsZWQgYnkgYGtleWAuJylcblx0XHR9XG5cdH1cblxuXHQvKiogQ29udGVudHMgb2YgYSB7QGxpbmsgQ2xhc3N9LiAqL1xuXHRleHBvcnQgY2xhc3MgQ2xhc3NCb2R5IGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3IoYm9keSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtBcnJheTxNZXRob2REZWZpbml0aW9uPn0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuXHQvKioge0BsaW5rIENsYXNzRGVjbGFyYXRpb259IHwge0BsaW5rIENsYXNzRXhwcmVzc2lvbn0gKi9cblx0ZXhwb3J0IGNsYXNzIENsYXNzIGV4dGVuZHMgTm9kZSB7IH1cblxuXHQvLyBUT0RPOiBleHRlbmRzIERlY2xhcmF0aW9uIHRvb1xuXHQvKioge0BsaW5rIENsYXNzfSBpbiBkZWNsYXJhdGlvbiBwb3NpdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIENsYXNzRGVjbGFyYXRpb24gZXh0ZW5kcyBDbGFzcyB7XG5cdFx0Y29uc3RydWN0b3IoaWQsIHN1cGVyQ2xhc3MsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMuaWQgPSBpZFxuXHRcdFx0LyoqIEB0eXBlIHs/RXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuc3VwZXJDbGFzcyA9IHN1cGVyQ2xhc3Ncblx0XHRcdC8qKiBAdHlwZSB7Q2xhc3NCb2R5fSAqL1xuXHRcdFx0dGhpcy5ib2R5ID0gYm9keVxuXHRcdH1cblx0fVxuXG5cdC8qKiB7QGxpbmsgQ2xhc3N9IGluIGV4cHJlc3Npb24gcG9zaXRpb24uICovXG5cdGV4cG9ydCBjbGFzcyBDbGFzc0V4cHJlc3Npb24gZXh0ZW5kcyBDbGFzcyB7XG5cdFx0Y29uc3RydWN0b3IoaWQsIHN1cGVyQ2xhc3MsIGJvZHkpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7P0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmlkID0gaWRcblx0XHRcdC8qKiBAdHlwZSB7P0V4cHJlc3Npb259ICovXG5cdFx0XHR0aGlzLnN1cGVyQ2xhc3MgPSBzdXBlckNsYXNzXG5cdFx0XHQvKiogQHR5cGUge0NsYXNzQm9keX0gKi9cblx0XHRcdHRoaXMuYm9keSA9IGJvZHlcblx0XHR9XG5cdH1cblxuLy8gTW9kdWxlc1xuXHQvKiogQSBzcGVjaWZpZXIgaW4gYW4gaW1wb3J0IG9yIGV4cG9ydCBkZWNsYXJhdGlvbi4gKi9cblx0ZXhwb3J0IGNsYXNzIE1vZHVsZVNwZWNpZmllciBleHRlbmRzIE5vZGUgeyB9XG5cblx0LyoqXG5cdHtAbGluayBJbXBvcnRTcGVjaWZpZXJ9IHwge0BsaW5rIEltcG9ydERlZmF1bHRTcGVjaWZpZXJ9IHwge0BsaW5rIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllcn1cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydFNwZWNpZmllckFic3RyYWN0IGV4dGVuZHMgTm9kZSB7IH1cblxuXHQvKipcblx0YGltcG9ydCBzcGVjaWZpZXJzIGZyb20gc291cmNlYFxuXHRPbmx5IG9uZSBzcGVjaWZpZXIgbWF5IGJlIGEgSW1wb3J0RGVmYXVsdFNwZWNpZmllci5cblx0SWYgdGhlcmUgaXMgYW4gSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyLCBpdCBtdXN0IGJlIHRoZSBvbmx5IHNwZWNpZmllci5cblx0Ki9cblx0ZXhwb3J0IGNsYXNzIEltcG9ydERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cdFx0Y29uc3RydWN0b3Ioc3BlY2lmaWVycywgc291cmNlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0FycmF5PEltcG9ydFNwZWNpZmllckFic3RyYWN0Pn0gKi9cblx0XHRcdHRoaXMuc3BlY2lmaWVycyA9IHNwZWNpZmllcnNcblx0XHRcdC8qKiBAdHlwZSB7TGl0ZXJhbDxzdHJpbmc+fSAqL1xuXHRcdFx0dGhpcy5zb3VyY2UgPSBzb3VyY2Vcblx0XHR9XG5cdH1cblxuXHQvKipcblx0QSBub24tZGVmYXVsdCBpbXBvcnQuIFVzZWQgaW4gYW4gSW1wb3J0RGVjbGFyYXRpb24uXG5cdEZvciBgaW1wb3J0IHsgYSB9IGZyb20gXCJzb3VyY2VcImAsIGp1c3QgcGFzcyBvbmUgYXJndW1lbnQgYW5kIGxvY2FsIHdpbGwgPSBpbXBvcnRlZC5cblx0Rm9yIGBpbXBvcnQgeyBhIGFzIGIgfSBmcm9tIFwic291cmNlXCJgLCBtYWtlIGltcG9ydGVkIGBhYCBhbmQgbG9jYWwgYGJgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgSW1wb3J0U3BlY2lmaWVyIGV4dGVuZHMgTW9kdWxlU3BlY2lmaWVyIHtcblx0XHRjb25zdHJ1Y3RvcihpbXBvcnRlZCwgbG9jYWwpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3Ncblx0XHRcdGlmIChsb2NhbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRsb2NhbCA9IGltcG9ydGVkXG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0lkZW50aWZpZXJ9ICovXG5cdFx0XHR0aGlzLmltcG9ydGVkID0gaW1wb3J0ZWRcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubG9jYWwgPSBsb2NhbFxuXHRcdH1cblx0fVxuXG5cdC8qKiBUaGUgZGVmYXVsdCBleHBvcnQsIGFzIGluIGBpbXBvcnQgYSBmcm9tIFwic291cmNlXCJgLiAqL1xuXHRleHBvcnQgY2xhc3MgSW1wb3J0RGVmYXVsdFNwZWNpZmllciBleHRlbmRzIEltcG9ydFNwZWNpZmllckFic3RyYWN0IHtcblx0XHRjb25zdHJ1Y3Rvcihsb2NhbCkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5sb2NhbCA9IGxvY2FsXG5cdFx0fVxuXHR9XG5cblx0LyoqIE9iamVjdCBvZiBldmVyeSBleHBvcnQsIGFzIGluIGBpbXBvcnQgKiBhcyBhIGZyb20gXCJzb3VyY2VcImAuICovXG5cdGV4cG9ydCBjbGFzcyBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIgZXh0ZW5kcyBJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCB7XG5cdFx0Y29uc3RydWN0b3IobG9jYWwpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMubG9jYWwgPSBsb2NhbFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRBIG5vbi1kZWZhdWx0IGV4cG9ydC4gVXNlZCBpbiBhbiBFeHBvcnROYW1lZERlY2xhcmF0aW9uLlxuXHRGb3IgYGV4cG9ydCB7IGEgfSBmcm9tIFwic291cmNlXCJgLCBqdXN0IHBhc3Mgb25lIGFyZ3VtZW50IGxvY2FsIHdpbGwgPSBleHBvcnRlZC5cblx0Rm9yIGBleHBvcnQgeyBhIGFzIGIgfWAsIG1ha2UgZXhwb3J0ZWQgYGJgIGFuZCBsb2NhbCBgYWAuXG5cdCovXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnRTcGVjaWZpZXIgZXh0ZW5kcyBNb2R1bGVTcGVjaWZpZXIge1xuXHRcdGNvbnN0cnVjdG9yKGV4cG9ydGVkLCBsb2NhbCkge1xuXHRcdFx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRcdFx0aWYgKGxvY2FsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxvY2FsID0gZXhwb3J0ZWRcblx0XHRcdHN1cGVyKClcblx0XHRcdC8qKiBAdHlwZSB7SWRlbnRpZmllcn0gKi9cblx0XHRcdHRoaXMuZXhwb3J0ZWQgPSBleHBvcnRlZFxuXHRcdFx0LyoqIEB0eXBlIHtJZGVudGlmaWVyfSAqL1xuXHRcdFx0dGhpcy5sb2NhbCA9IGxvY2FsXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdEV4cG9ydHMgbXVsdGlwbGUgdmFsdWVzIGFzIGluIGBleHBvcnQgeyBhLCBiIGFzIGMgfWAuXG5cdElmIHNvdXJjZSAhPT0gbnVsbCxcblx0cmUtZXhwb3J0cyBmcm9tIHRoYXQgbW9kdWxlIGFzIGluIGBleHBvcnQgeyAuLi4gfSBmcm9tIFwic291cmNlXCJgLlxuXHQqL1xuXHRleHBvcnQgY2xhc3MgRXhwb3J0TmFtZWREZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGRlY2xhcmF0aW9uLCBzcGVjaWZpZXJzLCBzb3VyY2UpIHtcblx0XHRcdC8vIFRPRE86RVM2IE9wdGlvbmFsIGFyZ3VtZW50c1xuXHRcdFx0aWYgKHNwZWNpZmllcnMgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0c3BlY2lmaWVycyA9IFtdXG5cdFx0XHRpZiAoc291cmNlID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdHNvdXJjZSA9IG51bGxcblxuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHs/RGVjbGFyYXRpb259ICovXG5cdFx0XHR0aGlzLmRlY2xhcmF0aW9uID0gZGVjbGFyYXRpb25cblx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8RXhwb3J0U3BlY2lmaWVyPn0gKi9cblx0XHRcdHRoaXMuc3BlY2lmaWVycyA9IHNwZWNpZmllcnNcblx0XHRcdC8qKiBAdHlwZSB7P0xpdGVyYWw8c3RyaW5nPn0gKi9cblx0XHRcdHRoaXMuc291cmNlID0gc291cmNlXG5cblx0XHRcdGlmIChkZWNsYXJhdGlvbiAhPT0gbnVsbCAmJiAhKHNwZWNpZmllcnMubGVuZ3RoID09PSAwICYmIHNvdXJjZSA9PT0gbnVsbCkpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignRGVjbGFyYXRpb24gY2FuIG5vdCBiZSBjb21iaW5lZCB3aXRoIHNwZWNpZmllcnMvc291cmNlLicpXG5cdFx0fVxuXHR9XG5cblx0LyoqIGBleHBvcnQgZGVmYXVsdCBkZWNsYXJhdGlvbmAgKi9cblx0ZXhwb3J0IGNsYXNzIEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKGRlY2xhcmF0aW9uKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHQvKiogQHR5cGUge0RlY2xhcmF0aW9uIHwgRXhwcmVzc2lvbn0gKi9cblx0XHRcdHRoaXMuZGVjbGFyYXRpb24gPSBkZWNsYXJhdGlvblxuXHRcdH1cblx0fVxuXG5cdC8qKiBgZXhwb3J0ICogZnJvbSBzb3VyY2VgICovXG5cdGV4cG9ydCBjbGFzcyBFeHBvcnRBbGxEZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xuXHRcdGNvbnN0cnVjdG9yKHNvdXJjZSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0LyoqIEB0eXBlIHtMaXRlcmFsPHN0cmluZz59ICovXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZVxuXHRcdH1cblx0fVxuIl19