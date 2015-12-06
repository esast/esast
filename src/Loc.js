/** Represents a single location in the source string. */
export class Pos {
	constructor(line, column) {
		/** @type {number} */
		this.line = line
		/** @type {number} */
		this.column = column
	}

	/** -1 if this comes earlier in the code, 1 if this comes later, 0 if they are the same. */
	compare(pos) {
		const lineDiff = this.line - pos.line
		return lineDiff === 0 ? this.column - pos.column : lineDiff
	}

	/** Advance the pos by any character. */
	next(ch) {
		return ch === '\n' ? this.onNextLine() : this.onNextColumn()
	}

	/** Poc after a newline. */
	onNextLine() {
		return new Pos(this.line + 1, StartColumn)
	}

	/** Loc after a non-newline character. */
	onNextColumn() {
		return new Pos(this.line, this.column + 1)
	}

	/**
	 * Undoes {@link onNextLine}.
	 * Only call this is you know this is not the first column.
	 */
	onPrevColumn() {
		return new Pos(this.line, this.column - 1)
	}

	/** @override */
	toString() {
		return `${this.line}:${this.column}`
	}
}

/** Range of text in the source string. */
export default class Loc {
	constructor(start, end) {
		/**
		Beginning of text.
		@type {Pos}
		*/
		this.start = start
		/**
		End of text.
		@type {Pos}
		*/
		this.end = end
	}

	/** Compare by `start`, then by `end`. */
	compare(loc) {
		const startDiff = this.start.compare(loc.start)
		return startDiff === 0 ? this.end.compare(loc.end) : startDiff
	}

	/** @override */
	toString() {
		return `${this.start}-${this.end}`
	}
}

/**
Loc consisting of the character at `pos`.
@param {Pos} pos
*/
export function singleCharLoc(pos) {
	return new Loc(pos, pos.next('x'))
}

/** First line number for a source string; they start at 1. */
export const StartLine = 1

/** Fist column number for a line; they start at 0. */
export const StartColumn = 0

/** First {@link Pos} in a source string. */
export const StartPos = new Pos(StartLine, StartColumn)
