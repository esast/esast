if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'acorn', './fromJSON'], function (exports, module, _acorn, _fromJSON) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _fromJSON2 = _interopRequire(_fromJSON);

	module.exports = function (src) {
		var json = _acorn.parse(src, {
			ecmaVersion: 6,
			sourceType: 'module'
		});
		return _fromJSON2(json);
	};
});
//# sourceMappingURL=parse.js.map