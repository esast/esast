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

	var ESNode = function ESNode() {
		_classCallCheck(this, ESNode);
	};

	exports.ESNode = ESNode;

	var Statement = (function (_ESNode) {
		function Statement() {
			_classCallCheck(this, Statement);

			if (_ESNode != null) {
				_ESNode.apply(this, arguments);
			}
		}

		_inherits(Statement, _ESNode);

		return Statement;
	})(ESNode);

	exports.Statement = Statement;

	var Expression = (function (_ESNode2) {
		function Expression() {
			_classCallCheck(this, Expression);

			if (_ESNode2 != null) {
				_ESNode2.apply(this, arguments);
			}
		}

		_inherits(Expression, _ESNode2);

		return Expression;
	})(ESNode);

	exports.Expression = Expression;

	var Declaration = (function (_ESNode3) {
		function Declaration() {
			_classCallCheck(this, Declaration);

			if (_ESNode3 != null) {
				_ESNode3.apply(this, arguments);
			}
		}

		_inherits(Declaration, _ESNode3);

		return Declaration;
	})(ESNode);

	exports.Declaration = Declaration;

	var Pattern = (function (_ESNode4) {
		function Pattern() {
			_classCallCheck(this, Pattern);

			if (_ESNode4 != null) {
				_ESNode4.apply(this, arguments);
			}
		}

		_inherits(Pattern, _ESNode4);

		return Pattern;
	})(ESNode);

	exports.Pattern = Pattern;

	var makeType = function makeType(superType) {
		return function (name) {
			for (var _len = arguments.length, namesTypes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				namesTypes[_key - 1] = arguments[_key];
			}

			var type = _tuple.apply(undefined, [name, superType].concat(namesTypes));
			Object.assign(type.prototype, {
				type: name,
				toString: function toString() {
					return JSON.stringify(_privateUtil.pAdd(this, 'type', name), null, 2);
				}
			});
			return type;
		};
	};
	var n = makeType(ESNode);
	var s = makeType(Statement);
	var e = makeType(Expression);

	// TODO
	var nullable = function nullable(_) {
		return _;
	};

	var Program = n('Program', 'body', [Statement]),
	    Identifier = n('Identifier', 'name', String),
	    BlockStatement = s('BlockStatement', 'body', [Statement]),
	   

	// Expressions
	FunctionExpression = e('FunctionExpression', 'id', Identifier, 'params', [Identifier], 'body', BlockStatement, 'generator', Boolean),
	   

	// Value: Number | String | null | Boolean
	Literal = e('Literal', 'value', Object),
	    ThisExpression = e('ThisExpression'),
	    ArrayExpression = e('ArrayExpression', 'elements', [Expression]),
	    Property = n('Property', 'kind', String, 'key', Object, 'value', Expression),
	    ObjectExpression = e('ObjectExpression', 'properties', [Property]),
	    NewExpression = e('NewExpression', 'callee', Expression, 'arguments', [Expression]),
	    CallExpression = e('CallExpression', 'callee', Expression, 'arguments', [Expression]),
	    MemberExpression = e('MemberExpression', 'object', Expression, 'property', Identifier, 'computed', Boolean),
	    UnaryExpression = e('UnaryExpression', 'operator', String, 'argument', Expression),
	    BinaryExpression = e('BinaryExpression', 'operator', String, 'left', Expression, 'right', Expression),
	    AssignmentExpression = e('AssignmentExpression', 'operator', String, 'left', Pattern, 'right', Expression),
	    YieldExpression = e('YieldExpression', 'argument', Expression, 'delegate', Boolean),
	    VariableDeclarator = n('VariableDeclarator', 'id', Identifier, 'init', Expression),
	    VariableDeclaration = s('VariableDeclaration', 'kind', String, 'declarations', [VariableDeclarator]),
	   

	// Statements
	ReturnStatement = s('ReturnStatement', 'argument', Expression),
	    ThrowStatement = s('ThrowStatement', 'argument', Expression),
	    LabeledStatement = s('LabeledStatement', 'label', Identifier, 'body', Statement),
	    WhileStatement = s('WhileStatement', 'test', Expression, 'body', Statement),
	    DebuggerStatement = s('DebuggerStatement'),
	    ExpressionStatement = s('ExpressionStatement', 'expression', Expression),
	    IfStatement = s('IfStatement', 'test', Expression, 'consequent', Statement, 'alternate', nullable(Statement)),
	    BreakStatement = s('BreakStatement', 'label', nullable(Identifier)),
	    SwitchCase = n('SwitchCase', 'test', Expression, 'consequent', [Statement]),
	    SwitchStatement = s('SwitchStatement', 'discriminant', Expression, 'cases', [SwitchCase], 'lexical', Boolean);
	exports.Program = Program;
	exports.Identifier = Identifier;
	exports.BlockStatement = BlockStatement;
	exports.FunctionExpression = FunctionExpression;
	exports.Literal = Literal;
	exports.ThisExpression = ThisExpression;
	exports.ArrayExpression = ArrayExpression;
	exports.Property = Property;
	exports.ObjectExpression = ObjectExpression;
	exports.NewExpression = NewExpression;
	exports.CallExpression = CallExpression;
	exports.MemberExpression = MemberExpression;
	exports.UnaryExpression = UnaryExpression;
	exports.BinaryExpression = BinaryExpression;
	exports.AssignmentExpression = AssignmentExpression;
	exports.YieldExpression = YieldExpression;
	exports.VariableDeclarator = VariableDeclarator;
	exports.VariableDeclaration = VariableDeclaration;
	exports.ReturnStatement = ReturnStatement;
	exports.ThrowStatement = ThrowStatement;
	exports.LabeledStatement = LabeledStatement;
	exports.WhileStatement = WhileStatement;
	exports.DebuggerStatement = DebuggerStatement;
	exports.ExpressionStatement = ExpressionStatement;
	exports.IfStatement = IfStatement;
	exports.BreakStatement = BreakStatement;
	exports.SwitchCase = SwitchCase;
	exports.SwitchStatement = SwitchStatement;
});
//# sourceMappingURL=ast.js.map