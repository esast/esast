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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2tCQUdlLENBQUMsR0FBRyxFQUFFLElBQUksS0FBSztBQUM3QixNQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ3hDLFFBQU0sSUFBSSxHQUFHLFdBTEwsS0FBSyxFQUtXLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUNsQyxTQUFPLHdCQUFTLElBQUksQ0FBQyxDQUFBO0VBQ3JCOztBQUNELE9BQU0sUUFBUSxHQUFHO0FBQ2hCLGFBQVcsRUFBRSxDQUFDO0FBQ2QsV0FBUyxFQUFFLElBQUk7QUFDZixZQUFVLEVBQUUsUUFBUTtFQUNwQixDQUFBIiwiZmlsZSI6InBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2UgYXMgYWNvcm5QYXJzZSB9IGZyb20gJ2Fjb3JuJ1xuaW1wb3J0IGZyb21Kc29uIGZyb20gJy4vZnJvbUpzb24nXG5cbmV4cG9ydCBkZWZhdWx0IChzcmMsIG9wdHMpID0+IHtcblx0b3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIGJhc2VPcHRzLCBvcHRzKVxuXHRjb25zdCBqc29uID0gYWNvcm5QYXJzZShzcmMsIG9wdHMpXG5cdHJldHVybiBmcm9tSnNvbihqc29uKVxufVxuY29uc3QgYmFzZU9wdHMgPSB7XG5cdGVjbWFWZXJzaW9uOiA2LFxuXHRsb2NhdGlvbnM6IHRydWUsXG5cdHNvdXJjZVR5cGU6ICdtb2R1bGUnXG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==