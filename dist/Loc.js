if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist/tupl'], function (exports, _tuplDistTupl) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _tupl = _interopRequire(_tuplDistTupl);

	var Pos = (0, _tupl)('Pos', Object, 'Single location in source string.', ['line', Number, 'column', Number], {
		next: function next(ch) {
			return ch === '\n' ? this.onNextLine() : this.onNextColumn();
		},

		onNextLine: function onNextLine() {
			return Pos(this.line + 1, StartColumn);
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
	var Loc = (0, _tupl)('Loc', Object, 'Range of text in source string.', ['start', Pos, 'end', Pos], {
		toString: function toString() {
			return this.start + '-' + this.end;
		}
	});
	exports['default'] = Loc;
	var singleCharLoc = function singleCharLoc(pos) {
		return Loc(pos, pos.next('x'));
	},
	    StartLine = 1,
	    StartColumn = 0,
	    StartPos = Pos(StartLine, StartColumn);
	exports.singleCharLoc = singleCharLoc;
	exports.StartLine = StartLine;
	exports.StartColumn = StartColumn;
	exports.StartPos = StartPos;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVPLEtBQU0sR0FBRyxHQUFHLFdBQUssS0FBSyxFQUFFLE1BQU0sRUFDcEMsbUNBQW1DLEVBQ25DLENBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFFLEVBQ3BDO0FBQ0MsTUFBSSxFQUFBLGNBQUMsRUFBRSxFQUFFO0FBQ1IsVUFBTyxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7R0FDNUQ7O0FBRUQsWUFBVSxFQUFBLHNCQUFHO0FBQ1osVUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7R0FDdEM7O0FBRUQsY0FBWSxFQUFBLHdCQUFHO0FBQ2QsVUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0dBQ3RDOztBQUVELGNBQVksRUFBQSx3QkFBRztBQUNkLFVBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtHQUN0Qzs7QUFFRCxVQUFRLEVBQUEsb0JBQUc7QUFDVixlQUFVLElBQUksQ0FBQyxJQUFJLFNBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRTtHQUNwQztFQUNELENBQUMsQ0FBQTs7U0F2QlUsR0FBRyxHQUFILEdBQUc7QUF5QmhCLEtBQU0sR0FBRyxHQUFHLFdBQUssS0FBSyxFQUFFLE1BQU0sRUFDN0IsaUNBQWlDLEVBQ2pDLENBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFFLEVBQUU7QUFDOUIsVUFBUSxFQUFBLG9CQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO0dBQUU7RUFDakQsQ0FBQyxDQUFBO3NCQUNhLEdBQUc7QUFFWCxLQUNOLGFBQWEsR0FBRyxTQUFoQixhQUFhLENBQUcsR0FBRztTQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUFBO0tBQzlDLFNBQVMsR0FBRyxDQUFDO0tBQ2IsV0FBVyxHQUFHLENBQUM7S0FDZixRQUFRLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQTtTQUh0QyxhQUFhLEdBQWIsYUFBYTtTQUNiLFNBQVMsR0FBVCxTQUFTO1NBQ1QsV0FBVyxHQUFYLFdBQVc7U0FDWCxRQUFRLEdBQVIsUUFBUSIsImZpbGUiOiJMb2MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHVwbCBmcm9tICd0dXBsL2Rpc3QvdHVwbCdcblxuZXhwb3J0IGNvbnN0IFBvcyA9IHR1cGwoJ1BvcycsIE9iamVjdCxcblx0J1NpbmdsZSBsb2NhdGlvbiBpbiBzb3VyY2Ugc3RyaW5nLicsXG5cdFsgJ2xpbmUnLCBOdW1iZXIsICdjb2x1bW4nLCBOdW1iZXIgXSxcblx0e1xuXHRcdG5leHQoY2gpIHtcblx0XHRcdHJldHVybiBjaCA9PT0gJ1xcbicgPyB0aGlzLm9uTmV4dExpbmUoKSA6IHRoaXMub25OZXh0Q29sdW1uKClcblx0XHR9LFxuXG5cdFx0b25OZXh0TGluZSgpIHtcblx0XHRcdHJldHVybiBQb3ModGhpcy5saW5lICsgMSwgU3RhcnRDb2x1bW4pXG5cdFx0fSxcblxuXHRcdG9uTmV4dENvbHVtbigpIHtcblx0XHRcdHJldHVybiBQb3ModGhpcy5saW5lLCB0aGlzLmNvbHVtbiArIDEpXG5cdFx0fSxcblxuXHRcdG9uUHJldkNvbHVtbigpIHtcblx0XHRcdHJldHVybiBQb3ModGhpcy5saW5lLCB0aGlzLmNvbHVtbiAtIDEpXG5cdFx0fSxcblxuXHRcdHRvU3RyaW5nKCkge1xuXHRcdFx0cmV0dXJuIGAke3RoaXMubGluZX06JHt0aGlzLmNvbHVtbn1gXG5cdFx0fVxuXHR9KVxuXG5jb25zdCBMb2MgPSB0dXBsKCdMb2MnLCBPYmplY3QsXG5cdCdSYW5nZSBvZiB0ZXh0IGluIHNvdXJjZSBzdHJpbmcuJyxcblx0WyAnc3RhcnQnLCBQb3MsICdlbmQnLCBQb3MgXSwge1xuXHR0b1N0cmluZygpIHsgcmV0dXJuIHRoaXMuc3RhcnQgKyAnLScgKyB0aGlzLmVuZCB9XG59KVxuZXhwb3J0IGRlZmF1bHQgTG9jXG5cbmV4cG9ydCBjb25zdFxuXHRzaW5nbGVDaGFyTG9jID0gcG9zID0+IExvYyhwb3MsIHBvcy5uZXh0KCd4JykpLFxuXHRTdGFydExpbmUgPSAxLFxuXHRTdGFydENvbHVtbiA9IDAsXG5cdFN0YXJ0UG9zID0gUG9zKFN0YXJ0TGluZSwgU3RhcnRDb2x1bW4pXG5cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9