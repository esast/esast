if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'acorn', './fromJson'], function (exports, module, _acorn, _fromJson) {
	'use strict';

	module.exports = parse;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _fromJson2 = _interopRequireDefault(_fromJson);

	/**
 Parses source code.
 @param {string} src JavaScript source code.
 @param {object} options Options for [acorn](https://github.com/marijnh/acorn).
 @return {Node}
 */

	function parse(src, options) {
		// TODO:ES6 Optional args
		if (options === undefined) options = {};
		options = Object.assign({}, baseOpts, options);
		return (0, _fromJson2.default)((0, _acorn.parse)(src, options));
	}

	const baseOpts = {
		ecmaVersion: 6,
		locations: true,
		sourceType: 'module'
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7a0JBU3dCLEtBQUs7Ozs7Ozs7Ozs7Ozs7QUFBZCxVQUFTLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFOztBQUUzQyxNQUFJLE9BQU8sS0FBSyxTQUFTLEVBQ3hCLE9BQU8sR0FBRyxFQUFFLENBQUE7QUFDYixTQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQzlDLFNBQU8sd0JBQVMsV0FkVCxLQUFLLEVBY2UsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7RUFDekM7O0FBQ0QsT0FBTSxRQUFRLEdBQUc7QUFDaEIsYUFBVyxFQUFFLENBQUM7QUFDZCxXQUFTLEVBQUUsSUFBSTtBQUNmLFlBQVUsRUFBRSxRQUFRO0VBQ3BCLENBQUEiLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3BhcnNlIGFzIGFjb3JuUGFyc2V9IGZyb20gJ2Fjb3JuJ1xuaW1wb3J0IGZyb21Kc29uIGZyb20gJy4vZnJvbUpzb24nXG5cbi8qKlxuUGFyc2VzIHNvdXJjZSBjb2RlLlxuQHBhcmFtIHtzdHJpbmd9IHNyYyBKYXZhU2NyaXB0IHNvdXJjZSBjb2RlLlxuQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBmb3IgW2Fjb3JuXShodHRwczovL2dpdGh1Yi5jb20vbWFyaWpuaC9hY29ybikuXG5AcmV0dXJuIHtOb2RlfVxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKHNyYywgb3B0aW9ucykge1xuXHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpXG5cdFx0b3B0aW9ucyA9IHt9XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBiYXNlT3B0cywgb3B0aW9ucylcblx0cmV0dXJuIGZyb21Kc29uKGFjb3JuUGFyc2Uoc3JjLCBvcHRpb25zKSlcbn1cbmNvbnN0IGJhc2VPcHRzID0ge1xuXHRlY21hVmVyc2lvbjogNixcblx0bG9jYXRpb25zOiB0cnVlLFxuXHRzb3VyY2VUeXBlOiAnbW9kdWxlJ1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=
