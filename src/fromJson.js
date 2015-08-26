import {
	AssignmentProperty, ArrayExpression, ArrayPattern, ArrowFunctionExpression,
	AssignmentExpression, BinaryExpression, BlockStatement, BreakStatement, CallExpression,
	CatchClause, ClassBody, ClassDeclaration, ClassExpression, ConditionalExpression,
	ContinueStatement, DebuggerStatement, DoWhileStatement, EmptyStatement, ExpressionStatement,
	ExportSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, ExportAllDeclaration,
	ForStatement, ForInStatement, ForOfStatement, FunctionDeclaration, FunctionExpression,
	Identifier, IfStatement, ImportDeclaration, ImportSpecifier, ImportDefaultSpecifier,
	ImportNamespaceSpecifier, LabeledStatement, Literal, LogicalExpression, MemberExpression,
	MethodDefinition, NewExpression, ObjectExpression, ObjectPattern, Program, Property,
	RestElement, ReturnStatement, SequenceExpression, SpreadElement, SwitchCase, SwitchStatement,
	TaggedTemplateExpression, TemplateElement, TemplateLiteral, ThisExpression, ThrowStatement,
	TryStatement, UpdateExpression, UnaryExpression, VariableDeclarator, VariableDeclaration,
	WhileStatement, YieldExpression } from './ast'
import Loc, { Pos } from './Loc'

