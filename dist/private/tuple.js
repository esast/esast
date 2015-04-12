if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './util'], function (exports, module, _util) {
	'use strict';

	module.exports = function (name, superType) {
		for (var _len = arguments.length, namesTypes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			namesTypes[_key - 2] = arguments[_key];
		}

		var names = [];
		_util.assert(namesTypes.length % 2 === 0);
		for (var i = 0; i < namesTypes.length; i = i + 2) {
			names.push(namesTypes[i]);
		}var args = names.join(', ');

		var body = 'return function ' + name + '(' + args + ') {\n\tif (!(this instanceof ' + name + '))\n\t\treturn new ' + name + '(' + args + ');\n';
		names.forEach(function (name) {
			body = body + ('this.' + name + ' = ' + name + ';\n\t');
		});
		body = body + '}';
		var ctr = Function(body)();
		ctr.prototype = Object.assign(Object.create(superType.prototype), {
			constructor: ctr,
			toString: function toString() {
				return inspect(this);
			}
		});
		return ctr;
	};

	var inspect = function inspect(_) {
		var indented = function indented(str) {
			return str.replace(/\n/g, '\n\t');
		};

		var s = (_.constructor.displayName || _.constructor.name) + ' {';
		Object.keys(_).forEach(function (key) {
			var val = _[key];
			var str = val instanceof Array ? val.join(',\n') : val.toString();
			s = s + ('\n\t' + key + ': ' + indented(str));
		});
		return s + '\n}';
	};
});
//# sourceMappingURL=../private/tuple.js.map