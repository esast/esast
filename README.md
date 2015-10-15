Data structures for [EcmaScript syntax trees](https://github.com/estree/estree).
Includes super-fast renderer.

This is ideal for languages compiling to JavaScript.
Rather than outputting a string directly, just call esast constructors and call `render` at the end.

See documentation [here](https://doc.esdoc.org/github.com/mason-lang/esast/).


## Get Started

	npm install --save mason-lang/esast
	# or:
	bower install --save mason-lang/esast

To use it:

	import {BinaryExpression, Literal} from 'esast/dist/ast'
	import render from 'esast/dist/render'
	const four = new BinaryExpression('+', new Literal(2), new Literal(2))
	console.log(render(four))


### Source Maps

When building an AST from source code, you should attach the `loc` property after construction.

	import {Literal} from 'esast/dist/ast'
	import Loc, {Pos} from 'esast/dist/Loc'
	import {renderWithSourceMap} from 'esast/dist/render'
	import {loc} from 'esast/dist/util'

	// Lines are 1-indexed, columns are 0-indexed.
	// See `StartLine` and `StartColumn` exports of Loc.js.
	const ast = loc(new Literal(5), new Loc(Pos(1, 0), Pos(1, 5)))
	console.log(renderWithSourceMap(ast, 'inFileName', 'outFileName.js'))

If you're writing a compiler, you'll want to keep track of the Loc while you're lexing
and later move those Locs into esast.


### fromJson

This converts an ast object to an esast version.
You can go the other way with `ast.toJSON()`.
This helps esast interact with other ast tools.
If you want to parse, you could use [acorn](https://github.com/marijnh/acorn) and do:

	import {parse} from 'acorn'
	import fromJson from 'esast/dist/fromJson'
	const ast = fromJson(parse(src, options))


## Render times

	npm run perf-test

Name | Render time | Render time with source maps
:-: | :-: | :-:
esast | 1.5ms | 17ms
[escodegen](https://github.com/estools/escodegen) | 7ms | 120ms
[esotope](https://github.com/inikulin/esotope) | 2.5ms | not supported

Keep in mind that `fromJson` takes about 6ms for this example.
