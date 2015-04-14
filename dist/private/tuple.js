if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './util'], function (exports, module, _util) {
	'use strict';

	module.exports = function (name, superType) {
		for (var _len = arguments.length, namesTypes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			namesTypes[_key - 2] = arguments[_key];
		}

		var props = [];
		_util.assert(namesTypes.length % 2 === 0);
		for (var i = 0; i < namesTypes.length; i = i + 2) {
			props.push({ name: namesTypes[i], type: namesTypes[i + 1] });
		}var args = props.map(function (_) {
			return _.name;
		}).join(', ');

		var body = 'return function ' + name + '(' + args + ') {\n\tif (!(this instanceof ' + name + '))\n\t\treturn new ' + name + '(' + args + ');\n';

		props.forEach(function (_ref) {
			var name = _ref.name;

			body = body + ('this.' + name + ' = ' + name + '; if (this.' + name + ' === undefined) this.' + name + ' = null;\n\t');
		});
		body = body + 'this.postConstruct()\n}';
		var ctr = Function(body)();
		ctr.prototype = Object.assign(Object.create(superType.prototype), {
			constructor: ctr,
			toString: function toString() {
				return JSON.stringify(this, null, '\t');
			},
			// Default is to do nothing. May be overridden.
			postConstruct: function postConstruct() {},
			toJSON: function toJSON() {
				var _this = this;

				var obj = {};
				obj.type = this.type;
				Object.keys(this).sort().forEach(function (key) {
					obj[key] = _this[key];
				});
				return obj;
			}
		});

		ctr.props = props;

		return ctr;
	};
});
//# sourceMappingURL=../private/tuple.js.map