const fromObj = _ => {
	switch (_.type) {
		case 'Program':
			return l(_, new Program(_.body.map(fromStatement)))
		case 'Identifier':
			return fromIdentifier(_)
		case 'VariableDeclarator':
			return fromVariableDeclarator(_)
		case 'VariableDeclaration':
			return l(_, new VariableDeclaration(_.kind, _.declarations.map(fromVariableDeclarator)))
		case 'EmptyStatement':
			return l(_, new EmptyStatement())
		case 'BlockStatement':
			return l(_, fromBlockStatement(_))
		case 'ExpressionStatement':
			return l(_, new ExpressionStatement(fromExpression(_.expression)))
		case 'IfStatement':
			return l(_, new IfStatement(
				fromExpression(_.test),
				fromStatement(_.consequent),
				op(fromStatement, _.alternate)))
		case 'LabeledStatement':
			return l(_, new LabeledStatement(fromIdentifier(_.label), fromStatement(_.body)))
		case 'BreakStatement':
			return l(_, new BreakStatement(op(fromIdentifier, _.label)))
		case 'ContinueStatement':
			return l(_, new ContinueStatement(op(fromIdentifier, _.label)))
		case 'SwitchCase':
			return fromSwitchCase(_)
		case 'SwitchStatement':
			return l(_, new SwitchStatement(
				fromExpression(_.discriminant),
				_.cases.map(fromSwitchCase)))
		case 'ReturnStatement':
			return l(_, new ReturnStatement(op(fromExpression, _.argument)))
		case 'ThrowStatement':
			return l(_, new ThrowStatement(fromExpression(_.argument)))
		case 'CatchClause':
			return fromCatchClause(_)
		case 'TryStatement':
			return l(_, new TryStatement(
				fromBlockStatement(_.block),
				op(fromCatchClause, _.handler),
				op(fromBlockStatement, _.finalizer)))
		case 'WhileStatement':
			return l(_, new WhileStatement(fromExpression(_.test), fromStatement(_.body)))
		case 'DoWhileStatement':
			return l(_, new DoWhileStatement(fromStatement(_.body), fromExpression(_.test)))
		case 'ForStatement':
			return l(_, new ForStatement(
				op(fromExpressionOrVariableDeclaration, _.init),
				op(fromExpression, _.test),
				op(fromStatement, _.update),
				fromStatement(_.body)))
		case 'ForInStatement':
			return l(_, new ForInStatement(
				fromExpressionOrVariableDeclaration(_.left),
				fromExpression(_.right),
				fromStatement(_.body)))
		case 'ForOfStatement':
			return l(_, new ForOfStatement(
				fromExpressionOrVariableDeclaration(_.left),
				fromExpression(_.right),
				fromStatement(_.body)))
		case 'DebuggerStatement':
			return l(_, new DebuggerStatement())
		case 'FunctionDeclaration':
			return l(_, new FunctionDeclaration(
				fromIdentifier(_.id),
				_.params.map(fromIdentifier),
				fromBlockStatement(_.body),
				_.generator))
		case 'Literal':
			return l(_, new Literal(_.value))
		case 'ThisExpression':
			return l(_, new ThisExpression())
		case 'ArrayExpression':
			return l(_, new ArrayExpression(_.elements.map(_ => op(fromExpression, _))))
		case 'Property':
			return fromProperty(_)
		case 'ObjectExpression':
			return l(_, new ObjectExpression(_.properties.map(fromProperty)))
		case 'FunctionExpression':
			return fromFunctionExpression(_)
		case 'ArrowFunctionExpression':
			return l(_, new ArrowFunctionExpression(
				_.params.map(fromPattern),
				fromBlockStatementOrExpression(_.body)))
		case 'SequenceExpression':
			return l(_, new SequenceExpression(_.expressions.map(fromExpression)))
		case 'UnaryExpression':
			return l(_, new UnaryExpression(_.operator, fromExpression(_.argument)))
		case 'BinaryExpression':
			return l(_, new BinaryExpression(
				_.operator,
				fromExpression(_.left),
				fromExpression(_.right)))
		case 'AssignmentExpression':
			return l(_, new AssignmentExpression(
				_.operator,
				fromPattern(_.left),
				fromExpression(_.right)))
		case 'UpdateExpression':
			return l(_, new UpdateExpression(_.operator, fromExpression(_.argument), _.prefix))
		case 'LogicalExpression':
			return l(_, new LogicalExpression(
				_.operator,
				fromExpression(_.left),
				fromExpression(_.right)))
		case 'ConditionalExpression':
			return l(_, new ConditionalExpression(
				fromExpression(_.test),
				fromExpression(_.consequent),
				fromExpression(_.alternate)))
		case 'NewExpression':
			return l(_, new NewExpression(
				fromExpression(_.callee),
				_.arguments.map(fromExpression)))
		case 'CallExpression':
			return l(_, new CallExpression(
				fromExpression(_.callee),
				_.arguments.map(fromExpression)))
		case 'SpreadElement':
			return l(_, new SpreadElement(fromExpression(_.argument)))
		case 'MemberExpression':
			return l(_, new MemberExpression(
				fromExpression(_.object),
				fromExpression(_.property),
				_.computed))
		case 'YieldExpression':
			return l(_, new YieldExpression(fromExpression(_.argument), _.delegate))
		case 'TemplateElement':
			return fromTemplateElement(_)
		case 'TemplateLiteral':
			return fromTemplateLiteral(_)
		case 'TaggedTemplateExpression':
			return l(_, new TaggedTemplateExpression(
				fromExpression(_.tag),
				fromTemplateLiteral(_.quasi)))
		case 'AssignmentProperty':
			assert(_.kind === 'init')
			assert(_.method === false)
			assert(_.shorthand === true)
			assert(_.computed === false)
			return fromAssignmentProperty(_)
		case 'ObjectPattern':
			return l(_, new ObjectPattern(_.properties.map(fromAssignmentProperty)))
		case 'ArrayPattern':
			return l(_, new ArrayPattern(_.elements.map(e => op(fromPattern, e))))
		case 'RestElement':
			return l(_, new RestElement(fromExpression(_.argument)))
		case 'MethodDefinition':
			return fromMethodDefinition(_)
		case 'ClassBody':
			return fromClassBody(_)
		case 'ClassDeclaration':
			return l(_, new ClassDeclaration(
				fromIdentifier(_.id),
				op(fromExpression, _.superClass),
				fromClassBody(_.body)))
		case 'ClassExpression':
			return l(_, new ClassExpression(
				op(fromIdentifier, _.id),
				op(fromExpression, _.superClass),
				fromClassBody(_.body)))
		case 'ImportDeclaration':
			return l(_, new ImportDeclaration(
				_.specifiers.map(fromImportSpecifierAbstract),
				fromLiteralString(_.source)))
		case 'ImportSpecifier':
			return l(_, new ImportSpecifier(fromIdentifier(_.imported), fromIdentifier(_.local)))
		case 'ImportDefaultSpecifier':
			return l(_, new ImportDefaultSpecifier(fromIdentifier(_.local)))
		case 'ImportNamespaceSpecifier':
			return l(_, new ImportNamespaceSpecifier(fromIdentifier(_.local)))
		case 'ExportSpeciifer':
			return fromExportSpecifier(_)
		case 'ExportNamedDeclaration':
			return l(_, new ExportNamedDeclaration(
				op(fromDeclaration, _.declaration),
				_.specifiers.map(fromExportSpecifier),
				op(fromLiteralString, _.source)))
		case 'ExportDefaultDeclaration':
			return l(_, new ExportDefaultDeclaration(fromExpressionOrDeclaration(_.declaration)))
		case 'ExportAllDeclaration':
			return l(_, new ExportAllDeclaration(fromLiteralString(_.source)))
		default: throw new Error(`Bad type: ${_.type}`)
	}
}
export default fromObj

