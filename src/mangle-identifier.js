export default name =>
	forbiddenNames.has(name) ?
		'_' + name :
		name.replace(/[^a-zA-Z0-9$_]/g, _ => '_' + _.charCodeAt(0))

export const
	needsMangle = name =>
		forbiddenNames.has(name) || !propertyNameOk(name),

	propertyNameOk = name =>
		name.search(/[^a-zA-Z0-9$_]/) === -1

export const
	unmangle = name => {
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

const forbiddenNames = new Set([
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
	'global',
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
