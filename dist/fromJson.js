if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'tupl/dist/type', './ast', './Loc'], function (exports, module, _tuplDistType, _ast, _Loc) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

	var _Loc2 = _interopRequire(_Loc);

	var typeCtr = (function (_typeCtr) {
		function typeCtr(_x, _x2) {
			return _typeCtr.apply(this, arguments);
		}

		typeCtr.toString = function () {
			return _typeCtr.toString();
		};

		return typeCtr;
	})(function (type, val) {
		return type instanceof Array ? '' + val + '.map(function(_) { return ' + typeCtr(type[0], '_') + ' })' :
		// TODO: KLUDGE for Literal
		type === Object ? val :
		// Set means a set of possible strings
		type === String || type === Boolean || type instanceof Set ? val : type instanceof _tuplDistType.Nullable ? '' + val + ' == null ? null : ' + typeCtr(type.type, val) : type.isTuple ?
		// This is created inside fromJsonObject.
		'from' + type.name + '(' + val + ')' : 'fromJsonObject(' + val + ')';
	}),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyb21Kc29uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLEtBQ0MsT0FBTzs7Ozs7Ozs7OztJQUFHLFVBQUMsSUFBSSxFQUFFLEdBQUc7U0FDbkIsSUFBSSxZQUFZLEtBQUssUUFDakIsR0FBRyxrQ0FBNkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7O0FBRXhELE1BQUksS0FBSyxNQUFNLEdBQ2YsR0FBRzs7QUFFSCxBQUFDLE1BQUksS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLFlBQVksR0FBRyxHQUMzRCxHQUFHLEdBQ0gsSUFBSSwwQkFkRSxRQUFRLEFBY1UsUUFDckIsR0FBRywwQkFBcUIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQ2xELElBQUksQ0FBQyxPQUFPOztXQUVMLElBQUksQ0FBQyxJQUFJLFNBQUksR0FBRyw2QkFDTCxHQUFHLE1BQUc7RUFBQSxDQUFBO0tBRTFCLFFBQVEsR0FBRyxrQkFBQyxLQUFLLEVBQUUsR0FBRyxFQUFLO0FBQzFCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO09BQUcsSUFBSSxRQUFKLElBQUk7T0FBRSxJQUFJLFFBQUosSUFBSTtVQUFPLE9BQU8sQ0FBQyxJQUFJLE9BQUssR0FBRyxTQUFJLElBQUksQ0FBRztHQUFBLENBQUMsQ0FBQTtBQUNsRixvQkFBZ0IsS0FBSyxDQUFDLElBQUksU0FBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFXO0VBQ3hELENBQUE7Ozs7O2tCQUlhLENBQUMsWUFBTTtBQUNyQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxNQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztVQUFJLEtBQUksR0FBRyxDQUFDO0dBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUM7VUFBSSxDQUFDLENBQUMsT0FBTztHQUFBLENBQUMsQ0FBQTs7O0FBRzNFLE1BQUksQ0FBQyxHQUFHLHNGQUFzRixDQUFBO0FBQzlGLEdBQUMsR0FBRyxDQUFDLEdBQUcsa0ZBQWtGLENBQUE7QUFDMUYsR0FBQyxHQUFHLENBQUMsR0FBRyxrRUFBa0UsQ0FBQTs7QUFFMUUsUUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7VUFDbkIsQ0FBQyxHQUFHLENBQUMsc0JBQW1CLEtBQUssQ0FBQyxJQUFJLHFCQUFnQixRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxVQUFNO0dBQUEsQ0FBQyxDQUFBOztBQUU5RSxHQUFDLEdBQUcsQ0FBQyxHQUFHLGtEQUFrRCxDQUFBO0FBQzFELFFBQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1VBQ25CLENBQUMsR0FBRyxDQUFDLGVBQVksS0FBSyxDQUFDLElBQUksc0JBQWlCLEtBQUssQ0FBQyxJQUFJLFdBQU87R0FBQSxDQUFDLENBQUE7QUFDL0QsR0FBQyxHQUFHLENBQUMsR0FBRyxpRkFBaUYsQ0FBQTs7QUFFekYsU0FBTyxRQUFRLG1CQUFDLEtBQUssRUFBRSxLQUFLLDRCQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO1VBQUksQ0FBQyxDQUFDLElBQUk7R0FBQSxDQUFDLElBQUUsQ0FBQyxHQUFDLCtCQTFDL0MsR0FBRyw0QkEwQzBELE1BQU0sR0FBQyxDQUFBO0VBQ2pGLENBQUEsRUFBRyIsImZpbGUiOiJmcm9tSnNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE51bGxhYmxlIH0gZnJvbSAndHVwbC9kaXN0L3R5cGUnXG5pbXBvcnQgKiBhcyBBc3QgZnJvbSAnLi9hc3QnXG5pbXBvcnQgTG9jLCB7IFBvcyB9IGZyb20gJy4vTG9jJ1xuXG5jb25zdFxuXHR0eXBlQ3RyID0gKHR5cGUsIHZhbCkgPT5cblx0XHR0eXBlIGluc3RhbmNlb2YgQXJyYXkgP1xuXHRcdFx0YCR7dmFsfS5tYXAoZnVuY3Rpb24oXykgeyByZXR1cm4gJHt0eXBlQ3RyKHR5cGVbMF0sICdfJyl9IH0pYCA6XG5cdFx0XHQvLyBUT0RPOiBLTFVER0UgZm9yIExpdGVyYWxcblx0XHRcdHR5cGUgPT09IE9iamVjdCA/XG5cdFx0XHR2YWwgOlxuXHRcdFx0Ly8gU2V0IG1lYW5zIGEgc2V0IG9mIHBvc3NpYmxlIHN0cmluZ3Ncblx0XHRcdCh0eXBlID09PSBTdHJpbmcgfHwgdHlwZSA9PT0gQm9vbGVhbiB8fCB0eXBlIGluc3RhbmNlb2YgU2V0KSA/XG5cdFx0XHR2YWwgOlxuXHRcdFx0dHlwZSBpbnN0YW5jZW9mIE51bGxhYmxlID9cblx0XHRcdGAke3ZhbH0gPT0gbnVsbCA/IG51bGwgOiAke3R5cGVDdHIodHlwZS50eXBlLCB2YWwpfWAgOlxuXHRcdFx0dHlwZS5pc1R1cGxlID9cblx0XHRcdC8vIFRoaXMgaXMgY3JlYXRlZCBpbnNpZGUgZnJvbUpzb25PYmplY3QuXG5cdFx0XHRgZnJvbSR7dHlwZS5uYW1lfSgke3ZhbH0pYCA6XG5cdFx0XHRgZnJvbUpzb25PYmplY3QoJHt2YWx9KWAsXG5cblx0dHVwbGVDdHIgPSAodHVwbGUsIHZhbCkgPT4ge1xuXHRcdGNvbnN0IHBhcnRzID0gdHVwbGUucHJvcHMubWFwKCh7IG5hbWUsIHR5cGUgfSkgPT4gdHlwZUN0cih0eXBlLCBgJHt2YWx9LiR7bmFtZX1gKSlcblx0XHRyZXR1cm4gYGwobmV3ICR7dHVwbGUubmFtZX0oJHtwYXJ0cy5qb2luKCcsJyl9KSwgXy5sb2MpYFxuXHR9XG5cbi8vIFdlIGNvZGUtZ2VuZXJhdGUgZnVuY3Rpb25zIGZvciBlYWNoIHR1cGxlIHVzaW5nIHR1cGxlQ3RyLlxuLy8gVGhlbiB3ZSBjcmVhdGUgYSBiaWcgc3dpdGNoIHN0YXRlbWVudCBjaG9vc2luZyBvbmUgb2YgdGhvc2UgZnVuY3RvaW5zLlxuZXhwb3J0IGRlZmF1bHQgKCgpID0+IHtcblx0Y29uc3QgdHVwbGVzID0gT2JqZWN0LmtleXMoQXN0KS5tYXAoa2V5ID0+IEFzdFtrZXldKS5maWx0ZXIoXyA9PiBfLmlzVHVwbGUpXG5cblx0Ly8gQ29weSBsb2MgaW5mb3JtYXRpb24gc2VwYXJhdGVseS5cblx0bGV0IHMgPSAnZnVuY3Rpb24gbChvYmosIGxvYykgeyBpZiAobG9jICE9PSB1bmRlZmluZWQpIG9iai5sb2MgPSBmcm9tTG9jKGxvYyk7IHJldHVybiBvYmogfVxcbidcblx0cyA9IHMgKyAnZnVuY3Rpb24gZnJvbUxvYyhsb2MpIHsgcmV0dXJuIG5ldyBMb2MoZnJvbVBvcyhsb2Muc3RhcnQpLCBmcm9tUG9zKGxvYy5lbmQpKSB9XFxuJ1xuXHRzID0gcyArICdmdW5jdGlvbiBmcm9tUG9zKHBvcykgeyByZXR1cm4gbmV3IFBvcyhwb3MubGluZSwgcG9zLmNvbHVtbikgfVxcbidcblxuXHR0dXBsZXMuZm9yRWFjaCh0dXBsZSA9PlxuXHRcdHMgPSBzICsgYGZ1bmN0aW9uIGZyb20ke3R1cGxlLm5hbWV9KF8pIHsgcmV0dXJuICR7dHVwbGVDdHIodHVwbGUsICdfJyl9IH1cXG5gKVxuXG5cdHMgPSBzICsgJ2Z1bmN0aW9uIGZyb21Kc29uT2JqZWN0KF8pIHtcXG5zd2l0Y2ggKF8udHlwZSlcXG57J1xuXHR0dXBsZXMuZm9yRWFjaCh0dXBsZSA9PlxuXHRcdHMgPSBzICsgYGNhc2UgXCIke3R1cGxlLm5hbWV9XCI6IHJldHVybiBmcm9tJHt0dXBsZS5uYW1lfShfKVxcbmApXG5cdHMgPSBzICsgJ31cXG50aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZSBgXCIrXy50eXBlK1wiYC5cIilcXG59XFxucmV0dXJuIGZyb21Kc29uT2JqZWN0J1xuXG5cdHJldHVybiBGdW5jdGlvbignTG9jJywgJ1BvcycsIC4uLnR1cGxlcy5tYXAoXyA9PiBfLm5hbWUpLCBzKShMb2MsIFBvcywgLi4udHVwbGVzKVxufSkoKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=