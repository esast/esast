import { assert } from './private/util'

// Base type of all Asts.
export class Node {
	toJSON() {
		const obj = { }
		obj.type = this.type
		// Sort to make JSON rendering deterministic.
		Object.keys(this).sort().forEach(key => { obj[key] = this[key] })
		return obj
	}

	get type() {
		return this.constructor.name
	}

	toString() {
		return JSON.stringify(this)
	}
}

// Abstracts
	export class Declaration extends Node { }

	// Blocks of code have lines that are Statements or Declarations.
	export class Statement extends Node { }

	// Code that has a value. To use one in a statement position, see ExpressionStatement.
	export class Expression extends Node { }

	// Can go in a parameter list or on the left side of an assignment.
	export class Pattern extends Node { }

// A complete program source tree.
export class Program extends Node {
	constructor(body /* Array[Statement] */) {
		super()
		this.body = body
	}
}

// Variables
	/*
	A JavaScript identifier.
	It is assumed that you have called `mangleIdentifier` as appropriate.
	Also look at `esast.util idCached`,
	which mangles and avoids constructing the same identifier twice.
	*/
	export class Identifier extends Expression {
		constructor(name /* String */) {
			super()
			this.name = name
		}
	}

	export class VariableDeclarator extends Node {
		constructor(id /* Pattern */, init /* Opt[Expression] */) {
			// TODO:ES6 Optional args
			if (init=== undefined)
				init = null
			super()
			this.id = id
			this.init = init
		}
	}

	export const VariableDeclarationKind = new Set([ 'const', 'let', 'var' ])
	/*
	Declares and optionally initializes many variables.
	Must be at least one declaration.
	*/
	export class VariableDeclaration extends Declaration {
		constructor(
			kind, // VariableDeclarationKind
			declarations) { // Array[VariableDeclarator]
			super()
			this.kind = kind
			this.declarations = declarations
			assert(this.declarations.length >= 1)
		}
	}


