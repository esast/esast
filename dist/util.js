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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBSUEsT0FBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUMxQixPQUFNLHFCQUFxQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7O0FBRWhDLE9BQ04sc0JBQXNCLEdBQUcsR0FBRyxJQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsSUFBSSxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7T0FFeEUsUUFBUSxHQUFHLElBQUksSUFBSTtBQUNsQixNQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzFCLE1BQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNwQixJQUFDLEdBQUcsU0FiTixVQUFVLENBYVcsZ0NBQWlCLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDMUMsV0FBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7R0FDckI7QUFDRCxTQUFPLENBQUMsQ0FBQTtFQUNSO09BRUQsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSztBQUNuQixLQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUNiLFNBQU8sR0FBRyxDQUFBO0VBQ1Y7T0FFRCxNQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxLQUM3QixTQXpCb0IsZ0JBQWdCLENBeUJmLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztPQUV0RSx5QkFBeUIsR0FBRyxZQUFZLElBQUk7QUFDM0MsTUFBSSxDQUFDLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQy9DLE1BQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNwQixJQUFDLEdBQUcsc0JBN0JvQixjQUFjLEVBNkJuQixZQUFZLENBQUMsR0FDL0IsU0EvQkgsVUFBVSxDQStCUSxZQUFZLENBQUMsR0FDNUIsU0FoQ1MsT0FBTyxDQWdDSixZQUFZLENBQUMsQ0FBQTtBQUMxQix3QkFBcUIsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFBO0dBQzFDO0FBQ0QsU0FBTyxDQUFDLENBQUE7RUFDUjtPQUVELHVCQUF1QixHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsS0FDekMsU0FBUyxHQUNSLFNBekNpRSxrQkFBa0IsQ0F5QzVELElBQUksRUFBRSxFQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUM3QyxTQTFDTSx1QkFBdUIsQ0EwQ0QsRUFBRyxFQUFFLElBQUksQ0FBQztPQUV4QyxLQUFLLEdBQUcsS0FBSyxJQUNaLFNBN0NPLHVCQUF1QixDQTZDRixFQUFHLEVBQUUsS0FBSyxDQUFDO09BRXhDLFdBQVcsR0FBRyxDQUFDLElBQ2QsQ0FBQyxpQkEvQ3FDLFNBQVMsQUErQ3pCLElBQUksQ0FBQyxpQkFoREssV0FBVyxBQWdETyxHQUFHLENBQUMsR0FBRyxTQWhEWixtQkFBbUIsQ0FnRGlCLENBQUMsQ0FBQyxDQUFBOzs7Ozs7Ozs7O0FBRXJGLE9BQ0MsY0FBYyxHQUFHO0FBQ2hCLE1BQUksRUFBRSxNQUFNO0FBQ1osS0FBRyxFQUFFLEtBQUs7QUFDVixNQUFJLEVBQUUsS0FBSztBQUNYLE1BQUksRUFBRSxLQUFLO0FBQ1gsTUFBSSxFQUFFLEtBQUs7QUFDWCxNQUFJLEVBQUUsS0FBSztBQUNYLE1BQUksRUFBRSxLQUFLO0FBQ1gsTUFBSSxFQUFFLEtBQUs7QUFDWCxVQUFRLEVBQUUsU0FBUztBQUNuQixVQUFRLEVBQUUsU0FBUztFQUNuQixDQUFBIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbiwgRGVjbGFyYXRpb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIEZ1bmN0aW9uRXhwcmVzc2lvbixcblx0SWRlbnRpZmllciwgTGl0ZXJhbCwgTWVtYmVyRXhwcmVzc2lvbiwgU3RhdGVtZW50IH0gZnJvbSAnLi9hc3QnXG5pbXBvcnQgbWFuZ2xlSWRlbnRpZmllciwgeyBwcm9wZXJ0eU5hbWVPayB9IGZyb20gJy4vbWFuZ2xlLWlkZW50aWZpZXInXG5cbmNvbnN0IG5hbWVUb0lkID0gbmV3IE1hcCgpXG5jb25zdCBwcm9wZXJ0eVRvSWRPckxpdGVyYWwgPSBuZXcgTWFwKClcblxuZXhwb3J0IGNvbnN0XG5cdGVzY2FwZVN0cmluZ0ZvckxpdGVyYWwgPSBzdHIgPT5cblx0XHRzdHIucmVwbGFjZSgvW1xcXFxcIlxcblxcdFxcYlxcZlxcdlxcclxcdTIwMjhcXHUyMDI5XS9nLCBjaCA9PiBsaXRlcmFsRXNjYXBlc1tjaF0pLFxuXG5cdGlkQ2FjaGVkID0gbmFtZSA9PiB7XG5cdFx0bGV0IF8gPSBuYW1lVG9JZC5nZXQobmFtZSlcblx0XHRpZiAoXyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRfID0gbmV3IElkZW50aWZpZXIobWFuZ2xlSWRlbnRpZmllcihuYW1lKSlcblx0XHRcdG5hbWVUb0lkLnNldChuYW1lLCBfKVxuXHRcdH1cblx0XHRyZXR1cm4gX1xuXHR9LFxuXG5cdGxvYyA9IChhc3QsIGxvYykgPT4ge1xuXHRcdGFzdC5sb2MgPSBsb2Ncblx0XHRyZXR1cm4gYXN0XG5cdH0sXG5cblx0bWVtYmVyID0gKG9iamVjdCwgcHJvcGVydHlOYW1lKSA9PlxuXHRcdG5ldyBNZW1iZXJFeHByZXNzaW9uKG9iamVjdCwgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChwcm9wZXJ0eU5hbWUpKSxcblxuXHRwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkID0gcHJvcGVydHlOYW1lID0+IHtcblx0XHRsZXQgXyA9IHByb3BlcnR5VG9JZE9yTGl0ZXJhbC5nZXQocHJvcGVydHlOYW1lKVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpIHtcblx0XHRcdF8gPSBwcm9wZXJ0eU5hbWVPayhwcm9wZXJ0eU5hbWUpID9cblx0XHRcdFx0bmV3IElkZW50aWZpZXIocHJvcGVydHlOYW1lKSA6XG5cdFx0XHRcdG5ldyBMaXRlcmFsKHByb3BlcnR5TmFtZSlcblx0XHRcdHByb3BlcnR5VG9JZE9yTGl0ZXJhbC5zZXQocHJvcGVydHlOYW1lLCBfKVxuXHRcdH1cblx0XHRyZXR1cm4gX1xuXHR9LFxuXG5cdGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rID0gKGJvZHksIGdlbmVyYXRvcikgPT5cblx0XHRnZW5lcmF0b3IgP1xuXHRcdFx0bmV3IEZ1bmN0aW9uRXhwcmVzc2lvbihudWxsLCBbIF0sIGJvZHksIHRydWUpIDpcblx0XHRcdG5ldyBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbihbIF0sIGJvZHkpLFxuXG5cdHRodW5rID0gdmFsdWUgPT5cblx0XHRuZXcgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24oWyBdLCB2YWx1ZSksXG5cblx0dG9TdGF0ZW1lbnQgPSBfID0+XG5cdFx0XyBpbnN0YW5jZW9mIFN0YXRlbWVudCB8fCBfIGluc3RhbmNlb2YgRGVjbGFyYXRpb24gPyBfIDogbmV3IEV4cHJlc3Npb25TdGF0ZW1lbnQoXylcblxuY29uc3Rcblx0bGl0ZXJhbEVzY2FwZXMgPSB7XG5cdFx0J1xcXFwnOiAnXFxcXFxcXFwnLFxuXHRcdCdcIic6ICdcXFxcXCInLFxuXHRcdCdcXG4nOiAnXFxcXG4nLFxuXHRcdCdcXHQnOiAnXFxcXHQnLFxuXHRcdCdcXGInOiAnXFxcXGInLFxuXHRcdCdcXGYnOiAnXFxcXGYnLFxuXHRcdCdcXHYnOiAnXFxcXHYnLFxuXHRcdCdcXHInOiAnXFxcXHInLFxuXHRcdCdcXHUyMDI4JzogJ1xcXFx1MjAyOCcsXG5cdFx0J1xcdTIwMjknOiAnXFxcXHUyMDI5J1xuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==