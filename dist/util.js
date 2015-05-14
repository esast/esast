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
	    loc = (function (_loc) {
		function loc(_x, _x2) {
			return _loc.apply(this, arguments);
		}

		loc.toString = function () {
			return _loc.toString();
		};

		return loc;
	})(function (ast, loc) {
		ast.loc = loc;
		return ast;
	}),
	    member = function member(object, propertyName) {
		return _specialize.memberExpression(object, propertyIdOrLiteralCached(propertyName));
	},
	    propertyIdOrLiteralCached = function propertyIdOrLiteralCached(propertyName) {
		var _ = propertyToIdOrLiteral.get(propertyName);
		if (_ === undefined) {
			_ = _mangleIdentifier.propertyNameOk(propertyName) ? _ast.Identifier(propertyName) : _ast.Literal(propertyName);
			propertyToIdOrLiteral.set(propertyName, _);
		}
		return _;
	},
	   

	// TODO:ES6 arrow functions
	thunk = function thunk(value) {
		return _specialize.functionExpressionThunk(_ast.BlockStatement([_ast.ReturnStatement(value)]), false);
	},
	    toStatement = function toStatement(_) {
		return _ instanceof _ast.Statement || _ instanceof _ast.Declaration ? _ : _ast.ExpressionStatement(_);
	};
	exports.idCached = idCached;
	exports.loc = loc;
	exports.member = member;
	exports.propertyIdOrLiteralCached = propertyIdOrLiteralCached;
	exports.thunk = thunk;
	exports.toStatement = toStatement;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFLQSxLQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ2pDLEtBQU0scUJBQXFCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7QUFFaEMsS0FDTixRQUFRLEdBQUcsa0JBQUEsSUFBSSxFQUFJO0FBQ2xCLE1BQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDakMsTUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQ3BCLElBQUMsR0FBRyxLQVpvRCxVQUFVLENBWW5ELG1CQUFpQixJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLGtCQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtHQUM1QjtBQUNELFNBQU8sQ0FBQyxDQUFBO0VBQ1I7S0FFRCxHQUFHOzs7Ozs7Ozs7O0lBQUcsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQ25CLEtBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0FBQ2IsU0FBTyxHQUFHLENBQUE7RUFDVixDQUFBO0tBRUQsTUFBTSxHQUFHLGdCQUFDLE1BQU0sRUFBRSxZQUFZO1NBQzdCLFlBckJnQyxnQkFBZ0IsQ0FxQi9CLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztFQUFBO0tBRWxFLHlCQUF5QixHQUFHLG1DQUFBLFlBQVksRUFBSTtBQUMzQyxNQUFJLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDL0MsTUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQ3BCLElBQUMsR0FBRyxrQkEzQmlDLGNBQWMsQ0EyQmhDLFlBQVksQ0FBQyxHQUFHLEtBN0JxQixVQUFVLENBNkJwQixZQUFZLENBQUMsR0FBRyxLQTdCTSxPQUFPLENBNkJMLFlBQVksQ0FBQyxDQUFBO0FBQ25GLHdCQUFxQixDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUE7R0FDMUM7QUFDRCxTQUFPLENBQUMsQ0FBQTtFQUNSOzs7O0FBR0QsTUFBSyxHQUFHLGVBQUEsS0FBSztTQUNaLFlBbENPLHVCQUF1QixDQWtDTixLQXJDakIsY0FBYyxDQXFDa0IsQ0FBRSxLQXBDM0IsZUFBZSxDQW9DNEIsS0FBSyxDQUFDLENBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztFQUFBO0tBRTNFLFdBQVcsR0FBRyxxQkFBQSxDQUFDO1NBQ2QsQUFBQyxDQUFDLGlCQXZDNkIsU0FBUyxBQXVDakIsSUFBSSxDQUFDLGlCQXhDTCxXQUFXLEFBd0NpQixHQUFJLENBQUMsR0FBRyxLQXhDdkIsbUJBQW1CLENBd0N3QixDQUFDLENBQUM7RUFBQSxDQUFBO1NBL0JsRixRQUFRLEdBQVIsUUFBUTtTQVNSLEdBQUcsR0FBSCxHQUFHO1NBS0gsTUFBTSxHQUFOLE1BQU07U0FHTix5QkFBeUIsR0FBekIseUJBQXlCO1NBVXpCLEtBQUssR0FBTCxLQUFLO1NBR0wsV0FBVyxHQUFYLFdBQVciLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJsb2NrU3RhdGVtZW50LCBEZWNsYXJhdGlvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgSWRlbnRpZmllciwgTGl0ZXJhbCxcblx0TmV3RXhwcmVzc2lvbiwgUmV0dXJuU3RhdGVtZW50LCBTdGF0ZW1lbnQsIFRocm93U3RhdGVtZW50IH0gZnJvbSAnLi9hc3QnXG5pbXBvcnQgbWFuZ2xlSWRlbnRpZmllciwgeyBuZWVkc01hbmdsZSwgcHJvcGVydHlOYW1lT2sgfSBmcm9tICcuL21hbmdsZS1pZGVudGlmaWVyJ1xuaW1wb3J0IHsgZnVuY3Rpb25FeHByZXNzaW9uVGh1bmssIG1lbWJlckV4cHJlc3Npb24gfSBmcm9tICcuL3NwZWNpYWxpemUnXG5cbmNvbnN0IHNwZWNpYWxOYW1lVG9JZCA9IG5ldyBNYXAoKVxuY29uc3QgcHJvcGVydHlUb0lkT3JMaXRlcmFsID0gbmV3IE1hcCgpXG5cbmV4cG9ydCBjb25zdFxuXHRpZENhY2hlZCA9IG5hbWUgPT4ge1xuXHRcdGxldCBfID0gc3BlY2lhbE5hbWVUb0lkLmdldChuYW1lKVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpIHtcblx0XHRcdF8gPSBJZGVudGlmaWVyKG1hbmdsZUlkZW50aWZpZXIobmFtZSkpXG5cdFx0XHRzcGVjaWFsTmFtZVRvSWQuc2V0KG5hbWUsIF8pXG5cdFx0fVxuXHRcdHJldHVybiBfXG5cdH0sXG5cblx0bG9jID0gKGFzdCwgbG9jKSA9PiB7XG5cdFx0YXN0LmxvYyA9IGxvY1xuXHRcdHJldHVybiBhc3Rcblx0fSxcblxuXHRtZW1iZXIgPSAob2JqZWN0LCBwcm9wZXJ0eU5hbWUpID0+XG5cdFx0bWVtYmVyRXhwcmVzc2lvbihvYmplY3QsIHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQocHJvcGVydHlOYW1lKSksXG5cblx0cHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZCA9IHByb3BlcnR5TmFtZSA9PiB7XG5cdFx0bGV0IF8gPSBwcm9wZXJ0eVRvSWRPckxpdGVyYWwuZ2V0KHByb3BlcnR5TmFtZSlcblx0XHRpZiAoXyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRfID0gcHJvcGVydHlOYW1lT2socHJvcGVydHlOYW1lKSA/IElkZW50aWZpZXIocHJvcGVydHlOYW1lKSA6IExpdGVyYWwocHJvcGVydHlOYW1lKVxuXHRcdFx0cHJvcGVydHlUb0lkT3JMaXRlcmFsLnNldChwcm9wZXJ0eU5hbWUsIF8pXG5cdFx0fVxuXHRcdHJldHVybiBfXG5cdH0sXG5cblx0Ly8gVE9ETzpFUzYgYXJyb3cgZnVuY3Rpb25zXG5cdHRodW5rID0gdmFsdWUgPT5cblx0XHRmdW5jdGlvbkV4cHJlc3Npb25UaHVuayhCbG9ja1N0YXRlbWVudChbIFJldHVyblN0YXRlbWVudCh2YWx1ZSkgXSksIGZhbHNlKSxcblxuXHR0b1N0YXRlbWVudCA9IF8gPT5cblx0XHQoXyBpbnN0YW5jZW9mIFN0YXRlbWVudCB8fCBfIGluc3RhbmNlb2YgRGVjbGFyYXRpb24pID8gXyA6IEV4cHJlc3Npb25TdGF0ZW1lbnQoXylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9