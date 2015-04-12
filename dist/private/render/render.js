if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../ast', '../util', './source-map/source-node', './Rx'], function (exports, module, _ast, _util, _sourceMapSourceNode, _Rx) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _Rx2 = _interopRequire(_Rx);

	// TODO: 'modulePath' parameter is kludge

	module.exports = function (ast, inFilePath, outFilePath) {
		var node = new _Rx2(inFilePath).render(ast);
		return outFilePath === undefined ? new _sourceMapSourceNode.SourceNode(null, null, null, node).toString() : node.toStringWithSourceMap({ file: outFilePath });
	};

	var rCall = function rCall(_, rx) {
		rx.e(_.callee);
		rx.o('(');
		rx.interleave(_.arguments, ', ');
		rx.o(')');
	};

	_util.implementMany(_ast, 'render', {
		Program: function Program(_, rx) {
			return rx.interleave(_.body, rx.snl);
		},
		Identifier: function Identifier(_, rx) {
			return rx.o(_.name);
		},
		BlockStatement: function BlockStatement(_, rx) {
			return rx.block(_.body, rx.snl);
		},
		FunctionExpression: function FunctionExpression(_, rx) {
			rx.o(_.generator ? 'function*' : 'function');
			if (_.id) {
				rx.o(' ');
				rx.e(_.id);
			}
			rx.o('(');
			rx.interleave(_.params, ', ');
			rx.o(') ');
			rx.e(_.body);
		},
		Literal: function Literal(_, rx) {
			if (_.value === null) rx.o('null');else if (typeof _.value === 'string') rx.o(strEscape(_.value));else rx.o(_.value.toString());
		},
		ThisExpression: function ThisExpression(_, rx) {
			return rx.o('this');
		},
		ArrayExpression: function ArrayExpression(_, rx) {
			rx.o('[ ');
			rx.interleave(_.elements, ', ');
			rx.o(' ]');
		},
		Property: function Property(_, rx) {
			if (_.kind === 'init') {
				rx.e(_.key);
				rx.o(': ');
				rx.e(_.value);
			} else {
				_util.assert(_.kind === 'get');
				rx.o('get ');
				rx.e(_.key);
				rx.o('() ');
				_util.assert(_.value instanceof _ast.FunctionExpression);
				_util.assert(_.value.id === null && _util.isEmpty(_.value.params) && !_.value.generator);
				rx.e(_.value.body);
			}
		},
		ObjectExpression: function ObjectExpression(_, rx) {
			if (_util.isEmpty(_.properties)) rx.o('{}');else rx.block(_.properties, rx.cnl);
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
		UnaryExpression: function UnaryExpression(_, rx) {
			return unary(rx, _.operator, _.argument);
		},
		BinaryExpression: function BinaryExpression(_, rx) {
			return binary(rx, _.operator, _.left, _.right);
		},
		AssignmentExpression: function AssignmentExpression(_, rx) {
			return binary(rx, _.operator, _.left, _.right);
		},
		YieldExpression: function YieldExpression(_, rx) {
			rx.o('(');
			unary(rx, _.delegate ? 'yield*' : 'yield', _.argument);
			rx.o(')');
		},
		VariableDeclarator: function VariableDeclarator(_, rx) {
			rx.e(_.id);
			rx.o(' = ');
			if (_.init) rx.e(_.init);
		},
		VariableDeclaration: function VariableDeclaration(_, rx) {
			rx.o(_.kind);
			rx.o(' ');
			rx.interleave(_.declarations, ', ');
		},
		ReturnStatement: function ReturnStatement(_, rx) {
			return unary(rx, 'return', _.argument);
		},
		ThrowStatement: function ThrowStatement(_, rx) {
			return unary(rx, 'throw', _.argument);
		},
		LabeledStatement: function LabeledStatement(_, rx) {
			return binary(rx, ': ', _.label, _.body);
		},
		WhileStatement: function WhileStatement(_, rx) {
			rx.o('while (');
			rx.e(_.test);
			rx.o(') ');
			rx.e(_.body);
		},
		DebuggerStatement: function DebuggerStatement(_, rx) {
			return rx.o('debugger');
		},
		ExpressionStatement: function ExpressionStatement(_, rx) {
			return rx.e(_.expression);
		},
		IfStatement: function IfStatement(_, rx) {
			rx.o('if (');
			rx.e(_.test);
			rx.o(') ');
			rx.e(_.consequent);
			if (_.alternate) {
				rx.o(' else ');
				rx.e(_.alternate);
			}
		},
		BreakStatement: function BreakStatement(_, rx) {
			rx.o('break');
			if (_.label) {
				rx.o(' ');
				rx.e(_.label);
			}
		},
		SwitchCase: function SwitchCase(_, rx) {
			if (_.test) {
				rx.o('case ');
				rx.e(_.test);
			} else rx.o('default');
			rx.o(':');
			if (_.consequent.length === 1) {
				rx.o(' ');
				rx.e(_.consequent[0]);
			} else {
				rx.indent(function () {
					rx.o(rx.nl);
					rx.interleave(_.consequent, rx.snl);
				});
				rx.o(rx.nl);
			}
		},
		SwitchStatement: function SwitchStatement(_, rx) {
			rx.o('switch (');
			rx.e(_.discriminant);
			rx.o(') ');
			rx.block(_.cases, rx.nl);
		}
	});

	var unary = function unary(rx, kind, argument) {
		rx.o(kind);
		rx.o(' ');
		rx.e(argument);
	};

	var binary = function binary(rx, kind, left, right) {
		rx.e(left);
		rx.o(' ');
		rx.o(kind);
		rx.o(' ');
		rx.e(right);
	};

	var strEscape = function strEscape(str) {
		return '"' + str.replace(/[\\"\n\t]/g, function (ch) {
			return strEscapes[ch];
		}) + '"';
	};
	var strEscapes = {
		'\\': '\\\\',
		'"': '\\"',
		'\n': '\\n',
		'\t': '\\t'
	};
});
//# sourceMappingURL=../../private/render/render.js.map