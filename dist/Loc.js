if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist/tupl'], function (exports, _tuplDistTupl) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _tupl = _interopRequireDefault(_tuplDistTupl);

	const Pos = (0, _tupl.default)('Pos', Object, 'Single location in source string.', ['line', Number, 'column', Number], {
		next(ch) {
			return ch === '\n' ? this.onNextLine() : this.onNextColumn();
		},

		onNextLine() {
			return Pos(this.line + 1, StartColumn);
		},

		onNextColumn() {
			return Pos(this.line, this.column + 1);
		},

		onPrevColumn() {
			return Pos(this.line, this.column - 1);
		},

		toString() {
			return `${ this.line }:${ this.column }`;
		}
	});

	exports.Pos = Pos;
	const Loc = (0, _tupl.default)('Loc', Object, 'Range of text in source string.', ['start', Pos, 'end', Pos], { toString() {
			return this.start + '-' + this.end;
		}
	});
	exports.default = Loc;
	const singleCharLoc = pos => Loc(pos, pos.next('x')),
	      StartLine = 1,
	      StartColumn = 0,
	      StartPos = Pos(StartLine, StartColumn);
	exports.singleCharLoc = singleCharLoc;
	exports.StartLine = StartLine;
	exports.StartColumn = StartColumn;
	exports.StartPos = StartPos;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVPLE9BQU0sR0FBRyxHQUFHLG1CQUFLLEtBQUssRUFBRSxNQUFNLEVBQ3BDLG1DQUFtQyxFQUNuQyxDQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBRSxFQUNwQztBQUNDLE1BQUksQ0FBQyxFQUFFLEVBQUU7QUFDUixVQUFPLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtHQUM1RDs7QUFFRCxZQUFVLEdBQUc7QUFDWixVQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtHQUN0Qzs7QUFFRCxjQUFZLEdBQUc7QUFDZCxVQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7R0FDdEM7O0FBRUQsY0FBWSxHQUFHO0FBQ2QsVUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0dBQ3RDOztBQUVELFVBQVEsR0FBRztBQUNWLFVBQU8sQ0FBQyxHQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFBO0dBQ3BDO0VBQ0QsQ0FBQyxDQUFBOzs7QUFFSCxPQUFNLEdBQUcsR0FBRyxtQkFBSyxLQUFLLEVBQUUsTUFBTSxFQUM3QixpQ0FBaUMsRUFDakMsQ0FBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUUsRUFDNUIsRUFBRSxRQUFRLEdBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7R0FBRTtFQUNuRCxDQUFDLENBQUE7bUJBQ2EsR0FBRztBQUVYLE9BQ04sYUFBYSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDOUMsU0FBUyxHQUFHLENBQUM7T0FDYixXQUFXLEdBQUcsQ0FBQztPQUNmLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFBIiwiZmlsZSI6IkxvYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuXG5leHBvcnQgY29uc3QgUG9zID0gdHVwbCgnUG9zJywgT2JqZWN0LFxuXHQnU2luZ2xlIGxvY2F0aW9uIGluIHNvdXJjZSBzdHJpbmcuJyxcblx0WyAnbGluZScsIE51bWJlciwgJ2NvbHVtbicsIE51bWJlciBdLFxuXHR7XG5cdFx0bmV4dChjaCkge1xuXHRcdFx0cmV0dXJuIGNoID09PSAnXFxuJyA/IHRoaXMub25OZXh0TGluZSgpIDogdGhpcy5vbk5leHRDb2x1bW4oKVxuXHRcdH0sXG5cblx0XHRvbk5leHRMaW5lKCkge1xuXHRcdFx0cmV0dXJuIFBvcyh0aGlzLmxpbmUgKyAxLCBTdGFydENvbHVtbilcblx0XHR9LFxuXG5cdFx0b25OZXh0Q29sdW1uKCkge1xuXHRcdFx0cmV0dXJuIFBvcyh0aGlzLmxpbmUsIHRoaXMuY29sdW1uICsgMSlcblx0XHR9LFxuXG5cdFx0b25QcmV2Q29sdW1uKCkge1xuXHRcdFx0cmV0dXJuIFBvcyh0aGlzLmxpbmUsIHRoaXMuY29sdW1uIC0gMSlcblx0XHR9LFxuXG5cdFx0dG9TdHJpbmcoKSB7XG5cdFx0XHRyZXR1cm4gYCR7dGhpcy5saW5lfToke3RoaXMuY29sdW1ufWBcblx0XHR9XG5cdH0pXG5cbmNvbnN0IExvYyA9IHR1cGwoJ0xvYycsIE9iamVjdCxcblx0J1JhbmdlIG9mIHRleHQgaW4gc291cmNlIHN0cmluZy4nLFxuXHRbICdzdGFydCcsIFBvcywgJ2VuZCcsIFBvcyBdLFxuXHR7IHRvU3RyaW5nKCkgeyByZXR1cm4gdGhpcy5zdGFydCArICctJyArIHRoaXMuZW5kIH1cbn0pXG5leHBvcnQgZGVmYXVsdCBMb2NcblxuZXhwb3J0IGNvbnN0XG5cdHNpbmdsZUNoYXJMb2MgPSBwb3MgPT4gTG9jKHBvcywgcG9zLm5leHQoJ3gnKSksXG5cdFN0YXJ0TGluZSA9IDEsXG5cdFN0YXJ0Q29sdW1uID0gMCxcblx0U3RhcnRQb3MgPSBQb3MoU3RhcnRMaW5lLCBTdGFydENvbHVtbilcblxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=