import Op from 'op/Op/'
import {BlockStatement} from './Statement'
import Declaration from './Declaration'
import Expression from './Expression'
import Identifier from './Identifier'
import Node from './Node'
import Pattern from './Pattern'

export interface Function extends Node {
	// Make this a nominal type.
	isFunction(): void

	// todo: abstract getters
	// abstract get id(): Op<Identifier>
	// abstract get params(): Array<Pattern>
	// abstract get body(): Expression | BlockStatement
	// abstract get async(): boolean
	// abstract get generator(): boolean
}
export function isFunction(_: Node): _ is Function {
	return 'isFunction' in _
}

export interface FunctionNonArrow extends Function {
	// Make this a nominal type.
	isFunctionNonArrow(): void

	// todo: abstract getters
	// abstract get params(): Array<Pattern>
	// abstract get body(): BlockStatement
	// abstract get id: Op<Identifier>
	// abstract get generator: boolean
	// abstract get async: boolean
}
export function isFunctionNonArrow(_: Node): _ is FunctionNonArrow {
	return 'isFunctionNonArrow' in _
}

/** [[Function]] in declaration position. */
export class FunctionDeclaration extends Declaration implements FunctionNonArrow {
	generator: boolean
	async: boolean

	constructor(
		public id: Identifier,
		public params: Array<Pattern>,
		public body: BlockStatement,
		options: {generator?: boolean, async?: boolean} = {}) {
		super()
		this.generator = Boolean(options.generator)
		this.async = Boolean(options.async)
	}

	isFunction(): void {}
	isFunctionNonArrow(): void {}
}

/** [[Function]] in expression position. */
export class FunctionExpression extends Expression implements FunctionNonArrow {
	generator: boolean
	async: boolean

	constructor(
		public id: Op<Identifier>,
		public params: Array<Pattern>,
		public body: BlockStatement,
		options: {generator?: boolean, async?: boolean} = {}) {
		super()
		this.generator = Boolean(options.generator)
		this.async = Boolean(options.async)
	}

	isFunction(): void {}
	isFunctionNonArrow(): void {}
}

/** Like FunctionExpression but uses the `params => body` form. */
export class ArrowFunctionExpression extends Expression implements Function {
	constructor(public params: Array<Pattern>, public body: BlockStatement | Expression) {
		super()
	}

	isFunction(): void {}
}
