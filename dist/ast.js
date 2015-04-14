if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './Loc', './private/tuple', './private/util'], function (exports, _Loc, _privateTuple, _privateUtil) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _Loc2 = _interopRequire(_Loc);

	var _tuple = _interopRequire(_privateTuple);

	var Node = function Node() {
		_classCallCheck(this, Node);
	};

	exports.Node = Node;

	var Statement = (function (_Node) {
		function Statement() {
			_classCallCheck(this, Statement);

			if (_Node != null) {
				_Node.apply(this, arguments);
			}
		}

		_inherits(Statement, _Node);

		return Statement;
	})(Node);

	exports.Statement = Statement;

	var Expression = (function (_Node2) {
		function Expression() {
			_classCallCheck(this, Expression);

			if (_Node2 != null) {
				_Node2.apply(this, arguments);
			}
		}

		_inherits(Expression, _Node2);

		return Expression;
	})(Node);

	exports.Expression = Expression;

	var Function = (function (_Node3) {
		function Function() {
			_classCallCheck(this, Function);

			if (_Node3 != null) {
				_Node3.apply(this, arguments);
			}
		}

		_inherits(Function, _Node3);

		return Function;
	})(Node);

	exports.Function = Function;

	var Declaration = (function (_Node4) {
		function Declaration() {
			_classCallCheck(this, Declaration);

			if (_Node4 != null) {
				_Node4.apply(this, arguments);
			}
		}

		_inherits(Declaration, _Node4);

		return Declaration;
	})(Node);

	exports.Declaration = Declaration;

	var Pattern = (function (_Node5) {
		function Pattern() {
			_classCallCheck(this, Pattern);

			if (_Node5 != null) {
				_Node5.apply(this, arguments);
			}
		}

		_inherits(Pattern, _Node5);

		return Pattern;
	})(Node);

	exports.Pattern = Pattern;

	var makeType = function makeType(superType) {
		return function (name) {
			for (var _len = arguments.length, namesTypes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				namesTypes[_key - 1] = arguments[_key];
			}

			var type = _tuple.apply(undefined, [name, superType].concat(namesTypes));
			Object.assign(type.prototype, { type: name });
			return type;
		};
	};
	var n = makeType(Node),
	    s = makeType(Statement),
	    e = makeType(Expression);

	// TODO
	var nullable = function nullable(_) {
		return _;
	};
	var union = function union(a, b) {
		return b;
	};

	var proto = function proto(_, protoProps) {
		Object.assign(_.prototype, protoProps);
		return _;
	};

	var UnaryOperator = new Set(['-', '+', '!', '~', 'typeof', 'void', 'delete']),
	    BinaryOperator = new Set(['==', '!=', '===', '!==', '<', '<=', '>', '>=', '<<', '>>', '>>>', '+', '-', '*', '/', '%', '|', '^', '&', 'in', 'instanceof']),
	    LogicalOperator = new Set(['||', '&&']),
	    AssignmentOperator = new Set(['=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '|=', '^=', '&=']),
	    UpdateOperator = new Set(['++', '--']),
	    MethodDefinitionKind = new Set(['constructor', 'method', 'get', 'set']),
	    PropertyKind = new Set(['init', 'get', 'set']);

	exports.UnaryOperator = UnaryOperator;
	exports.BinaryOperator = BinaryOperator;
	exports.LogicalOperator = LogicalOperator;
	exports.AssignmentOperator = AssignmentOperator;
	exports.UpdateOperator = UpdateOperator;
	exports.MethodDefinitionKind = MethodDefinitionKind;
	exports.PropertyKind = PropertyKind;
	var Program = n('Program', 'body', [Statement]),
	    Identifier = n('Identifier', 'name', String),
	   

	// Statements
	EmptyStatement = s('EmptyStatement'),
	    BlockStatement = s('BlockStatement', 'body', [Statement]),
	    ExpressionStatement = s('ExpressionStatement', 'expression', Expression),
	    IfStatement = s('IfStatement', 'test', Expression, 'consequent', Statement, 'alternate', nullable(Statement)),
	    LabeledStatement = s('LabeledStatement', 'label', Identifier, 'body', Statement),
	    BreakStatement = s('BreakStatement', 'label', nullable(Identifier)),
	    ContinueStatement = s('ContinueStatement', 'label', nullable(Identifier)),
	    SwitchCase = n('SwitchCase', 'test', Expression, 'consequent', [Statement]),
	    SwitchStatement = s('SwitchStatement', 'discriminant', Expression, 'cases', [SwitchCase], 'lexical', Boolean),
	    ReturnStatement = s('ReturnStatement', 'argument', Expression),
	    ThrowStatement = s('ThrowStatement', 'argument', Expression),
	    CatchClause = n('CatchClause', 'param', Pattern, 'body', BlockStatement),
	    TryStatement = s('TryStatement', 'block', BlockStatement, 'handler', nullable(CatchClause), 'finalizer', nullable(BlockStatement)),
	    WhileStatement = s('WhileStatement', 'test', Expression, 'body', Statement),
	    DoWhileStatement = s('DoWhileStatement', 'body', Statement, 'test', Expression),
	    ForStatement = s('ForStatement', 'init', nullable(union(VariableDeclaration, Expression)), 'test', nullable(Expression), 'update', nullable(Expression), 'body', Statement),
	    ForInStatement = s('ForInStatement', 'left', union(VariableDeclaration, Expression), 'right', Expression, 'body', Statement),
	    ForOfStatement = s('ForOfStatement', 'left', union(VariableDeclaration, Expression), 'right', Expression, 'body', Statement),
	    DebuggerStatement = s('DebuggerStatement'),
	   

	// Declarations
	// TODO: Function too
	FunctionDeclaration = makeType(Declaration)('FunctionDeclaration', 'id', Identifier, 'params', [Identifier], 'body', BlockStatement, 'generator', Boolean),
	    VariableDeclarator = n('VariableDeclarator', 'id', Pattern, 'init', Expression),
	    VariableDeclaration = makeType(Declaration)('VariableDeclaration', 'kind', String, 'declarations', [VariableDeclarator]),
	   

	// Expressions
	ThisExpression = e('ThisExpression'),
	    ArrayExpression = e('ArrayExpression', 'elements', [Expression]),
	    Property = n('Property', 'kind', PropertyKind,
	// TODO: LiteralString | LiteralNumber
	'key', union(Literal, Identifier), 'value', Expression),
	    ObjectExpression = e('ObjectExpression', 'properties', [Property]),
	   
	// TODO: Inherits from Function
	FunctionExpression = proto(e('FunctionExpression', 'id', Identifier, 'params', [Identifier], 'body', BlockStatement, 'generator', Boolean), {
		postConstruct: function postConstruct() {
			this.generator = Boolean(this.generator);
		}
	}),
	   
	// TODO: Inherits from Function
	ArrowFunctionExpression = e('ArrowExpression', 'params', [Pattern], 'body', union(BlockStatement, Expression)),
	    SequenceExpression = e('SequenceExpression', 'expressions', [Expression]),
	    UnaryExpression = e('UnaryExpression', 'operator', UnaryOperator, 'argument', Expression),
	    BinaryExpression = e('BinaryExpression', 'operator', BinaryOperator, 'left', Expression, 'right', Expression),
	    AssignmentExpression = e('AssignmentExpression', 'operator', AssignmentOperator, 'left', Pattern, 'right', Expression),
	    UpdateExpression = e('UpdateExpression', 'operator', UpdateOperator, 'argument', Expression, 'prefix', Boolean),
	    LogicalExpression = e('LogicalExpression', 'operator', LogicalOperator, 'left', Expression, 'right', Expression),
	    ConditionalExpression = e('ConditionalExpression', 'test', Expression, 'consequent', Expression, 'alternate', Expression),
	    NewExpression = e('NewExpression', 'callee', Expression, 'arguments', [Expression]),
	    CallExpression = e('CallExpression', 'callee', Expression, 'arguments', [Expression]),
	    MemberExpression = e('MemberExpression', 'object', Expression, 'property', Identifier, 'computed', Boolean),
	    YieldExpression = e('YieldExpression', 'argument', Expression, 'delegate', Boolean),
	   
	// TODO: Literal as abstract type
	// Value: Number | String | null | Boolean
	Literal = e('Literal', 'value', Object),
	   

	// Patterns
	AssignmentProperty = proto(makeType(Property)('AssignmentProperty', 'key', Identifier, 'value', Pattern), {
		type: 'Property',
		kind: 'init',
		method: false,
		postConstruct: function postConstruct() {
			if (this.value === null) this.value = this.key;
			this.kind = 'init';
		}
	}),
	    ObjectPattern = makeType(Pattern)('ObjectPattern', 'properties', [AssignmentProperty]),
	    ArrayPattern = makeType(Pattern)('ArrayPattern', 'elements', [nullable(Pattern)]),
	    RestElement = makeType(Pattern)('RestElement', 'argument', Pattern),
	   
	// TODO: What is this?
	// AssignmentPattern = p('AssignmentPattern',
	//	'left', Pattern,
	//	'right', Pattern),

	MethodDefinition = n('MethodDefinition', 'key', Identifier, 'value', FunctionExpression, 'kind', MethodDefinitionKind, 'static', Boolean, 'computed', Boolean),
	    ClassBody = n('ClassBody', 'body', [MethodDefinition]),
	    Class = (function (_Node6) {
		function Class() {
			_classCallCheck(this, Class);

			if (_Node6 != null) {
				_Node6.apply(this, arguments);
			}
		}

		_inherits(Class, _Node6);

		return Class;
	})(Node),
	   
	// TODO: extends Declaration too
	ClassDeclaration = makeType(Class)('ClassDeclaration', 'id', Identifier, 'superClass', Expression, 'body', ClassBody),
	    ClassExpression = makeType(Class)('ClassExpression', 'id', Identifier, 'superClass', Expression, 'body', ClassBody),
	    ModuleSpecifier = (function (_Node7) {
		function ModuleSpecifier() {
			_classCallCheck(this, ModuleSpecifier);

			if (_Node7 != null) {
				_Node7.apply(this, arguments);
			}
		}

		_inherits(ModuleSpecifier, _Node7);

		return ModuleSpecifier;
	})(Node),
	    ImportSpecifierAbstract = (function (_Node8) {
		function ImportSpecifierAbstract() {
			_classCallCheck(this, ImportSpecifierAbstract);

			if (_Node8 != null) {
				_Node8.apply(this, arguments);
			}
		}

		_inherits(ImportSpecifierAbstract, _Node8);

		return ImportSpecifierAbstract;
	})(Node),
	    ImportDeclaration = n('ImportDeclaration', 'specifiers', [ImportSpecifierAbstract],
	// TODO: LiteralString
	'source', Literal),
	    ImportSpecifier = proto(makeType(ModuleSpecifier)('ImportSpecifier', 'imported', Identifier, 'local', Identifier), {
		postConstruct: function postConstruct() {
			if (this.local === null) this.local = this.imported;
		}
	}),
	    ImportDefaultSpecifier = makeType(ImportSpecifierAbstract)('ImportDefaultSpecifier', 'local', Identifier),
	    ImportNamespaceSpecifier = makeType(ImportSpecifierAbstract)('ImportNamespaceSpecifier', 'local', Identifier),
	    ExportSpecifier = proto(makeType(ModuleSpecifier)('ExportSpecifier', 'exported', Identifier, 'local', Identifier), {
		postConstruct: function postConstruct() {
			if (this.local === null) this.local = this.exported;
		}
	}),
	    ExportNamedDeclaration = n('ExportNamedDeclaration', 'declaration', nullable(Declaration), 'specifiers', [ExportSpecifier],
	// TODO: LiteralString
	'source', nullable(Literal)),
	    ExportDefaultDeclaration = n('ExportDefaultDeclaration', 'declaration', union(Declaration, Expression)),
	    ExportAllDeclaration = n('ExportAllDeclaration',
	// TODO:LiteralString
	'source', Literal);
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
	exports.FunctionDeclaration = FunctionDeclaration;
	exports.VariableDeclarator = VariableDeclarator;
	exports.VariableDeclaration = VariableDeclaration;
	exports.ThisExpression = ThisExpression;
	exports.ArrayExpression = ArrayExpression;
	exports.Property = Property;
	exports.ObjectExpression = ObjectExpression;
	exports.FunctionExpression = FunctionExpression;
	exports.ArrowFunctionExpression = ArrowFunctionExpression;
	exports.SequenceExpression = SequenceExpression;
	exports.UnaryExpression = UnaryExpression;
	exports.BinaryExpression = BinaryExpression;
	exports.AssignmentExpression = AssignmentExpression;
	exports.UpdateExpression = UpdateExpression;
	exports.LogicalExpression = LogicalExpression;
	exports.ConditionalExpression = ConditionalExpression;
	exports.NewExpression = NewExpression;
	exports.CallExpression = CallExpression;
	exports.MemberExpression = MemberExpression;
	exports.YieldExpression = YieldExpression;
	exports.Literal = Literal;
	exports.AssignmentProperty = AssignmentProperty;
	exports.ObjectPattern = ObjectPattern;
	exports.ArrayPattern = ArrayPattern;
	exports.RestElement = RestElement;
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