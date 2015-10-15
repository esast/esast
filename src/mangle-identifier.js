/**
Convert a name to a valid JavaScript identifier.
@param {String} name Can be any string.
@return {String}
*/
export default function mangleIdentifier(name) {
	return forbiddenNames.has(name) ?
		`_${name}` :
		name.replace(/[^a-zA-Z0-9$_]/g, _ => `_${_.charCodeAt(0)}`)
}

/** `false` iff `name` is a valid JavaScript identifier. */
export function needsMangle(name) {
	return forbiddenNames.has(name) || !propertyNameOk(name)
}

/** `true` iff `name` can be used as a property name using dot syntax (`a.b`). */
export function propertyNameOk(name) {
	return name.search(/[^a-zA-Z0-9$_]/) === -1
}

/** Undoes {@link mangleIdentifier}. */
export function unmangle(name) {
	if (name[0] === '_') {
		const rest = name.slice(1)
		if (forbiddenNames.has(rest))
			return rest
	}
	return name.replace(/_\d+/g, match => {
		const charCode = match.slice(1)
		const n = Number.parseInt(charCode)
		const ch = String.fromCharCode(n)
		return ch === '\0' ? match : ch
	})
}

/** Set of JavaScript keywords. */
export const forbiddenNames = new Set([
	'abstract',
	'arguments',
	'boolean',
	'break',
	'byte',
	'case',
	'catch',
	'char',
	'class',
	'comment',
	'const',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'double',
	'else',
	'enum',
	'eval',
	'export',
	'extends',
	'false',
	'final',
	'finally',
	'float',
	'for',
	'function',
	'function*',
	'goto',
	'if',
	'implements',
	'import',
	'in',
	'instanceOf',
	'int',
	'interface',
	'label',
	'long',
	'module',
	'native',
	'new',
	'null',
	'package',
	'private',
	'protected',
	'public',
	'return',
	'short',
	'static',
	'super',
	'switch',
	'synchronized',
	'this',
	'throw',
	'throws',
	'transient',
	'true',
	'try',
	'typeof',
	'var',
	'void',
	'while',
	'with',
	'yield'
])
