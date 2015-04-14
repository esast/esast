import Loc from './Loc'
import tuple from './private/tuple'
import { assert, pAdd } from './private/util'

export class Node { }
export class Statement extends Node { }
export class Expression extends Node { }

export class Function extends Node { }
export class Declaration extends Node { }
export class Pattern extends Node { }

const makeType = superType => (name, ...namesTypes) => {
	const type = tuple(name, superType, ...namesTypes)
	Object.assign(type.prototype, { type: name })
	return type
}
const
	n = makeType(Node),
	s = makeType(Statement),
	e = makeType(Expression)

// TODO
const nullable = _ => _
const union = (a, b) => b

const proto = (_, protoProps) => {
	Object.assign(_.prototype, protoProps)
	return _
}

export const
	UnaryOperator = new Set([ '-', '+', '!', '~', 'typeof', 'void', 'delete' ]),
	BinaryOperator = new Set([
		'==', '!=', '===', '!==',
		'<', '<=', '>', '>=',
		'<<', '>>', '>>>',
		'+', '-', '*', '/', '%',
		'|', '^', '&', 'in',
		'instanceof']),
	LogicalOperator = new Set([ '||', '&&' ]),
	AssignmentOperator = new Set([
		'=', '+=', '-=', '*=', '/=', '%=',
		'<<=', '>>=', '>>>=',
		'|=', '^=', '&='
	]),
	UpdateOperator = new Set([ '++', '--' ]),
	MethodDefinitionKind = new Set([ 'constructor', 'method', 'get', 'set' ]),
	PropertyKind = new Set([ 'init', 'get', 'set' ])

