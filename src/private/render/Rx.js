import { Node } from '../../ast'
import { isEmpty, type } from '../util'
import { SourceNode } from './source-map/source-node'
import { SourceMapGenerator } from './source-map/source-map-generator'
import { Pos, StartColumn, StartLine } from '../../Loc'

export default class Rx {
	constructor(inFilePath, outFilePath) {
		this.indentStr = ''
		this.strParts = [ ]

		this.usingSourceMaps = inFilePath !== undefined
		if (this.usingSourceMaps) {
			this.inFilePath = inFilePath
			this.map = new SourceMapGenerator({
				file: outFilePath
				// skipValidation: true
			})
			this.line = StartLine
			this.column = StartColumn

			this.lastMappedAst = null
		}
	}

	finish() {
		return this.strParts.join('')
	}

	e(ast) {
		this.curAst = ast
		ast.render(this)
	}

	// str may not contain newlines.
	o(str) {
		this._o(str)
		this._mapStr(str)
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

	paren(asts) {
		this.o('(')
		this.interleave(asts, ', ')
		this.o(')')
	}

	block(lines, lineSeparator) {
		if (isEmpty(lines))
			this.o('{ }')
		else {
			lineSeparator = lineSeparator
			this.o('{')
			this.indent(() => {
				this.nl()
				const maxI = lines.length - 1
				for (let i = 0; i < maxI; i = i + 1) {
					this.e(lines[i])
					this.o(lineSeparator)
					this.nl()
				}
				this.e(lines[maxI])
			})
			this.nl()
			this.o('}')
		}
	}

	lines(lines) {
		const maxI = lines.length - 1
		for (let i = 0; i < maxI; i = i + 1) {
			this.e(lines[i])
			this.o(';')
			this.nl()
		}
		this.e(lines[maxI])
	}

	indent(doIndented) {
		const oldIndent = this.indentStr
		this.indentStr = this.indentStr + '\t'
		doIndented()
		this.indentStr = oldIndent
	}

	nl() {
		this._o('\n')
		this._mapNewLine()
		this.o(this.indentStr)
	}

	// Private

	_o(str) {
		this.strParts.push(str)
	}

	_mapStr(str) {
		if (this.usingSourceMaps) {
			if (this.curAst.loc && this.curAst !== this.lastMappedAst) {
				this.map.addMapping({
					source: this.inFilePath,
					original: this.curAst.loc.start,
					generated: Pos(this.line, this.column)
				})
				this.lastMappedAst = this.curAst
			}
			this.column = this.column + str.length
		}
	}

	_mapNewLine() {
		if (this.usingSourceMaps) {
			this.line = this.line + 1
			this.column = StartColumn
			// Mappings end at end of line.
			this.lastMappedAst = null
		}
	}
}
