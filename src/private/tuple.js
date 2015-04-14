import { assert, pAdd } from './util'

export default (name, superType, ...namesTypes) => {
	let props = [ ]
	assert(namesTypes.length % 2 === 0)
	for (let i = 0; i < namesTypes.length; i = i + 2)
		props.push({ name: namesTypes[i], type: namesTypes[i + 1] })
	let args = props.map(_ => _.name).join(', ')

	let body = `return function ${name}(${args}) {
	if (!(this instanceof ${name}))
		return new ${name}(${args});
`

	props.forEach(({ name }) => {
		body = body +
			`this.${name} = ${name}; if (this.${name} === undefined) this.${name} = null;\n\t`
	})
	body = body + 'this.postConstruct()\n}'
	const ctr = Function(body)()
	ctr.prototype = Object.assign(Object.create(superType.prototype), {
		constructor: ctr,
		toString() { return JSON.stringify(this, null, '\t') },
		// Default is to do nothing. May be overridden.
		postConstruct() { },
		toJSON() {
			const obj = { }
			obj.type = this.type
			Object.keys(this).sort().forEach(key => { obj[key] = this[key] })
			return obj
		}
	})

	ctr.props = props

	return ctr
}
