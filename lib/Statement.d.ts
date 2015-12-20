import Op from 'op/Op';
import Expression from './Expression';
import Node from './Node';
import Pattern from './Pattern';
declare abstract class Statement extends Node {
    isStatement(): void;
}
export default Statement;
export declare class EmptyStatement extends Statement {
}
export declare class BlockStatement extends Statement {
    body: Array<Statement>;
    constructor(body: Array<Statement>);
}
export declare class ExpressionStatement extends Statement {
    expression: Expression;
    constructor(expression: Expression);
}
export declare class IfStatement extends Statement {
    test: Expression;
    consequent: Statement;
    alternate: Op<Statement>;
    constructor(test: Expression, consequent: Statement, alternate?: Op<Statement>);
}
export declare class SwitchStatement extends Statement {
    discriminant: Expression;
    cases: Array<SwitchCase>;
    constructor(discriminant: Expression, cases: Array<SwitchCase>);
}
export declare class SwitchCase extends Node {
    test: Op<Expression>;
    consequent: Array<Statement>;
    constructor(test: Op<Expression>, consequent: Array<Statement>);
}
export declare class ReturnStatement extends Statement {
    argument: Op<Expression>;
    constructor(argument?: Op<Expression>);
}
export declare class ThrowStatement extends Statement {
    argument: Expression;
    constructor(argument: Expression);
}
export declare class TryStatement extends Statement {
    block: BlockStatement;
    handler: Op<CatchClause>;
    finalizer: Op<BlockStatement>;
    constructor(block: BlockStatement, handler?: Op<CatchClause>, finalizer?: Op<BlockStatement>);
}
export declare class CatchClause extends Node {
    param: Pattern;
    body: BlockStatement;
    constructor(param: Pattern, body: BlockStatement);
}
export declare class DebuggerStatement extends Statement {
}
