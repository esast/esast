if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'acorn', './fromJson'], function (exports, module, _acorn, _fromJson) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _fromJson2 = _interopRequire(_fromJson);

	module.exports = function (src, opts) {
		opts = Object.assign({}, baseOpts, opts);
		var json = _acorn.parse(src, opts);
		return _fromJson2(json);
	};

	var baseOpts = {
		ecmaVersion: 6,
		locations: true,
		sourceType: 'module'
	};
});
//# sourceMappingURL=parse.js.map