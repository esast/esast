import * as Ast from './ast'
import Loc, { Pos } from './Loc'
import { Nullable } from './private/type'

export default json => {
	if (typeof json === 'string')
		json = JSON.parse(json)
	return fromJsonObject(json)
}

const fromJsonObject = json => {
	const obj = make[json.type](json)
	const loc = json.loc
	if (loc !== undefined)
		obj.loc = Loc(posFromJson(loc.start), posFromJson(loc.end))
	return obj
}

const posFromJson = _ => Pos(_.line, _.column)

const typeCtr = (type, prop) =>
	type instanceof Array ?
		`${prop}.map(function(_) { return ${typeCtr(type[0], '_')} })` :
		// TODO:KLUDGE for Literal
		type === Object ?
		prop :
		(type === String || type === Boolean || type instanceof Set) ?
		prop :
		type instanceof Nullable ?
		`${prop} == null ? null : ${typeCtr(type.type, prop)}` :
		type.isTuple ?
		`make.${type.name}(${prop})` :
		`fromJsonObject(${prop})`

const makeFromJson = tuple => {
	const parts = tuple.props.map(({ name, type }) => typeCtr(type, `_.${name}`))
	const src = `return function(_) { return new tuple(${parts.join(', ')}) }`
	return Function('tuple', 'fromJsonObject', 'make', src)(tuple, fromJsonObject, make)
}

const make = { }
Object.keys(Ast).forEach(function(key) {
	const tuple = Ast[key]
	if (tuple.isTuple)
		make[key] = makeFromJson(tuple)
})
Object.freeze(make)
