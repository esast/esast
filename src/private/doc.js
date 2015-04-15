import * as ast from '../ast'
import { typeToString } from './type'

export default () => {
	let str = ''
	const add = added => { str = str + added }

	Object.keys(ast).forEach(function(name) {
		const _ = ast[name]
		if (_.doc === undefined)
			return

		add(`## ${_}\n\n`)

		if (_.props !== undefined)
			_.props.forEach(({ name, type }) =>
				add(`\t${name}: ${typeToString(type)}\n`))
		else
			add('(abstract type)\n')

		add(`\n${_.doc}\n\n`)
	})

	return str
}
