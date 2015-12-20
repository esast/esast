import Op from 'op/Op';
import { Super } from './Class';
import Identifier from './Identifier';
import Node from './Node';
import Pattern from './Pattern';
declare abstract class Expression extends Node {
    isExpression(): void;
}
export default Expression;
export declare class ThisExpression extends Expression {
}
export declare class ArrayExpression extends Expression {
    elements: Array<Op<Expression | SpreadElement>>;
    constructor(elements: Array<Op<Expression | SpreadElement>>);
}
export declare class SequenceExpression extends Expression {
    expressions: Array<Expression>;
    constructor(expressions: Array<Expression>);
}
export declare type UnaryOperator = '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete';
export declare class UnaryExpression extends Expression {
    operator: UnaryOperator;
    argument: Expression;
    constructor(operator: UnaryOperator, argument: Expression);
    prefix: boolean;
}
export declare type BinaryOperator = '==' | '!=' | '===' | '!==' | '<' | '<=' | '>' | '>=' | '<<' | '>>' | '>>>' | '+' | '-' | '*' | '/' | '%' | '|' | '^' | '&' | 'in' | 'instanceof';
export declare class BinaryExpression extends Expression {
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
    constructor(operator: BinaryOperator, left: Expression, right: Expression);
}
export declare type AssignmentOperator = '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '<<=' | '>>=' | '>>>=' | '|=' | '^=' | '&=';
export declare class AssignmentExpression extends Expression {
    operator: AssignmentOperator;
    left: Pattern | MemberExpression;
    right: Expression;
    constructor(operator: AssignmentOperator, left: Pattern | MemberExpression, right: Expression);
}
export declare type UpdateOperator = '++' | '--';
export declare class UpdateExpression extends Expression {
    operator: UpdateOperator;
    argument: Identifier | MemberExpression;
    prefix: boolean;
    constructor(operator: UpdateOperator, argument: Identifier | MemberExpression, prefix: boolean);
}
export declare type LogicalOperator = '||' | '&&';
export declare class LogicalExpression extends Expression {
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
    constructor(operator: LogicalOperator, left: Expression, right: Expression);
}
export declare class ConditionalExpression extends Expression {
    test: Expression;
    consequent: Expression;
    alternate: Expression;
    constructor(test: Expression, consequent: Expression, alternate: Expression);
}
export declare class NewExpression extends Expression {
    callee: Expression;
    arguments: Array<Expression | SpreadElement>;
    constructor(callee: Expression, args: Array<Expression | SpreadElement>);
}
export declare class CallExpression extends Expression {
    callee: Expression | Super;
    arguments: Array<Expression | SpreadElement>;
    constructor(callee: Expression | Super, args: Array<Expression | SpreadElement>);
}
export declare class SpreadElement extends Node {
    argument: Expression;
    constructor(argument: Expression);
}
export declare abstract class MemberExpression extends Expression {
    object: Expression | Super;
    constructor(object: Expression | Super);
    type: string;
    computed: boolean;
}
export declare class MemberExpressionPlain extends MemberExpression {
    property: Identifier;
    constructor(object: Expression | Super, property: Identifier);
    computed: boolean;
}
export declare class MemberExpressionComputed extends MemberExpression {
    property: Expression;
    constructor(object: Expression | Super, property: Expression);
    computed: boolean;
}
export declare abstract class YieldLike extends Expression {
    type: string;
}
export declare class YieldExpression extends YieldLike {
    argument: Op<Expression>;
    constructor(argument: Op<Expression>);
    delegate: boolean;
}
export declare class YieldDelegateExpression extends YieldLike {
    argument: Expression;
    constructor(argument: Expression);
    delegate: boolean;
}
export declare class MetaProperty extends Expression {
    meta: Identifier;
    property: Identifier;
    constructor(meta: Identifier, property: Identifier);
}
