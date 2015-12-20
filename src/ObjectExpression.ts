import Expression from './Expression'
import {FunctionExpression} from './Function'
import Identifier from './Identifier'
import {LiteralNumber, LiteralString} from './Literal'
import Node from './Node'
import {enumerable} from './private/util'

/** An object literal. */
export default class ObjectExpression extends Expression {
	constructor(public properties: Array<Property>) {
		super()
	}
}

/** Part of an [[ObjectExpression]]. */
export abstract class Property extends Node {
	constructor(public name: PropertyName, public value: Expression) {
		super()
	}

	// todo: abstract getters
	// abstract get kind(): PropertyKind
	// abstract get method(): false

	@enumerable get key(): Expression {
		const {name} = this
		return name instanceof ComputedName ? name.value : name
	}

	@enumerable get computed(): boolean {
		return this.name instanceof ComputedName
	}

	@enumerable get type(): string {
		return 'Property'
	}

	@enumerable get shorthand(): boolean {
		return this.value === this.key
	}

	// overridden by PropertyMethod
	@enumerable get method(): boolean {
		return false
	}
}

export type PropertyKind = 'init' | 'get' | 'set'

export type PropertyName = Identifier | LiteralString | LiteralNumber | ComputedName

export class ComputedName {
	constructor(public value: Expression) {}
}

/** [[PropertyPlain]] or [[PropertyMethod]]. */
export abstract class PropertyInit extends Property {
	@enumerable get kind(): PropertyKind {
		return 'init'
	}
}

/** `name: value` */
export class PropertyPlain extends PropertyInit {
	constructor(name: PropertyName, value: Expression) {
		super(name, value)
	}
}

/** `name() { ... }` */
export class PropertyMethod extends PropertyInit {
	value: FunctionExpression

	constructor(name: PropertyName, value: FunctionExpression) {
		super(name, value)
	}

	@enumerable get method(): boolean {
		return true
	}
}

/** [[PropertyGet]] or [[PropertySet]]. */
export abstract class PropertyGetSet extends Property {
	value: FunctionExpression

	constructor(name: PropertyName, value: FunctionExpression) {
		super(name, value)
		if (value.id !== null)
			throw new Error('PropertyGetSet\'s value must not have id; that is stored in `key`.')
		if (value.async || value.generator)
			throw new Error('getter/setter can not be async/generator.')
	}
}

/** `get name() { ... }` */
export class PropertyGet extends PropertyGetSet {
	@enumerable get kind(): PropertyKind {
		return 'get'
	}
}

/** `set name(...) { ... }` */
export class PropertySet extends PropertyGetSet {
	constructor(name: PropertyName, value: FunctionExpression) {
		super(name, value)
		if (value.params.length !== 1)
			throw new Error('Setter should have 1 parameter.')
	}

	@enumerable get kind(): PropertyKind {
		return 'set'
	}
}
