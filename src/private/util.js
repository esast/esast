export const
	assert = cond => {
		if (!cond)
			throw new Error('Assertion failed.')
	},

	implementMany = (holder, methodName, nameToImpl) => {
		Object.keys(nameToImpl).forEach(name => {
			holder[name].prototype[methodName] = nameToImpl[name]
		})
	},

	isEmpty = arr => arr.length === 0,
	last = arr => {
		assert(!isEmpty(arr))
		return arr[arr.length - 1]
	},

	pAdd = (obj, newName, newVal) => {
		if (Object.prototype.hasOwnProperty.call(obj, newName))
			throw new Error(`Already has property ${newName}, have ${Object.keys(obj)}`)
		const _ = clone(obj)
		_[newName] = newVal
		return _
	},

	// TODO: Support Sets and Unions
	type = (instance, itsType) => {
		if (!(itsType.prototype.isPrototypeOf(Object(instance))))
			throw new Error(`${instance} is not a ${itsType}.`)
	},

	// multi-line string literals like:
	// `
	//	a
	//		b
	//	c`
	// have too much indentation.
	// This will change it to "a\n\tb\nc" by detecting the first line's indentation.
	dedent = str => {
		if (str[0] !== '\n')
			return str

		str = str.slice(1)

		let indent
		for (indent = 0; indent < str.length; indent = indent + 1)
			if (str[indent] !== '\t')
				break

		const dedentedLines = str.split('\n').map(line => line.slice(indent))
		return dedentedLines.join('\n')
	},

	// TODO:ES6 Just use `new Set`
	newSet = setMembers => {
		const set = new Set()
		setMembers.forEach(_ => set.add(_))
		return set
	}

const clone = obj => {
	const nu = Object.create(Object.getPrototypeOf(obj))
	Object.getOwnPropertyNames(obj).forEach(name => {
		nu[name] = obj[name]
	})
	return nu
}
