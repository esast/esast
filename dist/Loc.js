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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Mb2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBdURnQixhQUFhLEdBQWIsYUFBYTs7T0F0RGhCLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FBSCxHQUFHLEdBQUgsR0FBRzs7T0FvQ0ssR0FBRzs7Ozs7Ozs7Ozs7O21CQUFILEdBQUc7O1VBa0JSLGFBQWE7Ozs7T0FLaEIsU0FBUyxXQUFULFNBQVMsR0FBRyxDQUFDO09BR2IsV0FBVyxXQUFYLFdBQVcsR0FBRyxDQUFDO09BR2YsUUFBUSxXQUFSLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDIiwiZmlsZSI6IkxvYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBSZXByZXNlbnRzIGEgc2luZ2xlIGxvY2F0aW9uIGluIHRoZSBzb3VyY2Ugc3RyaW5nLiAqL1xuZXhwb3J0IGNsYXNzIFBvcyB7XG5cdGNvbnN0cnVjdG9yKGxpbmUgLyogTnVtYmVyICovLCBjb2x1bW4gLyogTnVtYmVyICovKSB7XG5cdFx0dGhpcy5saW5lID0gbGluZVxuXHRcdHRoaXMuY29sdW1uID0gY29sdW1uXG5cdH1cblxuXHQvKiogQWR2YW5jZSB0aGUgcG9zIGJ5IGFueSBjaGFyYWN0ZXIuICovXG5cdG5leHQoY2gpIHtcblx0XHRyZXR1cm4gY2ggPT09ICdcXG4nID8gdGhpcy5vbk5leHRMaW5lKCkgOiB0aGlzLm9uTmV4dENvbHVtbigpXG5cdH1cblxuXHQvKiogUG9jIGFmdGVyIGEgbmV3bGluZS4gKi9cblx0b25OZXh0TGluZSgpIHtcblx0XHRyZXR1cm4gbmV3IFBvcyh0aGlzLmxpbmUgKyAxLCBTdGFydENvbHVtbilcblx0fVxuXG5cdC8qKiBMb2MgYWZ0ZXIgYSBub24tbmV3bGluZSBjaGFyYWN0ZXIuICovXG5cdG9uTmV4dENvbHVtbigpIHtcblx0XHRyZXR1cm4gbmV3IFBvcyh0aGlzLmxpbmUsIHRoaXMuY29sdW1uICsgMSlcblx0fVxuXG5cdC8qKlxuXHQgKiBVbmRvZXMge0BsaW5rIG9uTmV4dExpbmV9LlxuXHQgKiBPbmx5IGNhbGwgdGhpcyBpcyB5b3Uga25vdyB0aGlzIGlzIG5vdCB0aGUgZmlyc3QgY29sdW1uLlxuXHQgKi9cblx0b25QcmV2Q29sdW1uKCkge1xuXHRcdHJldHVybiBuZXcgUG9zKHRoaXMubGluZSwgdGhpcy5jb2x1bW4gLSAxKVxuXHR9XG5cblx0LyoqIEBvdmVycmlkZSAqL1xuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gYCR7dGhpcy5saW5lfToke3RoaXMuY29sdW1ufWBcblx0fVxufVxuXG4vKiogUmFuZ2Ugb2YgdGV4dCBpbiB0aGUgc291cmNlIHN0cmluZy4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYyB7XG5cdGNvbnN0cnVjdG9yKHN0YXJ0IC8qIFBvcyAqLywgZW5kIC8qIFBvcyAqLykge1xuXHRcdHRoaXMuc3RhcnQgPSBzdGFydFxuXHRcdC8qKiBCZWdpbm5pbmcgb2YgdGV4dC4gKi9cblx0XHR0aGlzLmVuZCA9IGVuZFxuXHRcdC8qKiBFbmQgb2YgdGV4dC4gKi9cblx0fVxuXG5cdC8qKiBAb3ZlcnJpZGUgKi9cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIGAke3RoaXMuc3RhcnR9LSR7dGhpcy5lbmR9YFxuXHR9XG59XG5cbi8qKlxuTG9jIGNvbnNpc3Rpbmcgb2YgdGhlIGNoYXJhY3RlciBhdCBgcG9zYC5cbkBwYXJhbSB7UG9zfSBwb3NcbiovXG5leHBvcnQgZnVuY3Rpb24gc2luZ2xlQ2hhckxvYyhwb3MpIHtcblx0cmV0dXJuIG5ldyBMb2MocG9zLCBwb3MubmV4dCgneCcpKVxufVxuXG4vKiogRmlyc3QgbGluZSBudW1iZXIgZm9yIGEgc291cmNlIHN0cmluZzsgdGhleSBzdGFydCBhdCAxLiAqL1xuZXhwb3J0IGNvbnN0IFN0YXJ0TGluZSA9IDFcblxuLyoqIEZpc3QgY29sdW1uIG51bWJlciBmb3IgYSBsaW5lOyB0aGV5IHN0YXJ0IGF0IDAuICovXG5leHBvcnQgY29uc3QgU3RhcnRDb2x1bW4gPSAwXG5cbi8qKiBGaXJzdCB7QGxpbmsgUG9zfSBpbiBhIHNvdXJjZSBzdHJpbmcuICovXG5leHBvcnQgY29uc3QgU3RhcnRQb3MgPSBuZXcgUG9zKFN0YXJ0TGluZSwgU3RhcnRDb2x1bW4pXG4iXX0=