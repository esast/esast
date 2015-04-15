import { parse as acornParse } from 'acorn'
import fromJSON from './fromJSON'

export default (src, opts) => {
	opts = Object.assign({}, baseOpts, opts)
	const json = acornParse(src, opts)
	return fromJSON(json)
}
const baseOpts = {
	ecmaVersion: 6,
	locations: true,
	sourceType: 'module'
}

