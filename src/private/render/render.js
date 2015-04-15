import * as Ast from '../../ast'
import { assert, implementMany, isEmpty } from '../util'
import { SourceNode } from './source-map/source-node'
import Rx from './Rx'

export default ast => {
	const node = new Rx().render(ast)
	return new SourceNode(null, null, null, node).toString()
}

export const renderWithSourceMap = (ast, inFilePath, outFilePath) => {
	const node = new Rx(inFilePath).render(ast)
	return node.toStringWithSourceMap({ file: outFilePath })
}

const
	rCall = (_, rx) => {
		rx.e(_.callee)
		rx.paren(_.arguments)
	},

	forInOf = (_, rx) => {
		rx.o('for (')
		rx.e(_.left)
		rx.o(_ instanceof Ast.ForInStatement ? ' in ' : ' of ')
		rx.e(_.right)
		rx.o(') ')
		rx.e(_.body)
	},

	fun = (_, rx) => {
		rx.o(_.generator ? 'function*' : 'function')
		if (_.id !== null) {
			rx.o(' ')
			rx.e(_.id)
		}
		rx.paren(_.params)
		rx.o(' ')
		rx.e(_.body)
	},

	arr = (_, rx) => {
		if (isEmpty(_.elements))
			rx.o('[ ]')
		else {
			rx.o('[ ')
			rx.interleave(_.elements, ', ')
			rx.o(' ]')
		}
	},

	unary = (rx, kind, argument) => {
		rx.o(kind)
		rx.o(' ')
		rx.e(argument)
	},

	binaryLeftRight = (_, rx) => binary(rx, _.operator, _.left, _.right),

	binary = (rx, operator, left, right, noSpaces) => {
		rx.e(left)
		if (!noSpaces)
			rx.o(' ')
		rx.o(operator)
		if (!noSpaces)
			rx.o(' ')
		rx.e(right)
	},

	rClass = (_, rx) => {
		rx.o('class ')
		if (_.id !== null)
			rx.e(_.id)
		if (_.superClass !== null) {
			rx.o(' extends ')
			rx.e(_.superClass)
		}
		rx.o(' ')
		rx.e(_.body)
	},

	strEscape = str =>
		`"${str.replace(/[\\\"\n\t]/g, ch => strEscapes[ch])}"`,
	strEscapes = {
		'\\': '\\\\',
		'"': '\\"',
		'\n': '\\n',
		'\t': '\\t'
	}


