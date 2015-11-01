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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
				return loc(_, new _ast.Literal(_.value));

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
		return optional == null ? null : func(optional);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mcm9tSnNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBaUJ3QixVQUFVOzs7Ozs7VUFBVixVQUFVIiwiZmlsZSI6ImZyb21Kc29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0QXNzaWdubWVudFByb3BlcnR5LCBBcnJheUV4cHJlc3Npb24sIEFycmF5UGF0dGVybiwgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24sXG5cdEFzc2lnbm1lbnRFeHByZXNzaW9uLCBCaW5hcnlFeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgQnJlYWtTdGF0ZW1lbnQsIENhbGxFeHByZXNzaW9uLFxuXHRDYXRjaENsYXVzZSwgQ2xhc3NCb2R5LCBDbGFzc0RlY2xhcmF0aW9uLCBDbGFzc0V4cHJlc3Npb24sIENvbmRpdGlvbmFsRXhwcmVzc2lvbixcblx0Q29udGludWVTdGF0ZW1lbnQsIERlYnVnZ2VyU3RhdGVtZW50LCBEb1doaWxlU3RhdGVtZW50LCBFbXB0eVN0YXRlbWVudCwgRXhwcmVzc2lvblN0YXRlbWVudCxcblx0RXhwb3J0U3BlY2lmaWVyLCBFeHBvcnROYW1lZERlY2xhcmF0aW9uLCBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24sIEV4cG9ydEFsbERlY2xhcmF0aW9uLFxuXHRGb3JTdGF0ZW1lbnQsIEZvckluU3RhdGVtZW50LCBGb3JPZlN0YXRlbWVudCwgRnVuY3Rpb25EZWNsYXJhdGlvbiwgRnVuY3Rpb25FeHByZXNzaW9uLFxuXHRJZGVudGlmaWVyLCBJZlN0YXRlbWVudCwgSW1wb3J0RGVjbGFyYXRpb24sIEltcG9ydFNwZWNpZmllciwgSW1wb3J0RGVmYXVsdFNwZWNpZmllcixcblx0SW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyLCBMYWJlbGVkU3RhdGVtZW50LCBMaXRlcmFsLCBMb2dpY2FsRXhwcmVzc2lvbiwgTWVtYmVyRXhwcmVzc2lvbixcblx0TWV0aG9kRGVmaW5pdGlvbiwgTmV3RXhwcmVzc2lvbiwgT2JqZWN0RXhwcmVzc2lvbiwgT2JqZWN0UGF0dGVybiwgUHJvZ3JhbSwgUHJvcGVydHksXG5cdFJlc3RFbGVtZW50LCBSZXR1cm5TdGF0ZW1lbnQsIFNlcXVlbmNlRXhwcmVzc2lvbiwgU3ByZWFkRWxlbWVudCwgU3dpdGNoQ2FzZSwgU3dpdGNoU3RhdGVtZW50LFxuXHRUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24sIFRlbXBsYXRlRWxlbWVudCwgVGVtcGxhdGVMaXRlcmFsLCBUaGlzRXhwcmVzc2lvbiwgVGhyb3dTdGF0ZW1lbnQsXG5cdFRyeVN0YXRlbWVudCwgVXBkYXRlRXhwcmVzc2lvbiwgVW5hcnlFeHByZXNzaW9uLCBWYXJpYWJsZURlY2xhcmF0b3IsIFZhcmlhYmxlRGVjbGFyYXRpb24sXG5cdFdoaWxlU3RhdGVtZW50LCBZaWVsZEV4cHJlc3Npb259IGZyb20gJy4vYXN0J1xuaW1wb3J0IExvYywge1Bvc30gZnJvbSAnLi9Mb2MnXG5cbi8qKiBDb252ZXJ0cyBhIHBsYWluIG9iamVjdCB0byBhIHtAbGluayBOb2RlfS4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZyb21PYmplY3QoXykge1xuXHRzd2l0Y2ggKF8udHlwZSkge1xuXHRcdGNhc2UgJ1Byb2dyYW0nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgUHJvZ3JhbShfLmJvZHkubWFwKGZyb21TdGF0ZW1lbnQpKSlcblx0XHRjYXNlICdJZGVudGlmaWVyJzpcblx0XHRcdHJldHVybiBmcm9tSWRlbnRpZmllcihfKVxuXHRcdGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6XG5cdFx0XHRyZXR1cm4gZnJvbVZhcmlhYmxlRGVjbGFyYXRvcihfKVxuXHRcdGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLFxuXHRcdFx0XHRuZXcgVmFyaWFibGVEZWNsYXJhdGlvbihfLmtpbmQsIF8uZGVjbGFyYXRpb25zLm1hcChmcm9tVmFyaWFibGVEZWNsYXJhdG9yKSkpXG5cdFx0Y2FzZSAnRW1wdHlTdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgRW1wdHlTdGF0ZW1lbnQoKSlcblx0XHRjYXNlICdCbG9ja1N0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIGZyb21CbG9ja1N0YXRlbWVudChfKSlcblx0XHRjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEV4cHJlc3Npb25TdGF0ZW1lbnQoZnJvbUV4cHJlc3Npb24oXy5leHByZXNzaW9uKSkpXG5cdFx0Y2FzZSAnSWZTdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgSWZTdGF0ZW1lbnQoXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8udGVzdCksXG5cdFx0XHRcdGZyb21TdGF0ZW1lbnQoXy5jb25zZXF1ZW50KSxcblx0XHRcdFx0b3AoZnJvbVN0YXRlbWVudCwgXy5hbHRlcm5hdGUpKSlcblx0XHRjYXNlICdMYWJlbGVkU3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IExhYmVsZWRTdGF0ZW1lbnQoZnJvbUlkZW50aWZpZXIoXy5sYWJlbCksIGZyb21TdGF0ZW1lbnQoXy5ib2R5KSkpXG5cdFx0Y2FzZSAnQnJlYWtTdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgQnJlYWtTdGF0ZW1lbnQob3AoZnJvbUlkZW50aWZpZXIsIF8ubGFiZWwpKSlcblx0XHRjYXNlICdDb250aW51ZVN0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBDb250aW51ZVN0YXRlbWVudChvcChmcm9tSWRlbnRpZmllciwgXy5sYWJlbCkpKVxuXHRcdGNhc2UgJ1N3aXRjaENhc2UnOlxuXHRcdFx0cmV0dXJuIGZyb21Td2l0Y2hDYXNlKF8pXG5cdFx0Y2FzZSAnU3dpdGNoU3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IFN3aXRjaFN0YXRlbWVudChcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5kaXNjcmltaW5hbnQpLFxuXHRcdFx0XHRfLmNhc2VzLm1hcChmcm9tU3dpdGNoQ2FzZSkpKVxuXHRcdGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBSZXR1cm5TdGF0ZW1lbnQob3AoZnJvbUV4cHJlc3Npb24sIF8uYXJndW1lbnQpKSlcblx0XHRjYXNlICdUaHJvd1N0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBUaHJvd1N0YXRlbWVudChmcm9tRXhwcmVzc2lvbihfLmFyZ3VtZW50KSkpXG5cdFx0Y2FzZSAnQ2F0Y2hDbGF1c2UnOlxuXHRcdFx0cmV0dXJuIGZyb21DYXRjaENsYXVzZShfKVxuXHRcdGNhc2UgJ1RyeVN0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBUcnlTdGF0ZW1lbnQoXG5cdFx0XHRcdGZyb21CbG9ja1N0YXRlbWVudChfLmJsb2NrKSxcblx0XHRcdFx0b3AoZnJvbUNhdGNoQ2xhdXNlLCBfLmhhbmRsZXIpLFxuXHRcdFx0XHRvcChmcm9tQmxvY2tTdGF0ZW1lbnQsIF8uZmluYWxpemVyKSkpXG5cdFx0Y2FzZSAnV2hpbGVTdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgV2hpbGVTdGF0ZW1lbnQoZnJvbUV4cHJlc3Npb24oXy50ZXN0KSwgZnJvbVN0YXRlbWVudChfLmJvZHkpKSlcblx0XHRjYXNlICdEb1doaWxlU3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IERvV2hpbGVTdGF0ZW1lbnQoZnJvbVN0YXRlbWVudChfLmJvZHkpLCBmcm9tRXhwcmVzc2lvbihfLnRlc3QpKSlcblx0XHRjYXNlICdGb3JTdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgRm9yU3RhdGVtZW50KFxuXHRcdFx0XHRvcChmcm9tRXhwcmVzc2lvbk9yVmFyaWFibGVEZWNsYXJhdGlvbiwgXy5pbml0KSxcblx0XHRcdFx0b3AoZnJvbUV4cHJlc3Npb24sIF8udGVzdCksXG5cdFx0XHRcdG9wKGZyb21TdGF0ZW1lbnQsIF8udXBkYXRlKSxcblx0XHRcdFx0ZnJvbVN0YXRlbWVudChfLmJvZHkpKSlcblx0XHRjYXNlICdGb3JJblN0YXRlbWVudCc6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBGb3JJblN0YXRlbWVudChcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb25PclZhcmlhYmxlRGVjbGFyYXRpb24oXy5sZWZ0KSxcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5yaWdodCksXG5cdFx0XHRcdGZyb21TdGF0ZW1lbnQoXy5ib2R5KSkpXG5cdFx0Y2FzZSAnRm9yT2ZTdGF0ZW1lbnQnOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgRm9yT2ZTdGF0ZW1lbnQoXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uT3JWYXJpYWJsZURlY2xhcmF0aW9uKF8ubGVmdCksXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8ucmlnaHQpLFxuXHRcdFx0XHRmcm9tU3RhdGVtZW50KF8uYm9keSkpKVxuXHRcdGNhc2UgJ0RlYnVnZ2VyU3RhdGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IERlYnVnZ2VyU3RhdGVtZW50KCkpXG5cdFx0Y2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBGdW5jdGlvbkRlY2xhcmF0aW9uKFxuXHRcdFx0XHRmcm9tSWRlbnRpZmllcihfLmlkKSxcblx0XHRcdFx0Xy5wYXJhbXMubWFwKGZyb21JZGVudGlmaWVyKSxcblx0XHRcdFx0ZnJvbUJsb2NrU3RhdGVtZW50KF8uYm9keSksXG5cdFx0XHRcdF8uZ2VuZXJhdG9yKSlcblx0XHRjYXNlICdMaXRlcmFsJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IExpdGVyYWwoXy52YWx1ZSkpXG5cdFx0Y2FzZSAnVGhpc0V4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgVGhpc0V4cHJlc3Npb24oKSlcblx0XHRjYXNlICdBcnJheUV4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgQXJyYXlFeHByZXNzaW9uKF8uZWxlbWVudHMubWFwKF8gPT4gb3AoZnJvbUV4cHJlc3Npb24sIF8pKSkpXG5cdFx0Y2FzZSAnUHJvcGVydHknOlxuXHRcdFx0cmV0dXJuIGZyb21Qcm9wZXJ0eShfKVxuXHRcdGNhc2UgJ09iamVjdEV4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgT2JqZWN0RXhwcmVzc2lvbihfLnByb3BlcnRpZXMubWFwKGZyb21Qcm9wZXJ0eSkpKVxuXHRcdGNhc2UgJ0Z1bmN0aW9uRXhwcmVzc2lvbic6XG5cdFx0XHRyZXR1cm4gZnJvbUZ1bmN0aW9uRXhwcmVzc2lvbihfKVxuXHRcdGNhc2UgJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEFycm93RnVuY3Rpb25FeHByZXNzaW9uKFxuXHRcdFx0XHRfLnBhcmFtcy5tYXAoZnJvbVBhdHRlcm4pLFxuXHRcdFx0XHRmcm9tQmxvY2tTdGF0ZW1lbnRPckV4cHJlc3Npb24oXy5ib2R5KSkpXG5cdFx0Y2FzZSAnU2VxdWVuY2VFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IFNlcXVlbmNlRXhwcmVzc2lvbihfLmV4cHJlc3Npb25zLm1hcChmcm9tRXhwcmVzc2lvbikpKVxuXHRcdGNhc2UgJ1VuYXJ5RXhwcmVzc2lvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBVbmFyeUV4cHJlc3Npb24oXy5vcGVyYXRvciwgZnJvbUV4cHJlc3Npb24oXy5hcmd1bWVudCkpKVxuXHRcdGNhc2UgJ0JpbmFyeUV4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgQmluYXJ5RXhwcmVzc2lvbihcblx0XHRcdFx0Xy5vcGVyYXRvcixcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5sZWZ0KSxcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5yaWdodCkpKVxuXHRcdGNhc2UgJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEFzc2lnbm1lbnRFeHByZXNzaW9uKFxuXHRcdFx0XHRfLm9wZXJhdG9yLFxuXHRcdFx0XHRmcm9tUGF0dGVybihfLmxlZnQpLFxuXHRcdFx0XHRmcm9tRXhwcmVzc2lvbihfLnJpZ2h0KSkpXG5cdFx0Y2FzZSAnVXBkYXRlRXhwcmVzc2lvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBVcGRhdGVFeHByZXNzaW9uKF8ub3BlcmF0b3IsIGZyb21FeHByZXNzaW9uKF8uYXJndW1lbnQpLCBfLnByZWZpeCkpXG5cdFx0Y2FzZSAnTG9naWNhbEV4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgTG9naWNhbEV4cHJlc3Npb24oXG5cdFx0XHRcdF8ub3BlcmF0b3IsXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8ubGVmdCksXG5cdFx0XHRcdGZyb21FeHByZXNzaW9uKF8ucmlnaHQpKSlcblx0XHRjYXNlICdDb25kaXRpb25hbEV4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgQ29uZGl0aW9uYWxFeHByZXNzaW9uKFxuXHRcdFx0XHRmcm9tRXhwcmVzc2lvbihfLnRlc3QpLFxuXHRcdFx0XHRmcm9tRXhwcmVzc2lvbihfLmNvbnNlcXVlbnQpLFxuXHRcdFx0XHRmcm9tRXhwcmVzc2lvbihfLmFsdGVybmF0ZSkpKVxuXHRcdGNhc2UgJ05ld0V4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgTmV3RXhwcmVzc2lvbihcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5jYWxsZWUpLFxuXHRcdFx0XHRfLmFyZ3VtZW50cy5tYXAoZnJvbUV4cHJlc3Npb24pKSlcblx0XHRjYXNlICdDYWxsRXhwcmVzc2lvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBDYWxsRXhwcmVzc2lvbihcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5jYWxsZWUpLFxuXHRcdFx0XHRfLmFyZ3VtZW50cy5tYXAoZnJvbUV4cHJlc3Npb24pKSlcblx0XHRjYXNlICdTcHJlYWRFbGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IFNwcmVhZEVsZW1lbnQoZnJvbUV4cHJlc3Npb24oXy5hcmd1bWVudCkpKVxuXHRcdGNhc2UgJ01lbWJlckV4cHJlc3Npb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgTWVtYmVyRXhwcmVzc2lvbihcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy5vYmplY3QpLFxuXHRcdFx0XHRmcm9tRXhwcmVzc2lvbihfLnByb3BlcnR5KSkpXG5cdFx0Y2FzZSAnWWllbGRFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IFlpZWxkRXhwcmVzc2lvbihmcm9tRXhwcmVzc2lvbihfLmFyZ3VtZW50KSwgXy5kZWxlZ2F0ZSkpXG5cdFx0Y2FzZSAnVGVtcGxhdGVFbGVtZW50Jzpcblx0XHRcdHJldHVybiBmcm9tVGVtcGxhdGVFbGVtZW50KF8pXG5cdFx0Y2FzZSAnVGVtcGxhdGVMaXRlcmFsJzpcblx0XHRcdHJldHVybiBmcm9tVGVtcGxhdGVMaXRlcmFsKF8pXG5cdFx0Y2FzZSAnVGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbihcblx0XHRcdFx0ZnJvbUV4cHJlc3Npb24oXy50YWcpLFxuXHRcdFx0XHRmcm9tVGVtcGxhdGVMaXRlcmFsKF8ucXVhc2kpKSlcblx0XHRjYXNlICdBc3NpZ25tZW50UHJvcGVydHknOlxuXHRcdFx0cmV0dXJuIGZyb21Bc3NpZ25tZW50UHJvcGVydHkoXylcblx0XHRjYXNlICdPYmplY3RQYXR0ZXJuJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IE9iamVjdFBhdHRlcm4oXy5wcm9wZXJ0aWVzLm1hcChmcm9tQXNzaWdubWVudFByb3BlcnR5KSkpXG5cdFx0Y2FzZSAnQXJyYXlQYXR0ZXJuJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEFycmF5UGF0dGVybihfLmVsZW1lbnRzLm1hcChlID0+IG9wKGZyb21QYXR0ZXJuLCBlKSkpKVxuXHRcdGNhc2UgJ1Jlc3RFbGVtZW50Jzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IFJlc3RFbGVtZW50KGZyb21FeHByZXNzaW9uKF8uYXJndW1lbnQpKSlcblx0XHRjYXNlICdNZXRob2REZWZpbml0aW9uJzpcblx0XHRcdHJldHVybiBmcm9tTWV0aG9kRGVmaW5pdGlvbihfKVxuXHRcdGNhc2UgJ0NsYXNzQm9keSc6XG5cdFx0XHRyZXR1cm4gZnJvbUNsYXNzQm9keShfKVxuXHRcdGNhc2UgJ0NsYXNzRGVjbGFyYXRpb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgQ2xhc3NEZWNsYXJhdGlvbihcblx0XHRcdFx0ZnJvbUlkZW50aWZpZXIoXy5pZCksXG5cdFx0XHRcdG9wKGZyb21FeHByZXNzaW9uLCBfLnN1cGVyQ2xhc3MpLFxuXHRcdFx0XHRmcm9tQ2xhc3NCb2R5KF8uYm9keSkpKVxuXHRcdGNhc2UgJ0NsYXNzRXhwcmVzc2lvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBDbGFzc0V4cHJlc3Npb24oXG5cdFx0XHRcdG9wKGZyb21JZGVudGlmaWVyLCBfLmlkKSxcblx0XHRcdFx0b3AoZnJvbUV4cHJlc3Npb24sIF8uc3VwZXJDbGFzcyksXG5cdFx0XHRcdGZyb21DbGFzc0JvZHkoXy5ib2R5KSkpXG5cdFx0Y2FzZSAnSW1wb3J0RGVjbGFyYXRpb24nOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgSW1wb3J0RGVjbGFyYXRpb24oXG5cdFx0XHRcdF8uc3BlY2lmaWVycy5tYXAoZnJvbUltcG9ydFNwZWNpZmllckFic3RyYWN0KSxcblx0XHRcdFx0ZnJvbUxpdGVyYWxTdHJpbmcoXy5zb3VyY2UpKSlcblx0XHRjYXNlICdJbXBvcnRTcGVjaWZpZXInOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgSW1wb3J0U3BlY2lmaWVyKGZyb21JZGVudGlmaWVyKF8uaW1wb3J0ZWQpLCBmcm9tSWRlbnRpZmllcihfLmxvY2FsKSkpXG5cdFx0Y2FzZSAnSW1wb3J0RGVmYXVsdFNwZWNpZmllcic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBJbXBvcnREZWZhdWx0U3BlY2lmaWVyKGZyb21JZGVudGlmaWVyKF8ubG9jYWwpKSlcblx0XHRjYXNlICdJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXInOlxuXHRcdFx0cmV0dXJuIGxvYyhfLCBuZXcgSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyKGZyb21JZGVudGlmaWVyKF8ubG9jYWwpKSlcblx0XHRjYXNlICdFeHBvcnRTcGVjaWlmZXInOlxuXHRcdFx0cmV0dXJuIGZyb21FeHBvcnRTcGVjaWZpZXIoXylcblx0XHRjYXNlICdFeHBvcnROYW1lZERlY2xhcmF0aW9uJzpcblx0XHRcdHJldHVybiBsb2MoXywgbmV3IEV4cG9ydE5hbWVkRGVjbGFyYXRpb24oXG5cdFx0XHRcdG9wKGZyb21EZWNsYXJhdGlvbiwgXy5kZWNsYXJhdGlvbiksXG5cdFx0XHRcdF8uc3BlY2lmaWVycy5tYXAoZnJvbUV4cG9ydFNwZWNpZmllciksXG5cdFx0XHRcdG9wKGZyb21MaXRlcmFsU3RyaW5nLCBfLnNvdXJjZSkpKVxuXHRcdGNhc2UgJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24oZnJvbUV4cHJlc3Npb25PckRlY2xhcmF0aW9uKF8uZGVjbGFyYXRpb24pKSlcblx0XHRjYXNlICdFeHBvcnRBbGxEZWNsYXJhdGlvbic6XG5cdFx0XHRyZXR1cm4gbG9jKF8sIG5ldyBFeHBvcnRBbGxEZWNsYXJhdGlvbihmcm9tTGl0ZXJhbFN0cmluZyhfLnNvdXJjZSkpKVxuXHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihgQmFkIHR5cGU6ICR7Xy50eXBlfWApXG5cdH1cbn1cblxuZnVuY3Rpb24gb3AoZnVuYywgb3B0aW9uYWwpIHtcblx0cmV0dXJuIG9wdGlvbmFsID09IG51bGwgPyBudWxsIDogZnVuYyhvcHRpb25hbClcbn1cblxuZnVuY3Rpb24gbG9jKG9iamVjdCwgYXN0KSB7XG5cdGNvbnN0IGxvYyA9IG9iamVjdC5sb2Ncblx0aWYgKGxvYyAhPT0gdW5kZWZpbmVkKVxuXHRcdGFzdC5sb2MgPSBuZXcgTG9jKFxuXHRcdFx0bmV3IFBvcyhsb2Muc3RhcnQubGluZSwgbG9jLnN0YXJ0LmNvbHVtbiksXG5cdFx0XHRuZXcgUG9zKGxvYy5lbmQubGluZSwgbG9jLmVuZC5jb2x1bW4pKVxuXHRyZXR1cm4gYXN0XG59XG5cbmZ1bmN0aW9uIGZyb21JZGVudGlmaWVyKF8pIHtcblx0cmV0dXJuIGxvYyhfLCBuZXcgSWRlbnRpZmllcihfLm5hbWUpKVxufVxuXG5mdW5jdGlvbiBmcm9tVmFyaWFibGVEZWNsYXJhdG9yKF8pIHtcblx0cmV0dXJuIGxvYyhfLCBuZXcgVmFyaWFibGVEZWNsYXJhdG9yKGZyb21QYXR0ZXJuKF8uaWQpLCBvcChmcm9tRXhwcmVzc2lvbiwgXy5pbml0KSkpXG59XG5cbmZ1bmN0aW9uIGZyb21Td2l0Y2hDYXNlKF8pIHtcblx0cmV0dXJuIGxvYyhfLCBuZXcgU3dpdGNoQ2FzZShvcChmcm9tRXhwcmVzc2lvbiwgXy50ZXN0KSwgXy5jb25zZXF1ZW50Lm1hcChmcm9tU3RhdGVtZW50KSkpXG59XG5cbmZ1bmN0aW9uIGZyb21CbG9ja1N0YXRlbWVudChfKSB7XG5cdHJldHVybiBsb2MoXywgbmV3IEJsb2NrU3RhdGVtZW50KF8uYm9keS5tYXAoZnJvbVN0YXRlbWVudCkpKVxufVxuXG5mdW5jdGlvbiBmcm9tQ2F0Y2hDbGF1c2UoXykge1xuXHRyZXR1cm4gbG9jKF8sIG5ldyBDYXRjaENsYXVzZShmcm9tUGF0dGVybihfLnBhcmFtKSwgZnJvbUJsb2NrU3RhdGVtZW50KF8uYm9keSkpKVxufVxuXG5mdW5jdGlvbiBmcm9tVGVtcGxhdGVFbGVtZW50KF8pIHtcblx0cmV0dXJuIGxvYyhfLCBuZXcgVGVtcGxhdGVFbGVtZW50KF8udGFpbCwgXy52YWx1ZSkpXG59XG5cbmZ1bmN0aW9uIGZyb21UZW1wbGF0ZUxpdGVyYWwoXykge1xuXHRyZXR1cm4gbG9jKF8sIG5ldyBUZW1wbGF0ZUxpdGVyYWwoXG5cdFx0Xy5xdWFzaXMubWFwKGZyb21UZW1wbGF0ZUVsZW1lbnQpLFxuXHRcdF8uZXhwcmVzc2lvbnMubWFwKGZyb21FeHByZXNzaW9uKSkpXG59XG5cbmZ1bmN0aW9uIGZyb21Bc3NpZ25tZW50UHJvcGVydHkoXykge1xuXHRpZiAoIShfLmtpbmQgPT09ICdpbml0JyAmJiAhXy5tZXRob2QpKVxuXHRcdHRocm93IG5ldyBFcnJvcihgQXNzaWdubWVudFByb3BlcnR5IGhhcyB1bnVzdWFsIHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KF8pfWApXG5cdHJldHVybiBsb2MoXywgbmV3IEFzc2lnbm1lbnRQcm9wZXJ0eShmcm9tSWRlbnRpZmllcihfLmtleSksIGZyb21QYXR0ZXJuKF8udmFsdWUpKSlcbn1cblxuZnVuY3Rpb24gZnJvbVByb3BlcnR5KF8pIHtcblx0cmV0dXJuIGxvYyhfLCBuZXcgUHJvcGVydHkoXG5cdFx0Xy5raW5kLFxuXHRcdGZyb21JZGVudGlmaWVyT3JMaXRlcmFsKF8ua2V5KSxcblx0XHRmcm9tRXhwcmVzc2lvbihfLnZhbHVlKSxcblx0XHRfLmNvbXB1dGVkLFxuXHRcdF8ubWV0aG9kKSlcbn1cblxuZnVuY3Rpb24gZnJvbU1ldGhvZERlZmluaXRpb24oXykge1xuXHRyZXR1cm4gbG9jKF8sIG5ldyBNZXRob2REZWZpbml0aW9uKFxuXHRcdGZyb21JZGVudGlmaWVyT3JMaXRlcmFsKF8ua2V5KSxcblx0XHRmcm9tRnVuY3Rpb25FeHByZXNzaW9uKF8udmFsdWUpLFxuXHRcdF8ua2luZCxcblx0XHRfLnN0YXRpYyxcblx0XHRfLmNvbXB1dGVkKSlcbn1cblxuZnVuY3Rpb24gZnJvbUNsYXNzQm9keShfKSB7XG5cdHJldHVybiBsb2MoXywgbmV3IENsYXNzQm9keShfLmJvZHkubWFwKGZyb21NZXRob2REZWZpbml0aW9uKSkpXG59XG5cbmZ1bmN0aW9uIGZyb21GdW5jdGlvbkV4cHJlc3Npb24oXykge1xuXHRyZXR1cm4gbG9jKF8sIG5ldyBGdW5jdGlvbkV4cHJlc3Npb24oXG5cdFx0b3AoZnJvbUlkZW50aWZpZXIsIF8uaWQpLFxuXHRcdF8ucGFyYW1zLm1hcChmcm9tUGF0dGVybiksXG5cdFx0ZnJvbUJsb2NrU3RhdGVtZW50KF8uYm9keSksXG5cdFx0Xy5nZW5lcmF0b3IpKVxufVxuXG5mdW5jdGlvbiBmcm9tRXhwb3J0U3BlY2lmaWVyKF8pIHtcblx0cmV0dXJuIGxvYyhfLCBuZXcgRXhwb3J0U3BlY2lmaWVyKGZyb21JZGVudGlmaWVyKF8uZXhwb3J0ZWQpLCBmcm9tSWRlbnRpZmllcihfLmxvY2FsKSkpXG59XG5cbmNvbnN0XG5cdGZyb21CbG9ja1N0YXRlbWVudE9yRXhwcmVzc2lvbiA9IGZyb21PYmplY3QsXG5cdGZyb21EZWNsYXJhdGlvbiA9IGZyb21PYmplY3QsXG5cdGZyb21FeHByZXNzaW9uID0gZnJvbU9iamVjdCxcblx0ZnJvbUV4cHJlc3Npb25PckRlY2xhcmF0aW9uID0gZnJvbU9iamVjdCxcblx0ZnJvbUV4cHJlc3Npb25PclZhcmlhYmxlRGVjbGFyYXRpb24gPSBmcm9tT2JqZWN0LFxuXHRmcm9tSWRlbnRpZmllck9yTGl0ZXJhbCA9IGZyb21PYmplY3QsXG5cdGZyb21JbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCA9IGZyb21PYmplY3QsXG5cdGZyb21MaXRlcmFsU3RyaW5nID0gZnJvbU9iamVjdCxcblx0ZnJvbVBhdHRlcm4gPSBmcm9tT2JqZWN0LFxuXHRmcm9tU3RhdGVtZW50ID0gZnJvbU9iamVjdFxuIl19