import Op from 'op/Op'
import Identifier from './Identifier'
import Node from './Node'
import Declaration from './Declaration'
import Expression from './Expression'
import {FunctionExpression} from './Function'
import {ComputedName, PropertyName} from './ObjectExpression'
import {enumerable} from './private/util'

interface Class extends Node {
	id: Op<Identifier>
	superClass: Op<Expression>
	body: ClassBody
}
export default Class

// TODO: extends Declaration too
/** [[Class]] in declaration position. */
export class ClassDeclaration extends Declaration implements Class {
	constructor(
		public id: Identifier,
		public superClass: Op<Expression>,
		public body: ClassBody) {
		super()
	}
}

/** [[Class]] in expression position. */
export class ClassExpression extends Expression implements Class {
	constructor(
		public id: Op<Identifier>,
		public superClass: Op<Expression>,
		public body: ClassBody) {
		super()
	}
}

/** Contents of a [[Class]]. */
export class ClassBody extends Node {
	constructor(public body: Array<MethodDefinition>) {
		super()
	}
}

/** Part of a [[ClassBody]]. */
export abstract class MethodDefinition extends Node {
	// todo: abstract getters
	// abstract get key(): Expression
	// abstract get kind(): MethodDefinitionKind
	// abstract get static(): boolean
	// abstract get computed(): boolean

	constructor(public value: FunctionExpression) {
		super()
		if (this.value.id !== null)
			throw new Error('Function should not have id; MethodDefinition will take care of that.')
	}

	@enumerable get type(): string {
		return 'MethodDefinition'
	}
}

/** Kind of [[MethodDefinition]]. */
export type MethodDefinitionKind = 'constructor' | 'method' | 'get' | 'set'

/** Any MethodDefinition other than the constructor. */
export abstract class MethodDefinitionNonConstructor extends MethodDefinition {
	static: boolean

	constructor(
		public name: PropertyName,
		value: FunctionExpression,
		options: MethodDefinitionOptions) {
		super(value)
		this.static = Boolean(options.static)
	}

	@enumerable get key(): Expression {
		const {name} = this
		return name instanceof ComputedName ? name.value : name
	}

	@enumerable get computed(): boolean {
		return this.name instanceof ComputedName
	}
}

export type MethodDefinitionOptions = {
	static?: boolean
}

/**
`foo() { ... }`
Non-getter, non-constructor method definition.
(May still be async/generator. Those are options on `value`.)
*/
export class MethodDefinitionPlain extends MethodDefinitionNonConstructor {
	constructor(name: PropertyName, value: FunctionExpression, options: MethodDefinitionOptions = {}) {
		super(name, value, options)
	}

	@enumerable get kind(): MethodDefinitionKind {
		return 'method'
	}
}

/** `get foo() { ... }` */
export class MethodDefinitionGet extends MethodDefinitionNonConstructor {
	constructor(name: PropertyName, value: FunctionExpression, options: MethodDefinitionOptions = {}) {
		super(name, value, options)
		if (value.params.length !== 0)
			throw new Error('Getter should not have any parameters.')
	}

	@enumerable get kind(): MethodDefinitionKind {
		return 'get'
	}
}

/** `set foo(bar) { ... }` */
export class MethodDefinitionSet extends MethodDefinitionNonConstructor {
	constructor(name: PropertyName, value: FunctionExpression, options: MethodDefinitionOptions = {}) {
		super(name, value, options)
		if (value.params.length !== 1)
			throw new Error('Setter should have 1 parameter.')
	}

	@enumerable get kind(): MethodDefinitionKind {
		return 'set'
	}
}

/** `constructor(...) { ... }` */
export class MethodDefinitionConstructor extends MethodDefinition {
	constructor(value: FunctionExpression) {
		super(value)
	}

	@enumerable get key(): Identifier {
		return new Identifier('constructor')
	}

	@enumerable get kind(): MethodDefinitionKind {
		return 'constructor'
	}

	@enumerable get static(): boolean {
		return false
	}

	@enumerable get computed(): boolean {
		return false
	}
}

export class Super extends Node {
	// Make this a nominal type.
	isSuper(): void {}
}
