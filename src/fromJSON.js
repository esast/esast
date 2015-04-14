import * as Ast from './ast'

export default json => {
	if (typeof json === 'string')
		json = JSON.parse(json)
	return fromJsonObject(json)
}

const fromJsonObject = json => {
	const type = Ast[json.type]
	if (type === undefined)
		throw new Error(`Unsupported type: ${json.type} for ${json}`)

	const obj = Object.create(type.prototype)
	type.props.forEach(({ name }) => {
		// TODO: Type check
		let _ = json[name]
		if (_ === undefined)
			_ = null
		else if (_ instanceof Array)
			_ = _.map(fromJsonObject)
		else if (typeof _ === 'object' && _ !== null)
			_ = fromJsonObject(_)
		obj[name] = _
	})
	return obj
}

