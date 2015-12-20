import Op from 'op/Op'
import {VariableDeclaration} from './Declaration'
import Expression from './Expression'
import Identifier from './Identifier'
import Statement from './Statement'

abstract class Loop extends Statement {
	// Make this a nominal type.
	isLoop(): void {}
}
export default Loop

/** `while (test) body` */
export class WhileStatement extends Loop {
	constructor(public test: Expression, public body: Statement) {
		super()
	}
}

/** `do body while (test)` */
export class DoWhileStatement extends Loop {
	constructor(public body: Statement, public test: Expression) {
		super()
	}
}

/**
`for (init; test; update) body`
Not to be confused with ForInStatement or ForOfStatement.
*/
export class ForStatement extends Loop {
	constructor(
		public init: Op<VariableDeclaration | Expression>,
		public test: Op<Expression>,
		public update: Op<Expression>,
		public body: Statement) {
		super()
	}
}

export abstract class ForInOfStatement extends Loop {
	constructor(
		public left: VariableDeclaration | Identifier,
		public right: Expression,
		public body: Statement) {
		super()
	}
}

/** `for (left in right) body` */
export class ForInStatement extends ForInOfStatement {
	constructor(left: VariableDeclaration | Identifier, right: Expression, body: Statement) {
		super(left, right, body)
	}
}

/** `for (left of right) body` */
export class ForOfStatement extends ForInOfStatement {
	constructor(left: VariableDeclaration | Identifier, right: Expression, body: Statement) {
		super(left, right, body)
	}
}

export class BreakStatement extends Statement {
	/** The `break` keyword. */
	constructor(public label: Op<Identifier> = null) {
		super()
	}
}

/** The `continue` keyword. */
export class ContinueStatement extends Statement {
	constructor(public label: Op<Identifier> = null) {
		super()
	}
}

/** A statement prefixed by a label. */
export class LabeledStatement extends Statement {
	constructor(public label: Identifier, public body: Statement) {
		super()
	}
}
