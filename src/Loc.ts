/** Range of text in the source string. */
export default class Loc {
	/**
	Loc consisting of the character at `pos`.
	@param {Pos} pos
	*/
	static singleChar(pos: Pos): Loc {
		return new Loc(pos, pos.onNextColumn())
	}

	constructor(public start: Pos, public end: Pos) {}

	/** Compare by `start`, then by `end`. */
	compare(loc: Loc): number {
		const startDiff = this.start.compare(loc.start)
		return startDiff === 0 ? this.end.compare(loc.end) : startDiff
	}

	/** @override */
	toString(): string {
		return `${this.start}-${this.end}`
	}
}

/** Represents a single location in the source string. */
export class Pos {
	/** First {@link Pos} in a source string. */
	static start: Pos = new Pos(1, 0)

	constructor(public line: number, public column: number) {}

	/** -1 if this comes earlier in the code, 1 if this comes later, 0 if they are the same. */
	compare(pos: Pos): number {
		const lineDiff = this.line - pos.line
		return lineDiff === 0 ? this.column - pos.column : lineDiff
	}

	/** Advance the pos by any character. */
	next(ch: string): Pos {
		return ch === '\n' ? this.onNextLine() : this.onNextColumn()
	}

	/** Pos after a newline. */
	onNextLine(): Pos {
		return new Pos(this.line + 1, Pos.start.column)
	}

	/** Pos after a non-newline character. */
	onNextColumn(): Pos {
		return new Pos(this.line, this.column + 1)
	}

	/**
	 * Undoes {@link onNextLine}.
	 * Only call this is you know this is not the first column.
	 */
	onPrevColumn(): Pos {
		return new Pos(this.line, this.column - 1)
	}

	/** @override */
	toString(): string {
		return `${this.line}:${this.column}`
	}
}
