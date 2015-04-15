import tuple from './private/tuple'

export const Pos = tuple('Pos', Object,
	'Single location in source string.',
	[ 'line', Number, 'column', Number ],
	{
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

const Loc = tuple('Loc', Object,
	'Range of text in source string.',
	[ 'start', Pos, 'end', Pos ], {
	toString() { return this.start + '-' + this.end }
})
export default Loc

export const
	singleCharLoc = pos => Loc(pos, pos.next('x')),
	StartPos = Pos(1, 1)

