if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'tupl/dist/type', './ast', './Loc'], function (exports, module, _tuplDistType, _ast, _Loc) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _Loc2 = _interopRequire(_Loc);

	var typeCtr = function typeCtr(type, val) {
		return type instanceof Array ? '' + val + '.map(function(_) { return ' + typeCtr(type[0], '_') + ' })' :
		// TODO: KLUDGE for Literal
		type === Object ? val :
		// Set means a set of possible strings
		type === String || type === Boolean || type instanceof Set ? val : type instanceof _tuplDistType.Nullable ? '' + val + ' == null ? null : ' + typeCtr(type.type, val) : type.isTuple ?
		// This is created inside fromJsonObject.
		'from' + type.name + '(' + val + ')' : 'fromJsonObject(' + val + ')';
	},
	    tupleCtr = function tupleCtr(tuple, val) {
		var parts = tuple.props.map(function (_ref) {
			var name = _ref.name;
			var type = _ref.type;
			return typeCtr(type, '' + val + '.' + name);
		});
		return 'l(new ' + tuple.name + '(' + parts.join(',') + '), _.loc)';
	};

	// We code-generate functions for each tuple using tupleCtr.
	// Then we create a big switch statement choosing one of those functoins.

	module.exports = (function () {
		var tuples = Object.keys(_ast).map(function (key) {
			return _ast[key];
		}).filter(function (_) {
			return _.isTuple;
		});

		// Copy loc information separately.
		var s = 'function l(obj, loc) { if (loc !== undefined) obj.loc = fromLoc(loc); return obj }\n';
		s = s + 'function fromLoc(loc) { return new Loc(fromPos(loc.start), fromPos(loc.end)) }\n';
		s = s + 'function fromPos(pos) { return new Pos(pos.line, pos.column) }\n';

		tuples.forEach(function (tuple) {
			return s = s + ('function from' + tuple.name + '(_) { return ' + tupleCtr(tuple, '_') + ' }\n');
		});

		s = s + 'function fromJsonObject(_) {\nswitch (_.type)\n{';
		tuples.forEach(function (tuple) {
			return s = s + ('case "' + tuple.name + '": return from' + tuple.name + '(_)\n');
		});
		s = s + '}\nthrow new Error("Unrecognized type `"+_.type+"`.")\n}\nreturn fromJsonObject';

		return Function.apply(undefined, ['Loc', 'Pos'].concat(_toConsumableArray(tuples.map(function (_) {
			return _.name;
		})), [s])).apply(undefined, [_Loc2, _Loc.Pos].concat(_toConsumableArray(tuples)));
	})();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyb21Kc29uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLEtBQ0MsT0FBTyxHQUFHLFNBQVYsT0FBTyxDQUFJLElBQUksRUFBRSxHQUFHO1NBQ25CLElBQUksWUFBWSxLQUFLLFFBQ2pCLEdBQUcsa0NBQTZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDOztBQUV4RCxNQUFJLEtBQUssTUFBTSxHQUNmLEdBQUc7O0FBRUgsQUFBQyxNQUFJLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxZQUFZLEdBQUcsR0FDM0QsR0FBRyxHQUNILElBQUksMEJBZEUsUUFBUSxBQWNVLFFBQ3JCLEdBQUcsMEJBQXFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUNsRCxJQUFJLENBQUMsT0FBTzs7V0FFTCxJQUFJLENBQUMsSUFBSSxTQUFJLEdBQUcsNkJBQ0wsR0FBRyxNQUFHO0VBQUE7S0FFMUIsUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFJLEtBQUssRUFBRSxHQUFHLEVBQUs7QUFDMUIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFjO09BQVosSUFBSSxHQUFOLElBQWMsQ0FBWixJQUFJO09BQUUsSUFBSSxHQUFaLElBQWMsQ0FBTixJQUFJO1VBQU8sT0FBTyxDQUFDLElBQUksT0FBSyxHQUFHLFNBQUksSUFBSSxDQUFHO0dBQUEsQ0FBQyxDQUFBO0FBQ2xGLG9CQUFnQixLQUFLLENBQUMsSUFBSSxTQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQVc7RUFDeEQsQ0FBQTs7Ozs7a0JBSWEsQ0FBQyxZQUFNO0FBQ3JCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLE1BQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO1VBQUksS0FBSSxHQUFHLENBQUM7R0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQztVQUFJLENBQUMsQ0FBQyxPQUFPO0dBQUEsQ0FBQyxDQUFBOzs7QUFHM0UsTUFBSSxDQUFDLEdBQUcsc0ZBQXNGLENBQUE7QUFDOUYsR0FBQyxHQUFHLENBQUMsR0FBRyxrRkFBa0YsQ0FBQTtBQUMxRixHQUFDLEdBQUcsQ0FBQyxHQUFHLGtFQUFrRSxDQUFBOztBQUUxRSxRQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztVQUNuQixDQUFDLEdBQUcsQ0FBQyxzQkFBbUIsS0FBSyxDQUFDLElBQUkscUJBQWdCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLFVBQU07R0FBQSxDQUFDLENBQUE7O0FBRTlFLEdBQUMsR0FBRyxDQUFDLEdBQUcsa0RBQWtELENBQUE7QUFDMUQsUUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7VUFDbkIsQ0FBQyxHQUFHLENBQUMsZUFBWSxLQUFLLENBQUMsSUFBSSxzQkFBaUIsS0FBSyxDQUFDLElBQUksV0FBTztHQUFBLENBQUMsQ0FBQTtBQUMvRCxHQUFDLEdBQUcsQ0FBQyxHQUFHLGlGQUFpRixDQUFBOztBQUV6RixTQUFPLFFBQVEsbUJBQUMsS0FBSyxFQUFFLEtBQUssNEJBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7VUFBSSxDQUFDLENBQUMsSUFBSTtHQUFBLENBQUMsSUFBRSxDQUFDLEdBQUMsK0JBMUMvQyxHQUFHLDRCQTBDMEQsTUFBTSxHQUFDLENBQUE7RUFDakYsQ0FBQSxFQUFHIiwiZmlsZSI6ImZyb21Kc29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICd0dXBsL2Rpc3QvdHlwZSdcbmltcG9ydCAqIGFzIEFzdCBmcm9tICcuL2FzdCdcbmltcG9ydCBMb2MsIHsgUG9zIH0gZnJvbSAnLi9Mb2MnXG5cbmNvbnN0XG5cdHR5cGVDdHIgPSAodHlwZSwgdmFsKSA9PlxuXHRcdHR5cGUgaW5zdGFuY2VvZiBBcnJheSA/XG5cdFx0XHRgJHt2YWx9Lm1hcChmdW5jdGlvbihfKSB7IHJldHVybiAke3R5cGVDdHIodHlwZVswXSwgJ18nKX0gfSlgIDpcblx0XHRcdC8vIFRPRE86IEtMVURHRSBmb3IgTGl0ZXJhbFxuXHRcdFx0dHlwZSA9PT0gT2JqZWN0ID9cblx0XHRcdHZhbCA6XG5cdFx0XHQvLyBTZXQgbWVhbnMgYSBzZXQgb2YgcG9zc2libGUgc3RyaW5nc1xuXHRcdFx0KHR5cGUgPT09IFN0cmluZyB8fCB0eXBlID09PSBCb29sZWFuIHx8IHR5cGUgaW5zdGFuY2VvZiBTZXQpID9cblx0XHRcdHZhbCA6XG5cdFx0XHR0eXBlIGluc3RhbmNlb2YgTnVsbGFibGUgP1xuXHRcdFx0YCR7dmFsfSA9PSBudWxsID8gbnVsbCA6ICR7dHlwZUN0cih0eXBlLnR5cGUsIHZhbCl9YCA6XG5cdFx0XHR0eXBlLmlzVHVwbGUgP1xuXHRcdFx0Ly8gVGhpcyBpcyBjcmVhdGVkIGluc2lkZSBmcm9tSnNvbk9iamVjdC5cblx0XHRcdGBmcm9tJHt0eXBlLm5hbWV9KCR7dmFsfSlgIDpcblx0XHRcdGBmcm9tSnNvbk9iamVjdCgke3ZhbH0pYCxcblxuXHR0dXBsZUN0ciA9ICh0dXBsZSwgdmFsKSA9PiB7XG5cdFx0Y29uc3QgcGFydHMgPSB0dXBsZS5wcm9wcy5tYXAoKHsgbmFtZSwgdHlwZSB9KSA9PiB0eXBlQ3RyKHR5cGUsIGAke3ZhbH0uJHtuYW1lfWApKVxuXHRcdHJldHVybiBgbChuZXcgJHt0dXBsZS5uYW1lfSgke3BhcnRzLmpvaW4oJywnKX0pLCBfLmxvYylgXG5cdH1cblxuLy8gV2UgY29kZS1nZW5lcmF0ZSBmdW5jdGlvbnMgZm9yIGVhY2ggdHVwbGUgdXNpbmcgdHVwbGVDdHIuXG4vLyBUaGVuIHdlIGNyZWF0ZSBhIGJpZyBzd2l0Y2ggc3RhdGVtZW50IGNob29zaW5nIG9uZSBvZiB0aG9zZSBmdW5jdG9pbnMuXG5leHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuXHRjb25zdCB0dXBsZXMgPSBPYmplY3Qua2V5cyhBc3QpLm1hcChrZXkgPT4gQXN0W2tleV0pLmZpbHRlcihfID0+IF8uaXNUdXBsZSlcblxuXHQvLyBDb3B5IGxvYyBpbmZvcm1hdGlvbiBzZXBhcmF0ZWx5LlxuXHRsZXQgcyA9ICdmdW5jdGlvbiBsKG9iaiwgbG9jKSB7IGlmIChsb2MgIT09IHVuZGVmaW5lZCkgb2JqLmxvYyA9IGZyb21Mb2MobG9jKTsgcmV0dXJuIG9iaiB9XFxuJ1xuXHRzID0gcyArICdmdW5jdGlvbiBmcm9tTG9jKGxvYykgeyByZXR1cm4gbmV3IExvYyhmcm9tUG9zKGxvYy5zdGFydCksIGZyb21Qb3MobG9jLmVuZCkpIH1cXG4nXG5cdHMgPSBzICsgJ2Z1bmN0aW9uIGZyb21Qb3MocG9zKSB7IHJldHVybiBuZXcgUG9zKHBvcy5saW5lLCBwb3MuY29sdW1uKSB9XFxuJ1xuXG5cdHR1cGxlcy5mb3JFYWNoKHR1cGxlID0+XG5cdFx0cyA9IHMgKyBgZnVuY3Rpb24gZnJvbSR7dHVwbGUubmFtZX0oXykgeyByZXR1cm4gJHt0dXBsZUN0cih0dXBsZSwgJ18nKX0gfVxcbmApXG5cblx0cyA9IHMgKyAnZnVuY3Rpb24gZnJvbUpzb25PYmplY3QoXykge1xcbnN3aXRjaCAoXy50eXBlKVxcbnsnXG5cdHR1cGxlcy5mb3JFYWNoKHR1cGxlID0+XG5cdFx0cyA9IHMgKyBgY2FzZSBcIiR7dHVwbGUubmFtZX1cIjogcmV0dXJuIGZyb20ke3R1cGxlLm5hbWV9KF8pXFxuYClcblx0cyA9IHMgKyAnfVxcbnRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlIGBcIitfLnR5cGUrXCJgLlwiKVxcbn1cXG5yZXR1cm4gZnJvbUpzb25PYmplY3QnXG5cblx0cmV0dXJuIEZ1bmN0aW9uKCdMb2MnLCAnUG9zJywgLi4udHVwbGVzLm1hcChfID0+IF8ubmFtZSksIHMpKExvYywgUG9zLCAuLi50dXBsZXMpXG59KSgpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==