export const
	Program = n('Program',
		'body', [Statement]),
	Identifier = n('Identifier',
		'name', String),

	// Statements
	EmptyStatement = s('EmptyStatement'),
	BlockStatement = s('BlockStatement',
		'body', [Statement]),
	ExpressionStatement = s('ExpressionStatement',
		'expression', Expression),
	IfStatement = s('IfStatement',
		'test', Expression,
		'consequent', Statement,
		'alternate', nullable(Statement)),
	LabeledStatement = s('LabeledStatement',
		'label', Identifier,
		'body', Statement),
	BreakStatement = s('BreakStatement',
		'label', nullable(Identifier)),
	ContinueStatement = s('ContinueStatement',
		'label', nullable(Identifier)),
	SwitchCase = n('SwitchCase',
		'test', Expression,
		'consequent', [Statement]),
	SwitchStatement = s('SwitchStatement',
		'discriminant', Expression,
		'cases', [SwitchCase],
		'lexical', Boolean),
	ReturnStatement = s('ReturnStatement',
		'argument', Expression),
	ThrowStatement = s('ThrowStatement',
		'argument', Expression),

	CatchClause = n('CatchClause',
		'param', Pattern,
		'body', BlockStatement),
	TryStatement = s('TryStatement',
		'block', BlockStatement,
		'handler', nullable(CatchClause),
		'finalizer', nullable(BlockStatement)),
	WhileStatement = s('WhileStatement',
		'test', Expression,
		'body', Statement),
	DoWhileStatement = s('DoWhileStatement',
		'body', Statement,
		'test', Expression),
	ForStatement = s('ForStatement',
		'init', nullable(union(VariableDeclaration, Expression)),
		'test', nullable(Expression),
		'update', nullable(Expression),
		'body', Statement),
	ForInStatement = s('ForInStatement',
		'left', union(VariableDeclaration, Expression),
		'right', Expression,
		'body', Statement),
	ForOfStatement = s('ForOfStatement',
		'left', union(VariableDeclaration, Expression),
		'right', Expression,
		'body', Statement),
	DebuggerStatement = s('DebuggerStatement'),

	// Declarations
	// TODO: Function too
	FunctionDeclaration = makeType(Declaration)('FunctionDeclaration',
		'id', Identifier,
		'params', [Identifier],
		'body', BlockStatement,
		'generator', Boolean),

	VariableDeclarator = n('VariableDeclarator',
		'id', Pattern,
		'init', Expression),
	VariableDeclaration = makeType(Declaration)('VariableDeclaration',
		'kind', String,
		'declarations', [VariableDeclarator]),

	// Expressions
	ThisExpression = e('ThisExpression'),
	ArrayExpression = e('ArrayExpression',
		'elements', [Expression]),
	Property = n('Property',
		'kind', PropertyKind,
		// TODO: LiteralString | LiteralNumber
		'key', union(Literal, Identifier),
		'value', Expression),
	ObjectExpression = e('ObjectExpression',
		'properties', [Property]),
	// TODO: Inherits from Function
	FunctionExpression = proto(
		e('FunctionExpression',
			'id', Identifier,
			'params', [Identifier],
			'body', BlockStatement,
			'generator', Boolean),
		{
			postConstruct() {
				this.generator = Boolean(this.generator)
			}
		}),
	// TODO: Inherits from Function
	ArrowFunctionExpression = e('ArrowExpression',
		'params', [Pattern],
		'body', union(BlockStatement, Expression)),
	SequenceExpression = e('SequenceExpression',
		'expressions', [ Expression ]),
	UnaryExpression = e('UnaryExpression',
		'operator', UnaryOperator,
		'argument', Expression),
	BinaryExpression = e('BinaryExpression',
		'operator', BinaryOperator,
		'left', Expression,
		'right', Expression),
	AssignmentExpression = e('AssignmentExpression',
		'operator', AssignmentOperator,
		'left', Pattern,
		'right', Expression),
	UpdateExpression = e('UpdateExpression',
		'operator', UpdateOperator,
		'argument', Expression,
		'prefix', Boolean),
	LogicalExpression = e('LogicalExpression',
		'operator', LogicalOperator,
		'left', Expression,
		'right', Expression),
	ConditionalExpression = e('ConditionalExpression',
		'test', Expression,
		'consequent', Expression,
		'alternate', Expression),
	NewExpression = e('NewExpression',
		'callee', Expression,
		'arguments', [Expression]),
	CallExpression = e('CallExpression',
		'callee', Expression,
		'arguments', [Expression]),
	MemberExpression = e('MemberExpression',
		'object', Expression,
		'property', Identifier,
		'computed', Boolean),
	YieldExpression = e('YieldExpression',
		'argument', Expression,
		'delegate', Boolean),
	// TODO: Literal as abstract type
	// Value: Number | String | null | Boolean
	Literal = e('Literal', 'value', Object),

	// Patterns
	AssignmentProperty = proto(
		makeType(Property)('AssignmentProperty', 'key', Identifier, 'value', Pattern),
		{
			type: 'Property',
			kind: 'init',
			method: false,
			postConstruct() {
				if (this.value === null)
					this.value = this.key
				this.kind = 'init'
			}
		}),
	ObjectPattern = makeType(Pattern)('ObjectPattern',
		'properties', [AssignmentProperty]),
	ArrayPattern = makeType(Pattern)('ArrayPattern',
		'elements', [nullable(Pattern)]),
	RestElement = makeType(Pattern)('RestElement',
		'argument', Pattern),
	// TODO: What is this?
	// AssignmentPattern = p('AssignmentPattern',
	//	'left', Pattern,
	//	'right', Pattern),

	MethodDefinition = n('MethodDefinition',
		'key', Identifier,
		'value', FunctionExpression,
		'kind', MethodDefinitionKind,
		'static', Boolean,
		'computed', Boolean),
	ClassBody = n('ClassBody',
		'body', [MethodDefinition]),
	Class = class Class extends Node { },
	// TODO: extends Declaration too
	ClassDeclaration = makeType(Class)('ClassDeclaration',
		'id', Identifier,
		'superClass', Expression,
		'body', ClassBody),
	ClassExpression = makeType(Class)('ClassExpression',
		'id', Identifier,
		'superClass', Expression,
		'body', ClassBody),

	ModuleSpecifier = class ModuleSpecifier extends Node { },

	ImportSpecifierAbstract = class ImportSpecifierAbstract extends Node { },
	ImportDeclaration = n('ImportDeclaration',
		'specifiers', [ImportSpecifierAbstract],
		// TODO: LiteralString
		'source', Literal),
	ImportSpecifier = proto(
		makeType(ModuleSpecifier)('ImportSpecifier',
			'imported', Identifier,
			'local', Identifier),
		{
			postConstruct() {
				if (this.local === null)
					this.local = this.imported
			}
		}),
	ImportDefaultSpecifier = makeType(ImportSpecifierAbstract)('ImportDefaultSpecifier',
		'local', Identifier),
	ImportNamespaceSpecifier = makeType(ImportSpecifierAbstract)('ImportNamespaceSpecifier',
		'local', Identifier),

	ExportSpecifier = proto(
		makeType(ModuleSpecifier)('ExportSpecifier',
			'exported', Identifier,
			'local', Identifier),
		{
			postConstruct() {
				if (this.local === null)
					this.local = this.exported
			}
		}),
	ExportNamedDeclaration = n('ExportNamedDeclaration',
		'declaration', nullable(Declaration),
		'specifiers', [ExportSpecifier],
		// TODO: LiteralString
		'source', nullable(Literal)),
	ExportDefaultDeclaration = n('ExportDefaultDeclaration',
		'declaration', union(Declaration, Expression)),
	ExportAllDeclaration = n('ExportAllDeclaration',
		// TODO:LiteralString
		'source', Literal)
