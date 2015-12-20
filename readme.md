Data structures for JavaScript syntax trees, based on the [estree](https://github.com/estree/estree) spec.

Esast trees can be passed to any function expecting an estree.
They add type safety and are more convenient to construct.

Esast is ideal for generating JavaScript code.
Don't output a string directly; it's bug-prone and makes it hard to support [source maps](https://github.com/mozilla/source-map). Construct an estree and let it take care of [rendering](https://github.com/esast/esast-render-fast) for you.


## Install

	npm install --save esast/esast
	# or:
	bower install --save esast/esast


## Use

	import {BinaryExpression, LiteralNumber} from 'esast/lib/Expression'
	const four = new BinaryExpression('+', new LiteralNumber(2), new LiteralNumber(2))
	console.log(four)


## Documentation

HTML documentation coming soon!
For now, see [AST](https://github.com/esast/esast/blob/master/src/ast.ts) and [Loc](https://github.com/esast/esast/blob/master/src/Loc.ts) documentation.


## Other libraries

[op](https://github.com/esast/op): Essential to handling optional subtrees.

For compilers:
* [esast-render-fast](https://github.com/esast/esast-render-fast): Simple renderer, supporting source maps.
* [esast-create-util](https://github.com/esast/esast-create-util): Utilities for constructing esast trees.

Other:
* [esast-from-json](https://github.com/esast/esast-from-json)


## Source Maps

There is a `loc` property on every esast Node.
You can ignore it, but you'll need it to support source maps.

	import {Literal} from 'esast/lib/ast'
	import Loc, {Pos} from 'esast/lib/Loc'
	import {renderWithSourceMap} from 'esast-render-fast/lib/render'
	import {loc} from 'esast-create-util/lib/util'

	const ast = loc(new Literal(5), new Loc(Pos.start, new Pos(1, 5)))
	console.log(renderWithSourceMap(ast, 'inFileName', 'outFileName.js'))

If you're writing a compiler, generate `Loc`s while lexing, attach them to tokens, and attach them to your own ASTs while parsing.
Then when transpiling, copy the `loc` from your AST to the esast Node corresponding to it.
(Not all Nodes need a loc; when it is missing, a node will be assumed to have the loc of its parent.)


## Contribute

Please make an issue if there's anything you'd like added or changed.
