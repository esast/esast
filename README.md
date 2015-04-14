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


## Documentation

Forthcoming...

### Source Maps

...


## Build

	npm install
	./gulp all
