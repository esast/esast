import {Suite} from 'benchmark'
import {generate as escodegen} from 'escodegen'
import {generate as esotope} from 'esotope'
import fs from 'fs'
import {parse as acornParse} from 'acorn'
import fromJson from '../dist/fromJson'
import render, {renderWithSourceMap} from '../dist/render'
import parse from './parse'

const test = tests => {
	const suite = new Suite()
	Object.keys(tests).forEach(name =>
		suite.add(name, tests[name]))
	suite.on('complete', function() {
		this.forEach(_ =>
			console.log(`${_.name}: ${_.stats.mean * 1000}ms`))
	})
	suite.on('error', err => {
		throw err.target.error
	})
	suite.run()
}

export default () => {
	const src = fs.readFileSync('./node_modules/escodegen/escodegen.js', 'utf-8')
	const json = acornParse(src, {
		ecmaVersion: 6,
		locations: true,
		sourceType: 'module'
	})
	const ast = parse(src)

	render(ast)

	// acorn compilation + Benchmark metaprogramming causes errors if I don't do this.
	const escg = escodegen, estp = esotope, fj = fromJson
	test({
		esast: () => render(ast, {ugly: true}),
		'esast with maps': () => renderWithSourceMap(ast, 'in', 'out.js', {ugly: true}),
		escodegen: () => escg(json),
		'escodegen with maps': () => escg(json, {sourceMap: 'in', sourceMapWithCode: true}),
		esotope: () => estp(json),
		fromJson: () => fj(json)
	})
}
