import assert from 'assert'
import mangle, {unmangle} from '../dist/mangle-identifier'

const tests = {
	'x-y': 'x_45y',
	'x!?': 'x_33_63',
	default: '_default'
}

describe('mangle', () => {
	Object.keys(tests).forEach(unmangled => {
		it(unmangled, () => {
			const mangled = tests[unmangled]
			assert.equal(mangled, mangle(unmangled))
			assert.equal(unmangled, unmangle(mangled))
		})
	})
})
