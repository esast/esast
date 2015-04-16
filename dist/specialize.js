if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './ast', './private/tuple', './private/util'], function (exports, _ast, _privateTuple, _privateUtil) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _tuple = _interopRequire(_privateTuple);

	var s = function s(superType, namesTypes, protoProps) {
		return _tuple('' + superType.name + 'Specialization', superType, 'specialization of ' + superType, namesTypes, protoProps);
	};

	var FunctionExpressionPlain = s(_ast.FunctionExpression, ['params', [_ast.Identifier], 'body', _ast.BlockStatement], { id: null, generator: false }),
	    FunctionExpressionPlainGenerator = s(_ast.FunctionExpression, ['params', [_ast.Identifier], 'body', _ast.BlockStatement], { id: null, generator: true }),
	    FunctionExpressionThunk = s(_ast.FunctionExpression, ['body', _ast.BlockStatement], {
		id: null,
		params: [],
		generator: false
	}),
	    FunctionExpressionThunkGenerator = s(_ast.FunctionExpression, ['body', _ast.BlockStatement], {
		id: null,
		params: [],
		generator: true
	}),
	    PropertyInit = s(_ast.Property, ['key', _ast.Expression, 'value', _ast.Expression], { kind: 'init' }),
	    PropertyGet = s(_ast.Property, ['key', _ast.Expression, 'value', _ast.Expression], { kind: 'get' }),
	    MemberExpressionComputed = s(_ast.MemberExpression, ['object', _ast.Expression, 'property', _ast.Expression], { computed: true }),
	    MemberExpressionIdentifier = s(_ast.MemberExpression, ['object', _ast.Expression, 'property', _ast.Literal], { computed: false });

	var LitTrue = _ast.Literal(true);

	var assignmentExpressionPlain = s(_ast.AssignmentExpression, ['left', _ast.Pattern, 'right', _ast.Expression], { operator: '=' }),
	    callExpressionThunk = s(_ast.CallExpression, ['callee', _ast.Expression], { arguments: [] }),
	    functionExpressionPlain = function functionExpressionPlain(params, body, generator) {
		return (generator ? FunctionExpressionPlainGenerator : FunctionExpressionPlain)(params, body);
	},
	    functionExpressionThunk = function functionExpressionThunk(body, generator) {
		return (generator ? FunctionExpressionThunkGenerator : FunctionExpressionThunk)(body);
	},
	    variableDeclarationConst = s(_ast.VariableDeclaration, ['declarations', [_ast.VariableDeclarator]], { kind: 'const' }),
	    unaryExpressionNegate = s(_ast.UnaryExpression, ['argument', _ast.Expression], { operator: '-' }),
	    switchStatementOnTrue = s(_ast.SwitchStatement, ['cases', [_ast.SwitchCase]], {
		discriminant: LitTrue,
		// May contain nested variable declarations
		lexical: true
	}),
	    whileStatementInfinite = s(_ast.WhileStatement, ['body', _ast.Statement], { test: LitTrue }),
	    binaryExpressionPlus = s(_ast.BinaryExpression, ['left', _ast.Expression, 'right', _ast.Expression], { operator: '+' }),
	    property = function property(kind, key, value) {
		if (kind === 'init') {
			return PropertyInit(key, value);
		} else {
			_privateUtil.assert(kind === 'get');
			return PropertyGet(key, value);
		}
	},
	    memberExpression = function memberExpression(object, property) {
		return property.type === 'Identifier' ? MemberExpressionIdentifier(object, property) : MemberExpressionComputed(object, property);
	},
	    yieldExpressionNoDelegate = s(_ast.YieldExpression, ['argument', _ast.Expression], { delegate: false }),
	    yieldExpressionDelegate = s(_ast.YieldExpression, ['argument', _ast.Expression], { delegate: true });
	exports.assignmentExpressionPlain = assignmentExpressionPlain;
	exports.callExpressionThunk = callExpressionThunk;
	exports.functionExpressionPlain = functionExpressionPlain;
	exports.functionExpressionThunk = functionExpressionThunk;
	exports.variableDeclarationConst = variableDeclarationConst;
	exports.unaryExpressionNegate = unaryExpressionNegate;
	exports.switchStatementOnTrue = switchStatementOnTrue;
	exports.whileStatementInfinite = whileStatementInfinite;
	exports.binaryExpressionPlus = binaryExpressionPlus;
	exports.property = property;
	exports.memberExpression = memberExpression;
	exports.yieldExpressionNoDelegate = yieldExpressionNoDelegate;
	exports.yieldExpressionDelegate = yieldExpressionDelegate;
});
//# sourceMappingURL=specialize.js.map