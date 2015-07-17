if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist/tupl', 'tupl/dist/type', './private/util'], function (exports, _tuplDistTupl, _tuplDistType, _privateUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _tupl = _interopRequireDefault(_tuplDistTupl);

	const Node = (0, _tuplDistTupl.abstract)('Node', Object, 'Base type of all Asts.'),
	      Declaration = (0, _tuplDistTupl.abstract)('Declaration', Node, 'Identifier declaration.'),
	      Statement = (0, _tuplDistTupl.abstract)('Statement', Node, 'Blocks of code have lines that are Statements or Declarations.'),
	      Expression = (0, _tuplDistTupl.abstract)('Expression', Node, 'Code that has a value. To use one in a statement position, see ExpressionStatement.'),
	      Pattern = (0, _tuplDistTupl.abstract)('Pattern', Node, 'Can go in a parameter list or on the left side of an assignment.');

	exports.Node = Node;
	exports.Declaration = Declaration;
	exports.Statement = Statement;
	exports.Expression = Expression;
	exports.Pattern = Pattern;
	const makeType = superType => (name, doc, namesTypes, proto) => {
		// TODO:ES6 Optional args
		if (proto === undefined) proto = {};
		doc = (0, _privateUtil.dedent)(doc);
		proto.type = name;
		const t = (0, _tupl.default)(name, superType, doc, namesTypes, proto);
		const oldToString = t.prototype.toString;
		t.prototype.toString = function () {
			const old = oldToString.call(this);
			return this.loc ? `${ this.loc.toString() }@${ old }` : old;
		};
		return t;
	};
	const n = makeType(Node),
	      s = makeType(Statement),
	      e = makeType(Expression),
	      d = makeType(Declaration),
	      p = makeType(Pattern);

	const Program = n('Program', 'A complete program source tree.', ['body', [Statement]]),
	      Identifier = n('Identifier', `
			A JavaScript identifier.
			It is assumed that you have called \`mangleIdentifier\` as appropriate.
			Also look at \`esast.util idCached\`,
			which mangles and avoids constructing the same identifier twice.`, ['name', String]),
	      VariableDeclarator = n('VariableDeclarator', 'A single variable within a VariableDeclaration.', ['id', Pattern, 'init', (0, _tuplDistType.Nullable)(Expression)]),
	      VariableDeclarationKind = (0, _privateUtil.newSet)(['const', 'let', 'var']),
	      VariableDeclaration = d('VariableDeclaration',
	// TODO: Assert
	`
			Declares and optionally initializes many variables.
			Must be at least one declaration.`, ['kind', VariableDeclarationKind, 'declarations', [VariableDeclarator]]),
	     

	// Statements
	EmptyStatement = s('EmptyStatement', `
			An empty statement, i.e., a solitary semicolon.
			Not useful for code generation, but some parsers will return these.`, []),
	      BlockStatement = s('BlockStatement', 'A block statement, i.e., a sequence of statements surrounded by braces.', ['body', [Statement]]),
	      ExpressionStatement = s('ExpressionStatement', `
			An expression statement, i.e., a statement consisting of a single expression.
			See \`esast.util toStatement toStatements\`.`, ['expression', Expression]),
	      IfStatement = s('IfStatement', 'An if (or if ... else) statement.', ['test', Expression, 'consequent', Statement, 'alternate', (0, _tuplDistType.Nullable)(Statement)]),
	      LabeledStatement = s('LabeledStatement', 'A statement prefixed by a label.', ['label', Identifier, 'body', Statement]),
	      BreakStatement = s('BreakStatement', 'The `break` keyword.', ['label', (0, _tuplDistType.Nullable)(Identifier)]),
	      ContinueStatement = s('ContinueStatement', 'The `continue` keyword.', ['label', (0, _tuplDistType.Nullable)(Identifier)]),
	      SwitchCase = n('SwitchCase', `
			A single \`case\` within a SwitchStatement.
			If \`test\` is \`null\`, this is the \`default\` case.`, ['test', (0, _tuplDistType.Nullable)(Expression), 'consequent', [Statement]]),
	      SwitchStatement = s('SwitchStatement', 'Only the last entry of `cases` is allowed to be `default`.', ['discriminant', Expression, 'cases', [SwitchCase]]),
	      ReturnStatement = s('ReturnStatement', 'The `return` keyword, optionally followed by an Expression to return.', ['argument', (0, _tuplDistType.Nullable)(Expression)]),
	      ThrowStatement = s('ThrowStatement', `
			The \`throw\` keyword, and something to throw.
			See \`esast.util throwError\`.`, ['argument', Expression]),
	      CatchClause = n('CatchClause', 'Must be *part* of a TryStatement -- does *not* follow it.', ['param', Pattern, 'body', BlockStatement]),
	      TryStatement = s('TryStatement',
	// TODO: Assert in postConstruct
	'At least one of `handler` or `finalizer` must be non-null.', ['block', BlockStatement, 'handler', (0, _tuplDistType.Nullable)(CatchClause), 'finalizer', (0, _tuplDistType.Nullable)(BlockStatement)]),
	      WhileStatement = s('WhileStatement', '`while (test) body`.', ['test', Expression, 'body', Statement]),
	      DoWhileStatement = s('DoWhileStatement',
	// TODO: Note that body needs braces!
	'`do { body } while (test)`.', ['body', Statement, 'test', Expression]),
	      ForStatement = s('ForStatement', `
			\`for (init; test; update) body\`.
			Not to be confused with ForInStatement or ForOfStatement.`, ['init', (0, _tuplDistType.Nullable)((0, _tuplDistType.Union)(VariableDeclaration, Expression)), 'test', (0, _tuplDistType.Nullable)(Expression), 'update', (0, _tuplDistType.Nullable)(Expression), 'body', Statement]),
	      ForInStatement = s('ForInStatement', '`for (left in right) body`.', ['left', (0, _tuplDistType.Union)(VariableDeclaration, Expression), 'right', Expression, 'body', Statement]),
	      ForOfStatement = s('ForOfStatement', '`for (left of right) body`.', ['left', (0, _tuplDistType.Union)(VariableDeclaration, Expression), 'right', Expression, 'body', Statement]),
	      DebuggerStatement = s('DebuggerStatement', 'The `debugger` keyword.', []),
	     

	// Declarations
	Function = (0, _tuplDistTupl.abstract)('Function', Node, 'FunctionDeclaration or FunctionExpression.'),
	     
	// TODO: Function too
	FunctionDeclaration = d('FunctionDeclaration', 'Unlike for FunctionExpression, id must not be null.', ['id', Identifier, 'params', [Identifier], 'body', BlockStatement, 'generator', Boolean]),
	     

	// Expressions
	// TODO: Literal as abstract type
	// Value: Number | String | null | Boolean
	Literal = e('Literal', 'A literal token.', ['value', Object]),
	      ThisExpression = e('ThisExpression', 'The `this` keyword.', []),
	      ArrayExpression = e('ArrayExpression', 'An array literal.', ['elements', [(0, _tuplDistType.Nullable)(Expression)]]),
	      PropertyKind = (0, _privateUtil.newSet)(['init', 'get', 'set']),
	      Property = n('Property',
	// TODO:ASSERT
	`
			Part of an ObjectExpression.
			If kind is 'get' or 'set', then value should be a FunctionExpression.`, ['kind', PropertyKind,
	// TODO: LiteralString | LiteralNumber
	'key', (0, _tuplDistType.Union)(Literal, Identifier), 'value', Expression]),
	      ObjectExpression = e('ObjectExpression', 'An object literal.', ['properties', [Property]]),
	     
	// TODO: Inherits from Function
	FunctionExpression = e('FunctionExpression', `
			\`function id(params) body\` or \`function* id(params) body\`.
			Function in an expression position.
			To declare a function, use FunctionDeclaration, not ExpressionStatement.
			See also \`esast.util thunk\` and ArrowFunctionExpression.`, ['id', (0, _tuplDistType.Nullable)(Identifier), 'params', [Pattern], 'body', BlockStatement, 'generator', Boolean], {
		postConstruct() {
			this.generator = Boolean(this.generator);
		}
	}),
	     
	// TODO: Inherits from Function
	ArrowFunctionExpression = e('ArrowFunctionExpression', 'Like FunctionExpression but uses the `params => body` form.', ['params', [Pattern], 'body', (0, _tuplDistType.Union)(BlockStatement, Expression)]),
	      SequenceExpression = e('SequenceExpression', `
			\`expressions[0], expressions[1], ...\`.
			Expression composed of other expressions, separated by the comma operator.
			*Not* for parameter lists.`, ['expressions', [Expression]]),
	     
	// TODO: test `- new X`. Probably need parens around argument.
	UnaryOperator = (0, _privateUtil.newSet)(['-', '+', '!', '~', 'typeof', 'void', 'delete']),
	      UnaryExpression = e('UnaryExpression', '`operator argument`. Calls a unary operator.', ['operator', UnaryOperator, 'argument', Expression]),
	      BinaryOperator = (0, _privateUtil.newSet)(['==', '!=', '===', '!==', '<', '<=', '>', '>=', '<<', '>>', '>>>', '+', '-', '*', '/', '%', '|', '^', '&', 'in', 'instanceof']),
	     
	// TODO: Render with parens
	BinaryExpression = e('BinaryExpression', '`left operator right`. Calls a binary operator.', ['operator', BinaryOperator, 'left', Expression, 'right', Expression]),
	      AssignmentOperator = (0, _privateUtil.newSet)(['=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '|=', '^=', '&=']),
	      AssignmentExpression = e('AssignmentExpression', `
			\`left operator right\`.
			Mutates an existing variable.
			Do not confuse with VariableDeclaration.`, ['operator', AssignmentOperator, 'left', Pattern, 'right', Expression]),
	      UpdateOperator = (0, _privateUtil.newSet)(['++', '--']),
	      UpdateExpression = e('UpdateExpression', '`++argument` or `argument++`. Increments or decrements a number.', ['operator', UpdateOperator, 'argument', Expression, 'prefix', Boolean]),
	      LogicalOperator = (0, _privateUtil.newSet)(['||', '&&']),
	      LogicalExpression = e('LogicalExpression', '`left operator right`. Calls a lazy logical operator.', ['operator', LogicalOperator, 'left', Expression, 'right', Expression]),
	      ConditionalExpression = e('ConditionalExpression', '`test ? consequent : alternate`.', ['test', Expression, 'consequent', Expression, 'alternate', Expression]),
	      NewExpression = e('NewExpression', 'Just like CallExpression but with `new` in front.', ['callee', Expression, 'arguments', [Expression]]),
	      CallExpression = e('CallExpression', '`callee(arguments)`.', ['callee', Expression, 'arguments', [Expression]]),
	      SpreadElement = n('SpreadElement', '...args in call', ['argument', Expression]),
	      MemberExpression = e('MemberExpression',
	// TODO:ASSERT
	`
			If computed === true, \`object[property]\`.
			Else, \`object.property\` -- meaning property should be an Identifier.`, ['object', Expression, 'property', Expression, 'computed', Boolean]),
	      YieldExpression = e('YieldExpression', '`yield argument` or `yield* argument`.', ['argument', Expression, 'delegate', Boolean]),
	     

	// Templates
	TemplateElement = n('TemplateElement', 'doc', ['tail', Boolean,
	// TODO: { cooked:String, raw:String } data structure
	'value', Object]),
	      TemplateLiteral = e('TemplateLiteral', 'doc', ['quasis', [TemplateElement], 'expressions', [Expression]], {
		postConstruct() {
			(0, _privateUtil.assert)(this.quasis.length === this.expressions.length + 1);
		}
	}),
	      TaggedTemplateExpression = e('TaggedTemplateExpression', 'doc', ['tag', Expression, 'quasi', TemplateLiteral]),
	     

	// Patterns
	AssignmentProperty = makeType(Property)('AssignmentProperty', `
			Just like a Property, but kind is always \`init\`.
			Although technically its own type, \`_.type\` will be 'Property'.`, ['key', Identifier, 'value', Pattern], {
		type: 'Property',
		method: false,
		postConstruct() {
			if (this.value === null) this.value = this.key;
			this.kind = 'init';
		}
	}),
	      ObjectPattern = p('ObjectPattern', '`{ a, b: c } = ...`. Object deconstructing pattern.', ['properties', [AssignmentProperty]]),
	      ArrayPattern = p('ArrayPattern', '`[ a, b ] = ...`. Array deconstructing pattern.', ['elements', [(0, _tuplDistType.Nullable)(Pattern)]]),
	      RestElement = p('RestElement',
	// TODO:TEST
	`
			Can be the last argument to a FunctionExpression/FunctionDeclaration
			or  go at the end of an ArrayPattern.`, ['argument', Pattern]),
	     

	// TODO: What is this?
	// AssignmentPattern = p('AssignmentPattern',
	//	'left', Pattern,
	//	'right', Pattern),

	MethodDefinitionKind = (0, _privateUtil.newSet)(['constructor', 'method', 'get', 'set']),
	      MethodDefinition = n('MethodDefinition',
	// TODO:Assert
	// TODO: util method for constructor.
	`
			Part of a ClassBody.
			If kind is 'constructor', key must be Identifier('constructor').`, ['key', (0, _tuplDistType.Union)(Identifier, Literal), 'value', FunctionExpression, 'kind', MethodDefinitionKind, 'static', Boolean, 'computed', Boolean]),
	      ClassBody = n('ClassBody', 'Contents of a Class.', ['body', [MethodDefinition]]),
	      Class = (0, _tuplDistTupl.abstract)('Class', Node, 'ClassDeclaration or ClassExpression.'),
	     
	// TODO: extends Declaration too
	ClassDeclaration = makeType(Class)('ClassDeclaration', 'Class in declaration position.', ['id', Identifier, 'superClass', (0, _tuplDistType.Nullable)(Expression), 'body', ClassBody]),
	      ClassExpression = makeType(Class)('ClassExpression',
	// TODO: Test class with no superClass
	'Class in expression position.', ['id', (0, _tuplDistType.Nullable)(Identifier), 'superClass', (0, _tuplDistType.Nullable)(Expression), 'body', ClassBody]),
	      ModuleSpecifier = (0, _tuplDistTupl.abstract)('ModuleSpecifier', Node, 'A specifier in an import or export declaration.'),
	      ImportSpecifierAbstract = (0, _tuplDistTupl.abstract)('ImportSpecifierAbstract', Node, 'ImportSpecifier, ImportDefaultSpecifier, or ImportNamespaceSpecifier.'),
	      ImportDeclaration = n('ImportDeclaration',
	// TODO:ASSERT
	`
			\`import specifiers from source\`.
			Only one specifier may be a ImportDefaultSpecifier.
			If there is an ImportNamespaceSpecifier, it must be the only specifier.`, ['specifiers', [ImportSpecifierAbstract],
	// TODO: LiteralString
	'source', Literal]),
	      ImportSpecifier = makeType(ModuleSpecifier)('ImportSpecifier', `
			A non-default import. Used in an ImportDeclaration.
			For \`import { a } from "source"\`, just pass one argument and local will = imported.
			For \`import { a as b } from "source"\`, make imported \`a\` and local \`b\`.`, ['imported', Identifier, 'local', Identifier], {
		postConstruct() {
			if (this.local === null) this.local = this.imported;
		}
	}),
	      ImportDefaultSpecifier = makeType(ImportSpecifierAbstract)('ImportDefaultSpecifier', 'The default export, as in `import a from "source"`.', ['local', Identifier]),
	      ImportNamespaceSpecifier = makeType(ImportSpecifierAbstract)('ImportNamespaceSpecifier', 'Object of every export, as in `import * as a from "source"`.', ['local', Identifier]),
	      ExportSpecifier = makeType(ModuleSpecifier)('ExportSpecifier', `
			A non-default export. Used in an ExportNamedDeclaration.
			For \`export { a } from "source"\`, just pass one argument local will = exported.
			For \`export { a as b }\`, make exported \`b\` and local \`a\`.`, ['exported', Identifier, 'local', Identifier], {
		postConstruct() {
			if (this.local === null) this.local = this.exported;
		}
	}),
	      ExportNamedDeclaration = n('ExportNamedDeclaration', `
			Exports multiple values as in \`export { a, b as c }\`.
			If source !== null,
			re-exports from that module as in \`export { ... } from "source"\`.`, ['declaration', (0, _tuplDistType.Nullable)(Declaration), 'specifiers', [ExportSpecifier],
	// TODO: LiteralString
	'source', (0, _tuplDistType.Nullable)(Literal)]),
	      ExportDefaultDeclaration = n('ExportDefaultDeclaration', '`export default declaration`.', ['declaration', (0, _tuplDistType.Union)(Declaration, Expression)]),
	      ExportAllDeclaration = n('ExportAllDeclaration', '`export * from source`.',
	// TODO:LiteralString
	['source', Literal]);
	exports.Program = Program;
	exports.Identifier = Identifier;
	exports.VariableDeclarator = VariableDeclarator;
	exports.VariableDeclarationKind = VariableDeclarationKind;
	exports.VariableDeclaration = VariableDeclaration;
	exports.EmptyStatement = EmptyStatement;
	exports.BlockStatement = BlockStatement;
	exports.ExpressionStatement = ExpressionStatement;
	exports.IfStatement = IfStatement;
	exports.LabeledStatement = LabeledStatement;
	exports.BreakStatement = BreakStatement;
	exports.ContinueStatement = ContinueStatement;
	exports.SwitchCase = SwitchCase;
	exports.SwitchStatement = SwitchStatement;
	exports.ReturnStatement = ReturnStatement;
	exports.ThrowStatement = ThrowStatement;
	exports.CatchClause = CatchClause;
	exports.TryStatement = TryStatement;
	exports.WhileStatement = WhileStatement;
	exports.DoWhileStatement = DoWhileStatement;
	exports.ForStatement = ForStatement;
	exports.ForInStatement = ForInStatement;
	exports.ForOfStatement = ForOfStatement;
	exports.DebuggerStatement = DebuggerStatement;
	exports.Function = Function;
	exports.FunctionDeclaration = FunctionDeclaration;
	exports.Literal = Literal;
	exports.ThisExpression = ThisExpression;
	exports.ArrayExpression = ArrayExpression;
	exports.PropertyKind = PropertyKind;
	exports.Property = Property;
	exports.ObjectExpression = ObjectExpression;
	exports.FunctionExpression = FunctionExpression;
	exports.ArrowFunctionExpression = ArrowFunctionExpression;
	exports.SequenceExpression = SequenceExpression;
	exports.UnaryOperator = UnaryOperator;
	exports.UnaryExpression = UnaryExpression;
	exports.BinaryOperator = BinaryOperator;
	exports.BinaryExpression = BinaryExpression;
	exports.AssignmentOperator = AssignmentOperator;
	exports.AssignmentExpression = AssignmentExpression;
	exports.UpdateOperator = UpdateOperator;
	exports.UpdateExpression = UpdateExpression;
	exports.LogicalOperator = LogicalOperator;
	exports.LogicalExpression = LogicalExpression;
	exports.ConditionalExpression = ConditionalExpression;
	exports.NewExpression = NewExpression;
	exports.CallExpression = CallExpression;
	exports.SpreadElement = SpreadElement;
	exports.MemberExpression = MemberExpression;
	exports.YieldExpression = YieldExpression;
	exports.TemplateElement = TemplateElement;
	exports.TemplateLiteral = TemplateLiteral;
	exports.TaggedTemplateExpression = TaggedTemplateExpression;
	exports.AssignmentProperty = AssignmentProperty;
	exports.ObjectPattern = ObjectPattern;
	exports.ArrayPattern = ArrayPattern;
	exports.RestElement = RestElement;
	exports.MethodDefinitionKind = MethodDefinitionKind;
	exports.MethodDefinition = MethodDefinition;
	exports.ClassBody = ClassBody;
	exports.Class = Class;
	exports.ClassDeclaration = ClassDeclaration;
	exports.ClassExpression = ClassExpression;
	exports.ModuleSpecifier = ModuleSpecifier;
	exports.ImportSpecifierAbstract = ImportSpecifierAbstract;
	exports.ImportDeclaration = ImportDeclaration;
	exports.ImportSpecifier = ImportSpecifier;
	exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
	exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
	exports.ExportSpecifier = ExportSpecifier;
	exports.ExportNamedDeclaration = ExportNamedDeclaration;
	exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
	exports.ExportAllDeclaration = ExportAllDeclaration;
});
//# sourceMappingURL=data:application/json;base64,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QUMsMEJBQTBCLEVBQ3RGLDhEQUE4RCxFQUM5RCxDQUFFLE9BQU8sRUFBRSxVQUFVLENBQUUsQ0FBQztPQUV6QixlQUFlLEdBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGlCQUFpQixFQUM3RCxDQUFDOzs7a0VBRytELENBQUMsRUFDakUsQ0FDQyxVQUFVLEVBQUUsVUFBVSxFQUN0QixPQUFPLEVBQUUsVUFBVSxDQUNuQixFQUNEO0FBQ0MsZUFBYSxHQUFHO0FBQ2YsT0FBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO0dBQzNCO0VBQ0QsQ0FBQztPQUNILHNCQUFzQixHQUFHLENBQUMsQ0FBQyx3QkFBd0IsRUFDbEQsQ0FBQzs7O3NFQUdtRSxDQUFDLEVBQ3JFLENBQ0MsYUFBYSxFQUFFLGtCQTVlVCxRQUFRLEVBNGVVLFdBQVcsQ0FBQyxFQUNwQyxZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUM7O0FBRS9CLFNBQVEsRUFBRSxrQkEvZUosUUFBUSxFQStlSyxPQUFPLENBQUMsQ0FDM0IsQ0FBQztPQUNILHdCQUF3QixHQUFHLENBQUMsQ0FBQywwQkFBMEIsRUFDdEQsK0JBQStCLEVBQy9CLENBQ0MsYUFBYSxFQUFFLGtCQXBmQyxLQUFLLEVBb2ZBLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FDN0MsQ0FBQztPQUNILG9CQUFvQixHQUFHLENBQUMsQ0FBQyxzQkFBc0IsRUFDOUMseUJBQXlCOztBQUV6QixFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUUsQ0FBQyxDQUFBIiwiZmlsZSI6ImFzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0dXBsLCB7IGFic3RyYWN0IH0gZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBOdWxsYWJsZSwgVW5pb24gfSBmcm9tICd0dXBsL2Rpc3QvdHlwZSdcbmltcG9ydCB7IGFzc2VydCwgZGVkZW50LCBuZXdTZXQgfSBmcm9tICcuL3ByaXZhdGUvdXRpbCdcblxuZXhwb3J0IGNvbnN0XG5cdE5vZGUgPSBhYnN0cmFjdCgnTm9kZScsIE9iamVjdCxcblx0XHQnQmFzZSB0eXBlIG9mIGFsbCBBc3RzLicpLFxuXHREZWNsYXJhdGlvbiA9IGFic3RyYWN0KCdEZWNsYXJhdGlvbicsIE5vZGUsXG5cdFx0J0lkZW50aWZpZXIgZGVjbGFyYXRpb24uJyksXG5cdFN0YXRlbWVudCA9IGFic3RyYWN0KCdTdGF0ZW1lbnQnLCBOb2RlLFxuXHRcdCdCbG9ja3Mgb2YgY29kZSBoYXZlIGxpbmVzIHRoYXQgYXJlIFN0YXRlbWVudHMgb3IgRGVjbGFyYXRpb25zLicpLFxuXHRFeHByZXNzaW9uID0gYWJzdHJhY3QoJ0V4cHJlc3Npb24nLCBOb2RlLFxuXHRcdCdDb2RlIHRoYXQgaGFzIGEgdmFsdWUuIFRvIHVzZSBvbmUgaW4gYSBzdGF0ZW1lbnQgcG9zaXRpb24sIHNlZSBFeHByZXNzaW9uU3RhdGVtZW50LicpLFxuXHRQYXR0ZXJuID0gYWJzdHJhY3QoJ1BhdHRlcm4nLCBOb2RlLFxuXHRcdCdDYW4gZ28gaW4gYSBwYXJhbWV0ZXIgbGlzdCBvciBvbiB0aGUgbGVmdCBzaWRlIG9mIGFuIGFzc2lnbm1lbnQuJylcblxuY29uc3QgbWFrZVR5cGUgPSBzdXBlclR5cGUgPT4gKG5hbWUsIGRvYywgbmFtZXNUeXBlcywgcHJvdG8pID0+IHtcblx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRpZiAocHJvdG8gPT09IHVuZGVmaW5lZCkgcHJvdG8gPSB7IH1cblx0ZG9jID0gZGVkZW50KGRvYylcblx0cHJvdG8udHlwZSA9IG5hbWVcblx0Y29uc3QgdCA9IHR1cGwobmFtZSwgc3VwZXJUeXBlLCBkb2MsIG5hbWVzVHlwZXMsIHByb3RvKVxuXHRjb25zdCBvbGRUb1N0cmluZyA9IHQucHJvdG90eXBlLnRvU3RyaW5nXG5cdHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3Qgb2xkID0gb2xkVG9TdHJpbmcuY2FsbCh0aGlzKVxuXHRcdHJldHVybiB0aGlzLmxvYyA/IGAke3RoaXMubG9jLnRvU3RyaW5nKCl9QCR7b2xkfWAgOiBvbGRcblx0fVxuXHRyZXR1cm4gdFxufVxuY29uc3Rcblx0biA9IG1ha2VUeXBlKE5vZGUpLFxuXHRzID0gbWFrZVR5cGUoU3RhdGVtZW50KSxcblx0ZSA9IG1ha2VUeXBlKEV4cHJlc3Npb24pLFxuXHRkID0gbWFrZVR5cGUoRGVjbGFyYXRpb24pLFxuXHRwID0gbWFrZVR5cGUoUGF0dGVybilcblxuZXhwb3J0IGNvbnN0XG5cdFByb2dyYW0gPSBuKCdQcm9ncmFtJyxcblx0XHQnQSBjb21wbGV0ZSBwcm9ncmFtIHNvdXJjZSB0cmVlLicsXG5cdFx0WyAnYm9keScsIFtTdGF0ZW1lbnRdIF0pLFxuXHRJZGVudGlmaWVyID0gbignSWRlbnRpZmllcicsXG5cdFx0YFxuXHRcdFx0QSBKYXZhU2NyaXB0IGlkZW50aWZpZXIuXG5cdFx0XHRJdCBpcyBhc3N1bWVkIHRoYXQgeW91IGhhdmUgY2FsbGVkIFxcYG1hbmdsZUlkZW50aWZpZXJcXGAgYXMgYXBwcm9wcmlhdGUuXG5cdFx0XHRBbHNvIGxvb2sgYXQgXFxgZXNhc3QudXRpbCBpZENhY2hlZFxcYCxcblx0XHRcdHdoaWNoIG1hbmdsZXMgYW5kIGF2b2lkcyBjb25zdHJ1Y3RpbmcgdGhlIHNhbWUgaWRlbnRpZmllciB0d2ljZS5gLFxuXHRcdFsgJ25hbWUnLCBTdHJpbmcgXSksXG5cblx0VmFyaWFibGVEZWNsYXJhdG9yID0gbignVmFyaWFibGVEZWNsYXJhdG9yJyxcblx0XHQnQSBzaW5nbGUgdmFyaWFibGUgd2l0aGluIGEgVmFyaWFibGVEZWNsYXJhdGlvbi4nLFxuXHRcdFtcblx0XHRcdCdpZCcsIFBhdHRlcm4sXG5cdFx0XHQnaW5pdCcsIE51bGxhYmxlKEV4cHJlc3Npb24pXG5cdFx0XSksXG5cdFZhcmlhYmxlRGVjbGFyYXRpb25LaW5kID0gbmV3U2V0KFsgJ2NvbnN0JywgJ2xldCcsICd2YXInIF0pLFxuXHRWYXJpYWJsZURlY2xhcmF0aW9uID0gZCgnVmFyaWFibGVEZWNsYXJhdGlvbicsXG5cdFx0Ly8gVE9ETzogQXNzZXJ0XG5cdFx0YFxuXHRcdFx0RGVjbGFyZXMgYW5kIG9wdGlvbmFsbHkgaW5pdGlhbGl6ZXMgbWFueSB2YXJpYWJsZXMuXG5cdFx0XHRNdXN0IGJlIGF0IGxlYXN0IG9uZSBkZWNsYXJhdGlvbi5gLFxuXHRcdFtcblx0XHRcdCdraW5kJywgVmFyaWFibGVEZWNsYXJhdGlvbktpbmQsXG5cdFx0XHQnZGVjbGFyYXRpb25zJywgW1ZhcmlhYmxlRGVjbGFyYXRvcl1cblx0XHRdKSxcblxuXHQvLyBTdGF0ZW1lbnRzXG5cdEVtcHR5U3RhdGVtZW50ID0gcygnRW1wdHlTdGF0ZW1lbnQnLFxuXHRcdGBcblx0XHRcdEFuIGVtcHR5IHN0YXRlbWVudCwgaS5lLiwgYSBzb2xpdGFyeSBzZW1pY29sb24uXG5cdFx0XHROb3QgdXNlZnVsIGZvciBjb2RlIGdlbmVyYXRpb24sIGJ1dCBzb21lIHBhcnNlcnMgd2lsbCByZXR1cm4gdGhlc2UuYCxcblx0XHRbIF0pLFxuXHRCbG9ja1N0YXRlbWVudCA9IHMoJ0Jsb2NrU3RhdGVtZW50Jyxcblx0XHQnQSBibG9jayBzdGF0ZW1lbnQsIGkuZS4sIGEgc2VxdWVuY2Ugb2Ygc3RhdGVtZW50cyBzdXJyb3VuZGVkIGJ5IGJyYWNlcy4nLFxuXHRcdFsgJ2JvZHknLCBbU3RhdGVtZW50XSBdKSxcblx0RXhwcmVzc2lvblN0YXRlbWVudCA9IHMoJ0V4cHJlc3Npb25TdGF0ZW1lbnQnLFxuXHRcdGBcblx0XHRcdEFuIGV4cHJlc3Npb24gc3RhdGVtZW50LCBpLmUuLCBhIHN0YXRlbWVudCBjb25zaXN0aW5nIG9mIGEgc2luZ2xlIGV4cHJlc3Npb24uXG5cdFx0XHRTZWUgXFxgZXNhc3QudXRpbCB0b1N0YXRlbWVudCB0b1N0YXRlbWVudHNcXGAuYCxcblx0XHRbICdleHByZXNzaW9uJywgRXhwcmVzc2lvbiBdKSxcblx0SWZTdGF0ZW1lbnQgPSBzKCdJZlN0YXRlbWVudCcsXG5cdFx0J0FuIGlmIChvciBpZiAuLi4gZWxzZSkgc3RhdGVtZW50LicsXG5cdFx0W1xuXHRcdFx0J3Rlc3QnLCBFeHByZXNzaW9uLFxuXHRcdFx0J2NvbnNlcXVlbnQnLCBTdGF0ZW1lbnQsXG5cdFx0XHQnYWx0ZXJuYXRlJywgTnVsbGFibGUoU3RhdGVtZW50KVxuXHRcdF0pLFxuXHRMYWJlbGVkU3RhdGVtZW50ID0gcygnTGFiZWxlZFN0YXRlbWVudCcsXG5cdFx0J0Egc3RhdGVtZW50IHByZWZpeGVkIGJ5IGEgbGFiZWwuJyxcblx0XHRbXG5cdFx0XHQnbGFiZWwnLCBJZGVudGlmaWVyLFxuXHRcdFx0J2JvZHknLCBTdGF0ZW1lbnRcblx0XHRdKSxcblx0QnJlYWtTdGF0ZW1lbnQgPSBzKCdCcmVha1N0YXRlbWVudCcsXG5cdFx0J1RoZSBgYnJlYWtgIGtleXdvcmQuJyxcblx0XHRbICdsYWJlbCcsIE51bGxhYmxlKElkZW50aWZpZXIpIF0pLFxuXHRDb250aW51ZVN0YXRlbWVudCA9IHMoJ0NvbnRpbnVlU3RhdGVtZW50Jyxcblx0XHQnVGhlIGBjb250aW51ZWAga2V5d29yZC4nLFxuXHRcdFsgJ2xhYmVsJywgTnVsbGFibGUoSWRlbnRpZmllcikgXSksXG5cdFN3aXRjaENhc2UgPSBuKCdTd2l0Y2hDYXNlJyxcblx0XHRgXG5cdFx0XHRBIHNpbmdsZSBcXGBjYXNlXFxgIHdpdGhpbiBhIFN3aXRjaFN0YXRlbWVudC5cblx0XHRcdElmIFxcYHRlc3RcXGAgaXMgXFxgbnVsbFxcYCwgdGhpcyBpcyB0aGUgXFxgZGVmYXVsdFxcYCBjYXNlLmAsXG5cdFx0W1xuXHRcdFx0J3Rlc3QnLCBOdWxsYWJsZShFeHByZXNzaW9uKSxcblx0XHRcdCdjb25zZXF1ZW50JywgW1N0YXRlbWVudF1cblx0XHRdKSxcblx0U3dpdGNoU3RhdGVtZW50ID0gcygnU3dpdGNoU3RhdGVtZW50Jyxcblx0XHQnT25seSB0aGUgbGFzdCBlbnRyeSBvZiBgY2FzZXNgIGlzIGFsbG93ZWQgdG8gYmUgYGRlZmF1bHRgLicsXG5cdFx0W1xuXHRcdFx0J2Rpc2NyaW1pbmFudCcsIEV4cHJlc3Npb24sXG5cdFx0XHQnY2FzZXMnLCBbU3dpdGNoQ2FzZV1cblx0XHRdKSxcblx0UmV0dXJuU3RhdGVtZW50ID0gcygnUmV0dXJuU3RhdGVtZW50Jyxcblx0XHQnVGhlIGByZXR1cm5gIGtleXdvcmQsIG9wdGlvbmFsbHkgZm9sbG93ZWQgYnkgYW4gRXhwcmVzc2lvbiB0byByZXR1cm4uJyxcblx0XHRbICdhcmd1bWVudCcsIE51bGxhYmxlKEV4cHJlc3Npb24pIF0pLFxuXHRUaHJvd1N0YXRlbWVudCA9IHMoJ1Rocm93U3RhdGVtZW50Jyxcblx0XHRgXG5cdFx0XHRUaGUgXFxgdGhyb3dcXGAga2V5d29yZCwgYW5kIHNvbWV0aGluZyB0byB0aHJvdy5cblx0XHRcdFNlZSBcXGBlc2FzdC51dGlsIHRocm93RXJyb3JcXGAuYCxcblx0XHRbICdhcmd1bWVudCcsIEV4cHJlc3Npb24gXSksXG5cblx0Q2F0Y2hDbGF1c2UgPSBuKCdDYXRjaENsYXVzZScsXG5cdFx0J011c3QgYmUgKnBhcnQqIG9mIGEgVHJ5U3RhdGVtZW50IC0tIGRvZXMgKm5vdCogZm9sbG93IGl0LicsXG5cdFx0W1xuXHRcdFx0J3BhcmFtJywgUGF0dGVybixcblx0XHRcdCdib2R5JywgQmxvY2tTdGF0ZW1lbnRcblx0XHRdKSxcblx0VHJ5U3RhdGVtZW50ID0gcygnVHJ5U3RhdGVtZW50Jyxcblx0XHQvLyBUT0RPOiBBc3NlcnQgaW4gcG9zdENvbnN0cnVjdFxuXHRcdCdBdCBsZWFzdCBvbmUgb2YgYGhhbmRsZXJgIG9yIGBmaW5hbGl6ZXJgIG11c3QgYmUgbm9uLW51bGwuJyxcblx0XHRbXG5cdFx0XHQnYmxvY2snLCBCbG9ja1N0YXRlbWVudCxcblx0XHRcdCdoYW5kbGVyJywgTnVsbGFibGUoQ2F0Y2hDbGF1c2UpLFxuXHRcdFx0J2ZpbmFsaXplcicsIE51bGxhYmxlKEJsb2NrU3RhdGVtZW50KVxuXHRcdF0pLFxuXHRXaGlsZVN0YXRlbWVudCA9IHMoJ1doaWxlU3RhdGVtZW50Jyxcblx0XHQnYHdoaWxlICh0ZXN0KSBib2R5YC4nLFxuXHRcdFtcblx0XHRcdCd0ZXN0JywgRXhwcmVzc2lvbixcblx0XHRcdCdib2R5JywgU3RhdGVtZW50XG5cdFx0XSksXG5cdERvV2hpbGVTdGF0ZW1lbnQgPSBzKCdEb1doaWxlU3RhdGVtZW50Jyxcblx0XHQvLyBUT0RPOiBOb3RlIHRoYXQgYm9keSBuZWVkcyBicmFjZXMhXG5cdFx0J2BkbyB7IGJvZHkgfSB3aGlsZSAodGVzdClgLicsXG5cdFx0W1xuXHRcdFx0J2JvZHknLCBTdGF0ZW1lbnQsXG5cdFx0XHQndGVzdCcsIEV4cHJlc3Npb25cblx0XHRdKSxcblx0Rm9yU3RhdGVtZW50ID0gcygnRm9yU3RhdGVtZW50Jyxcblx0XHRgXG5cdFx0XHRcXGBmb3IgKGluaXQ7IHRlc3Q7IHVwZGF0ZSkgYm9keVxcYC5cblx0XHRcdE5vdCB0byBiZSBjb25mdXNlZCB3aXRoIEZvckluU3RhdGVtZW50IG9yIEZvck9mU3RhdGVtZW50LmAsXG5cdFx0W1xuXHRcdFx0J2luaXQnLCBOdWxsYWJsZShVbmlvbihWYXJpYWJsZURlY2xhcmF0aW9uLCBFeHByZXNzaW9uKSksXG5cdFx0XHQndGVzdCcsIE51bGxhYmxlKEV4cHJlc3Npb24pLFxuXHRcdFx0J3VwZGF0ZScsIE51bGxhYmxlKEV4cHJlc3Npb24pLFxuXHRcdFx0J2JvZHknLCBTdGF0ZW1lbnRcblx0XHRdKSxcblx0Rm9ySW5TdGF0ZW1lbnQgPSBzKCdGb3JJblN0YXRlbWVudCcsXG5cdFx0J2Bmb3IgKGxlZnQgaW4gcmlnaHQpIGJvZHlgLicsXG5cdFx0W1xuXHRcdFx0J2xlZnQnLCBVbmlvbihWYXJpYWJsZURlY2xhcmF0aW9uLCBFeHByZXNzaW9uKSxcblx0XHRcdCdyaWdodCcsIEV4cHJlc3Npb24sXG5cdFx0XHQnYm9keScsIFN0YXRlbWVudFxuXHRcdF0pLFxuXHRGb3JPZlN0YXRlbWVudCA9IHMoJ0Zvck9mU3RhdGVtZW50Jyxcblx0XHQnYGZvciAobGVmdCBvZiByaWdodCkgYm9keWAuJyxcblx0XHRbXG5cdFx0XHQnbGVmdCcsIFVuaW9uKFZhcmlhYmxlRGVjbGFyYXRpb24sIEV4cHJlc3Npb24pLFxuXHRcdFx0J3JpZ2h0JywgRXhwcmVzc2lvbixcblx0XHRcdCdib2R5JywgU3RhdGVtZW50XG5cdFx0XSksXG5cdERlYnVnZ2VyU3RhdGVtZW50ID0gcygnRGVidWdnZXJTdGF0ZW1lbnQnLFxuXHRcdCdUaGUgYGRlYnVnZ2VyYCBrZXl3b3JkLicsXG5cdFx0WyBdKSxcblxuXHQvLyBEZWNsYXJhdGlvbnNcblx0RnVuY3Rpb24gPSBhYnN0cmFjdCgnRnVuY3Rpb24nLCBOb2RlLCAnRnVuY3Rpb25EZWNsYXJhdGlvbiBvciBGdW5jdGlvbkV4cHJlc3Npb24uJyksXG5cdC8vIFRPRE86IEZ1bmN0aW9uIHRvb1xuXHRGdW5jdGlvbkRlY2xhcmF0aW9uID0gZCgnRnVuY3Rpb25EZWNsYXJhdGlvbicsXG5cdFx0J1VubGlrZSBmb3IgRnVuY3Rpb25FeHByZXNzaW9uLCBpZCBtdXN0IG5vdCBiZSBudWxsLicsXG5cdFx0W1xuXHRcdFx0J2lkJywgSWRlbnRpZmllcixcblx0XHRcdCdwYXJhbXMnLCBbSWRlbnRpZmllcl0sXG5cdFx0XHQnYm9keScsIEJsb2NrU3RhdGVtZW50LFxuXHRcdFx0J2dlbmVyYXRvcicsIEJvb2xlYW5cblx0XHRdKSxcblxuXHQvLyBFeHByZXNzaW9uc1xuXHQvLyBUT0RPOiBMaXRlcmFsIGFzIGFic3RyYWN0IHR5cGVcblx0Ly8gVmFsdWU6IE51bWJlciB8IFN0cmluZyB8IG51bGwgfCBCb29sZWFuXG5cdExpdGVyYWwgPSBlKCdMaXRlcmFsJyxcblx0XHQnQSBsaXRlcmFsIHRva2VuLicsXG5cdFx0WyAndmFsdWUnLCBPYmplY3QgXSksXG5cdFRoaXNFeHByZXNzaW9uID0gZSgnVGhpc0V4cHJlc3Npb24nLFxuXHRcdCdUaGUgYHRoaXNgIGtleXdvcmQuJyxcblx0XHRbIF0pLFxuXHRBcnJheUV4cHJlc3Npb24gPSBlKCdBcnJheUV4cHJlc3Npb24nLFxuXHRcdCdBbiBhcnJheSBsaXRlcmFsLicsXG5cdFx0WyAnZWxlbWVudHMnLCBbTnVsbGFibGUoRXhwcmVzc2lvbildIF0pLFxuXHRQcm9wZXJ0eUtpbmQgPSBuZXdTZXQoWyAnaW5pdCcsICdnZXQnLCAnc2V0JyBdKSxcblx0UHJvcGVydHkgPSBuKCdQcm9wZXJ0eScsXG5cdFx0Ly8gVE9ETzpBU1NFUlRcblx0XHRgXG5cdFx0XHRQYXJ0IG9mIGFuIE9iamVjdEV4cHJlc3Npb24uXG5cdFx0XHRJZiBraW5kIGlzICdnZXQnIG9yICdzZXQnLCB0aGVuIHZhbHVlIHNob3VsZCBiZSBhIEZ1bmN0aW9uRXhwcmVzc2lvbi5gLFxuXHRcdFtcblx0XHRcdCdraW5kJywgUHJvcGVydHlLaW5kLFxuXHRcdFx0Ly8gVE9ETzogTGl0ZXJhbFN0cmluZyB8IExpdGVyYWxOdW1iZXJcblx0XHRcdCdrZXknLCBVbmlvbihMaXRlcmFsLCBJZGVudGlmaWVyKSxcblx0XHRcdCd2YWx1ZScsIEV4cHJlc3Npb25cblx0XHRdKSxcblx0T2JqZWN0RXhwcmVzc2lvbiA9IGUoJ09iamVjdEV4cHJlc3Npb24nLFxuXHRcdCdBbiBvYmplY3QgbGl0ZXJhbC4nLFxuXHRcdFsgJ3Byb3BlcnRpZXMnLCBbUHJvcGVydHldIF0pLFxuXHQvLyBUT0RPOiBJbmhlcml0cyBmcm9tIEZ1bmN0aW9uXG5cdEZ1bmN0aW9uRXhwcmVzc2lvbiA9IGUoJ0Z1bmN0aW9uRXhwcmVzc2lvbicsXG5cdFx0YFxuXHRcdFx0XFxgZnVuY3Rpb24gaWQocGFyYW1zKSBib2R5XFxgIG9yIFxcYGZ1bmN0aW9uKiBpZChwYXJhbXMpIGJvZHlcXGAuXG5cdFx0XHRGdW5jdGlvbiBpbiBhbiBleHByZXNzaW9uIHBvc2l0aW9uLlxuXHRcdFx0VG8gZGVjbGFyZSBhIGZ1bmN0aW9uLCB1c2UgRnVuY3Rpb25EZWNsYXJhdGlvbiwgbm90IEV4cHJlc3Npb25TdGF0ZW1lbnQuXG5cdFx0XHRTZWUgYWxzbyBcXGBlc2FzdC51dGlsIHRodW5rXFxgIGFuZCBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbi5gLFxuXHRcdFtcblx0XHRcdCdpZCcsIE51bGxhYmxlKElkZW50aWZpZXIpLFxuXHRcdFx0J3BhcmFtcycsIFtQYXR0ZXJuXSxcblx0XHRcdCdib2R5JywgQmxvY2tTdGF0ZW1lbnQsXG5cdFx0XHQnZ2VuZXJhdG9yJywgQm9vbGVhblxuXHRcdF0sXG5cdFx0e1xuXHRcdFx0cG9zdENvbnN0cnVjdCgpIHtcblx0XHRcdFx0dGhpcy5nZW5lcmF0b3IgPSBCb29sZWFuKHRoaXMuZ2VuZXJhdG9yKVxuXHRcdFx0fVxuXHRcdH0pLFxuXHQvLyBUT0RPOiBJbmhlcml0cyBmcm9tIEZ1bmN0aW9uXG5cdEFycm93RnVuY3Rpb25FeHByZXNzaW9uID0gZSgnQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24nLFxuXHRcdCdMaWtlIEZ1bmN0aW9uRXhwcmVzc2lvbiBidXQgdXNlcyB0aGUgYHBhcmFtcyA9PiBib2R5YCBmb3JtLicsXG5cdFx0W1xuXHRcdFx0J3BhcmFtcycsIFtQYXR0ZXJuXSxcblx0XHRcdCdib2R5JywgVW5pb24oQmxvY2tTdGF0ZW1lbnQsIEV4cHJlc3Npb24pXG5cdFx0XSksXG5cdFNlcXVlbmNlRXhwcmVzc2lvbiA9IGUoJ1NlcXVlbmNlRXhwcmVzc2lvbicsXG5cdFx0YFxuXHRcdFx0XFxgZXhwcmVzc2lvbnNbMF0sIGV4cHJlc3Npb25zWzFdLCAuLi5cXGAuXG5cdFx0XHRFeHByZXNzaW9uIGNvbXBvc2VkIG9mIG90aGVyIGV4cHJlc3Npb25zLCBzZXBhcmF0ZWQgYnkgdGhlIGNvbW1hIG9wZXJhdG9yLlxuXHRcdFx0Kk5vdCogZm9yIHBhcmFtZXRlciBsaXN0cy5gLFxuXHRcdFsgJ2V4cHJlc3Npb25zJywgWyBFeHByZXNzaW9uIF0gXSksXG5cdC8vIFRPRE86IHRlc3QgYC0gbmV3IFhgLiBQcm9iYWJseSBuZWVkIHBhcmVucyBhcm91bmQgYXJndW1lbnQuXG5cdFVuYXJ5T3BlcmF0b3IgPSBuZXdTZXQoWyAnLScsICcrJywgJyEnLCAnficsICd0eXBlb2YnLCAndm9pZCcsICdkZWxldGUnIF0pLFxuXHRVbmFyeUV4cHJlc3Npb24gPSBlKCdVbmFyeUV4cHJlc3Npb24nLFxuXHRcdCdgb3BlcmF0b3IgYXJndW1lbnRgLiBDYWxscyBhIHVuYXJ5IG9wZXJhdG9yLicsXG5cdFx0W1xuXHRcdFx0J29wZXJhdG9yJywgVW5hcnlPcGVyYXRvcixcblx0XHRcdCdhcmd1bWVudCcsIEV4cHJlc3Npb25cblx0XHRdKSxcblx0QmluYXJ5T3BlcmF0b3IgPSBuZXdTZXQoW1xuXHRcdCc9PScsICchPScsICc9PT0nLCAnIT09Jyxcblx0XHQnPCcsICc8PScsICc+JywgJz49Jyxcblx0XHQnPDwnLCAnPj4nLCAnPj4+Jyxcblx0XHQnKycsICctJywgJyonLCAnLycsICclJyxcblx0XHQnfCcsICdeJywgJyYnLCAnaW4nLFxuXHRcdCdpbnN0YW5jZW9mJ10pLFxuXHQvLyBUT0RPOiBSZW5kZXIgd2l0aCBwYXJlbnNcblx0QmluYXJ5RXhwcmVzc2lvbiA9IGUoJ0JpbmFyeUV4cHJlc3Npb24nLFxuXHRcdCdgbGVmdCBvcGVyYXRvciByaWdodGAuIENhbGxzIGEgYmluYXJ5IG9wZXJhdG9yLicsXG5cdFx0W1xuXHRcdFx0J29wZXJhdG9yJywgQmluYXJ5T3BlcmF0b3IsXG5cdFx0XHQnbGVmdCcsIEV4cHJlc3Npb24sXG5cdFx0XHQncmlnaHQnLCBFeHByZXNzaW9uXG5cdFx0XSksXG5cdEFzc2lnbm1lbnRPcGVyYXRvciA9IG5ld1NldChbXG5cdFx0Jz0nLCAnKz0nLCAnLT0nLCAnKj0nLCAnLz0nLCAnJT0nLFxuXHRcdCc8PD0nLCAnPj49JywgJz4+Pj0nLFxuXHRcdCd8PScsICdePScsICcmPSdcblx0XSksXG5cdEFzc2lnbm1lbnRFeHByZXNzaW9uID0gZSgnQXNzaWdubWVudEV4cHJlc3Npb24nLFxuXHRcdGBcblx0XHRcdFxcYGxlZnQgb3BlcmF0b3IgcmlnaHRcXGAuXG5cdFx0XHRNdXRhdGVzIGFuIGV4aXN0aW5nIHZhcmlhYmxlLlxuXHRcdFx0RG8gbm90IGNvbmZ1c2Ugd2l0aCBWYXJpYWJsZURlY2xhcmF0aW9uLmAsXG5cdFx0W1xuXHRcdFx0J29wZXJhdG9yJywgQXNzaWdubWVudE9wZXJhdG9yLFxuXHRcdFx0J2xlZnQnLCBQYXR0ZXJuLFxuXHRcdFx0J3JpZ2h0JywgRXhwcmVzc2lvblxuXHRcdF0pLFxuXHRVcGRhdGVPcGVyYXRvciA9IG5ld1NldChbICcrKycsICctLScgXSksXG5cdFVwZGF0ZUV4cHJlc3Npb24gPSBlKCdVcGRhdGVFeHByZXNzaW9uJyxcblx0XHQnYCsrYXJndW1lbnRgIG9yIGBhcmd1bWVudCsrYC4gSW5jcmVtZW50cyBvciBkZWNyZW1lbnRzIGEgbnVtYmVyLicsXG5cdFx0W1xuXHRcdFx0J29wZXJhdG9yJywgVXBkYXRlT3BlcmF0b3IsXG5cdFx0XHQnYXJndW1lbnQnLCBFeHByZXNzaW9uLFxuXHRcdFx0J3ByZWZpeCcsIEJvb2xlYW5cblx0XHRdKSxcblx0TG9naWNhbE9wZXJhdG9yID0gbmV3U2V0KFsgJ3x8JywgJyYmJyBdKSxcblx0TG9naWNhbEV4cHJlc3Npb24gPSBlKCdMb2dpY2FsRXhwcmVzc2lvbicsXG5cdFx0J2BsZWZ0IG9wZXJhdG9yIHJpZ2h0YC4gQ2FsbHMgYSBsYXp5IGxvZ2ljYWwgb3BlcmF0b3IuJyxcblx0XHRbXG5cdFx0XHQnb3BlcmF0b3InLCBMb2dpY2FsT3BlcmF0b3IsXG5cdFx0XHQnbGVmdCcsIEV4cHJlc3Npb24sXG5cdFx0XHQncmlnaHQnLCBFeHByZXNzaW9uXG5cdFx0XSksXG5cdENvbmRpdGlvbmFsRXhwcmVzc2lvbiA9IGUoJ0NvbmRpdGlvbmFsRXhwcmVzc2lvbicsXG5cdFx0J2B0ZXN0ID8gY29uc2VxdWVudCA6IGFsdGVybmF0ZWAuJyxcblx0XHRbXG5cdFx0XHQndGVzdCcsIEV4cHJlc3Npb24sXG5cdFx0XHQnY29uc2VxdWVudCcsIEV4cHJlc3Npb24sXG5cdFx0XHQnYWx0ZXJuYXRlJywgRXhwcmVzc2lvblxuXHRcdF0pLFxuXHROZXdFeHByZXNzaW9uID0gZSgnTmV3RXhwcmVzc2lvbicsXG5cdFx0J0p1c3QgbGlrZSBDYWxsRXhwcmVzc2lvbiBidXQgd2l0aCBgbmV3YCBpbiBmcm9udC4nLFxuXHRcdFtcblx0XHRcdCdjYWxsZWUnLCBFeHByZXNzaW9uLFxuXHRcdFx0J2FyZ3VtZW50cycsIFtFeHByZXNzaW9uXVxuXHRcdF0pLFxuXHRDYWxsRXhwcmVzc2lvbiA9IGUoJ0NhbGxFeHByZXNzaW9uJyxcblx0XHQnYGNhbGxlZShhcmd1bWVudHMpYC4nLFxuXHRcdFtcblx0XHRcdCdjYWxsZWUnLCBFeHByZXNzaW9uLFxuXHRcdFx0J2FyZ3VtZW50cycsIFtFeHByZXNzaW9uXVxuXHRcdF0pLFxuXHRTcHJlYWRFbGVtZW50ID0gbignU3ByZWFkRWxlbWVudCcsXG5cdFx0Jy4uLmFyZ3MgaW4gY2FsbCcsXG5cdFx0WyAnYXJndW1lbnQnLCBFeHByZXNzaW9uIF0pLFxuXHRNZW1iZXJFeHByZXNzaW9uID0gZSgnTWVtYmVyRXhwcmVzc2lvbicsXG5cdFx0Ly8gVE9ETzpBU1NFUlRcblx0XHRgXG5cdFx0XHRJZiBjb21wdXRlZCA9PT0gdHJ1ZSwgXFxgb2JqZWN0W3Byb3BlcnR5XVxcYC5cblx0XHRcdEVsc2UsIFxcYG9iamVjdC5wcm9wZXJ0eVxcYCAtLSBtZWFuaW5nIHByb3BlcnR5IHNob3VsZCBiZSBhbiBJZGVudGlmaWVyLmAsXG5cdFx0W1xuXHRcdFx0J29iamVjdCcsIEV4cHJlc3Npb24sXG5cdFx0XHQncHJvcGVydHknLCBFeHByZXNzaW9uLFxuXHRcdFx0J2NvbXB1dGVkJywgQm9vbGVhblxuXHRcdF0pLFxuXHRZaWVsZEV4cHJlc3Npb24gPSBlKCdZaWVsZEV4cHJlc3Npb24nLFxuXHRcdCdgeWllbGQgYXJndW1lbnRgIG9yIGB5aWVsZCogYXJndW1lbnRgLicsXG5cdFx0W1xuXHRcdFx0J2FyZ3VtZW50JywgRXhwcmVzc2lvbixcblx0XHRcdCdkZWxlZ2F0ZScsIEJvb2xlYW5cblx0XHRdKSxcblxuXHQvLyBUZW1wbGF0ZXNcblx0VGVtcGxhdGVFbGVtZW50ID0gbignVGVtcGxhdGVFbGVtZW50Jyxcblx0XHQnZG9jJyxcblx0XHRbXG5cdFx0XHQndGFpbCcsIEJvb2xlYW4sXG5cdFx0XHQvLyBUT0RPOiB7IGNvb2tlZDpTdHJpbmcsIHJhdzpTdHJpbmcgfSBkYXRhIHN0cnVjdHVyZVxuXHRcdFx0J3ZhbHVlJywgT2JqZWN0XG5cdFx0XSksXG5cdFRlbXBsYXRlTGl0ZXJhbCA9IGUoJ1RlbXBsYXRlTGl0ZXJhbCcsXG5cdFx0J2RvYycsXG5cdFx0W1xuXHRcdFx0J3F1YXNpcycsIFtUZW1wbGF0ZUVsZW1lbnRdLFxuXHRcdFx0J2V4cHJlc3Npb25zJywgW0V4cHJlc3Npb25dXG5cdFx0XSxcblx0XHR7XG5cdFx0XHRwb3N0Q29uc3RydWN0KCkge1xuXHRcdFx0XHRhc3NlcnQodGhpcy5xdWFzaXMubGVuZ3RoID09PSB0aGlzLmV4cHJlc3Npb25zLmxlbmd0aCArIDEpXG5cdFx0XHR9XG5cdFx0fSksXG5cdFRhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbiA9IGUoJ1RhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbicsXG5cdFx0J2RvYycsXG5cdFx0W1xuXHRcdFx0J3RhZycsIEV4cHJlc3Npb24sXG5cdFx0XHQncXVhc2knLCBUZW1wbGF0ZUxpdGVyYWxcblx0XHRdKSxcblxuXHQvLyBQYXR0ZXJuc1xuXHRBc3NpZ25tZW50UHJvcGVydHkgPSBtYWtlVHlwZShQcm9wZXJ0eSkoJ0Fzc2lnbm1lbnRQcm9wZXJ0eScsXG5cdFx0YFxuXHRcdFx0SnVzdCBsaWtlIGEgUHJvcGVydHksIGJ1dCBraW5kIGlzIGFsd2F5cyBcXGBpbml0XFxgLlxuXHRcdFx0QWx0aG91Z2ggdGVjaG5pY2FsbHkgaXRzIG93biB0eXBlLCBcXGBfLnR5cGVcXGAgd2lsbCBiZSAnUHJvcGVydHknLmAsXG5cdFx0WyAna2V5JywgSWRlbnRpZmllciwgJ3ZhbHVlJywgUGF0dGVybiBdLFxuXHRcdHtcblx0XHRcdHR5cGU6ICdQcm9wZXJ0eScsXG5cdFx0XHRtZXRob2Q6IGZhbHNlLFxuXHRcdFx0cG9zdENvbnN0cnVjdCgpIHtcblx0XHRcdFx0aWYgKHRoaXMudmFsdWUgPT09IG51bGwpXG5cdFx0XHRcdFx0dGhpcy52YWx1ZSA9IHRoaXMua2V5XG5cdFx0XHRcdHRoaXMua2luZCA9ICdpbml0J1xuXHRcdFx0fVxuXHRcdH0pLFxuXHRPYmplY3RQYXR0ZXJuID0gcCgnT2JqZWN0UGF0dGVybicsXG5cdFx0J2B7IGEsIGI6IGMgfSA9IC4uLmAuIE9iamVjdCBkZWNvbnN0cnVjdGluZyBwYXR0ZXJuLicsXG5cdFx0WyAncHJvcGVydGllcycsIFtBc3NpZ25tZW50UHJvcGVydHldIF0pLFxuXHRBcnJheVBhdHRlcm4gPSBwKCdBcnJheVBhdHRlcm4nLFxuXHRcdCdgWyBhLCBiIF0gPSAuLi5gLiBBcnJheSBkZWNvbnN0cnVjdGluZyBwYXR0ZXJuLicsXG5cdFx0WyAnZWxlbWVudHMnLCBbTnVsbGFibGUoUGF0dGVybildIF0pLFxuXHRSZXN0RWxlbWVudCA9IHAoJ1Jlc3RFbGVtZW50Jyxcblx0XHQvLyBUT0RPOlRFU1Rcblx0XHRgXG5cdFx0XHRDYW4gYmUgdGhlIGxhc3QgYXJndW1lbnQgdG8gYSBGdW5jdGlvbkV4cHJlc3Npb24vRnVuY3Rpb25EZWNsYXJhdGlvblxuXHRcdFx0b3IgIGdvIGF0IHRoZSBlbmQgb2YgYW4gQXJyYXlQYXR0ZXJuLmAsXG5cdFx0WyAnYXJndW1lbnQnLCBQYXR0ZXJuIF0pLFxuXG5cdC8vIFRPRE86IFdoYXQgaXMgdGhpcz9cblx0Ly8gQXNzaWdubWVudFBhdHRlcm4gPSBwKCdBc3NpZ25tZW50UGF0dGVybicsXG5cdC8vXHQnbGVmdCcsIFBhdHRlcm4sXG5cdC8vXHQncmlnaHQnLCBQYXR0ZXJuKSxcblxuXHRNZXRob2REZWZpbml0aW9uS2luZCA9IG5ld1NldChbICdjb25zdHJ1Y3RvcicsICdtZXRob2QnLCAnZ2V0JywgJ3NldCcgXSksXG5cdE1ldGhvZERlZmluaXRpb24gPSBuKCdNZXRob2REZWZpbml0aW9uJyxcblx0XHQvLyBUT0RPOkFzc2VydFxuXHRcdC8vIFRPRE86IHV0aWwgbWV0aG9kIGZvciBjb25zdHJ1Y3Rvci5cblx0XHRgXG5cdFx0XHRQYXJ0IG9mIGEgQ2xhc3NCb2R5LlxuXHRcdFx0SWYga2luZCBpcyAnY29uc3RydWN0b3InLCBrZXkgbXVzdCBiZSBJZGVudGlmaWVyKCdjb25zdHJ1Y3RvcicpLmAsXG5cdFx0W1xuXHRcdFx0J2tleScsIFVuaW9uKElkZW50aWZpZXIsIExpdGVyYWwpLFxuXHRcdFx0J3ZhbHVlJywgRnVuY3Rpb25FeHByZXNzaW9uLFxuXHRcdFx0J2tpbmQnLCBNZXRob2REZWZpbml0aW9uS2luZCxcblx0XHRcdCdzdGF0aWMnLCBCb29sZWFuLFxuXHRcdFx0J2NvbXB1dGVkJywgQm9vbGVhblxuXHRcdF0pLFxuXHRDbGFzc0JvZHkgPSBuKCdDbGFzc0JvZHknLFxuXHRcdCdDb250ZW50cyBvZiBhIENsYXNzLicsXG5cdFx0WyAnYm9keScsIFtNZXRob2REZWZpbml0aW9uXSBdKSxcblx0Q2xhc3MgPSBhYnN0cmFjdCgnQ2xhc3MnLCBOb2RlLFxuXHRcdCdDbGFzc0RlY2xhcmF0aW9uIG9yIENsYXNzRXhwcmVzc2lvbi4nKSxcblx0Ly8gVE9ETzogZXh0ZW5kcyBEZWNsYXJhdGlvbiB0b29cblx0Q2xhc3NEZWNsYXJhdGlvbiA9IG1ha2VUeXBlKENsYXNzKSgnQ2xhc3NEZWNsYXJhdGlvbicsXG5cdFx0J0NsYXNzIGluIGRlY2xhcmF0aW9uIHBvc2l0aW9uLicsXG5cdFx0W1xuXHRcdFx0J2lkJywgSWRlbnRpZmllcixcblx0XHRcdCdzdXBlckNsYXNzJywgTnVsbGFibGUoRXhwcmVzc2lvbiksXG5cdFx0XHQnYm9keScsIENsYXNzQm9keVxuXHRcdF0pLFxuXHRDbGFzc0V4cHJlc3Npb24gPSBtYWtlVHlwZShDbGFzcykoJ0NsYXNzRXhwcmVzc2lvbicsXG5cdFx0Ly8gVE9ETzogVGVzdCBjbGFzcyB3aXRoIG5vIHN1cGVyQ2xhc3Ncblx0XHQnQ2xhc3MgaW4gZXhwcmVzc2lvbiBwb3NpdGlvbi4nLFxuXHRcdFtcblx0XHRcdCdpZCcsIE51bGxhYmxlKElkZW50aWZpZXIpLFxuXHRcdFx0J3N1cGVyQ2xhc3MnLCBOdWxsYWJsZShFeHByZXNzaW9uKSxcblx0XHRcdCdib2R5JywgQ2xhc3NCb2R5XG5cdFx0XSksXG5cblx0TW9kdWxlU3BlY2lmaWVyID0gYWJzdHJhY3QoJ01vZHVsZVNwZWNpZmllcicsIE5vZGUsXG5cdFx0J0Egc3BlY2lmaWVyIGluIGFuIGltcG9ydCBvciBleHBvcnQgZGVjbGFyYXRpb24uJyksXG5cblx0SW1wb3J0U3BlY2lmaWVyQWJzdHJhY3QgPSBhYnN0cmFjdCgnSW1wb3J0U3BlY2lmaWVyQWJzdHJhY3QnLCBOb2RlLFxuXHRcdCdJbXBvcnRTcGVjaWZpZXIsIEltcG9ydERlZmF1bHRTcGVjaWZpZXIsIG9yIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllci4nKSxcblx0SW1wb3J0RGVjbGFyYXRpb24gPSBuKCdJbXBvcnREZWNsYXJhdGlvbicsXG5cdFx0Ly8gVE9ETzpBU1NFUlRcblx0XHRgXG5cdFx0XHRcXGBpbXBvcnQgc3BlY2lmaWVycyBmcm9tIHNvdXJjZVxcYC5cblx0XHRcdE9ubHkgb25lIHNwZWNpZmllciBtYXkgYmUgYSBJbXBvcnREZWZhdWx0U3BlY2lmaWVyLlxuXHRcdFx0SWYgdGhlcmUgaXMgYW4gSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyLCBpdCBtdXN0IGJlIHRoZSBvbmx5IHNwZWNpZmllci5gLFxuXHRcdFtcblx0XHRcdCdzcGVjaWZpZXJzJywgW0ltcG9ydFNwZWNpZmllckFic3RyYWN0XSxcblx0XHRcdC8vIFRPRE86IExpdGVyYWxTdHJpbmdcblx0XHRcdCdzb3VyY2UnLCBMaXRlcmFsXG5cdFx0XSksXG5cdEltcG9ydFNwZWNpZmllciA9IG1ha2VUeXBlKE1vZHVsZVNwZWNpZmllcikoJ0ltcG9ydFNwZWNpZmllcicsXG5cdFx0YFxuXHRcdFx0QSBub24tZGVmYXVsdCBpbXBvcnQuIFVzZWQgaW4gYW4gSW1wb3J0RGVjbGFyYXRpb24uXG5cdFx0XHRGb3IgXFxgaW1wb3J0IHsgYSB9IGZyb20gXCJzb3VyY2VcIlxcYCwganVzdCBwYXNzIG9uZSBhcmd1bWVudCBhbmQgbG9jYWwgd2lsbCA9IGltcG9ydGVkLlxuXHRcdFx0Rm9yIFxcYGltcG9ydCB7IGEgYXMgYiB9IGZyb20gXCJzb3VyY2VcIlxcYCwgbWFrZSBpbXBvcnRlZCBcXGBhXFxgIGFuZCBsb2NhbCBcXGBiXFxgLmAsXG5cdFx0W1xuXHRcdFx0J2ltcG9ydGVkJywgSWRlbnRpZmllcixcblx0XHRcdCdsb2NhbCcsIElkZW50aWZpZXJcblx0XHRdLFxuXHRcdHtcblx0XHRcdHBvc3RDb25zdHJ1Y3QoKSB7XG5cdFx0XHRcdGlmICh0aGlzLmxvY2FsID09PSBudWxsKVxuXHRcdFx0XHRcdHRoaXMubG9jYWwgPSB0aGlzLmltcG9ydGVkXG5cdFx0XHR9XG5cdFx0fSksXG5cdEltcG9ydERlZmF1bHRTcGVjaWZpZXIgPSBtYWtlVHlwZShJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCkoJ0ltcG9ydERlZmF1bHRTcGVjaWZpZXInLFxuXHRcdCdUaGUgZGVmYXVsdCBleHBvcnQsIGFzIGluIGBpbXBvcnQgYSBmcm9tIFwic291cmNlXCJgLicsXG5cdFx0WyAnbG9jYWwnLCBJZGVudGlmaWVyIF0pLFxuXHRJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIgPSBtYWtlVHlwZShJbXBvcnRTcGVjaWZpZXJBYnN0cmFjdCkoJ0ltcG9ydE5hbWVzcGFjZVNwZWNpZmllcicsXG5cdFx0J09iamVjdCBvZiBldmVyeSBleHBvcnQsIGFzIGluIGBpbXBvcnQgKiBhcyBhIGZyb20gXCJzb3VyY2VcImAuJyxcblx0XHRbICdsb2NhbCcsIElkZW50aWZpZXIgXSksXG5cblx0RXhwb3J0U3BlY2lmaWVyID0gXHRtYWtlVHlwZShNb2R1bGVTcGVjaWZpZXIpKCdFeHBvcnRTcGVjaWZpZXInLFxuXHRcdGBcblx0XHRcdEEgbm9uLWRlZmF1bHQgZXhwb3J0LiBVc2VkIGluIGFuIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24uXG5cdFx0XHRGb3IgXFxgZXhwb3J0IHsgYSB9IGZyb20gXCJzb3VyY2VcIlxcYCwganVzdCBwYXNzIG9uZSBhcmd1bWVudCBsb2NhbCB3aWxsID0gZXhwb3J0ZWQuXG5cdFx0XHRGb3IgXFxgZXhwb3J0IHsgYSBhcyBiIH1cXGAsIG1ha2UgZXhwb3J0ZWQgXFxgYlxcYCBhbmQgbG9jYWwgXFxgYVxcYC5gLFxuXHRcdFtcblx0XHRcdCdleHBvcnRlZCcsIElkZW50aWZpZXIsXG5cdFx0XHQnbG9jYWwnLCBJZGVudGlmaWVyXG5cdFx0XSxcblx0XHR7XG5cdFx0XHRwb3N0Q29uc3RydWN0KCkge1xuXHRcdFx0XHRpZiAodGhpcy5sb2NhbCA9PT0gbnVsbClcblx0XHRcdFx0XHR0aGlzLmxvY2FsID0gdGhpcy5leHBvcnRlZFxuXHRcdFx0fVxuXHRcdH0pLFxuXHRFeHBvcnROYW1lZERlY2xhcmF0aW9uID0gbignRXhwb3J0TmFtZWREZWNsYXJhdGlvbicsXG5cdFx0YFxuXHRcdFx0RXhwb3J0cyBtdWx0aXBsZSB2YWx1ZXMgYXMgaW4gXFxgZXhwb3J0IHsgYSwgYiBhcyBjIH1cXGAuXG5cdFx0XHRJZiBzb3VyY2UgIT09IG51bGwsXG5cdFx0XHRyZS1leHBvcnRzIGZyb20gdGhhdCBtb2R1bGUgYXMgaW4gXFxgZXhwb3J0IHsgLi4uIH0gZnJvbSBcInNvdXJjZVwiXFxgLmAsXG5cdFx0W1xuXHRcdFx0J2RlY2xhcmF0aW9uJywgTnVsbGFibGUoRGVjbGFyYXRpb24pLFxuXHRcdFx0J3NwZWNpZmllcnMnLCBbRXhwb3J0U3BlY2lmaWVyXSxcblx0XHRcdC8vIFRPRE86IExpdGVyYWxTdHJpbmdcblx0XHRcdCdzb3VyY2UnLCBOdWxsYWJsZShMaXRlcmFsKVxuXHRcdF0pLFxuXHRFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24gPSBuKCdFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24nLFxuXHRcdCdgZXhwb3J0IGRlZmF1bHQgZGVjbGFyYXRpb25gLicsXG5cdFx0W1xuXHRcdFx0J2RlY2xhcmF0aW9uJywgVW5pb24oRGVjbGFyYXRpb24sIEV4cHJlc3Npb24pXG5cdFx0XSksXG5cdEV4cG9ydEFsbERlY2xhcmF0aW9uID0gbignRXhwb3J0QWxsRGVjbGFyYXRpb24nLFxuXHRcdCdgZXhwb3J0ICogZnJvbSBzb3VyY2VgLicsXG5cdFx0Ly8gVE9ETzpMaXRlcmFsU3RyaW5nXG5cdFx0WyAnc291cmNlJywgTGl0ZXJhbCBdKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=