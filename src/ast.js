import tupl, { abstract } from 'tupl/dist/tupl'
import { Nullable, Union } from 'tupl/dist/type'
import { assert, dedent, newSet } from './private/util'

export const
	Node = abstract('Node', Object,
		'Base type of all Asts.'),
	Declaration = abstract('Declaration', Node,
		'Identifier declaration.'),
	Statement = abstract('Statement', Node,
		'Blocks of code have lines that are Statements or Declarations.'),
	Expression = abstract('Expression', Node,
		'Code that has a value. To use one in a statement position, see ExpressionStatement.'),
	Pattern = abstract('Pattern', Node,
		'Can go in a parameter list or on the left side of an assignment.')

const makeType = superType => (name, doc, namesTypes, proto) => {
	// TODO:ES6 Optional args
	if (proto === undefined) proto = { }
	doc = dedent(doc)
	proto.type = name
	const t = tupl(name, superType, doc, namesTypes, proto)
	const oldToString = t.prototype.toString
	t.prototype.toString = function() {
		const old = oldToString.call(this)
		return this.loc ? `${this.loc.toString()}@${old}` : old
	}
	return t
}
const
	n = makeType(Node),
	s = makeType(Statement),
	e = makeType(Expression),
	d = makeType(Declaration),
	p = makeType(Pattern)

