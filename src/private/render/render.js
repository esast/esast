import * as Ast from '../../ast'
import { assert, implementMany, isEmpty } from '../util'
import { SourceNode } from './source-map/source-node'
import Rx from './Rx'

export default ast => {
	const rx = new Rx()
	rx.e(ast)
	return rx.finish()
}

export const renderWithSourceMap = (ast, inFilePath, outFilePath) => {
	const rx = new Rx(inFilePath, outFilePath)
	rx.e(ast)
	return { code: rx.finish(), map: rx.map }
}

function rCall(rx) {
	rx.e(this.callee)
	rx.paren(this.arguments)
}

function forInOf(rx) {
	rx.o('for (')
	rx.e(this.left)
	rx.o(this instanceof Ast.ForInStatement ? ' in ' : ' of ')
	rx.e(this.right)
	rx.o(') ')
	rx.e(this.body)
}

function fun(rx) {
	rx.o(this.generator ? 'function*' : 'function')
	if (this.id !== null) {
		rx.o(' ')
		rx.e(this.id)
	}
	rx.paren(this.params)
	rx.o(' ')
	rx.e(this.body)
}

function arr(rx) {
	if (isEmpty(this.elements))
		rx.o('[ ]')
	else {
		rx.o('[ ')
		rx.interleave(this.elements, ', ')
		rx.o(' ]')
	}
}

function unary(rx, kind, argument) {
	rx.o(kind)
	rx.o(' ')
	rx.e(argument)
}

const binary = (rx, operator, left, right, noSpaces) => {
	rx.e(left)
	if (!noSpaces)
		rx.o(' ')
	rx.o(operator)
	if (!noSpaces)
		rx.o(' ')
	rx.e(right)
}

function rClass(rx) {
	rx.o('class ')
	if (this.id !== null)
		rx.e(this.id)
	if (this.superClass !== null) {
		rx.o(' extends ')
		rx.e(this.superClass)
	}
	rx.o(' ')
	rx.e(this.body)
}

const
	strEscape = str =>
		`"${str.replace(/[\\\"\n\t]/g, ch => strEscapes[ch])}"`,
	strEscapes = {
		'\\': '\\\\',
		'"': '\\"',
		'\n': '\\n',
		'\t': '\\t'
	}


