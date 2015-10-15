import {parse as acornParse} from 'acorn'
import fromJson from '../dist/fromJson'

/**
Parses source code.
@param {string} src JavaScript source code.
@param {object} options Options for [acorn](https://github.com/marijnh/acorn).
@return {Node}
*/
export default function parse(src, options) {
	// TODO:ES6 Optional args
	if (options === undefined)
		options = {}
	options = Object.assign({}, baseOpts, options)
	return fromJson(acornParse(src, options))
}
const baseOpts = {
	ecmaVersion: 6,
	locations: true,
	sourceType: 'module'
}
