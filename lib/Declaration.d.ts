import Op from 'op/Op';
import Expression from './Expression';
import Node from './Node';
import Pattern from './Pattern';
import Statement from './Statement';
declare abstract class Declaration extends Statement {
    isDeclaration(): void;
}
export default Declaration;
export declare abstract class VariableDeclaration extends Declaration {
    declarations: Array<VariableDeclarator>;
    constructor(declarations: Array<VariableDeclarator>);
    type: string;
}
export declare class VariableDeclarationConst extends VariableDeclaration {
    kind: VariableDeclarationKind;
}
export declare class VariableDeclarationLet extends VariableDeclaration {
    kind: VariableDeclarationKind;
}
export declare class VariableDeclarationVar extends VariableDeclaration {
    kind: VariableDeclarationKind;
}
export declare class VariableDeclarator extends Node {
    id: Pattern;
    init: Op<Expression>;
    constructor(id: Pattern, init?: Op<Expression>);
}
export declare type VariableDeclarationKind = 'const' | 'let' | 'var';
