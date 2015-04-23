if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './ast', './mangle-identifier', './specialize'], function (exports, _ast, _mangleIdentifier, _specialize) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _mangleIdentifier2 = _interopRequire(_mangleIdentifier);

	var specialNameToId = new Map();
	var propertyToIdOrLiteral = new Map();

	var idCached = function idCached(name) {
		var _ = specialNameToId.get(name);
		if (_ === undefined) {
			_ = _ast.Identifier(_mangleIdentifier2(name));
			specialNameToId.set(name, _);
		}
		return _;
	},
	    propertyIdOrLiteralCached = function propertyIdOrLiteralCached(propertyName) {
		var _ = propertyToIdOrLiteral.get(propertyName);
		if (_ === undefined) {
			_ = _mangleIdentifier.propertyNameOk(propertyName) ? _ast.Identifier(propertyName) : _ast.Literal(propertyName);
			propertyToIdOrLiteral.set(propertyName, _);
		}
		return _;
	},
	    member = function member(object, propertyName) {
		return _specialize.memberExpression(object, propertyIdOrLiteralCached(propertyName));
	},
	    toStatement = function toStatement(_) {
		return _ instanceof _ast.Statement || _ instanceof _ast.Declaration ? _ : _ast.ExpressionStatement(_);
	},
	    toStatements = function toStatements(_) {
		return _ instanceof Array ? _.map(toStatement) : [toStatement(_)];
	},
	    throwError = function throwError(msg) {
		return _ast.ThrowStatement(_ast.NewExpression(_ast.Identifier('Error'), [_ast.Literal(msg)]));
	},
	   

	// TODO:ES6 arrow functions
	thunk = function thunk(value) {
		return _specialize.functionExpressionThunk(_ast.BlockStatement([_ast.ReturnStatement(value)]), false);
	};
	exports.idCached = idCached;
	exports.propertyIdOrLiteralCached = propertyIdOrLiteralCached;
	exports.member = member;
	exports.toStatement = toStatement;
	exports.toStatements = toStatements;
	exports.throwError = throwError;
	exports.thunk = thunk;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFLQSxLQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ2pDLEtBQU0scUJBQXFCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7QUFFaEMsS0FDTixRQUFRLEdBQUcsa0JBQUEsSUFBSSxFQUFJO0FBQ2xCLE1BQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDakMsTUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQ3BCLElBQUMsR0FBRyxLQVpvRCxVQUFVLENBWW5ELG1CQUFpQixJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLGtCQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtHQUM1QjtBQUNELFNBQU8sQ0FBQyxDQUFBO0VBQ1I7S0FFRCx5QkFBeUIsR0FBRyxtQ0FBQSxZQUFZLEVBQUk7QUFDM0MsTUFBSSxDQUFDLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQy9DLE1BQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNwQixJQUFDLEdBQUcsa0JBbkJpQyxjQUFjLENBbUJoQyxZQUFZLENBQUMsR0FBRyxLQXJCcUIsVUFBVSxDQXFCcEIsWUFBWSxDQUFDLEdBQUcsS0FyQk0sT0FBTyxDQXFCTCxZQUFZLENBQUMsQ0FBQTtBQUNuRix3QkFBcUIsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFBO0dBQzFDO0FBQ0QsU0FBTyxDQUFDLENBQUE7RUFDUjtLQUVELE1BQU0sR0FBRyxnQkFBQyxNQUFNLEVBQUUsWUFBWTtTQUM3QixZQXpCZ0MsZ0JBQWdCLENBeUIvQixNQUFNLEVBQUUseUJBQXlCLENBQUMsWUFBWSxDQUFDLENBQUM7RUFBQTtLQUVsRSxXQUFXLEdBQUcscUJBQUEsQ0FBQztTQUNkLEFBQUMsQ0FBQyxpQkE5QjZCLFNBQVMsQUE4QmpCLElBQUksQ0FBQyxpQkEvQkwsV0FBVyxBQStCaUIsR0FBSSxDQUFDLEdBQUcsS0EvQnZCLG1CQUFtQixDQStCd0IsQ0FBQyxDQUFDO0VBQUE7S0FFbEYsWUFBWSxHQUFHLHNCQUFBLENBQUM7U0FBSSxDQUFDLFlBQVksS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUU7RUFBQTtLQUVoRixVQUFVLEdBQUcsb0JBQUEsR0FBRztTQUNmLEtBbkMwQyxjQUFjLENBbUN6QyxLQW5DaEIsYUFBYSxDQW1DaUIsS0FwQzRCLFVBQVUsQ0FvQzNCLE9BQU8sQ0FBQyxFQUFFLENBQUUsS0FwQ2lCLE9BQU8sQ0FvQ2hCLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBQztFQUFBOzs7O0FBR3JFLE1BQUssR0FBRyxlQUFBLEtBQUs7U0FDWixZQXJDTyx1QkFBdUIsQ0FxQ04sS0F4Q2pCLGNBQWMsQ0F3Q2tCLENBQUUsS0F2QzNCLGVBQWUsQ0F1QzRCLEtBQUssQ0FBQyxDQUFFLENBQUMsRUFBRSxLQUFLLENBQUM7RUFBQSxDQUFBO1NBL0IzRSxRQUFRLEdBQVIsUUFBUTtTQVNSLHlCQUF5QixHQUF6Qix5QkFBeUI7U0FTekIsTUFBTSxHQUFOLE1BQU07U0FHTixXQUFXLEdBQVgsV0FBVztTQUdYLFlBQVksR0FBWixZQUFZO1NBRVosVUFBVSxHQUFWLFVBQVU7U0FJVixLQUFLLEdBQUwsS0FBSyIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmxvY2tTdGF0ZW1lbnQsIERlY2xhcmF0aW9uLCBFeHByZXNzaW9uU3RhdGVtZW50LCBJZGVudGlmaWVyLCBMaXRlcmFsLFxuXHROZXdFeHByZXNzaW9uLCBSZXR1cm5TdGF0ZW1lbnQsIFN0YXRlbWVudCwgVGhyb3dTdGF0ZW1lbnQgfSBmcm9tICcuL2FzdCdcbmltcG9ydCBtYW5nbGVJZGVudGlmaWVyLCB7IG5lZWRzTWFuZ2xlLCBwcm9wZXJ0eU5hbWVPayB9IGZyb20gJy4vbWFuZ2xlLWlkZW50aWZpZXInXG5pbXBvcnQgeyBmdW5jdGlvbkV4cHJlc3Npb25UaHVuaywgbWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gJy4vc3BlY2lhbGl6ZSdcblxuY29uc3Qgc3BlY2lhbE5hbWVUb0lkID0gbmV3IE1hcCgpXG5jb25zdCBwcm9wZXJ0eVRvSWRPckxpdGVyYWwgPSBuZXcgTWFwKClcblxuZXhwb3J0IGNvbnN0XG5cdGlkQ2FjaGVkID0gbmFtZSA9PiB7XG5cdFx0bGV0IF8gPSBzcGVjaWFsTmFtZVRvSWQuZ2V0KG5hbWUpXG5cdFx0aWYgKF8gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XyA9IElkZW50aWZpZXIobWFuZ2xlSWRlbnRpZmllcihuYW1lKSlcblx0XHRcdHNwZWNpYWxOYW1lVG9JZC5zZXQobmFtZSwgXylcblx0XHR9XG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHRwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkID0gcHJvcGVydHlOYW1lID0+IHtcblx0XHRsZXQgXyA9IHByb3BlcnR5VG9JZE9yTGl0ZXJhbC5nZXQocHJvcGVydHlOYW1lKVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpIHtcblx0XHRcdF8gPSBwcm9wZXJ0eU5hbWVPayhwcm9wZXJ0eU5hbWUpID8gSWRlbnRpZmllcihwcm9wZXJ0eU5hbWUpIDogTGl0ZXJhbChwcm9wZXJ0eU5hbWUpXG5cdFx0XHRwcm9wZXJ0eVRvSWRPckxpdGVyYWwuc2V0KHByb3BlcnR5TmFtZSwgXylcblx0XHR9XG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHRtZW1iZXIgPSAob2JqZWN0LCBwcm9wZXJ0eU5hbWUpID0+XG5cdFx0bWVtYmVyRXhwcmVzc2lvbihvYmplY3QsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQocHJvcGVydHlOYW1lKSksXG5cblx0dG9TdGF0ZW1lbnQgPSBfID0+XG5cdFx0KF8gaW5zdGFuY2VvZiBTdGF0ZW1lbnQgfHwgXyBpbnN0YW5jZW9mIERlY2xhcmF0aW9uKSA/IF8gOiBFeHByZXNzaW9uU3RhdGVtZW50KF8pLFxuXG5cdHRvU3RhdGVtZW50cyA9IF8gPT4gXyBpbnN0YW5jZW9mIEFycmF5ID8gXy5tYXAodG9TdGF0ZW1lbnQpIDogWyB0b1N0YXRlbWVudChfKSBdLFxuXG5cdHRocm93RXJyb3IgPSBtc2cgPT5cblx0XHRUaHJvd1N0YXRlbWVudChOZXdFeHByZXNzaW9uKElkZW50aWZpZXIoJ0Vycm9yJyksIFsgTGl0ZXJhbChtc2cpIF0pKSxcblxuXHQvLyBUT0RPOkVTNiBhcnJvdyBmdW5jdGlvbnNcblx0dGh1bmsgPSB2YWx1ZSA9PlxuXHRcdGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKEJsb2NrU3RhdGVtZW50KFsgUmV0dXJuU3RhdGVtZW50KHZhbHVlKSBdKSwgZmFsc2UpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==