import { ESNode } from '../../ast'
import { isEmpty, type } from '../util'
import { SourceNode } from './source-map/source-node'

export default class Rx {
	constructor(inFilePath) {
		this.inFilePath = inFilePath
		this.indentStr = ''
	}

	render(ast) {
		const oldCur = this.cur
		this.cur = []
		ast.render(ast, this)
		const content = this.cur
		this.cur = oldCur
		if (ast.loc)
			return new SourceNode(
				ast.loc.start.line,
				ast.loc.start.column,
				this.inFilePath,
				content)
		else
			return content
	}

	e(ast) {
		type(ast, ESNode)
		this.cur.push(this.render(ast))
	}

	o(str) {
		type(str, String)
		this.cur.push(str)
	}

	interleave(asts, str) {
		if (!isEmpty(asts)) {
			const maxI = asts.length - 1
			for (let i = 0; i < maxI; i = i + 1) {
				this.e(asts[i])
				this.o(str)
			}
			this.e(asts[maxI])
		}
	}

	block(lines, lineSeparator) {
		lineSeparator = lineSeparator + '\t'
		this.o('{')
		this.indent(() => {
			this.o(this.nl)
			this.interleave(lines, lineSeparator)
		})
		this.o(this.nl)
		this.o('}')
	}

	indent(doIndented) {
		const oldIndent = this.indentStr
		this.indentStr = this.indentStr + '\t'
		doIndented()
		this.indentStr = oldIndent
	}

	get nl() {
		return `\n${this.indentStr}`
	}
	get cnl() {
		return `,\n${this.indentStr}`
	}
	get snl() {
		return `;\n${this.indentStr}`
	}
}
