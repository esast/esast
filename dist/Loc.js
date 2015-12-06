'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.Loc = mod.exports;
	}
})(this, function (exports) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.singleCharLoc = singleCharLoc;

	class Pos {
		constructor(line, column) {
			this.line = line;
			this.column = column;
		}

		compare(pos) {
			const lineDiff = this.line - pos.line;
			return lineDiff === 0 ? this.column - pos.column : lineDiff;
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

	exports.Pos = Pos;

	class Loc {
		constructor(start, end) {
			this.start = start;
			this.end = end;
		}

		compare(loc) {
			const startDiff = this.start.compare(loc.start);
			return startDiff === 0 ? this.end.compare(loc.end) : startDiff;
		}

		toString() {
			return `${ this.start }-${ this.end }`;
		}

	}

	exports.default = Loc;

	function singleCharLoc(pos) {
		return new Loc(pos, pos.next('x'));
	}

	const StartLine = exports.StartLine = 1;
	const StartColumn = exports.StartColumn = 0;
	const StartPos = exports.StartPos = new Pos(StartLine, StartColumn);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Mb2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBMkVnQixhQUFhLEdBQWIsYUFBYTs7T0ExRWhCLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUFILEdBQUcsR0FBSCxHQUFHOztPQTRDSyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OzttQkFBSCxHQUFHOztVQThCUixhQUFhOzs7O09BS2hCLFNBQVMsV0FBVCxTQUFTLEdBQUcsQ0FBQztPQUdiLFdBQVcsV0FBWCxXQUFXLEdBQUcsQ0FBQztPQUdmLFFBQVEsV0FBUixRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyIsImZpbGUiOiJMb2MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogUmVwcmVzZW50cyBhIHNpbmdsZSBsb2NhdGlvbiBpbiB0aGUgc291cmNlIHN0cmluZy4gKi9cbmV4cG9ydCBjbGFzcyBQb3Mge1xuXHRjb25zdHJ1Y3RvcihsaW5lLCBjb2x1bW4pIHtcblx0XHQvKiogQHR5cGUge251bWJlcn0gKi9cblx0XHR0aGlzLmxpbmUgPSBsaW5lXG5cdFx0LyoqIEB0eXBlIHtudW1iZXJ9ICovXG5cdFx0dGhpcy5jb2x1bW4gPSBjb2x1bW5cblx0fVxuXG5cdC8qKiAtMSBpZiB0aGlzIGNvbWVzIGVhcmxpZXIgaW4gdGhlIGNvZGUsIDEgaWYgdGhpcyBjb21lcyBsYXRlciwgMCBpZiB0aGV5IGFyZSB0aGUgc2FtZS4gKi9cblx0Y29tcGFyZShwb3MpIHtcblx0XHRjb25zdCBsaW5lRGlmZiA9IHRoaXMubGluZSAtIHBvcy5saW5lXG5cdFx0cmV0dXJuIGxpbmVEaWZmID09PSAwID8gdGhpcy5jb2x1bW4gLSBwb3MuY29sdW1uIDogbGluZURpZmZcblx0fVxuXG5cdC8qKiBBZHZhbmNlIHRoZSBwb3MgYnkgYW55IGNoYXJhY3Rlci4gKi9cblx0bmV4dChjaCkge1xuXHRcdHJldHVybiBjaCA9PT0gJ1xcbicgPyB0aGlzLm9uTmV4dExpbmUoKSA6IHRoaXMub25OZXh0Q29sdW1uKClcblx0fVxuXG5cdC8qKiBQb2MgYWZ0ZXIgYSBuZXdsaW5lLiAqL1xuXHRvbk5leHRMaW5lKCkge1xuXHRcdHJldHVybiBuZXcgUG9zKHRoaXMubGluZSArIDEsIFN0YXJ0Q29sdW1uKVxuXHR9XG5cblx0LyoqIExvYyBhZnRlciBhIG5vbi1uZXdsaW5lIGNoYXJhY3Rlci4gKi9cblx0b25OZXh0Q29sdW1uKCkge1xuXHRcdHJldHVybiBuZXcgUG9zKHRoaXMubGluZSwgdGhpcy5jb2x1bW4gKyAxKVxuXHR9XG5cblx0LyoqXG5cdCAqIFVuZG9lcyB7QGxpbmsgb25OZXh0TGluZX0uXG5cdCAqIE9ubHkgY2FsbCB0aGlzIGlzIHlvdSBrbm93IHRoaXMgaXMgbm90IHRoZSBmaXJzdCBjb2x1bW4uXG5cdCAqL1xuXHRvblByZXZDb2x1bW4oKSB7XG5cdFx0cmV0dXJuIG5ldyBQb3ModGhpcy5saW5lLCB0aGlzLmNvbHVtbiAtIDEpXG5cdH1cblxuXHQvKiogQG92ZXJyaWRlICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBgJHt0aGlzLmxpbmV9OiR7dGhpcy5jb2x1bW59YFxuXHR9XG59XG5cbi8qKiBSYW5nZSBvZiB0ZXh0IGluIHRoZSBzb3VyY2Ugc3RyaW5nLiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jIHtcblx0Y29uc3RydWN0b3Ioc3RhcnQsIGVuZCkge1xuXHRcdC8qKlxuXHRcdEJlZ2lubmluZyBvZiB0ZXh0LlxuXHRcdEB0eXBlIHtQb3N9XG5cdFx0Ki9cblx0XHR0aGlzLnN0YXJ0ID0gc3RhcnRcblx0XHQvKipcblx0XHRFbmQgb2YgdGV4dC5cblx0XHRAdHlwZSB7UG9zfVxuXHRcdCovXG5cdFx0dGhpcy5lbmQgPSBlbmRcblx0fVxuXG5cdC8qKiBDb21wYXJlIGJ5IGBzdGFydGAsIHRoZW4gYnkgYGVuZGAuICovXG5cdGNvbXBhcmUobG9jKSB7XG5cdFx0Y29uc3Qgc3RhcnREaWZmID0gdGhpcy5zdGFydC5jb21wYXJlKGxvYy5zdGFydClcblx0XHRyZXR1cm4gc3RhcnREaWZmID09PSAwID8gdGhpcy5lbmQuY29tcGFyZShsb2MuZW5kKSA6IHN0YXJ0RGlmZlxuXHR9XG5cblx0LyoqIEBvdmVycmlkZSAqL1xuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gYCR7dGhpcy5zdGFydH0tJHt0aGlzLmVuZH1gXG5cdH1cbn1cblxuLyoqXG5Mb2MgY29uc2lzdGluZyBvZiB0aGUgY2hhcmFjdGVyIGF0IGBwb3NgLlxuQHBhcmFtIHtQb3N9IHBvc1xuKi9cbmV4cG9ydCBmdW5jdGlvbiBzaW5nbGVDaGFyTG9jKHBvcykge1xuXHRyZXR1cm4gbmV3IExvYyhwb3MsIHBvcy5uZXh0KCd4JykpXG59XG5cbi8qKiBGaXJzdCBsaW5lIG51bWJlciBmb3IgYSBzb3VyY2Ugc3RyaW5nOyB0aGV5IHN0YXJ0IGF0IDEuICovXG5leHBvcnQgY29uc3QgU3RhcnRMaW5lID0gMVxuXG4vKiogRmlzdCBjb2x1bW4gbnVtYmVyIGZvciBhIGxpbmU7IHRoZXkgc3RhcnQgYXQgMC4gKi9cbmV4cG9ydCBjb25zdCBTdGFydENvbHVtbiA9IDBcblxuLyoqIEZpcnN0IHtAbGluayBQb3N9IGluIGEgc291cmNlIHN0cmluZy4gKi9cbmV4cG9ydCBjb25zdCBTdGFydFBvcyA9IG5ldyBQb3MoU3RhcnRMaW5lLCBTdGFydENvbHVtbilcbiJdfQ==