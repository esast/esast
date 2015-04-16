import assert from 'assert'
import { Literal } from '../dist/ast'
import Loc, { Pos } from '../dist/Loc'
import parse from '../dist/parse'
import { renderWithSourceMap } from '../dist/render'
import { dedent } from '../dist/private/util'
import { equal } from './util'

global.describe('source maps', () => {
	global.it('parse', () => {
		const src = 'debugger;\n1'
		const ast = parse(src)
		assert(equal(ast.loc, Loc(Pos(1, 0), Pos(2, 1))))
		const { code, map } = renderWithSourceMap(ast, 'inFileName', 'outFileName.js')
		assert(code === src)

		const jsonMap = JSON.parse(map.toString())
		assert(equal(jsonMap, {
			version: 3,
			sources: [ 'inFileName' ],
			names: [],
			// TODO: Shouldn't need first AAAA on second line.
			mappings: 'AAAA;AAAA,AACA',
			file: 'outFileName.js'
		}))
	})
})
