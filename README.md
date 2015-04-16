Data structures for [EcmaScript syntax trees](https://github.com/estree/estree).

Includes renderer and uses [acorn](https://github.com/marijnh/acorn/) for parsing.


## Install

### Bower/RequireJS

 	bower install --save andy-hanson/esast

To use it:

	require.config({
		paths: {
			esast: "bower_components/esast/dist"
		}
	})

	// Later...
	define([ "esast/ast", "esast/render" ], (ast, render) => {
		const four = BinaryExpression('+', Literal(2), Literal(2))
		render(four)
	})

### Npm/Node

	npm install --save andy-hanson/esast

To use it:

	import { BinaryExpression, Literal } from 'esast/dist/ast'
	import render from 'esast/dist/render'
	const four = BinaryExpression('+', Literal(2), Literal(2))
	render(four)


## Use

### Node Types

See [the docs](https://github.com/andy-hanson/esast/blob/master/doc.md).

Constructors are called by passing in their values in order, e.g.

	// if (1) 1

	IfStatement(Literal(1), Literal(1))


### Source Maps

When building an AST from source code, you may want to attach `loc` property.

	import { Literal } from 'esast/dist/ast'
	import Loc, { Pos } from 'esast/dist/Loc'
	import { renderWithSourceMap } from 'esast/dist/render'

	// Lines are 1-indexed, columns are 0-indexed.
	const ast = Literal(5)
	ast.loc = Loc(Pos(1, 0), Pos(1, 5))
	const { code, map } = renderWithSourceMap(ast, 'inFileName', 'outFileName.js')


### fromJson

This converts a JSON ast to an esast version.
You can go the other way with `ast.toJSON()`.


### Parse

This takes the same options as [acorn](https://github.com/marijnh/acorn/).
In fact, it's just acorn that gets converted to the esast format.

	import 'esast/dist/parse'
	const ast = parse('1', { /* options */ })


## Render times

	./gulp perf-test

Name | Render time | Render time with source maps
:-: | :-: | :-:
esast | 1.6ms | 16.8ms
[escodegen](https://github.com/estools/escodegen) | 8.2ms | 145ms
[esotope](https://github.com/inikulin/esotope) | 2.6ms | N/A

Keep in mind that `fromJson` takes up about 7ms.


## Build

	npm install
	./gulp all

