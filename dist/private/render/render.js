if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../ast', '../util', './source-map/source-node', './Rx'], function (exports, _ast, _util, _sourceMapSourceNode, _Rx) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _Rx2 = _interopRequire(_Rx);

	exports['default'] = function (ast) {
		var node = new _Rx2().render(ast);
		return new _sourceMapSourceNode.SourceNode(null, null, null, node).toString();
	};

	var renderWithSourceMap = function renderWithSourceMap(ast, inFilePath, outFilePath) {
		var node = new _Rx2(inFilePath).render(ast);
		return node.toStringWithSourceMap({ file: outFilePath });
	};

	exports.renderWithSourceMap = renderWithSourceMap;
	var rCall = function rCall(_, rx) {
		rx.e(_.callee);
		rx.paren(_.arguments);
	},
	    forInOf = function forInOf(_, rx) {
		rx.o('for (');
		rx.e(_.left);
		rx.o(_ instanceof _ast.ForInStatement ? ' in ' : ' of ');
		rx.e(_.right);
		rx.o(') ');
		rx.e(_.body);
	},
	    fun = function fun(_, rx) {
		rx.o(_.generator ? 'function*' : 'function');
		if (_.id !== null) {
			rx.o(' ');
			rx.e(_.id);
		}
		rx.paren(_.params);
		rx.o(' ');
		rx.e(_.body);
	},
	    arr = function arr(_, rx) {
		if (_util.isEmpty(_.elements)) rx.o('[ ]');else {
			rx.o('[ ');
			rx.interleave(_.elements, ', ');
			rx.o(' ]');
		}
	},
	    unary = function unary(rx, kind, argument) {
		rx.o(kind);
		rx.o(' ');
		rx.e(argument);
	},
	    binaryLeftRight = function binaryLeftRight(_, rx) {
		return binary(rx, _.operator, _.left, _.right);
	},
	    binary = function binary(rx, operator, left, right, noSpaces) {
		rx.e(left);
		if (!noSpaces) rx.o(' ');
		rx.o(operator);
		if (!noSpaces) rx.o(' ');
		rx.e(right);
	},
	    rClass = function rClass(_, rx) {
		rx.o('class ');
		if (_.id !== null) rx.e(_.id);
		if (_.superClass !== null) {
			rx.o(' extends ');
			rx.e(_.superClass);
		}
		rx.o(' ');
		rx.e(_.body);
	},
	    strEscape = function strEscape(str) {
		return '"' + str.replace(/[\\\"\n\t]/g, function (ch) {
			return strEscapes[ch];
		}) + '"';
	},
	    strEscapes = {
		'\\': '\\\\',
		'"': '\\"',
		'\n': '\\n',
		'\t': '\\t'
	};

	_util.implementMany(_ast, 'render', {
		Program: function Program(_, rx) {
			return rx.interleave(_.body, rx.snl);
		},
		Identifier: function Identifier(_, rx) {
			return rx.o(_.name);
		},

		// Statements
		EmptyStatement: function EmptyStatement() {},
		BlockStatement: function BlockStatement(_, rx) {
			return rx.block(_.body, rx.snl);
		},
		ExpressionStatement: function ExpressionStatement(_, rx) {
			return rx.e(_.expression);
		},
		IfStatement: function IfStatement(_, rx) {
			rx.o('if (');
			rx.e(_.test);
			rx.o(') ');
			rx.e(_.consequent);
			if (_.alternate !== null) {
				if (!(_.consequent instanceof _ast.BlockStatement)) rx.o(';');
				rx.o(' else ');
				rx.e(_.alternate);
			}
		},
		LabeledStatement: function LabeledStatement(_, rx) {
			return binary(rx, ': ', _.label, _.body, true);
		},
		BreakStatement: function BreakStatement(_, rx) {
			rx.o('break');
			if (_.label !== null) {
				rx.o(' ');
				rx.e(_.label);
			}
		},
		ContinueStatement: function ContinueStatement(_, rx) {
			rx.o('continue');
			if (_.label !== null) {
				rx.o(' ');
				rx.e(_.label);
			}
		},
		SwitchCase: function SwitchCase(_, rx) {
			if (_.test !== null) {
				rx.o('case ');
				rx.e(_.test);
			} else rx.o('default');
			rx.o(':');
			if (_.consequent.length === 1) {
				rx.o(' ');
				rx.e(_.consequent[0]);
			} else rx.indent(function () {
				rx.o(rx.nl);
				rx.interleave(_.consequent, rx.snl);
			});
		},
		SwitchStatement: function SwitchStatement(_, rx) {
			rx.o('switch (');
			rx.e(_.discriminant);
			rx.o(') ');
			rx.block(_.cases, rx.nl);
		},
		ReturnStatement: function ReturnStatement(_, rx) {
			if (_.argument !== null) unary(rx, 'return', _.argument);else rx.o('return');
		},
		ThrowStatement: function ThrowStatement(_, rx) {
			return unary(rx, 'throw', _.argument);
		},
		CatchClause: function CatchClause(_, rx) {
			rx.o(' catch (');
			rx.e(_.param);
			rx.o(') ');
			rx.e(_.body);
		},
		TryStatement: function TryStatement(_, rx) {
			rx.o('try ');
			rx.e(_.block);
			if (_.handler !== null) rx.e(_.handler);
			if (_.finalizer !== null) {
				rx.o(' finally ');
				rx.e(_.finalizer);
			}
		},
		WhileStatement: function WhileStatement(_, rx) {
			rx.o('while (');
			rx.e(_.test);
			rx.o(') ');
			rx.e(_.body);
		},
		DoWhileStatement: function DoWhileStatement(_, rx) {
			rx.o('do ');
			rx.e(_.body);
			rx.o(' while (');
			rx.e(_.test);
			rx.o(')');
		},
		ForStatement: function ForStatement(_, rx) {
			rx.o('for (');
			if (_.init !== null) rx.e(_.init);
			rx.o('; ');
			if (_.test !== null) rx.e(_.test);
			rx.o('; ');
			if (_.update !== null) rx.e(_.update);
			rx.o(') ');
			rx.e(_.body);
		},
		ForInStatement: forInOf,
		ForOfStatement: forInOf,
		DebuggerStatement: function DebuggerStatement(_, rx) {
			return rx.o('debugger');
		},

		// Declarations
		FunctionDeclaration: fun,
		VariableDeclarator: function VariableDeclarator(_, rx) {
			rx.e(_.id);
			if (_.init !== null) {
				rx.o(' = ');
				rx.e(_.init);
			}
		},
		VariableDeclaration: function VariableDeclaration(_, rx) {
			rx.o(_.kind);
			rx.o(' ');
			rx.interleave(_.declarations, ', ');
		},

		// Expressions
		ThisExpression: function ThisExpression(_, rx) {
			return rx.o('this');
		},
		ArrayExpression: arr,
		ObjectExpression: function ObjectExpression(_, rx) {
			if (_util.isEmpty(_.properties)) rx.o('{ }');else rx.block(_.properties, rx.cnl);
		},
		Property: function Property(_, rx) {
			if (_.kind === 'init') {
				rx.e(_.key);
				rx.o(': ');
				rx.e(_.value);
			} else {
				_util.assert(_.kind === 'get' || _.kind === 'set');
				rx.o(_.kind);
				rx.o(' ');
				rx.e(_.key);
				rx.paren(_.value.params);
				rx.o(' ');
				_util.assert(_.value instanceof _ast.FunctionExpression);
				_util.assert(_.value.id === null && !_.value.generator);
				rx.e(_.value.body);
			}
		},
		FunctionExpression: fun,
		ArrowFunctionExpression: function ArrowFunctionExpression(_, rx) {
			if (_.params.length === 1 && _.params[0] instanceof _ast.Identifier) rx.e(_.params[0]);else rx.paren(_.params);
			rx.o(' => ');
			rx.e(_.body);
		},
		SequenceExpression: function SequenceExpression(_, rx) {
			return rx.interleave(_.expressions, ', ');
		},
		UnaryExpression: function UnaryExpression(_, rx) {
			return unary(rx, _.operator, _.argument);
		},
		BinaryExpression: binaryLeftRight,
		AssignmentExpression: binaryLeftRight,
		UpdateExpression: function UpdateExpression(_, rx) {
			if (_.prefix) {
				rx.o(_.operator);
				rx.e(_.argument);
			} else {
				rx.e(_.argument);
				rx.o(_.operator);
			}
		},
		LogicalExpression: binaryLeftRight,
		ConditionalExpression: function ConditionalExpression(_, rx) {
			rx.e(_.test);
			rx.o(' ?');
			rx.indent(function () {
				rx.o(rx.nl);
				rx.e(_.consequent);
				rx.o(' :');
				rx.o(rx.nl);
				rx.e(_.alternate);
			});
		},
		NewExpression: function NewExpression(_, rx) {
			rx.o('new ');
			rCall(_, rx);
		},
		CallExpression: rCall,
		MemberExpression: function MemberExpression(_, rx) {
			rx.e(_.object);
			if (_.computed) {
				rx.o('[');
				rx.e(_.property);
				rx.o(']');
			} else {
				rx.o('.');
				rx.e(_.property);
			}
		},
		YieldExpression: function YieldExpression(_, rx) {
			rx.o('(');
			unary(rx, _.delegate ? 'yield*' : 'yield', _.argument);
			rx.o(')');
		},
		Literal: function Literal(_, rx) {
			if (_.value === null) rx.o('null');else if (typeof _.value === 'string') rx.o(strEscape(_.value));else rx.o(_.value.toString());
		},

		// Patterns
		AssignmentProperty: function AssignmentProperty(_, rx) {
			rx.e(_.key);
			if (_.key !== _.value) {
				rx.o(': ');
				rx.e(_.value);
			}
		},
		ObjectPattern: function ObjectPattern(_, rx) {
			rx.o('{ ');
			rx.interleave(_.properties, ', ');
			rx.o(' }');
		},
		ArrayPattern: arr,
		RestElement: function RestElement(_, rx) {
			rx.o('...');
			rx.e(_.argument);
		},

		MethodDefinition: function MethodDefinition(_, rx) {
			if (_['static']) rx.o('static ');

			var fun = _.value;
			// TODO
			_util.assert(!fun.generator);
			_util.assert(fun.id === null);
			var params = fun.params;
			var body = fun.body;

			var rKey = function rKey() {
				if (_.computed) {
					rx.o('[');
					rx.e(_.key);
					rx.o(']');
				} else rx.e(_.key);
			};

			switch (_.kind) {
				case 'constructor':
					_util.assert(_.key instanceof _ast.Identifier && _.key.name === 'constructor');
					rx.o('constructor');
					break;
				case 'method':
					rKey();
					break;
				case 'get':case 'set':
					rx.o(_.kind);
					rx.o(' ');
					rKey();
					break;
				default:
					throw new Error(_.kind);
			}

			rx.paren(params);
			rx.o(' ');
			rx.e(body);
		},

		ClassBody: function ClassBody(_, rx) {
			rx.block(_.body, '\n');
		},

		ClassDeclaration: rClass,
		ClassExpression: rClass,

		ImportDeclaration: function ImportDeclaration(_, rx) {
			rx.o('import ');

			var def = undefined,
			    namespace = undefined;
			var specifiers = [];
			_.specifiers.forEach(function (s) {
				if (s instanceof _ast.ImportDefaultSpecifier) if (def === undefined) def = s;else throw new Error('Multiple default imports');else if (s instanceof _ast.ImportNamespaceSpecifier) if (namespace === undefined) namespace = s;else throw new Error('Multiple namespace imports');else {
					_util.assert(s instanceof _ast.ImportSpecifier);
					specifiers.push(s);
				}
			});

			var needComma = false;
			if (def !== undefined) {
				rx.e(def);
				needComma = true;
			}
			if (namespace !== undefined) {
				if (needComma) rx.o(', ');
				rx.e(namespace);
				needComma = true;
			}
			if (!_util.isEmpty(specifiers)) {
				if (needComma) rx.o(', ');
				rx.o('{ ');
				rx.interleave(specifiers, ', ');
				rx.o(' }');
			}

			rx.o(' from ');
			rx.e(_.source);
		},
		ImportSpecifier: function ImportSpecifier(_, rx) {
			if (_.imported === _.local) rx.e(_.local);else {
				rx.e(_.imported);
				rx.o(' as ');
				rx.e(_.local);
			}
		},
		ImportDefaultSpecifier: function ImportDefaultSpecifier(_, rx) {
			rx.e(_.local);
		},
		ImportNamespaceSpecifier: function ImportNamespaceSpecifier(_, rx) {
			rx.o('* as ');
			rx.e(_.local);
		},

		ExportSpecifier: function ExportSpecifier(_, rx) {
			rx.e(_.local);
			if (_.exported !== _.local) {
				rx.o(' as ');
				rx.e(_.exported);
			}
		},
		ExportNamedDeclaration: function ExportNamedDeclaration(_, rx) {
			rx.o('export ');
			if (_.declaration !== null) {
				_util.assert(_util.isEmpty(_.specifiers));
				_util.assert(_.source === null);
				rx.e(_.declaration);
			} else {
				rx.o('{ ');
				rx.interleave(_.specifiers, ', ');
				rx.o(' }');
				if (_.source !== null) {
					rx.o(' from ');
					rx.e(_.source);
				}
			}
		},
		ExportDefaultDeclaration: function ExportDefaultDeclaration(_, rx) {
			rx.o('export default ');
			rx.e(_.declaration);
		},
		ExportAllDeclaration: function ExportAllDeclaration(_, rx) {
			rx.o('export * from ');
			rx.e(_.source);
		}
	});
});
//# sourceMappingURL=../../private/render/render.js.map