export const
	Program = n('Program',
		'A complete program source tree.',
		[ 'body', [Statement] ]),
	Identifier = n('Identifier',
		`
			A JavaScript identifier.
			It is assumed that you have called \`mangleIdentifier\` as appropriate.
			Also look at \`esast.util idCached\`,
			which mangles and avoids constructing the same identifier twice.`,
		[ 'name', String ]),

	VariableDeclarator = n('VariableDeclarator',
		'A single variable within a VariableDeclaration.',
		[
			'id', Pattern,
			'init', Nullable(Expression)
		]),
	VariableDeclarationKind = newSet([ 'const', 'let', 'var' ]),
	VariableDeclaration = d('VariableDeclaration',
		// TODO: Assert
		`
			Declares and optionally initializes many variables.
			Must be at least one declaration.`,
		[
			'kind', VariableDeclarationKind,
			'declarations', [VariableDeclarator]
		]),

	// Statements
	EmptyStatement = s('EmptyStatement',
		`
			An empty statement, i.e., a solitary semicolon.
			Not useful for code generation, but some parsers will return these.`,
		[ ]),
	BlockStatement = s('BlockStatement',
		'A block statement, i.e., a sequence of statements surrounded by braces.',
		[ 'body', [Statement] ]),
	ExpressionStatement = s('ExpressionStatement',
		`
			An expression statement, i.e., a statement consisting of a single expression.
			See \`esast.util toStatement toStatements\`.`,
		[ 'expression', Expression ]),
	IfStatement = s('IfStatement',
		'An if (or if ... else) statement.',
		[
			'test', Expression,
			'consequent', Statement,
			'alternate', Nullable(Statement)
		]),
	LabeledStatement = s('LabeledStatement',
		'A statement prefixed by a label.',
		[
			'label', Identifier,
			'body', Statement
		]),
	BreakStatement = s('BreakStatement',
		'The `break` keyword.',
		[ 'label', Nullable(Identifier) ]),
	ContinueStatement = s('ContinueStatement',
		'The `continue` keyword.',
		[ 'label', Nullable(Identifier) ]),
	SwitchCase = n('SwitchCase',
		`
			A single \`case\` within a SwitchStatement.
			If \`test\` is \`null\`, this is the \`default\` case.`,
		[
			'test', Nullable(Expression),
			'consequent', [Statement]
		]),
	SwitchStatement = s('SwitchStatement',
		'Only the last entry of `cases` is allowed to be `default`.',
		[
			'discriminant', Expression,
			'cases', [SwitchCase]
		]),
	ReturnStatement = s('ReturnStatement',
		'The `return` keyword, optionally followed by an Expression to return.',
		[ 'argument', Nullable(Expression) ]),
	ThrowStatement = s('ThrowStatement',
		`
			The \`throw\` keyword, and something to throw.
			See \`esast.util throwError\`.`,
		[ 'argument', Expression ]),

	CatchClause = n('CatchClause',
		'Must be *part* of a TryStatement -- does *not* follow it.',
		[
			'param', Pattern,
			'body', BlockStatement
		]),
	TryStatement = s('TryStatement',
		// TODO: Assert in postConstruct
		'At least one of `handler` or `finalizer` must be non-null.',
		[
			'block', BlockStatement,
			'handler', Nullable(CatchClause),
			'finalizer', Nullable(BlockStatement)
		]),
	WhileStatement = s('WhileStatement',
		'`while (test) body`.',
		[
			'test', Expression,
			'body', Statement
		]),
	DoWhileStatement = s('DoWhileStatement',
		// TODO: Note that body needs braces!
		'`do { body } while (test)`.',
		[
			'body', Statement,
			'test', Expression
		]),
	ForStatement = s('ForStatement',
		`
			\`for (init; test; update) body\`.
			Not to be confused with ForInStatement or ForOfStatement.`,
		[
			'init', Nullable(Union(VariableDeclaration, Expression)),
			'test', Nullable(Expression),
			'update', Nullable(Expression),
			'body', Statement
		]),
	ForInStatement = s('ForInStatement',
		'`for (left in right) body`.',
		[
			'left', Union(VariableDeclaration, Expression),
			'right', Expression,
			'body', Statement
		]),
	ForOfStatement = s('ForOfStatement',
		'`for (left of right) body`.',
		[
			'left', Union(VariableDeclaration, Expression),
			'right', Expression,
			'body', Statement
		]),
	DebuggerStatement = s('DebuggerStatement',
		'The `debugger` keyword.',
		[ ]),

	// Declarations
	Function = abstract('Function', Node, 'FunctionDeclaration or FunctionExpression.'),
	// TODO: Function too
	FunctionDeclaration = d('FunctionDeclaration',
		'Unlike for FunctionExpression, id must not be null.',
		[
			'id', Identifier,
			'params', [Identifier],
			'body', BlockStatement,
			'generator', Boolean
		]),

	// Expressions
	// TODO: Literal as abstract type
	// Value: Number | String | null | Boolean
	Literal = e('Literal',
		'A literal token.',
		[ 'value', Object ]),
	ThisExpression = e('ThisExpression',
		'The `this` keyword.',
		[ ]),
	ArrayExpression = e('ArrayExpression',
		'An array literal.',
		[ 'elements', [Nullable(Expression)] ]),
	PropertyKind = newSet([ 'init', 'get', 'set' ]),
	Property = n('Property',
		// TODO:ASSERT
		`
			Part of an ObjectExpression.
			If kind is 'get' or 'set', then value should be a FunctionExpression.`,
		[
			'kind', PropertyKind,
			// TODO: LiteralString | LiteralNumber
			'key', Union(Literal, Identifier),
			'value', Expression
		]),
	ObjectExpression = e('ObjectExpression',
		'An object literal.',
		[ 'properties', [Property] ]),
	// TODO: Inherits from Function
	FunctionExpression = e('FunctionExpression',
		`
			\`function id(params) body\` or \`function* id(params) body\`.
			Function in an expression position.
			To declare a function, use FunctionDeclaration, not ExpressionStatement.
			See also \`esast.util thunk\` and ArrowFunctionExpression.`,
		[
			'id', Nullable(Identifier),
			'params', [Pattern],
			'body', BlockStatement,
			'generator', Boolean
		],
		{
			postConstruct() {
				this.generator = Boolean(this.generator)
			}
		}),
	// TODO: Inherits from Function
	ArrowFunctionExpression = e('ArrowFunctionExpression',
		'Like FunctionExpression but uses the `params => body` form.',
		[
			'params', [Pattern],
			'body', Union(BlockStatement, Expression)
		]),
	SequenceExpression = e('SequenceExpression',
		`
			\`expressions[0], expressions[1], ...\`.
			Expression composed of other expressions, separated by the comma operator.
			*Not* for parameter lists.`,
		[ 'expressions', [ Expression ] ]),
	// TODO: test `- new X`. Probably need parens around argument.
	UnaryOperator = newSet([ '-', '+', '!', '~', 'typeof', 'void', 'delete' ]),
	UnaryExpression = e('UnaryExpression',
		'`operator argument`. Calls a unary operator.',
		[
			'operator', UnaryOperator,
			'argument', Expression
		]),
	BinaryOperator = newSet([
		'==', '!=', '===', '!==',
		'<', '<=', '>', '>=',
		'<<', '>>', '>>>',
		'+', '-', '*', '/', '%',
		'|', '^', '&', 'in',
		'instanceof']),
	// TODO: Render with parens
	BinaryExpression = e('BinaryExpression',
		'`left operator right`. Calls a binary operator.',
		[
			'operator', BinaryOperator,
			'left', Expression,
			'right', Expression
		]),
	AssignmentOperator = newSet([
		'=', '+=', '-=', '*=', '/=', '%=',
		'<<=', '>>=', '>>>=',
		'|=', '^=', '&='
	]),
	AssignmentExpression = e('AssignmentExpression',
		`
			\`left operator right\`.
			Mutates an existing variable.
			Do not confuse with VariableDeclaration.`,
		[
			'operator', AssignmentOperator,
			'left', Pattern,
			'right', Expression
		]),
	UpdateOperator = newSet([ '++', '--' ]),
	UpdateExpression = e('UpdateExpression',
		'`++argument` or `argument++`. Increments or decrements a number.',
		[
			'operator', UpdateOperator,
			'argument', Expression,
			'prefix', Boolean
		]),
	LogicalOperator = newSet([ '||', '&&' ]),
	LogicalExpression = e('LogicalExpression',
		'`left operator right`. Calls a lazy logical operator.',
		[
			'operator', LogicalOperator,
			'left', Expression,
			'right', Expression
		]),
	ConditionalExpression = e('ConditionalExpression',
		'`test ? consequent : alternate`.',
		[
			'test', Expression,
			'consequent', Expression,
			'alternate', Expression
		]),
	NewExpression = e('NewExpression',
		'Just like CallExpression but with `new` in front.',
		[
			'callee', Expression,
			'arguments', [Expression]
		]),
	CallExpression = e('CallExpression',
		'`callee(arguments)`.',
		[
			'callee', Expression,
			'arguments', [Expression]
		]),
	SpreadElement = n('SpreadElement',
		'...args in call',
		[ 'argument', Expression ]),
	MemberExpression = e('MemberExpression',
		// TODO:ASSERT
		`
			If computed === true, \`object[property]\`.
			Else, \`object.property\` -- meaning property should be an Identifier.`,
		[
			'object', Expression,
			'property', Expression,
			'computed', Boolean
		]),
	YieldExpression = e('YieldExpression',
		'`yield argument` or `yield* argument`.',
		[
			'argument', Expression,
			'delegate', Boolean
		]),

	// Templates
	TemplateElement = n('TemplateElement',
		'doc',
		[
			'tail', Boolean,
			// TODO: { cooked:String, raw:String } data structure
			'value', Object
		]),
	TemplateLiteral = e('TemplateLiteral',
		'doc',
		[
			'quasis', [TemplateElement],
			'expressions', [Expression]
		],
		{
			postConstruct() {
				assert(this.quasis.length === this.expressions.length + 1)
			}
		}),
	TaggedTemplateExpression = e('TaggedTemplateExpression',
		'doc',
		[
			'tag', Expression,
			'quasi', TemplateLiteral
		]),

	// Patterns
	AssignmentProperty = makeType(Property)('AssignmentProperty',
		`
			Just like a Property, but kind is always \`init\`.
			Although technically its own type, \`_.type\` will be 'Property'.`,
		[ 'key', Identifier, 'value', Pattern ],
		{
			type: 'Property',
			method: false,
			postConstruct() {
				if (this.value === null)
					this.value = this.key
				this.kind = 'init'
			}
		}),
	ObjectPattern = p('ObjectPattern',
		'`{ a, b: c } = ...`. Object deconstructing pattern.',
		[ 'properties', [AssignmentProperty] ]),
	ArrayPattern = p('ArrayPattern',
		'`[ a, b ] = ...`. Array deconstructing pattern.',
		[ 'elements', [Nullable(Pattern)] ]),
	RestElement = p('RestElement',
		// TODO:TEST
		`
			Can be the last argument to a FunctionExpression/FunctionDeclaration
			or  go at the end of an ArrayPattern.`,
		[ 'argument', Pattern ]),

	// TODO: What is this?
	// AssignmentPattern = p('AssignmentPattern',
	//	'left', Pattern,
	//	'right', Pattern),

	MethodDefinitionKind = newSet([ 'constructor', 'method', 'get', 'set' ]),
	MethodDefinition = n('MethodDefinition',
		// TODO:Assert
		// TODO: util method for constructor.
		`
			Part of a ClassBody.
			If kind is 'constructor', key must be Identifier('constructor').`,
		[
			'key', Union(Identifier, Literal),
			'value', FunctionExpression,
			'kind', MethodDefinitionKind,
			'static', Boolean,
			'computed', Boolean
		]),
	ClassBody = n('ClassBody',
		'Contents of a Class.',
		[ 'body', [MethodDefinition] ]),
	Class = abstract('Class', Node,
		'ClassDeclaration or ClassExpression.'),
	// TODO: extends Declaration too
	ClassDeclaration = makeType(Class)('ClassDeclaration',
		'Class in declaration position.',
		[
			'id', Identifier,
			'superClass', Nullable(Expression),
			'body', ClassBody
		]),
	ClassExpression = makeType(Class)('ClassExpression',
		// TODO: Test class with no superClass
		'Class in expression position.',
		[
			'id', Nullable(Identifier),
			'superClass', Nullable(Expression),
			'body', ClassBody
		]),

	ModuleSpecifier = abstract('ModuleSpecifier', Node,
		'A specifier in an import or export declaration.'),

	ImportSpecifierAbstract = abstract('ImportSpecifierAbstract', Node,
		'ImportSpecifier, ImportDefaultSpecifier, or ImportNamespaceSpecifier.'),
	ImportDeclaration = n('ImportDeclaration',
		// TODO:ASSERT
		`
			\`import specifiers from source\`.
			Only one specifier may be a ImportDefaultSpecifier.
			If there is an ImportNamespaceSpecifier, it must be the only specifier.`,
		[
			'specifiers', [ImportSpecifierAbstract],
			// TODO: LiteralString
			'source', Literal
		]),
	ImportSpecifier = makeType(ModuleSpecifier)('ImportSpecifier',
		`
			A non-default import. Used in an ImportDeclaration.
			For \`import { a } from "source"\`, just pass one argument and local will = imported.
			For \`import { a as b } from "source"\`, make imported \`a\` and local \`b\`.`,
		[
			'imported', Identifier,
			'local', Identifier
		],
		{
			postConstruct() {
				if (this.local === null)
					this.local = this.imported
			}
		}),
	ImportDefaultSpecifier = makeType(ImportSpecifierAbstract)('ImportDefaultSpecifier',
		'The default export, as in `import a from "source"`.',
		[ 'local', Identifier ]),
	ImportNamespaceSpecifier = makeType(ImportSpecifierAbstract)('ImportNamespaceSpecifier',
		'Object of every export, as in `import * as a from "source"`.',
		[ 'local', Identifier ]),

	ExportSpecifier = 	makeType(ModuleSpecifier)('ExportSpecifier',
		`
			A non-default export. Used in an ExportNamedDeclaration.
			For \`export { a } from "source"\`, just pass one argument local will = exported.
			For \`export { a as b }\`, make exported \`b\` and local \`a\`.`,
		[
			'exported', Identifier,
			'local', Identifier
		],
		{
			postConstruct() {
				if (this.local === null)
					this.local = this.exported
			}
		}),
	ExportNamedDeclaration = n('ExportNamedDeclaration',
		`
			Exports multiple values as in \`export { a, b as c }\`.
			If source !== null,
			re-exports from that module as in \`export { ... } from "source"\`.`,
		[
			'declaration', Nullable(Declaration),
			'specifiers', [ExportSpecifier],
			// TODO: LiteralString
			'source', Nullable(Literal)
		]),
	ExportDefaultDeclaration = n('ExportDefaultDeclaration',
		'`export default declaration`.',
		[
			'declaration', Union(Declaration, Expression)
		]),
	ExportAllDeclaration = n('ExportAllDeclaration',
		'`export * from source`.',
		// TODO:LiteralString
		[ 'source', Literal ])
