## Node

(abstract type)

Base type of all Asts.

## Declaration

(abstract type)

Identifier declaration.

## Statement

(abstract type)

Blocks of code have lines that are Statements or Declarations.

## Expression

(abstract type)

Code that has a value. To use one in a statement position, see ExpressionStatement.

## Pattern

(abstract type)

Can go in a parameter list or on the left side of an assignment.

## Program

	body: [Statement]

A complete program source tree.

## Identifier

	name: String

A JavaScript identifier.
It is assumed that you have called `mangleIdentifier` as appropriate.
Also look at `esast.util idCached`,
which mangles and avoids constructing the same identifier twice.

## VariableDeclarator

	id: Pattern
	init: Nullable(
	Expression)

A single variable within a VariableDeclaration.

## VariableDeclaration

	kind: 'const' | 'let' | 'var'
	declarations: [VariableDeclarator]

Declares and optionally initializes many variables.
Must be at least one declaration.

## EmptyStatement


An empty statement, i.e., a solitary semicolon.
Not useful for code generation, but some parsers will return these.

## BlockStatement

	body: [Statement]

A block statement, i.e., a sequence of statements surrounded by braces.

## ExpressionStatement

	expression: Expression

An expression statement, i.e., a statement consisting of a single expression.
See `esast.util toStatement toStatements`.

## IfStatement

	test: Expression
	consequent: Statement
	alternate: Nullable(
	Statement)

An if (or if ... else) statement.

## LabeledStatement

	label: Identifier
	body: Statement

A statement prefixed by a label.

## BreakStatement

	label: Nullable(
	Identifier)

The `break` keyword.

## ContinueStatement

	label: Nullable(
	Identifier)

The `continue` keyword.

## SwitchCase

	test: Nullable(
	Expression)
	consequent: [Statement]

A single `case` within a SwitchStatement.
If `test` is `null`, this is the `default` case.

## SwitchStatement

	discriminant: Expression
	cases: [SwitchCase]

Only the last entry of `cases` is allowed to be `default`.

## ReturnStatement

	argument: Nullable(
	Expression)

The `return` keyword, optionally followed by an Expression to return.

## ThrowStatement

	argument: Expression

The `throw` keyword, and something to throw.
See `esast.util throwError`.

## CatchClause

	param: Pattern
	body: BlockStatement

Must be *part* of a TryStatement -- does *not* follow it.

## TryStatement

	block: BlockStatement
	handler: Nullable(
	CatchClause)
	finalizer: Nullable(
	BlockStatement)

At least one of `handler` or `finalizer` must be non-null.

## WhileStatement

	test: Expression
	body: Statement

`while (test) body`.

## DoWhileStatement

	body: Statement
	test: Expression

`do { body } while (test)`.

## ForStatement

	init: Nullable(
	Union(
		VariableDeclaration,
		Expression))
	test: Nullable(
	Expression)
	update: Nullable(
	Expression)
	body: Statement

`for (init; test; update) body`.
Not to be confused with ForInStatement or ForOfStatement.

## ForInStatement

	left: Union(
	VariableDeclaration,
	Expression)
	right: Expression
	body: Statement

`for (left in right) body`.

## ForOfStatement

	left: Union(
	VariableDeclaration,
	Expression)
	right: Expression
	body: Statement

`for (left of right) body`.

## DebuggerStatement


The `debugger` keyword.

## Function

(abstract type)

FunctionDeclaration or FunctionExpression.

## FunctionDeclaration

	id: Identifier
	params: [Identifier]
	body: BlockStatement
	generator: Boolean

Unlike for FunctionExpression, id must not be null.

## Literal

	value: Object

A literal token.

## ThisExpression


The `this` keyword.

## ArrayExpression

	elements: [Nullable(
	Expression)]

An array literal.

## Property

	kind: 'init' | 'get' | 'set'
	key: Union(
	Literal,
	Identifier)
	value: Expression

Part of an ObjectExpression.
If kind is 'get' or 'set', then value should be a FunctionExpression.

## ObjectExpression

	properties: [Property]

An object literal.

## FunctionExpression

	id: Nullable(
	Identifier)
	params: [Pattern]
	body: BlockStatement
	generator: Boolean

`function id(params) body` or `function* id(params) body`.
Function in an expression position.
To declare a function, use FunctionDeclaration, not ExpressionStatement.
See also `esast.util thunk` and ArrowFunctionExpression.

## ArrowFunctionExpression

	params: [Pattern]
	body: Union(
	BlockStatement,
	Expression)

Like FunctionExpression but uses the `params => body` form.

## SequenceExpression

	expressions: [Expression]

`expressions[0], expressions[1], ...`.
Expression composed of other expressions, separated by the comma operator.
*Not* for parameter lists.

## UnaryExpression

	operator: '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete'
	argument: Expression

