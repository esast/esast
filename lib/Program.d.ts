import Op from 'op/Op';
import Declaration from './Declaration';
import Expression from './Expression';
import Identifier from './Identifier';
import { LiteralString } from './Literal';
import Node from './Node';
import Statement from './Statement';
declare abstract class Program extends Node {
    sourceType: SourceType;
    type: string;
}
export default Program;
export declare type SourceType = 'script' | 'module';
export declare class Script extends Program {
    body: Array<Statement>;
    constructor(body: Array<Statement>);
    sourceType: SourceType;
}
export declare class Module extends Program {
    body: Array<Statement | ModuleDeclaration>;
    constructor(body: Array<Statement | ModuleDeclaration>);
    sourceType: SourceType;
}
export declare abstract class ModuleDeclaration extends Node {
    isModuleDeclaration(): void;
}
export declare abstract class ModuleSpecifier extends Node {
    isModuleSpecifier(): void;
}
export declare class ImportDeclaration extends ModuleDeclaration {
    specifiers: Array<ImportSpecifierAbstract>;
    source: LiteralString;
    constructor(specifiers: Array<ImportSpecifierAbstract>, source: LiteralString);
}
export declare abstract class ImportSpecifierAbstract extends ModuleSpecifier {
    local: Identifier;
    constructor(local: Identifier);
}
export declare class ImportSpecifier extends ImportSpecifierAbstract {
    imported: Identifier;
    constructor(imported: Identifier, local?: Identifier);
    shorthand: boolean;
}
export declare class ImportDefaultSpecifier extends ImportSpecifierAbstract {
    constructor(local: Identifier);
}
export declare class ImportNamespaceSpecifier extends ImportSpecifierAbstract {
    constructor(local: Identifier);
}
export declare abstract class Export extends ModuleDeclaration {
    isExport(): void;
}
export declare class ExportNamedDeclaration extends Export {
    declaration: Op<Declaration>;
    specifiers: Array<ExportSpecifier>;
    source: Op<LiteralString>;
    constructor(declaration: Op<Declaration>, specifiers?: Array<ExportSpecifier>, source?: Op<LiteralString>);
}
export declare class ExportSpecifier extends ModuleSpecifier {
    exported: Identifier;
    local: Identifier;
    constructor(exported: Identifier, local?: Identifier);
    shorthand: boolean;
}
export declare class ExportDefaultDeclaration extends Export {
    declaration: Declaration | Expression;
    constructor(declaration: Declaration | Expression);
}
export declare class ExportAllDeclaration extends Export {
    source: LiteralString;
    constructor(source: LiteralString);
}
