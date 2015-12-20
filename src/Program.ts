import Op from 'op/Op'
import Declaration from './Declaration'
import Expression from './Expression'
import Identifier from './Identifier'
import {LiteralString} from './Literal'
import Node from './Node'
import Statement from './Statement'
import {enumerable} from './private/util'

/** Represents an entire source file. */
abstract class Program extends Node {
	// todo: abstract getters
	// https://github.com/Microsoft/TypeScript/issues/4669
	// abstract get body(): Array<Statement | ModuleDeclaration>

	// todo: abstract getters
	@enumerable get sourceType(): SourceType {
		throw new Error('abstract')
	}

	@enumerable get type(): string {
		return 'Program'
	}
}
export default Program

export type SourceType = 'script' | 'module'

/** Program with no [[ModuleDeclaration]]s.. */
export class Script extends Program {
	constructor(public body: Array<Statement>) {
		super()
	}

	@enumerable get sourceType(): SourceType {
		return 'script'
	}
}

/** Program with [[ModuleDeclaration]]s. */
export class Module extends Program {
	constructor(public body: Array<Statement | ModuleDeclaration>) {
		super()
	}

	@enumerable get sourceType(): SourceType {
		return 'module'
	}
}

/** An `import` or `export` declaration. */
export abstract class ModuleDeclaration extends Node {
	// Make this a nominal type.
	isModuleDeclaration(): void {}
}

/** A specifier in an a [[ModuleDeclaration]]. */
export abstract class ModuleSpecifier extends Node {
	// Make this a nominal type.
	isModuleSpecifier(): void {}
}

/**
`import specifiers from source`
Only one specifier may be a ImportDefaultSpecifier.
If there is an ImportNamespaceSpecifier, it must be the only specifier.
*/
export class ImportDeclaration extends ModuleDeclaration {
	constructor(public specifiers: Array<ImportSpecifierAbstract>, public source: LiteralString) {
		super()
	}
}

/** [[ImportSpecifier]] | [[ImportDefaultSpecifier]] | [[ImportNamespaceSpecifier]] */
export abstract class ImportSpecifierAbstract extends ModuleSpecifier {
	constructor(public local: Identifier) {
		super()
	}
}

/**
A non-default import. Used in an ImportDeclaration.
For `import { a } from "source"`, just pass one argument and local will = imported.
For `import { a as b } from "source"`, make imported `a` and local `b`.
*/
export class ImportSpecifier extends ImportSpecifierAbstract {
	constructor(public imported: Identifier, local: Identifier = imported) {
		super(local)
	}

	get shorthand(): boolean {
		return this.imported === this.local
	}
}

/** The default export, as in `import a from "source"`. */
export class ImportDefaultSpecifier extends ImportSpecifierAbstract {
	constructor(local: Identifier) {
		super(local)
	}
}

/** Object of every export, as in `import * as a from "source"`. */
export class ImportNamespaceSpecifier extends ImportSpecifierAbstract {
	constructor(local: Identifier) {
		super(local)
	}
}

export abstract class Export extends ModuleDeclaration {
	// Make this a nominal type.
	isExport(): void {}
}

/**
Exports multiple values as in `export { a, b as c }`.
If source !== null,
re-exports from that module as in `export { ... } from "source"`.
*/
export class ExportNamedDeclaration extends Export {
	constructor(
		public declaration: Op<Declaration>,
		public specifiers: Array<ExportSpecifier> = [],
		public source: Op<LiteralString> = null) {
		super()
		if (declaration !== null && !(specifiers.length === 0 && source === null))
			throw new Error('Declaration can not be combined with specifiers/source.')
	}
}

/**
A non-default export. Used in an ExportNamedDeclaration.
For `export { a } from "source"`, just pass one argument local will = exported.
For `export { a as b }`, make exported `b` and local `a`.
*/
export class ExportSpecifier extends ModuleSpecifier {
	constructor(public exported: Identifier, public local: Identifier = exported) {
		super()
	}

	get shorthand(): boolean {
		return this.exported === this.local
	}
}

/** `export default declaration` */
export class ExportDefaultDeclaration extends Export {
	constructor(public declaration: Declaration | Expression) {
		super()
	}
}

/** `export * from source` */
export class ExportAllDeclaration extends Export {
	constructor(public source: LiteralString) {
		super()
	}
}
