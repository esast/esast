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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0JBR2UsVUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFLO0FBQzdCLE1BQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDeEMsTUFBTSxJQUFJLEdBQUcsT0FMTCxLQUFLLENBS1csR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ2xDLFNBQU8sV0FBUyxJQUFJLENBQUMsQ0FBQTtFQUNyQjs7QUFDRCxLQUFNLFFBQVEsR0FBRztBQUNoQixhQUFXLEVBQUUsQ0FBQztBQUNkLFdBQVMsRUFBRSxJQUFJO0FBQ2YsWUFBVSxFQUFFLFFBQVE7RUFDcEIsQ0FBQSIsImZpbGUiOiJwYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBhcnNlIGFzIGFjb3JuUGFyc2UgfSBmcm9tICdhY29ybidcbmltcG9ydCBmcm9tSnNvbiBmcm9tICcuL2Zyb21Kc29uJ1xuXG5leHBvcnQgZGVmYXVsdCAoc3JjLCBvcHRzKSA9PiB7XG5cdG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBiYXNlT3B0cywgb3B0cylcblx0Y29uc3QganNvbiA9IGFjb3JuUGFyc2Uoc3JjLCBvcHRzKVxuXHRyZXR1cm4gZnJvbUpzb24oanNvbilcbn1cbmNvbnN0IGJhc2VPcHRzID0ge1xuXHRlY21hVmVyc2lvbjogNixcblx0bG9jYXRpb25zOiB0cnVlLFxuXHRzb3VyY2VUeXBlOiAnbW9kdWxlJ1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=