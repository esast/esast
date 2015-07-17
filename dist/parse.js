if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'acorn', './fromJson'], function (exports, module, _acorn, _fromJson) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _fromJson2 = _interopRequireDefault(_fromJson);

	module.exports = (src, opts) => {
		opts = Object.assign({}, baseOpts, opts);
		const json = (0, _acorn.parse)(src, opts);
		return (0, _fromJson2.default)(json);
	};

	const baseOpts = {
		ecmaVersion: 6,
		locations: true,
		sourceType: 'module'
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0JBR2UsQ0FBQyxHQUFHLEVBQUUsSUFBSSxLQUFLO0FBQzdCLE1BQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDeEMsUUFBTSxJQUFJLEdBQUcsV0FMTCxLQUFLLEVBS1csR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ2xDLFNBQU8sd0JBQVMsSUFBSSxDQUFDLENBQUE7RUFDckI7O0FBQ0QsT0FBTSxRQUFRLEdBQUc7QUFDaEIsYUFBVyxFQUFFLENBQUM7QUFDZCxXQUFTLEVBQUUsSUFBSTtBQUNmLFlBQVUsRUFBRSxRQUFRO0VBQ3BCLENBQUEiLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwYXJzZSBhcyBhY29yblBhcnNlIH0gZnJvbSAnYWNvcm4nXG5pbXBvcnQgZnJvbUpzb24gZnJvbSAnLi9mcm9tSnNvbidcblxuZXhwb3J0IGRlZmF1bHQgKHNyYywgb3B0cykgPT4ge1xuXHRvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgYmFzZU9wdHMsIG9wdHMpXG5cdGNvbnN0IGpzb24gPSBhY29yblBhcnNlKHNyYywgb3B0cylcblx0cmV0dXJuIGZyb21Kc29uKGpzb24pXG59XG5jb25zdCBiYXNlT3B0cyA9IHtcblx0ZWNtYVZlcnNpb246IDYsXG5cdGxvY2F0aW9uczogdHJ1ZSxcblx0c291cmNlVHlwZTogJ21vZHVsZSdcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9