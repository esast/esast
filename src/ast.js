/** Base type of all ASTs. */
export class Node {
	/**
	Convert to JSON.
	@see https://github.com/estree/estree
	*/
	toJSON() {
		const obj = { }
		obj.type = this.type
		// Sort to make JSON rendering deterministic.
		Object.keys(this).sort().forEach(key => { obj[key] = this[key] })
		return obj
	}

	/**
	For compatibility with other AST representations,
	all Node instances have a 'type' property that is the name of that type.
	@see https://github.com/estree/estree
	*/
	get type() {
		return this.constructor.name
	}

	/** @override */
	toString() {
		return JSON.stringify(this)
	}
}

// Abstracts
	/** Line that declares new locals. */
	export class Declaration extends Node { }

	/** Blocks of code have lines that are Statements or Declarations. */
	export class Statement extends Node { }

	/**
	Code that has a value.
	To use one in a statement position, see ExpressionStatement.
	*/
	export class Expression extends Node { }

	/**
	Can go in a parameter list or on the left side of an assignment.
	*/
	export class Pattern extends Node { }

// A complete program source tree.
export class Program extends Node {
	constructor(body) {
		super()
		/** @type {Array<Statement>} */
		this.body = body
	}
}

// Variables
	/**
	A JavaScript identifier.

	It is assumed that you have called `mangleIdentifier` as appropriate.
	See also {@link identifier}.
	*/
	export class Identifier extends Expression {
		constructor(name) {
			super()
			/** @type {String} */
			this.name = name
		}
	}

	/** Single declaration within a {@link VariableDeclaration}. */
	export class VariableDeclarator extends Node {
		constructor(id, init) {
			// TODO:ES6 Optional args
			if (init=== undefined)
				init = null
			super()
			/** @type {Pattern} */
			this.id = id
			/** @type {?Expression} */
			this.init = init
		}
	}

	/** Accepted kinds of {@link VariableDeclaration}. */
	export const VariableDeclarationKind = new Set(['const', 'let', 'var'])
	/**
	Declares and optionally initializes many variables.
	Must be at least one declaration.
	*/
	export class VariableDeclaration extends Declaration {
		constructor(kind, declarations) {
			super()
			/** @type {VariableDeclarationKind} */
			this.kind = kind
			/** @type {Array<VariableDeclarator>} */
			this.declarations = declarations
			if (this.declarations.length === 0)
				throw new Error('VariableDeclaration must have at least 1 declaration.')
		}
	}


