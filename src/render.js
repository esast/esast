import { SourceMapGenerator } from 'source-map/lib/source-map/source-map-generator'
import * as Ast from './ast'
import { Pos, StartColumn, StartLine } from './Loc'
import { assert, implementMany, isEmpty, last, type } from './private/util'

export default ast => {
	type(ast, Ast.Node)
	init()
	e(ast)
	return strOut
}

export const renderWithSourceMap = (ast, inFilePath, outFilePath) => {
	type(ast, Ast.Node, inFilePath, String, outFilePath, String)
	init(inFilePath, outFilePath)
	e(ast)
	return { code: strOut, map: sourceMap }
}

// Must init these all before rendering.
let strOut,
	indentAmount, indentStr,
	usingSourceMaps, curAst, inFilePath, sourceMap, outLine, outColumn, lastMappedAst,
	// TODO: Option
	ugly = false

const
	// Renders a single expression.
	e = ast => {
		if (usingSourceMaps)
			curAst = ast
		ast.render()
	},

	// str may not contain newlines.
	o = str => {
		strOut = strOut + str
		_mapStr(str)
	},

	interleave = (asts, str) => {
		if (!isEmpty(asts)) {
			const maxI = asts.length - 1
			for (let i = 0; i < maxI; i = i + 1) {
				e(asts[i])
				o(str)
			}
			e(asts[maxI])
		}
	},

	paren = (asts) => {
		o('(')
		interleave(asts, ', ')
		o(')')
	},

	block = (lines, lineSeparator) => {
		if (isEmpty(lines))
			o('{ }')
		else {
			o('{')
			indent()
			nl()
			const maxI = lines.length - 1
			for (let i = 0; i < maxI; i = i + 1) {
				e(lines[i])
				o(lineSeparator)
				nl()
			}
			e(lines[maxI])
			unindent()
			nl()
			o('}')
		}
	},

	lines = lines => {
		const maxI = lines.length - 1
		for (let i = 0; i < maxI; i = i + 1) {
			e(lines[i])
			o(';')
			nl()
		}
		e(lines[maxI])
	},

	indentStrs = [ '' ],
	_setIndent = () => {
		indentStr = indentStrs[indentAmount]
		while (indentStr === undefined) {
			indentStrs.push(last(indentStrs) + '\t')
			indentStr = indentStrs[indentAmount]
		}
	},
	indent = () => {
		if (!ugly) {
			indentAmount = indentAmount + 1
			_setIndent()
		}
	},
	unindent = () => {
		if (!ugly) {
			indentAmount = indentAmount - 1
			_setIndent()
		}
	},

	nl = () => {
		if (!ugly) {
			strOut = strOut + '\n'
			_mapNewLine()
			o(indentStr)
		}
	},

	// Private

	_mapStr = str => {
		if (usingSourceMaps) {
			if (curAst !== lastMappedAst && curAst.loc !== undefined) {
				sourceMap.addMapping({
					source: inFilePath,
					original: curAst.loc.start,
					generated: Pos(outLine, outColumn)
				})
				lastMappedAst = curAst
			}
			outColumn = outColumn + str.length
		}
	},

	_mapNewLine = () => {
		if (usingSourceMaps) {
			outLine = outLine + 1
			outColumn = StartColumn
			// Mappings end at end of line. Must begin anew.
			lastMappedAst = null
		}
	},

	init = (inPath, outPath) => {
		indentAmount = 0
		_setIndent()
		strOut = ''
		usingSourceMaps = inPath !== undefined
		if (usingSourceMaps) {
			inFilePath = inPath
			sourceMap = new SourceMapGenerator({ file: outPath })
			outLine = StartLine
			outColumn = StartColumn
			lastMappedAst = null
		}
	}

function fun() {
	o(this.generator ? 'function*' : 'function')
	if (this.id !== null) {
		o(' ')
		e(this.id)
	}
	paren(this.params)
	o(' ')
	e(this.body)
}

