import { assert } from './util'

// TODO
export const Nullable = _ => _
export const Union = (a, b) => b

export const typeToString = type => {
	if (type instanceof Function)
		return type.name
	if (type instanceof Set)
		return `${toArray(type).map(_ => `'${_}'`).join(' | ')}`
	if (type instanceof Array) {
		assert(type.length === 1)
		return `[${typeToString(type[0])}]`
	}
	return type.toString()
}

const toArray = iter => {
	const out = []
	for (let em of iter)
		out.push(em)
	return out
}
