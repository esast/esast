if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist/tupl', './ast', './private/util'], function (exports, _tuplDistTupl, _ast, _privateUtil) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _tupl = _interopRequire(_tuplDistTupl);

	var s = function s(superType, namesTypes, protoProps) {
		return _tupl('' + superType.name + 'Specialization', superType, 'specialization of ' + superType, namesTypes, protoProps);
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
//# sourceMappingURL=data:application/json;base64,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RDtLQUNELGdCQUFnQixHQUFHLDBCQUFDLE1BQU0sRUFBRSxRQUFRO1NBQ25DLFFBQVEsQ0FBQyxJQUFJLEtBQUssWUFBWSxHQUM3QiwwQkFBMEIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEdBQzVDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7RUFBQTtLQUM1Qyx5QkFBeUIsR0FBRyxDQUFDLE1BcEVXLGVBQWUsRUFvRVIsQ0FBRSxVQUFVLE9BdEVxQixVQUFVLENBc0VqQixFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO0tBQy9GLHVCQUF1QixHQUFHLENBQUMsTUFyRWEsZUFBZSxFQXFFVixDQUFFLFVBQVUsT0F2RXVCLFVBQVUsQ0F1RW5CLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtTQWpDNUYseUJBQXlCLEdBQXpCLHlCQUF5QjtTQUV6QixtQkFBbUIsR0FBbkIsbUJBQW1CO1NBRW5CLHVCQUF1QixHQUF2Qix1QkFBdUI7U0FFdkIsdUJBQXVCLEdBQXZCLHVCQUF1QjtTQUV2Qix3QkFBd0IsR0FBeEIsd0JBQXdCO1NBRXhCLHFCQUFxQixHQUFyQixxQkFBcUI7U0FFckIscUJBQXFCLEdBQXJCLHFCQUFxQjtTQUtyQixzQkFBc0IsR0FBdEIsc0JBQXNCO1NBQ3RCLG9CQUFvQixHQUFwQixvQkFBb0I7U0FFcEIsUUFBUSxHQUFSLFFBQVE7U0FRUixnQkFBZ0IsR0FBaEIsZ0JBQWdCO1NBSWhCLHlCQUF5QixHQUF6Qix5QkFBeUI7U0FDekIsdUJBQXVCLEdBQXZCLHVCQUF1QiIsImZpbGUiOiJzcGVjaWFsaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBBc3NpZ25tZW50RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgQmxvY2tTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLCBFeHByZXNzaW9uLFxuXHRGdW5jdGlvbkV4cHJlc3Npb24sIElkZW50aWZpZXIsIExpdGVyYWwsIE1lbWJlckV4cHJlc3Npb24sIFBhdHRlcm4sIFByb3BlcnR5LCBSZXR1cm5TdGF0ZW1lbnQsXG5cdFN0YXRlbWVudCwgU3dpdGNoQ2FzZSwgU3dpdGNoU3RhdGVtZW50LCBZaWVsZEV4cHJlc3Npb24sIFVuYXJ5RXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdGlvbixcblx0VmFyaWFibGVEZWNsYXJhdG9yLCBXaGlsZVN0YXRlbWVudCB9IGZyb20gJy4vYXN0J1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi9wcml2YXRlL3V0aWwnXG5cbmNvbnN0IHMgPSAoc3VwZXJUeXBlLCBuYW1lc1R5cGVzLCBwcm90b1Byb3BzKSA9PiB0dXBsKFxuXHRgJHtzdXBlclR5cGUubmFtZX1TcGVjaWFsaXphdGlvbmAsXG5cdHN1cGVyVHlwZSxcblx0YHNwZWNpYWxpemF0aW9uIG9mICR7c3VwZXJUeXBlfWAsXG5cdG5hbWVzVHlwZXMsXG5cdHByb3RvUHJvcHMpXG5cbmNvbnN0XG5cdEZ1bmN0aW9uRXhwcmVzc2lvblBsYWluID0gcyhGdW5jdGlvbkV4cHJlc3Npb24sXG5cdFx0WyAncGFyYW1zJywgW0lkZW50aWZpZXJdLCAnYm9keScsIEJsb2NrU3RhdGVtZW50IF0sIHsgaWQ6IG51bGwsIGdlbmVyYXRvcjogZmFsc2UgfSksXG5cdEZ1bmN0aW9uRXhwcmVzc2lvblBsYWluR2VuZXJhdG9yID0gcyhGdW5jdGlvbkV4cHJlc3Npb24sXG5cdFx0WyAncGFyYW1zJywgW0lkZW50aWZpZXJdLCAnYm9keScsIEJsb2NrU3RhdGVtZW50IF0sIHsgaWQ6IG51bGwsIGdlbmVyYXRvcjogdHJ1ZSB9KSxcblx0RnVuY3Rpb25FeHByZXNzaW9uVGh1bmsgPSBzKEZ1bmN0aW9uRXhwcmVzc2lvbiwgWyAnYm9keScsIEJsb2NrU3RhdGVtZW50IF0sIHtcblx0XHRpZDogbnVsbCxcblx0XHRwYXJhbXM6IFtdLFxuXHRcdGdlbmVyYXRvcjogZmFsc2Vcblx0fSksXG5cdEZ1bmN0aW9uRXhwcmVzc2lvblRodW5rR2VuZXJhdG9yID0gcyhGdW5jdGlvbkV4cHJlc3Npb24sIFsgJ2JvZHknLCBCbG9ja1N0YXRlbWVudCBdLCB7XG5cdFx0aWQ6IG51bGwsXG5cdFx0cGFyYW1zOiBbXSxcblx0XHRnZW5lcmF0b3I6IHRydWVcblx0fSksXG5cdFByb3BlcnR5SW5pdCA9IHMoUHJvcGVydHksIFsgJ2tleScsIEV4cHJlc3Npb24sICd2YWx1ZScsIEV4cHJlc3Npb24gXSwgeyBraW5kOiAnaW5pdCcgfSksXG5cdFByb3BlcnR5R2V0ID0gcyhQcm9wZXJ0eSwgWyAna2V5JywgRXhwcmVzc2lvbiwgJ3ZhbHVlJywgRXhwcmVzc2lvbiBdLCB7IGtpbmQ6ICdnZXQnIH0pLFxuXHRNZW1iZXJFeHByZXNzaW9uQ29tcHV0ZWQgPSBzKE1lbWJlckV4cHJlc3Npb24sXG5cdFx0WyAnb2JqZWN0JywgRXhwcmVzc2lvbiwgJ3Byb3BlcnR5JywgRXhwcmVzc2lvbiBdLCB7IGNvbXB1dGVkOiB0cnVlIH0pLFxuXHRNZW1iZXJFeHByZXNzaW9uSWRlbnRpZmllciA9IHMoTWVtYmVyRXhwcmVzc2lvbixcblx0XHRbICdvYmplY3QnLCBFeHByZXNzaW9uLCAncHJvcGVydHknLCBMaXRlcmFsIF0sIHsgY29tcHV0ZWQ6IGZhbHNlIH0pXG5cbmNvbnN0IExpdFRydWUgPSBMaXRlcmFsKHRydWUpXG5cbmV4cG9ydCBjb25zdFxuXHRhc3NpZ25tZW50RXhwcmVzc2lvblBsYWluID0gcyhBc3NpZ25tZW50RXhwcmVzc2lvbixcblx0XHRbICdsZWZ0JywgUGF0dGVybiwgJ3JpZ2h0JywgRXhwcmVzc2lvbiBdLCB7IG9wZXJhdG9yOiAnPScgfSksXG5cdGNhbGxFeHByZXNzaW9uVGh1bmsgPSBzKENhbGxFeHByZXNzaW9uLFxuXHRcdFsgJ2NhbGxlZScsIEV4cHJlc3Npb24gXSwgeyBhcmd1bWVudHM6IFtdIH0pLFxuXHRmdW5jdGlvbkV4cHJlc3Npb25QbGFpbiA9IChwYXJhbXMsIGJvZHksIGdlbmVyYXRvcikgPT5cblx0XHQoZ2VuZXJhdG9yID8gRnVuY3Rpb25FeHByZXNzaW9uUGxhaW5HZW5lcmF0b3IgOiBGdW5jdGlvbkV4cHJlc3Npb25QbGFpbikocGFyYW1zLCBib2R5KSxcblx0ZnVuY3Rpb25FeHByZXNzaW9uVGh1bmsgPSAoYm9keSwgZ2VuZXJhdG9yKSA9PlxuXHRcdChnZW5lcmF0b3IgPyBGdW5jdGlvbkV4cHJlc3Npb25UaHVua0dlbmVyYXRvciA6IEZ1bmN0aW9uRXhwcmVzc2lvblRodW5rKShib2R5KSxcblx0dmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0ID1cblx0XHRzKFZhcmlhYmxlRGVjbGFyYXRpb24sIFsgJ2RlY2xhcmF0aW9ucycsIFtWYXJpYWJsZURlY2xhcmF0b3JdIF0sIHsga2luZDogJ2NvbnN0JyB9KSxcblx0dW5hcnlFeHByZXNzaW9uTmVnYXRlID1cblx0XHRzKFVuYXJ5RXhwcmVzc2lvbiwgWyAnYXJndW1lbnQnLCBFeHByZXNzaW9uIF0sIHsgb3BlcmF0b3I6ICctJyB9KSxcblx0c3dpdGNoU3RhdGVtZW50T25UcnVlID0gcyhTd2l0Y2hTdGF0ZW1lbnQsIFsgJ2Nhc2VzJywgW1N3aXRjaENhc2VdIF0sIHtcblx0XHRkaXNjcmltaW5hbnQ6IExpdFRydWUsXG5cdFx0Ly8gTWF5IGNvbnRhaW4gbmVzdGVkIHZhcmlhYmxlIGRlY2xhcmF0aW9uc1xuXHRcdGxleGljYWw6IHRydWVcblx0fSksXG5cdHdoaWxlU3RhdGVtZW50SW5maW5pdGUgPSBzKFdoaWxlU3RhdGVtZW50LCBbICdib2R5JywgU3RhdGVtZW50IF0sIHsgdGVzdDogTGl0VHJ1ZSB9KSxcblx0YmluYXJ5RXhwcmVzc2lvblBsdXMgPSBzKEJpbmFyeUV4cHJlc3Npb24sXG5cdFx0WyAnbGVmdCcsIEV4cHJlc3Npb24sICdyaWdodCcsIEV4cHJlc3Npb24gXSwgeyBvcGVyYXRvcjogJysnIH0pLFxuXHRwcm9wZXJ0eSA9IChraW5kLCBrZXksIHZhbHVlKSA9PiB7XG5cdFx0aWYgKGtpbmQgPT09ICdpbml0Jylcblx0XHRcdHJldHVybiBQcm9wZXJ0eUluaXQoa2V5LCB2YWx1ZSlcblx0XHRlbHNlIHtcblx0XHRcdGFzc2VydChraW5kID09PSAnZ2V0Jylcblx0XHRcdHJldHVybiBQcm9wZXJ0eUdldChrZXksIHZhbHVlKVxuXHRcdH1cblx0fSxcblx0bWVtYmVyRXhwcmVzc2lvbiA9IChvYmplY3QsIHByb3BlcnR5KSA9PlxuXHRcdHByb3BlcnR5LnR5cGUgPT09ICdJZGVudGlmaWVyJyA/XG5cdFx0XHRNZW1iZXJFeHByZXNzaW9uSWRlbnRpZmllcihvYmplY3QsIHByb3BlcnR5KSA6XG5cdFx0XHRNZW1iZXJFeHByZXNzaW9uQ29tcHV0ZWQob2JqZWN0LCBwcm9wZXJ0eSksXG5cdHlpZWxkRXhwcmVzc2lvbk5vRGVsZWdhdGUgPSBzKFlpZWxkRXhwcmVzc2lvbiwgWyAnYXJndW1lbnQnLCBFeHByZXNzaW9uIF0sIHsgZGVsZWdhdGU6IGZhbHNlIH0pLFxuXHR5aWVsZEV4cHJlc3Npb25EZWxlZ2F0ZSA9IHMoWWllbGRFeHByZXNzaW9uLCBbICdhcmd1bWVudCcsIEV4cHJlc3Npb24gXSwgeyBkZWxlZ2F0ZTogdHJ1ZSB9KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=