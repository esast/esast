import { BlockStatement, Declaration, ExpressionStatement, Identifier, Literal,
	ReturnStatement, Statement } from './ast'
import mangleIdentifier, { propertyNameOk } from './mangle-identifier'
import { functionExpressionThunk, memberExpression } from './specialize'

const nameToId = new Map()
const propertyToIdOrLiteral = new Map()

export const
	idCached = name => {
		let _ = nameToId.get(name)
		if (_ === undefined) {
			_ = Identifier(mangleIdentifier(name))
			nameToId.set(name, _)
		}
		return _
	},

	loc = (ast, loc) => {
		ast.loc = loc
		return ast
	},

	member = (object, propertyName) =>
		memberExpression(object, propertyIdOrLiteralCached(propertyName)),

	propertyIdOrLiteralCached = propertyName => {
		let _ = propertyToIdOrLiteral.get(propertyName)
		if (_ === undefined) {
			_ = propertyNameOk(propertyName) ? Identifier(propertyName) : Literal(propertyName)
			propertyToIdOrLiteral.set(propertyName, _)
		}
		return _
	},

	// TODO:ES6 arrow functions
	thunk = value =>
		functionExpressionThunk(BlockStatement([ ReturnStatement(value) ]), false),

	toStatement = _ =>
		(_ instanceof Statement || _ instanceof Declaration) ? _ : ExpressionStatement(_)
