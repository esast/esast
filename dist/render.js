if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'source-map/lib/source-map/source-map-generator', './ast', './Loc', './private/util'], function (exports, _sourceMapLibSourceMapSourceMapGenerator, _ast, _Loc, _privateUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	exports['default'] = function (ast) {
		_privateUtil.type(ast, _ast.Node);
		init();
		e(ast);
		return strOut;
	};

	var renderWithSourceMap = function renderWithSourceMap(ast, inFilePath, outFilePath) {
		_privateUtil.type(ast, _ast.Node, inFilePath, String, outFilePath, String);
		init(inFilePath, outFilePath);
		e(ast);
		return { code: strOut, map: sourceMap };
	};

	exports.renderWithSourceMap = renderWithSourceMap;
	// Must init these all before rendering.
	var strOut = undefined,
	    indentAmount = undefined,
	    indentStr = undefined,
	    usingSourceMaps = undefined,
	    curAst = undefined,
	    inFilePath = undefined,
	    sourceMap = undefined,
	    outLine = undefined,
	    outColumn = undefined,
	    lastMappedAst = undefined,
	   
	// TODO: Option
	ugly = false;

	var
	// Renders a single expression.
	e = function e(ast) {
		if (usingSourceMaps) curAst = ast;
		ast.render();
	},
	   

	// str may not contain newlines.
	o = function o(str) {
		strOut = strOut + str;
		_mapStr(str);
	},
	    interleave = function interleave(asts, str) {
		if (!_privateUtil.isEmpty(asts)) {
			var maxI = asts.length - 1;
			for (var i = 0; i < maxI; i = i + 1) {
				e(asts[i]);
				o(str);
			}
			e(asts[maxI]);
		}
	},
	    paren = function paren(asts) {
		o('(');
		interleave(asts, ', ');
		o(')');
	},
	    block = function block(lines, lineSeparator) {
		if (_privateUtil.isEmpty(lines)) o('{ }');else {
			o('{');
			indent();
			nl();
			var maxI = lines.length - 1;
			for (var i = 0; i < maxI; i = i + 1) {
				e(lines[i]);
				o(lineSeparator);
				nl();
			}
			e(lines[maxI]);
			unindent();
			nl();
			o('}');
		}
	},
	    lines = (function (_lines) {
		function lines(_x) {
			return _lines.apply(this, arguments);
		}

		lines.toString = function () {
			return _lines.toString();
		};

		return lines;
	})(function (lines) {
		var maxI = lines.length - 1;
		for (var i = 0; i < maxI; i = i + 1) {
			e(lines[i]);
			o(';');
			nl();
		}
		e(lines[maxI]);
	}),
	    indentStrs = [''],
	    _setIndent = function _setIndent() {
		indentStr = indentStrs[indentAmount];
		while (indentStr === undefined) {
			indentStrs.push(_privateUtil.last(indentStrs) + '\t');
			indentStr = indentStrs[indentAmount];
		}
	},
	    indent = function indent() {
		if (!ugly) {
			indentAmount = indentAmount + 1;
			_setIndent();
		}
	},
	    unindent = function unindent() {
		if (!ugly) {
			indentAmount = indentAmount - 1;
			_setIndent();
		}
	},
	    nl = function nl() {
		if (!ugly) {
			strOut = strOut + '\n';
			_mapNewLine();
			o(indentStr);
		}
	},
	   

	// Private

	_mapStr = function _mapStr(str) {
		if (usingSourceMaps) {
			if (curAst !== lastMappedAst && curAst.loc !== undefined) {
				sourceMap.addMapping({
					source: inFilePath,
					original: curAst.loc.start,
					generated: _Loc.Pos(outLine, outColumn)
				});
				lastMappedAst = curAst;
			}
			outColumn = outColumn + str.length;
		}
	},
	    _mapNewLine = function _mapNewLine() {
		if (usingSourceMaps) {
			outLine = outLine + 1;
			outColumn = _Loc.StartColumn;
			// Mappings end at end of line. Must begin anew.
			lastMappedAst = null;
		}
	},
	    init = function init(inPath, outPath) {
		indentAmount = 0;
		_setIndent();
		strOut = '';
		usingSourceMaps = inPath !== undefined;
		if (usingSourceMaps) {
			inFilePath = inPath;
			sourceMap = new _sourceMapLibSourceMapSourceMapGenerator.SourceMapGenerator({ file: outPath });
			outLine = _Loc.StartLine;
			outColumn = _Loc.StartColumn;
			lastMappedAst = null;
		}
	};

	function fun() {
		o(this.generator ? 'function*' : 'function');
		if (this.id !== null) {
			o(' ');
			e(this.id);
		}
		paren(this.params);
		o(' ');
		e(this.body);
	}

	function arr() {
		if (_privateUtil.isEmpty(this.elements)) o('[ ]');else {
			o('[ ');
			interleave(this.elements, ', ');
			o(' ]');
		}
	}

	function rClass() {
		o('class ');
		if (this.id !== null) e(this.id);
		if (this.superClass !== null) {
			o(' extends ');
			e(this.superClass);
		}
		o(' ');
		e(this.body);
	}

	var unary = function unary(kind, argument) {
		o(kind);
		o(' ');
		e(argument);
	},
	    binary = function binary(operator, left, right) {
		e(left);
		if (!ugly) o(' ');
		o(operator);
		if (!ugly) o(' ');
		e(right);
	},
	    call = function call(_) {
		e(_.callee);
		paren(_.arguments);
	},
	    forInOf = function forInOf(_, kind) {
		o('for (');
		e(_.left);
		o(kind);
		e(_.right);
		o(') ');
		e(_.body);
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
		'\t': '\\t',
		'\b': '\\b',
		'\f': '\\f',
		'\u000b': '\\v',
		'\r': '\\r',
		'\u2028': '\\u2028',
		'\u2029': '\\u2029'
	};

	_privateUtil.implementMany(_ast, 'render', {
		Program: function Program() {
			lines(this.body);
		},

		Identifier: function Identifier() {
			o(this.name);
		},

		// Statements
		EmptyStatement: function EmptyStatement() {},
		BlockStatement: function BlockStatement() {
			block(this.body, ';');
		},
		ExpressionStatement: function ExpressionStatement() {
			e(this.expression);
		},
		IfStatement: function IfStatement() {
			o('if (');
			e(this.test);
			o(') ');
			e(this.consequent);
			if (this.alternate !== null) {
				if (!(this.consequent instanceof _ast.BlockStatement)) o(';');
				o(' else ');
				e(this.alternate);
			}
		},
		LabeledStatement: function LabeledStatement() {
			e(this.label);
			o(': ');
			e(this.body);
		},
		BreakStatement: function BreakStatement() {
			o('break');
			if (this.label !== null) {
				o(' ');
				e(this.label);
			}
		},
		ContinueStatement: function ContinueStatement() {
			o('continue');
			if (this.label !== null) {
				o(' ');
				e(this.label);
			}
		},
		SwitchCase: function SwitchCase() {
			if (this.test !== null) {
				o('case ');
				e(this.test);
			} else o('default');
			o(':');
			if (this.consequent.length === 1) {
				o(' ');
				e(this.consequent[0]);
			} else {
				indent();
				nl();
				lines(this.consequent);
				unindent();
			}
		},
		SwitchStatement: function SwitchStatement() {
			o('switch (');
			e(this.discriminant);
			o(') ');
			block(this.cases, '');
		},
		ReturnStatement: function ReturnStatement() {
			if (this.argument !== null) unary('return', this.argument);else o('return');
		},
		ThrowStatement: function ThrowStatement() {
			unary('throw', this.argument);
		},
		CatchClause: function CatchClause() {
			o(' catch (');
			e(this.param);
			o(') ');
			e(this.body);
		},
		TryStatement: function TryStatement() {
			o('try ');
			e(this.block);
			if (this.handler !== null) e(this.handler);
			if (this.finalizer !== null) {
				o(' finally ');
				e(this.finalizer);
			}
		},
		WhileStatement: function WhileStatement() {
			o('while (');
			e(this.test);
			o(') ');
			e(this.body);
		},
		DoWhileStatement: function DoWhileStatement() {
			o('do ');
			e(this.body);
			o(' while (');
			e(this.test);
			o(')');
		},
		ForStatement: function ForStatement() {
			o('for (');
			if (this.init !== null) e(this.init);
			o('; ');
			if (this.test !== null) e(this.test);
			o('; ');
			if (this.update !== null) e(this.update);
			o(') ');
			e(this.body);
		},
		ForInStatement: function ForInStatement() {
			forInOf(this, ' in ');
		},
		ForOfStatement: function ForOfStatement() {
			forInOf(this, ' of ');
		},
		DebuggerStatement: function DebuggerStatement() {
			o('debugger');
		},

		// Declarations
		FunctionDeclaration: fun,
		VariableDeclarator: function VariableDeclarator() {
			e(this.id);
			if (this.init !== null) {
				o(' = ');
				e(this.init);
			}
		},
		VariableDeclaration: function VariableDeclaration() {
			o(this.kind);
			o(' ');
			interleave(this.declarations, ', ');
		},

		// Expressions
		ThisExpression: function ThisExpression() {
			o('this');
		},
		ArrayExpression: arr,
		ObjectExpression: function ObjectExpression() {
			if (_privateUtil.isEmpty(this.properties)) o('{ }');else block(this.properties, ',');
		},
		Property: function Property() {
			if (this.kind === 'init') {
				e(this.key);
				o(': ');
				e(this.value);
			} else {
				_privateUtil.assert(this.kind === 'get' || this.kind === 'set');
				o(this.kind);
				o(' ');
				e(this.key);
				paren(this.value.params);
				o(' ');
				_privateUtil.assert(this.value instanceof _ast.FunctionExpression);
				_privateUtil.assert(this.value.id === null && !this.value.generator);
				e(this.value.body);
			}
		},
		FunctionExpression: fun,
		ArrowFunctionExpression: function ArrowFunctionExpression() {
			if (this.params.length === 1 && this.params[0] instanceof _ast.Identifier) e(this.params[0]);else paren(this.params);
			o(' => ');
			e(this.body);
		},
		SequenceExpression: function SequenceExpression() {
			interleave(this.expressions, ', ');
		},
		UnaryExpression: function UnaryExpression() {
			unary(this.operator, this.argument);
		},
		BinaryExpression: function BinaryExpression() {
			o('(');
			binary(this.operator, this.left, this.right);
			o(')');
		},
		AssignmentExpression: function AssignmentExpression() {
			binary(this.operator, this.left, this.right);
		},
		UpdateExpression: function UpdateExpression() {
			if (this.prefix) {
				o(this.operator);
				e(this.argument);
			} else {
				e(this.argument);
				o(this.operator);
			}
		},
		LogicalExpression: function LogicalExpression() {
			o('(');
			binary(this.operator, this.left, this.right);
			o(')');
		},
		ConditionalExpression: function ConditionalExpression() {
			e(this.test);
			o(' ?');
			indent();
			nl();
			e(this.consequent);
			o(' :');
			nl();
			e(this.alternate);
			unindent();
		},
		NewExpression: function NewExpression() {
			o('new ');
			call(this);
		},
		CallExpression: function CallExpression() {
			call(this);
		},
		MemberExpression: function MemberExpression() {
			e(this.object);
			if (this.computed) {
				o('[');
				e(this.property);
				o(']');
			} else {
				o('.');
				e(this.property);
			}
		},
		YieldExpression: function YieldExpression() {
			o('(');
			unary(this.delegate ? 'yield*' : 'yield', this.argument);
			o(')');
		},
		Literal: function Literal() {
			if (this.value === null) o('null');else if (typeof this.value === 'string') o(strEscape(this.value));else o(this.value.toString());
		},

		// Templates
		TemplateElement: function TemplateElement() {
			o(this.value.raw);
		},
		TemplateLiteral: function TemplateLiteral() {
			o('`');
			_privateUtil.assert(this.quasis.length === this.expressions.length + 1);
			e(this.quasis[0]);
			for (var i = 0; i < this.expressions.length; i = i + 1) {
				o('${');
				e(this.expressions[i]);
				o('}');
				e(this.quasis[i + 1]);
			}
			o('`');
		},
		TaggedTemplateExpression: function TaggedTemplateExpression() {
			e(this.tag);
			e(this.quasi);
		},

		// Patterns
		AssignmentProperty: function AssignmentProperty() {
			e(this.key);
			if (this.key !== this.value) {
				o(': ');
				e(this.value);
			}
		},
		ObjectPattern: function ObjectPattern() {
			o('{ ');
			interleave(this.properties, ', ');
			o(' }');
		},
		ArrayPattern: arr,
		RestElement: function RestElement() {
			o('...');
			e(this.argument);
		},

		MethodDefinition: function MethodDefinition() {
			var _this = this;

			if (this['static']) o('static ');

			var fun = this.value;
			// TODO
			_privateUtil.assert(!fun.generator);
			_privateUtil.assert(fun.id === null);
			var params = fun.params;
			var body = fun.body;

			var rKey = function rKey() {
				if (_this.computed) {
					o('[');
					e(_this.key);
					o(']');
				} else e(_this.key);
			};

			switch (this.kind) {
				case 'constructor':
					_privateUtil.assert(this.key instanceof _ast.Identifier && this.key.name === 'constructor');
					o('constructor');
					break;
				case 'method':
					rKey();
					break;
				case 'get':case 'set':
					o(this.kind);
					o(' ');
					rKey();
					break;
				default:
					throw new Error(this.kind);
			}

			paren(params);
			o(' ');
			e(body);
		},

		ClassBody: function ClassBody() {
			block(this.body, '');
		},

		ClassDeclaration: rClass,
		ClassExpression: rClass,

		ImportDeclaration: function ImportDeclaration() {
			o('import ');

			var def = undefined,
			    namespace = undefined;
			var specifiers = [];
			this.specifiers.forEach(function (s) {
				if (s instanceof _ast.ImportDefaultSpecifier) if (def === undefined) def = s;else throw new Error('Multiple default imports');else if (s instanceof _ast.ImportNamespaceSpecifier) if (namespace === undefined) namespace = s;else throw new Error('Multiple namespace imports');else {
					_privateUtil.assert(s instanceof _ast.ImportSpecifier);
					specifiers.push(s);
				}
			});

			var needComma = false;
			if (def !== undefined) {
				e(def);
				needComma = true;
			}
			if (namespace !== undefined) {
				if (needComma) o(', ');
				e(namespace);
				needComma = true;
			}
			if (!_privateUtil.isEmpty(specifiers)) {
				if (needComma) o(', ');
				o('{ ');
				interleave(specifiers, ', ');
				o(' }');
			}

			o(' from ');
			e(this.source);
		},
		ImportSpecifier: function ImportSpecifier() {
			if (this.imported === this.local) e(this.local);else {
				e(this.imported);
				o(' as ');
				e(this.local);
			}
		},
		ImportDefaultSpecifier: function ImportDefaultSpecifier() {
			e(this.local);
		},
		ImportNamespaceSpecifier: function ImportNamespaceSpecifier() {
			o('* as ');
			e(this.local);
		},

		ExportSpecifier: function ExportSpecifier() {
			e(this.local);
			if (this.exported !== this.local) {
				o(' as ');
				e(this.exported);
			}
		},
		ExportNamedDeclaration: function ExportNamedDeclaration() {
			o('export ');
			if (this.declaration !== null) {
				_privateUtil.assert(_privateUtil.isEmpty(this.specifiers));
				_privateUtil.assert(this.source === null);
				e(this.declaration);
			} else {
				o('{ ');
				interleave(this.specifiers, ', ');
				o(' }');
				if (this.source !== null) {
					o(' from ');
					e(this.source);
				}
			}
		},
		ExportDefaultDeclaration: function ExportDefaultDeclaration() {
			o('export default ');
			e(this.declaration);
		},
		ExportAllDeclaration: function ExportAllDeclaration() {
			o('export * from ');
			e(this.source);
		}
	});
});
//# sourceMappingURL=render.js.map