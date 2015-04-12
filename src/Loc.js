import tuple from './private/tuple'

export const Pos = tuple('Pos', Object, 'line', Number, 'column', Number)
const Loc = tuple('Loc', Object, 'start', Pos, 'end', Pos)
export default Loc

export const
	singleCharLoc = pos => Loc(pos, pos.next('x')),

	StartPos = Pos(1, 1)

Object.assign(Loc.prototype, {
	toString() { return this.start + '-' + this.end }
})

Object.assign(Pos.prototype, {
	next(ch) {
		return ch === '\n' ? this.onNextLine() : this.onNextColumn()
	},

	onNextLine() {
		return Pos(this.line + 1, 1)
	},

	onNextColumn() {
		return Pos(this.line, this.column + 1)
	},

	onPrevColumn() {
		return Pos(this.line, this.column - 1)
	},

	toString() {
		return `${this.line}:${this.column}`
	}
})
