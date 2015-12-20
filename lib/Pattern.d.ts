import Op from 'op/Op';
import Identifier from './Identifier';
import Node from './Node';
interface Pattern extends Node {
    isPattern(): void;
}
export default Pattern;
export declare function isPattern(_: Node): _ is Pattern;
export declare class ObjectPattern extends Node implements Pattern {
    properties: Array<AssignmentProperty>;
    constructor(properties: Array<AssignmentProperty>);
    isPattern(): void;
}
export declare class AssignmentProperty extends Node {
    key: Identifier;
    value: Pattern;
    constructor(key: Identifier, value?: Pattern);
    type: string;
    kind: string;
    method: boolean;
    shorthand: boolean;
    computed: boolean;
}
export declare class ArrayPattern extends Node implements Pattern {
    elements: Array<Op<Pattern>>;
    constructor(elements: Array<Op<Pattern>>);
    isPattern(): void;
}
export declare class RestElement extends Node implements Pattern {
    argument: Pattern;
    constructor(argument: Pattern);
    isPattern(): void;
}
