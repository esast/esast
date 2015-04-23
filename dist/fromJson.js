if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'tupl/dist/type', './ast', './Loc'], function (exports, module, _tuplDistType, _ast, _Loc) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _Loc2 = _interopRequire(_Loc);

	module.exports = function (json) {
		if (typeof json === 'string') json = JSON.parse(json);
		return fromJsonObject(json);
	};

	var fromJsonObject = function fromJsonObject(json) {
		var obj = make[json.type](json);
		var loc = json.loc;
		if (loc !== undefined) obj.loc = _Loc2(posFromJson(loc.start), posFromJson(loc.end));
		return obj;
	};

	var posFromJson = function posFromJson(_) {
		return _Loc.Pos(_.line, _.column);
	};

	var typeCtr = (function (_typeCtr) {
		function typeCtr(_x, _x2) {
			return _typeCtr.apply(this, arguments);
		}

		typeCtr.toString = function () {
			return _typeCtr.toString();
		};

		return typeCtr;
	})(function (type, prop) {
		return type instanceof Array ? '' + prop + '.map(function(_) { return ' + typeCtr(type[0], '_') + ' })' :
		// TODO:KLUDGE for Literal
		type === Object ? prop : type === String || type === Boolean || type instanceof Set ? prop : type instanceof _tuplDistType.Nullable ? '' + prop + ' == null ? null : ' + typeCtr(type.type, prop) : type.isTuple ? 'make.' + type.name + '(' + prop + ')' : 'fromJsonObject(' + prop + ')';
	});

	var makeFromJson = function makeFromJson(tuple) {
		var parts = tuple.props.map(function (_ref) {
			var name = _ref.name;
			var type = _ref.type;
			return typeCtr(type, '_.' + name);
		});
		var src = 'return function(_) { return new tuple(' + parts.join(', ') + ') }';
		return Function('tuple', 'fromJsonObject', 'make', src)(tuple, fromJsonObject, make);
	};

	var make = {};
	Object.keys(_ast).forEach(function (key) {
		var tuple = _ast[key];
		if (tuple.isTuple) make[key] = makeFromJson(tuple);
	});
	Object.freeze(make);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyb21Kc29uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0JBSWUsVUFBQSxJQUFJLEVBQUk7QUFDdEIsTUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQzNCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLFNBQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQzNCOztBQUVELEtBQU0sY0FBYyxHQUFHLHdCQUFBLElBQUksRUFBSTtBQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7QUFDcEIsTUFBSSxHQUFHLEtBQUssU0FBUyxFQUNwQixHQUFHLENBQUMsR0FBRyxHQUFHLE1BQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUQsU0FBTyxHQUFHLENBQUE7RUFDVixDQUFBOztBQUVELEtBQU0sV0FBVyxHQUFHLHFCQUFBLENBQUM7U0FBSSxLQWhCWCxHQUFHLENBZ0JZLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztFQUFBLENBQUE7O0FBRTlDLEtBQU0sT0FBTzs7Ozs7Ozs7OztJQUFHLFVBQUMsSUFBSSxFQUFFLElBQUk7U0FDMUIsSUFBSSxZQUFZLEtBQUssUUFDakIsSUFBSSxrQ0FBNkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7O0FBRXpELE1BQUksS0FBSyxNQUFNLEdBQ2YsSUFBSSxHQUNKLEFBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxJQUFJLElBQUksWUFBWSxHQUFHLEdBQzNELElBQUksR0FDSixJQUFJLDBCQTVCRyxRQUFRLEFBNEJTLFFBQ3JCLElBQUksMEJBQXFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUNwRCxJQUFJLENBQUMsT0FBTyxhQUNKLElBQUksQ0FBQyxJQUFJLFNBQUksSUFBSSw2QkFDUCxJQUFJLE1BQUc7RUFBQSxDQUFBLENBQUE7O0FBRTNCLEtBQU0sWUFBWSxHQUFHLHNCQUFBLEtBQUssRUFBSTtBQUM3QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztPQUFHLElBQUksUUFBSixJQUFJO09BQUUsSUFBSSxRQUFKLElBQUk7VUFBTyxPQUFPLENBQUMsSUFBSSxTQUFPLElBQUksQ0FBRztHQUFBLENBQUMsQ0FBQTtBQUM3RSxNQUFNLEdBQUcsOENBQTRDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQUssQ0FBQTtBQUMxRSxTQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUE7RUFDcEYsQ0FBQTs7QUFFRCxLQUFNLElBQUksR0FBRyxFQUFHLENBQUE7QUFDaEIsT0FBTSxDQUFDLElBQUksTUFBSyxDQUFDLE9BQU8sQ0FBQyxVQUFTLEdBQUcsRUFBRTtBQUN0QyxNQUFNLEtBQUssR0FBRyxLQUFJLEdBQUcsQ0FBQyxDQUFBO0FBQ3RCLE1BQUksS0FBSyxDQUFDLE9BQU8sRUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNoQyxDQUFDLENBQUE7QUFDRixPQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBIiwiZmlsZSI6ImZyb21Kc29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICd0dXBsL2Rpc3QvdHlwZSdcbmltcG9ydCAqIGFzIEFzdCBmcm9tICcuL2FzdCdcbmltcG9ydCBMb2MsIHsgUG9zIH0gZnJvbSAnLi9Mb2MnXG5cbmV4cG9ydCBkZWZhdWx0IGpzb24gPT4ge1xuXHRpZiAodHlwZW9mIGpzb24gPT09ICdzdHJpbmcnKVxuXHRcdGpzb24gPSBKU09OLnBhcnNlKGpzb24pXG5cdHJldHVybiBmcm9tSnNvbk9iamVjdChqc29uKVxufVxuXG5jb25zdCBmcm9tSnNvbk9iamVjdCA9IGpzb24gPT4ge1xuXHRjb25zdCBvYmogPSBtYWtlW2pzb24udHlwZV0oanNvbilcblx0Y29uc3QgbG9jID0ganNvbi5sb2Ncblx0aWYgKGxvYyAhPT0gdW5kZWZpbmVkKVxuXHRcdG9iai5sb2MgPSBMb2MocG9zRnJvbUpzb24obG9jLnN0YXJ0KSwgcG9zRnJvbUpzb24obG9jLmVuZCkpXG5cdHJldHVybiBvYmpcbn1cblxuY29uc3QgcG9zRnJvbUpzb24gPSBfID0+IFBvcyhfLmxpbmUsIF8uY29sdW1uKVxuXG5jb25zdCB0eXBlQ3RyID0gKHR5cGUsIHByb3ApID0+XG5cdHR5cGUgaW5zdGFuY2VvZiBBcnJheSA/XG5cdFx0YCR7cHJvcH0ubWFwKGZ1bmN0aW9uKF8pIHsgcmV0dXJuICR7dHlwZUN0cih0eXBlWzBdLCAnXycpfSB9KWAgOlxuXHRcdC8vIFRPRE86S0xVREdFIGZvciBMaXRlcmFsXG5cdFx0dHlwZSA9PT0gT2JqZWN0ID9cblx0XHRwcm9wIDpcblx0XHQodHlwZSA9PT0gU3RyaW5nIHx8IHR5cGUgPT09IEJvb2xlYW4gfHwgdHlwZSBpbnN0YW5jZW9mIFNldCkgP1xuXHRcdHByb3AgOlxuXHRcdHR5cGUgaW5zdGFuY2VvZiBOdWxsYWJsZSA/XG5cdFx0YCR7cHJvcH0gPT0gbnVsbCA/IG51bGwgOiAke3R5cGVDdHIodHlwZS50eXBlLCBwcm9wKX1gIDpcblx0XHR0eXBlLmlzVHVwbGUgP1xuXHRcdGBtYWtlLiR7dHlwZS5uYW1lfSgke3Byb3B9KWAgOlxuXHRcdGBmcm9tSnNvbk9iamVjdCgke3Byb3B9KWBcblxuY29uc3QgbWFrZUZyb21Kc29uID0gdHVwbGUgPT4ge1xuXHRjb25zdCBwYXJ0cyA9IHR1cGxlLnByb3BzLm1hcCgoeyBuYW1lLCB0eXBlIH0pID0+IHR5cGVDdHIodHlwZSwgYF8uJHtuYW1lfWApKVxuXHRjb25zdCBzcmMgPSBgcmV0dXJuIGZ1bmN0aW9uKF8pIHsgcmV0dXJuIG5ldyB0dXBsZSgke3BhcnRzLmpvaW4oJywgJyl9KSB9YFxuXHRyZXR1cm4gRnVuY3Rpb24oJ3R1cGxlJywgJ2Zyb21Kc29uT2JqZWN0JywgJ21ha2UnLCBzcmMpKHR1cGxlLCBmcm9tSnNvbk9iamVjdCwgbWFrZSlcbn1cblxuY29uc3QgbWFrZSA9IHsgfVxuT2JqZWN0LmtleXMoQXN0KS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRjb25zdCB0dXBsZSA9IEFzdFtrZXldXG5cdGlmICh0dXBsZS5pc1R1cGxlKVxuXHRcdG1ha2Vba2V5XSA9IG1ha2VGcm9tSnNvbih0dXBsZSlcbn0pXG5PYmplY3QuZnJlZXplKG1ha2UpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==