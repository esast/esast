import Op from 'op/Op'
import {Super} from './Class'
import Identifier from './Identifier'
import Node from './Node'
import Pattern from './Pattern'
import {enumerable} from './private/util'

/**
Code that has a value.
To use one in a statement position, see ExpressionStatement.
*/
abstract class Expression extends Node {
	// Make this a nominal type.
	isExpression(): void {}
}
export default Expression

/** The `this` keyword. */
export class ThisExpression extends Expression { }

/** `[ elements ]` */
export class ArrayExpression extends Expression {
	constructor(public elements: Array<Op<Expression | SpreadElement>>) {
		super()
	}
}

/**
`expressions[0], expressions[1], ...`
Expression composed of other expressions, separated by the comma operator.
*Not* for parameter lists.
*/
export class SequenceExpression extends Expression {
	constructor(public expressions: Array<Expression>) {
		super()
	}
}

/** Accepted kinds of [[UnaryExpression]]. */
export type UnaryOperator = '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete'

/**
`operator argument`
Calls a unary operator.
*/
export class UnaryExpression extends Expression {
	constructor(public operator: UnaryOperator, public argument: Expression) {
		super()
	}

	/** Always true. Needed for comparibility with estree. */
	@enumerable get prefix(): boolean {
		return true
	}
}

/** Accepted kinds of [[BinaryExpression]]. */
export type BinaryOperator = '==' | '!=' | '===' | '!==' |
	'<' | '<=' | '>' | '>=' |
	'<<' | '>>' | '>>>' |
	'+' | '-' | '*' | '/' | '%' |
	'|' | '^' | '&' | 'in' |
	'instanceof'

/**
`left operator right`
Calls a binary operator.
*/
export class BinaryExpression extends Expression {
	constructor(public operator: BinaryOperator, public left: Expression, public right: Expression) {
		super()
	}
}

/** Accepted kinds of [[AssignmentExpression]]. */
export type AssignmentOperator =
	'=' | '+=' | '-=' | '*=' | '/=' | '%=' |
	'<<=' | '>>=' | '>>>=' |
	'|=' | '^=' | '&='

/**
`left operator right`
Mutates an existing variable.
Do not confuse with VariableDeclaration.
*/
export class AssignmentExpression extends Expression {
	constructor(
		public operator: AssignmentOperator,
		public left: Pattern | MemberExpression,
		public right: Expression) {
		super()
	}
}

/** Accepted kinds of [[UpdateExpression]]. */
export type UpdateOperator = '++' | '--'

/**
`++argument` or `argument++`
Increments or decrements a number.
*/
export class UpdateExpression extends Expression {
	constructor(
		public operator: UpdateOperator,
		public argument: Identifier | MemberExpression,
		public prefix: boolean) {
		super()
	}
}

/** Accepted kinds of [[LogicalExpression]]. */
export type LogicalOperator = '||' | '&&'

/**
`left operator right`
Calls a lazy logical operator.
*/
export class LogicalExpression extends Expression {
	constructor(public operator: LogicalOperator, public left: Expression, public right: Expression) {
		super()
	}
}

/** `test ? consequent : alternate` */
export class ConditionalExpression extends Expression {
	constructor(public test: Expression, public consequent: Expression, public alternate: Expression) {
		super()
	}
}

/**
`new callee(arguments)`
Just like [[CallExpression]] but with `new` in front.
*/
export class NewExpression extends Expression {
	arguments: Array<Expression | SpreadElement>

	constructor(public callee: Expression, args: Array<Expression | SpreadElement>) {
		super()
		this.arguments = args
	}
}

/** `callee(arguments)` */
export class CallExpression extends Expression {
	arguments: Array<Expression | SpreadElement>

	constructor(public callee: Expression | Super, args: Array<Expression | SpreadElement>) {
		super()
		this.arguments = args
	}
}

/** `...args` in a CallExpression. */
export class SpreadElement extends Node {
	constructor(public argument: Expression) {
		super()
	}
}

/**
If computed === true, `object[property]`.
Else, `object.property` -- meaning property should be an Identifier.
*/
export abstract class MemberExpression extends Expression {
	constructor(public object: Expression | Super) {
		super()
	}

	@enumerable get type(): string {
		return 'MemberExpression'
	}

	// todo: abstract getters
	@enumerable get computed(): boolean {
		throw new Error()
	}
}

export class MemberExpressionPlain extends MemberExpression {
	constructor(object: Expression | Super, public property: Identifier) {
		super(object)
	}

	get computed(): boolean {
		return false
	}
}

export class MemberExpressionComputed extends MemberExpression {
	constructor(object: Expression | Super, public property: Expression) {
		super(object)
	}

	get computed(): boolean {
		return true
	}
}

export abstract class YieldLike extends Expression {
	// abstract get argument: Op<Expression>
	// abstract get delegate: boolean

	get type(): string {
		return 'YieldExpression'
	}
}

/** `yield argument` */
export class YieldExpression extends YieldLike {
	constructor(public argument: Op<Expression>) {
		super()
	}

	get delegate(): boolean {
		return false
	}
}

/** `yield* argument` */
export class YieldDelegateExpression extends YieldLike {
	constructor(public argument: Expression) {
		super()
	}

	get delegate(): boolean {
		return true
	}
}

/** Currently, can only be `new.target`.  */
export class MetaProperty extends Expression {
	constructor(public meta: Identifier, public property: Identifier) {
		super()
	}
}
