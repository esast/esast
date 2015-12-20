import Expression from './Expression';
import Node from './Node';
export default class TemplateLiteral extends Expression {
    quasis: Array<TemplateElement>;
    expressions: Array<Expression>;
    constructor(quasis: Array<TemplateElement>, expressions: Array<Expression>);
}
export declare class TemplateElement extends Node {
    tail: boolean;
    value: {
        cooked: string;
        raw: string;
    };
    static forRawString(str: string): TemplateElement;
    static forString(str: string): TemplateElement;
    static empty: TemplateElement;
    constructor(tail: boolean, value: {
        cooked: string;
        raw: string;
    });
}
export declare class TaggedTemplateExpression extends Expression {
    tag: Expression;
    quasi: TemplateLiteral;
    constructor(tag: Expression, quasi: TemplateLiteral);
}
