if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'acorn', './fromJSON'], function (exports, module, _acorn, _fromJSON) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _fromJSON2 = _interopRequire(_fromJSON);

	module.exports = function (src, opts) {
		opts = Object.assign({}, baseOpts, opts);
		var json = _acorn.parse(src, opts);
		return _fromJSON2(json);
	};

	var baseOpts = {
		ecmaVersion: 6,
		locations: true,
		sourceType: 'module'
	};
});
//# sourceMappingURL=parse.js.map