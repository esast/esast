import { BlockStatement, Declaration, ExpressionStatement, Identifier, Literal,
	ReturnStatement, Statement } from './ast'
import mangleIdentifier, { propertyNameOk } from './mangle-identifier'
import { functionExpressionThunk, memberExpression } from './specialize'

const nameToId = new Map()
const propertyToIdOrLiteral = new Map()

export const
	escapeStringForLiteral = str =>
		str.replace(/[\\"\n\t\b\f\v\r\u2028\u2029]/g, ch => literalEscapes[ch]),

	escapeStringForTemplate = str =>
		str.replace(/[{\\`\n\t\b\f\v\r\u2028\u2029]/g, ch => templateEscapes[ch]),

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
	},
	templateEscapes = {
		// Needed to make sure "${" is escaped.
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
