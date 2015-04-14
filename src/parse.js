import { parse as acornParse } from 'acorn'
import fromJSON from './fromJSON'

export default src => {
	const json = acornParse(src, {
		ecmaVersion: 6,
		sourceType: 'module'
	})
	return fromJSON(json)
}
