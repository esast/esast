import { Nullable } from 'tupl/dist/type'
import * as Ast from './ast'
import Loc, { Pos } from './Loc'

const
	typeCtr = (type, val) =>
		type instanceof Array ?
			`${val}.map(function(_) { return ${typeCtr(type[0], '_')} })` :
			// TODO: KLUDGE for Literal
			type === Object ?
			val :
			// Set means a set of possible strings
			(type === String || type === Boolean || type instanceof Set) ?
			val :
			type instanceof Nullable ?
			`${val} == null ? null : ${typeCtr(type.type, val)}` :
			type.isTuple ?
			// This is created inside fromJsonObject.
			`from${type.name}(${val})` :
			`fromJsonObject(${val})`,

	tupleCtr = (tuple, val) => {
		const parts = tuple.props.map(({ name, type }) => typeCtr(type, `${val}.${name}`))
		return `l(new ${tuple.name}(${parts.join(',')}), _.loc)`
	}

// We code-generate functions for each tuple using tupleCtr.
// Then we create a big switch statement choosing one of those functoins.
export default (() => {
	const tuples = Object.keys(Ast).map(key => Ast[key]).filter(_ => _.isTuple)

	// Copy loc information separately.
	let s = 'function l(obj, loc) { if (loc !== undefined) obj.loc = loc; return obj }\n'

	tuples.forEach(tuple =>
		s = s + `function from${tuple.name}(_) { return ${tupleCtr(tuple, '_')} }\n`)

	s = s + 'function fromJsonObject(_) {\nswitch (_.type)\n{'
	tuples.forEach(tuple =>
		s = s + `case "${tuple.name}": return from${tuple.name}(_)\n`)
	s = s + '}\nthrow new Error("Unrecognized type `"+_.type+"`.")\n}\nreturn fromJsonObject'

	return Function(...tuples.map(_ => _.name), s)(...tuples)
})()
