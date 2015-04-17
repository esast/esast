if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './util', './tuple'], function (exports, _util, _tuple) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _tuple2 = _interopRequire(_tuple);

	// TODO
	var Nullable = _tuple2('Nullable', Object, 'doc', ['type', Object]);
	exports.Nullable = Nullable;
	var Union = _tuple2('Union', Object, 'doc', ['typeA', Object, 'typeB', Object]);

	exports.Union = Union;
	var typeToString = (function (_typeToString) {
		function typeToString(_x) {
			return _typeToString.apply(this, arguments);
		}

		typeToString.toString = function () {
			return _typeToString.toString();
		};

		return typeToString;
	})(function (type) {
		if (type instanceof Function) return type.name;
		if (type instanceof Set) return '' + setToArray(type).map(function (_) {
			return '\'' + _ + '\'';
		}).join(' | ');
		if (type instanceof Array) {
			_util.assert(type.length === 1);
			return '[' + typeToString(type[0]) + ']';
		}
		return type.toString();
	});

	exports.typeToString = typeToString;
	var setToArray = function setToArray(set) {
		var out = [];
		set.forEach(function (_) {
			return out.push(_);
		});
		return out;
	};
});
//# sourceMappingURL=../private/type.js.map