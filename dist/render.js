'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'source-map/dist/source-map.min', './ast', './Loc'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('source-map/dist/source-map.min'), require('./ast'), require('./Loc'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.sourceMap, global.ast, global.Loc);
		global.render = mod.exports;
	}
})(this, function (exports, _sourceMap, _ast, _Loc) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = render;
	exports.renderWithSourceMap = renderWithSourceMap;

	var Ast = _interopRequireWildcard(_ast);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function render(ast, options) {
		if (options === undefined) options = {};
		setUp(options);
		e(ast);
		const res = strOut;
		tearDown();
		return res;
	}

	function renderWithSourceMap(ast, inFilePath, outFilePath, options) {
		if (options === undefined) options = {};
		setUp(options, inFilePath, outFilePath);
		e(ast);
		const res = {
			code: strOut,
			sourceMap: sourceMap.toJSON()
		};
		tearDown();
		return res;
	}

	let strOut, indentAmount, indentStr, usingSourceMaps, curAst, inFilePath, sourceMap, outLine, outColumn, lastMappedAst, ugly;

	function setUp(options, inPath, outPath) {
		ugly = Boolean(options.ugly);
		indentAmount = 0;

		_setIndent();

		strOut = '';
		usingSourceMaps = inPath !== undefined;

		if (usingSourceMaps) {
			inFilePath = inPath;
			sourceMap = new _sourceMap.SourceMapGenerator({
				file: outPath
			});
			outLine = _Loc.StartLine;
			outColumn = _Loc.StartColumn;
			lastMappedAst = null;
		}
	}

	function tearDown() {
		strOut = '';
		inFilePath = sourceMap = curAst = lastMappedAst = undefined;
	}

	function e(ast) {
		if (usingSourceMaps) curAst = ast;
		ast.render();
	}

	function o(str) {
		strOut = strOut + str;
		if (usingSourceMaps) _mapStr(str);
	}

	function interleave(asts, str) {
		if (!isEmpty(asts)) {
			const maxI = asts.length - 1;

			for (let i = 0; i < maxI; i = i + 1) {
				e(asts[i]);
				o(str);
			}

			e(asts[maxI]);
		}
	}

	function paren(asts) {
		o('(');
		interleave(asts, ',');
		o(')');
	}

	function block(blockLines, lineSeparator) {
		if (isEmpty(blockLines)) o('{}');else {
			o('{');
			indent();
			nl();
			lines(blockLines, lineSeparator);
			unindent();
			nl();
			o('}');
		}
	}

	function lines(lines, lineSeparator) {
		if (lines.length > 0) {
			const maxI = lines.length - 1;

			for (let i = 0; i < maxI; i = i + 1) {
				e(lines[i]);
				o(lineSeparator);
				nl();
			}

			e(lines[maxI]);
		}
	}

	const indentStrs = [''];

	function _setIndent() {
		indentStr = indentStrs[indentAmount];

		while (indentStr === undefined) {
			indentStrs.push(last(indentStrs) + '\t');
			indentStr = indentStrs[indentAmount];
		}
	}

	function indent() {
		if (!ugly) {
			indentAmount = indentAmount + 1;

			_setIndent();
		}
	}

	function unindent() {
		if (!ugly) {
			indentAmount = indentAmount - 1;

			_setIndent();
		}
	}

	function nl() {
		if (!ugly) {
			strOut = strOut + '\n' + indentStr;
			if (usingSourceMaps) _mapNewLine();
		}
	}

	function _mapStr(str) {
		if (curAst !== lastMappedAst && curAst.loc !== undefined) {
			sourceMap.addMapping({
				source: inFilePath,
				original: curAst.loc.start,
				generated: new _Loc.Pos(outLine, outColumn)
			});
			lastMappedAst = curAst;
		}

		outColumn = outColumn + str.length;
	}

	function _mapNewLine() {
		outLine = outLine + 1;
		outColumn = _Loc.StartColumn + indentAmount;
		lastMappedAst = null;
	}

	function fun() {
		o(this.generator ? 'function*' : 'function');

		if (this.id !== null) {
			o(' ');
			e(this.id);
		}

		paren(this.params);
		e(this.body);
	}

	function arr() {
		if (isEmpty(this.elements)) o('[]');else {
			o('[');
			interleave(this.elements, ',');
			o(']');
		}
	}

	function rClass() {
		o('class ');
		if (this.id !== null) e(this.id);

		if (this.superClass !== null) {
			o(' extends ');
			e(this.superClass);
		}

		e(this.body);
	}

	const forInOf = (_, kind) => {
		o('for(');
		e(_.left);
		o(kind);
		e(_.right);
		o(')');
		e(_.body);
	};

	const implementMany = (holder, methodName, nameToImpl) => {
		Object.keys(nameToImpl).forEach(name => {
			holder[name].prototype[methodName] = nameToImpl[name];
		});
	},
	      isEmpty = arr => arr.length === 0,
	      last = arr => arr[arr.length - 1];

	implementMany(Ast, 'render', {
		Program() {
			lines(this.body, ';');
		},

		Identifier() {
			o(this.name);
		},

		EmptyStatement() {},

		BlockStatement() {
			block(this.body, ';');
		},

		ExpressionStatement() {
			e(this.expression);
		},

		IfStatement() {
			o('if(');
			e(this.test);
			o(')');
			e(this.consequent);

			if (this.alternate !== null) {
				if (!(this.consequent instanceof _ast.BlockStatement)) o(';');
				o(' else ');
				e(this.alternate);
			}
		},

		LabeledStatement() {
			e(this.label);
			o(':');
			e(this.body);
		},

		BreakStatement() {
			o('break');

			if (this.label !== null) {
				o(' ');
				e(this.label);
			}
		},

		ContinueStatement() {
			o('continue');

			if (this.label !== null) {
				o(' ');
				e(this.label);
			}
		},

		SwitchCase() {
			if (this.test !== null) {
				o('case ');
				e(this.test);
			} else o('default');

			o(':');

			switch (this.consequent.length) {
				case 0:
					break;

				case 1:
					e(this.consequent[0]);
					break;

				default:
					indent();
					nl();
					lines(this.consequent, ';');
					unindent();
			}
		},

		SwitchStatement() {
			o('switch(');
			e(this.discriminant);
			o(')');
			block(this.cases, '');
		},

		ReturnStatement() {
			if (this.argument !== null) {
				o('return ');
				e(this.argument);
			} else o('return');
		},

		ThrowStatement() {
			o('throw ');
			e(this.argument);
		},

		CatchClause() {
			o('catch(');
			e(this.param);
			o(')');
			e(this.body);
		},

		TryStatement() {
			o('try ');
			e(this.block);
			if (this.handler !== null) e(this.handler);

			if (this.finalizer !== null) {
				o('finally');
				e(this.finalizer);
			}
		},

		WhileStatement() {
			o('while(');
			e(this.test);
			o(')');
			e(this.body);
		},

		DoWhileStatement() {
			o('do ');
			e(this.body);
			if (!(this.body instanceof _ast.BlockStatement)) o(';');
			o(' while(');
			e(this.test);
			o(')');
		},

		ForStatement() {
			o('for(');
			if (this.init !== null) e(this.init);
			o(';');
			if (this.test !== null) e(this.test);
			o(';');
			if (this.update !== null) e(this.update);
			o(')');
			e(this.body);
		},

		ForInStatement() {
			forInOf(this, ' in ');
		},

		ForOfStatement() {
			forInOf(this, ' of ');
		},

		DebuggerStatement() {
			o('debugger');
		},

		FunctionDeclaration: fun,

		VariableDeclarator() {
			e(this.id);

			if (this.init !== null) {
				o('=');
				e(this.init);
			}
		},

		VariableDeclaration() {
			o(this.kind);
			o(' ');
			interleave(this.declarations, ',');
		},

		ThisExpression() {
			o('this');
		},

		ArrayExpression: arr,

		ObjectExpression() {
			if (isEmpty(this.properties)) o('{}');else block(this.properties, ',');
		},

		Property() {
			const outputKey = () => {
				if (this.computed) {
					o('[');
					e(this.key);
					o(']');
				} else e(this.key);
			};

			const outputFun = () => {
				outputKey();
				paren(this.value.params);
				e(this.value.body);
			};

			if (this.kind === 'init') {
				if (this.method) {
					if (this.value.generator) o('*');
					outputFun();
				} else {
					outputKey();
					o(':');
					e(this.value);
				}
			} else {
				o(this.kind);
				o(' ');
				outputFun();
			}
		},

		FunctionExpression: fun,

		ArrowFunctionExpression() {
			if (this.params.length === 1 && this.params[0] instanceof _ast.Identifier) e(this.params[0]);else paren(this.params);
			o('=>');
			e(this.body);
		},

		SequenceExpression() {
			interleave(this.expressions, ',');
		},

		UnaryExpression() {
			o(this.operator);
			o(' ');
			e(this.argument);
		},

		BinaryExpression() {
			o('(');
			e(this.left);
			o(this.operator === 'instanceof' ? ' instanceof ' : this.operator);
			e(this.right);
			o(')');
		},

		AssignmentExpression() {
			e(this.left);
			o(this.operator);
			e(this.right);
		},

		UpdateExpression() {
			if (this.prefix) {
				o(this.operator);
				e(this.argument);
			} else {
				e(this.argument);
				o(this.operator);
			}
		},

		LogicalExpression() {
			o('(');
			e(this.left);
			o(this.operator);
			e(this.right);
			o(')');
		},

		ConditionalExpression() {
			o('(');
			e(this.test);
			o('?');
			e(this.consequent);
			o(':');
			e(this.alternate);
			o(')');
		},

		NewExpression() {
			o('new (');
			e(this.callee);
			o(')');
			paren(this.arguments);
		},

		CallExpression() {
			if (this.callee instanceof _ast.ArrowFunctionExpression) {
				o('(');
				e(this.callee);
				o(')');
			} else e(this.callee);

			paren(this.arguments);
		},

		SpreadElement() {
			o('...');
			e(this.argument);
		},

		MemberExpression() {
			e(this.object);

			if (this.computed) {
				o('[');
				e(this.property);
				o(']');
			} else {
				if (this.object instanceof _ast.Literal && typeof this.object.value === 'number' && this.object.value === (this.object.value | 0)) o('..');else o('.');
				e(this.property);
			}
		},

		YieldExpression() {
			if (this.argument === null) o('(yield)');else {
				o(this.delegate ? '(yield* ' : '(yield ');
				if (this.argument !== null) e(this.argument);
				o(')');
			}
		},

		Literal() {
			if (typeof this.value === 'string') {
				o('"');
				o(escapeStringForLiteral(this.value));
				o('"');
			} else o(this.value === null ? 'null' : this.value.toString());
		},

		TemplateElement() {
			o(this.value.raw);
		},

		TemplateLiteral() {
			o('`');
			e(this.quasis[0]);

			for (let i = 0; i < this.expressions.length; i = i + 1) {
				o('${');
				e(this.expressions[i]);
				o('}');
				e(this.quasis[i + 1]);
			}

			o('`');
		},

		TaggedTemplateExpression() {
			e(this.tag);
			e(this.quasi);
		},

		AssignmentProperty() {
			e(this.key);

			if (this.key !== this.value) {
				o(':');
				e(this.value);
			}
		},

		ObjectPattern() {
			o('{');
			interleave(this.properties, ',');
			o('}');
		},

		ArrayPattern: arr,

		RestElement() {
			o('...');
			e(this.argument);
		},

		MethodDefinition() {
			if (this.static) o('static ');
			const fun = this.value;
			const params = fun.params;
			const body = fun.body;

			const rKey = () => {
				if (this.computed) {
					o('[');
					e(this.key);
					o(']');
				} else e(this.key);
			};

			if (fun.generator) o('*');

			switch (this.kind) {
				case 'constructor':
					o('constructor');
					break;

				case 'method':
					rKey();
					break;

				case 'get':
				case 'set':
					o(this.kind);
					o(' ');
					rKey();
					break;

				default:
					throw new Error(this.kind);
			}

			paren(params);
			e(body);
		},

		ClassBody() {
			block(this.body, '');
		},

		ClassDeclaration: rClass,
		ClassExpression: rClass,

		ImportDeclaration() {
			o('import ');
			let def, namespace;
			let specifiers = [];

			for (const s of this.specifiers) {
				if (s instanceof _ast.ImportDefaultSpecifier) if (def === undefined) def = s;else throw new Error('Multiple default imports');else if (s instanceof _ast.ImportNamespaceSpecifier) if (namespace === undefined) namespace = s;else throw new Error('Multiple namespace imports');else specifiers.push(s);
			}

			let needComma = false;

			if (def !== undefined) {
				e(def);
				needComma = true;
			}

			if (namespace !== undefined) {
				if (needComma) o(',');
				e(namespace);
				needComma = true;
			}

			if (!isEmpty(specifiers)) {
				if (needComma) o(',');
				o('{');
				interleave(specifiers, ',');
				o('}');
			}

			o(' from ');
			e(this.source);
		},

		ImportSpecifier() {
			if (this.imported === this.local) e(this.local);else {
				e(this.imported);
				o(' as ');
				e(this.local);
			}
		},

		ImportDefaultSpecifier() {
			e(this.local);
		},

		ImportNamespaceSpecifier() {
			o('* as ');
			e(this.local);
		},

		ExportSpecifier() {
			e(this.local);

			if (this.exported !== this.local) {
				o(' as ');
				e(this.exported);
			}
		},

		ExportNamedDeclaration() {
			o('export ');
			if (this.declaration !== null) e(this.declaration);else {
				o('{');
				interleave(this.specifiers, ',');
				o('}');

				if (this.source !== null) {
					o(' from ');
					e(this.source);
				}
			}
		},

		ExportDefaultDeclaration() {
			o('export default ');
			e(this.declaration);
		},

		ExportAllDeclaration() {
			o('export * from ');
			e(this.source);
		}

	});

	const escapeStringForLiteral = str => str.replace(/[\\"\n\t\b\f\v\r\u2028\u2029]/g, ch => literalEscapes[ch]),
	      literalEscapes = {
		'\\': '\\\\',
		'"': '\\"',
		'\n': '\\n',
		'\t': '\\t',
		'\b': '\\b',
		'\f': '\\f',
		'\v': '\\v',
		'\r': '\\r',
		'\u2028': '\\u2028',
		'\u2029': '\\u2029'
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQWF3QixNQUFNO1NBb0JkLG1CQUFtQixHQUFuQixtQkFBbUI7Ozs7OztVQXBCWCxNQUFNOzs7Ozs7Ozs7VUFvQmQsbUJBQW1CIiwiZmlsZSI6InJlbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U291cmNlTWFwR2VuZXJhdG9yfSBmcm9tICdzb3VyY2UtbWFwL2Rpc3Qvc291cmNlLW1hcC5taW4nXG5pbXBvcnQgKiBhcyBBc3QgZnJvbSAnLi9hc3QnXG5pbXBvcnQge0Fycm93RnVuY3Rpb25FeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgSWRlbnRpZmllciwgSW1wb3J0RGVmYXVsdFNwZWNpZmllcixcblx0SW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyLCBMaXRlcmFsfSBmcm9tICcuL2FzdCdcbmltcG9ydCB7UG9zLCBTdGFydENvbHVtbiwgU3RhcnRMaW5lfSBmcm9tICcuL0xvYydcblxuLyoqXG5DcmVhdGVzIEphdmFTY3JpcHQgc291cmNlIGNvZGUgZnJvbSBhIHtAbGluayBOb2RlfS5cbkBwYXJhbSB7Tm9kZX0gYXN0XG5AcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnVnbHlcblx0SWYgdHJ1ZSwgd2lsbCBub3Qgb3V0cHV0IGFueSB3aGl0ZXNwYWNlLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcihhc3QgLyogTm9kZSAqLywgb3B0aW9ucykge1xuXHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpXG5cdFx0b3B0aW9ucyA9IHt9XG5cblx0c2V0VXAob3B0aW9ucylcblx0ZShhc3QpXG5cdGNvbnN0IHJlcyA9IHN0ck91dFxuXHR0ZWFyRG93bigpXG5cdHJldHVybiByZXNcbn1cblxuLyoqXG5TYW1lIGFzIHtAbGluayByZW5kZXJ9LCBidXQgd2l0aCBhIHNvdXJjZSBtYXAgYXMgcGFydCBvZiB0aGUgb3V0cHV0LlxuQHBhcmFtIHtOb2RlfSBhc3RcbkBwYXJhbSB7c3RyaW5nfSBpbkZpbGVQYXRoIE5hbWUgb2YgaW5wdXQgZmlsZS5cbkBwYXJhbSB7c3RyaW5nfSBvdXRGaWxlUGF0aCBOYW1lIG9mIG91dHB1dCBmaWxlLlxuQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU2FtZSBvcHRpb25zIGFzIGZvciB7QGxpbmsgcmVuZGVyfS5cbkByZXR1cm4ge2NvZGU6IHN0cmluZywgc291cmNlTWFwOiBzdHJpbmd9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcldpdGhTb3VyY2VNYXAoYXN0LCBpbkZpbGVQYXRoLCBvdXRGaWxlUGF0aCwgb3B0aW9ucykge1xuXHQvLyBUT0RPOkVTNiBPcHRpb25hbCBhcmdzXG5cdGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpXG5cdFx0b3B0aW9ucyA9IHt9XG5cblx0c2V0VXAob3B0aW9ucywgaW5GaWxlUGF0aCwgb3V0RmlsZVBhdGgpXG5cdGUoYXN0KVxuXHRjb25zdCByZXMgPSB7Y29kZTogc3RyT3V0LCBzb3VyY2VNYXA6IHNvdXJjZU1hcC50b0pTT04oKX1cblx0dGVhckRvd24oKVxuXHRyZXR1cm4gcmVzXG59XG5cbi8vIE11c3QgaW5pdCB0aGVzZSBhbGwgYmVmb3JlIHJlbmRlcmluZy5cbmxldCBzdHJPdXQsXG5cdGluZGVudEFtb3VudCwgaW5kZW50U3RyLFxuXHR1c2luZ1NvdXJjZU1hcHMsIGN1ckFzdCwgaW5GaWxlUGF0aCwgc291cmNlTWFwLCBvdXRMaW5lLCBvdXRDb2x1bW4sIGxhc3RNYXBwZWRBc3QsXG5cdC8vIG9wdGlvbnNcblx0dWdseVxuXG5mdW5jdGlvbiBzZXRVcChvcHRpb25zLCBpblBhdGgsIG91dFBhdGgpIHtcblx0dWdseSA9IEJvb2xlYW4ob3B0aW9ucy51Z2x5KVxuXG5cdGluZGVudEFtb3VudCA9IDBcblx0X3NldEluZGVudCgpXG5cdHN0ck91dCA9ICcnXG5cdHVzaW5nU291cmNlTWFwcyA9IGluUGF0aCAhPT0gdW5kZWZpbmVkXG5cdGlmICh1c2luZ1NvdXJjZU1hcHMpIHtcblx0XHRpbkZpbGVQYXRoID0gaW5QYXRoXG5cdFx0c291cmNlTWFwID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcih7ZmlsZTogb3V0UGF0aH0pXG5cdFx0b3V0TGluZSA9IFN0YXJ0TGluZVxuXHRcdG91dENvbHVtbiA9IFN0YXJ0Q29sdW1uXG5cdFx0bGFzdE1hcHBlZEFzdCA9IG51bGxcblx0fVxufVxuXG5mdW5jdGlvbiB0ZWFyRG93bigpIHtcblx0c3RyT3V0ID0gJydcblx0aW5GaWxlUGF0aCA9IHNvdXJjZU1hcCA9IGN1ckFzdCA9IGxhc3RNYXBwZWRBc3QgPSB1bmRlZmluZWRcbn1cblxuLy8gUmVuZGVycyBhIHNpbmdsZSBleHByZXNzaW9uLlxuZnVuY3Rpb24gZShhc3QpIHtcblx0aWYgKHVzaW5nU291cmNlTWFwcylcblx0XHRjdXJBc3QgPSBhc3Rcblx0YXN0LnJlbmRlcigpXG59XG5cbi8vIE91dHB1dHMgYSBzdHJpbmcuXG4vLyBzdHIgbWF5IG5vdCBjb250YWluIG5ld2xpbmVzLlxuZnVuY3Rpb24gbyhzdHIpIHtcblx0c3RyT3V0ID0gc3RyT3V0ICsgc3RyXG5cdGlmICh1c2luZ1NvdXJjZU1hcHMpXG5cdFx0X21hcFN0cihzdHIpXG59XG5cbmZ1bmN0aW9uIGludGVybGVhdmUoYXN0cywgc3RyKSB7XG5cdGlmICghaXNFbXB0eShhc3RzKSkge1xuXHRcdGNvbnN0IG1heEkgPSBhc3RzLmxlbmd0aCAtIDFcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1heEk7IGkgPSBpICsgMSkge1xuXHRcdFx0ZShhc3RzW2ldKVxuXHRcdFx0byhzdHIpXG5cdFx0fVxuXHRcdGUoYXN0c1ttYXhJXSlcblx0fVxufVxuXG5mdW5jdGlvbiBwYXJlbihhc3RzKSB7XG5cdG8oJygnKVxuXHRpbnRlcmxlYXZlKGFzdHMsICcsJylcblx0bygnKScpXG59XG5cbmZ1bmN0aW9uIGJsb2NrKGJsb2NrTGluZXMsIGxpbmVTZXBhcmF0b3IpIHtcblx0aWYgKGlzRW1wdHkoYmxvY2tMaW5lcykpXG5cdFx0bygne30nKVxuXHRlbHNlIHtcblx0XHRvKCd7Jylcblx0XHRpbmRlbnQoKVxuXHRcdG5sKClcblx0XHRsaW5lcyhibG9ja0xpbmVzLCBsaW5lU2VwYXJhdG9yKVxuXHRcdHVuaW5kZW50KClcblx0XHRubCgpXG5cdFx0bygnfScpXG5cdH1cbn1cblxuZnVuY3Rpb24gbGluZXMobGluZXMsIGxpbmVTZXBhcmF0b3IpIHtcblx0aWYgKGxpbmVzLmxlbmd0aCA+IDApIHtcblx0XHRjb25zdCBtYXhJID0gbGluZXMubGVuZ3RoIC0gMVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWF4STsgaSA9IGkgKyAxKSB7XG5cdFx0XHRlKGxpbmVzW2ldKVxuXHRcdFx0byhsaW5lU2VwYXJhdG9yKVxuXHRcdFx0bmwoKVxuXHRcdH1cblx0XHRlKGxpbmVzW21heEldKVxuXHR9XG59XG5cbmNvbnN0IGluZGVudFN0cnMgPSBbJyddXG5mdW5jdGlvbiBfc2V0SW5kZW50KCkge1xuXHRpbmRlbnRTdHIgPSBpbmRlbnRTdHJzW2luZGVudEFtb3VudF1cblx0d2hpbGUgKGluZGVudFN0ciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0aW5kZW50U3Rycy5wdXNoKGxhc3QoaW5kZW50U3RycykgKyAnXFx0Jylcblx0XHRpbmRlbnRTdHIgPSBpbmRlbnRTdHJzW2luZGVudEFtb3VudF1cblx0fVxufVxuXG5mdW5jdGlvbiBpbmRlbnQoKSB7XG5cdGlmICghdWdseSkge1xuXHRcdGluZGVudEFtb3VudCA9IGluZGVudEFtb3VudCArIDFcblx0XHRfc2V0SW5kZW50KClcblx0fVxufVxuXG5mdW5jdGlvbiB1bmluZGVudCgpIHtcblx0aWYgKCF1Z2x5KSB7XG5cdFx0aW5kZW50QW1vdW50ID0gaW5kZW50QW1vdW50IC0gMVxuXHRcdF9zZXRJbmRlbnQoKVxuXHR9XG59XG5cbmZ1bmN0aW9uIG5sKCkge1xuXHRpZiAoIXVnbHkpIHtcblx0XHRzdHJPdXQgPSBzdHJPdXQgKyAnXFxuJyArIGluZGVudFN0clxuXHRcdGlmICh1c2luZ1NvdXJjZU1hcHMpXG5cdFx0XHRfbWFwTmV3TGluZSgpXG5cdH1cbn1cblxuLy8gUHJpdmF0ZVxuZnVuY3Rpb24gX21hcFN0cihzdHIpIHtcblx0aWYgKGN1ckFzdCAhPT0gbGFzdE1hcHBlZEFzdCAmJiBjdXJBc3QubG9jICE9PSB1bmRlZmluZWQpIHtcblx0XHRzb3VyY2VNYXAuYWRkTWFwcGluZyh7XG5cdFx0XHRzb3VyY2U6IGluRmlsZVBhdGgsXG5cdFx0XHRvcmlnaW5hbDogY3VyQXN0LmxvYy5zdGFydCxcblx0XHRcdGdlbmVyYXRlZDogbmV3IFBvcyhvdXRMaW5lLCBvdXRDb2x1bW4pXG5cdFx0fSlcblx0XHRsYXN0TWFwcGVkQXN0ID0gY3VyQXN0XG5cdH1cblx0b3V0Q29sdW1uID0gb3V0Q29sdW1uICsgc3RyLmxlbmd0aFxufVxuZnVuY3Rpb24gX21hcE5ld0xpbmUoKSB7XG5cdG91dExpbmUgPSBvdXRMaW5lICsgMVxuXHRvdXRDb2x1bW4gPSBTdGFydENvbHVtbiArIGluZGVudEFtb3VudFxuXHQvLyBNYXBwaW5ncyBlbmQgYXQgZW5kIG9mIGxpbmUuIE11c3QgYmVnaW4gYW5ldy5cblx0bGFzdE1hcHBlZEFzdCA9IG51bGxcbn1cblxuLy8gSW1wbGVtZW50YXRpb25zIHVzZWQgbW9yZSB0aGFuIG9uY2VcblxuZnVuY3Rpb24gZnVuKCkge1xuXHRvKHRoaXMuZ2VuZXJhdG9yID8gJ2Z1bmN0aW9uKicgOiAnZnVuY3Rpb24nKVxuXHRpZiAodGhpcy5pZCAhPT0gbnVsbCkge1xuXHRcdG8oJyAnKVxuXHRcdGUodGhpcy5pZClcblx0fVxuXHRwYXJlbih0aGlzLnBhcmFtcylcblx0ZSh0aGlzLmJvZHkpXG59XG5cbmZ1bmN0aW9uIGFycigpIHtcblx0aWYgKGlzRW1wdHkodGhpcy5lbGVtZW50cykpXG5cdFx0bygnW10nKVxuXHRlbHNlIHtcblx0XHRvKCdbJylcblx0XHRpbnRlcmxlYXZlKHRoaXMuZWxlbWVudHMsICcsJylcblx0XHRvKCddJylcblx0fVxufVxuXG5mdW5jdGlvbiByQ2xhc3MoKSB7XG5cdG8oJ2NsYXNzICcpXG5cdGlmICh0aGlzLmlkICE9PSBudWxsKVxuXHRcdGUodGhpcy5pZClcblx0aWYgKHRoaXMuc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuXHRcdG8oJyBleHRlbmRzICcpXG5cdFx0ZSh0aGlzLnN1cGVyQ2xhc3MpXG5cdH1cblx0ZSh0aGlzLmJvZHkpXG59XG5cbmNvbnN0XG5cdGZvckluT2YgPSAoXywga2luZCkgPT4ge1xuXHRcdG8oJ2ZvcignKVxuXHRcdGUoXy5sZWZ0KVxuXHRcdG8oa2luZClcblx0XHRlKF8ucmlnaHQpXG5cdFx0bygnKScpXG5cdFx0ZShfLmJvZHkpXG5cdH1cblxuY29uc3Rcblx0aW1wbGVtZW50TWFueSA9IChob2xkZXIsIG1ldGhvZE5hbWUsIG5hbWVUb0ltcGwpID0+IHtcblx0XHRPYmplY3Qua2V5cyhuYW1lVG9JbXBsKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0aG9sZGVyW25hbWVdLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG5hbWVUb0ltcGxbbmFtZV1cblx0XHR9KVxuXHR9LFxuXG5cdGlzRW1wdHkgPSBhcnIgPT5cblx0XHRhcnIubGVuZ3RoID09PSAwLFxuXG5cdGxhc3QgPSBhcnIgPT5cblx0XHRhcnJbYXJyLmxlbmd0aCAtIDFdXG5cbmltcGxlbWVudE1hbnkoQXN0LCAncmVuZGVyJywge1xuXHRQcm9ncmFtKCkge1xuXHRcdGxpbmVzKHRoaXMuYm9keSwgJzsnKVxuXHR9LFxuXG5cdElkZW50aWZpZXIoKSB7XG5cdFx0byh0aGlzLm5hbWUpXG5cdH0sXG5cblx0Ly8gU3RhdGVtZW50c1xuXHRFbXB0eVN0YXRlbWVudCgpIHsgfSxcblx0QmxvY2tTdGF0ZW1lbnQoKSB7XG5cdFx0YmxvY2sodGhpcy5ib2R5LCAnOycpXG5cdH0sXG5cdEV4cHJlc3Npb25TdGF0ZW1lbnQoKSB7XG5cdFx0ZSh0aGlzLmV4cHJlc3Npb24pXG5cdH0sXG5cdElmU3RhdGVtZW50KCkge1xuXHRcdG8oJ2lmKCcpXG5cdFx0ZSh0aGlzLnRlc3QpXG5cdFx0bygnKScpXG5cdFx0ZSh0aGlzLmNvbnNlcXVlbnQpXG5cdFx0aWYgKHRoaXMuYWx0ZXJuYXRlICE9PSBudWxsKSB7XG5cdFx0XHRpZiAoISh0aGlzLmNvbnNlcXVlbnQgaW5zdGFuY2VvZiBCbG9ja1N0YXRlbWVudCkpXG5cdFx0XHRcdG8oJzsnKVxuXHRcdFx0bygnIGVsc2UgJylcblx0XHRcdGUodGhpcy5hbHRlcm5hdGUpXG5cdFx0fVxuXHR9LFxuXHRMYWJlbGVkU3RhdGVtZW50KCkge1xuXHRcdGUodGhpcy5sYWJlbClcblx0XHRvKCc6Jylcblx0XHRlKHRoaXMuYm9keSlcblx0fSxcblx0QnJlYWtTdGF0ZW1lbnQoKSB7XG5cdFx0bygnYnJlYWsnKVxuXHRcdGlmICh0aGlzLmxhYmVsICE9PSBudWxsKSB7XG5cdFx0XHRvKCcgJylcblx0XHRcdGUodGhpcy5sYWJlbClcblx0XHR9XG5cdH0sXG5cdENvbnRpbnVlU3RhdGVtZW50KCkge1xuXHRcdG8oJ2NvbnRpbnVlJylcblx0XHRpZiAodGhpcy5sYWJlbCAhPT0gbnVsbCkge1xuXHRcdFx0bygnICcpXG5cdFx0XHRlKHRoaXMubGFiZWwpXG5cdFx0fVxuXHR9LFxuXHRTd2l0Y2hDYXNlKCkge1xuXHRcdGlmICh0aGlzLnRlc3QgIT09IG51bGwpIHtcblx0XHRcdG8oJ2Nhc2UgJylcblx0XHRcdGUodGhpcy50ZXN0KVxuXHRcdH0gZWxzZVxuXHRcdFx0bygnZGVmYXVsdCcpXG5cdFx0bygnOicpXG5cdFx0c3dpdGNoICh0aGlzLmNvbnNlcXVlbnQubGVuZ3RoKSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdGUodGhpcy5jb25zZXF1ZW50WzBdKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aW5kZW50KClcblx0XHRcdFx0bmwoKVxuXHRcdFx0XHRsaW5lcyh0aGlzLmNvbnNlcXVlbnQsICc7Jylcblx0XHRcdFx0dW5pbmRlbnQoKVxuXHRcdH1cblx0fSxcblx0U3dpdGNoU3RhdGVtZW50KCkge1xuXHRcdG8oJ3N3aXRjaCgnKVxuXHRcdGUodGhpcy5kaXNjcmltaW5hbnQpXG5cdFx0bygnKScpXG5cdFx0YmxvY2sodGhpcy5jYXNlcywgJycpXG5cdH0sXG5cdFJldHVyblN0YXRlbWVudCgpIHtcblx0XHRpZiAodGhpcy5hcmd1bWVudCAhPT0gbnVsbCkge1xuXHRcdFx0bygncmV0dXJuICcpXG5cdFx0XHRlKHRoaXMuYXJndW1lbnQpXG5cdFx0fSBlbHNlXG5cdFx0XHRvKCdyZXR1cm4nKVxuXHR9LFxuXHRUaHJvd1N0YXRlbWVudCgpIHtcblx0XHRvKCd0aHJvdyAnKVxuXHRcdGUodGhpcy5hcmd1bWVudClcblx0fSxcblx0Q2F0Y2hDbGF1c2UoKSB7XG5cdFx0bygnY2F0Y2goJylcblx0XHRlKHRoaXMucGFyYW0pXG5cdFx0bygnKScpXG5cdFx0ZSh0aGlzLmJvZHkpXG5cdH0sXG5cdFRyeVN0YXRlbWVudCgpIHtcblx0XHRvKCd0cnkgJylcblx0XHRlKHRoaXMuYmxvY2spXG5cdFx0aWYgKHRoaXMuaGFuZGxlciAhPT0gbnVsbClcblx0XHRcdGUodGhpcy5oYW5kbGVyKVxuXHRcdGlmICh0aGlzLmZpbmFsaXplciAhPT0gbnVsbCkge1xuXHRcdFx0bygnZmluYWxseScpXG5cdFx0XHRlKHRoaXMuZmluYWxpemVyKVxuXHRcdH1cblx0fSxcblx0V2hpbGVTdGF0ZW1lbnQoKSB7XG5cdFx0bygnd2hpbGUoJylcblx0XHRlKHRoaXMudGVzdClcblx0XHRvKCcpJylcblx0XHRlKHRoaXMuYm9keSlcblx0fSxcblx0RG9XaGlsZVN0YXRlbWVudCgpIHtcblx0XHRvKCdkbyAnKVxuXHRcdGUodGhpcy5ib2R5KVxuXHRcdGlmICghKHRoaXMuYm9keSBpbnN0YW5jZW9mIEJsb2NrU3RhdGVtZW50KSlcblx0XHRcdG8oJzsnKVxuXHRcdG8oJyB3aGlsZSgnKVxuXHRcdGUodGhpcy50ZXN0KVxuXHRcdG8oJyknKVxuXHR9LFxuXHRGb3JTdGF0ZW1lbnQoKSB7XG5cdFx0bygnZm9yKCcpXG5cdFx0aWYgKHRoaXMuaW5pdCAhPT0gbnVsbClcblx0XHRcdGUodGhpcy5pbml0KVxuXHRcdG8oJzsnKVxuXHRcdGlmICh0aGlzLnRlc3QgIT09IG51bGwpXG5cdFx0XHRlKHRoaXMudGVzdClcblx0XHRvKCc7Jylcblx0XHRpZiAodGhpcy51cGRhdGUgIT09IG51bGwpXG5cdFx0XHRlKHRoaXMudXBkYXRlKVxuXHRcdG8oJyknKVxuXHRcdGUodGhpcy5ib2R5KVxuXHR9LFxuXHRGb3JJblN0YXRlbWVudCgpIHsgZm9ySW5PZih0aGlzLCAnIGluICcpIH0sXG5cdEZvck9mU3RhdGVtZW50KCkgeyBmb3JJbk9mKHRoaXMsICcgb2YgJykgfSxcblx0RGVidWdnZXJTdGF0ZW1lbnQoKSB7XG5cdFx0bygnZGVidWdnZXInKVxuXHR9LFxuXG5cdC8vIERlY2xhcmF0aW9uc1xuXHRGdW5jdGlvbkRlY2xhcmF0aW9uOiBmdW4sXG5cdFZhcmlhYmxlRGVjbGFyYXRvcigpIHtcblx0XHRlKHRoaXMuaWQpXG5cdFx0aWYgKHRoaXMuaW5pdCAhPT0gbnVsbCkge1xuXHRcdFx0bygnPScpXG5cdFx0XHRlKHRoaXMuaW5pdClcblx0XHR9XG5cdH0sXG5cdFZhcmlhYmxlRGVjbGFyYXRpb24oKSB7XG5cdFx0byh0aGlzLmtpbmQpXG5cdFx0bygnICcpXG5cdFx0aW50ZXJsZWF2ZSh0aGlzLmRlY2xhcmF0aW9ucywgJywnKVxuXHR9LFxuXG5cdC8vIEV4cHJlc3Npb25zXG5cdFRoaXNFeHByZXNzaW9uKCkge1xuXHRcdG8oJ3RoaXMnKVxuXHR9LFxuXHRBcnJheUV4cHJlc3Npb246IGFycixcblx0T2JqZWN0RXhwcmVzc2lvbigpIHtcblx0XHRpZiAoaXNFbXB0eSh0aGlzLnByb3BlcnRpZXMpKVxuXHRcdFx0bygne30nKVxuXHRcdGVsc2Vcblx0XHRcdGJsb2NrKHRoaXMucHJvcGVydGllcywgJywnKVxuXHR9LFxuXHRQcm9wZXJ0eSgpIHtcblx0XHRjb25zdCBvdXRwdXRLZXkgPSAoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5jb21wdXRlZCkge1xuXHRcdFx0XHRvKCdbJylcblx0XHRcdFx0ZSh0aGlzLmtleSlcblx0XHRcdFx0bygnXScpXG5cdFx0XHR9IGVsc2Vcblx0XHRcdFx0ZSh0aGlzLmtleSlcblx0XHR9XG5cdFx0Y29uc3Qgb3V0cHV0RnVuID0gKCkgPT4ge1xuXHRcdFx0b3V0cHV0S2V5KClcblx0XHRcdHBhcmVuKHRoaXMudmFsdWUucGFyYW1zKVxuXHRcdFx0ZSh0aGlzLnZhbHVlLmJvZHkpXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMua2luZCA9PT0gJ2luaXQnKSB7XG5cdFx0XHRpZiAodGhpcy5tZXRob2QpIHtcblx0XHRcdFx0aWYgKHRoaXMudmFsdWUuZ2VuZXJhdG9yKVxuXHRcdFx0XHRcdG8oJyonKVxuXHRcdFx0XHRvdXRwdXRGdW4oKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0S2V5KClcblx0XHRcdFx0bygnOicpXG5cdFx0XHRcdGUodGhpcy52YWx1ZSlcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0byh0aGlzLmtpbmQpXG5cdFx0XHRvKCcgJylcblx0XHRcdG91dHB1dEZ1bigpXG5cdFx0fVxuXHR9LFxuXHRGdW5jdGlvbkV4cHJlc3Npb246IGZ1bixcblx0QXJyb3dGdW5jdGlvbkV4cHJlc3Npb24oKSB7XG5cdFx0aWYgKHRoaXMucGFyYW1zLmxlbmd0aCA9PT0gMSAmJiB0aGlzLnBhcmFtc1swXSBpbnN0YW5jZW9mIElkZW50aWZpZXIpXG5cdFx0XHRlKHRoaXMucGFyYW1zWzBdKVxuXHRcdGVsc2Vcblx0XHRcdHBhcmVuKHRoaXMucGFyYW1zKVxuXHRcdG8oJz0+Jylcblx0XHRlKHRoaXMuYm9keSlcblx0fSxcblx0U2VxdWVuY2VFeHByZXNzaW9uKCkge1xuXHRcdGludGVybGVhdmUodGhpcy5leHByZXNzaW9ucywgJywnKVxuXHR9LFxuXHRVbmFyeUV4cHJlc3Npb24oKSB7XG5cdFx0byh0aGlzLm9wZXJhdG9yKVxuXHRcdG8oJyAnKVxuXHRcdGUodGhpcy5hcmd1bWVudClcblx0fSxcblx0QmluYXJ5RXhwcmVzc2lvbigpIHtcblx0XHRvKCcoJylcblx0XHRlKHRoaXMubGVmdClcblx0XHRvKHRoaXMub3BlcmF0b3IgPT09ICdpbnN0YW5jZW9mJyA/ICcgaW5zdGFuY2VvZiAnIDogdGhpcy5vcGVyYXRvcilcblx0XHRlKHRoaXMucmlnaHQpXG5cdFx0bygnKScpXG5cdH0sXG5cdEFzc2lnbm1lbnRFeHByZXNzaW9uKCkge1xuXHRcdGUodGhpcy5sZWZ0KVxuXHRcdG8odGhpcy5vcGVyYXRvcilcblx0XHRlKHRoaXMucmlnaHQpXG5cdH0sXG5cdFVwZGF0ZUV4cHJlc3Npb24oKSB7XG5cdFx0aWYgKHRoaXMucHJlZml4KSB7XG5cdFx0XHRvKHRoaXMub3BlcmF0b3IpXG5cdFx0XHRlKHRoaXMuYXJndW1lbnQpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGUodGhpcy5hcmd1bWVudClcblx0XHRcdG8odGhpcy5vcGVyYXRvcilcblx0XHR9XG5cdH0sXG5cdExvZ2ljYWxFeHByZXNzaW9uKCkge1xuXHRcdG8oJygnKVxuXHRcdGUodGhpcy5sZWZ0KVxuXHRcdG8odGhpcy5vcGVyYXRvcilcblx0XHRlKHRoaXMucmlnaHQpXG5cdFx0bygnKScpXG5cdH0sXG5cdENvbmRpdGlvbmFsRXhwcmVzc2lvbigpIHtcblx0XHRvKCcoJylcblx0XHRlKHRoaXMudGVzdClcblx0XHRvKCc/Jylcblx0XHRlKHRoaXMuY29uc2VxdWVudClcblx0XHRvKCc6Jylcblx0XHRlKHRoaXMuYWx0ZXJuYXRlKVxuXHRcdG8oJyknKVxuXHR9LFxuXHROZXdFeHByZXNzaW9uKCkge1xuXHRcdG8oJ25ldyAoJylcblx0XHRlKHRoaXMuY2FsbGVlKVxuXHRcdG8oJyknKVxuXHRcdHBhcmVuKHRoaXMuYXJndW1lbnRzKVxuXHR9LFxuXHRDYWxsRXhwcmVzc2lvbigpIHtcblx0XHRpZiAodGhpcy5jYWxsZWUgaW5zdGFuY2VvZiBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbikge1xuXHRcdFx0bygnKCcpXG5cdFx0XHRlKHRoaXMuY2FsbGVlKVxuXHRcdFx0bygnKScpXG5cdFx0fSBlbHNlXG5cdFx0XHRlKHRoaXMuY2FsbGVlKVxuXHRcdHBhcmVuKHRoaXMuYXJndW1lbnRzKVxuXHR9LFxuXHRTcHJlYWRFbGVtZW50KCkge1xuXHRcdG8oJy4uLicpXG5cdFx0ZSh0aGlzLmFyZ3VtZW50KVxuXHR9LFxuXHRNZW1iZXJFeHByZXNzaW9uKCkge1xuXHRcdGUodGhpcy5vYmplY3QpXG5cdFx0aWYgKHRoaXMuY29tcHV0ZWQpIHtcblx0XHRcdG8oJ1snKVxuXHRcdFx0ZSh0aGlzLnByb3BlcnR5KVxuXHRcdFx0bygnXScpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0aGlzLm9iamVjdCBpbnN0YW5jZW9mIExpdGVyYWwgJiZcblx0XHRcdFx0dHlwZW9mIHRoaXMub2JqZWN0LnZhbHVlID09PSAnbnVtYmVyJyAmJlxuXHRcdFx0XHR0aGlzLm9iamVjdC52YWx1ZSA9PT0gKHRoaXMub2JqZWN0LnZhbHVlIHwgMCkpXG5cdFx0XHRcdG8oJy4uJylcblx0XHRcdGVsc2Vcblx0XHRcdFx0bygnLicpXG5cdFx0XHRlKHRoaXMucHJvcGVydHkpXG5cdFx0fVxuXHR9LFxuXHRZaWVsZEV4cHJlc3Npb24oKSB7XG5cdFx0aWYgKHRoaXMuYXJndW1lbnQgPT09IG51bGwpXG5cdFx0XHRvKCcoeWllbGQpJylcblx0XHRlbHNlIHtcblx0XHRcdG8odGhpcy5kZWxlZ2F0ZSA/ICcoeWllbGQqICcgOiAnKHlpZWxkICcpXG5cdFx0XHRpZiAodGhpcy5hcmd1bWVudCAhPT0gbnVsbClcblx0XHRcdFx0ZSh0aGlzLmFyZ3VtZW50KVxuXHRcdFx0bygnKScpXG5cdFx0fVxuXHR9LFxuXHRMaXRlcmFsKCkge1xuXHRcdGlmICh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdG8oJ1wiJylcblx0XHRcdG8oZXNjYXBlU3RyaW5nRm9yTGl0ZXJhbCh0aGlzLnZhbHVlKSlcblx0XHRcdG8oJ1wiJylcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0byh0aGlzLnZhbHVlID09PSBudWxsID8gJ251bGwnIDogdGhpcy52YWx1ZS50b1N0cmluZygpKVxuXHR9LFxuXG5cdC8vIFRlbXBsYXRlc1xuXHRUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0byh0aGlzLnZhbHVlLnJhdylcblx0fSxcblx0VGVtcGxhdGVMaXRlcmFsKCkge1xuXHRcdG8oJ2AnKVxuXHRcdGUodGhpcy5xdWFzaXNbMF0pXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmV4cHJlc3Npb25zLmxlbmd0aDsgaSA9IGkgKyAxKVx0IHtcblx0XHRcdG8oJyR7Jylcblx0XHRcdGUodGhpcy5leHByZXNzaW9uc1tpXSlcblx0XHRcdG8oJ30nKVxuXHRcdFx0ZSh0aGlzLnF1YXNpc1tpICsgMV0pXG5cdFx0fVxuXHRcdG8oJ2AnKVxuXHR9LFxuXHRUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24oKSB7XG5cdFx0ZSh0aGlzLnRhZylcblx0XHRlKHRoaXMucXVhc2kpXG5cdH0sXG5cblx0Ly8gUGF0dGVybnNcblx0QXNzaWdubWVudFByb3BlcnR5KCkge1xuXHRcdGUodGhpcy5rZXkpXG5cdFx0aWYgKHRoaXMua2V5ICE9PSB0aGlzLnZhbHVlKSB7XG5cdFx0XHRvKCc6Jylcblx0XHRcdGUodGhpcy52YWx1ZSlcblx0XHR9XG5cdH0sXG5cdE9iamVjdFBhdHRlcm4oKSB7XG5cdFx0bygneycpXG5cdFx0aW50ZXJsZWF2ZSh0aGlzLnByb3BlcnRpZXMsICcsJylcblx0XHRvKCd9Jylcblx0fSxcblx0QXJyYXlQYXR0ZXJuOiBhcnIsXG5cdFJlc3RFbGVtZW50KCkge1xuXHRcdG8oJy4uLicpXG5cdFx0ZSh0aGlzLmFyZ3VtZW50KVxuXHR9LFxuXG5cdE1ldGhvZERlZmluaXRpb24oKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGljKVxuXHRcdFx0bygnc3RhdGljICcpXG5cblx0XHRjb25zdCBmdW4gPSB0aGlzLnZhbHVlXG5cdFx0Y29uc3QgcGFyYW1zID0gZnVuLnBhcmFtc1xuXHRcdGNvbnN0IGJvZHkgPSBmdW4uYm9keVxuXG5cdFx0Y29uc3QgcktleSA9ICgpID0+IHtcblx0XHRcdGlmICh0aGlzLmNvbXB1dGVkKSB7XG5cdFx0XHRcdG8oJ1snKVxuXHRcdFx0XHRlKHRoaXMua2V5KVxuXHRcdFx0XHRvKCddJylcblx0XHRcdH0gZWxzZVxuXHRcdFx0XHRlKHRoaXMua2V5KVxuXHRcdH1cblxuXHRcdGlmIChmdW4uZ2VuZXJhdG9yKVxuXHRcdFx0bygnKicpXG5cdFx0c3dpdGNoICh0aGlzLmtpbmQpIHtcblx0XHRcdGNhc2UgJ2NvbnN0cnVjdG9yJzpcblx0XHRcdFx0bygnY29uc3RydWN0b3InKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnbWV0aG9kJzpcblx0XHRcdFx0cktleSgpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdnZXQnOiBjYXNlICdzZXQnOlxuXHRcdFx0XHRvKHRoaXMua2luZClcblx0XHRcdFx0bygnICcpXG5cdFx0XHRcdHJLZXkoKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKHRoaXMua2luZClcblx0XHR9XG5cblx0XHRwYXJlbihwYXJhbXMpXG5cdFx0ZShib2R5KVxuXHR9LFxuXG5cdENsYXNzQm9keSgpIHtcblx0XHRibG9jayh0aGlzLmJvZHksICcnKVxuXHR9LFxuXG5cdENsYXNzRGVjbGFyYXRpb246IHJDbGFzcyxcblx0Q2xhc3NFeHByZXNzaW9uOiByQ2xhc3MsXG5cblx0SW1wb3J0RGVjbGFyYXRpb24oKSB7XG5cdFx0bygnaW1wb3J0ICcpXG5cblx0XHRsZXQgZGVmLCBuYW1lc3BhY2Vcblx0XHRsZXQgc3BlY2lmaWVycyA9IFtdXG5cdFx0Zm9yIChjb25zdCBzIG9mIHRoaXMuc3BlY2lmaWVycykge1xuXHRcdFx0aWYgKHMgaW5zdGFuY2VvZiBJbXBvcnREZWZhdWx0U3BlY2lmaWVyKVxuXHRcdFx0XHRpZiAoZGVmID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0ZGVmID0gc1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNdWx0aXBsZSBkZWZhdWx0IGltcG9ydHMnKVxuXHRcdFx0ZWxzZSBpZiAocyBpbnN0YW5jZW9mIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllcilcblx0XHRcdFx0aWYgKG5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdG5hbWVzcGFjZSA9IHNcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignTXVsdGlwbGUgbmFtZXNwYWNlIGltcG9ydHMnKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHQvLyBJbXBvcnRTcGVjaWZpZXJcblx0XHRcdFx0c3BlY2lmaWVycy5wdXNoKHMpXG5cdFx0fVxuXG5cdFx0bGV0IG5lZWRDb21tYSA9IGZhbHNlXG5cdFx0aWYgKGRlZiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRlKGRlZilcblx0XHRcdG5lZWRDb21tYSA9IHRydWVcblx0XHR9XG5cdFx0aWYgKG5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZiAobmVlZENvbW1hKVxuXHRcdFx0XHRvKCcsJylcblx0XHRcdGUobmFtZXNwYWNlKVxuXHRcdFx0bmVlZENvbW1hID0gdHJ1ZVxuXHRcdH1cblx0XHRpZiAoIWlzRW1wdHkoc3BlY2lmaWVycykpIHtcblx0XHRcdGlmIChuZWVkQ29tbWEpXG5cdFx0XHRcdG8oJywnKVxuXHRcdFx0bygneycpXG5cdFx0XHRpbnRlcmxlYXZlKHNwZWNpZmllcnMsICcsJylcblx0XHRcdG8oJ30nKVxuXHRcdH1cblxuXHRcdG8oJyBmcm9tICcpXG5cdFx0ZSh0aGlzLnNvdXJjZSlcblx0fSxcblx0SW1wb3J0U3BlY2lmaWVyKCkge1xuXHRcdGlmICh0aGlzLmltcG9ydGVkID09PSB0aGlzLmxvY2FsKVxuXHRcdFx0ZSh0aGlzLmxvY2FsKVxuXHRcdGVsc2Uge1xuXHRcdFx0ZSh0aGlzLmltcG9ydGVkKVxuXHRcdFx0bygnIGFzICcpXG5cdFx0XHRlKHRoaXMubG9jYWwpXG5cdFx0fVxuXHR9LFxuXHRJbXBvcnREZWZhdWx0U3BlY2lmaWVyKCkge1xuXHRcdGUodGhpcy5sb2NhbClcblx0fSxcblx0SW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyKCkge1xuXHRcdG8oJyogYXMgJylcblx0XHRlKHRoaXMubG9jYWwpXG5cdH0sXG5cblx0RXhwb3J0U3BlY2lmaWVyKCkge1xuXHRcdGUodGhpcy5sb2NhbClcblx0XHRpZiAodGhpcy5leHBvcnRlZCAhPT0gdGhpcy5sb2NhbCkge1xuXHRcdFx0bygnIGFzICcpXG5cdFx0XHRlKHRoaXMuZXhwb3J0ZWQpXG5cdFx0fVxuXHR9LFxuXHRFeHBvcnROYW1lZERlY2xhcmF0aW9uKCkge1xuXHRcdG8oJ2V4cG9ydCAnKVxuXHRcdGlmICh0aGlzLmRlY2xhcmF0aW9uICE9PSBudWxsKVxuXHRcdFx0ZSh0aGlzLmRlY2xhcmF0aW9uKVxuXHRcdGVsc2Uge1xuXHRcdFx0bygneycpXG5cdFx0XHRpbnRlcmxlYXZlKHRoaXMuc3BlY2lmaWVycywgJywnKVxuXHRcdFx0bygnfScpXG5cdFx0XHRpZiAodGhpcy5zb3VyY2UgIT09IG51bGwpIHtcblx0XHRcdFx0bygnIGZyb20gJylcblx0XHRcdFx0ZSh0aGlzLnNvdXJjZSlcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbigpIHtcblx0XHRvKCdleHBvcnQgZGVmYXVsdCAnKVxuXHRcdGUodGhpcy5kZWNsYXJhdGlvbilcblx0fSxcblx0RXhwb3J0QWxsRGVjbGFyYXRpb24oKSB7XG5cdFx0bygnZXhwb3J0ICogZnJvbSAnKVxuXHRcdGUodGhpcy5zb3VyY2UpXG5cdH1cbn0pXG5cbmNvbnN0XG5cdGVzY2FwZVN0cmluZ0ZvckxpdGVyYWwgPSBzdHIgPT5cblx0XHRzdHIucmVwbGFjZSgvW1xcXFxcIlxcblxcdFxcYlxcZlxcdlxcclxcdTIwMjhcXHUyMDI5XS9nLCBjaCA9PiBsaXRlcmFsRXNjYXBlc1tjaF0pLFxuXHRsaXRlcmFsRXNjYXBlcyA9IHtcblx0XHQnXFxcXCc6ICdcXFxcXFxcXCcsXG5cdFx0J1wiJzogJ1xcXFxcIicsXG5cdFx0J1xcbic6ICdcXFxcbicsXG5cdFx0J1xcdCc6ICdcXFxcdCcsXG5cdFx0J1xcYic6ICdcXFxcYicsXG5cdFx0J1xcZic6ICdcXFxcZicsXG5cdFx0J1xcdic6ICdcXFxcdicsXG5cdFx0J1xccic6ICdcXFxccicsXG5cdFx0J1xcdTIwMjgnOiAnXFxcXHUyMDI4Jyxcblx0XHQnXFx1MjAyOSc6ICdcXFxcdTIwMjknXG5cdH1cbiJdfQ==