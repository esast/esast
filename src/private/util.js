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

	isEmpty = arr =>
		arr.length === 0,

	last = arr => {
		assert(!isEmpty(arr))
		return arr[arr.length - 1]
	}
