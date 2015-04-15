if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../ast', './type'], function (exports, module, _ast, _type) {
	'use strict';

	module.exports = function () {
		var str = '';
		var add = function add(added) {
			str = str + added;
		};

		Object.keys(_ast).forEach(function (name) {
			var _ = _ast[name];
			if (_.doc === undefined) return;

			add('## ' + _ + '\n\n');

			if (_.props !== undefined) _.props.forEach(function (_ref) {
				var name = _ref.name;
				var type = _ref.type;
				return add('\t' + name + ': ' + _type.typeToString(type) + '\n');
			});else add('(abstract type)\n');

			add('\n' + _.doc + '\n\n');
		});

		return str;
	};
});
//# sourceMappingURL=../private/doc.js.map