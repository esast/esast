import Op from 'op/Op'
import Expression from './Expression'
import Node from './Node'
import Pattern from './Pattern'
import Statement from './Statement'
import {enumerable} from './private/util'

/** A Statement that declares new locals. */
abstract class Declaration extends Statement {
	// Make this a nominal type.
	isDeclaration(): void {}
}
export default Declaration

/**
Declares and optionally initializes many variables.
Must be at least one declaration.
*/
export abstract class VariableDeclaration extends Declaration {
	constructor(public declarations: Array<VariableDeclarator>) {
		super()
		if (this.declarations.length === 0)
			throw new Error('VariableDeclaration must have at least 1 declaration.')
	}

	@enumerable get type(): string {
		return 'VariableDeclaration'
	}

	// todo: abstract get kind(): VariableDeclarationKind
}

export class VariableDeclarationConst extends VariableDeclaration {
	@enumerable get kind(): VariableDeclarationKind {
		return 'const'
	}
}

export class VariableDeclarationLet extends VariableDeclaration {
	@enumerable get kind(): VariableDeclarationKind {
		return 'let'
	}
}

export class VariableDeclarationVar extends VariableDeclaration {
	@enumerable get kind(): VariableDeclarationKind {
		return 'var'
	}
}

/** Single declaration within a [[VariableDeclaration]]. */
export class VariableDeclarator extends Node {
	constructor(public id: Pattern, public init: Op<Expression> = null) {
		super()
	}
}

/** Kind of [[VariableDeclaration]]. */
export type VariableDeclarationKind = 'const' | 'let' | 'var'
