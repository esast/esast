import {ArrowFunctionExpression, Declaration, ExpressionStatement, FunctionExpression,
	Identifier, Literal, MemberExpression, Statement} from './ast'
import mangleIdentifier, {propertyNameOk} from './mangle-identifier'

/**
Mangles name and makes an {@link Identifier}.
@param {string} name
@return {Identifier}
*/
export function identifier(name) {
	return new Identifier(mangleIdentifier(name))
}

/**
Assigns `loc` to `ast` and returns it.
@param {Node} ast
@param {Loc} loc
*/
export function loc(ast, loc) {
	ast.loc = loc
	return ast
}

/**
Creates a member expression for `propertyName` in `object`,
using dot syntax (`a.b`) if possible, and falling back to `a['b']`.
@param {Node} object
@param {string} propertyName
@return {MemberExpression}
*/
export function member(object, propertyName) {
	return new MemberExpression(object, propertyIdOrLiteral(propertyName))
}

/**
An Identifier if propertyName is a valid JavaScript property name;
otherwise a Literal string.
@param {string} propertyName
@return {Identifier|Literal}
*/
export function propertyIdOrLiteral(propertyName) {
	return propertyNameOk(propertyName) ?
		new Identifier(propertyName) :
		new Literal(propertyName)
}

/**
Convert any {@link Node} into one that can be used as the content of a line.
(esast requires all expression lines to be wrapped with {@link ExpressionStatement}.)
*/
export function toStatement(ast) {
	return ast instanceof Statement || ast instanceof Declaration ?
		ast :
		new ExpressionStatement(ast)
}
