if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	// Single location in source string.
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	class Pos {
		constructor(line, /* Number */column /* Number */) {
			this.line = line;
			this.column = column;
		}

		next(ch) {
			return ch === '\n' ? this.onNextLine() : this.onNextColumn();
		}

		onNextLine() {
			return new Pos(this.line + 1, StartColumn);
		}

		onNextColumn() {
			return new Pos(this.line, this.column + 1);
		}

		onPrevColumn() {
			return new Pos(this.line, this.column - 1);
		}

		toString() {
			return `${ this.line }:${ this.column }`;
		}
	}

	// Range of text in source string.
	exports.Pos = Pos;

	class Loc {
		constructor(start, /* Pos */end /* Pos */) {
			this.start = start;
			this.end = end;
		}

		toString() {
			return `${ this.start }-${ this.end }`;
		}
	}

	exports.default = Loc;
	const singleCharLoc = pos => new Loc(pos, pos.next('x')),
	      StartLine = 1,
	      StartColumn = 0,
	      StartPos = new Pos(StartLine, StartColumn);
	exports.singleCharLoc = singleCharLoc;
	exports.StartLine = StartLine;
	exports.StartColumn = StartColumn;
	exports.StartPos = StartPos;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFDTyxPQUFNLEdBQUcsQ0FBQztBQUNoQixhQUFXLENBQUMsSUFBSSxjQUFlLE1BQU0sZUFBZTtBQUNuRCxPQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNoQixPQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtHQUNwQjs7QUFFRCxNQUFJLENBQUMsRUFBRSxFQUFFO0FBQ1IsVUFBTyxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7R0FDNUQ7O0FBRUQsWUFBVSxHQUFHO0FBQ1osVUFBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtHQUMxQzs7QUFFRCxjQUFZLEdBQUc7QUFDZCxVQUFPLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtHQUMxQzs7QUFFRCxjQUFZLEdBQUc7QUFDZCxVQUFPLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtHQUMxQzs7QUFFRCxVQUFRLEdBQUc7QUFDVixVQUFPLENBQUMsR0FBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQTtHQUNwQztFQUNEOzs7OztBQUdjLE9BQU0sR0FBRyxDQUFDO0FBQ3hCLGFBQVcsQ0FBQyxLQUFLLFdBQVksR0FBRyxZQUFZO0FBQzNDLE9BQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0FBQ2xCLE9BQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0dBQ2Q7O0FBRUQsVUFBUSxHQUFHO0FBQ1YsVUFBTyxDQUFDLEdBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUE7R0FDbEM7RUFDRDs7bUJBVG9CLEdBQUc7QUFXakIsT0FDTixhQUFhLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQ2xELFNBQVMsR0FBRyxDQUFDO09BQ2IsV0FBVyxHQUFHLENBQUM7T0FDZixRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFBIiwiZmlsZSI6IkxvYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNpbmdsZSBsb2NhdGlvbiBpbiBzb3VyY2Ugc3RyaW5nLlxuZXhwb3J0IGNsYXNzIFBvcyB7XG5cdGNvbnN0cnVjdG9yKGxpbmUgLyogTnVtYmVyICovLCBjb2x1bW4gLyogTnVtYmVyICovKSB7XG5cdFx0dGhpcy5saW5lID0gbGluZVxuXHRcdHRoaXMuY29sdW1uID0gY29sdW1uXG5cdH1cblxuXHRuZXh0KGNoKSB7XG5cdFx0cmV0dXJuIGNoID09PSAnXFxuJyA/IHRoaXMub25OZXh0TGluZSgpIDogdGhpcy5vbk5leHRDb2x1bW4oKVxuXHR9XG5cblx0b25OZXh0TGluZSgpIHtcblx0XHRyZXR1cm4gbmV3IFBvcyh0aGlzLmxpbmUgKyAxLCBTdGFydENvbHVtbilcblx0fVxuXG5cdG9uTmV4dENvbHVtbigpIHtcblx0XHRyZXR1cm4gbmV3IFBvcyh0aGlzLmxpbmUsIHRoaXMuY29sdW1uICsgMSlcblx0fVxuXG5cdG9uUHJldkNvbHVtbigpIHtcblx0XHRyZXR1cm4gbmV3IFBvcyh0aGlzLmxpbmUsIHRoaXMuY29sdW1uIC0gMSlcblx0fVxuXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBgJHt0aGlzLmxpbmV9OiR7dGhpcy5jb2x1bW59YFxuXHR9XG59XG5cbi8vIFJhbmdlIG9mIHRleHQgaW4gc291cmNlIHN0cmluZy5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYyB7XG5cdGNvbnN0cnVjdG9yKHN0YXJ0IC8qIFBvcyAqLywgZW5kIC8qIFBvcyAqLykge1xuXHRcdHRoaXMuc3RhcnQgPSBzdGFydFxuXHRcdHRoaXMuZW5kID0gZW5kXG5cdH1cblxuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gYCR7dGhpcy5zdGFydH0tJHt0aGlzLmVuZH1gXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0XG5cdHNpbmdsZUNoYXJMb2MgPSBwb3MgPT4gbmV3IExvYyhwb3MsIHBvcy5uZXh0KCd4JykpLFxuXHRTdGFydExpbmUgPSAxLFxuXHRTdGFydENvbHVtbiA9IDAsXG5cdFN0YXJ0UG9zID0gbmV3IFBvcyhTdGFydExpbmUsIFN0YXJ0Q29sdW1uKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=