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
	WhileStatement, YieldExpression} from './ast'
import Loc, {Pos} from './Loc'

/** Converts a plain object to a {@link Node}. */
export default function fromObject(_) {
	switch (_.type) {
		case 'Program':
			return loc(_, new Program(_.body.map(fromStatement)))
		case 'Identifier':
			return fromIdentifier(_)
		case 'VariableDeclarator':
			return fromVariableDeclarator(_)
		case 'VariableDeclaration':
			return loc(_,
				new VariableDeclaration(_.kind, _.declarations.map(fromVariableDeclarator)))
		case 'EmptyStatement':
			return loc(_, new EmptyStatement())
		case 'BlockStatement':
			return loc(_, fromBlockStatement(_))
		case 'ExpressionStatement':
			return loc(_, new ExpressionStatement(fromExpression(_.expression)))
		case 'IfStatement':
			return loc(_, new IfStatement(
				fromExpression(_.test),
				fromStatement(_.consequent),
				op(fromStatement, _.alternate)))
		case 'LabeledStatement':
			return loc(_, new LabeledStatement(fromIdentifier(_.label), fromStatement(_.body)))
		case 'BreakStatement':
			return loc(_, new BreakStatement(op(fromIdentifier, _.label)))
		case 'ContinueStatement':
			return loc(_, new ContinueStatement(op(fromIdentifier, _.label)))
		case 'SwitchCase':
			return fromSwitchCase(_)
		case 'SwitchStatement':
			return loc(_, new SwitchStatement(
				fromExpression(_.discriminant),
				_.cases.map(fromSwitchCase)))
		case 'ReturnStatement':
			return loc(_, new ReturnStatement(op(fromExpression, _.argument)))
		case 'ThrowStatement':
			return loc(_, new ThrowStatement(fromExpression(_.argument)))
		case 'CatchClause':
			return fromCatchClause(_)
		case 'TryStatement':
			return loc(_, new TryStatement(
				fromBlockStatement(_.block),
				op(fromCatchClause, _.handler),
				op(fromBlockStatement, _.finalizer)))
		case 'WhileStatement':
			return loc(_, new WhileStatement(fromExpression(_.test), fromStatement(_.body)))
		case 'DoWhileStatement':
			return loc(_, new DoWhileStatement(fromStatement(_.body), fromExpression(_.test)))
		case 'ForStatement':
			return loc(_, new ForStatement(
				op(fromExpressionOrVariableDeclaration, _.init),
				op(fromExpression, _.test),
				op(fromStatement, _.update),
				fromStatement(_.body)))
		case 'ForInStatement':
			return loc(_, new ForInStatement(
				fromExpressionOrVariableDeclaration(_.left),
				fromExpression(_.right),
				fromStatement(_.body)))
		case 'ForOfStatement':
			return loc(_, new ForOfStatement(
				fromExpressionOrVariableDeclaration(_.left),
				fromExpression(_.right),
				fromStatement(_.body)))
		case 'DebuggerStatement':
			return loc(_, new DebuggerStatement())
		case 'FunctionDeclaration':
			return loc(_, new FunctionDeclaration(
				fromIdentifier(_.id),
				_.params.map(fromIdentifier),
				fromBlockStatement(_.body),
				_.generator))
		case 'Literal':
			return loc(_, new Literal(_.value))
		case 'ThisExpression':
			return loc(_, new ThisExpression())
		case 'ArrayExpression':
			return loc(_, new ArrayExpression(_.elements.map(_ => op(fromExpression, _))))
		case 'Property':
			return fromProperty(_)
		case 'ObjectExpression':
			return loc(_, new ObjectExpression(_.properties.map(fromProperty)))
		case 'FunctionExpression':
			return fromFunctionExpression(_)
		case 'ArrowFunctionExpression':
			return loc(_, new ArrowFunctionExpression(
				_.params.map(fromPattern),
				fromBlockStatementOrExpression(_.body)))
		case 'SequenceExpression':
			return loc(_, new SequenceExpression(_.expressions.map(fromExpression)))
		case 'UnaryExpression':
			return loc(_, new UnaryExpression(_.operator, fromExpression(_.argument)))
		case 'BinaryExpression':
			return loc(_, new BinaryExpression(
				_.operator,
				fromExpression(_.left),
				fromExpression(_.right)))
		case 'AssignmentExpression':
			return loc(_, new AssignmentExpression(
				_.operator,
				fromPattern(_.left),
				fromExpression(_.right)))
		case 'UpdateExpression':
			return loc(_, new UpdateExpression(_.operator, fromExpression(_.argument), _.prefix))
		case 'LogicalExpression':
			return loc(_, new LogicalExpression(
				_.operator,
				fromExpression(_.left),
				fromExpression(_.right)))
		case 'ConditionalExpression':
			return loc(_, new ConditionalExpression(
				fromExpression(_.test),
				fromExpression(_.consequent),
				fromExpression(_.alternate)))
		case 'NewExpression':
			return loc(_, new NewExpression(
				fromExpression(_.callee),
				_.arguments.map(fromExpression)))
		case 'CallExpression':
			return loc(_, new CallExpression(
				fromExpression(_.callee),
				_.arguments.map(fromExpression)))
		case 'SpreadElement':
			return loc(_, new SpreadElement(fromExpression(_.argument)))
		case 'MemberExpression':
			return loc(_, new MemberExpression(
				fromExpression(_.object),
				fromExpression(_.property)))
		case 'YieldExpression':
			return loc(_, new YieldExpression(fromExpression(_.argument), _.delegate))
		case 'TemplateElement':
			return fromTemplateElement(_)
		case 'TemplateLiteral':
			return fromTemplateLiteral(_)
		case 'TaggedTemplateExpression':
			return loc(_, new TaggedTemplateExpression(
				fromExpression(_.tag),
				fromTemplateLiteral(_.quasi)))
		case 'AssignmentProperty':
			return fromAssignmentProperty(_)
		case 'ObjectPattern':
			return loc(_, new ObjectPattern(_.properties.map(fromAssignmentProperty)))
		case 'ArrayPattern':
			return loc(_, new ArrayPattern(_.elements.map(e => op(fromPattern, e))))
		case 'RestElement':
			return loc(_, new RestElement(fromExpression(_.argument)))
		case 'MethodDefinition':
			return fromMethodDefinition(_)
		case 'ClassBody':
			return fromClassBody(_)
		case 'ClassDeclaration':
			return loc(_, new ClassDeclaration(
				fromIdentifier(_.id),
				op(fromExpression, _.superClass),
				fromClassBody(_.body)))
		case 'ClassExpression':
			return loc(_, new ClassExpression(
				op(fromIdentifier, _.id),
				op(fromExpression, _.superClass),
				fromClassBody(_.body)))
		case 'ImportDeclaration':
			return loc(_, new ImportDeclaration(
				_.specifiers.map(fromImportSpecifierAbstract),
				fromLiteralString(_.source)))
		case 'ImportSpecifier':
			return loc(_, new ImportSpecifier(fromIdentifier(_.imported), fromIdentifier(_.local)))
		case 'ImportDefaultSpecifier':
			return loc(_, new ImportDefaultSpecifier(fromIdentifier(_.local)))
		case 'ImportNamespaceSpecifier':
			return loc(_, new ImportNamespaceSpecifier(fromIdentifier(_.local)))
		case 'ExportSpeciifer':
			return fromExportSpecifier(_)
		case 'ExportNamedDeclaration':
			return loc(_, new ExportNamedDeclaration(
				op(fromDeclaration, _.declaration),
				_.specifiers.map(fromExportSpecifier),
				op(fromLiteralString, _.source)))
		case 'ExportDefaultDeclaration':
			return loc(_, new ExportDefaultDeclaration(fromExpressionOrDeclaration(_.declaration)))
		case 'ExportAllDeclaration':
			return loc(_, new ExportAllDeclaration(fromLiteralString(_.source)))
		default: throw new Error(`Bad type: ${_.type}`)
	}
}

