// Single location in source string.
export class Pos {
	constructor(line /* Number */, column /* Number */) {
		this.line = line
		this.column = column
	}

	next(ch) {
		return ch === '\n' ? this.onNextLine() : this.onNextColumn()
	}

	onNextLine() {
		return new Pos(this.line + 1, StartColumn)
	}

	onNextColumn() {
		return new Pos(this.line, this.column + 1)
	}

	onPrevColumn() {
		return new Pos(this.line, this.column - 1)
	}

	toString() {
		return `${this.line}:${this.column}`
	}
}

// Range of text in source string.
export default class Loc {
	constructor(start /* Pos */, end /* Pos */) {
		this.start = start
		this.end = end
	}

	toString() {
		return `${this.start}-${this.end}`
	}
}

export const
	singleCharLoc = pos => new Loc(pos, pos.next('x')),
	StartLine = 1,
	StartColumn = 0,
	StartPos = new Pos(StartLine, StartColumn)