implementMany(Ast, 'render', {
	Program: (_, rx) => rx.interleave(_.body, rx.snl),
	Identifier: (_, rx) => rx.o(_.name),

	// Statements
	EmptyStatement() { },
	BlockStatement: (_, rx) => rx.block(_.body, rx.snl),
	ExpressionStatement: (_, rx) => rx.e(_.expression),
	IfStatement(_, rx) {
		rx.o('if (')
		rx.e(_.test)
		rx.o(') ')
		rx.e(_.consequent)
		if (_.alternate !== null) {
			if (!(_.consequent instanceof Ast.BlockStatement))
				rx.o(';')
			rx.o(' else ')
			rx.e(_.alternate)
		}
	},
	LabeledStatement: (_, rx) => binary(rx, ': ', _.label, _.body, true),
	BreakStatement(_, rx) {
		rx.o('break')
		if (_.label !== null) {
			rx.o(' ')
			rx.e(_.label)
		}
	},
	ContinueStatement(_, rx) {
		rx.o('continue')
		if (_.label !== null) {
			rx.o(' ')
			rx.e(_.label)
		}
	},
	SwitchCase(_, rx) {
		if (_.test !== null) {
			rx.o('case ')
			rx.e(_.test)
		}
		else
			rx.o('default')
		rx.o(':')
		if (_.consequent.length === 1) {
			rx.o(' ')
			rx.e(_.consequent[0])
		} else
			rx.indent(() => {
				rx.o(rx.nl)
				rx.interleave(_.consequent, rx.snl)
			})
	},
	SwitchStatement(_, rx) {
		rx.o('switch (')
		rx.e(_.discriminant)
		rx.o(') ')
		rx.block(_.cases, rx.nl)
	},
	ReturnStatement(_, rx) {
		if (_.argument !== null)
			unary(rx, 'return', _.argument)
		else
			rx.o('return')
	},
	ThrowStatement: (_, rx) => unary(rx, 'throw', _.argument),
	CatchClause(_, rx) {
		rx.o(' catch (')
		rx.e(_.param)
		rx.o(') ')
		rx.e(_.body)
	},
	TryStatement(_, rx) {
		rx.o('try ')
		rx.e(_.block)
		if (_.handler !== null)
			rx.e(_.handler)
		if (_.finalizer !== null) {
			rx.o(' finally ')
			rx.e(_.finalizer)
		}
	},
	WhileStatement(_, rx) {
		rx.o('while (')
		rx.e(_.test)
		rx.o(') ')
		rx.e(_.body)
	},
	DoWhileStatement(_, rx) {
		rx.o('do ')
		rx.e(_.body)
		rx.o(' while (')
		rx.e(_.test)
		rx.o(')')
	},
	ForStatement(_, rx) {
		rx.o('for (')
		if (_.init !== null)
			rx.e(_.init)
		rx.o('; ')
		if (_.test !== null)
			rx.e(_.test)
		rx.o('; ')
		if (_.update !== null)
			rx.e(_.update)
		rx.o(') ')
		rx.e(_.body)
	},
	ForInStatement: forInOf,
	ForOfStatement: forInOf,
	DebuggerStatement: (_, rx) => rx.o('debugger'),

	// Declarations
	FunctionDeclaration: fun,
	VariableDeclarator(_, rx) {
		rx.e(_.id)
		if (_.init !== null) {
			rx.o(' = ')
			rx.e(_.init)
		}
	},
	VariableDeclaration(_, rx) {
		rx.o(_.kind)
		rx.o(' ')
		rx.interleave(_.declarations, ', ')
	},

	// Expressions
	ThisExpression: (_, rx) => rx.o('this'),
	ArrayExpression: arr,
	ObjectExpression: (_, rx) => {
		if (isEmpty(_.properties))
			rx.o('{ }')
		else
			rx.block(_.properties, rx.cnl)
	},
	Property(_, rx) {
		if (_.kind === 'init') {
			rx.e(_.key)
			rx.o(': ')
			rx.e(_.value)
		} else {
			assert(_.kind === 'get' || _.kind === 'set')
			rx.o(_.kind)
			rx.o(' ')
			rx.e(_.key)
			rx.paren(_.value.params)
			rx.o(' ')
			assert(_.value instanceof Ast.FunctionExpression)
			assert(_.value.id === null && !_.value.generator)
			rx.e(_.value.body)
		}
	},
	FunctionExpression: fun,
	ArrowFunctionExpression(_, rx) {
		if (_.params.length === 1 && _.params[0] instanceof Ast.Identifier)
			rx.e(_.params[0])
		else
			rx.paren(_.params)
		rx.o(' => ')
		rx.e(_.body)
	},
	SequenceExpression: (_, rx) => rx.interleave(_.expressions, ', '),
	UnaryExpression: (_, rx) => unary(rx, _.operator, _.argument),
	BinaryExpression: binaryLeftRight,
	AssignmentExpression: binaryLeftRight,
	UpdateExpression: (_, rx) => {
		if (_.prefix) {
			rx.o(_.operator)
			rx.e(_.argument)
		} else {
			rx.e(_.argument)
			rx.o(_.operator)
		}
	},
	LogicalExpression: binaryLeftRight,
	ConditionalExpression(_, rx) {
		rx.e(_.test)
		rx.o(' ?')
		rx.indent(() => {
			rx.o(rx.nl)
			rx.e(_.consequent)
			rx.o(' :')
			rx.o(rx.nl)
			rx.e(_.alternate)
		})
	},
	NewExpression(_, rx) {
		rx.o('new ')
		rCall(_, rx)
	},
	CallExpression: rCall,
	MemberExpression(_, rx) {
		rx.e(_.object)
		if (_.computed) {
			rx.o('[')
			rx.e(_.property)
			rx.o(']')
		} else {
			rx.o('.')
			rx.e(_.property)
		}
	},
	YieldExpression(_, rx) {
		rx.o('(')
		unary(rx, _.delegate ? 'yield*' : 'yield', _.argument)
		rx.o(')')
	},
	Literal(_, rx) {
		if (_.value === null)
			rx.o('null')
		else if (typeof _.value === 'string')
			rx.o(strEscape(_.value))
		else
			rx.o(_.value.toString())
	},

	// Patterns
	AssignmentProperty(_, rx) {
		rx.e(_.key)
		if (_.key !== _.value) {
			rx.o(': ')
			rx.e(_.value)
		}
	},
	ObjectPattern(_, rx) {
		rx.o('{ ')
		rx.interleave(_.properties, ', ')
		rx.o(' }')
	},
	ArrayPattern: arr,
	RestElement(_, rx) {
		rx.o('...')
		rx.e(_.argument)
	},

	MethodDefinition(_, rx) {
		if (_.static)
			rx.o('static ')

		const fun = _.value
		// TODO
		assert(!fun.generator)
		assert(fun.id === null)
		const params = fun.params
		const body = fun.body

		const rKey = () => {
			if (_.computed) {
				rx.o('[')
				rx.e(_.key)
				rx.o(']')
			} else
				rx.e(_.key)
		}

		switch (_.kind) {
			case 'constructor':
				assert(_.key instanceof Ast.Identifier && _.key.name === 'constructor')
				rx.o('constructor')
				break
			case 'method':
				rKey()
				break
			case 'get': case 'set':
				rx.o(_.kind)
				rx.o(' ')
				rKey()
				break
			default:
				throw new Error(_.kind)
		}

		rx.paren(params)
		rx.o(' ')
		rx.e(body)
	},

	ClassBody(_, rx) {
		rx.block(_.body, '\n')
	},

	ClassDeclaration: rClass,
	ClassExpression: rClass,

	ImportDeclaration(_, rx) {
		rx.o('import ')

		let def, namespace
		let specifiers = []
		_.specifiers.forEach(s => {
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
		rx.e(_.source)
	},
	ImportSpecifier(_, rx) {
		if (_.imported === _.local)
			rx.e(_.local)
		else {
			rx.e(_.imported)
			rx.o(' as ')
			rx.e(_.local)
		}
	},
	ImportDefaultSpecifier(_, rx) {
		rx.e(_.local)
	},
	ImportNamespaceSpecifier(_, rx) {
		rx.o('* as ')
		rx.e(_.local)
	},

	ExportSpecifier(_, rx) {
		rx.e(_.local)
		if (_.exported !== _.local) {
			rx.o(' as ')
			rx.e(_.exported)
		}
	},
	ExportNamedDeclaration(_, rx) {
		rx.o('export ')
		if (_.declaration !== null) {
			assert(isEmpty(_.specifiers))
			assert(_.source === null)
			rx.e(_.declaration)
		} else {
			rx.o('{ ')
			rx.interleave(_.specifiers, ', ')
			rx.o(' }')
			if (_.source !== null) {
				rx.o(' from ')
				rx.e(_.source)
			}
		}
	},
	ExportDefaultDeclaration(_, rx) {
		rx.o('export default ')
		rx.e(_.declaration)
	},
	ExportAllDeclaration(_, rx) {
		rx.o('export * from ')
		rx.e(_.source)
	}
})