// Statements
	/*
	An empty statement, i.e., a solitary semicolon.
	Not useful for code generation, but some parsers will return these.
	*/
	export class EmptyStatement extends Statement { }

	// A block statement, i.e., a sequence of statements surrounded by braces.
	export class BlockStatement extends Statement {
		constructor(body /* Array[Statement */) {
			super()
			this.body = body
		}
	}

	/*
	An expression statement, i.e., a statement consisting of a single expression.
	See `esast.util toStatement toStatements`.
	*/
	export class ExpressionStatement extends Statement {
		constructor(expression /* Expression */) {
			super()
			this.expression = expression
		}
	}

	// An if (or if ... else) statement.
	export class IfStatement extends Statement {
		constructor(
			test, // Expression
			consequent, // Statement
			alternate) { // Opt[Statement]
			// TODO:ES6 Optional arguments
			if (alternate === undefined)
				alternate = null
			super()
			this.test = test
			this.consequent = consequent
			this.alternate = alternate
		}
	}

	// A statement prefixed by a label.
	export class LabeledStatement extends Statement {
		constructor(label /* Identifier */, body /* Statement */) {
			super()
			this.label = label
			this.body = body
		}
	}

	export class BreakStatement extends Statement {
		// The `break` keyword.
		constructor(label /* Opt[Identifier] */) {
			// TODO:ES6 Optional args
			if (label === undefined)
				label = null
			super()
			this.label = label
		}
	}

	// The `continue` keyword.
	export class ContinueStatement extends Statement {
		constructor(label /* Opt[Identifier] */) {
			// TODO:ES6 Optional args
			if (label === undefined)
				label = null
			super()
			this.label = label
		}
	}

	/*
	switch (discriminant) { cases }
	Only the last entry of `cases` is allowed to be `default`.
	*/
	export class SwitchStatement extends Statement {
		constructor(discriminant /* Expression */, cases /* Array[SwitchCase] */) {
			super()
			this.discriminant = discriminant
			this.cases = cases
		}
	}
	/*
	A single `case` within a SwitchStatement.
	If `test` is `null`, this is the `default` case.
	*/
	export class SwitchCase extends Statement {
		constructor(test /* Opt[Expression] */, consequent /* Array[Statement] */) {
			// TODO:ES6 Optional args
			if (test === undefined)
				test = null
			super()
			this.test = test
			this.consequent = consequent
		}
	}

	// The `return` keyword, optionally followed by an Expression to return.
	export class ReturnStatement extends Statement {
		constructor(argument /* Opt[Expression] */) {
			// TODO:ES6 Optional args
			if (argument === undefined)
				argument = null
			super()
			this.argument = argument
		}
	}

	/*
	The `throw` keyword, and something to throw.
	See `esast.util throwError`.
	*/
	export class ThrowStatement extends Statement {
		constructor(argument /* Expression */) {
			super()
			this.argument = argument
		}
	}

	// `try { block } catch (handler.param) { handler.body } finally { finalizer }`
	// At least one of `handler` or `finalizer` must be non-null.
	export class TryStatement extends Statement {
		constructor(
			block /* BlockStatement */,
			handler /* Opt[CatchClause] */,
			finalizer /* Opt[BlockStatement] */) {
			// TODO:ES6 Optional args
			if (handler === undefined)
				handler = null
			if (finalizer === undefined)
				finalizer = null
			super()
			this.block = block
			this.handler = handler
			this.finalizer = finalizer
		}
	}
	// Must be *part* of a TryStatement -- does *not* follow it.
	export class CatchClause extends Node {
		constructor(param /* Pattern */, body /* BlockStatement */) {
			super()
			this.param = param
			this.body = body
		}
	}

	// `while (test) body`
	export class WhileStatement extends Statement {
		constructor(test /* Expression */, body /* Statement */) {
			super()
			this.test = test
			this.body = body
		}
	}

	// `do body while (test)`.
	export class DoWhileStatement extends Statement {
		constructor(body /* Statement */, test /* Expression */) {
			super()
			this.body = body
			this.test = test
		}
	}

	/*
	`for (init; test; update) body`.
	Not to be confused with ForInStatement or ForOfStatement.
	*/
	export class ForStatement extends Statement {
		constructor(
			init, // Opt[Union[VariableDeclaration Expression]]
			test, // Opt[Expression]
			update, // Opt[Expression]
			body) { // Statement
			super()
			this.init = init
			this.test = test
			this.update = update
			this.body = body
		}
	}

	// `for (left in right) body`.
	export class ForInStatement extends Statement {
		constructor(
			left, // Union[VariableDeclaration Expression]
			right, // Expression
			body) { // Statement
			super()
			this.left = left
			this.right = right
			this.body = body
		}
	}

	// `for (left of right) body`.
	export class ForOfStatement extends Statement {
		constructor(
			left, // Union[VariableDeclaration Expression]
			right, // Expression
			body) { // Statement
			super()
			this.left = left
			this.right = right
			this.body = body
		}
	}

	// The `debugger` keyword.
	export class DebuggerStatement extends Statement { }

// Declarations
	// FunctionDeclaration or FunctionExpression or ArrowFunctionExpression
	export class FunctionAbstract extends Node { }

	class FunctionNonArrow extends FunctionAbstract {
		constructor(
			id, // Identifier
			params, // Array[Pattern]
			body, // BlockStatement
			generator) { // Boolean
			// TODO:ES6 Optional args
			if (generator === undefined)
				generator = false
			super()
			this.id = id
			this.params = params
			this.body = body
			this.generator = generator
		}
	}

	// TODO: Declaration too
	export class FunctionDeclaration extends FunctionNonArrow { }

