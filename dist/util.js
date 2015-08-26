if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './ast', './mangle-identifier'], function (exports, _ast, _mangleIdentifier) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mangleIdentifier2 = _interopRequireDefault(_mangleIdentifier);

	const nameToId = new Map();
	const propertyToIdOrLiteral = new Map();

	const escapeStringForLiteral = str => str.replace(/[\\"\n\t\b\f\v\r\u2028\u2029]/g, ch => literalEscapes[ch]),
	      idCached = name => {
		let _ = nameToId.get(name);
		if (_ === undefined) {
			_ = new _ast.Identifier((0, _mangleIdentifier2.default)(name));
			nameToId.set(name, _);
		}
		return _;
	},
	      loc = (ast, loc) => {
		ast.loc = loc;
		return ast;
	},
	      member = (object, propertyName) => new _ast.MemberExpression(object, propertyIdOrLiteralCached(propertyName)),
	      propertyIdOrLiteralCached = propertyName => {
		let _ = propertyToIdOrLiteral.get(propertyName);
		if (_ === undefined) {
			_ = (0, _mangleIdentifier.propertyNameOk)(propertyName) ? new _ast.Identifier(propertyName) : new _ast.Literal(propertyName);
			propertyToIdOrLiteral.set(propertyName, _);
		}
		return _;
	},
	      functionExpressionThunk = (body, generator) => generator ? new _ast.FunctionExpression(null, [], body, true) : new _ast.ArrowFunctionExpression([], body),
	      thunk = value => new _ast.ArrowFunctionExpression([], value),
	      toStatement = _ => _ instanceof _ast.Statement || _ instanceof _ast.Declaration ? _ : new _ast.ExpressionStatement(_);

	exports.escapeStringForLiteral = escapeStringForLiteral;
	exports.idCached = idCached;
	exports.loc = loc;
	exports.member = member;
	exports.propertyIdOrLiteralCached = propertyIdOrLiteralCached;
	exports.functionExpressionThunk = functionExpressionThunk;
	exports.thunk = thunk;
	exports.toStatement = toStatement;
	const literalEscapes = {
		'\\': '\\\\',
		'"': '\\"',
		'\n': '\\n',
		'\t': '\\t',
		'\b': '\\b',
		'\f': '\\f',
		'\v': '\\v',
		'\r': '\\r',
		'\u2028': '\\u2028',
		'\u2029': '\\u2029'
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBSUEsT0FBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUMxQixPQUFNLHFCQUFxQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7O0FBRWhDLE9BQ04sc0JBQXNCLEdBQUcsR0FBRyxJQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsSUFBSSxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7T0FFeEUsUUFBUSxHQUFHLElBQUksSUFBSTtBQUNsQixNQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzFCLE1BQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNwQixJQUFDLEdBQUcsU0FiTixVQUFVLENBYVcsZ0NBQWlCLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDMUMsV0FBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7R0FDckI7QUFDRCxTQUFPLENBQUMsQ0FBQTtFQUNSO09BRUQsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSztBQUNuQixLQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUNiLFNBQU8sR0FBRyxDQUFBO0VBQ1Y7T0FFRCxNQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxLQUM3QixTQXpCb0IsZ0JBQWdCLENBeUJmLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztPQUV0RSx5QkFBeUIsR0FBRyxZQUFZLElBQUk7QUFDM0MsTUFBSSxDQUFDLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQy9DLE1BQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNwQixJQUFDLEdBQUcsc0JBN0JvQixjQUFjLEVBNkJuQixZQUFZLENBQUMsR0FDL0IsU0EvQkgsVUFBVSxDQStCUSxZQUFZLENBQUMsR0FDNUIsU0FoQ1MsT0FBTyxDQWdDSixZQUFZLENBQUMsQ0FBQTtBQUMxQix3QkFBcUIsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFBO0dBQzFDO0FBQ0QsU0FBTyxDQUFDLENBQUE7RUFDUjtPQUVELHVCQUF1QixHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsS0FDekMsU0FBUyxHQUNSLFNBekNpRSxrQkFBa0IsQ0F5QzVELElBQUksRUFBRSxFQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUM3QyxTQTFDTSx1QkFBdUIsQ0EwQ0QsRUFBRyxFQUFFLElBQUksQ0FBQztPQUV4QyxLQUFLLEdBQUcsS0FBSyxJQUNaLFNBN0NPLHVCQUF1QixDQTZDRixFQUFHLEVBQUUsS0FBSyxDQUFDO09BRXhDLFdBQVcsR0FBRyxDQUFDLElBQ2QsQUFBQyxDQUFDLGlCQS9Db0MsU0FBUyxBQStDeEIsSUFBSSxDQUFDLGlCQWhESSxXQUFXLEFBZ0RRLEdBQUksQ0FBQyxHQUFHLFNBaERkLG1CQUFtQixDQWdEbUIsQ0FBQyxDQUFDLENBQUE7Ozs7Ozs7Ozs7QUFFdkYsT0FDQyxjQUFjLEdBQUc7QUFDaEIsTUFBSSxFQUFFLE1BQU07QUFDWixLQUFHLEVBQUUsS0FBSztBQUNWLE1BQUksRUFBRSxLQUFLO0FBQ1gsTUFBSSxFQUFFLEtBQUs7QUFDWCxNQUFJLEVBQUUsS0FBSztBQUNYLE1BQUksRUFBRSxLQUFLO0FBQ1gsTUFBSSxFQUFFLEtBQUs7QUFDWCxNQUFJLEVBQUUsS0FBSztBQUNYLFVBQVEsRUFBRSxTQUFTO0FBQ25CLFVBQVEsRUFBRSxTQUFTO0VBQ25CLENBQUEiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycm93RnVuY3Rpb25FeHByZXNzaW9uLCBEZWNsYXJhdGlvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgRnVuY3Rpb25FeHByZXNzaW9uLFxuXHRJZGVudGlmaWVyLCBMaXRlcmFsLCBNZW1iZXJFeHByZXNzaW9uLCBTdGF0ZW1lbnQgfSBmcm9tICcuL2FzdCdcbmltcG9ydCBtYW5nbGVJZGVudGlmaWVyLCB7IHByb3BlcnR5TmFtZU9rIH0gZnJvbSAnLi9tYW5nbGUtaWRlbnRpZmllcidcblxuY29uc3QgbmFtZVRvSWQgPSBuZXcgTWFwKClcbmNvbnN0IHByb3BlcnR5VG9JZE9yTGl0ZXJhbCA9IG5ldyBNYXAoKVxuXG5leHBvcnQgY29uc3Rcblx0ZXNjYXBlU3RyaW5nRm9yTGl0ZXJhbCA9IHN0ciA9PlxuXHRcdHN0ci5yZXBsYWNlKC9bXFxcXFwiXFxuXFx0XFxiXFxmXFx2XFxyXFx1MjAyOFxcdTIwMjldL2csIGNoID0+IGxpdGVyYWxFc2NhcGVzW2NoXSksXG5cblx0aWRDYWNoZWQgPSBuYW1lID0+IHtcblx0XHRsZXQgXyA9IG5hbWVUb0lkLmdldChuYW1lKVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpIHtcblx0XHRcdF8gPSBuZXcgSWRlbnRpZmllcihtYW5nbGVJZGVudGlmaWVyKG5hbWUpKVxuXHRcdFx0bmFtZVRvSWQuc2V0KG5hbWUsIF8pXG5cdFx0fVxuXHRcdHJldHVybiBfXG5cdH0sXG5cblx0bG9jID0gKGFzdCwgbG9jKSA9PiB7XG5cdFx0YXN0LmxvYyA9IGxvY1xuXHRcdHJldHVybiBhc3Rcblx0fSxcblxuXHRtZW1iZXIgPSAob2JqZWN0LCBwcm9wZXJ0eU5hbWUpID0+XG5cdFx0bmV3IE1lbWJlckV4cHJlc3Npb24ob2JqZWN0LCBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKHByb3BlcnR5TmFtZSkpLFxuXG5cdHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQgPSBwcm9wZXJ0eU5hbWUgPT4ge1xuXHRcdGxldCBfID0gcHJvcGVydHlUb0lkT3JMaXRlcmFsLmdldChwcm9wZXJ0eU5hbWUpXG5cdFx0aWYgKF8gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XyA9IHByb3BlcnR5TmFtZU9rKHByb3BlcnR5TmFtZSkgP1xuXHRcdFx0XHRuZXcgSWRlbnRpZmllcihwcm9wZXJ0eU5hbWUpIDpcblx0XHRcdFx0bmV3IExpdGVyYWwocHJvcGVydHlOYW1lKVxuXHRcdFx0cHJvcGVydHlUb0lkT3JMaXRlcmFsLnNldChwcm9wZXJ0eU5hbWUsIF8pXG5cdFx0fVxuXHRcdHJldHVybiBfXG5cdH0sXG5cblx0ZnVuY3Rpb25FeHByZXNzaW9uVGh1bmsgPSAoYm9keSwgZ2VuZXJhdG9yKSA9PlxuXHRcdGdlbmVyYXRvciA/XG5cdFx0XHRuZXcgRnVuY3Rpb25FeHByZXNzaW9uKG51bGwsIFsgXSwgYm9keSwgdHJ1ZSkgOlxuXHRcdFx0bmV3IEFycm93RnVuY3Rpb25FeHByZXNzaW9uKFsgXSwgYm9keSksXG5cblx0dGh1bmsgPSB2YWx1ZSA9PlxuXHRcdG5ldyBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbihbIF0sIHZhbHVlKSxcblxuXHR0b1N0YXRlbWVudCA9IF8gPT5cblx0XHQoXyBpbnN0YW5jZW9mIFN0YXRlbWVudCB8fCBfIGluc3RhbmNlb2YgRGVjbGFyYXRpb24pID8gXyA6IG5ldyBFeHByZXNzaW9uU3RhdGVtZW50KF8pXG5cbmNvbnN0XG5cdGxpdGVyYWxFc2NhcGVzID0ge1xuXHRcdCdcXFxcJzogJ1xcXFxcXFxcJyxcblx0XHQnXCInOiAnXFxcXFwiJyxcblx0XHQnXFxuJzogJ1xcXFxuJyxcblx0XHQnXFx0JzogJ1xcXFx0Jyxcblx0XHQnXFxiJzogJ1xcXFxiJyxcblx0XHQnXFxmJzogJ1xcXFxmJyxcblx0XHQnXFx2JzogJ1xcXFx2Jyxcblx0XHQnXFxyJzogJ1xcXFxyJyxcblx0XHQnXFx1MjAyOCc6ICdcXFxcdTIwMjgnLFxuXHRcdCdcXHUyMDI5JzogJ1xcXFx1MjAyOSdcblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=