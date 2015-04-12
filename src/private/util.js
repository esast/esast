export const
	assert = cond => {
		if (!cond)
			throw new Error('Assertion failed.')
	},

	implementMany = (holder, methodName, nameToImpl) => {
		Object.keys(nameToImpl).forEach(name => {
			holder[name].prototype[methodName] = nameToImpl[name]
		})
		return (target, ...args) => target[methodName](target, ...args)
	},

	isEmpty = arr => arr.length === 0,

	pAdd = (obj, newName, newVal) => {
		if (Object.prototype.hasOwnProperty.call(obj, newName))
			throw new Error(`Already has property ${newName}, have ${Object.keys(obj)}`)
		const _ = clone(obj)
		_[newName] = newVal
		return _
	},

	type = (instance, itsType) => {
		if (!(itsType.prototype.isPrototypeOf(Object(instance))))
			throw new Error(`${instance} is not a ${itsType}.`)
	}

const clone = obj => {
	const nu = Object.create(Object.getPrototypeOf(obj))
	Object.getOwnPropertyNames(obj).forEach(name => {
		nu[name] = obj[name]
	})
	return nu
}
