import Expression from './Expression'
import {enumerable} from './private/util'

abstract class Literal extends Expression {
	@enumerable get type(): string {
		return 'Literal'
	}

	// Make this a nominal type.
	isLiteral(): void {}
}
export default Literal

export class LiteralNull extends Literal {
	@enumerable get value(): Object {
		return null
	}
}

export class LiteralString extends Literal {
	constructor(public value: string) {
		super()
	}
}

export class LiteralBoolean extends Literal {
	constructor(public value: boolean) {
		super()
	}
}

export class LiteralNumber extends Literal {
	constructor(public value: number) {
		super()
	}
}

export class LiteralRegExp extends Literal {
	constructor(public value: RegExp) {
		super()
	}

	/** @override */
	toJSON(): Object {
		const obj: any = super.toJSON()
		obj.value = {pattern: this.value.source, flags: this.value.flags}
		return obj
	}
}

// TODO:ES6 kill
if ((<any> RegExp.prototype).flags === undefined)
	/* eslint-disable no-extend-native */
	Object.defineProperty(RegExp.prototype, 'flags', {
		get(): string {
			return this.toString().match(/[gimy]*$/)[0]
		}
	})
