import Op from 'op/Op'
import Loc from './Loc'
import {enumerable} from './private/util'

// TODO: Would like to `export default abstract class Node`
// https://github.com/Microsoft/TypeScript/issues/3792
/** Base type of all ASTs. */
abstract class Node {
	loc: Op<Loc>

	toJSON(): Object {
		const obj: any = { type: this.type }
		// Don't use Object.assign because we want all enumerable properties, not just own properties.
		for (const key in this)
			// todo: https://github.com/Microsoft/TypeScript/issues/1427
			obj[key] = (<any> this)[key]
		return obj
	}

	/**
	For compatibility with other AST representations,
	all Node instances have a 'type' property that is the name of that type.
	@see https://github.com/estree/estree
	*/
	@enumerable
	get type(): string {
		return this.constructor.name
	}

	/** @override */
	toString(): string {
		return JSON.stringify(this)
	}
}
export default Node
