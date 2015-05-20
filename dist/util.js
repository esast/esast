if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './ast', './mangle-identifier', './specialize'], function (exports, _ast, _mangleIdentifier, _specialize) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _mangleIdentifier2 = _interopRequire(_mangleIdentifier);

	var nameToId = new Map();
	var propertyToIdOrLiteral = new Map();

	var idCached = function idCached(name) {
		var _ = nameToId.get(name);
		if (_ === undefined) {
			_ = (0, _ast.Identifier)((0, _mangleIdentifier2)(name));
			nameToId.set(name, _);
		}
		return _;
	},
	    loc = function loc(ast, _loc) {
		ast.loc = _loc;
		return ast;
	},
	    member = function member(object, propertyName) {
		return (0, _specialize.memberExpression)(object, propertyIdOrLiteralCached(propertyName));
	},
	    propertyIdOrLiteralCached = function propertyIdOrLiteralCached(propertyName) {
		var _ = propertyToIdOrLiteral.get(propertyName);
		if (_ === undefined) {
			_ = (0, _mangleIdentifier.propertyNameOk)(propertyName) ? (0, _ast.Identifier)(propertyName) : (0, _ast.Literal)(propertyName);
			propertyToIdOrLiteral.set(propertyName, _);
		}
		return _;
	},
	   

	// TODO:ES6 arrow functions
	thunk = function thunk(value) {
		return (0, _specialize.functionExpressionThunk)((0, _ast.BlockStatement)([(0, _ast.ReturnStatement)(value)]), false);
	},
	    toStatement = function toStatement(_) {
		return _ instanceof _ast.Statement || _ instanceof _ast.Declaration ? _ : (0, _ast.ExpressionStatement)(_);
	};
	exports.idCached = idCached;
	exports.loc = loc;
	exports.member = member;
	exports.propertyIdOrLiteralCached = propertyIdOrLiteralCached;
	exports.thunk = thunk;
	exports.toStatement = toStatement;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFLQSxLQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQzFCLEtBQU0scUJBQXFCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7QUFFaEMsS0FDTixRQUFRLEdBQUcsU0FBWCxRQUFRLENBQUcsSUFBSSxFQUFJO0FBQ2xCLE1BQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDMUIsTUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQ3BCLElBQUMsR0FBRyxTQVpvRCxVQUFVLEVBWW5ELHdCQUFpQixJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLFdBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0dBQ3JCO0FBQ0QsU0FBTyxDQUFDLENBQUE7RUFDUjtLQUVELEdBQUcsR0FBRyxhQUFDLEdBQUcsRUFBRSxJQUFHLEVBQUs7QUFDbkIsS0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFHLENBQUE7QUFDYixTQUFPLEdBQUcsQ0FBQTtFQUNWO0tBRUQsTUFBTSxHQUFHLFNBQVQsTUFBTSxDQUFJLE1BQU0sRUFBRSxZQUFZO1NBQzdCLGdCQXJCZ0MsZ0JBQWdCLEVBcUIvQixNQUFNLEVBQUUseUJBQXlCLENBQUMsWUFBWSxDQUFDLENBQUM7RUFBQTtLQUVsRSx5QkFBeUIsR0FBRyxTQUE1Qix5QkFBeUIsQ0FBRyxZQUFZLEVBQUk7QUFDM0MsTUFBSSxDQUFDLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQy9DLE1BQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNwQixJQUFDLEdBQUcsc0JBM0JvQixjQUFjLEVBMkJuQixZQUFZLENBQUMsR0FBRyxTQTdCcUIsVUFBVSxFQTZCcEIsWUFBWSxDQUFDLEdBQUcsU0E3Qk0sT0FBTyxFQTZCTCxZQUFZLENBQUMsQ0FBQTtBQUNuRix3QkFBcUIsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFBO0dBQzFDO0FBQ0QsU0FBTyxDQUFDLENBQUE7RUFDUjs7OztBQUdELE1BQUssR0FBRyxTQUFSLEtBQUssQ0FBRyxLQUFLO1NBQ1osZ0JBbENPLHVCQUF1QixFQWtDTixTQXJDakIsY0FBYyxFQXFDa0IsQ0FBRSxTQXBDMUMsZUFBZSxFQW9DMkMsS0FBSyxDQUFDLENBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztFQUFBO0tBRTNFLFdBQVcsR0FBRyxTQUFkLFdBQVcsQ0FBRyxDQUFDO1NBQ2QsQUFBQyxDQUFDLGlCQXZDYyxTQUFTLEFBdUNGLElBQUksQ0FBQyxpQkF4Q0wsV0FBVyxBQXdDaUIsR0FBSSxDQUFDLEdBQUcsU0F4Q3ZCLG1CQUFtQixFQXdDd0IsQ0FBQyxDQUFDO0VBQUEsQ0FBQTtTQS9CbEYsUUFBUSxHQUFSLFFBQVE7U0FTUixHQUFHLEdBQUgsR0FBRztTQUtILE1BQU0sR0FBTixNQUFNO1NBR04seUJBQXlCLEdBQXpCLHlCQUF5QjtTQVV6QixLQUFLLEdBQUwsS0FBSztTQUdMLFdBQVcsR0FBWCxXQUFXIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCbG9ja1N0YXRlbWVudCwgRGVjbGFyYXRpb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIElkZW50aWZpZXIsIExpdGVyYWwsXG5cdFJldHVyblN0YXRlbWVudCwgU3RhdGVtZW50IH0gZnJvbSAnLi9hc3QnXG5pbXBvcnQgbWFuZ2xlSWRlbnRpZmllciwgeyBwcm9wZXJ0eU5hbWVPayB9IGZyb20gJy4vbWFuZ2xlLWlkZW50aWZpZXInXG5pbXBvcnQgeyBmdW5jdGlvbkV4cHJlc3Npb25UaHVuaywgbWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gJy4vc3BlY2lhbGl6ZSdcblxuY29uc3QgbmFtZVRvSWQgPSBuZXcgTWFwKClcbmNvbnN0IHByb3BlcnR5VG9JZE9yTGl0ZXJhbCA9IG5ldyBNYXAoKVxuXG5leHBvcnQgY29uc3Rcblx0aWRDYWNoZWQgPSBuYW1lID0+IHtcblx0XHRsZXQgXyA9IG5hbWVUb0lkLmdldChuYW1lKVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpIHtcblx0XHRcdF8gPSBJZGVudGlmaWVyKG1hbmdsZUlkZW50aWZpZXIobmFtZSkpXG5cdFx0XHRuYW1lVG9JZC5zZXQobmFtZSwgXylcblx0XHR9XG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHRsb2MgPSAoYXN0LCBsb2MpID0+IHtcblx0XHRhc3QubG9jID0gbG9jXG5cdFx0cmV0dXJuIGFzdFxuXHR9LFxuXG5cdG1lbWJlciA9IChvYmplY3QsIHByb3BlcnR5TmFtZSkgPT5cblx0XHRtZW1iZXJFeHByZXNzaW9uKG9iamVjdCwgcHJvcGVydHlJZE9yTGl0ZXJhbENhY2hlZChwcm9wZXJ0eU5hbWUpKSxcblxuXHRwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkID0gcHJvcGVydHlOYW1lID0+IHtcblx0XHRsZXQgXyA9IHByb3BlcnR5VG9JZE9yTGl0ZXJhbC5nZXQocHJvcGVydHlOYW1lKVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpIHtcblx0XHRcdF8gPSBwcm9wZXJ0eU5hbWVPayhwcm9wZXJ0eU5hbWUpID8gSWRlbnRpZmllcihwcm9wZXJ0eU5hbWUpIDogTGl0ZXJhbChwcm9wZXJ0eU5hbWUpXG5cdFx0XHRwcm9wZXJ0eVRvSWRPckxpdGVyYWwuc2V0KHByb3BlcnR5TmFtZSwgXylcblx0XHR9XG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHQvLyBUT0RPOkVTNiBhcnJvdyBmdW5jdGlvbnNcblx0dGh1bmsgPSB2YWx1ZSA9PlxuXHRcdGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKEJsb2NrU3RhdGVtZW50KFsgUmV0dXJuU3RhdGVtZW50KHZhbHVlKSBdKSwgZmFsc2UpLFxuXG5cdHRvU3RhdGVtZW50ID0gXyA9PlxuXHRcdChfIGluc3RhbmNlb2YgU3RhdGVtZW50IHx8IF8gaW5zdGFuY2VvZiBEZWNsYXJhdGlvbikgPyBfIDogRXhwcmVzc2lvblN0YXRlbWVudChfKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=