const
	op = (fun, _) =>
		_ == null ? null : fun(_),
	l = (_, obj) => {
		if (_.loc)
			obj.loc = new Loc(
				new Pos(_.loc.start.line, _.loc.start.column),
				new Pos(_.loc.end.line, _.loc.end.column))
		return obj
	}

const
	fromIdentifier = _ =>
		l(_, new Identifier(_.name)),
	fromVariableDeclarator = _ =>
		l(_, new VariableDeclarator(fromPattern(_.id), op(fromExpression, _.init))),
	fromSwitchCase = _ =>
		l(_, new SwitchCase(op(fromExpression, _.test), _.consequent.map(fromStatement))),
	fromBlockStatement = _ =>
		l(_, new BlockStatement(_.body.map(fromStatement))),
	fromCatchClause = _ =>
		l(_, new CatchClause(fromPattern(_.param), fromBlockStatement(_.body))),
	fromTemplateElement = _ =>
		l(_, new TemplateElement(_.tail, _.value)),
	fromTemplateLiteral = _ =>
		l(_, new TemplateLiteral(
			_.quasis.map(fromTemplateElement),
			_.expressions.map(fromExpression))),
	fromAssignmentProperty = _ =>
		l(_, new AssignmentProperty(fromIdentifier(_.key), fromPattern(_.value))),
	fromProperty = _ =>
		l(_, new Property(
			_.kind,
			fromIdentifierOrLiteral(_.key),
			fromExpression(_.value),
			_.method,
			_.shorthand,
			_.computed)),
	fromMethodDefinition =_ =>
		l(_, new MethodDefinition(
			fromIdentifierOrLiteral(_.key),
			fromFunctionExpression(_.value),
			_.kind,
			_.static,
			_.computed)),
	fromClassBody = _ =>
		l(_, new ClassBody(_.body.map(fromMethodDefinition))),
	fromFunctionExpression = _ =>
		l(_, new FunctionExpression(
			op(fromIdentifier, _.id),
			_.params.map(fromPattern),
			fromBlockStatement(_.body),
			_.generator)),
	fromExportSpecifier = _ =>
		l(_, new ExportSpecifier(fromIdentifier(_.exported), fromIdentifier(_.local)))

const
	fromBlockStatementOrExpression = fromObj,
	fromDeclaration = fromObj,
	fromExpression = fromObj,
	fromExpressionOrDeclaration = fromObj,
	fromExpressionOrVariableDeclaration = fromObj,
	fromIdentifierOrLiteral = fromObj,
	fromImportSpecifierAbstract = fromObj,
	fromLiteralString = fromObj,
	fromPattern = fromObj,
	fromStatement = fromObj
