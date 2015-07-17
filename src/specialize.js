import tupl from 'tupl/dist/tupl'
import { Union } from 'tupl/dist/type'
import { ArrowFunctionExpression, AssignmentExpression, BlockStatement, CallExpression, Expression,
	FunctionExpression, Literal, MemberExpression, Pattern, Property, VariableDeclaration,
	VariableDeclarator, YieldExpression } from './ast'
import { assert } from './private/util'

const s = (superType, namesTypes, protoProps) => tupl(
	`${superType.name}Specialization`,
	superType,
	`specialization of ${superType}`,
	namesTypes,
	protoProps)
export default s

export const
	assignmentExpressionPlain = s(AssignmentExpression,
		[ 'left', Pattern, 'right', Expression ],
		{ operator: '=' }),

	callExpressionThunk = s(CallExpression,
		[ 'callee', Expression ],
		{ arguments: [] }),

	functionExpressionThunk = (body, generator) =>
		(generator ? FunctionExpressionThunkGenerator : ArrowFunctionExpressionThunk)(body),

	variableDeclarationConst = s(VariableDeclaration,
		[ 'declarations', [VariableDeclarator] ],
		{ kind: 'const' }),

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

	yieldExpressionNoDelegate = s(YieldExpression,
		[ 'argument', Expression ],
		{ delegate: false }),

	yieldExpressionDelegate = s(YieldExpression,
		[ 'argument', Expression ],
		{ delegate: true })

const
	ArrowFunctionExpressionThunk = s(ArrowFunctionExpression,
		[ 'body', Union(BlockStatement, Expression) ],
		{ params: [ ] }),
	FunctionExpressionThunkGenerator = s(FunctionExpression,
		[ 'body', BlockStatement ],
		{ id: null, params: [], generator: true }),
	PropertyInit = s(Property,
		[ 'key', Expression, 'value', Expression ],
		{ kind: 'init' }),
	PropertyGet = s(Property,
		[ 'key', Expression, 'value', Expression ],
		{ kind: 'get' }),
	MemberExpressionComputed = s(MemberExpression,
		[ 'object', Expression, 'property', Expression ],
		{ computed: true }),
	MemberExpressionIdentifier = s(MemberExpression,
		[ 'object', Expression, 'property', Literal ],
		{ computed: false })
