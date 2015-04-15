if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './util'], function (exports, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	// TODO
	var Nullable = function Nullable(_) {
		return _;
	};
	exports.Nullable = Nullable;
	var Union = function Union(a, b) {
		return b;
	};

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
		if (type instanceof Set) return '' + toArray(type).map(function (_) {
			return '\'' + _ + '\'';
		}).join(' | ');
		if (type instanceof Array) {
			_util.assert(type.length === 1);
			return '[' + typeToString(type[0]) + ']';
		}
		return type.toString();
	});

	exports.typeToString = typeToString;
	var toArray = function toArray(iter) {
		var out = [];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = iter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var em = _step.value;

				out.push(em);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator['return']) {
					_iterator['return']();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return out;
	};
});
//# sourceMappingURL=../private/type.js.map