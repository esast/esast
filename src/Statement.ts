import Op from 'op/Op'
import Expression from './Expression'
import Node from './Node'
import Pattern from './Pattern'

/** Any part of a [[BlockStatement]]. */
abstract class Statement extends Node {
	// Make this a nominal type.
	isStatement(): void {}
}
export default Statement

/**
An empty statement, i.e., a solitary semicolon.
Not useful for code generation, but some parsers will return these.
*/
export class EmptyStatement extends Statement { }

/** A block statement, i.e., a sequence of statements surrounded by braces. */
export class BlockStatement extends Statement {
	constructor(public body: Array<Statement>) {
		super()
	}
}

/**
An expression statement, i.e., a statement consisting of a single expression.
See `esast.util toStatement toStatements`.
*/
export class ExpressionStatement extends Statement {
	constructor(public expression: Expression) {
		super()
	}
}

/** An if (or if ... else) statement. */
export class IfStatement extends Statement {
	constructor(
		public test: Expression,
		public consequent: Statement,
		public alternate: Op<Statement> = null) {
		super()
	}
}

/**
`switch (discriminant) { cases }`
Only the last entry of `cases` is allowed to be `default`.
*/
export class SwitchStatement extends Statement {
	constructor(public discriminant: Expression, public cases: Array<SwitchCase>) {
		super()
	}
}
/**
A single `case` within a SwitchStatement.
If `test` is `null`, this is the `default` case.
*/
export class SwitchCase extends Node {
	constructor(public test: Op<Expression>, public consequent: Array<Statement>) {
		super()
	}
}

/** The `return` keyword, optionally followed by an Expression to return. */
export class ReturnStatement extends Statement {
	constructor(public argument: Op<Expression> = null) {
		super()
	}
}

/**
The `throw` keyword, and something to throw.
See `esast.util throwError`.
*/
export class ThrowStatement extends Statement {
	constructor(public argument: Expression) {
		super()
	}
}

/**
`try { block } catch (handler.param) { handler.body } finally { finalizer }`
At least one of `handler` or `finalizer` must be non-null.
*/
export class TryStatement extends Statement {
	constructor(
		public block: BlockStatement,
		public handler: Op<CatchClause> = null,
		public finalizer: Op<BlockStatement> = null) {
		super()
	}
}

/** Must be *part* of a [[TryStatement]] -- does *not* follow it. */
export class CatchClause extends Node {
	constructor(public param: Pattern, public body: BlockStatement) {
		super()
	}
}

/** The `debugger` keyword. */
export class DebuggerStatement extends Statement { }
