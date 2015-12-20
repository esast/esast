import Op from 'op/Op/';
import { BlockStatement } from './Statement';
import Declaration from './Declaration';
import Expression from './Expression';
import Identifier from './Identifier';
import Node from './Node';
import Pattern from './Pattern';
export interface Function extends Node {
    isFunction(): void;
}
export declare function isFunction(_: Node): _ is Function;
export interface FunctionNonArrow extends Function {
    isFunctionNonArrow(): void;
}
export declare function isFunctionNonArrow(_: Node): _ is FunctionNonArrow;
export declare class FunctionDeclaration extends Declaration implements FunctionNonArrow {
    id: Identifier;
    params: Array<Pattern>;
    body: BlockStatement;
    generator: boolean;
    async: boolean;
    constructor(id: Identifier, params: Array<Pattern>, body: BlockStatement, options?: {
        generator?: boolean;
        async?: boolean;
    });
    isFunction(): void;
    isFunctionNonArrow(): void;
}
export declare class FunctionExpression extends Expression implements FunctionNonArrow {
    id: Op<Identifier>;
    params: Array<Pattern>;
    body: BlockStatement;
    generator: boolean;
    async: boolean;
    constructor(id: Op<Identifier>, params: Array<Pattern>, body: BlockStatement, options?: {
        generator?: boolean;
        async?: boolean;
    });
    isFunction(): void;
    isFunctionNonArrow(): void;
}
export declare class ArrowFunctionExpression extends Expression implements Function {
    params: Array<Pattern>;
    body: BlockStatement | Expression;
    constructor(params: Array<Pattern>, body: BlockStatement | Expression);
    isFunction(): void;
}
