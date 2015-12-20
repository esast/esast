import Expression from './Expression'
import Pattern from './Pattern'

/**
A JavaScript identifier.

It is assumed that you have called `mangleIdentifier` as appropriate.
See also [[identifier]].
*/
export default class Identifier extends Expression implements Pattern {
	constructor(public name: string) {
		super()
	}

	isPattern(): void {}
}
