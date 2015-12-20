import Op from 'op/Op'
import Identifier from './Identifier'
import Node from './Node'
import {enumerable} from './private/util'

/** Can go in a parameter list or on the left side of an assignment. */
interface Pattern extends Node {
	// Make this a nominal type.
	isPattern(): void
}
export default Pattern
export function isPattern(_: Node): _ is Pattern {
	return 'isPattern' in _
}

/**
`{ a, b: c } =`
Object deconstructing pattern.
*/
export class ObjectPattern extends Node implements Pattern {
	constructor(public properties: Array<AssignmentProperty>) {
		super()
	}

	isPattern(): void {}
}

/**
Part of an ObjectPattern.
Just like a Property, but kind is always `init`.
Although technically its own type, `_.type` will be 'Property'.
*/
export class AssignmentProperty extends Node {
	constructor(public key: Identifier, public value: Pattern = key) {
		super()
	}

	@enumerable get type(): string {
		return 'Property'
	}

	@enumerable get kind(): string {
		return 'init'
	}

	@enumerable get method(): boolean {
		return false
	}

	@enumerable get shorthand(): boolean {
		return this.value === this.key
	}

	@enumerable get computed(): boolean {
		return false
	}
}

/**
`[ a, b ] = ...`.
Array deconstructing pattern.
*/
export class ArrayPattern extends Node implements Pattern {
	constructor(public elements: Array<Op<Pattern>>) {
		super()
	}

	isPattern(): void {}
}

/**
Can be the last argument to a FunctionExpression/FunctionDeclaration
or  go at the end of an ArrayPattern.
*/
export class RestElement extends Node implements Pattern {
	constructor(public argument: Pattern) {
		super()
	}

	isPattern(): void {}
}

// todo: AssignmentPattern
