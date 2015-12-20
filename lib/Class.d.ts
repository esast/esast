import Op from 'op/Op';
import Identifier from './Identifier';
import Node from './Node';
import Declaration from './Declaration';
import Expression from './Expression';
import { FunctionExpression } from './Function';
import { PropertyName } from './ObjectExpression';
interface Class extends Node {
    id: Op<Identifier>;
    superClass: Op<Expression>;
    body: ClassBody;
}
export default Class;
export declare class ClassDeclaration extends Declaration implements Class {
    id: Identifier;
    superClass: Op<Expression>;
    body: ClassBody;
    constructor(id: Identifier, superClass: Op<Expression>, body: ClassBody);
}
export declare class ClassExpression extends Expression implements Class {
    id: Op<Identifier>;
    superClass: Op<Expression>;
    body: ClassBody;
    constructor(id: Op<Identifier>, superClass: Op<Expression>, body: ClassBody);
}
export declare class ClassBody extends Node {
    body: Array<MethodDefinition>;
    constructor(body: Array<MethodDefinition>);
}
export declare abstract class MethodDefinition extends Node {
    value: FunctionExpression;
    constructor(value: FunctionExpression);
    type: string;
}
export declare type MethodDefinitionKind = 'constructor' | 'method' | 'get' | 'set';
export declare abstract class MethodDefinitionNonConstructor extends MethodDefinition {
    name: PropertyName;
    static: boolean;
    constructor(name: PropertyName, value: FunctionExpression, options: MethodDefinitionOptions);
    key: Expression;
    computed: boolean;
}
export declare type MethodDefinitionOptions = {
    static?: boolean;
};
export declare class MethodDefinitionPlain extends MethodDefinitionNonConstructor {
    constructor(name: PropertyName, value: FunctionExpression, options?: MethodDefinitionOptions);
    kind: MethodDefinitionKind;
}
export declare class MethodDefinitionGet extends MethodDefinitionNonConstructor {
    constructor(name: PropertyName, value: FunctionExpression, options?: MethodDefinitionOptions);
    kind: MethodDefinitionKind;
}
export declare class MethodDefinitionSet extends MethodDefinitionNonConstructor {
    constructor(name: PropertyName, value: FunctionExpression, options?: MethodDefinitionOptions);
    kind: MethodDefinitionKind;
}
export declare class MethodDefinitionConstructor extends MethodDefinition {
    constructor(value: FunctionExpression);
    key: Identifier;
    kind: MethodDefinitionKind;
    static: boolean;
    computed: boolean;
}
export declare class Super extends Node {
    isSuper(): void;
}
