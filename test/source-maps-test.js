import assert from 'assert'
import Loc, { Pos } from '../dist/Loc'
import parse from '../dist/parse'
import { renderWithSourceMap } from '../dist/render'
import { equal } from './util'

global.describe('source maps', () => {
	global.it('parse', () => {
		const src = 'debugger;\n1'
		const ast = parse(src)
		assert(equal(ast.loc, new Loc(new Pos(1, 0), new Pos(2, 1))))
		const { code, sourceMap } = renderWithSourceMap(ast, 'inFileName', 'outFileName.js')
		assert(code === src)

		assert(equal(sourceMap, {
			version: 3,
			sources: [ 'inFileName' ],
			names: [],
			mappings: 'AAAA;AACA',
			file: 'outFileName.js'
		}))
	})
})
