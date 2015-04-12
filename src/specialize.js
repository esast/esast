import { AssignmentExpression, BinaryExpression, BlockStatement, CallExpression, Expression,
	FunctionExpression, Identifier, Literal, MemberExpression, Pattern, Property, ReturnStatement,
	Statement, SwitchCase, SwitchStatement, YieldExpression, UnaryExpression, VariableDeclaration,
	VariableDeclarator, WhileStatement } from './ast'
import tuple from './private/tuple'
import { assert } from './private/util'

const specialize = (superType, namesTypes, proto) => {
	const type = tuple(`${superType.name}Specialization`, superType, ...namesTypes)
	Object.assign(type.prototype, proto)
	return type
}
const s = specialize

const
	FunctionExpressionPlain = s(FunctionExpression,
		[ 'params', [Identifier], 'body', BlockStatement ], { id: null, generator: false }),
	FunctionExpressionPlainGenerator = s(FunctionExpression,
		[ 'params', [Identifier], 'body', BlockStatement ], { id: null, generator: true }),
	FunctionExpressionThunk = s(FunctionExpression, [ 'body', BlockStatement ], {
		id: null,
		params: [],
		generator: false
	}),
	FunctionExpressionThunkGenerator = s(FunctionExpression, [ 'body', BlockStatement ], {
		id: null,
		params: [],
		generator: true
	}),
	PropertyInit = s(Property, [ 'key', Expression, 'value', Expression ], { kind: 'init' }),
	PropertyGet = s(Property, [ 'key', Expression, 'value', Expression ], { kind: 'get' }),
	MemberExpressionComputed = s(MemberExpression,
		[ 'object', Expression, 'property', Expression ], { computed: true }),
	MemberExpressionIdentifier = s(MemberExpression,
		[ 'object', Expression, 'property', Literal ], { computed: false })

const LitTrue = Literal(true)

export const
	assignmentExpressionPlain = s(AssignmentExpression,
		[ 'left', Pattern, 'right', Expression ], { operator: '=' }),
	callExpressionThunk = s(CallExpression,
		[ 'callee', Expression ], { arguments: [] }),
	functionExpressionPlain = (params, body, generator) =>
		(generator ? FunctionExpressionPlainGenerator : FunctionExpressionPlain)(params, body),
	functionExpressionThunk = (body, generator) =>
		(generator ? FunctionExpressionThunkGenerator : FunctionExpressionThunk)(body),
	variableDeclarationConst =
		s(VariableDeclaration, [ 'declarations', [VariableDeclarator] ], { kind: 'const' }),
	unaryExpressionNegate =
		s(UnaryExpression, [ 'argument', Expression ], { operator: '-' }),
	switchStatementOnTrue = s(SwitchStatement, [ 'cases', [SwitchCase] ], {
		discriminant: LitTrue,
		// May contain nested variable declarations
		lexical: true
	}),
	whileStatementInfinite = s(WhileStatement, [ 'body', Statement ], { test: LitTrue }),
	binaryExpressionPlus = s(BinaryExpression,
		[ 'left', Expression, 'right', Expression ], { operator: '+' }),
	property = (kind, key, value) => {
		if (kind === 'init')
			return PropertyInit(key, value)
		else {
			assert(kind === 'get')
			return PropertyGet(key, value)
		}
	},
	memberExpression = (object, property) =>
		property.type === 'Identifier' ?
			MemberExpressionIdentifier(object, property) :
			MemberExpressionComputed(object, property),
	yieldExpressionNoDelegate = s(YieldExpression, [ 'argument', Expression ], { delegate: false }),
	yieldExpressionDelegate = s(YieldExpression, [ 'argument', Expression ], { delegate: true })