const
	op = (func, optional) =>
		optional == null ? null : func(optional),
	loc = (object, ast) => {
		const loc = object.loc
		if (loc !== undefined)
			ast.loc = new Loc(
				new Pos(loc.start.line, loc.start.column),
				new Pos(loc.end.line, loc.end.column))
		return ast
	}

const
	fromIdentifier = _ =>
		loc(_, new Identifier(_.name)),
	fromVariableDeclarator = _ =>
		loc(_, new VariableDeclarator(fromPattern(_.id), op(fromExpression, _.init))),
	fromSwitchCase = _ =>
		loc(_, new SwitchCase(op(fromExpression, _.test), _.consequent.map(fromStatement))),
	fromBlockStatement = _ =>
		loc(_, new BlockStatement(_.body.map(fromStatement))),
	fromCatchClause = _ =>
		loc(_, new CatchClause(fromPattern(_.param), fromBlockStatement(_.body))),
	fromTemplateElement = _ =>
		loc(_, new TemplateElement(_.tail, _.value)),
	fromTemplateLiteral = _ =>
		loc(_, new TemplateLiteral(
			_.quasis.map(fromTemplateElement),
			_.expressions.map(fromExpression))),
	fromAssignmentProperty = _ => {
		if (!(_.kind === 'init' && !_.method))
			throw new Error(`AssignmentProperty has unusual value: ${JSON.stringify(_)}`)
		return loc(_, new AssignmentProperty(fromIdentifier(_.key), fromPattern(_.value)))
	},
	fromProperty = _ =>
		loc(_, new Property(
			_.kind,
			fromIdentifierOrLiteral(_.key),
			fromExpression(_.value),
			_.method)),
	fromMethodDefinition =_ =>
		loc(_, new MethodDefinition(
			fromIdentifierOrLiteral(_.key),
			fromFunctionExpression(_.value),
			_.kind,
			_.static,
			_.computed)),
	fromClassBody = _ =>
		loc(_, new ClassBody(_.body.map(fromMethodDefinition))),
	fromFunctionExpression = _ =>
		loc(_, new FunctionExpression(
			op(fromIdentifier, _.id),
			_.params.map(fromPattern),
			fromBlockStatement(_.body),
			_.generator)),
	fromExportSpecifier = _ =>
		loc(_, new ExportSpecifier(fromIdentifier(_.exported), fromIdentifier(_.local)))

const
	fromBlockStatementOrExpression = fromObject,
	fromDeclaration = fromObject,
	fromExpression = fromObject,
	fromExpressionOrDeclaration = fromObject,
	fromExpressionOrVariableDeclaration = fromObject,
	fromIdentifierOrLiteral = fromObject,
	fromImportSpecifierAbstract = fromObject,
	fromLiteralString = fromObject,
	fromPattern = fromObject,
	fromStatement = fromObject
