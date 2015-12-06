import {SourceMapGenerator} from 'source-map/dist/source-map.min'
import * as Ast from './ast'
import {ArrowFunctionExpression, BlockStatement, Identifier, ImportDefaultSpecifier,
	ImportNamespaceSpecifier, Literal} from './ast'
import {Pos, StartColumn, StartLine} from './Loc'

/**
Creates JavaScript source code from a {@link Node}.
@param {Node} ast
@param {object} options
@param {boolean} options.ugly
	If true, will not output any whitespace.
*/
export default function render(ast, options) {
	// TODO:ES6 Optional args
	if (options === undefined)
		options = {}

	setUp(options)
	e(ast)
	const res = strOut
	tearDown()
	return res
}

/**
Same as {@link render}, but with a source map as part of the output.
@param {Node} ast
@param {string} inFilePath Name of input file.
@param {string} outFilePath Name of output file.
@param {object} options Same options as for {@link render}.
@return {code: string, sourceMap: string}
*/
export function renderWithSourceMap(ast, inFilePath, outFilePath, options) {
	// TODO:ES6 Optional args
	if (options === undefined)
		options = {}

	setUp(options, inFilePath, outFilePath)
	e(ast)
	const res = {code: strOut, sourceMap: sourceMap.toJSON()}
	tearDown()
	return res
}

// Must init these all before rendering.
let strOut,
	indentAmount, indentStr,
	usingSourceMaps, curAst, inFilePath, sourceMap, outLine, outColumn, lastMappedAst,
	// options
	ugly

function setUp(options, inPath, outPath) {
	ugly = Boolean(options.ugly)

	indentAmount = 0
	_setIndent()
	strOut = ''
	usingSourceMaps = inPath !== undefined
	if (usingSourceMaps) {
		inFilePath = inPath
		sourceMap = new SourceMapGenerator({file: outPath})
		outLine = StartLine
		outColumn = StartColumn
		lastMappedAst = null
	}
}

function tearDown() {
	strOut = ''
	inFilePath = sourceMap = curAst = lastMappedAst = undefined
}

// Renders a single expression.
function e(ast) {
	if (usingSourceMaps)
		curAst = ast
	ast.render()
}

// Outputs a string.
// str may not contain newlines.
function o(str) {
	strOut = strOut + str
	if (usingSourceMaps)
		_mapStr(str)
}

function interleave(asts, str) {
	if (!isEmpty(asts)) {
		const maxI = asts.length - 1
		for (let i = 0; i < maxI; i = i + 1) {
			e(asts[i])
			o(str)
		}
		e(asts[maxI])
	}
}

function paren(asts) {
	o('(')
	interleave(asts, ',')
	o(')')
}

function block(blockLines, lineSeparator) {
	if (isEmpty(blockLines))
		o('{}')
	else {
		o('{')
		indent()
		nl()
		lines(blockLines, lineSeparator)
		unindent()
		nl()
		o('}')
	}
}

function lines(lines, lineSeparator) {
	if (lines.length > 0) {
		const maxI = lines.length - 1
		for (let i = 0; i < maxI; i = i + 1) {
			e(lines[i])
			o(lineSeparator)
			nl()
		}
		e(lines[maxI])
	}
}

const indentStrs = ['']
function _setIndent() {
	indentStr = indentStrs[indentAmount]
	while (indentStr === undefined) {
		indentStrs.push(`${last(indentStrs)}\t`)
		indentStr = indentStrs[indentAmount]
	}
}

function indent() {
	if (!ugly) {
		indentAmount = indentAmount + 1
		_setIndent()
	}
}

function unindent() {
	if (!ugly) {
		indentAmount = indentAmount - 1
		_setIndent()
	}
}

function nl() {
	if (!ugly) {
		strOut = `${strOut}\n${indentStr}`
		if (usingSourceMaps)
			_mapNewLine()
	}
}

// Private
function _mapStr(str) {
	if (curAst !== lastMappedAst && curAst.loc !== undefined) {
		sourceMap.addMapping({
			source: inFilePath,
			original: curAst.loc.start,
			generated: new Pos(outLine, outColumn)
		})
		lastMappedAst = curAst
	}
	outColumn = outColumn + str.length
}
function _mapNewLine() {
	outLine = outLine + 1
	outColumn = StartColumn + indentAmount
	// Mappings end at end of line. Must begin anew.
	lastMappedAst = null
}

// Implementations used more than once

function fun() {
	o(this.generator ? 'function*' : 'function')
	if (this.id !== null) {
		o(' ')
		e(this.id)
	}
	paren(this.params)
	e(this.body)
}

function arr() {
	if (isEmpty(this.elements))
		o('[]')
	else {
		o('[')
		interleave(this.elements, ',')
		o(']')
	}
}

function rClass() {
	o('class ')
	if (this.id !== null)
		e(this.id)
	if (this.superClass !== null) {
		o(' extends ')
		e(this.superClass)
	}
	e(this.body)
}

const
	forInOf = (_, kind) => {
		o('for(')
		e(_.left)
		o(kind)
		e(_.right)
		o(')')
		e(_.body)
	}