// Expressions
	// TODO: Literal as abstract type
	// Value: Number | String | null | Boolean
	export class Literal extends Expression {
		constructor(value) {
			super()
			this.value = value
		}
	}

	// The `this` keyword.
	export class ThisExpression extends Expression { }

	export class ArrayExpression extends Expression {
		constructor(elements /* Array[Opt[Expression]] */) {
			super()
			this.elements = elements
		}
	}

	export const PropertyKind = new Set([ 'init', 'get', 'set' ])
	/*
	Part of an ObjectExpression.
	If kind is 'get' or 'set', then value should be a FunctionExpression.
	*/
	export class Property extends Node {
		constructor(
			kind, // PropertyKind
			key, // Union[Literal Identifier]
			value, // Expression
			method, // Boolean
			shorthand, // Boolean
			computed) { // Boolean
			// TODO:ES6 Optional args
			if (method === undefined)
				method = shorthand = computed = false
			super()
			this.kind = kind
			this.key = key
			this.value = value
			this.method = method
			this.shorthand
			this.computed = computed
		}
	}

	// An object literal.
	export class ObjectExpression extends Expression {
		constructor(properties /* Array[Property] */) {
			super()
			this.properties = properties
		}
	}

	// TODO: Expression too
	export class FunctionExpression extends FunctionNonArrow { }

	// Like FunctionExpression but uses the `params => body` form.
	// TODO: extends FunctionAbstract too
	export class ArrowFunctionExpression extends Expression {
		constructor(params /* Array[Pattern] */, body /* Union[BlockStatement, Expression] */) {
			super()
			this.params = params
			this.body = body
		}
	}

	/*
	`expressions[0], expressions[1], ...`.
	Expression composed of other expressions, separated by the comma operator.
	*Not* for parameter lists.
	*/
	export class SequenceExpression extends Expression {
		constructor(expressions /* Array[Expression] */) {
			super()
			this.expressions = expressions
		}
	}

	export const UnaryOperator = new Set([ '-', '+', '!', '~', 'typeof', 'void', 'delete' ])

	// `operator argument`. Calls a unary operator.
	export class UnaryExpression extends Expression {
		constructor(operator /* UnaryOperator */, argument /* Expression */, prefix /* Boolean */) {
			super()
			this.operator = operator
			this.argument = argument
			assert(prefix === undefined || prefix === true)
		}

		get prefix() {
			return true
		}
	}

	export const BinaryOperator = new Set([
		'==', '!=', '===', '!==',
		'<', '<=', '>', '>=',
		'<<', '>>', '>>>',
		'+', '-', '*', '/', '%',
		'|', '^', '&', 'in',
		'instanceof'])
	// `left operator right`. Calls a binary operator.
	export class BinaryExpression extends Expression {
		constructor(operator /* BinaryOperator */, left /* Expression */, right /* Expression */) {
			super()
			this.operator = operator
			this.left = left
			this.right = right
		}
	}

	export const AssignmentOperator = new Set([
		'=', '+=', '-=', '*=', '/=', '%=',
		'<<=', '>>=', '>>>=',
		'|=', '^=', '&='
	])

	/*
	`left operator right`.
	Mutates an existing variable.
	Do not confuse with VariableDeclaration.
	*/
	export class AssignmentExpression extends Expression {
		constructor(operator /* AssignmentOperator */, left /* Pattern */, right /* Expression */) {
			super()
			this.operator = operator
			this.left = left
			this.right = right
		}
	}

	export const UpdateOperator = new Set([ '++', '--' ])
	/*
	`++argument` or `argument++`.
	Increments or decrements a number.
	*/
	export class UpdateExpression extends Expression {
		constructor(
			operator, // UpdateOperator
			argument, // Expression
			prefix) { // Boolean
			super()
			this.operator = operator
			this.argument = argument
			this.prefix = prefix
		}
	}

	export const LogicalOperator = new Set([ '||', '&&' ])
	/*
	`left operator right`.
	Calls a lazy logical operator.
	*/
	export class LogicalExpression extends Expression {
		constructor(operator /* LogicalOperator */, left /* Expression */, right /* Expression */) {
			super()
			this.operator = operator
			this.left = left
			this.right = right
		}
	}

	// `test ? consequent : alternate`.
	export class ConditionalExpression extends Expression {
		constructor(
			test, // Expression
			consequent, // Expression
			alternate) { // Expression
			super()
			this.test = test
			this.consequent = consequent
			this.alternate = alternate
		}
	}

	// Just like CallExpression but with `new` in front.
	export class NewExpression extends Expression {
		constructor(callee /* Expression */, _arguments /* Array[Expression] */) {
			super()
			this.callee = callee
			this.arguments = _arguments
		}
	}

	// `callee(arguments)`.
	export class CallExpression extends Expression {
		constructor(callee /* Expression */, _arguments /* Array[Expression] */) {
			super()
			this.callee = callee
			this.arguments = _arguments
		}
	}
	// `...args` in a CallExpression.
	export class SpreadElement extends Node {
		constructor(argument /* Expression */) {
			super()
			this.argument = argument
		}
	}

	/*
	If computed === true, `object[property]`.
	Else, `object.property` -- meaning property should be an Identifier.
	*/
	export class MemberExpression extends Expression {
		constructor(object /* Expression */, property /* Expression */, computed /* Boolean */) {
			if (computed === undefined)
				computed = !(property instanceof Identifier)
			if (!computed)
				assert(property instanceof Identifier)
			super()
			this.object = object
			this.property = property
			this.computed = computed
		}
	}

	// `yield argument` or `yield* argument`.
	export class YieldExpression extends Expression {
		constructor(argument /* Expression */, delegate /* Boolean */) {
			super()
			this.argument = argument
			this.delegate = delegate
		}
	}

	// Templates
		// A template with no tag.
		export class TemplateLiteral extends Expression {
			constructor(quasis /* Array[TemplateElement] */, expressions /* Array[Expression] */) {
				super()
				this.quasis = quasis
				this.expressions = expressions
				assert(this.quasis.length === this.expressions.length + 1)
			}
		}

		// Part of a TemplateLiteral.
		export class TemplateElement extends Node {
			static forRawString(str) {
				return new TemplateElement(false, {
					// TODO: A way to calculate this?
					cooked: null,
					raw: str
				})
			}

			static forString(str) {
				return new TemplateElement(false, {
					cooked: str,
					raw: escapeStringForTemplate(str)
				})
			}

			static get Empty() {
				return this.forString('')
			}

			constructor(tail /* Boolean */, value /* Object */) {
				super()
				this.tail = tail
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

		// TemplateLiteral with a tag in front, like`this`.
		export class TaggedTemplateExpression extends Expression {
			constructor(tag /* Expression */, quasi /* TemplateLiteral */) {
				super()
				this.tag = tag
				this.quasi = quasi
			}
		}

// Patterns
	/*
	`{ a, b: c } = ...`.
	Object deconstructing pattern.
	*/
	export class ObjectPattern extends Pattern {
		constructor(properties /* Array[AssignmentProperty] */) {
			super()
			this.properties = properties
		}
	}
	/*
	Just like a Property, but kind is always `init`.
	Although technically its own type, `_.type` will be 'Property'.
	*/
	export class AssignmentProperty extends Node {
		constructor(key /* Identifier */, value /* Pattern */) {
			// TODO:ES6 Optional args
			if (value === undefined)
				value = key
			super()
			this.key = key
			this.value = value
		}

		get type() { return 'Property' }
		get kind() { return 'init' }
		get method() { return false }
		get shorthand() { return true }
		get computed() { return false }
	}

	/*
	`[ a, b ] = ...`.
	Array deconstructing pattern.
	*/
	export class ArrayPattern extends Pattern {
		constructor(elements /* Array[Opt[Pattern]] */) {
			super()
			this.elements = elements
		}
	}

	/*
	Can be the last argument to a FunctionExpression/FunctionDeclaration
	or  go at the end of an ArrayPattern.
	*/
	export class RestElement extends Pattern {
		constructor(argument /* Pattern */) {
			super()
			this.argument = argument
		}
	}


	// TODO: What is this?
	// AssignmentPattern = p('AssignmentPattern',
	//	'left', Pattern,
	//	'right', Pattern),

// Classes
	export const MethodDefinitionKind = new Set([ 'constructor', 'method', 'get', 'set' ])
	// Part of a ClassBody.
	export class MethodDefinition extends Node {
		constructor(
			key, // Union[Identifier Literal]
			value, // FunctionExpression
			kind, // MethodDefinitionKind
			_static, // Boolean
			computed) { // Boolean
			if (kind === 'constructor')
				assert(key instanceof Identifier && key.name === 'constructor')
			super()
			this.key = key
			this.value = value
			this.kind = kind
			this.static = _static
			this.computed = computed
		}
	}

	// Contents of a Class.
	export class ClassBody extends Node {
		constructor(body /* Array[MethodDefinition] */) {
			super()
			this.body = body
		}
	}

	// ClassDeclaration or ClassExpression.
	export class Class extends Node { }

	// TODO: extends Declaration too
	// Class in declaration position.
	export class ClassDeclaration extends Class {
		constructor(id /* Identifier */, superClass /* Opt[Expression] */, body /* ClassBody */) {
			super()
			this.id = id
			this.superClass = superClass
			this.body = body
		}
	}

	// Class in expression position.
	export class ClassExpression extends Class {
		constructor(
			id, // Opt[Identifier]
			superClass, // Opt[Expression]
			body) { // ClassBody
			super()
			this.id = id
			this.superClass = superClass
			this.body = body
		}
	}

// Modules
	// A specifier in an import or export declaration.
	export class ModuleSpecifier extends Node { }

	// ImportSpecifier, ImportDefaultSpecifier, or ImportNamespaceSpecifier.
	export class ImportSpecifierAbstract extends Node {

	}

	/*
	`import specifiers from source`.
	Only one specifier may be a ImportDefaultSpecifier.
	If there is an ImportNamespaceSpecifier, it must be the only specifier.
	*/
	export class ImportDeclaration extends Node {
		constructor(specifiers /* Array[ImportSpecifierAbstract] */, source /* LiteralString */) {
			super()
			this.specifiers = specifiers
			this.source = source
		}
	}

	/*
	A non-default import. Used in an ImportDeclaration.
	For `import { a } from "source"`, just pass one argument and local will = imported.
	For `import { a as b } from "source"`, make imported `a` and local `b`.
	*/
	export class ImportSpecifier extends ModuleSpecifier {
		constructor(imported /* Identifier */, local /* Identifier */) {
			// TODO:ES6 Optional args
			if (local === undefined)
				local = imported
			super()
			this.imported = imported
			this.local = local
		}
	}

	// The default export, as in `import a from "source"`.
	export class ImportDefaultSpecifier extends ImportSpecifierAbstract {
		constructor(local /* Identifier */) {
			super()
			this.local = local
		}
	}

	// Object of every export, as in `import * as a from "source"`
	export class ImportNamespaceSpecifier extends ImportSpecifierAbstract {
		constructor(local /* Identifier */) {
			super()
			this.local = local
		}
	}

	/*
	A non-default export. Used in an ExportNamedDeclaration.
	For `export { a } from "source"`, just pass one argument local will = exported.
	For `export { a as b }`, make exported `b` and local `a`.
	*/
	export class ExportSpecifier extends ModuleSpecifier {
		constructor(exported /* Identifier */, local /* Identifier */) {
			// TODO:ES6 Optional args
			if (local === undefined)
				local = exported
			super()
			this.exported = exported
			this.local = local
		}
	}

	/*
	Exports multiple values as in `export { a, b as c }`.
	If source !== null,
	re-exports from that module as in `export { ... } from "source"`.
	*/
	export class ExportNamedDeclaration extends Node {
		constructor(
			declaration /* Opt[Declaration] */,
			specifiers /* Array[ExportSpecifier] */,
			source /* Opt[LiteralString] */) {
			super()
			this.declaration = declaration
			this.specifiers = specifiers
			this.source = source
		}
	}

	// `export default declaration`.
	export class ExportDefaultDeclaration extends Node {
		constructor(declaration /* Union[Declaration, Expression] */) {
			super()
			this.declaration = declaration
		}
	}

	// `export * from source`.
	export class ExportAllDeclaration extends Node {
		constructor(source /* LiteralString */) {
			super()
			this.source = source
		}
	}
