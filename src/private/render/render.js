import * as EsAst from '../../ast'
import { assert, implementMany, isEmpty } from '../util'
import { SourceNode } from './source-map/source-node'
import Rx from './Rx'

// TODO: 'modulePath' parameter is kludge
export default (ast, inFilePath, outFilePath) => {
	const node = new Rx(inFilePath).render(ast)
	return outFilePath === undefined ?
		new SourceNode(null, null, null, node).toString() :
		node.toStringWithSourceMap({ file: outFilePath })
}

const rCall = (_, rx) => {
	rx.e(_.callee)
	rx.o('(')
	rx.interleave(_.arguments, ', ')
	rx.o(')')
}

implementMany(EsAst, 'render', {
	Program: (_, rx) => rx.interleave(_.body, rx.snl),
	Identifier: (_, rx) => rx.o(_.name),
	BlockStatement: (_, rx) => rx.block(_.body, rx.snl),
	FunctionExpression(_, rx) {
		rx.o(_.generator ? 'function*' : 'function')
		if (_.id) {
			rx.o(' ')
			rx.e(_.id)
		}
		rx.o('(')
		rx.interleave(_.params, ', ')
		rx.o(') ')
		rx.e(_.body)
	},
	Literal(_, rx) {
		if (_.value === null)
			rx.o('null')
		else if (typeof _.value === 'string')
			rx.o(strEscape(_.value))
		else
			rx.o(_.value.toString())
	},
	ThisExpression: (_, rx) => rx.o('this'),
	ArrayExpression(_, rx) {
		rx.o('[ ')
		rx.interleave(_.elements, ', ')
		rx.o(' ]')
	},
	Property(_, rx) {
		if (_.kind === 'init') {
			rx.e(_.key)
			rx.o(': ')
			rx.e(_.value)
		} else {
			assert(_.kind === 'get')
			rx.o('get ')
			rx.e(_.key)
			rx.o('() ')
			assert(_.value instanceof EsAst.FunctionExpression)
			assert(_.value.id === null && isEmpty(_.value.params) && !_.value.generator)
			rx.e(_.value.body)
		}
	},
	ObjectExpression: (_, rx) => {
		if (isEmpty(_.properties))
			rx.o('{}')
		else
			rx.block(_.properties, rx.cnl)
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
	UnaryExpression: (_, rx) => unary(rx, _.operator, _.argument),
	BinaryExpression: (_, rx) => binary(rx, _.operator, _.left, _.right),
	AssignmentExpression: (_, rx) => binary(rx, _.operator, _.left, _.right),
	YieldExpression(_, rx) {
		rx.o('(')
		unary(rx, _.delegate ? 'yield*' : 'yield', _.argument)
		rx.o(')')
	},
	VariableDeclarator(_, rx) {
		rx.e(_.id)
		rx.o(' = ')
		if (_.init)
			rx.e(_.init)
	},
	VariableDeclaration(_, rx) {
		rx.o(_.kind)
		rx.o(' ')
		rx.interleave(_.declarations, ', ')
	},
	ReturnStatement: (_, rx) => unary(rx, 'return', _.argument),
	ThrowStatement: (_, rx) => unary(rx, 'throw', _.argument),
	LabeledStatement: (_, rx) => binary(rx, ': ', _.label, _.body),
	WhileStatement(_, rx) {
		rx.o('while (')
		rx.e(_.test)
		rx.o(') ')
		rx.e(_.body)
	},
	DebuggerStatement: (_, rx) => rx.o('debugger'),
	ExpressionStatement: (_, rx) => rx.e(_.expression),
	IfStatement(_, rx) {
		rx.o('if (')
		rx.e(_.test)
		rx.o(') ')
		rx.e(_.consequent)
		if (_.alternate) {
			rx.o(' else ')
			rx.e(_.alternate)
		}
	},
	BreakStatement(_, rx) {
		rx.o('break')
		if (_.label) {
			rx.o(' ')
			rx.e(_.label)
		}
	},
	SwitchCase(_, rx) {
		if (_.test) {
			rx.o('case ')
			rx.e(_.test)
		}
		else
			rx.o('default')
		rx.o(':')
		if (_.consequent.length === 1) {
			rx.o(' ')
			rx.e(_.consequent[0])
		} else {
			rx.indent(() => {
				rx.o(rx.nl)
				rx.interleave(_.consequent, rx.snl)
			})
			rx.o(rx.nl)
		}
	},
	SwitchStatement(_, rx) {
		rx.o('switch (')
		rx.e(_.discriminant)
		rx.o(') ')
		rx.block(_.cases, rx.nl)
	}
})

const unary = (rx, kind, argument) => {
	rx.o(kind)
	rx.o(' ')
	rx.e(argument)
}

const binary = (rx, kind, left, right) => {
	rx.e(left)
	rx.o(' ')
	rx.o(kind)
	rx.o(' ')
	rx.e(right)
}


const strEscape = str =>
	`"${str.replace(/[\\"\n\t]/g, ch => strEscapes[ch])}"`
const strEscapes = {
	'\\': '\\\\',
	'"': '\\"',
	'\n': '\\n',
	'\t': '\\t'
}
