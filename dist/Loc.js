if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	/** Represents a single location in the source string. */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.singleCharLoc = singleCharLoc;

	class Pos {
		constructor(line, /* Number */column /* Number */) {
			this.line = line;
			this.column = column;
		}

		/** Advance the pos by any character. */
		next(ch) {
			return ch === '\n' ? this.onNextLine() : this.onNextColumn();
		}

		/** Poc after a newline. */
		onNextLine() {
			return new Pos(this.line + 1, StartColumn);
		}

		/** Loc after a non-newline character. */
		onNextColumn() {
			return new Pos(this.line, this.column + 1);
		}

		/**
   * Undoes {@link onNextLine}.
   * Only call this is you know this is not the first column.
   */
		onPrevColumn() {
			return new Pos(this.line, this.column - 1);
		}

		/** @override */
		toString() {
			return `${ this.line }:${ this.column }`;
		}
	}

	/** Range of text in the source string. */
	exports.Pos = Pos;

	class Loc {
		constructor(start, /* Pos */end /* Pos */) {
			this.start = start;
			/** Beginning of text. */
			this.end = end;
			/** End of text. */
		}

		/** @override */
		toString() {
			return `${ this.start }-${ this.end }`;
		}
	}

	/**
 Loc consisting of the character at `pos`.
 @param {Pos} pos
 */
	exports.default = Loc;

	function singleCharLoc(pos) {
		return new Loc(pos, pos.next('x'));
	}

	/** First line number for a source string; they start at 1. */
	const StartLine = 1;

	exports.StartLine = StartLine;
	/** Fist column number for a line; they start at 0. */
	const StartColumn = 0;

	exports.StartColumn = StartColumn;
	/** First {@link Pos} in a source string. */
	const StartPos = new Pos(StartLine, StartColumn);
	exports.StartPos = StartPos;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBQ08sT0FBTSxHQUFHLENBQUM7QUFDaEIsYUFBVyxDQUFDLElBQUksY0FBZSxNQUFNLGVBQWU7QUFDbkQsT0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7QUFDaEIsT0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7R0FDcEI7OztBQUdELE1BQUksQ0FBQyxFQUFFLEVBQUU7QUFDUixVQUFPLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtHQUM1RDs7O0FBR0QsWUFBVSxHQUFHO0FBQ1osVUFBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtHQUMxQzs7O0FBR0QsY0FBWSxHQUFHO0FBQ2QsVUFBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7R0FDMUM7Ozs7OztBQU1ELGNBQVksR0FBRztBQUNkLFVBQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0dBQzFDOzs7QUFHRCxVQUFRLEdBQUc7QUFDVixVQUFPLENBQUMsR0FBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQTtHQUNwQztFQUNEOzs7OztBQUdjLE9BQU0sR0FBRyxDQUFDO0FBQ3hCLGFBQVcsQ0FBQyxLQUFLLFdBQVksR0FBRyxZQUFZO0FBQzNDLE9BQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBOztBQUVsQixPQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTs7R0FFZDs7O0FBR0QsVUFBUSxHQUFHO0FBQ1YsVUFBTyxDQUFDLEdBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUE7R0FDbEM7RUFDRDs7Ozs7O21CQVpvQixHQUFHOztBQWtCakIsVUFBUyxhQUFhLENBQUMsR0FBRyxFQUFFO0FBQ2xDLFNBQU8sSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtFQUNsQzs7O0FBR00sT0FBTSxTQUFTLEdBQUcsQ0FBQyxDQUFBOzs7O0FBR25CLE9BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQTs7OztBQUdyQixPQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUEiLCJmaWxlIjoiTG9jLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFJlcHJlc2VudHMgYSBzaW5nbGUgbG9jYXRpb24gaW4gdGhlIHNvdXJjZSBzdHJpbmcuICovXG5leHBvcnQgY2xhc3MgUG9zIHtcblx0Y29uc3RydWN0b3IobGluZSAvKiBOdW1iZXIgKi8sIGNvbHVtbiAvKiBOdW1iZXIgKi8pIHtcblx0XHR0aGlzLmxpbmUgPSBsaW5lXG5cdFx0dGhpcy5jb2x1bW4gPSBjb2x1bW5cblx0fVxuXG5cdC8qKiBBZHZhbmNlIHRoZSBwb3MgYnkgYW55IGNoYXJhY3Rlci4gKi9cblx0bmV4dChjaCkge1xuXHRcdHJldHVybiBjaCA9PT0gJ1xcbicgPyB0aGlzLm9uTmV4dExpbmUoKSA6IHRoaXMub25OZXh0Q29sdW1uKClcblx0fVxuXG5cdC8qKiBQb2MgYWZ0ZXIgYSBuZXdsaW5lLiAqL1xuXHRvbk5leHRMaW5lKCkge1xuXHRcdHJldHVybiBuZXcgUG9zKHRoaXMubGluZSArIDEsIFN0YXJ0Q29sdW1uKVxuXHR9XG5cblx0LyoqIExvYyBhZnRlciBhIG5vbi1uZXdsaW5lIGNoYXJhY3Rlci4gKi9cblx0b25OZXh0Q29sdW1uKCkge1xuXHRcdHJldHVybiBuZXcgUG9zKHRoaXMubGluZSwgdGhpcy5jb2x1bW4gKyAxKVxuXHR9XG5cblx0LyoqXG5cdCAqIFVuZG9lcyB7QGxpbmsgb25OZXh0TGluZX0uXG5cdCAqIE9ubHkgY2FsbCB0aGlzIGlzIHlvdSBrbm93IHRoaXMgaXMgbm90IHRoZSBmaXJzdCBjb2x1bW4uXG5cdCAqL1xuXHRvblByZXZDb2x1bW4oKSB7XG5cdFx0cmV0dXJuIG5ldyBQb3ModGhpcy5saW5lLCB0aGlzLmNvbHVtbiAtIDEpXG5cdH1cblxuXHQvKiogQG92ZXJyaWRlICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBgJHt0aGlzLmxpbmV9OiR7dGhpcy5jb2x1bW59YFxuXHR9XG59XG5cbi8qKiBSYW5nZSBvZiB0ZXh0IGluIHRoZSBzb3VyY2Ugc3RyaW5nLiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jIHtcblx0Y29uc3RydWN0b3Ioc3RhcnQgLyogUG9zICovLCBlbmQgLyogUG9zICovKSB7XG5cdFx0dGhpcy5zdGFydCA9IHN0YXJ0XG5cdFx0LyoqIEJlZ2lubmluZyBvZiB0ZXh0LiAqL1xuXHRcdHRoaXMuZW5kID0gZW5kXG5cdFx0LyoqIEVuZCBvZiB0ZXh0LiAqL1xuXHR9XG5cblx0LyoqIEBvdmVycmlkZSAqL1xuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gYCR7dGhpcy5zdGFydH0tJHt0aGlzLmVuZH1gXG5cdH1cbn1cblxuLyoqXG5Mb2MgY29uc2lzdGluZyBvZiB0aGUgY2hhcmFjdGVyIGF0IGBwb3NgLlxuQHBhcmFtIHtQb3N9IHBvc1xuKi9cbmV4cG9ydCBmdW5jdGlvbiBzaW5nbGVDaGFyTG9jKHBvcykge1xuXHRyZXR1cm4gbmV3IExvYyhwb3MsIHBvcy5uZXh0KCd4JykpXG59XG5cbi8qKiBGaXJzdCBsaW5lIG51bWJlciBmb3IgYSBzb3VyY2Ugc3RyaW5nOyB0aGV5IHN0YXJ0IGF0IDEuICovXG5leHBvcnQgY29uc3QgU3RhcnRMaW5lID0gMVxuXG4vKiogRmlzdCBjb2x1bW4gbnVtYmVyIGZvciBhIGxpbmU7IHRoZXkgc3RhcnQgYXQgMC4gKi9cbmV4cG9ydCBjb25zdCBTdGFydENvbHVtbiA9IDBcblxuLyoqIEZpcnN0IHtAbGluayBQb3N9IGluIGEgc291cmNlIHN0cmluZy4gKi9cbmV4cG9ydCBjb25zdCBTdGFydFBvcyA9IG5ldyBQb3MoU3RhcnRMaW5lLCBTdGFydENvbHVtbilcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9
