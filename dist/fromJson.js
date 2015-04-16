if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './ast', './Loc', './private/type'], function (exports, module, _ast, _Loc, _privateType) {
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
		type === Object ? prop : type === String || type === Boolean || type instanceof Set ? prop : type instanceof _privateType.Nullable ? '' + prop + ' == null ? null : ' + typeCtr(type.type, prop) : type.isTuple ? 'make.' + type.name + '(' + prop + ')' : 'fromJsonObject(' + prop + ')';
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
//# sourceMappingURL=fromJson.js.map