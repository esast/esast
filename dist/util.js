'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './ast', './mangle-identifier'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./ast'), require('./mangle-identifier'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.ast, global.mangleIdentifier);
		global.util = mod.exports;
	}
})(this, function (exports, _ast, _mangleIdentifier) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.identifier = identifier;
	exports.loc = loc;
	exports.member = member;
	exports.propertyIdOrLiteral = propertyIdOrLiteral;
	exports.functionExpressionThunk = functionExpressionThunk;
	exports.toStatement = toStatement;

	var _mangleIdentifier2 = _interopRequireDefault(_mangleIdentifier);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function identifier(name) {
		return new _ast.Identifier((0, _mangleIdentifier2.default)(name));
	}

	function loc(ast, loc) {
		ast.loc = loc;
		return ast;
	}

	function member(object, propertyName) {
		return new _ast.MemberExpression(object, propertyIdOrLiteral(propertyName));
	}

	function propertyIdOrLiteral(propertyName) {
		return (0, _mangleIdentifier.propertyNameOk)(propertyName) ? new _ast.Identifier(propertyName) : new _ast.Literal(propertyName);
	}

	function functionExpressionThunk(body, generator) {
		return generator ? new _ast.FunctionExpression(null, [], body, true) : new _ast.ArrowFunctionExpression([], body);
	}

	function toStatement(ast) {
		return ast instanceof _ast.Statement || ast instanceof _ast.Declaration ? ast : new _ast.ExpressionStatement(ast);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQVNnQixVQUFVLEdBQVYsVUFBVTtTQVNWLEdBQUcsR0FBSCxHQUFHO1NBWUgsTUFBTSxHQUFOLE1BQU07U0FVTixtQkFBbUIsR0FBbkIsbUJBQW1CO1NBTW5CLHVCQUF1QixHQUF2Qix1QkFBdUI7U0FVdkIsV0FBVyxHQUFYLFdBQVc7Ozs7OztVQS9DWCxVQUFVOzs7O1VBU1YsR0FBRzs7Ozs7VUFZSCxNQUFNOzs7O1VBVU4sbUJBQW1COzs7O1VBTW5CLHVCQUF1Qjs7OztVQVV2QixXQUFXIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fycm93RnVuY3Rpb25FeHByZXNzaW9uLCBEZWNsYXJhdGlvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgRnVuY3Rpb25FeHByZXNzaW9uLFxuXHRJZGVudGlmaWVyLCBMaXRlcmFsLCBNZW1iZXJFeHByZXNzaW9uLCBTdGF0ZW1lbnR9IGZyb20gJy4vYXN0J1xuaW1wb3J0IG1hbmdsZUlkZW50aWZpZXIsIHtwcm9wZXJ0eU5hbWVPa30gZnJvbSAnLi9tYW5nbGUtaWRlbnRpZmllcidcblxuLyoqXG5NYW5nbGVzIG5hbWUgYW5kIG1ha2VzIGFuIHtAbGluayBJZGVudGlmaWVyfS5cbkBwYXJhbSB7c3RyaW5nfSBuYW1lXG5AcmV0dXJuIHtJZGVudGlmaWVyfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmaWVyKG5hbWUpIHtcblx0cmV0dXJuIG5ldyBJZGVudGlmaWVyKG1hbmdsZUlkZW50aWZpZXIobmFtZSkpXG59XG5cbi8qKlxuQXNzaWducyBgbG9jYCB0byBgYXN0YCBhbmQgcmV0dXJucyBpdC5cbkBwYXJhbSB7Tm9kZX0gYXN0XG5AcGFyYW0ge0xvY30gbG9jXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYyhhc3QsIGxvYykge1xuXHRhc3QubG9jID0gbG9jXG5cdHJldHVybiBhc3Rcbn1cblxuLyoqXG5DcmVhdGVzIGEgbWVtYmVyIGV4cHJlc3Npb24gZm9yIGBwcm9wZXJ0eU5hbWVgIGluIGBvYmplY3RgLFxudXNpbmcgZG90IHN5bnRheCAoYGEuYmApIGlmIHBvc3NpYmxlLCBhbmQgZmFsbGluZyBiYWNrIHRvIGBhWydiJ11gLlxuQHBhcmFtIHtOb2RlfSBvYmplY3RcbkBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbkByZXR1cm4ge01lbWJlckV4cHJlc3Npb259XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIG1lbWJlcihvYmplY3QsIHByb3BlcnR5TmFtZSkge1xuXHRyZXR1cm4gbmV3IE1lbWJlckV4cHJlc3Npb24ob2JqZWN0LCBwcm9wZXJ0eUlkT3JMaXRlcmFsKHByb3BlcnR5TmFtZSkpXG59XG5cbi8qKlxuQW4gSWRlbnRpZmllciBpZiBwcm9wZXJ0eU5hbWUgaXMgYSB2YWxpZCBKYXZhU2NyaXB0IHByb3BlcnR5IG5hbWU7XG5vdGhlcndpc2UgYSBMaXRlcmFsIHN0cmluZy5cbkBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbkByZXR1cm4ge0lkZW50aWZpZXJ8TGl0ZXJhbH1cbiovXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlJZE9yTGl0ZXJhbChwcm9wZXJ0eU5hbWUpIHtcblx0cmV0dXJuIHByb3BlcnR5TmFtZU9rKHByb3BlcnR5TmFtZSkgP1xuXHRcdG5ldyBJZGVudGlmaWVyKHByb3BlcnR5TmFtZSkgOlxuXHRcdG5ldyBMaXRlcmFsKHByb3BlcnR5TmFtZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGJvZHksIGdlbmVyYXRvcikge1xuXHRyZXR1cm4gZ2VuZXJhdG9yID9cblx0XHRuZXcgRnVuY3Rpb25FeHByZXNzaW9uKG51bGwsIFtdLCBib2R5LCB0cnVlKSA6XG5cdFx0bmV3IEFycm93RnVuY3Rpb25FeHByZXNzaW9uKFtdLCBib2R5KVxufVxuXG4vKipcbkNvbnZlcnQgYW55IHtAbGluayBOb2RlfSBpbnRvIG9uZSB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSBjb250ZW50IG9mIGEgbGluZS5cbihlc2FzdCByZXF1aXJlcyBhbGwgZXhwcmVzc2lvbiBsaW5lcyB0byBiZSB3cmFwcGVkIHdpdGgge0BsaW5rIEV4cHJlc3Npb25TdGF0ZW1lbnR9LilcbiovXG5leHBvcnQgZnVuY3Rpb24gdG9TdGF0ZW1lbnQoYXN0KSB7XG5cdHJldHVybiBhc3QgaW5zdGFuY2VvZiBTdGF0ZW1lbnQgfHwgYXN0IGluc3RhbmNlb2YgRGVjbGFyYXRpb24gP1xuXHRcdGFzdCA6XG5cdFx0bmV3IEV4cHJlc3Npb25TdGF0ZW1lbnQoYXN0KVxufVxuIl19