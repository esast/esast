if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../ast', '../util', './source-map/source-node', './Rx'], function (exports, _ast, _util, _sourceMapSourceNode, _Rx) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _Rx2 = _interopRequire(_Rx);

	exports['default'] = function (ast) {
		var rx = new _Rx2();
		rx.e(ast);
		return rx.finish();
	};

	var renderWithSourceMap = function renderWithSourceMap(ast, inFilePath, outFilePath) {
		var rx = new _Rx2(inFilePath, outFilePath);
		rx.e(ast);
		return { code: rx.finish(), map: rx.map };
	};

	exports.renderWithSourceMap = renderWithSourceMap;
	function rCall(rx) {
		rx.e(this.callee);
		rx.paren(this.arguments);
	}

	function forInOf(rx) {
		rx.o('for (');
		rx.e(this.left);
		rx.o(this instanceof _ast.ForInStatement ? ' in ' : ' of ');
		rx.e(this.right);
		rx.o(') ');
		rx.e(this.body);
	}

	function fun(rx) {
		rx.o(this.generator ? 'function*' : 'function');
		if (this.id !== null) {
			rx.o(' ');
			rx.e(this.id);
		}
		rx.paren(this.params);
		rx.o(' ');
		rx.e(this.body);
	}

	function arr(rx) {
		if (_util.isEmpty(this.elements)) rx.o('[ ]');else {
			rx.o('[ ');
			rx.interleave(this.elements, ', ');
			rx.o(' ]');
		}
	}

	function unary(rx, kind, argument) {
		rx.o(kind);
		rx.o(' ');
		rx.e(argument);
	}

	var binary = function binary(rx, operator, left, right, noSpaces) {
		rx.e(left);
		if (!noSpaces) rx.o(' ');
		rx.o(operator);
		if (!noSpaces) rx.o(' ');
		rx.e(right);
	};

	function rClass(rx) {
		rx.o('class ');
		if (this.id !== null) rx.e(this.id);
		if (this.superClass !== null) {
			rx.o(' extends ');
			rx.e(this.superClass);
		}
		rx.o(' ');
		rx.e(this.body);
	}

	var strEscape = function strEscape(str) {
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
		Program: function Program(rx) {
			rx.lines(this.body);
		},

		Identifier: function Identifier(rx) {
			rx.o(this.name);
		},

		// Statements
		EmptyStatement: function EmptyStatement() {},
		BlockStatement: function BlockStatement(rx) {
			rx.block(this.body, ';');
		},
		ExpressionStatement: function ExpressionStatement(rx) {
			rx.e(this.expression);
		},
		IfStatement: function IfStatement(rx) {
			rx.o('if (');
			rx.e(this.test);
			rx.o(') ');
			rx.e(this.consequent);
			if (this.alternate !== null) {
				if (!(this.consequent instanceof _ast.BlockStatement)) rx.o(';');
				rx.o(' else ');
				rx.e(this.alternate);
			}
		},
		LabeledStatement: function LabeledStatement(rx) {
			binary(rx, ': ', this.label, this.body, true);
		},
		BreakStatement: function BreakStatement(rx) {
			rx.o('break');
			if (this.label !== null) {
				rx.o(' ');
				rx.e(this.label);
			}
		},
		ContinueStatement: function ContinueStatement(rx) {
			rx.o('continue');
			if (this.label !== null) {
				rx.o(' ');
				rx.e(this.label);
			}
		},
		SwitchCase: function SwitchCase(rx) {
			var _this = this;

			if (this.test !== null) {
				rx.o('case ');
				rx.e(this.test);
			} else rx.o('default');
			rx.o(':');
			if (this.consequent.length === 1) {
				rx.o(' ');
				rx.e(this.consequent[0]);
			} else rx.indent(function () {
				rx.nl();
				rx.lines(_this.consequent);
			});
		},
		SwitchStatement: function SwitchStatement(rx) {
			rx.o('switch (');
			rx.e(this.discriminant);
			rx.o(') ');
			rx.block(this.cases, '');
		},
		ReturnStatement: function ReturnStatement(rx) {
			if (this.argument !== null) unary(rx, 'return', this.argument);else rx.o('return');
		},
		ThrowStatement: function ThrowStatement(rx) {
			unary(rx, 'throw', this.argument);
		},
		CatchClause: function CatchClause(rx) {
			rx.o(' catch (');
			rx.e(this.param);
			rx.o(') ');
			rx.e(this.body);
		},
		TryStatement: function TryStatement(rx) {
			rx.o('try ');
			rx.e(this.block);
			if (this.handler !== null) rx.e(this.handler);
			if (this.finalizer !== null) {
				rx.o(' finally ');
				rx.e(this.finalizer);
			}
		},
		WhileStatement: function WhileStatement(rx) {
			rx.o('while (');
			rx.e(this.test);
			rx.o(') ');
			rx.e(this.body);
		},
		DoWhileStatement: function DoWhileStatement(rx) {
			rx.o('do ');
			rx.e(this.body);
			rx.o(' while (');
			rx.e(this.test);
			rx.o(')');
		},
		ForStatement: function ForStatement(rx) {
			rx.o('for (');
			if (this.init !== null) rx.e(this.init);
			rx.o('; ');
			if (this.test !== null) rx.e(this.test);
			rx.o('; ');
			if (this.update !== null) rx.e(this.update);
			rx.o(') ');
			rx.e(this.body);
		},
		ForInStatement: forInOf,
		ForOfStatement: forInOf,
		DebuggerStatement: function DebuggerStatement(rx) {
			rx.o('debugger');
		},

		// Declarations
		FunctionDeclaration: fun,
		VariableDeclarator: function VariableDeclarator(rx) {
			rx.e(this.id);
			if (this.init !== null) {
				rx.o(' = ');
				rx.e(this.init);
			}
		},
		VariableDeclaration: function VariableDeclaration(rx) {
			rx.o(this.kind);
			rx.o(' ');
			rx.interleave(this.declarations, ', ');
		},

		// Expressions
		ThisExpression: function ThisExpression(rx) {
			rx.o('this');
		},
		ArrayExpression: arr,
		ObjectExpression: function ObjectExpression(rx) {
			if (_util.isEmpty(this.properties)) rx.o('{ }');else rx.block(this.properties, ',');
		},
		Property: function Property(rx) {
			if (this.kind === 'init') {
				rx.e(this.key);
				rx.o(': ');
				rx.e(this.value);
			} else {
				_util.assert(this.kind === 'get' || this.kind === 'set');
				rx.o(this.kind);
				rx.o(' ');
				rx.e(this.key);
				rx.paren(this.value.params);
				rx.o(' ');
				_util.assert(this.value instanceof _ast.FunctionExpression);
				_util.assert(this.value.id === null && !this.value.generator);
				rx.e(this.value.body);
			}
		},
		FunctionExpression: fun,
		ArrowFunctionExpression: function ArrowFunctionExpression(rx) {
			if (this.params.length === 1 && this.params[0] instanceof _ast.Identifier) rx.e(this.params[0]);else rx.paren(this.params);
			rx.o(' => ');
			rx.e(this.body);
		},
		SequenceExpression: function SequenceExpression(rx) {
			rx.interleave(this.expressions, ', ');
		},
		UnaryExpression: function UnaryExpression(rx) {
			unary(rx, this.operator, this.argument);
		},
		BinaryExpression: function BinaryExpression(rx) {
			rx.o('(');
			binary(rx, this.operator, this.left, this.right);
			rx.o(')');
		},
		AssignmentExpression: function AssignmentExpression(rx) {
			binary(rx, this.operator, this.left, this.right);
		},
		UpdateExpression: function UpdateExpression(rx) {
			if (this.prefix) {
				rx.o(this.operator);
				rx.e(this.argument);
			} else {
				rx.e(this.argument);
				rx.o(this.operator);
			}
		},
		LogicalExpression: function LogicalExpression(rx) {
			rx.o('(');
			binary(rx, this.operator, this.left, this.right);
			rx.o(')');
		},
		ConditionalExpression: function ConditionalExpression(rx) {
			var _this2 = this;

			rx.e(this.test);
			rx.o(' ?');
			rx.indent(function () {
				rx.nl();
				rx.e(_this2.consequent);
				rx.o(' :');
				rx.nl();
				rx.e(_this2.alternate);
			});
		},
		NewExpression: function NewExpression(rx) {
			rx.o('new ');
			rCall.call(this, rx);
		},
		CallExpression: rCall,
		MemberExpression: function MemberExpression(rx) {
			rx.e(this.object);
			if (this.computed) {
				rx.o('[');
				rx.e(this.property);
				rx.o(']');
			} else {
				rx.o('.');
				rx.e(this.property);
			}
		},
		YieldExpression: function YieldExpression(rx) {
			rx.o('(');
			unary(rx, this.delegate ? 'yield*' : 'yield', this.argument);
			rx.o(')');
		},
		Literal: function Literal(rx) {
			if (this.value === null) rx.o('null');else if (typeof this.value === 'string') rx.o(strEscape(this.value));else rx.o(this.value.toString());
		},

		// Templates
		TemplateElement: function TemplateElement(rx) {
			rx.o(this.value.raw);
		},
		TemplateLiteral: function TemplateLiteral(rx) {
			rx.o('`');
			_util.assert(this.quasis.length === this.expressions.length + 1);
			rx.e(this.quasis[0]);
			for (var i = 0; i < this.expressions.length; i = i + 1) {
				rx.o('${');
				rx.e(this.expressions[i]);
				rx.o('}');
				rx.e(this.quasis[i + 1]);
			}
			rx.o('`');
		},
		TaggedTemplateExpression: function TaggedTemplateExpression(rx) {
			rx.e(this.tag);
			rx.e(this.quasi);
		},

		// Patterns
		AssignmentProperty: function AssignmentProperty(rx) {
			rx.e(this.key);
			if (this.key !== this.value) {
				rx.o(': ');
				rx.e(this.value);
			}
		},
		ObjectPattern: function ObjectPattern(rx) {
			rx.o('{ ');
			rx.interleave(this.properties, ', ');
			rx.o(' }');
		},
		ArrayPattern: arr,
		RestElement: function RestElement(rx) {
			rx.o('...');
			rx.e(this.argument);
		},

		MethodDefinition: function MethodDefinition(rx) {
			var _this3 = this;

			if (this['static']) rx.o('static ');

			var fun = this.value;
			// TODO
			_util.assert(!fun.generator);
			_util.assert(fun.id === null);
			var params = fun.params;
			var body = fun.body;

			var rKey = function rKey() {
				if (_this3.computed) {
					rx.o('[');
					rx.e(_this3.key);
					rx.o(']');
				} else rx.e(_this3.key);
			};

			switch (this.kind) {
				case 'constructor':
					_util.assert(this.key instanceof _ast.Identifier && this.key.name === 'constructor');
					rx.o('constructor');
					break;
				case 'method':
					rKey();
					break;
				case 'get':case 'set':
					rx.o(this.kind);
					rx.o(' ');
					rKey();
					break;
				default:
					throw new Error(this.kind);
			}

			rx.paren(params);
			rx.o(' ');
			rx.e(body);
		},

		ClassBody: function ClassBody(rx) {
			rx.block(this.body, '');
		},

		ClassDeclaration: rClass,
		ClassExpression: rClass,

		ImportDeclaration: function ImportDeclaration(rx) {
			rx.o('import ');

			var def = undefined,
			    namespace = undefined;
			var specifiers = [];
			this.specifiers.forEach(function (s) {
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
			rx.e(this.source);
		},
		ImportSpecifier: function ImportSpecifier(rx) {
			if (this.imported === this.local) rx.e(this.local);else {
				rx.e(this.imported);
				rx.o(' as ');
				rx.e(this.local);
			}
		},
		ImportDefaultSpecifier: function ImportDefaultSpecifier(rx) {
			rx.e(this.local);
		},
		ImportNamespaceSpecifier: function ImportNamespaceSpecifier(rx) {
			rx.o('* as ');
			rx.e(this.local);
		},

		ExportSpecifier: function ExportSpecifier(rx) {
			rx.e(this.local);
			if (this.exported !== this.local) {
				rx.o(' as ');
				rx.e(this.exported);
			}
		},
		ExportNamedDeclaration: function ExportNamedDeclaration(rx) {
			rx.o('export ');
			if (this.declaration !== null) {
				_util.assert(_util.isEmpty(this.specifiers));
				_util.assert(this.source === null);
				rx.e(this.declaration);
			} else {
				rx.o('{ ');
				rx.interleave(this.specifiers, ', ');
				rx.o(' }');
				if (this.source !== null) {
					rx.o(' from ');
					rx.e(this.source);
				}
			}
		},
		ExportDefaultDeclaration: function ExportDefaultDeclaration(rx) {
			rx.o('export default ');
			rx.e(this.declaration);
		},
		ExportAllDeclaration: function ExportAllDeclaration(rx) {
			rx.o('export * from ');
			rx.e(this.source);
		}
	});
});
//# sourceMappingURL=../../private/render/render.js.map