if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist/tupl'], function (exports, _tuplDistTupl) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _tupl = _interopRequire(_tuplDistTupl);

	var Pos = _tupl('Pos', Object, 'Single location in source string.', ['line', Number, 'column', Number], {
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
	var Loc = _tupl('Loc', Object, 'Range of text in source string.', ['start', Pos, 'end', Pos], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVPLEtBQU0sR0FBRyxHQUFHLE1BQUssS0FBSyxFQUFFLE1BQU0sRUFDcEMsbUNBQW1DLEVBQ25DLENBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFFLEVBQ3BDO0FBQ0MsTUFBSSxFQUFBLGNBQUMsRUFBRSxFQUFFO0FBQ1IsVUFBTyxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7R0FDNUQ7O0FBRUQsWUFBVSxFQUFBLHNCQUFHO0FBQ1osVUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7R0FDdEM7O0FBRUQsY0FBWSxFQUFBLHdCQUFHO0FBQ2QsVUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0dBQ3RDOztBQUVELGNBQVksRUFBQSx3QkFBRztBQUNkLFVBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtHQUN0Qzs7QUFFRCxVQUFRLEVBQUEsb0JBQUc7QUFDVixlQUFVLElBQUksQ0FBQyxJQUFJLFNBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRTtHQUNwQztFQUNELENBQUMsQ0FBQTs7U0F2QlUsR0FBRyxHQUFILEdBQUc7QUF5QmhCLEtBQU0sR0FBRyxHQUFHLE1BQUssS0FBSyxFQUFFLE1BQU0sRUFDN0IsaUNBQWlDLEVBQ2pDLENBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFFLEVBQUU7QUFDOUIsVUFBUSxFQUFBLG9CQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO0dBQUU7RUFDakQsQ0FBQyxDQUFBO3NCQUNhLEdBQUc7QUFFWCxLQUNOLGFBQWEsR0FBRyx1QkFBQSxHQUFHO1NBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQUE7S0FDOUMsU0FBUyxHQUFHLENBQUM7S0FDYixXQUFXLEdBQUcsQ0FBQztLQUNmLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFBO1NBSHRDLGFBQWEsR0FBYixhQUFhO1NBQ2IsU0FBUyxHQUFULFNBQVM7U0FDVCxXQUFXLEdBQVgsV0FBVztTQUNYLFFBQVEsR0FBUixRQUFRIiwiZmlsZSI6IkxvYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuXG5leHBvcnQgY29uc3QgUG9zID0gdHVwbCgnUG9zJywgT2JqZWN0LFxuXHQnU2luZ2xlIGxvY2F0aW9uIGluIHNvdXJjZSBzdHJpbmcuJyxcblx0WyAnbGluZScsIE51bWJlciwgJ2NvbHVtbicsIE51bWJlciBdLFxuXHR7XG5cdFx0bmV4dChjaCkge1xuXHRcdFx0cmV0dXJuIGNoID09PSAnXFxuJyA/IHRoaXMub25OZXh0TGluZSgpIDogdGhpcy5vbk5leHRDb2x1bW4oKVxuXHRcdH0sXG5cblx0XHRvbk5leHRMaW5lKCkge1xuXHRcdFx0cmV0dXJuIFBvcyh0aGlzLmxpbmUgKyAxLCBTdGFydENvbHVtbilcblx0XHR9LFxuXG5cdFx0b25OZXh0Q29sdW1uKCkge1xuXHRcdFx0cmV0dXJuIFBvcyh0aGlzLmxpbmUsIHRoaXMuY29sdW1uICsgMSlcblx0XHR9LFxuXG5cdFx0b25QcmV2Q29sdW1uKCkge1xuXHRcdFx0cmV0dXJuIFBvcyh0aGlzLmxpbmUsIHRoaXMuY29sdW1uIC0gMSlcblx0XHR9LFxuXG5cdFx0dG9TdHJpbmcoKSB7XG5cdFx0XHRyZXR1cm4gYCR7dGhpcy5saW5lfToke3RoaXMuY29sdW1ufWBcblx0XHR9XG5cdH0pXG5cbmNvbnN0IExvYyA9IHR1cGwoJ0xvYycsIE9iamVjdCxcblx0J1JhbmdlIG9mIHRleHQgaW4gc291cmNlIHN0cmluZy4nLFxuXHRbICdzdGFydCcsIFBvcywgJ2VuZCcsIFBvcyBdLCB7XG5cdHRvU3RyaW5nKCkgeyByZXR1cm4gdGhpcy5zdGFydCArICctJyArIHRoaXMuZW5kIH1cbn0pXG5leHBvcnQgZGVmYXVsdCBMb2NcblxuZXhwb3J0IGNvbnN0XG5cdHNpbmdsZUNoYXJMb2MgPSBwb3MgPT4gTG9jKHBvcywgcG9zLm5leHQoJ3gnKSksXG5cdFN0YXJ0TGluZSA9IDEsXG5cdFN0YXJ0Q29sdW1uID0gMCxcblx0U3RhcnRQb3MgPSBQb3MoU3RhcnRMaW5lLCBTdGFydENvbHVtbilcblxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=