const
	implementMany = (holder, methodName, nameToImpl) => {
		Object.keys(nameToImpl).forEach(name => {
			holder[name].prototype[methodName] = nameToImpl[name]
		})
	},

	isEmpty = arr =>
		arr.length === 0,

	last = arr =>
		arr[arr.length - 1]

implementMany(Ast, 'render', {
	Program() {
		lines(this.body, ';')
	},

	Identifier() {
		o(this.name)
	},

	// Statements
	EmptyStatement() { },
	BlockStatement() {
		block(this.body, ';')
	},
	ExpressionStatement() {
		e(this.expression)
	},
	IfStatement() {
		o('if(')
		e(this.test)
		o(')')
		e(this.consequent)
		if (this.alternate !== null) {
			if (!(this.consequent instanceof BlockStatement))
				o(';')
			o(' else ')
			e(this.alternate)
		}
	},
	LabeledStatement() {
		e(this.label)
		o(':')
		e(this.body)
	},
	BreakStatement() {
		o('break')
		if (this.label !== null) {
			o(' ')
			e(this.label)
		}
	},
	ContinueStatement() {
		o('continue')
		if (this.label !== null) {
			o(' ')
			e(this.label)
		}
	},
	SwitchCase() {
		if (this.test === null)
			o('default')
		else {
			o('case ')
			e(this.test)
		}
		o(':')
		switch (this.consequent.length) {
			case 0:
				break
			case 1:
				e(this.consequent[0])
				break
			default:
				indent()
				nl()
				lines(this.consequent, ';')
				unindent()
		}
	},
	SwitchStatement() {
		o('switch(')
		e(this.discriminant)
		o(')')
		block(this.cases, '')
	},
	ReturnStatement() {
		if (this.argument === null)
			o('return')
		else {
			o('return ')
			e(this.argument)
		}
	},
	ThrowStatement() {
		o('throw ')
		e(this.argument)
	},
	CatchClause() {
		o('catch(')
		e(this.param)
		o(')')
		e(this.body)
	},
	TryStatement() {
		o('try ')
		e(this.block)
		if (this.handler !== null)
			e(this.handler)
		if (this.finalizer !== null) {
			o('finally')
			e(this.finalizer)
		}
	},
	WhileStatement() {
		o('while(')
		e(this.test)
		o(')')
		e(this.body)
	},
	DoWhileStatement() {
		o('do ')
		e(this.body)
		if (!(this.body instanceof BlockStatement))
			o(';')
		o(' while(')
		e(this.test)
		o(')')
	},
	ForStatement() {
		o('for(')
		if (this.init !== null)
			e(this.init)
		o(';')
		if (this.test !== null)
			e(this.test)
		o(';')
		if (this.update !== null)
			e(this.update)
		o(')')
		e(this.body)
	},
	ForInStatement() {
		forInOf(this, ' in ')
	},
	ForOfStatement() {
		forInOf(this, ' of ')
	},
	DebuggerStatement() {
		o('debugger')
	},

	// Declarations
	FunctionDeclaration: fun,
	VariableDeclarator() {
		e(this.id)
		if (this.init !== null) {
			o('=')
			e(this.init)
		}
	},
	VariableDeclaration() {
		o(this.kind)
		o(' ')
		interleave(this.declarations, ',')
	},

	// Expressions
	ThisExpression() {
		o('this')
	},
	ArrayExpression: arr,
	ObjectExpression() {
		if (isEmpty(this.properties))
			o('{}')
		else
			block(this.properties, ',')
	},
	Property() {
		const outputKey = () => {
			if (this.computed) {
				o('[')
				e(this.key)
				o(']')
			} else
				e(this.key)
		}
		const outputFun = () => {
			outputKey()
			paren(this.value.params)
			e(this.value.body)
		}

		if (this.kind === 'init')
			if (this.method) {
				if (this.value.generator)
					o('*')
				outputFun()
			} else {
				outputKey()
				o(':')
				e(this.value)
			}
		else {
			o(this.kind)
			o(' ')
			outputFun()
		}
	},
	FunctionExpression: fun,
	ArrowFunctionExpression() {
		if (this.params.length === 1 && this.params[0] instanceof Identifier)
			e(this.params[0])
		else
			paren(this.params)
		o('=>')
		e(this.body)
	},
	SequenceExpression() {
		interleave(this.expressions, ',')
	},
	UnaryExpression() {
		o(this.operator)
		o(' ')
		e(this.argument)
	},
	BinaryExpression() {
		o('(')
		e(this.left)
		o(this.operator === 'instanceof' ? ' instanceof ' : this.operator)
		e(this.right)
		o(')')
	},
	AssignmentExpression() {
		e(this.left)
		o(this.operator)
		e(this.right)
	},
	UpdateExpression() {
		if (this.prefix) {
			o(this.operator)
			e(this.argument)
		} else {
			e(this.argument)
			o(this.operator)
		}
	},
	LogicalExpression() {
		o('(')
		e(this.left)
		o(this.operator)
		e(this.right)
		o(')')
	},
	ConditionalExpression() {
		o('(')
		e(this.test)
		o('?')
		e(this.consequent)
		o(':')
		e(this.alternate)
		o(')')
	},
	NewExpression() {
		o('new (')
		e(this.callee)
		o(')')
		paren(this.arguments)
	},
	CallExpression() {
		if (this.callee instanceof ArrowFunctionExpression) {
			o('(')
			e(this.callee)
			o(')')
		} else
			e(this.callee)
		paren(this.arguments)
	},
	SpreadElement() {
		o('...')
		e(this.argument)
	},
	MemberExpression() {
		e(this.object)
		if (this.computed) {
			o('[')
			e(this.property)
			o(']')
		} else {
			if (this.object instanceof Literal &&
				typeof this.object.value === 'number' &&
				this.object.value === (this.object.value | 0))
				o('..')
			else
				o('.')
			e(this.property)
		}
	},
	YieldExpression() {
		if (this.argument === null)
			o('(yield)')
		else {
			o(this.delegate ? '(yield* ' : '(yield ')
			if (this.argument !== null)
				e(this.argument)
			o(')')
		}
	},
	Literal() {
		if (typeof this.value === 'string') {
			o('"')
			o(escapeStringForLiteral(this.value))
			o('"')
		} else
			o(this.value === null ? 'null' : this.value.toString())
	},

	// Templates
	TemplateElement() {
		o(this.value.raw)
	},
	TemplateLiteral() {
		o('`')
		e(this.quasis[0])
		for (let i = 0; i < this.expressions.length; i = i + 1)	 {
			o('${')
			e(this.expressions[i])
			o('}')
			e(this.quasis[i + 1])
		}
		o('`')
	},
	TaggedTemplateExpression() {
		e(this.tag)
		e(this.quasi)
	},

	// Patterns
	AssignmentProperty() {
		e(this.key)
		if (this.key !== this.value) {
			o(':')
			e(this.value)
		}
	},
	ObjectPattern() {
		o('{')
		interleave(this.properties, ',')
		o('}')
	},
	ArrayPattern: arr,
	RestElement() {
		o('...')
		e(this.argument)
	},

	MethodDefinition() {
		if (this.static)
			o('static ')

		const fun = this.value
		const params = fun.params
		const body = fun.body

		const rKey = () => {
			if (this.computed) {
				o('[')
				e(this.key)
				o(']')
			} else
				e(this.key)
		}

		if (fun.generator)
			o('*')
		switch (this.kind) {
			case 'constructor':
				o('constructor')
				break
			case 'method':
				rKey()
				break
			case 'get': case 'set':
				o(this.kind)
				o(' ')
				rKey()
				break
			default:
				throw new Error(this.kind)
		}

		paren(params)
		e(body)
	},

	ClassBody() {
		block(this.body, '')
	},

	ClassDeclaration: rClass,
	ClassExpression: rClass,

	ImportDeclaration() {
		o('import ')

		let def, namespace
		const specifiers = []
		for (const s of this.specifiers)
			if (s instanceof ImportDefaultSpecifier)
				if (def === undefined)
					def = s
				else
					throw new Error('Multiple default imports')
			else if (s instanceof ImportNamespaceSpecifier)
				if (namespace === undefined)
					namespace = s
				else
					throw new Error('Multiple namespace imports')
			else
				// ImportSpecifier
				specifiers.push(s)

		let needComma = false
		if (def !== undefined) {
			e(def)
			needComma = true
		}
		if (namespace !== undefined) {
			if (needComma)
				o(',')
			e(namespace)
			needComma = true
		}
		if (!isEmpty(specifiers)) {
			if (needComma)
				o(',')
			o('{')
			interleave(specifiers, ',')
			o('}')
		}

		o(' from ')
		e(this.source)
	},
	ImportSpecifier() {
		if (this.imported === this.local)
			e(this.local)
		else {
			e(this.imported)
			o(' as ')
			e(this.local)
		}
	},
	ImportDefaultSpecifier() {
		e(this.local)
	},
	ImportNamespaceSpecifier() {
		o('* as ')
		e(this.local)
	},

	ExportSpecifier() {
		e(this.local)
		if (this.exported !== this.local) {
			o(' as ')
			e(this.exported)
		}
	},
	ExportNamedDeclaration() {
		o('export ')
		if (this.declaration === null) {
			o('{')
			interleave(this.specifiers, ',')
			o('}')
			if (this.source !== null) {
				o(' from ')
				e(this.source)
			}
		} else
			e(this.declaration)
	},
	ExportDefaultDeclaration() {
		o('export default ')
		e(this.declaration)
	},
	ExportAllDeclaration() {
		o('export * from ')
		e(this.source)
	}
})

function escapeStringForLiteral(str) {
	return str.replace(/[\\"\n\t\b\f\v\r\u2028\u2029]/g, ch => literalEscapes.get(ch))
}

const literalEscapes = new Map([
	['\\', '\\\\'],
	['"', '\\"'],
	['\n', '\\n'],
	['\t', '\\t'],
	['\b', '\\b'],
	['\f', '\\f'],
	['\v', '\\v'],
	['\r', '\\r'],
	['\u2028', '\\u2028'],
	['\u2029', '\\u2029']])