// Statements
	/**
	An empty statement, i.e., a solitary semicolon.
	Not useful for code generation, but some parsers will return these.
	*/
	export class EmptyStatement extends Statement { }

	/** A block statement, i.e., a sequence of statements surrounded by braces. */
	export class BlockStatement extends Statement {
		constructor(body) {
			super()
			/** @type {Array<Statement>} */
			this.body = body
		}
	}

	/**
	An expression statement, i.e., a statement consisting of a single expression.
	See `esast.util toStatement toStatements`.
	*/
	export class ExpressionStatement extends Statement {
		constructor(expression) {
			super()
			/** @type {Expression} */
			this.expression = expression
		}
	}

	/** An if (or if ... else) statement. */
	export class IfStatement extends Statement {
		constructor(test, consequent, alternate) {
			// TODO:ES6 Optional arguments
			if (alternate === undefined)
				alternate = null
			super()
			/** @type {Expression} */
			this.test = test
			/** @type {Statement} */
			this.consequent = consequent
			/** @type {?Statement} */
			this.alternate = alternate
		}
	}

	/** A statement prefixed by a label. */
	export class LabeledStatement extends Statement {
		constructor(label, body) {
			super()
			/** @type {Identifier} */
			this.label = label
			/** @type {Statement} */
			this.body = body
		}
	}

	export class BreakStatement extends Statement {
		/** The `break` keyword. */
		constructor(label) {
			// TODO:ES6 Optional args
			if (label === undefined)
				label = null
			super()
			/** @type {?Identifier} */
			this.label = label
		}
	}

	/** The `continue` keyword. */
	export class ContinueStatement extends Statement {
		constructor(label) {
			// TODO:ES6 Optional args
			if (label === undefined)
				label = null
			super()
			/** @type {?Identifier} */
			this.label = label
		}
	}

	/**
	`switch (discriminant) { cases }`
	Only the last entry of `cases` is allowed to be `default`.
	*/
	export class SwitchStatement extends Statement {
		constructor(discriminant, cases) {
			super()
			/** @type {Expression} */
			this.discriminant = discriminant
			/** @type {Array<SwitchCase>} */
			this.cases = cases
		}
	}
	/**
	A single `case` within a SwitchStatement.
	If `test` is `null`, this is the `default` case.
	*/
	export class SwitchCase extends Statement {
		constructor(test, consequent) {
			// TODO:ES6 Optional args
			if (test === undefined)
				test = null
			super()
			/** @type {?Expression} */
			this.test = test
			/** @type {Array<Statement> */
			this.consequent = consequent
		}
	}

	/** The `return` keyword, optionally followed by an Expression to return. */
	export class ReturnStatement extends Statement {
		constructor(argument) {
			// TODO:ES6 Optional args
			if (argument === undefined)
				argument = null
			super()
			/** @type {?Expression} */
			this.argument = argument
		}
	}

	/**
	The `throw` keyword, and something to throw.
	See `esast.util throwError`.
	*/
	export class ThrowStatement extends Statement {
		constructor(argument) {
			super()
			/** @type {Expression} */
			this.argument = argument
		}
	}

	/**
	`try { block } catch (handler.param) { handler.body } finally { finalizer }`
	At least one of `handler` or `finalizer` must be non-null.
	*/
	export class TryStatement extends Statement {
		constructor(block, handler, finalizer) {
			// TODO:ES6 Optional args
			if (handler === undefined)
				handler = null
			if (finalizer === undefined)
				finalizer = null
			super()
			/** @type {BlockStatement} */
			this.block = block
			/** @type {?CatchClause} */
			this.handler = handler
			/** @type {?BlockStatement} */
			this.finalizer = finalizer
		}
	}
	/** Must be *part* of a {@link TryStatement} -- does *not* follow it. */
	export class CatchClause extends Node {
		constructor(param, body) {
			super()
			/** @type {Pattern} */
			this.param = param
			/** @type {BlockStatement} */
			this.body = body
		}
	}

	/** `while (test) body` */
	export class WhileStatement extends Statement {
		constructor(test, body) {
			super()
			/** @type {Expression} */
			this.test = test
			/** @type {Statement} */
			this.body = body
		}
	}

	/** `do body while (test)` */
	export class DoWhileStatement extends Statement {
		constructor(body, test) {
			super()
			/** @type {Statement} */
			this.body = body
			/** @type {Expression} */
			this.test = test
		}
	}

	/**
	`for (init; test; update) body`
	Not to be confused with ForInStatement or ForOfStatement.
	*/
	export class ForStatement extends Statement {
		constructor(init, test, update, body) {
			super()
			/** @type {?(VariableDeclaration | Expression)} */
			this.init = init
			/** @type {?Expression} */
			this.test = test
			/** @type {?Expression} */
			this.update = update
			/** @type {Statement} */
			this.body = body
		}
	}

	/** `for (left in right) body` */
	export class ForInStatement extends Statement {
		constructor(left, right, body) {
			super()
			/** @type {VariableDeclaration | Expression} */
			this.left = left
			/** @type {Expression} */
			this.right = right
			/** @type {Statement} */
			this.body = body
		}
	}

	/** `for (left of right) body` */
	export class ForOfStatement extends Statement {
		constructor(left, right, body) {
			super()
			/** @type {VariableDeclaration | Expression} */
			this.left = left
			/** @type {Expression} */
			this.right = right
			/** @type {Statement} */
			this.body = body
		}
	}

	/** The `debugger` keyword. */
	export class DebuggerStatement extends Statement { }

