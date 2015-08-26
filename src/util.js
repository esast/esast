import { ArrowFunctionExpression, Declaration, ExpressionStatement, FunctionExpression,
	Identifier, Literal, MemberExpression, Statement } from './ast'
import mangleIdentifier, { propertyNameOk } from './mangle-identifier'

const nameToId = new Map()
const propertyToIdOrLiteral = new Map()

export const
	escapeStringForLiteral = str =>
		str.replace(/[\\"\n\t\b\f\v\r\u2028\u2029]/g, ch => literalEscapes[ch]),

	idCached = name => {
		let _ = nameToId.get(name)
		if (_ === undefined) {
			_ = new Identifier(mangleIdentifier(name))
			nameToId.set(name, _)
		}
		return _
	},

	loc = (ast, loc) => {
		ast.loc = loc
		return ast
	},

	member = (object, propertyName) =>
		new MemberExpression(object, propertyIdOrLiteralCached(propertyName)),

	propertyIdOrLiteralCached = propertyName => {
		let _ = propertyToIdOrLiteral.get(propertyName)
		if (_ === undefined) {
			_ = propertyNameOk(propertyName) ?
				new Identifier(propertyName) :
				new Literal(propertyName)
			propertyToIdOrLiteral.set(propertyName, _)
		}
		return _
	},

	functionExpressionThunk = (body, generator) =>
		generator ?
			new FunctionExpression(null, [ ], body, true) :
			new ArrowFunctionExpression([ ], body),

	thunk = value =>
		new ArrowFunctionExpression([ ], value),

	toStatement = _ =>
		(_ instanceof Statement || _ instanceof Declaration) ? _ : new ExpressionStatement(_)

const
	literalEscapes = {
		'\\': '\\\\',
		'"': '\\"',
		'\n': '\\n',
		'\t': '\\t',
		'\b': '\\b',
		'\f': '\\f',
		'\v': '\\v',
		'\r': '\\r',
		'\u2028': '\\u2028',
		'\u2029': '\\u2029'
	}
