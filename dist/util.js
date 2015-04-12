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
		return _ instanceof _ast.Statement ? _ : _ast.ExpressionStatement(_);
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
//# sourceMappingURL=util.js.map