function arr() {
	if (isEmpty(this.elements))
		o('[ ]')
	else {
		o('[ ')
		interleave(this.elements, ', ')
		o(' ]')
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
	o(' ')
	e(this.body)
}

const
	unary = (kind, argument) => {
		o(kind)
		o(' ')
		e(argument)
	},

	binary = (operator, left, right) => {
		e(left)
		if (!ugly)
			o(' ')
		o(operator)
		if (!ugly)
			o(' ')
		e(right)
	},

	call = _ => {
		e(_.callee)
		paren(_.arguments)
	},

	forInOf = (_, kind) => {
		o('for (')
		e(_.left)
		o(kind)
		e(_.right)
		o(') ')
		e(_.body)
	},

	strEscape = str =>
		`"${str.replace(/[\\\"\n\t]/g, ch => strEscapes[ch])}"`,
	strEscapes = {
		'\\': '\\\\',
		'"': '\\"',
		'\n': '\\n',
		'\t': '\\t',
		'\b': '\\b',
		'\f': '\\f',
		'\v': '\\v',
		'\r': '\\r',
		'\u2028': '\\u2028',
		'\u2029': '\\u2029'
	}

implementMany(Ast, 'render', {
	Program() {
		lines(this.body)
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
		o('if (')
		e(this.test)
		o(') ')
		e(this.consequent)
		if (this.alternate !== null) {
			if (!(this.consequent instanceof Ast.BlockStatement))
				o(';')
			o(' else ')
			e(this.alternate)
		}
	},
	LabeledStatement() {
		e(this.label)
		o(': ')
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
		if (this.test !== null) {
			o('case ')
			e(this.test)
		}
		else
			o('default')
		o(':')
		if (this.consequent.length === 1) {
			o(' ')
			e(this.consequent[0])
		} else {
			indent()
			nl()
			lines(this.consequent)
			unindent()
		}
	},
	SwitchStatement() {
		o('switch (')
		e(this.discriminant)
		o(') ')
		block(this.cases, '')
	},
	ReturnStatement() {
		if (this.argument !== null)
			unary('return', this.argument)
		else
			o('return')
	},
	ThrowStatement() {
		unary('throw', this.argument)
	},
	CatchClause() {
		o(' catch (')
		e(this.param)
		o(') ')
		e(this.body)
	},
	TryStatement() {
		o('try ')
		e(this.block)
		if (this.handler !== null)
			e(this.handler)
		if (this.finalizer !== null) {
			o(' finally ')
			e(this.finalizer)
		}
	},
	WhileStatement() {
		o('while (')
		e(this.test)
		o(') ')
		e(this.body)
	},
	DoWhileStatement() {
		o('do ')
		e(this.body)
		o(' while (')
		e(this.test)
		o(')')
	},
	ForStatement() {
		o('for (')
		if (this.init !== null)
			e(this.init)
		o('; ')
		if (this.test !== null)
			e(this.test)
		o('; ')
		if (this.update !== null)
			e(this.update)
		o(') ')
		e(this.body)
	},
	ForInStatement() { forInOf(this, ' in ') },
	ForOfStatement() { forInOf(this, ' of ') },
	DebuggerStatement() {
		o('debugger')
	},

	// Declarations
	FunctionDeclaration: fun,
	VariableDeclarator() {
		e(this.id)
		if (this.init !== null) {
			o(' = ')
			e(this.init)
		}
	},
	VariableDeclaration() {
		o(this.kind)
		o(' ')
		interleave(this.declarations, ', ')
	},

	// Expressions
	ThisExpression() {
		o('this')
	},
	ArrayExpression: arr,
	ObjectExpression() {
		if (isEmpty(this.properties))
			o('{ }')
		else
			block(this.properties, ',')
	},
	Property() {
		if (this.kind === 'init') {
			e(this.key)
			o(': ')
			e(this.value)
		} else {
			assert(this.kind === 'get' || this.kind === 'set')
			o(this.kind)
			o(' ')
			e(this.key)
			paren(this.value.params)
			o(' ')
			assert(this.value instanceof Ast.FunctionExpression)
			assert(this.value.id === null && !this.value.generator)
			e(this.value.body)
		}
	},
	FunctionExpression: fun,
	ArrowFunctionExpression() {
		if (this.params.length === 1 && this.params[0] instanceof Ast.Identifier)
			e(this.params[0])
		else
			paren(this.params)
		o(' => ')
		e(this.body)
	},
	SequenceExpression() {
		interleave(this.expressions, ', ')
	},
	UnaryExpression() {
		unary(this.operator, this.argument)
	},
	BinaryExpression() {
		o('(')
		binary(this.operator, this.left, this.right)
		o(')')
	},
	AssignmentExpression() {
		binary(this.operator, this.left, this.right)
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
		binary(this.operator, this.left, this.right)
		o(')')
	},
	ConditionalExpression() {
		e(this.test)
		o(' ?')
		indent()
		nl()
		e(this.consequent)
		o(' :')
		nl()
		e(this.alternate)
		unindent()
	},
	NewExpression() {
		o('new ')
		call(this)
	},
	CallExpression() { call(this) },
	MemberExpression() {
		e(this.object)
		if (this.computed) {
			o('[')
			e(this.property)
			o(']')
		} else {
			o('.')
			e(this.property)
		}
	},
	YieldExpression() {
		o('(')
		unary(this.delegate ? 'yield*' : 'yield', this.argument)
		o(')')
	},
	Literal() {
		if (this.value === null)
			o('null')
		else if (typeof this.value === 'string')
			o(strEscape(this.value))
		else
			o(this.value.toString())
	},

	// Templates
	TemplateElement() {
		o(this.value.raw)
	},
	TemplateLiteral() {
		o('`')
		assert(this.quasis.length === this.expressions.length + 1)
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
			o(': ')
			e(this.value)
		}
	},
	ObjectPattern() {
		o('{ ')
		interleave(this.properties, ', ')
		o(' }')
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
		// TODO
		assert(!fun.generator)
		assert(fun.id === null)
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

		switch (this.kind) {
			case 'constructor':
				assert(this.key instanceof Ast.Identifier && this.key.name === 'constructor')
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
		o(' ')
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
		let specifiers = []
		this.specifiers.forEach(s => {
			if (s instanceof Ast.ImportDefaultSpecifier)
				if (def === undefined)
					def = s
				else
					throw new Error('Multiple default imports')
			else if (s instanceof Ast.ImportNamespaceSpecifier)
				if (namespace === undefined)
					namespace = s
				else
					throw new Error('Multiple namespace imports')
			else {
				assert(s instanceof Ast.ImportSpecifier)
				specifiers.push(s)
			}
		})

		let needComma = false
		if (def !== undefined) {
			e(def)
			needComma = true
		}
		if (namespace !== undefined) {
			if (needComma)
				o(', ')
			e(namespace)
			needComma = true
		}
		if (!isEmpty(specifiers)) {
			if (needComma)
				o(', ')
			o('{ ')
			interleave(specifiers, ', ')
			o(' }')
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
		if (this.declaration !== null) {
			assert(isEmpty(this.specifiers))
			assert(this.source === null)
			e(this.declaration)
		} else {
			o('{ ')
			interleave(this.specifiers, ', ')
			o(' }')
			if (this.source !== null) {
				o(' from ')
				e(this.source)
			}
		}
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
