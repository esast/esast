'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './ast', './Loc'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./ast'), require('./Loc'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.ast, global.Loc);
		global.fromJson = mod.exports;
	}
})(this, function (exports, _ast, _Loc) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = fromObject;

	var _Loc2 = _interopRequireDefault(_Loc);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function fromObject(_) {
		switch (_.type) {
			case 'Program':
				return loc(_, new _ast.Program(_.body.map(fromStatement)));

			case 'Identifier':
				return fromIdentifier(_);

			case 'VariableDeclarator':
				return fromVariableDeclarator(_);

			case 'VariableDeclaration':
				return loc(_, new _ast.VariableDeclaration(_.kind, _.declarations.map(fromVariableDeclarator)));

			case 'EmptyStatement':
				return loc(_, new _ast.EmptyStatement());

			case 'BlockStatement':
				return loc(_, fromBlockStatement(_));

			case 'ExpressionStatement':
				return loc(_, new _ast.ExpressionStatement(fromExpression(_.expression)));

			case 'IfStatement':
				return loc(_, new _ast.IfStatement(fromExpression(_.test), fromStatement(_.consequent), op(fromStatement, _.alternate)));

			case 'LabeledStatement':
				return loc(_, new _ast.LabeledStatement(fromIdentifier(_.label), fromStatement(_.body)));

			case 'BreakStatement':
				return loc(_, new _ast.BreakStatement(op(fromIdentifier, _.label)));

			case 'ContinueStatement':
				return loc(_, new _ast.ContinueStatement(op(fromIdentifier, _.label)));

			case 'SwitchCase':
				return fromSwitchCase(_);

			case 'SwitchStatement':
				return loc(_, new _ast.SwitchStatement(fromExpression(_.discriminant), _.cases.map(fromSwitchCase)));

			case 'ReturnStatement':
				return loc(_, new _ast.ReturnStatement(op(fromExpression, _.argument)));

			case 'ThrowStatement':
				return loc(_, new _ast.ThrowStatement(fromExpression(_.argument)));

			case 'CatchClause':
				return fromCatchClause(_);

			case 'TryStatement':
				return loc(_, new _ast.TryStatement(fromBlockStatement(_.block), op(fromCatchClause, _.handler), op(fromBlockStatement, _.finalizer)));

			case 'WhileStatement':
				return loc(_, new _ast.WhileStatement(fromExpression(_.test), fromStatement(_.body)));

			case 'DoWhileStatement':
				return loc(_, new _ast.DoWhileStatement(fromStatement(_.body), fromExpression(_.test)));

			case 'ForStatement':
				return loc(_, new _ast.ForStatement(op(fromExpressionOrVariableDeclaration, _.init), op(fromExpression, _.test), op(fromStatement, _.update), fromStatement(_.body)));

			case 'ForInStatement':
				return loc(_, new _ast.ForInStatement(fromExpressionOrVariableDeclaration(_.left), fromExpression(_.right), fromStatement(_.body)));

			case 'ForOfStatement':
				return loc(_, new _ast.ForOfStatement(fromExpressionOrVariableDeclaration(_.left), fromExpression(_.right), fromStatement(_.body)));

			case 'DebuggerStatement':
				return loc(_, new _ast.DebuggerStatement());

			case 'FunctionDeclaration':
				return loc(_, new _ast.FunctionDeclaration(fromIdentifier(_.id), _.params.map(fromIdentifier), fromBlockStatement(_.body), _.generator));

			case 'Literal':
				{
					let value = _.value;

					if (value instanceof Object && !(value instanceof RegExp)) {
						var _value = value;
						const pattern = _value.pattern;
						const flags = _value.flags;
						if (pattern === undefined || flags === undefined) throw new Error(`Literal of object expected to be a RegExp {pattern, flags}, got: ${ value }`);
						value = new RegExp(pattern, flags);
					}

					return loc(_, new _ast.Literal(value));
				}

			case 'ThisExpression':
				return loc(_, new _ast.ThisExpression());

			case 'ArrayExpression':
				return loc(_, new _ast.ArrayExpression(_.elements.map(_ => op(fromExpression, _))));

			case 'Property':
				return fromProperty(_);

			case 'ObjectExpression':
				return loc(_, new _ast.ObjectExpression(_.properties.map(fromProperty)));

			case 'FunctionExpression':
				return fromFunctionExpression(_);

			case 'ArrowFunctionExpression':
				return loc(_, new _ast.ArrowFunctionExpression(_.params.map(fromPattern), fromBlockStatementOrExpression(_.body)));

			case 'SequenceExpression':
				return loc(_, new _ast.SequenceExpression(_.expressions.map(fromExpression)));

			case 'UnaryExpression':
				return loc(_, new _ast.UnaryExpression(_.operator, fromExpression(_.argument)));

			case 'BinaryExpression':
				return loc(_, new _ast.BinaryExpression(_.operator, fromExpression(_.left), fromExpression(_.right)));

			case 'AssignmentExpression':
				return loc(_, new _ast.AssignmentExpression(_.operator, fromPattern(_.left), fromExpression(_.right)));

			case 'UpdateExpression':
				return loc(_, new _ast.UpdateExpression(_.operator, fromExpression(_.argument), _.prefix));

			case 'LogicalExpression':
				return loc(_, new _ast.LogicalExpression(_.operator, fromExpression(_.left), fromExpression(_.right)));

			case 'ConditionalExpression':
				return loc(_, new _ast.ConditionalExpression(fromExpression(_.test), fromExpression(_.consequent), fromExpression(_.alternate)));

			case 'NewExpression':
				return loc(_, new _ast.NewExpression(fromExpression(_.callee), _.arguments.map(fromExpression)));

			case 'CallExpression':
				return loc(_, new _ast.CallExpression(fromExpression(_.callee), _.arguments.map(fromExpression)));

			case 'SpreadElement':
				return loc(_, new _ast.SpreadElement(fromExpression(_.argument)));

			case 'MemberExpression':
				return loc(_, new _ast.MemberExpression(fromExpression(_.object), fromExpression(_.property)));

			case 'YieldExpression':
				return loc(_, new _ast.YieldExpression(fromExpression(_.argument), _.delegate));

			case 'TemplateElement':
				return fromTemplateElement(_);

			case 'TemplateLiteral':
				return fromTemplateLiteral(_);

			case 'TaggedTemplateExpression':
				return loc(_, new _ast.TaggedTemplateExpression(fromExpression(_.tag), fromTemplateLiteral(_.quasi)));

			case 'AssignmentProperty':
				return fromAssignmentProperty(_);

			case 'ObjectPattern':
				return loc(_, new _ast.ObjectPattern(_.properties.map(fromAssignmentProperty)));

			case 'ArrayPattern':
				return loc(_, new _ast.ArrayPattern(_.elements.map(e => op(fromPattern, e))));

			case 'RestElement':
				return loc(_, new _ast.RestElement(fromExpression(_.argument)));

			case 'MethodDefinition':
				return fromMethodDefinition(_);

			case 'ClassBody':
				return fromClassBody(_);

			case 'ClassDeclaration':
				return loc(_, new _ast.ClassDeclaration(fromIdentifier(_.id), op(fromExpression, _.superClass), fromClassBody(_.body)));

			case 'ClassExpression':
				return loc(_, new _ast.ClassExpression(op(fromIdentifier, _.id), op(fromExpression, _.superClass), fromClassBody(_.body)));

			case 'ImportDeclaration':
				return loc(_, new _ast.ImportDeclaration(_.specifiers.map(fromImportSpecifierAbstract), fromLiteralString(_.source)));

			case 'ImportSpecifier':
				return loc(_, new _ast.ImportSpecifier(fromIdentifier(_.imported), fromIdentifier(_.local)));

			case 'ImportDefaultSpecifier':
				return loc(_, new _ast.ImportDefaultSpecifier(fromIdentifier(_.local)));

			case 'ImportNamespaceSpecifier':
				return loc(_, new _ast.ImportNamespaceSpecifier(fromIdentifier(_.local)));

			case 'ExportSpeciifer':
				return fromExportSpecifier(_);

			case 'ExportNamedDeclaration':
				return loc(_, new _ast.ExportNamedDeclaration(op(fromDeclaration, _.declaration), _.specifiers.map(fromExportSpecifier), op(fromLiteralString, _.source)));

			case 'ExportDefaultDeclaration':
				return loc(_, new _ast.ExportDefaultDeclaration(fromExpressionOrDeclaration(_.declaration)));

			case 'ExportAllDeclaration':
				return loc(_, new _ast.ExportAllDeclaration(fromLiteralString(_.source)));

			default:
				throw new Error(`Bad type: ${ _.type }`);
		}
	}

	function op(func, optional) {
		return optional === null || optional === undefined ? null : func(optional);
	}

	function loc(object, ast) {
		const loc = object.loc;
		if (loc !== undefined) ast.loc = new _Loc2.default(new _Loc.Pos(loc.start.line, loc.start.column), new _Loc.Pos(loc.end.line, loc.end.column));
		return ast;
	}

	function fromIdentifier(_) {
		return loc(_, new _ast.Identifier(_.name));
	}

	function fromVariableDeclarator(_) {
		return loc(_, new _ast.VariableDeclarator(fromPattern(_.id), op(fromExpression, _.init)));
	}

	function fromSwitchCase(_) {
		return loc(_, new _ast.SwitchCase(op(fromExpression, _.test), _.consequent.map(fromStatement)));
	}

	function fromBlockStatement(_) {
		return loc(_, new _ast.BlockStatement(_.body.map(fromStatement)));
	}

	function fromCatchClause(_) {
		return loc(_, new _ast.CatchClause(fromPattern(_.param), fromBlockStatement(_.body)));
	}

	function fromTemplateElement(_) {
		return loc(_, new _ast.TemplateElement(_.tail, _.value));
	}

	function fromTemplateLiteral(_) {
		return loc(_, new _ast.TemplateLiteral(_.quasis.map(fromTemplateElement), _.expressions.map(fromExpression)));
	}

	function fromAssignmentProperty(_) {
		if (!(_.kind === 'init' && !_.method)) throw new Error(`AssignmentProperty has unusual value: ${ JSON.stringify(_) }`);
		return loc(_, new _ast.AssignmentProperty(fromIdentifier(_.key), fromPattern(_.value)));
	}

	function fromProperty(_) {
		return loc(_, new _ast.Property(_.kind, fromIdentifierOrLiteral(_.key), fromExpression(_.value), _.computed, _.method));
	}

	function fromMethodDefinition(_) {
		return loc(_, new _ast.MethodDefinition(fromIdentifierOrLiteral(_.key), fromFunctionExpression(_.value), _.kind, _.static, _.computed));
	}

	function fromClassBody(_) {
		return loc(_, new _ast.ClassBody(_.body.map(fromMethodDefinition)));
	}

	function fromFunctionExpression(_) {
		return loc(_, new _ast.FunctionExpression(op(fromIdentifier, _.id), _.params.map(fromPattern), fromBlockStatement(_.body), _.generator));
	}

	function fromExportSpecifier(_) {
		return loc(_, new _ast.ExportSpecifier(fromIdentifier(_.exported), fromIdentifier(_.local)));
	}

	const fromBlockStatementOrExpression = fromObject,
	      fromDeclaration = fromObject,
	      fromExpression = fromObject,
	      fromExpressionOrDeclaration = fromObject,
	      fromExpressionOrVariableDeclaration = fromObject,
	      fromIdentifierOrLiteral = fromObject,
	      fromImportSpecifierAbstract = fromObject,
	      fromLiteralString = fromObject,
	      fromPattern = fromObject,
	      fromStatement = fromObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mcm9tSnNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBaUJ3QixVQUFVOzs7Ozs7Ozs7O1VBQVYsVUFBVSIsImZpbGUiOiJmcm9tSnNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFzc2lnbm1lbnRQcm9wZXJ0eSwgQXJyYXlFeHByZXNzaW9uLCBBcnJheVBhdHRlcm4sIEFycm93RnVuY3Rpb25FeHByZXNzaW9uLFxuXHRBc3NpZ25tZW50RXhwcmVzc2lvbiwgQmluYXJ5RXhwcmVzc2lvbiwgQmxvY2tTdGF0ZW1lbnQsIEJyZWFrU3RhdGVtZW50LCBDYWxsRXhwcmVzc2lvbixcblx0Q2F0Y2hDbGF1c2UsIENsYXNzQm9keSwgQ2xhc3NEZWNsYXJhdGlvbiwgQ2xhc3NFeHByZXNzaW9uLCBDb25kaXRpb25hbEV4cHJlc3Npb24sXG5cdENvbnRpbnVlU3RhdGVtZW50LCBEZWJ1Z2dlclN0YXRlbWVudCwgRG9XaGlsZVN0YXRlbWVudCwgRW1wdHlTdGF0ZW1lbnQsIEV4cHJlc3Npb25TdGF0ZW1lbnQsXG5cdEV4cG9ydFNwZWNpZmllciwgRXhwb3J0TmFtZWREZWNsYXJhdGlvbiwgRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uLCBFeHBvcnRBbGxEZWNsYXJhdGlvbixcblx0Rm9yU3RhdGVtZW50LCBGb3JJblN0YXRlbWVudCwgRm9yT2ZTdGF0ZW1lbnQsIEZ1bmN0aW9uRGVjbGFyYXRpb24sIEZ1bmN0aW9uRXhwcmVzc2lvbixcblx0SWRlbnRpZmllciwgSWZTdGF0ZW1lbnQsIEltcG9ydERlY2xhcmF0aW9uLCBJbXBvcnRTcGVjaWZpZXIsIEltcG9ydERlZmF1bHRTcGVjaWZpZXIsXG5cdEltcG9ydE5hbWVzcGFjZVNwZWNpZmllciwgTGFiZWxlZFN0YXRlbWVudCwgTGl0ZXJhbCwgTG9naWNhbEV4cHJlc3Npb24sIE1lbWJlckV4cHJlc3Npb24sXG5cdE1ldGhvZERlZmluaXRpb24sIE5ld0V4cHJlc3Npb24sIE9iamVjdEV4cHJlc3Npb24sIE9iamVjdFBhdHRlcm4sIFByb2dyYW0sIFByb3BlcnR5LFxuXHRSZXN0RWxlbWVudCwgUmV0dXJuU3RhdGVtZW50LCBTZXF1ZW5jZUV4cHJlc3Npb24sIFNwcmVhZEVsZW1lbnQsIFN3aXRjaENhc2UsIFN3aXRjaFN0YXRlbWVudCxcblx0VGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uLCBUZW1wbGF0ZUVsZW1lbnQsIFRlbXBsYXRlTGl0ZXJhbCwgVGhpc0V4cHJlc3Npb24sIFRocm93U3RhdGVtZW50LFxuXHRUcnlTdGF0ZW1lbnQsIFVwZGF0ZUV4cHJlc3Npb24sIFVuYXJ5RXhwcmVzc2lvbiwgVmFyaWFibGVEZWNsYXJhdG9yLCBWYXJpYWJsZURlY2xhcmF0aW9uLFxuXHRXaGlsZVN0YXRlbWVudCwgWWllbGRFeHByZXNzaW9ufSBmcm9tICcuL2FzdCdcbmltcG9ydCBMb2MsIHtQb3N9IGZyb20gJy4vTG9jJ1xuXG4vKiogQ29udmVydHMgYSBwbGFpbiBvYmplY3QgdG8gYSB7QGxpbmsgTm9kZX0uICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmcm9tT2JqZWN0KF8pIHtcblx0c3dpdGNoIChfLnR5cGUpIHtcblx0XHRjYXNlICdQcm9ncmFtJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IFByb2dyYW0oXy5ib2R5Lm1hcChmcm9tU3RhdGVtZW50KSkpXG5cdFx0Y2FzZSAnSWRlbnRpZmllcic6XG5cdFx0XHRyZXR1cm4gZnJvbUlkZW50aWZpZXIoXylcblx0XHRjYXNlICdWYXJpYWJsZURlY2xhcmF0b3InOlxuXHRcdFx0cmV0dXJuIGZyb21WYXJpYWJsZURlY2xhcmF0b3IoXylcblx0XHRjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcblx0XHRcdHJldHVybiBsb2MoXyxcblx0XHRcdFx0bmV3IFZhcmlhYmxlRGVjbGFyYXRpb24oXy5raW5kLCBfLmRlY2xhcmF0aW9ucy5tYXAoZnJvbVZhcmlhYmxlRGVjbGFyYXRvcikpKVxuXHRcdGNhc2UgJ0VtcHR5U3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEVtcHR5U3RhdGVtZW50KCkpXG5cdFx0Y2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBmcm9tQmxvY2tTdGF0ZW1lbnQoXykpXG5cdFx0Y2FzZSAnRXhwcmVzc2lvblN0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBFeHByZXNzaW9uU3RhdGVtZW50KGZyb21FeHByZXNzaW9uKF8uZXhwcmVzc2lvbikpKVxuXHRcdGNhc2UgJ0lmU3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IElmU3RhdGVtZW50KFxuXHRcdFx0XHRmcm9tRXhwcmVzc2lvbihfLnRlc3QpLFxuXHRcdFx0XHRmcm9tU3RhdGVtZW50KF8uY29uc2VxdWVudCksXG5cdFx0XHRcdG9wKGZyb21TdGF0ZW1lbnQsIF8uYWx0ZXJuYXRlKSkpXG5cdFx0Y2FzZSAnTGFiZWxlZFN0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBMYWJlbGVkU3RhdGVtZW50KGZyb21JZGVudGlmaWVyKF8ubGFiZWwpLCBmcm9tU3RhdGVtZW50KF8uYm9keSkpKVxuXHRcdGNhc2UgJ0JyZWFrU3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEJyZWFrU3RhdGVtZW50KG9wKGZyb21JZGVudGlmaWVyLCBfLmxhYmVsKSkpXG5cdFx0Y2FzZSAnQ29udGludWVTdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgQ29udGludWVTdGF0ZW1lbnQob3AoZnJvbUlkZW50aWZpZXIsIF8ubGFiZWwpKSlcblx0XHRjYXNlICdTd2l0Y2hDYXNlJzpcblx0XHRcdHJldHVybiBmcm9tU3dpdGNoQ2FzZShfKVxuXHRcdGNhc2UgJ1N3aXRjaFN0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBTd2l0Y2hTdGF0ZW1lbnQoXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8uZGlzY3JpbWluYW50KSxcblx0XHRcdFx0Xy5jYXNlcy5tYXAoZnJvbVN3aXRjaENhc2UpKSlcblx0XHRjYXNlICdSZXR1cm5TdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgUmV0dXJuU3RhdGVtZW50KG9wKGZyb21FeHByZXNzaW9uLCBfLmFyZ3VtZW50KSkpXG5cdFx0Y2FzZSAnVGhyb3dTdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgVGhyb3dTdGF0ZW1lbnQoZnJvbUV4cHJlc3Npb24oXy5hcmd1bWVudCkpKVxuXHRcdGNhc2UgJ0NhdGNoQ2xhdXNlJzpcblx0XHRcdHJldHVybiBmcm9tQ2F0Y2hDbGF1c2UoXylcblx0XHRjYXNlICdUcnlTdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgVHJ5U3RhdGVtZW50KFxuXHRcdFx0XHRmcm9tQmxvY2tTdGF0ZW1lbnQoXy5ibG9jayksXG5cdFx0XHRcdG9wKGZyb21DYXRjaENsYXVzZSwgXy5oYW5kbGVyKSxcblx0XHRcdFx0b3AoZnJvbUJsb2NrU3RhdGVtZW50LCBfLmZpbmFsaXplcikpKVxuXHRcdGNhc2UgJ1doaWxlU3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IFdoaWxlU3RhdGVtZW50KGZyb21FeHByZXNzaW9uKF8udGVzdCksIGZyb21TdGF0ZW1lbnQoXy5ib2R5KSkpXG5cdFx0Y2FzZSAnRG9XaGlsZVN0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBEb1doaWxlU3RhdGVtZW50KGZyb21TdGF0ZW1lbnQoXy5ib2R5KSwgZnJvbUV4cHJlc3Npb24oXy50ZXN0KSkpXG5cdFx0Y2FzZSAnRm9yU3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEZvclN0YXRlbWVudChcblx0XHRcdFx0b3AoZnJvbUV4cHJlc3Npb25PclZhcmlhYmxlRGVjbGFyYXRpb24sIF8uaW5pdCksXG5cdFx0XHRcdG9wKGZyb21FeHByZXNzaW9uLCBfLnRlc3QpLFxuXHRcdFx0XHRvcChmcm9tU3RhdGVtZW50LCBfLnVwZGF0ZSksXG5cdFx0XHRcdGZyb21TdGF0ZW1lbnQoXy5ib2R5KSkpXG5cdFx0Y2FzZSAnRm9ySW5TdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgRm9ySW5TdGF0ZW1lbnQoXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uT3JWYXJpYWJsZURlY2xhcmF0aW9uKF8ubGVmdCksXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8ucmlnaHQpLFxuXHRcdFx0XHRmcm9tU3RhdGVtZW50KF8uYm9keSkpKVxuXHRcdGNhc2UgJ0Zvck9mU3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEZvck9mU3RhdGVtZW50KFxuXHRcdFx0XHRmcm9tRXhwcmVzc2lvbk9yVmFyaWFibGVEZWNsYXJhdGlvbihfLmxlZnQpLFxuXHRcdFx0XHRmcm9tRXhwcmVzc2lvbihfLnJpZ2h0KSxcblx0XHRcdFx0ZnJvbVN0YXRlbWVudChfLmJvZHkpKSlcblx0XHRjYXNlICdEZWJ1Z2dlclN0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBEZWJ1Z2dlclN0YXRlbWVudCgpKVxuXHRcdGNhc2UgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgRnVuY3Rpb25EZWNsYXJhdGlvbihcblx0XHRcdFx0ZnJvbUlkZW50aWZpZXIoXy5pZCksXG5cdFx0XHRcdF8ucGFyYW1zLm1hcChmcm9tSWRlbnRpZmllciksXG5cdFx0XHRcdGZyb21CbG9ja1N0YXRlbWVudChfLmJvZHkpLFxuXHRcdFx0XHRfLmdlbmVyYXRvcikpXG5cdFx0Y2FzZSAnTGl0ZXJhbCc6IHtcblx0XHRcdGxldCB2YWx1ZSA9IF8udmFsdWVcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCAmJiAhKHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSkge1xuXHRcdFx0XHRjb25zdCB7cGF0dGVybiwgZmxhZ3N9ID0gdmFsdWVcblx0XHRcdFx0aWYgKHBhdHRlcm4gPT09IHVuZGVmaW5lZCB8fCBmbGFncyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdGBMaXRlcmFsIG9mIG9iamVjdCBleHBlY3RlZCB0byBiZSBhIFJlZ0V4cCB7cGF0dGVybiwgZmxhZ3N9LCBnb3Q6ICR7dmFsdWV9YClcblx0XHRcdFx0dmFsdWUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIGZsYWdzKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgTGl0ZXJhbCh2YWx1ZSkpXG5cdFx0fVxuXHRcdGNhc2UgJ1RoaXNFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IFRoaXNFeHByZXNzaW9uKCkpXG5cdFx0Y2FzZSAnQXJyYXlFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEFycmF5RXhwcmVzc2lvbihfLmVsZW1lbnRzLm1hcChfID0+IG9wKGZyb21FeHByZXNzaW9uLCBfKSkpKVxuXHRcdGNhc2UgJ1Byb3BlcnR5Jzpcblx0XHRcdHJldHVybiBmcm9tUHJvcGVydHkoXylcblx0XHRjYXNlICdPYmplY3RFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IE9iamVjdEV4cHJlc3Npb24oXy5wcm9wZXJ0aWVzLm1hcChmcm9tUHJvcGVydHkpKSlcblx0XHRjYXNlICdGdW5jdGlvbkV4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGZyb21GdW5jdGlvbkV4cHJlc3Npb24oXylcblx0XHRjYXNlICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbihcblx0XHRcdFx0Xy5wYXJhbXMubWFwKGZyb21QYXR0ZXJuKSxcblx0XHRcdFx0ZnJvbUJsb2NrU3RhdGVtZW50T3JFeHByZXNzaW9uKF8uYm9keSkpKVxuXHRcdGNhc2UgJ1NlcXVlbmNlRXhwcmVzc2lvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBTZXF1ZW5jZUV4cHJlc3Npb24oXy5leHByZXNzaW9ucy5tYXAoZnJvbUV4cHJlc3Npb24pKSlcblx0XHRjYXNlICdVbmFyeUV4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgVW5hcnlFeHByZXNzaW9uKF8ub3BlcmF0b3IsIGZyb21FeHByZXNzaW9uKF8uYXJndW1lbnQpKSlcblx0XHRjYXNlICdCaW5hcnlFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEJpbmFyeUV4cHJlc3Npb24oXG5cdFx0XHRcdF8ub3BlcmF0b3IsXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8ubGVmdCksXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8ucmlnaHQpKSlcblx0XHRjYXNlICdBc3NpZ25tZW50RXhwcmVzc2lvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBBc3NpZ25tZW50RXhwcmVzc2lvbihcblx0XHRcdFx0Xy5vcGVyYXRvcixcblx0XHRcdFx0ZnJvbVBhdHRlcm4oXy5sZWZ0KSxcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5yaWdodCkpKVxuXHRcdGNhc2UgJ1VwZGF0ZUV4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgVXBkYXRlRXhwcmVzc2lvbihfLm9wZXJhdG9yLCBmcm9tRXhwcmVzc2lvbihfLmFyZ3VtZW50KSwgXy5wcmVmaXgpKVxuXHRcdGNhc2UgJ0xvZ2ljYWxFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IExvZ2ljYWxFeHByZXNzaW9uKFxuXHRcdFx0XHRfLm9wZXJhdG9yLFxuXHRcdFx0XHRmcm9tRXhwcmVzc2lvbihfLmxlZnQpLFxuXHRcdFx0XHRmcm9tRXhwcmVzc2lvbihfLnJpZ2h0KSkpXG5cdFx0Y2FzZSAnQ29uZGl0aW9uYWxFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IENvbmRpdGlvbmFsRXhwcmVzc2lvbihcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy50ZXN0KSxcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5jb25zZXF1ZW50KSxcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5hbHRlcm5hdGUpKSlcblx0XHRjYXNlICdOZXdFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IE5ld0V4cHJlc3Npb24oXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8uY2FsbGVlKSxcblx0XHRcdFx0Xy5hcmd1bWVudHMubWFwKGZyb21FeHByZXNzaW9uKSkpXG5cdFx0Y2FzZSAnQ2FsbEV4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgQ2FsbEV4cHJlc3Npb24oXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8uY2FsbGVlKSxcblx0XHRcdFx0Xy5hcmd1bWVudHMubWFwKGZyb21FeHByZXNzaW9uKSkpXG5cdFx0Y2FzZSAnU3ByZWFkRWxlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBTcHJlYWRFbGVtZW50KGZyb21FeHByZXNzaW9uKF8uYXJndW1lbnQpKSlcblx0XHRjYXNlICdNZW1iZXJFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IE1lbWJlckV4cHJlc3Npb24oXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8ub2JqZWN0KSxcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5wcm9wZXJ0eSkpKVxuXHRcdGNhc2UgJ1lpZWxkRXhwcmVzc2lvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBZaWVsZEV4cHJlc3Npb24oZnJvbUV4cHJlc3Npb24oXy5hcmd1bWVudCksIF8uZGVsZWdhdGUpKVxuXHRcdGNhc2UgJ1RlbXBsYXRlRWxlbWVudCc6XG5cdFx0XHRyZXR1cm4gZnJvbVRlbXBsYXRlRWxlbWVudChfKVxuXHRcdGNhc2UgJ1RlbXBsYXRlTGl0ZXJhbCc6XG5cdFx0XHRyZXR1cm4gZnJvbVRlbXBsYXRlTGl0ZXJhbChfKVxuXHRcdGNhc2UgJ1RhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24oXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8udGFnKSxcblx0XHRcdFx0ZnJvbVRlbXBsYXRlTGl0ZXJhbChfLnF1YXNpKSkpXG5cdFx0Y2FzZSAnQXNzaWdubWVudFByb3BlcnR5Jzpcblx0XHRcdHJldHVybiBmcm9tQXNzaWdubWVudFByb3BlcnR5KF8pXG5cdFx0Y2FzZSAnT2JqZWN0UGF0dGVybic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBPYmplY3RQYXR0ZXJuKF8ucHJvcGVydGllcy5tYXAoZnJvbUFzc2lnbm1lbnRQcm9wZXJ0eSkpKVxuXHRcdGNhc2UgJ0FycmF5UGF0dGVybic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBBcnJheVBhdHRlcm4oXy5lbGVtZW50cy5tYXAoZSA9PiBvcChmcm9tUGF0dGVybiwgZSkpKSlcblx0XHRjYXNlICdSZXN0RWxlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBSZXN0RWxlbWVudChmcm9tRXhwcmVzc2lvbihfLmFyZ3VtZW50KSkpXG5cdFx0Y2FzZSAnTWV0aG9kRGVmaW5pdGlvbic6XG5cdFx0XHRyZXR1cm4gZnJvbU1ldGhvZERlZmluaXRpb24oXylcblx0XHRjYXNlICdDbGFzc0JvZHknOlxuXHRcdFx0cmV0dXJuIGZyb21DbGFzc0JvZHkoXylcblx0XHRjYXNlICdDbGFzc0RlY2xhcmF0aW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IENsYXNzRGVjbGFyYXRpb24oXG5cdFx0XHRcdGZyb21JZGVudGlmaWVyKF8uaWQpLFxuXHRcdFx0XHRvcChmcm9tRXhwcmVzc2lvbiwgXy5zdXBlckNsYXNzKSxcblx0XHRcdFx0ZnJvbUNsYXNzQm9keShfLmJvZHkpKSlcblx0XHRjYXNlICdDbGFzc0V4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgQ2xhc3NFeHByZXNzaW9uKFxuXHRcdFx0XHRvcChmcm9tSWRlbnRpZmllciwgXy5pZCksXG5cdFx0XHRcdG9wKGZyb21FeHByZXNzaW9uLCBfLnN1cGVyQ2xhc3MpLFxuXHRcdFx0XHRmcm9tQ2xhc3NCb2R5KF8uYm9keSkpKVxuXHRcdGNhc2UgJ0ltcG9ydERlY2xhcmF0aW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEltcG9ydERlY2xhcmF0aW9uKFxuXHRcdFx0XHRfLnNwZWNpZmllcnMubWFwKGZyb21JbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCksXG5cdFx0XHRcdGZyb21MaXRlcmFsU3RyaW5nKF8uc291cmNlKSkpXG5cdFx0Y2FzZSAnSW1wb3J0U3BlY2lmaWVyJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEltcG9ydFNwZWNpZmllcihmcm9tSWRlbnRpZmllcihfLmltcG9ydGVkKSwgZnJvbUlkZW50aWZpZXIoXy5sb2NhbCkpKVxuXHRcdGNhc2UgJ0ltcG9ydERlZmF1bHRTcGVjaWZpZXInOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgSW1wb3J0RGVmYXVsdFNwZWNpZmllcihmcm9tSWRlbnRpZmllcihfLmxvY2FsKSkpXG5cdFx0Y2FzZSAnSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEltcG9ydE5hbWVzcGFjZVNwZWNpZmllcihmcm9tSWRlbnRpZmllcihfLmxvY2FsKSkpXG5cdFx0Y2FzZSAnRXhwb3J0U3BlY2lpZmVyJzpcblx0XHRcdHJldHVybiBmcm9tRXhwb3J0U3BlY2lmaWVyKF8pXG5cdFx0Y2FzZSAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBFeHBvcnROYW1lZERlY2xhcmF0aW9uKFxuXHRcdFx0XHRvcChmcm9tRGVjbGFyYXRpb24sIF8uZGVjbGFyYXRpb24pLFxuXHRcdFx0XHRfLnNwZWNpZmllcnMubWFwKGZyb21FeHBvcnRTcGVjaWZpZXIpLFxuXHRcdFx0XHRvcChmcm9tTGl0ZXJhbFN0cmluZywgXy5zb3VyY2UpKSlcblx0XHRjYXNlICdFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uKGZyb21FeHByZXNzaW9uT3JEZWNsYXJhdGlvbihfLmRlY2xhcmF0aW9uKSkpXG5cdFx0Y2FzZSAnRXhwb3J0QWxsRGVjbGFyYXRpb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgRXhwb3J0QWxsRGVjbGFyYXRpb24oZnJvbUxpdGVyYWxTdHJpbmcoXy5zb3VyY2UpKSlcblx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYEJhZCB0eXBlOiAke18udHlwZX1gKVxuXHR9XG59XG5cbmZ1bmN0aW9uIG9wKGZ1bmMsIG9wdGlvbmFsKSB7XG5cdHJldHVybiBvcHRpb25hbCA9PT0gbnVsbCB8fCBvcHRpb25hbCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGZ1bmMob3B0aW9uYWwpXG59XG5cbmZ1bmN0aW9uIGxvYyhvYmplY3QsIGFzdCkge1xuXHRjb25zdCBsb2MgPSBvYmplY3QubG9jXG5cdGlmIChsb2MgIT09IHVuZGVmaW5lZClcblx0XHRhc3QubG9jID0gbmV3IExvYyhcblx0XHRcdG5ldyBQb3MobG9jLnN0YXJ0LmxpbmUsIGxvYy5zdGFydC5jb2x1bW4pLFxuXHRcdFx0bmV3IFBvcyhsb2MuZW5kLmxpbmUsIGxvYy5lbmQuY29sdW1uKSlcblx0cmV0dXJuIGFzdFxufVxuXG5mdW5jdGlvbiBmcm9tSWRlbnRpZmllcihfKSB7XG5cdHJldHVybiBsb2MoXywgbmV3IElkZW50aWZpZXIoXy5uYW1lKSlcbn1cblxuZnVuY3Rpb24gZnJvbVZhcmlhYmxlRGVjbGFyYXRvcihfKSB7XG5cdHJldHVybiBsb2MoXywgbmV3IFZhcmlhYmxlRGVjbGFyYXRvcihmcm9tUGF0dGVybihfLmlkKSwgb3AoZnJvbUV4cHJlc3Npb24sIF8uaW5pdCkpKVxufVxuXG5mdW5jdGlvbiBmcm9tU3dpdGNoQ2FzZShfKSB7XG5cdHJldHVybiBsb2MoXywgbmV3IFN3aXRjaENhc2Uob3AoZnJvbUV4cHJlc3Npb24sIF8udGVzdCksIF8uY29uc2VxdWVudC5tYXAoZnJvbVN0YXRlbWVudCkpKVxufVxuXG5mdW5jdGlvbiBmcm9tQmxvY2tTdGF0ZW1lbnQoXykge1xuXHRyZXR1cm4gbG9jKF8sIG5ldyBCbG9ja1N0YXRlbWVudChfLmJvZHkubWFwKGZyb21TdGF0ZW1lbnQpKSlcbn1cblxuZnVuY3Rpb24gZnJvbUNhdGNoQ2xhdXNlKF8pIHtcblx0cmV0dXJuIGxvYyhfLCBuZXcgQ2F0Y2hDbGF1c2UoZnJvbVBhdHRlcm4oXy5wYXJhbSksIGZyb21CbG9ja1N0YXRlbWVudChfLmJvZHkpKSlcbn1cblxuZnVuY3Rpb24gZnJvbVRlbXBsYXRlRWxlbWVudChfKSB7XG5cdHJldHVybiBsb2MoXywgbmV3IFRlbXBsYXRlRWxlbWVudChfLnRhaWwsIF8udmFsdWUpKVxufVxuXG5mdW5jdGlvbiBmcm9tVGVtcGxhdGVMaXRlcmFsKF8pIHtcblx0cmV0dXJuIGxvYyhfLCBuZXcgVGVtcGxhdGVMaXRlcmFsKFxuXHRcdF8ucXVhc2lzLm1hcChmcm9tVGVtcGxhdGVFbGVtZW50KSxcblx0XHRfLmV4cHJlc3Npb25zLm1hcChmcm9tRXhwcmVzc2lvbikpKVxufVxuXG5mdW5jdGlvbiBmcm9tQXNzaWdubWVudFByb3BlcnR5KF8pIHtcblx0aWYgKCEoXy5raW5kID09PSAnaW5pdCcgJiYgIV8ubWV0aG9kKSlcblx0XHR0aHJvdyBuZXcgRXJyb3IoYEFzc2lnbm1lbnRQcm9wZXJ0eSBoYXMgdW51c3VhbCB2YWx1ZTogJHtKU09OLnN0cmluZ2lmeShfKX1gKVxuXHRyZXR1cm4gbG9jKF8sIG5ldyBBc3NpZ25tZW50UHJvcGVydHkoZnJvbUlkZW50aWZpZXIoXy5rZXkpLCBmcm9tUGF0dGVybihfLnZhbHVlKSkpXG59XG5cbmZ1bmN0aW9uIGZyb21Qcm9wZXJ0eShfKSB7XG5cdHJldHVybiBsb2MoXywgbmV3IFByb3BlcnR5KFxuXHRcdF8ua2luZCxcblx0XHRmcm9tSWRlbnRpZmllck9yTGl0ZXJhbChfLmtleSksXG5cdFx0ZnJvbUV4cHJlc3Npb24oXy52YWx1ZSksXG5cdFx0Xy5jb21wdXRlZCxcblx0XHRfLm1ldGhvZCkpXG59XG5cbmZ1bmN0aW9uIGZyb21NZXRob2REZWZpbml0aW9uKF8pIHtcblx0cmV0dXJuIGxvYyhfLCBuZXcgTWV0aG9kRGVmaW5pdGlvbihcblx0XHRmcm9tSWRlbnRpZmllck9yTGl0ZXJhbChfLmtleSksXG5cdFx0ZnJvbUZ1bmN0aW9uRXhwcmVzc2lvbihfLnZhbHVlKSxcblx0XHRfLmtpbmQsXG5cdFx0Xy5zdGF0aWMsXG5cdFx0Xy5jb21wdXRlZCkpXG59XG5cbmZ1bmN0aW9uIGZyb21DbGFzc0JvZHkoXykge1xuXHRyZXR1cm4gbG9jKF8sIG5ldyBDbGFzc0JvZHkoXy5ib2R5Lm1hcChmcm9tTWV0aG9kRGVmaW5pdGlvbikpKVxufVxuXG5mdW5jdGlvbiBmcm9tRnVuY3Rpb25FeHByZXNzaW9uKF8pIHtcblx0cmV0dXJuIGxvYyhfLCBuZXcgRnVuY3Rpb25FeHByZXNzaW9uKFxuXHRcdG9wKGZyb21JZGVudGlmaWVyLCBfLmlkKSxcblx0XHRfLnBhcmFtcy5tYXAoZnJvbVBhdHRlcm4pLFxuXHRcdGZyb21CbG9ja1N0YXRlbWVudChfLmJvZHkpLFxuXHRcdF8uZ2VuZXJhdG9yKSlcbn1cblxuZnVuY3Rpb24gZnJvbUV4cG9ydFNwZWNpZmllcihfKSB7XG5cdHJldHVybiBsb2MoXywgbmV3IEV4cG9ydFNwZWNpZmllcihmcm9tSWRlbnRpZmllcihfLmV4cG9ydGVkKSwgZnJvbUlkZW50aWZpZXIoXy5sb2NhbCkpKVxufVxuXG5jb25zdFxuXHRmcm9tQmxvY2tTdGF0ZW1lbnRPckV4cHJlc3Npb24gPSBmcm9tT2JqZWN0LFxuXHRmcm9tRGVjbGFyYXRpb24gPSBmcm9tT2JqZWN0LFxuXHRmcm9tRXhwcmVzc2lvbiA9IGZyb21PYmplY3QsXG5cdGZyb21FeHByZXNzaW9uT3JEZWNsYXJhdGlvbiA9IGZyb21PYmplY3QsXG5cdGZyb21FeHByZXNzaW9uT3JWYXJpYWJsZURlY2xhcmF0aW9uID0gZnJvbU9iamVjdCxcblx0ZnJvbUlkZW50aWZpZXJPckxpdGVyYWwgPSBmcm9tT2JqZWN0LFxuXHRmcm9tSW1wb3J0U3BlY2lmaWVyQWJzdHJhY3QgPSBmcm9tT2JqZWN0LFxuXHRmcm9tTGl0ZXJhbFN0cmluZyA9IGZyb21PYmplY3QsXG5cdGZyb21QYXR0ZXJuID0gZnJvbU9iamVjdCxcblx0ZnJvbVN0YXRlbWVudCA9IGZyb21PYmplY3RcbiJdfQ==