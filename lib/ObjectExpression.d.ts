import Expression from './Expression';
import { FunctionExpression } from './Function';
import Identifier from './Identifier';
import { LiteralNumber, LiteralString } from './Literal';
import Node from './Node';
export default class ObjectExpression extends Expression {
    properties: Array<Property>;
    constructor(properties: Array<Property>);
}
export declare abstract class Property extends Node {
    name: PropertyName;
    value: Expression;
    constructor(name: PropertyName, value: Expression);
    key: Expression;
    computed: boolean;
    type: string;
    shorthand: boolean;
    method: boolean;
}
export declare type PropertyKind = 'init' | 'get' | 'set';
export declare type PropertyName = Identifier | LiteralString | LiteralNumber | ComputedName;
export declare class ComputedName {
    value: Expression;
    constructor(value: Expression);
}
export declare abstract class PropertyInit extends Property {
    kind: PropertyKind;
}
export declare class PropertyPlain extends PropertyInit {
    constructor(name: PropertyName, value: Expression);
}
export declare class PropertyMethod extends PropertyInit {
    value: FunctionExpression;
    constructor(name: PropertyName, value: FunctionExpression);
    method: boolean;
}
export declare abstract class PropertyGetSet extends Property {
    value: FunctionExpression;
    constructor(name: PropertyName, value: FunctionExpression);
}
export declare class PropertyGet extends PropertyGetSet {
    kind: PropertyKind;
}
export declare class PropertySet extends PropertyGetSet {
    constructor(name: PropertyName, value: FunctionExpression);
    kind: PropertyKind;
}
