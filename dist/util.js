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

	function toStatement(ast) {
		return ast instanceof _ast.Statement || ast instanceof _ast.Declaration ? ast : new _ast.ExpressionStatement(ast);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQVNnQixVQUFVLEdBQVYsVUFBVTtTQVNWLEdBQUcsR0FBSCxHQUFHO1NBWUgsTUFBTSxHQUFOLE1BQU07U0FVTixtQkFBbUIsR0FBbkIsbUJBQW1CO1NBVW5CLFdBQVcsR0FBWCxXQUFXOzs7Ozs7VUF6Q1gsVUFBVTs7OztVQVNWLEdBQUc7Ozs7O1VBWUgsTUFBTTs7OztVQVVOLG1CQUFtQjs7OztVQVVuQixXQUFXIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fycm93RnVuY3Rpb25FeHByZXNzaW9uLCBEZWNsYXJhdGlvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgRnVuY3Rpb25FeHByZXNzaW9uLFxuXHRJZGVudGlmaWVyLCBMaXRlcmFsLCBNZW1iZXJFeHByZXNzaW9uLCBTdGF0ZW1lbnR9IGZyb20gJy4vYXN0J1xuaW1wb3J0IG1hbmdsZUlkZW50aWZpZXIsIHtwcm9wZXJ0eU5hbWVPa30gZnJvbSAnLi9tYW5nbGUtaWRlbnRpZmllcidcblxuLyoqXG5NYW5nbGVzIG5hbWUgYW5kIG1ha2VzIGFuIHtAbGluayBJZGVudGlmaWVyfS5cbkBwYXJhbSB7c3RyaW5nfSBuYW1lXG5AcmV0dXJuIHtJZGVudGlmaWVyfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmaWVyKG5hbWUpIHtcblx0cmV0dXJuIG5ldyBJZGVudGlmaWVyKG1hbmdsZUlkZW50aWZpZXIobmFtZSkpXG59XG5cbi8qKlxuQXNzaWducyBgbG9jYCB0byBgYXN0YCBhbmQgcmV0dXJucyBpdC5cbkBwYXJhbSB7Tm9kZX0gYXN0XG5AcGFyYW0ge0xvY30gbG9jXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYyhhc3QsIGxvYykge1xuXHRhc3QubG9jID0gbG9jXG5cdHJldHVybiBhc3Rcbn1cblxuLyoqXG5DcmVhdGVzIGEgbWVtYmVyIGV4cHJlc3Npb24gZm9yIGBwcm9wZXJ0eU5hbWVgIGluIGBvYmplY3RgLFxudXNpbmcgZG90IHN5bnRheCAoYGEuYmApIGlmIHBvc3NpYmxlLCBhbmQgZmFsbGluZyBiYWNrIHRvIGBhWydiJ11gLlxuQHBhcmFtIHtOb2RlfSBvYmplY3RcbkBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbkByZXR1cm4ge01lbWJlckV4cHJlc3Npb259XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIG1lbWJlcihvYmplY3QsIHByb3BlcnR5TmFtZSkge1xuXHRyZXR1cm4gbmV3IE1lbWJlckV4cHJlc3Npb24ob2JqZWN0LCBwcm9wZXJ0eUlkT3JMaXRlcmFsKHByb3BlcnR5TmFtZSkpXG59XG5cbi8qKlxuQW4gSWRlbnRpZmllciBpZiBwcm9wZXJ0eU5hbWUgaXMgYSB2YWxpZCBKYXZhU2NyaXB0IHByb3BlcnR5IG5hbWU7XG5vdGhlcndpc2UgYSBMaXRlcmFsIHN0cmluZy5cbkBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbkByZXR1cm4ge0lkZW50aWZpZXJ8TGl0ZXJhbH1cbiovXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlJZE9yTGl0ZXJhbChwcm9wZXJ0eU5hbWUpIHtcblx0cmV0dXJuIHByb3BlcnR5TmFtZU9rKHByb3BlcnR5TmFtZSkgP1xuXHRcdG5ldyBJZGVudGlmaWVyKHByb3BlcnR5TmFtZSkgOlxuXHRcdG5ldyBMaXRlcmFsKHByb3BlcnR5TmFtZSlcbn1cblxuLyoqXG5Db252ZXJ0IGFueSB7QGxpbmsgTm9kZX0gaW50byBvbmUgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgY29udGVudCBvZiBhIGxpbmUuXG4oZXNhc3QgcmVxdWlyZXMgYWxsIGV4cHJlc3Npb24gbGluZXMgdG8gYmUgd3JhcHBlZCB3aXRoIHtAbGluayBFeHByZXNzaW9uU3RhdGVtZW50fS4pXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHRvU3RhdGVtZW50KGFzdCkge1xuXHRyZXR1cm4gYXN0IGluc3RhbmNlb2YgU3RhdGVtZW50IHx8IGFzdCBpbnN0YW5jZW9mIERlY2xhcmF0aW9uID9cblx0XHRhc3QgOlxuXHRcdG5ldyBFeHByZXNzaW9uU3RhdGVtZW50KGFzdClcbn1cbiJdfQ==