import Expression from './Expression'
import Node from './Node'

/**
A template with no tag.
It alternates between quasis and expressions.
It should begin and end with quasis, using [[TemplateElement.empty]] if necessary.
This means that `${1}${2}` has 3 empty quasis!
*/
export default class TemplateLiteral extends Expression {
	constructor(public quasis: Array<TemplateElement>, public expressions: Array<Expression>) {
		super()
		if (this.quasis.length !== this.expressions.length + 1)
			throw new Error(
				'There must be 1 more quasi than expressions.\n' +
				'Maybe you need to add an empty quasi to the front or end.')
	}
}

/** Part of a TemplateLiteral. */
export class TemplateElement extends Node {
	/** TemplateElement whose raw source is `str`. */
	static forRawString(str: string): TemplateElement {
		return new TemplateElement(false, {
			// todo: A way to calculate this?
			cooked: '',
			raw: str
		})
	}

	/**
	TemplateElement evaluating to `str`.
	Uses escape sequences as necessary.
	*/
	static forString(str: string): TemplateElement {
		return new TemplateElement(false, {
			cooked: str,
			raw: escapeStringForTemplate(str)
		})
	}

	static empty: TemplateElement

	constructor(
		/** Use this to mark the last element. */
		public tail: boolean,
		public value: {cooked: string, raw: string}) {
		super()
	}
}
/** TemplateElement with empty value. */
TemplateElement.empty = TemplateElement.forString('')

function escapeStringForTemplate(str: string): string {
	return str.replace(/[{\\`\n\t\b\f\v\r\u2028\u2029]/g, ch => templateEscapes.get(ch))
}

const templateEscapes = new Map<string, string>([
	['{', '\\}'],
	['`', '\\`'],
	['\\', '\\\\'],
	['\n', '\\n'],
	['\t', '\\t'],
	['\b', '\\b'],
	['\f', '\\f'],
	['\v', '\\v'],
	['\r', '\\r'],
	['\u2028', '\\u2028'],
	['\u2029', '\\u2029']
])

/** TemplateLiteral with a tag in front, like`this`. */
export class TaggedTemplateExpression extends Expression {
	constructor(public tag: Expression, public quasi: TemplateLiteral) {
		super()
	}
}