implementMany(Ast, 'render', {
	Program(rx) {
		rx.lines(this.body)
	},

	Identifier(rx) {
		rx.o(this.name)
	},

	// Statements
	EmptyStatement() { },
	BlockStatement(rx) {
		rx.block(this.body, ';')
	},
	ExpressionStatement(rx) {
		rx.e(this.expression)
	},
	IfStatement(rx) {
		rx.o('if (')
		rx.e(this.test)
		rx.o(') ')
		rx.e(this.consequent)
		if (this.alternate !== null) {
			if (!(this.consequent instanceof Ast.BlockStatement))
				rx.o(';')
			rx.o(' else ')
			rx.e(this.alternate)
		}
	},
	LabeledStatement(rx) {
		binary(rx, ': ', this.label, this.body, true)
	},
	BreakStatement(rx) {
		rx.o('break')
		if (this.label !== null) {
			rx.o(' ')
			rx.e(this.label)
		}
	},
	ContinueStatement(rx) {
		rx.o('continue')
		if (this.label !== null) {
			rx.o(' ')
			rx.e(this.label)
		}
	},
	SwitchCase(rx) {
		if (this.test !== null) {
			rx.o('case ')
			rx.e(this.test)
		}
		else
			rx.o('default')
		rx.o(':')
		if (this.consequent.length === 1) {
			rx.o(' ')
			rx.e(this.consequent[0])
		} else
			rx.indent(() => {
				rx.nl()
				rx.lines(this.consequent)
			})
	},
	SwitchStatement(rx) {
		rx.o('switch (')
		rx.e(this.discriminant)
		rx.o(') ')
		rx.block(this.cases, '')
	},
	ReturnStatement(rx) {
		if (this.argument !== null)
			unary(rx, 'return', this.argument)
		else
			rx.o('return')
	},
	ThrowStatement(rx) {
		unary(rx, 'throw', this.argument)
	},
	CatchClause(rx) {
		rx.o(' catch (')
		rx.e(this.param)
		rx.o(') ')
		rx.e(this.body)
	},
	TryStatement(rx) {
		rx.o('try ')
		rx.e(this.block)
		if (this.handler !== null)
			rx.e(this.handler)
		if (this.finalizer !== null) {
			rx.o(' finally ')
			rx.e(this.finalizer)
		}
	},
	WhileStatement(rx) {
		rx.o('while (')
		rx.e(this.test)
		rx.o(') ')
		rx.e(this.body)
	},
	DoWhileStatement(rx) {
		rx.o('do ')
		rx.e(this.body)
		rx.o(' while (')
		rx.e(this.test)
		rx.o(')')
	},
	ForStatement(rx) {
		rx.o('for (')
		if (this.init !== null)
			rx.e(this.init)
		rx.o('; ')
		if (this.test !== null)
			rx.e(this.test)
		rx.o('; ')
		if (this.update !== null)
			rx.e(this.update)
		rx.o(') ')
		rx.e(this.body)
	},
	ForInStatement: forInOf,
	ForOfStatement: forInOf,
	DebuggerStatement(rx) {
		rx.o('debugger')
	},

	// Declarations
	FunctionDeclaration: fun,
	VariableDeclarator(rx) {
		rx.e(this.id)
		if (this.init !== null) {
			rx.o(' = ')
			rx.e(this.init)
		}
	},
	VariableDeclaration(rx) {
		rx.o(this.kind)
		rx.o(' ')
		rx.interleave(this.declarations, ', ')
	},

	// Expressions
	ThisExpression(rx) {
		rx.o('this')
	},
	ArrayExpression: arr,
	ObjectExpression(rx) {
		if (isEmpty(this.properties))
			rx.o('{ }')
		else
			rx.block(this.properties, ',')
	},
	Property(rx) {
		if (this.kind === 'init') {
			rx.e(this.key)
			rx.o(': ')
			rx.e(this.value)
		} else {
			assert(this.kind === 'get' || this.kind === 'set')
			rx.o(this.kind)
			rx.o(' ')
			rx.e(this.key)
			rx.paren(this.value.params)
			rx.o(' ')
			assert(this.value instanceof Ast.FunctionExpression)
			assert(this.value.id === null && !this.value.generator)
			rx.e(this.value.body)
		}
	},
	FunctionExpression: fun,
	ArrowFunctionExpression(rx) {
		if (this.params.length === 1 && this.params[0] instanceof Ast.Identifier)
			rx.e(this.params[0])
		else
			rx.paren(this.params)
		rx.o(' => ')
		rx.e(this.body)
	},
	SequenceExpression(rx) {
		rx.interleave(this.expressions, ', ')
	},
	UnaryExpression(rx) {
		unary(rx, this.operator, this.argument)
	},
	BinaryExpression(rx) {
		rx.o('(')
		binary(rx, this.operator, this.left, this.right)
		rx.o(')')
	},
	AssignmentExpression(rx) {
		binary(rx, this.operator, this.left, this.right)
	},
	UpdateExpression(rx) {
		if (this.prefix) {
			rx.o(this.operator)
			rx.e(this.argument)
		} else {
			rx.e(this.argument)
			rx.o(this.operator)
		}
	},
	LogicalExpression(rx) {
		rx.o('(')
		binary(rx, this.operator, this.left, this.right)
		rx.o(')')
	},
	ConditionalExpression(rx) {
		rx.e(this.test)
		rx.o(' ?')
		rx.indent(() => {
			rx.nl()
			rx.e(this.consequent)
			rx.o(' :')
			rx.nl()
			rx.e(this.alternate)
		})
	},
	NewExpression(rx) {
		rx.o('new ')
		rCall.call(this, rx)
	},
	CallExpression: rCall,
	MemberExpression(rx) {
		rx.e(this.object)
		if (this.computed) {
			rx.o('[')
			rx.e(this.property)
			rx.o(']')
		} else {
			rx.o('.')
			rx.e(this.property)
		}
	},
	YieldExpression(rx) {
		rx.o('(')
		unary(rx, this.delegate ? 'yield*' : 'yield', this.argument)
		rx.o(')')
	},
	Literal(rx) {
		if (this.value === null)
			rx.o('null')
		else if (typeof this.value === 'string')
			rx.o(strEscape(this.value))
		else
			rx.o(this.value.toString())
	},

	// Templates
	TemplateElement(rx) {
		rx.o(this.value.raw)
	},
	TemplateLiteral(rx) {
		rx.o('`')
		assert(this.quasis.length === this.expressions.length + 1)
		rx.e(this.quasis[0])
		for (let i = 0; i < this.expressions.length; i = i + 1)	 {
			rx.o('${')
			rx.e(this.expressions[i])
			rx.o('}')
			rx.e(this.quasis[i + 1])
		}
		rx.o('`')
	},
	TaggedTemplateExpression(rx) {
		rx.e(this.tag)
		rx.e(this.quasi)
	},

	// Patterns
	AssignmentProperty(rx) {
		rx.e(this.key)
		if (this.key !== this.value) {
			rx.o(': ')
			rx.e(this.value)
		}
	},
	ObjectPattern(rx) {
		rx.o('{ ')
		rx.interleave(this.properties, ', ')
		rx.o(' }')
	},
	ArrayPattern: arr,
	RestElement(rx) {
		rx.o('...')
		rx.e(this.argument)
	},

	MethodDefinition(rx) {
		if (this.static)
			rx.o('static ')

		const fun = this.value
		// TODO
		assert(!fun.generator)
		assert(fun.id === null)
		const params = fun.params
		const body = fun.body

		const rKey = () => {
			if (this.computed) {
				rx.o('[')
				rx.e(this.key)
				rx.o(']')
			} else
				rx.e(this.key)
		}

		switch (this.kind) {
			case 'constructor':
				assert(this.key instanceof Ast.Identifier && this.key.name === 'constructor')
				rx.o('constructor')
				break
			case 'method':
				rKey()
				break
			case 'get': case 'set':
				rx.o(this.kind)
				rx.o(' ')
				rKey()
				break
			default:
				throw new Error(this.kind)
		}

		rx.paren(params)
		rx.o(' ')
		rx.e(body)
	},

	ClassBody(rx) {
		rx.block(this.body, '')
	},

	ClassDeclaration: rClass,
	ClassExpression: rClass,

	ImportDeclaration(rx) {
		rx.o('import ')

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
			rx.e(def)
			needComma = true
		}
		if (namespace !== undefined) {
			if (needComma)
				rx.o(', ')
			rx.e(namespace)
			needComma = true
		}
		if (!isEmpty(specifiers)) {
			if (needComma)
				rx.o(', ')
			rx.o('{ ')
			rx.interleave(specifiers, ', ')
			rx.o(' }')
		}

		rx.o(' from ')
		rx.e(this.source)
	},
	ImportSpecifier(rx) {
		if (this.imported === this.local)
			rx.e(this.local)
		else {
			rx.e(this.imported)
			rx.o(' as ')
			rx.e(this.local)
		}
	},
	ImportDefaultSpecifier(rx) {
		rx.e(this.local)
	},
	ImportNamespaceSpecifier(rx) {
		rx.o('* as ')
		rx.e(this.local)
	},

	ExportSpecifier(rx) {
		rx.e(this.local)
		if (this.exported !== this.local) {
			rx.o(' as ')
			rx.e(this.exported)
		}
	},
	ExportNamedDeclaration(rx) {
		rx.o('export ')
		if (this.declaration !== null) {
			assert(isEmpty(this.specifiers))
			assert(this.source === null)
			rx.e(this.declaration)
		} else {
			rx.o('{ ')
			rx.interleave(this.specifiers, ', ')
			rx.o(' }')
			if (this.source !== null) {
				rx.o(' from ')
				rx.e(this.source)
			}
		}
	},
	ExportDefaultDeclaration(rx) {
		rx.o('export default ')
		rx.e(this.declaration)
	},
	ExportAllDeclaration(rx) {
		rx.o('export * from ')
		rx.e(this.source)
	}
})
