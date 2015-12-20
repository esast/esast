import Op from 'op/Op';
import { VariableDeclaration } from './Declaration';
import Expression from './Expression';
import Identifier from './Identifier';
import Statement from './Statement';
declare abstract class Loop extends Statement {
    isLoop(): void;
}
export default Loop;
export declare class WhileStatement extends Loop {
    test: Expression;
    body: Statement;
    constructor(test: Expression, body: Statement);
}
export declare class DoWhileStatement extends Loop {
    body: Statement;
    test: Expression;
    constructor(body: Statement, test: Expression);
}
export declare class ForStatement extends Loop {
    init: Op<VariableDeclaration | Expression>;
    test: Op<Expression>;
    update: Op<Expression>;
    body: Statement;
    constructor(init: Op<VariableDeclaration | Expression>, test: Op<Expression>, update: Op<Expression>, body: Statement);
}
export declare abstract class ForInOfStatement extends Loop {
    left: VariableDeclaration | Identifier;
    right: Expression;
    body: Statement;
    constructor(left: VariableDeclaration | Identifier, right: Expression, body: Statement);
}
export declare class ForInStatement extends ForInOfStatement {
    constructor(left: VariableDeclaration | Identifier, right: Expression, body: Statement);
}
export declare class ForOfStatement extends ForInOfStatement {
    constructor(left: VariableDeclaration | Identifier, right: Expression, body: Statement);
}
export declare class BreakStatement extends Statement {
    label: Op<Identifier>;
    constructor(label?: Op<Identifier>);
}
export declare class ContinueStatement extends Statement {
    label: Op<Identifier>;
    constructor(label?: Op<Identifier>);
}
export declare class LabeledStatement extends Statement {
    label: Identifier;
    body: Statement;
    constructor(label: Identifier, body: Statement);
}
