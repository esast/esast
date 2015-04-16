if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './Loc', './private/tuple', './private/util', './private/type'], function (exports, _Loc, _privateTuple, _privateUtil, _privateType) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _Loc2 = _interopRequire(_Loc);

	var _tuple = _interopRequire(_privateTuple);

	var Node = _privateTuple.abstract('Node', Object, 'Base type of all Asts.'),
	    Declaration = _privateTuple.abstract('Declaration', Node, 'Identifier declaration.'),
	    Statement = _privateTuple.abstract('Statement', Node, 'Blocks of code have lines that are Statements or Declarations.'),
	    Expression = _privateTuple.abstract('Expression', Node, 'Code that has a value. To use one in a statement position, see ExpressionStatement.'),
	    Pattern = _privateTuple.abstract('Pattern', Node, 'Can go in a parameter list or on the left side of an assignment.');

	exports.Node = Node;
	exports.Declaration = Declaration;
	exports.Statement = Statement;
	exports.Expression = Expression;
	exports.Pattern = Pattern;
	var makeType = function makeType(superType) {
		return function (name, doc, namesTypes, proto) {
			doc = _privateUtil.dedent(doc);
			var type = _tuple(name, superType, doc, namesTypes, proto);
			Object.assign(type.prototype, { type: name });
			return type;
		};
	};
	var n = makeType(Node),
	    s = makeType(Statement),
	    e = makeType(Expression),
	    d = makeType(Declaration),
	    p = makeType(Pattern);

	var Program = n('Program', 'A complete program source tree.', ['body', [Statement]]),
	    Identifier = n('Identifier', '\n\t\t\tA JavaScript identifier.\n\t\t\tIt is assumed that you have called `mangleIdentifier` as appropriate.\n\t\t\tAlso look at `esast.util idCached`,\n\t\t\twhich mangles and avoids constructing the same identifier twice.', ['name', String]),
	   

	// Statements
	EmptyStatement = s('EmptyStatement', '\n\t\t\tAn empty statement, i.e., a solitary semicolon.\n\t\t\tNot useful for code generation, but some parsers will return these.', []),
	    BlockStatement = s('BlockStatement', 'A block statement, i.e., a sequence of statements surrounded by braces.', ['body', [Statement]]),
	    ExpressionStatement = s('ExpressionStatement', '\n\t\t\tAn expression statement, i.e., a statement consisting of a single expression.\n\t\t\tSee `esast.util toStatement toStatements`.', ['expression', Expression]),
	    IfStatement = s('IfStatement', 'An if (or if ... else) statement.', ['test', Expression, 'consequent', Statement, 'alternate', _privateType.Nullable(Statement)]),
	    LabeledStatement = s('LabeledStatement', 'A statement prefixed by a label.', ['label', Identifier, 'body', Statement]),
	    BreakStatement = s('BreakStatement', 'The `break` keyword.', ['label', _privateType.Nullable(Identifier)]),
	    ContinueStatement = s('ContinueStatement', 'The `continue` keyword.', ['label', _privateType.Nullable(Identifier)]),
	    SwitchCase = n('SwitchCase', '\n\t\t\tA single `case` within a SwitchStatement.\n\t\t\tIf `test` is `null`, this is the `default` case.', ['test', _privateType.Nullable(Expression), 'consequent', [Statement]]),
	    SwitchStatement = s('SwitchStatement', 'Only the last entry of `cases` is allowed to be `default`.', ['discriminant', Expression, 'cases', [SwitchCase]]),
	    ReturnStatement = s('ReturnStatement', 'The `return` keyword, optionally followed by an Expression to return.', ['argument', _privateType.Nullable(Expression)]),
	    ThrowStatement = s('ThrowStatement', '\n\t\t\tThe `throw` keyword, and something to throw.\n\t\t\tSee `esast.util throwError`.', ['argument', Expression]),
	    CatchClause = n('CatchClause', 'Must be *part* of a TryStatement -- does *not* follow it.', ['param', Pattern, 'body', BlockStatement]),
	    TryStatement = s('TryStatement',
	// TODO: Assert in postConstruct
	'At least one of `handler` or `finalizer` must be non-null.', ['block', BlockStatement, 'handler', _privateType.Nullable(CatchClause), 'finalizer', _privateType.Nullable(BlockStatement)]),
	    WhileStatement = s('WhileStatement', '`while (test) body`.', ['test', Expression, 'body', Statement]),
	    DoWhileStatement = s('DoWhileStatement',
	// TODO: Note that body needs braces!
	'`do { body } while (test)`.', ['body', Statement, 'test', Expression]),
	    ForStatement = s('ForStatement', '\n\t\t\t`for (init; test; update) body`.\n\t\t\tNot to be confused with ForInStatement or ForOfStatement.', ['init', _privateType.Nullable(_privateType.Union(VariableDeclaration, Expression)), 'test', _privateType.Nullable(Expression), 'update', _privateType.Nullable(Expression), 'body', Statement]),
	    ForInStatement = s('ForInStatement', '`for (left in right) body`.', ['left', _privateType.Union(VariableDeclaration, Expression), 'right', Expression, 'body', Statement]),
	    ForOfStatement = s('ForOfStatement', '`for (left of right) body`.', ['left', _privateType.Union(VariableDeclaration, Expression), 'right', Expression, 'body', Statement]),
	    DebuggerStatement = s('DebuggerStatement', 'The `debugger` keyword.', []),
	   

	// Declarations
	Function = _privateTuple.abstract('Function', Node, 'FunctionDeclaration or FunctionExpression.'),
	   
	// TODO: Function too
	FunctionDeclaration = d('FunctionDeclaration', 'Unlike for FunctionExpression, id must not be null.', ['id', Identifier, 'params', [Identifier], 'body', BlockStatement, 'generator', Boolean]),
	    VariableDeclarator = n('VariableDeclarator', 'A single variable within a VariableDeclaration.', ['id', Pattern, 'init', _privateType.Nullable(Expression)]),
	    VariableDeclarationKind = new Set(['const', 'let', 'var']),
	    VariableDeclaration = d('VariableDeclaration',
	// TODO: Assert
	'\n\t\t\tDeclares and optionally initializes many variables.\n\t\t\tMust be at least one declaration.', ['kind', VariableDeclarationKind, 'declarations', [VariableDeclarator]]),
	   

	// Expressions
	ThisExpression = e('ThisExpression', 'The `this` keyword.', []),
	    ArrayExpression = e('ArrayExpression', 'An array literal.', ['elements', [_privateType.Nullable(Expression)]]),
	    PropertyKind = new Set(['init', 'get', 'set']),
	    Property = n('Property',
	// TODO:ASSERT
	'\n\t\t\tPart of an ObjectExpression.\n\t\t\tIf kind is \'get\' or \'set\', then value should be a FunctionExpression.', ['kind', PropertyKind,
	// TODO: LiteralString | LiteralNumber
	'key', _privateType.Union(Literal, Identifier), 'value', Expression]),
	    ObjectExpression = e('ObjectExpression', 'An object literal.', ['properties', [Property]]),
	   
	// TODO: Inherits from Function
	FunctionExpression = e('FunctionExpression', '\n\t\t\t`function id(params) body` or `function* id(params) body`.\n\t\t\tFunction in an expression position.\n\t\t\tTo declare a function, use FunctionDeclaration, not ExpressionStatement.\n\t\t\tSee also `esast.util thunk` and ArrowFunctionExpression.', ['id', _privateType.Nullable(Identifier), 'params', [Pattern], 'body', BlockStatement, 'generator', Boolean], {
		postConstruct: function postConstruct() {
			this.generator = Boolean(this.generator);
		}
	}),
	   
	// TODO: Inherits from Function
	ArrowFunctionExpression = e('ArrowFunctionExpression', 'Like FunctionExpression but uses the `params => body` form.', ['params', [Pattern], 'body', _privateType.Union(BlockStatement, Expression)]),
	    SequenceExpression = e('SequenceExpression', '\n\t\t\t`expressions[0], expressions[1], ...`.\n\t\t\tExpression composed of other expressions, separated by the comma operator.\n\t\t\t*Not* for parameter lists.', ['expressions', [Expression]]),
	   
	// TODO: test `- new X`. Probably need parens around argument.
	UnaryOperator = new Set(['-', '+', '!', '~', 'typeof', 'void', 'delete']),
	    UnaryExpression = e('UnaryExpression', '`operator argument`. Calls a unary operator.', ['operator', UnaryOperator, 'argument', Expression]),
	    BinaryOperator = new Set(['==', '!=', '===', '!==', '<', '<=', '>', '>=', '<<', '>>', '>>>', '+', '-', '*', '/', '%', '|', '^', '&', 'in', 'instanceof']),
	   
	// TODO: Render with parens
	BinaryExpression = e('BinaryExpression', '`left operator right`. Calls a binary operator.', ['operator', BinaryOperator, 'left', Expression, 'right', Expression]),
	    AssignmentOperator = new Set(['=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '|=', '^=', '&=']),
	    AssignmentExpression = e('AssignmentExpression', '\n\t\t\t`left operator right`.\n\t\t\tMutates an existing variable.\n\t\t\tDo not confuse with VariableDeclaration.', ['operator', AssignmentOperator, 'left', Pattern, 'right', Expression]),
	    UpdateOperator = new Set(['++', '--']),
	    UpdateExpression = e('UpdateExpression', '`++argument` or `argument++`. Increments or decrements a number.', ['operator', UpdateOperator, 'argument', Expression, 'prefix', Boolean]),
	    LogicalOperator = new Set(['||', '&&']),
	    LogicalExpression = e('LogicalExpression', '`left operator right`. Calls a lazy logical operator.', ['operator', LogicalOperator, 'left', Expression, 'right', Expression]),
	    ConditionalExpression = e('ConditionalExpression', '`test ? consequent : alternate`.', ['test', Expression, 'consequent', Expression, 'alternate', Expression]),
	    NewExpression = e('NewExpression', 'Just like CallExpression but with `new` in front.', ['callee', Expression, 'arguments', [Expression]]),
	    CallExpression = e('CallExpression', '`callee(arguments)`.', ['callee', Expression, 'arguments', [Expression]]),
	    MemberExpression = e('MemberExpression',
	// TODO:ASSERT
	'\n\t\t\tIf computed === true, `object[property]`.\n\t\t\tElse, `object.property` -- meaning property should be an Identifier.', ['object', Expression, 'property', Expression, 'computed', Boolean]),
	    YieldExpression = e('YieldExpression', '`yield argument` or `yield* argument`.', ['argument', Expression, 'delegate', Boolean]),
	   
	// TODO: Literal as abstract type
	// Value: Number | String | null | Boolean
	Literal = e('Literal', 'A literal token.', ['value', Object]),
	   

	// Templates
	// TODO: test, document
	TemplateElement = n('TemplateElement', 'doc', ['tail', Boolean,
	// TODO:estree spec says { cooked, value }, but acorn uses { cooked, raw }
	// TODO: { cooked:String, raw:String } data structure
	'value', Object]),
	    TemplateLiteral = e('TemplateLiteral', 'doc', ['quasis', [TemplateElement], 'expressions', [Expression]]),
	    TaggedTemplateExpression = e('TaggedTemplateExpression', 'doc', ['tag', Expression, 'quasi', TemplateLiteral]),
	   

	// Patterns
	AssignmentProperty = makeType(Property)('AssignmentProperty', '\n\t\t\tJust like a Property, but kind is always `init`.\n\t\t\tAlthough technically its own type, `_.type` will be \'Property\'.', ['key', Identifier, 'value', Pattern], {
		type: 'Property',
		method: false,
		postConstruct: function postConstruct() {
			if (this.value === null) this.value = this.key;
			this.kind = 'init';
		}
	}),
	    ObjectPattern = p('ObjectPattern', '`{ a, b: c } = ...`. Object deconstructing pattern.', ['properties', [AssignmentProperty]]),
	    ArrayPattern = p('ArrayPattern', '`[ a, b ] = ...`. Array deconstructing pattern.', ['elements', [_privateType.Nullable(Pattern)]]),
	    RestElement = p('RestElement',
	// TODO:TEST
	'\n\t\t\tCan be the last argument to a FunctionExpression/FunctionDeclaration\n\t\t\tor  go at the end of an ArrayPattern.', ['argument', Pattern]),
	   
	// TODO: What is this?
	// AssignmentPattern = p('AssignmentPattern',
	//	'left', Pattern,
	//	'right', Pattern),

	MethodDefinitionKind = new Set(['constructor', 'method', 'get', 'set']),
	    MethodDefinition = n('MethodDefinition',
	// TODO:Assert
	// TODO: util method for constructor.
	'\n\t\t\tPart of a ClassBody.\n\t\t\tIf kind is \'constructor\', key must be Identifier(\'constructor\').', ['key', Identifier, 'value', FunctionExpression, 'kind', MethodDefinitionKind, 'static', Boolean, 'computed', Boolean]),
	    ClassBody = n('ClassBody', 'Contents of a Class.', ['body', [MethodDefinition]]),
	    Class = _privateTuple.abstract('Class', Node, 'ClassDeclaration or ClassExpression.'),
	   
	// TODO: extends Declaration too
	ClassDeclaration = makeType(Class)('ClassDeclaration', 'Class in declaration position.', ['id', Identifier, 'superClass', _privateType.Nullable(Expression), 'body', ClassBody]),
	    ClassExpression = makeType(Class)('ClassExpression',
	// TODO: Test class with no superClass
	'Class in expression position.', ['id', _privateType.Nullable(Identifier), 'superClass', _privateType.Nullable(Expression), 'body', ClassBody]),
	    ModuleSpecifier = _privateTuple.abstract('ModuleSpecifier', Node, 'A specifier in an import or export declaration.'),
	    ImportSpecifierAbstract = _privateTuple.abstract('ImportSpecifierAbstract', Node, 'ImportSpecifier, ImportDefaultSpecifier, or ImportNamespaceSpecifier.'),
	    ImportDeclaration = n('ImportDeclaration',
	// TODO:ASSERT
	'\n\t\t\t`import specifiers from source`.\n\t\t\tOnly one specifier may be a ImportDefaultSpecifier.\n\t\t\tIf there is an ImportNamespaceSpecifier, it must be the only specifier.', ['specifiers', [ImportSpecifierAbstract],
	// TODO: LiteralString
	'source', Literal]),
	    ImportSpecifier = makeType(ModuleSpecifier)('ImportSpecifier', '\n\t\t\tA non-default import. Used in an ImportDeclaration.\n\t\t\tFor `import { a } from "source"`, just pass one argument and local will = imported.\n\t\t\tFor `import { a as b } from "source"`, make imported `a` and local `b`.', ['imported', Identifier, 'local', Identifier], {
		postConstruct: function postConstruct() {
			if (this.local === null) this.local = this.imported;
		}
	}),
	    ImportDefaultSpecifier = makeType(ImportSpecifierAbstract)('ImportDefaultSpecifier', 'The default export, as in `import a from "source"`.', ['local', Identifier]),
	    ImportNamespaceSpecifier = makeType(ImportSpecifierAbstract)('ImportNamespaceSpecifier', 'Object of every export, as in `import * as a from "source"`.', ['local', Identifier]),
	    ExportSpecifier = makeType(ModuleSpecifier)('ExportSpecifier', '\n\t\t\tA non-default export. Used in an ExportNamedDeclaration.\n\t\t\tFor `export { a } from "source"`, just pass one argument local will = exported.\n\t\t\tFor `export { a as b }`, make exported `b` and local `a`.', ['exported', Identifier, 'local', Identifier], {
		postConstruct: function postConstruct() {
			if (this.local === null) this.local = this.exported;
		}
	}),
	    ExportNamedDeclaration = n('ExportNamedDeclaration', '\n\t\t\tExports multiple values as in `export { a, b as c }`.\n\t\t\tIf source !== null,\n\t\t\tre-exports from that module as in `export { ... } from "source"`.', ['declaration', _privateType.Nullable(Declaration), 'specifiers', [ExportSpecifier],
	// TODO: LiteralString
	'source', _privateType.Nullable(Literal)]),
	    ExportDefaultDeclaration = n('ExportDefaultDeclaration', '`export default declaration`.', ['declaration', _privateType.Union(Declaration, Expression)]),
	    ExportAllDeclaration = n('ExportAllDeclaration', '`export * from source`.',
	// TODO:LiteralString
	['source', Literal]);
	exports.Program = Program;
	exports.Identifier = Identifier;
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
	exports.VariableDeclarator = VariableDeclarator;
	exports.VariableDeclarationKind = VariableDeclarationKind;
	exports.VariableDeclaration = VariableDeclaration;
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
	exports.MemberExpression = MemberExpression;
	exports.YieldExpression = YieldExpression;
	exports.Literal = Literal;
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
//# sourceMappingURL=ast.js.map