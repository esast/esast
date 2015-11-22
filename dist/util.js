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

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQVNnQixVQUFVLEdBQVYsVUFBVTtTQVNWLEdBQUcsR0FBSCxHQUFHO1NBWUgsTUFBTSxHQUFOLE1BQU07U0FVTixtQkFBbUIsR0FBbkIsbUJBQW1CO1NBVW5CLFdBQVcsR0FBWCxXQUFXOzs7Ozs7Ozs7O1VBekNYLFVBQVU7Ozs7VUFTVixHQUFHOzs7OztVQVlILE1BQU07Ozs7VUFVTixtQkFBbUI7Ozs7VUFVbkIsV0FBVyIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWNsYXJhdGlvbiwgRXhwcmVzc2lvblN0YXRlbWVudCwgSWRlbnRpZmllciwgTGl0ZXJhbCwgTWVtYmVyRXhwcmVzc2lvbiwgU3RhdGVtZW50XG5cdH0gZnJvbSAnLi9hc3QnXG5pbXBvcnQgbWFuZ2xlSWRlbnRpZmllciwge3Byb3BlcnR5TmFtZU9rfSBmcm9tICcuL21hbmdsZS1pZGVudGlmaWVyJ1xuXG4vKipcbk1hbmdsZXMgbmFtZSBhbmQgbWFrZXMgYW4ge0BsaW5rIElkZW50aWZpZXJ9LlxuQHBhcmFtIHtzdHJpbmd9IG5hbWVcbkByZXR1cm4ge0lkZW50aWZpZXJ9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZpZXIobmFtZSkge1xuXHRyZXR1cm4gbmV3IElkZW50aWZpZXIobWFuZ2xlSWRlbnRpZmllcihuYW1lKSlcbn1cblxuLyoqXG5Bc3NpZ25zIGBsb2NgIHRvIGBhc3RgIGFuZCByZXR1cm5zIGl0LlxuQHBhcmFtIHtOb2RlfSBhc3RcbkBwYXJhbSB7TG9jfSBsb2NcbiovXG5leHBvcnQgZnVuY3Rpb24gbG9jKGFzdCwgbG9jKSB7XG5cdGFzdC5sb2MgPSBsb2Ncblx0cmV0dXJuIGFzdFxufVxuXG4vKipcbkNyZWF0ZXMgYSBtZW1iZXIgZXhwcmVzc2lvbiBmb3IgYHByb3BlcnR5TmFtZWAgaW4gYG9iamVjdGAsXG51c2luZyBkb3Qgc3ludGF4IChgYS5iYCkgaWYgcG9zc2libGUsIGFuZCBmYWxsaW5nIGJhY2sgdG8gYGFbJ2InXWAuXG5AcGFyYW0ge05vZGV9IG9iamVjdFxuQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuQHJldHVybiB7TWVtYmVyRXhwcmVzc2lvbn1cbiovXG5leHBvcnQgZnVuY3Rpb24gbWVtYmVyKG9iamVjdCwgcHJvcGVydHlOYW1lKSB7XG5cdHJldHVybiBuZXcgTWVtYmVyRXhwcmVzc2lvbihvYmplY3QsIHByb3BlcnR5SWRPckxpdGVyYWwocHJvcGVydHlOYW1lKSlcbn1cblxuLyoqXG5BbiBJZGVudGlmaWVyIGlmIHByb3BlcnR5TmFtZSBpcyBhIHZhbGlkIEphdmFTY3JpcHQgcHJvcGVydHkgbmFtZTtcbm90aGVyd2lzZSBhIExpdGVyYWwgc3RyaW5nLlxuQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuQHJldHVybiB7SWRlbnRpZmllcnxMaXRlcmFsfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eUlkT3JMaXRlcmFsKHByb3BlcnR5TmFtZSkge1xuXHRyZXR1cm4gcHJvcGVydHlOYW1lT2socHJvcGVydHlOYW1lKSA/XG5cdFx0bmV3IElkZW50aWZpZXIocHJvcGVydHlOYW1lKSA6XG5cdFx0bmV3IExpdGVyYWwocHJvcGVydHlOYW1lKVxufVxuXG4vKipcbkNvbnZlcnQgYW55IHtAbGluayBOb2RlfSBpbnRvIG9uZSB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSBjb250ZW50IG9mIGEgbGluZS5cbihlc2FzdCByZXF1aXJlcyBhbGwgZXhwcmVzc2lvbiBsaW5lcyB0byBiZSB3cmFwcGVkIHdpdGgge0BsaW5rIEV4cHJlc3Npb25TdGF0ZW1lbnR9LilcbiovXG5leHBvcnQgZnVuY3Rpb24gdG9TdGF0ZW1lbnQoYXN0KSB7XG5cdHJldHVybiBhc3QgaW5zdGFuY2VvZiBTdGF0ZW1lbnQgfHwgYXN0IGluc3RhbmNlb2YgRGVjbGFyYXRpb24gP1xuXHRcdGFzdCA6XG5cdFx0bmV3IEV4cHJlc3Npb25TdGF0ZW1lbnQoYXN0KVxufVxuIl19