`operator argument`. Calls a unary operator.

## BinaryExpression

	operator: '==' | '!=' | '===' | '!==' | '<' | '<=' | '>' | '>=' | '<<' | '>>' | '>>>' | '+' | '-' | '*' | '/' | '%' | '|' | '^' | '&' | 'in' | 'instanceof'
	left: Expression
	right: Expression

`left operator right`. Calls a binary operator.

## AssignmentExpression

	operator: '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '<<=' | '>>=' | '>>>=' | '|=' | '^=' | '&='
	left: Pattern
	right: Expression

`left operator right`.
Mutates an existing variable.
Do not confuse with VariableDeclaration.

## UpdateExpression

	operator: '++' | '--'
	argument: Expression
	prefix: Boolean

`++argument` or `argument++`. Increments or decrements a number.

## LogicalExpression

	operator: '||' | '&&'
	left: Expression
	right: Expression

`left operator right`. Calls a lazy logical operator.

## ConditionalExpression

	test: Expression
	consequent: Expression
	alternate: Expression

`test ? consequent : alternate`.

## NewExpression

	callee: Expression
	arguments: [Expression]

Just like CallExpression but with `new` in front.

## CallExpression

	callee: Expression
	arguments: [Expression]

`callee(arguments)`.

## SpreadElement

	argument: Expression

...args in call

## MemberExpression

	object: Expression
	property: Expression
	computed: Boolean

If computed === true, `object[property]`.
Else, `object.property` -- meaning property should be an Identifier.

## YieldExpression

	argument: Expression
	delegate: Boolean

`yield argument` or `yield* argument`.

## TemplateElement

	tail: Boolean
	value: Object

doc

## TemplateLiteral

	quasis: [TemplateElement]
	expressions: [Expression]

doc

## TaggedTemplateExpression

	tag: Expression
	quasi: TemplateLiteral

doc

## AssignmentProperty

	key: Identifier
	value: Pattern

Just like a Property, but kind is always `init`.
Although technically its own type, `_.type` will be 'Property'.

## ObjectPattern

	properties: [AssignmentProperty]

`{ a, b: c } = ...`. Object deconstructing pattern.

## ArrayPattern

	elements: [Nullable(
	Pattern)]

`[ a, b ] = ...`. Array deconstructing pattern.

## RestElement

	argument: Pattern

Can be the last argument to a FunctionExpression/FunctionDeclaration
or  go at the end of an ArrayPattern.

## MethodDefinition

	key: Union(
	Identifier,
	Literal)
	value: FunctionExpression
	kind: 'constructor' | 'method' | 'get' | 'set'
	static: Boolean
	computed: Boolean

Part of a ClassBody.
If kind is 'constructor', key must be Identifier('constructor').

## ClassBody

	body: [MethodDefinition]

Contents of a Class.

## Class

(abstract type)

ClassDeclaration or ClassExpression.

## ClassDeclaration

	id: Identifier
	superClass: Nullable(
	Expression)
	body: ClassBody

Class in declaration position.

## ClassExpression

	id: Nullable(
	Identifier)
	superClass: Nullable(
	Expression)
	body: ClassBody

Class in expression position.

## ModuleSpecifier

(abstract type)

A specifier in an import or export declaration.

## ImportSpecifierAbstract

(abstract type)

ImportSpecifier, ImportDefaultSpecifier, or ImportNamespaceSpecifier.

## ImportDeclaration

	specifiers: [ImportSpecifierAbstract]
	source: Literal

`import specifiers from source`.
Only one specifier may be a ImportDefaultSpecifier.
If there is an ImportNamespaceSpecifier, it must be the only specifier.

## ImportSpecifier

	imported: Identifier
	local: Identifier

A non-default import. Used in an ImportDeclaration.
For `import { a } from "source"`, just pass one argument and local will = imported.
For `import { a as b } from "source"`, make imported `a` and local `b`.

## ImportDefaultSpecifier

	local: Identifier

The default export, as in `import a from "source"`.

## ImportNamespaceSpecifier

	local: Identifier

Object of every export, as in `import * as a from "source"`.

## ExportSpecifier

	exported: Identifier
	local: Identifier

A non-default export. Used in an ExportNamedDeclaration.
For `export { a } from "source"`, just pass one argument local will = exported.
For `export { a as b }`, make exported `b` and local `a`.

## ExportNamedDeclaration

	declaration: Nullable(
	Declaration)
	specifiers: [ExportSpecifier]
	source: Nullable(
	Literal)

Exports multiple values as in `export { a, b as c }`.
If source !== null,
re-exports from that module as in `export { ... } from "source"`.

## ExportDefaultDeclaration

	declaration: Union(
	Declaration,
	Expression)

`export default declaration`.

## ExportAllDeclaration

	source: Literal

`export * from source`.

