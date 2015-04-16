import { parse as acornParse } from 'acorn'
import fromJson from './fromJson'

export default (src, opts) => {
	opts = Object.assign({}, baseOpts, opts)
	const json = acornParse(src, opts)
	return fromJson(json)
}
const baseOpts = {
	ecmaVersion: 6,
	locations: true,
	sourceType: 'module'
}
