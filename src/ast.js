import Loc from './Loc'
import tuple from './private/tuple'
import { assert, pAdd } from './private/util'

export class ESNode { }
export class Statement extends ESNode { }
export class Expression extends ESNode { }
export class Declaration extends ESNode { }
export class Pattern extends ESNode { }

const makeType = superType => (name, ...namesTypes) => {
	const type = tuple(name, superType, ...namesTypes)
	Object.assign(type.prototype, {
		type: name,
		toString() {
			return JSON.stringify(pAdd(this, 'type', name), null, 2)
		}
	})
	return type
}
const n = makeType(ESNode)
const s = makeType(Statement)
const e = makeType(Expression)

// TODO
const nullable = _ => _

export const
	Program = n('Program', 'body', [Statement]),
	Identifier = n('Identifier', 'name', String),
	BlockStatement = s('BlockStatement', 'body', [Statement]),

	// Expressions
	FunctionExpression = e('FunctionExpression',
		'id', Identifier, 'params', [Identifier], 'body', BlockStatement, 'generator', Boolean),

	// Value: Number | String | null | Boolean
	Literal = e('Literal', 'value', Object),
	ThisExpression = e('ThisExpression'),
	ArrayExpression = e('ArrayExpression', 'elements', [Expression]),
	Property = n('Property', 'kind', String, 'key', Object, 'value', Expression),
	ObjectExpression = e('ObjectExpression', 'properties', [Property]),
	NewExpression = e('NewExpression', 'callee', Expression, 'arguments', [Expression]),
	CallExpression = e('CallExpression', 'callee', Expression, 'arguments', [Expression]),
	MemberExpression = e('MemberExpression',
		'object', Expression, 'property', Identifier, 'computed', Boolean),

	UnaryExpression = e('UnaryExpression', 'operator', String, 'argument', Expression),
	BinaryExpression = e('BinaryExpression',
		'operator', String, 'left', Expression, 'right', Expression),
	AssignmentExpression = e('AssignmentExpression',
		'operator', String, 'left', Pattern, 'right', Expression),
	YieldExpression = e('YieldExpression', 'argument', Expression, 'delegate', Boolean),

	VariableDeclarator = n('VariableDeclarator', 'id', Identifier, 'init', Expression),
	VariableDeclaration = s('VariableDeclaration',
		'kind', String, 'declarations', [VariableDeclarator]),

	// Statements
	ReturnStatement = s('ReturnStatement', 'argument', Expression),
	ThrowStatement = s('ThrowStatement', 'argument', Expression),
	LabeledStatement = s('LabeledStatement', 'label', Identifier, 'body', Statement),
	WhileStatement = s('WhileStatement', 'test', Expression, 'body', Statement),
	DebuggerStatement = s('DebuggerStatement'),
	ExpressionStatement = s('ExpressionStatement', 'expression', Expression),
	IfStatement = s('IfStatement',
		'test', Expression, 'consequent', Statement, 'alternate', nullable(Statement)),

	BreakStatement = s('BreakStatement', 'label', nullable(Identifier)),

	SwitchCase = n('SwitchCase', 'test', Expression, 'consequent', [Statement]),
	SwitchStatement = s('SwitchStatement',
		'discriminant', Expression, 'cases', [SwitchCase], 'lexical', Boolean)
