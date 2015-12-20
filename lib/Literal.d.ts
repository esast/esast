import Expression from './Expression';
declare abstract class Literal extends Expression {
    type: string;
    isLiteral(): void;
}
export default Literal;
export declare class LiteralNull extends Literal {
    value: Object;
}
export declare class LiteralString extends Literal {
    value: string;
    constructor(value: string);
}
export declare class LiteralBoolean extends Literal {
    value: boolean;
    constructor(value: boolean);
}
export declare class LiteralNumber extends Literal {
    value: number;
    constructor(value: number);
}
export declare class LiteralRegExp extends Literal {
    value: RegExp;
    constructor(value: RegExp);
    toJSON(): Object;
}
