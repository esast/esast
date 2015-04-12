import { assert } from './util'

export default (name, superType, ...namesTypes) => {
	let names = []
	assert(namesTypes.length % 2 === 0)
	for (let i = 0; i < namesTypes.length; i = i + 2)
		names.push(namesTypes[i])
	let args = names.join(', ')

	let body = `return function ${name}(${args}) {
	if (!(this instanceof ${name}))
		return new ${name}(${args});
`
	names.forEach(name => {
		body = body + `this.${name} = ${name};\n\t`
	})
	body = body + '}'
	const ctr = Function(body)()
	ctr.prototype = Object.assign(Object.create(superType.prototype), {
		constructor: ctr,
		toString() { return inspect(this) }
	})
	return ctr
}

const inspect = _ => {
	const indented = str => str.replace(/\n/g, '\n\t')

	let s = (_.constructor.displayName || _.constructor.name) + ' {'
	Object.keys(_).forEach(key => {
		const val = _[key]
		const str = val instanceof Array ? val.join(',\n') : val.toString()
		s = s + `\n\t${key}: ${indented(str)}`
	})
	return s + '\n}'
}
