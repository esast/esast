if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './private/tuple'], function (exports, _privateTuple) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _tuple = _interopRequire(_privateTuple);

	var Pos = _tuple('Pos', Object, 'Single location in source string.', ['line', Number, 'column', Number], {
		next: function next(ch) {
			return ch === '\n' ? this.onNextLine() : this.onNextColumn();
		},

		onNextLine: function onNextLine() {
			return Pos(this.line + 1, 1);
		},

		onNextColumn: function onNextColumn() {
			return Pos(this.line, this.column + 1);
		},

		onPrevColumn: function onPrevColumn() {
			return Pos(this.line, this.column - 1);
		},

		toString: function toString() {
			return '' + this.line + ':' + this.column;
		}
	});

	exports.Pos = Pos;
	var Loc = _tuple('Loc', Object, 'Range of text in source string.', ['start', Pos, 'end', Pos], {
		toString: function toString() {
			return this.start + '-' + this.end;
		}
	});
	exports['default'] = Loc;
	var singleCharLoc = function singleCharLoc(pos) {
		return Loc(pos, pos.next('x'));
	},
	    StartPos = Pos(1, 1);
	exports.singleCharLoc = singleCharLoc;
	exports.StartPos = StartPos;
});
//# sourceMappingURL=Loc.js.map