if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'acorn', './parse', './render'], function (exports, _acorn, _parse, _render) {
  'use strict';

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

  var _parse2 = _interopRequire(_parse);

  var _render2 = _interopRequire(_render);

  var src = '';

  var res = _parse2(src);

  console.log(res.toString());

  console.log(_render2(res));
});
// console.log(res.toString())

// const parsed = parse(src)
//# sourceMappingURL=test.js.map