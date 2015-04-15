if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './ast', './Loc'], function (exports, module, _ast, _Loc) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _Loc2 = _interopRequire(_Loc);

	module.exports = function (json) {
		if (typeof json === 'string') json = JSON.parse(json);
		return fromJsonObject(json);
	};

	var fromJsonObject = (function (_fromJsonObject) {
		function fromJsonObject(_x) {
			return _fromJsonObject.apply(this, arguments);
		}

		fromJsonObject.toString = function () {
			return _fromJsonObject.toString();
		};

		return fromJsonObject;
	})(function (json) {
		var type = _ast[json.type];
		if (type === undefined) throw new Error('Unsupported type: ' + json.type + ' for ' + json);

		var obj = Object.create(type.prototype);
		type.props.forEach(function (_ref) {
			var name = _ref.name;

			// TODO: Type check
			var _ = json[name];
			if (_ === undefined) _ = null;else if (_ instanceof Array) _ = _.map(fromJsonObject);else if (typeof _ === 'object' && _ !== null) _ = fromJsonObject(_);
			obj[name] = _;
		});

		obj.postConstruct();

		if (json.loc !== undefined) obj.loc = _Loc2(posFromJson(json.loc.start), posFromJson(json.loc.end));

		return obj;
	});

	var posFromJson = function posFromJson(_) {
		return _Loc.Pos(_.line, _.column);
	};
});
//# sourceMappingURL=fromJSON.js.map