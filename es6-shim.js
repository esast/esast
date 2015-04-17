'use strict'
if (!Object.assign)
	Object.assign = function(target, firstSource) {
		if (target === undefined || target === null)
			throw new TypeError('Cannot convert first argument to object')
		const to = Object(target)
		for (let i = 1; i < arguments.length; i++) {
			var nextSource = arguments[i]
			if (nextSource === undefined || nextSource === null)
				continue
			nextSource = Object(nextSource)
				const keysArray = Object.keys(Object(nextSource))
			for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
				const nextKey = keysArray[nextIndex]
				const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey)
				if (desc !== undefined && desc.enumerable)
					to[nextKey] = nextSource[nextKey]
			}
		}
		return to
	}
