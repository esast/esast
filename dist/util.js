if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './ast', './mangle-identifier'], function (exports, _ast, _mangleIdentifier) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.identifier = identifier;
	exports.loc = loc;
	exports.member = member;
	exports.propertyIdOrLiteral = propertyIdOrLiteral;
	exports.functionExpressionThunk = functionExpressionThunk;
	exports.toStatement = toStatement;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mangleIdentifier2 = _interopRequireDefault(_mangleIdentifier);

	/**
 Mangles name and makes an {@link Identifier}.
 @param {string} name
 @return {Identifier}
 */

	function identifier(name) {
		return new _ast.Identifier((0, _mangleIdentifier2.default)(name));
	}

	/**
 Assigns `loc` to `ast` and returns it.
 @param {Node} ast
 @param {Loc} loc
 */

	function loc(ast, loc) {
		ast.loc = loc;
		return ast;
	}

	/**
 Creates a member expression for `propertyName` in `object`,
 using dot syntax (`a.b`) if possible, and falling back to `a['b']`.
 @param {Node} object
 @param {string} propertyName
 @return {MemberExpression}
 */

	function member(object, propertyName) {
		return new _ast.MemberExpression(object, propertyIdOrLiteral(propertyName));
	}

	/**
 An Identifier if propertyName is a valid JavaScript property name;
 otherwise a Literal string.
 @param {string} propertyName
 @return {Identifier|Literal}
 */

	function propertyIdOrLiteral(propertyName) {
		return (0, _mangleIdentifier.propertyNameOk)(propertyName) ? new _ast.Identifier(propertyName) : new _ast.Literal(propertyName);
	}

	function functionExpressionThunk(body, generator) {
		return generator ? new _ast.FunctionExpression(null, [], body, true) : new _ast.ArrowFunctionExpression([], body);
	}

	/**
 Convert any {@link Node} into one that can be used as the content of a line.
 (esast requires all expression lines to be wrapped with {@link ExpressionStatement}.)
 */

	function toStatement(ast) {
		return ast instanceof _ast.Statement || ast instanceof _ast.Declaration ? ast : new _ast.ExpressionStatement(ast);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU08sVUFBUyxVQUFVLENBQUMsSUFBSSxFQUFFO0FBQ2hDLFNBQU8sU0FUUCxVQUFVLENBU1ksZ0NBQWlCLElBQUksQ0FBQyxDQUFDLENBQUE7RUFDN0M7Ozs7Ozs7O0FBT00sVUFBUyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUM3QixLQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUNiLFNBQU8sR0FBRyxDQUFBO0VBQ1Y7Ozs7Ozs7Ozs7QUFTTSxVQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFO0FBQzVDLFNBQU8sU0E5QmMsZ0JBQWdCLENBOEJULE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO0VBQ3RFOzs7Ozs7Ozs7QUFRTSxVQUFTLG1CQUFtQixDQUFDLFlBQVksRUFBRTtBQUNqRCxTQUFPLHNCQXZDa0IsY0FBYyxFQXVDakIsWUFBWSxDQUFDLEdBQ2xDLFNBekNELFVBQVUsQ0F5Q00sWUFBWSxDQUFDLEdBQzVCLFNBMUNXLE9BQU8sQ0EwQ04sWUFBWSxDQUFDLENBQUE7RUFDMUI7O0FBRU0sVUFBUyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ3hELFNBQU8sU0FBUyxHQUNmLFNBaERpRSxrQkFBa0IsQ0FnRDVELElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUM1QyxTQWpETSx1QkFBdUIsQ0FpREQsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBO0VBQ3RDOzs7Ozs7O0FBTU0sVUFBUyxXQUFXLENBQUMsR0FBRyxFQUFFO0FBQ2hDLFNBQU8sR0FBRyxpQkF4RDZCLFNBQVMsQUF3RGpCLElBQUksR0FBRyxpQkF6RE4sV0FBVyxBQXlEa0IsR0FDNUQsR0FBRyxHQUNILFNBM0Q0QyxtQkFBbUIsQ0EyRHZDLEdBQUcsQ0FBQyxDQUFBO0VBQzdCIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fycm93RnVuY3Rpb25FeHByZXNzaW9uLCBEZWNsYXJhdGlvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgRnVuY3Rpb25FeHByZXNzaW9uLFxuXHRJZGVudGlmaWVyLCBMaXRlcmFsLCBNZW1iZXJFeHByZXNzaW9uLCBTdGF0ZW1lbnR9IGZyb20gJy4vYXN0J1xuaW1wb3J0IG1hbmdsZUlkZW50aWZpZXIsIHtwcm9wZXJ0eU5hbWVPa30gZnJvbSAnLi9tYW5nbGUtaWRlbnRpZmllcidcblxuLyoqXG5NYW5nbGVzIG5hbWUgYW5kIG1ha2VzIGFuIHtAbGluayBJZGVudGlmaWVyfS5cbkBwYXJhbSB7c3RyaW5nfSBuYW1lXG5AcmV0dXJuIHtJZGVudGlmaWVyfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmaWVyKG5hbWUpIHtcblx0cmV0dXJuIG5ldyBJZGVudGlmaWVyKG1hbmdsZUlkZW50aWZpZXIobmFtZSkpXG59XG5cbi8qKlxuQXNzaWducyBgbG9jYCB0byBgYXN0YCBhbmQgcmV0dXJucyBpdC5cbkBwYXJhbSB7Tm9kZX0gYXN0XG5AcGFyYW0ge0xvY30gbG9jXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYyhhc3QsIGxvYykge1xuXHRhc3QubG9jID0gbG9jXG5cdHJldHVybiBhc3Rcbn1cblxuLyoqXG5DcmVhdGVzIGEgbWVtYmVyIGV4cHJlc3Npb24gZm9yIGBwcm9wZXJ0eU5hbWVgIGluIGBvYmplY3RgLFxudXNpbmcgZG90IHN5bnRheCAoYGEuYmApIGlmIHBvc3NpYmxlLCBhbmQgZmFsbGluZyBiYWNrIHRvIGBhWydiJ11gLlxuQHBhcmFtIHtOb2RlfSBvYmplY3RcbkBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbkByZXR1cm4ge01lbWJlckV4cHJlc3Npb259XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIG1lbWJlcihvYmplY3QsIHByb3BlcnR5TmFtZSkge1xuXHRyZXR1cm4gbmV3IE1lbWJlckV4cHJlc3Npb24ob2JqZWN0LCBwcm9wZXJ0eUlkT3JMaXRlcmFsKHByb3BlcnR5TmFtZSkpXG59XG5cbi8qKlxuQW4gSWRlbnRpZmllciBpZiBwcm9wZXJ0eU5hbWUgaXMgYSB2YWxpZCBKYXZhU2NyaXB0IHByb3BlcnR5IG5hbWU7XG5vdGhlcndpc2UgYSBMaXRlcmFsIHN0cmluZy5cbkBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbkByZXR1cm4ge0lkZW50aWZpZXJ8TGl0ZXJhbH1cbiovXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlJZE9yTGl0ZXJhbChwcm9wZXJ0eU5hbWUpIHtcblx0cmV0dXJuIHByb3BlcnR5TmFtZU9rKHByb3BlcnR5TmFtZSkgP1xuXHRcdG5ldyBJZGVudGlmaWVyKHByb3BlcnR5TmFtZSkgOlxuXHRcdG5ldyBMaXRlcmFsKHByb3BlcnR5TmFtZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKGJvZHksIGdlbmVyYXRvcikge1xuXHRyZXR1cm4gZ2VuZXJhdG9yID9cblx0XHRuZXcgRnVuY3Rpb25FeHByZXNzaW9uKG51bGwsIFtdLCBib2R5LCB0cnVlKSA6XG5cdFx0bmV3IEFycm93RnVuY3Rpb25FeHByZXNzaW9uKFtdLCBib2R5KVxufVxuXG4vKipcbkNvbnZlcnQgYW55IHtAbGluayBOb2RlfSBpbnRvIG9uZSB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSBjb250ZW50IG9mIGEgbGluZS5cbihlc2FzdCByZXF1aXJlcyBhbGwgZXhwcmVzc2lvbiBsaW5lcyB0byBiZSB3cmFwcGVkIHdpdGgge0BsaW5rIEV4cHJlc3Npb25TdGF0ZW1lbnR9LilcbiovXG5leHBvcnQgZnVuY3Rpb24gdG9TdGF0ZW1lbnQoYXN0KSB7XG5cdHJldHVybiBhc3QgaW5zdGFuY2VvZiBTdGF0ZW1lbnQgfHwgYXN0IGluc3RhbmNlb2YgRGVjbGFyYXRpb24gP1xuXHRcdGFzdCA6XG5cdFx0bmV3IEV4cHJlc3Npb25TdGF0ZW1lbnQoYXN0KVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=