// Declarations
	/** FunctionDeclaration | FunctionExpression | ArrowFunctionExpression */
	export class FunctionAbstract extends Node { }

	class FunctionNonArrow extends FunctionAbstract {
		constructor(id, params, body, generator) {
			// TODO:ES6 Optional args
			if (generator === undefined)
				generator = false
			super()
			/** @type {Identifier} */
			this.id = id
			/** @type {Array<Pattern>} */
			this.params = params
			/** @type {BlockStatement} */
			this.body = body
			/** @type {boolean} */
			this.generator = generator
		}
	}

	// TODO: Declaration too
	/** {@link Function} in declaration position. */
	export class FunctionDeclaration extends FunctionNonArrow { }

// Expressions
	export class Literal extends Expression {
		constructor(value) {
			super()
			/** @type {number|string|boolean|null} */
			this.value = value
		}
	}

	/** The `this` keyword. */
	export class ThisExpression extends Expression { }

	/** `[ elements ]` */
	export class ArrayExpression extends Expression {
		constructor(elements) {
			super()
			/** @type {Array<?Expression>} */
			this.elements = elements
		}
	}

	/** Accepted kinds of {@link Property}. */
	export const PropertyKind = new Set(['init', 'get', 'set'])
	/**
	Part of an ObjectExpression.
	If kind is 'get' or 'set', then value should be a FunctionExpression.
	*/
	export class Property extends Node {
		constructor(kind, key, value, method) {
			// TODO:ES6 Optional args
			if (value === undefined)
				value = key
			// TODO:ES6 Optional args
			if (method === undefined)
				method = false
			super()
			/** @type {PropertyKind} */
			this.kind = kind
			/** @type {Literal | Identifier} */
			this.key = key
			/** @type {Expression} */
			this.value = value
			/** @type {boolean} */
			this.method = method

			if (this.kind !== 'init') {
				if (!(this.value instanceof FunctionExpression))
					throw new Error('get/set Property\'s value must be a FunctionExpression.')
				if (this.value.id !== null)
					throw new Error(
						'get/set Property\'s value must not have id; ' +
						'that is stored in the `key` of the Property.')
				if (this.value.generator)
					throw new Error('get/set can not be a generator.')
			}
		}

		get shorthand() {
			return this.value === this.key
		}
		get computed() {
			return !(this.key instanceof Identifier)
		}
	}

	/** An object literal. */
	export class ObjectExpression extends Expression {
		constructor(properties) {
			super()
			/** @type {Array<Property>} */
			this.properties = properties
		}
	}

	// TODO: Expression too
	/** {@link Function} in expression position. */
	export class FunctionExpression extends FunctionNonArrow { }

	/** Like FunctionExpression but uses the `params => body` form. */
	// TODO: extends FunctionAbstract too
	export class ArrowFunctionExpression extends Expression {
		constructor(params, body) {
			super()
			/** @type {Array<Pattern>} */
			this.params = params
			/** @type {BlockStatement | Expression} */
			this.body = body
		}
	}

	/**
	`expressions[0], expressions[1], ...`
	Expression composed of other expressions, separated by the comma operator.
	*Not* for parameter lists.
	*/
	export class SequenceExpression extends Expression {
		constructor(expressions) {
			super()
			/** @type {Array<Expression>} */
			this.expressions = expressions
		}
	}

	/** Accepted kinds of {@link UnaryExpression}. */
	export const UnaryOperator = new Set(['-', '+', '!', '~', 'typeof', 'void', 'delete'])
	/**
	`operator argument`
	Calls a unary operator.
	*/
	export class UnaryExpression extends Expression {
		constructor(operator, argument) {
			super()
			/** @type {UnaryOperator} */
			this.operator = operator
			/** @type {Expression} */
			this.argument = argument
		}

		/** Always true. Needed for comparibility with estree. */
		get prefix() {
			return true
		}
	}

	/** Accepted kinds of {@link BinaryExpression}. */
	export const BinaryOperator = new Set([
		'==', '!=', '===', '!==',
		'<', '<=', '>', '>=',
		'<<', '>>', '>>>',
		'+', '-', '*', '/', '%',
		'|', '^', '&', 'in',
		'instanceof'])
	/**
	`left operator right`
	Calls a binary operator.
	*/
	export class BinaryExpression extends Expression {
		constructor(operator, left, right) {
			super()
			/** @type {BinaryOperator} */
			this.operator = operator
			/** @type {Expression} */
			this.left = left
			/** @type {Expression} */
			this.right = right
		}
	}

	/** Accepted kinds of {@link AssignmentExpression}. */
	export const AssignmentOperator = new Set([
		'=', '+=', '-=', '*=', '/=', '%=',
		'<<=', '>>=', '>>>=',
		'|=', '^=', '&='
	])
	/**
	`left operator right`
	Mutates an existing variable.
	Do not confuse with VariableDeclaration.
	*/
	export class AssignmentExpression extends Expression {
		constructor(operator, left, right) {
			super()
			/** @type {AssignmentOperator} */
			this.operator = operator
			/** @type {Pattern} */
			this.left = left
			/** @type {Expression} */
			this.right = right
		}
	}

	/** Accepted kinds of {@link UpdateExpression}. */
	export const UpdateOperator = new Set(['++', '--'])
	/**
	`++argument` or `argument++`
	Increments or decrements a number.
	*/
	export class UpdateExpression extends Expression {
		constructor(operator, argument, prefix) {
			super()
			/** @type {UpdateOperator} */
			this.operator = operator
			/** @type {Expression} */
			this.argument = argument
			/** @type {boolean} */
			this.prefix = prefix
		}
	}

	/** Accepted kinds of {@link LogicalExpression}. */
	export const LogicalOperator = new Set(['||', '&&'])
	/**
	`left operator right`
	Calls a lazy logical operator.
	*/
	export class LogicalExpression extends Expression {
		constructor(operator, left, right) {
			super()
			/** @type {LogicalOperator} */
			this.operator = operator
			/** @type {Expression} */
			this.left = left
			/** @type {Expression} */
			this.right = right
		}
	}

	/** `test ? consequent : alternate` */
	export class ConditionalExpression extends Expression {
		constructor(test, consequent, alternate) {
			super()
			/** @type {Expression} */
			this.test = test
			/** @type {Expression} */
			this.consequent = consequent
			/** @type {Expression} */
			this.alternate = alternate
		}
	}

	/**
	`new callee(arguments)`
	Just like {@link CallExpression} but with `new` in front.
	*/
	export class NewExpression extends Expression {
		constructor(callee, _arguments) {
			super()
			/** @type {Expression} */
			this.callee = callee
			/** @type {Array<Expression>} */
			this.arguments = _arguments
		}
	}

	/** `callee(arguments)` */
	export class CallExpression extends Expression {
		constructor(callee, _arguments) {
			super()
			/** @type {Expression} */
			this.callee = callee
			/** @type {Array<Expression>} */
			this.arguments = _arguments
		}
	}
	/** `...args` in a CallExpression. */
	export class SpreadElement extends Node {
		constructor(argument) {
			super()
			/** @type {Expression} */
			this.argument = argument
		}
	}

	/**
	If computed === true, `object[property]`.
	Else, `object.property` -- meaning property should be an Identifier.
	*/
	export class MemberExpression extends Expression {
		constructor(object, property) {
			super()
			/** @type {Expression} */
			this.object = object
			/** @type {Expression} */
			this.property = property
		}

		/** Needed for compatibility with estree. */
		get computed() {
			return !(this.property instanceof Identifier)
		}
	}

	/** `yield argument` or `yield* argument` */
	export class YieldExpression extends Expression {
		constructor(argument, delegate) {
			super()
			/** @type {?Expression} */
			this.argument = argument
			/** @type {boolean} */
			this.delegate = delegate

			if (this.delegate && this.argument === null)
				throw new Error('Can not yield* without argument.')
		}
	}

	// Templates
		/**
		A template with no tag.
		It alternates between quasis and expressions.
		It should begin and end with quasis, using {@link TemplateElement.empty} if necessary.
		This means that `${1}${2}` has 3 empty quasis!
		*/
		export class TemplateLiteral extends Expression {
			constructor(quasis, expressions) {
				super()
				/** @type {Array<TemplateElement>} */
				this.quasis = quasis
				/** @type {Array<Expression>} */
				this.expressions = expressions
				if (this.quasis.length !== this.expressions.length + 1)
					throw new Error(
						'There must be 1 more quasi than expressions.\n' +
						'Maybe you need to add an empty quasi to the front or end.')
			}
		}

		/** Part of a TemplateLiteral. */
		export class TemplateElement extends Node {
			/**
			TemplateElement whose raw source is `str`.
			@param {string} str
			*/
			static forRawString(str) {
				return new TemplateElement(false, {
					// TODO: A way to calculate this?
					cooked: null,
					raw: str
				})
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
				})
			}

			/** TemplateElement with empty value. */
			static get empty() {
				return this.forString('')
			}

			constructor(tail, value) {
				super()
				/**
				Use this to mark the last TemplateElement.
				@type {boolean}
				*/
				this.tail = tail
				/** @type {{cooked: string, raw: string}} */
				this.value = value
			}
		}

		const
			escapeStringForTemplate = str =>
				str.replace(/[{\\`\n\t\b\f\v\r\u2028\u2029]/g, ch => templateEscapes[ch]),
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
			}

		/** TemplateLiteral with a tag in front, like`this`. */
		export class TaggedTemplateExpression extends Expression {
			constructor(tag, quasi) {
				super()
				/** @type {Expression} */
				this.tag = tag
				/** @type {TemplateLiteral} */
				this.quasi = quasi
			}
		}

// Patterns
	/**
	`{ a, b: c } =`
	Object deconstructing pattern.
	*/
	export class ObjectPattern extends Pattern {
		constructor(properties) {
			super()
			/** @type {Array<AssignmentProperty>} */
			this.properties = properties
		}
	}

	/**
	Just like a Property, but kind is always `init`.
	Although technically its own type, `_.type` will be 'Property'.
	*/
	export class AssignmentProperty extends Node {
		constructor(key, value) {
			// TODO:ES6 Optional args
			if (value === undefined)
				value = key
			super()
			/** @type {Identifier} */
			this.key = key
			/** @type {Pattern} */
			this.value = value
		}

		get type() { return 'Property' }
		get kind() { return 'init' }
		get method() { return false }
		get shorthand() {
			return this.value === this.key
		}
		get computed() {
			return !(this.key instanceof Identifier)
		}
	}

	/**
	`[ a, b ] = ...`.
	Array deconstructing pattern.
	*/
	export class ArrayPattern extends Pattern {
		constructor(elements) {
			super()
			/** @type {Array<?Pattern>} */
			this.elements = elements
		}
	}

	/**
	Can be the last argument to a FunctionExpression/FunctionDeclaration
	or  go at the end of an ArrayPattern.
	*/
	export class RestElement extends Pattern {
		constructor(argument) {
			super()
			/** @type {Pattern} */
			this.argument = argument
		}
	}

// Classes
	/** Accepted kinds of {@link MethodDefinition}. */
	export const MethodDefinitionKind = new Set(['constructor', 'method', 'get', 'set'])
	/** Part of a {@link ClassBody}. */
	export class MethodDefinition extends Node {
		/** @param {FunctionExpression} value */
		static constructor(value) {
			return new MethodDefinition(new Identifier('constructor'), value, 'constructor')
		}

		constructor(key, value, kind, _static, computed) {
			// TODO:ES6 Optional args
			if (_static === undefined)
				_static = false
			if (computed === undefined)
				computed = false
			if (kind === 'constructor' && !(
				key instanceof Identifier  && key.name === 'constructor' && !_static && !computed))
				throw new Error(
					'Constructor method should created with `MethodDefinition.constructor`.')
			super()
			/** @type {Identifier | Literal} */
			this.key = key
			/** @type {FunctionExpression} */
			this.value = value
			/** @type {MethodDefinitionKind} */
			this.kind = kind
			/** @type {boolean} */
			this.static = _static
			/** @type {boolean} */
			this.computed = computed

			if (value.id !== null)
				throw new Error(
					'MethodDefinition value should not have id; that is handled by `key`.')
		}
	}

	/** Contents of a {@link Class}. */
	export class ClassBody extends Node {
		constructor(body) {
			super()
			/** @type {Array<MethodDefinition>} */
			this.body = body
		}
	}

	/** {@link ClassDeclaration} | {@link ClassExpression} */
	export class Class extends Node { }

	// TODO: extends Declaration too
	/** {@link Class} in declaration position. */
	export class ClassDeclaration extends Class {
		constructor(id, superClass, body) {
			super()
			/** @type {Identifier} */
			this.id = id
			/** @type {?Expression} */
			this.superClass = superClass
			/** @type {ClassBody} */
			this.body = body
		}
	}

	/** {@link Class} in expression position. */
	export class ClassExpression extends Class {
		constructor(id, superClass, body) {
			super()
			/** @type {?Identifier} */
			this.id = id
			/** @type {?Expression} */
			this.superClass = superClass
			/** @type {ClassBody} */
			this.body = body
		}
	}

// Modules
	/** A specifier in an import or export declaration. */
	export class ModuleSpecifier extends Node { }

	/**
	{@link ImportSpecifier} | {@link ImportDefaultSpecifier} | {@link ImportNamespaceSpecifier}
	*/
	export class ImportSpecifierAbstract extends Node { }

	/**
	`import specifiers from source`
	Only one specifier may be a ImportDefaultSpecifier.
	If there is an ImportNamespaceSpecifier, it must be the only specifier.
	*/
	export class ImportDeclaration extends Node {
		constructor(specifiers, source) {
			super()
			/** @type {Array<ImportSpecifierAbstract>} */
			this.specifiers = specifiers
			/** @type {Literal<string>} */
			this.source = source
		}
	}

	/**
	A non-default import. Used in an ImportDeclaration.
	For `import { a } from "source"`, just pass one argument and local will = imported.
	For `import { a as b } from "source"`, make imported `a` and local `b`.
	*/
	export class ImportSpecifier extends ModuleSpecifier {
		constructor(imported, local) {
			// TODO:ES6 Optional args
			if (local === undefined)
				local = imported
			super()
			/** @type {Identifier} */
			this.imported = imported
			/** @type {Identifier} */
			this.local = local
		}
	}

	/** The default export, as in `import a from "source"`. */
	export class ImportDefaultSpecifier extends ImportSpecifierAbstract {
		constructor(local) {
			super()
			/** @type {Identifier} */
			this.local = local
		}
	}

	/** Object of every export, as in `import * as a from "source"`. */
	export class ImportNamespaceSpecifier extends ImportSpecifierAbstract {
		constructor(local) {
			super()
			/** @type {Identifier} */
			this.local = local
		}
	}

	/**
	A non-default export. Used in an ExportNamedDeclaration.
	For `export { a } from "source"`, just pass one argument local will = exported.
	For `export { a as b }`, make exported `b` and local `a`.
	*/
	export class ExportSpecifier extends ModuleSpecifier {
		constructor(exported, local) {
			// TODO:ES6 Optional args
			if (local === undefined)
				local = exported
			super()
			/** @type {Identifier} */
			this.exported = exported
			/** @type {Identifier} */
			this.local = local
		}
	}

	/**
	Exports multiple values as in `export { a, b as c }`.
	If source !== null,
	re-exports from that module as in `export { ... } from "source"`.
	*/
	export class ExportNamedDeclaration extends Node {
		constructor(declaration, specifiers, source) {
			// TODO:ES6 Optional arguments
			if (specifiers === undefined)
				specifiers = []
			if (source === undefined)
				source = null

			super()
			/** @type {?Declaration} */
			this.declaration = declaration
			/** @type {Array<ExportSpecifier>} */
			this.specifiers = specifiers
			/** @type {?Literal<string>} */
			this.source = source

			if (declaration !== null && !(specifiers.length === 0 && source === null))
				throw new Error('Declaration can not be combined with specifiers/source.')
		}
	}

	/** `export default declaration` */
	export class ExportDefaultDeclaration extends Node {
		constructor(declaration) {
			super()
			/** @type {Declaration | Expression} */
			this.declaration = declaration
		}
	}

	/** `export * from source` */
	export class ExportAllDeclaration extends Node {
		constructor(source) {
			super()
			/** @type {Literal<string>} */
			this.source = source
		}
	}
