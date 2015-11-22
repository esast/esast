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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Mb2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBK0RnQixhQUFhLEdBQWIsYUFBYTs7T0E5RGhCLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FBSCxHQUFHLEdBQUgsR0FBRzs7T0FzQ0ssR0FBRzs7Ozs7Ozs7Ozs7O21CQUFILEdBQUc7O1VBd0JSLGFBQWE7Ozs7T0FLaEIsU0FBUyxXQUFULFNBQVMsR0FBRyxDQUFDO09BR2IsV0FBVyxXQUFYLFdBQVcsR0FBRyxDQUFDO09BR2YsUUFBUSxXQUFSLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDIiwiZmlsZSI6IkxvYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBSZXByZXNlbnRzIGEgc2luZ2xlIGxvY2F0aW9uIGluIHRoZSBzb3VyY2Ugc3RyaW5nLiAqL1xuZXhwb3J0IGNsYXNzIFBvcyB7XG5cdGNvbnN0cnVjdG9yKGxpbmUsIGNvbHVtbikge1xuXHRcdC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuXHRcdHRoaXMubGluZSA9IGxpbmVcblx0XHQvKiogQHR5cGUge251bWJlcn0gKi9cblx0XHR0aGlzLmNvbHVtbiA9IGNvbHVtblxuXHR9XG5cblx0LyoqIEFkdmFuY2UgdGhlIHBvcyBieSBhbnkgY2hhcmFjdGVyLiAqL1xuXHRuZXh0KGNoKSB7XG5cdFx0cmV0dXJuIGNoID09PSAnXFxuJyA/IHRoaXMub25OZXh0TGluZSgpIDogdGhpcy5vbk5leHRDb2x1bW4oKVxuXHR9XG5cblx0LyoqIFBvYyBhZnRlciBhIG5ld2xpbmUuICovXG5cdG9uTmV4dExpbmUoKSB7XG5cdFx0cmV0dXJuIG5ldyBQb3ModGhpcy5saW5lICsgMSwgU3RhcnRDb2x1bW4pXG5cdH1cblxuXHQvKiogTG9jIGFmdGVyIGEgbm9uLW5ld2xpbmUgY2hhcmFjdGVyLiAqL1xuXHRvbk5leHRDb2x1bW4oKSB7XG5cdFx0cmV0dXJuIG5ldyBQb3ModGhpcy5saW5lLCB0aGlzLmNvbHVtbiArIDEpXG5cdH1cblxuXHQvKipcblx0ICogVW5kb2VzIHtAbGluayBvbk5leHRMaW5lfS5cblx0ICogT25seSBjYWxsIHRoaXMgaXMgeW91IGtub3cgdGhpcyBpcyBub3QgdGhlIGZpcnN0IGNvbHVtbi5cblx0ICovXG5cdG9uUHJldkNvbHVtbigpIHtcblx0XHRyZXR1cm4gbmV3IFBvcyh0aGlzLmxpbmUsIHRoaXMuY29sdW1uIC0gMSlcblx0fVxuXG5cdC8qKiBAb3ZlcnJpZGUgKi9cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIGAke3RoaXMubGluZX06JHt0aGlzLmNvbHVtbn1gXG5cdH1cbn1cblxuLyoqIFJhbmdlIG9mIHRleHQgaW4gdGhlIHNvdXJjZSBzdHJpbmcuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2Mge1xuXHRjb25zdHJ1Y3RvcihzdGFydCwgZW5kKSB7XG5cdFx0LyoqXG5cdFx0QmVnaW5uaW5nIG9mIHRleHQuXG5cdFx0QHR5cGUge1Bvc31cblx0XHQqL1xuXHRcdHRoaXMuc3RhcnQgPSBzdGFydFxuXHRcdC8qKlxuXHRcdEVuZCBvZiB0ZXh0LlxuXHRcdEB0eXBlIHtQb3N9XG5cdFx0Ki9cblx0XHR0aGlzLmVuZCA9IGVuZFxuXHR9XG5cblx0LyoqIEBvdmVycmlkZSAqL1xuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gYCR7dGhpcy5zdGFydH0tJHt0aGlzLmVuZH1gXG5cdH1cbn1cblxuLyoqXG5Mb2MgY29uc2lzdGluZyBvZiB0aGUgY2hhcmFjdGVyIGF0IGBwb3NgLlxuQHBhcmFtIHtQb3N9IHBvc1xuKi9cbmV4cG9ydCBmdW5jdGlvbiBzaW5nbGVDaGFyTG9jKHBvcykge1xuXHRyZXR1cm4gbmV3IExvYyhwb3MsIHBvcy5uZXh0KCd4JykpXG59XG5cbi8qKiBGaXJzdCBsaW5lIG51bWJlciBmb3IgYSBzb3VyY2Ugc3RyaW5nOyB0aGV5IHN0YXJ0IGF0IDEuICovXG5leHBvcnQgY29uc3QgU3RhcnRMaW5lID0gMVxuXG4vKiogRmlzdCBjb2x1bW4gbnVtYmVyIGZvciBhIGxpbmU7IHRoZXkgc3RhcnQgYXQgMC4gKi9cbmV4cG9ydCBjb25zdCBTdGFydENvbHVtbiA9IDBcblxuLyoqIEZpcnN0IHtAbGluayBQb3N9IGluIGEgc291cmNlIHN0cmluZy4gKi9cbmV4cG9ydCBjb25zdCBTdGFydFBvcyA9IG5ldyBQb3MoU3RhcnRMaW5lLCBTdGFydENvbHVtbilcbiJdfQ==