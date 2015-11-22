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

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj;
		} else {
			var newObj = {};

			if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
				}
			}

			newObj.default = obj;
			return newObj;
		}
	}

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
			indentStrs.push(`${ last(indentStrs) }\t`);
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
			strOut = `${ strOut }\n${ indentStr }`;
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
			if (this.test === null) o('default');else {
				o('case ');
				e(this.test);
			}
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
			if (this.argument === null) o('return');else {
				o('return ');
				e(this.argument);
			}
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
			const specifiers = [];

			for (const s of this.specifiers) {
				if (s instanceof _ast.ImportDefaultSpecifier) {
					if (def === undefined) def = s;else throw new Error('Multiple default imports');
				} else if (s instanceof _ast.ImportNamespaceSpecifier) {
					if (namespace === undefined) namespace = s;else throw new Error('Multiple namespace imports');
				} else specifiers.push(s);
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

			if (this.declaration === null) {
				o('{');
				interleave(this.specifiers, ',');
				o('}');

				if (this.source !== null) {
					o(' from ');
					e(this.source);
				}
			} else e(this.declaration);
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

	function escapeStringForLiteral(str) {
		return str.replace(/[\\"\n\t\b\f\v\r\u2028\u2029]/g, ch => literalEscapes.get(ch));
	}

	const literalEscapes = new Map([['\\', '\\\\'], ['"', '\\"'], ['\n', '\\n'], ['\t', '\\t'], ['\b', '\\b'], ['\f', '\\f'], ['\v', '\\v'], ['\r', '\\r'], ['\u2028', '\\u2028'], ['\u2029', '\\u2029']]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQWF3QixNQUFNO1NBb0JkLG1CQUFtQixHQUFuQixtQkFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXBCWCxNQUFNOzs7Ozs7Ozs7VUFvQmQsbUJBQW1CIiwiZmlsZSI6InJlbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U291cmNlTWFwR2VuZXJhdG9yfSBmcm9tICdzb3VyY2UtbWFwL2Rpc3Qvc291cmNlLW1hcC5taW4nXG5pbXBvcnQgKiBhcyBBc3QgZnJvbSAnLi9hc3QnXG5pbXBvcnQge0Fycm93RnVuY3Rpb25FeHByZXNzaW9uLCBCbG9ja1N0YXRlbWVudCwgSWRlbnRpZmllciwgSW1wb3J0RGVmYXVsdFNwZWNpZmllcixcblx0SW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyLCBMaXRlcmFsfSBmcm9tICcuL2FzdCdcbmltcG9ydCB7UG9zLCBTdGFydENvbHVtbiwgU3RhcnRMaW5lfSBmcm9tICcuL0xvYydcblxuLyoqXG5DcmVhdGVzIEphdmFTY3JpcHQgc291cmNlIGNvZGUgZnJvbSBhIHtAbGluayBOb2RlfS5cbkBwYXJhbSB7Tm9kZX0gYXN0XG5AcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnVnbHlcblx0SWYgdHJ1ZSwgd2lsbCBub3Qgb3V0cHV0IGFueSB3aGl0ZXNwYWNlLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcihhc3QsIG9wdGlvbnMpIHtcblx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKVxuXHRcdG9wdGlvbnMgPSB7fVxuXG5cdHNldFVwKG9wdGlvbnMpXG5cdGUoYXN0KVxuXHRjb25zdCByZXMgPSBzdHJPdXRcblx0dGVhckRvd24oKVxuXHRyZXR1cm4gcmVzXG59XG5cbi8qKlxuU2FtZSBhcyB7QGxpbmsgcmVuZGVyfSwgYnV0IHdpdGggYSBzb3VyY2UgbWFwIGFzIHBhcnQgb2YgdGhlIG91dHB1dC5cbkBwYXJhbSB7Tm9kZX0gYXN0XG5AcGFyYW0ge3N0cmluZ30gaW5GaWxlUGF0aCBOYW1lIG9mIGlucHV0IGZpbGUuXG5AcGFyYW0ge3N0cmluZ30gb3V0RmlsZVBhdGggTmFtZSBvZiBvdXRwdXQgZmlsZS5cbkBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFNhbWUgb3B0aW9ucyBhcyBmb3Ige0BsaW5rIHJlbmRlcn0uXG5AcmV0dXJuIHtjb2RlOiBzdHJpbmcsIHNvdXJjZU1hcDogc3RyaW5nfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJXaXRoU291cmNlTWFwKGFzdCwgaW5GaWxlUGF0aCwgb3V0RmlsZVBhdGgsIG9wdGlvbnMpIHtcblx0Ly8gVE9ETzpFUzYgT3B0aW9uYWwgYXJnc1xuXHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKVxuXHRcdG9wdGlvbnMgPSB7fVxuXG5cdHNldFVwKG9wdGlvbnMsIGluRmlsZVBhdGgsIG91dEZpbGVQYXRoKVxuXHRlKGFzdClcblx0Y29uc3QgcmVzID0ge2NvZGU6IHN0ck91dCwgc291cmNlTWFwOiBzb3VyY2VNYXAudG9KU09OKCl9XG5cdHRlYXJEb3duKClcblx0cmV0dXJuIHJlc1xufVxuXG4vLyBNdXN0IGluaXQgdGhlc2UgYWxsIGJlZm9yZSByZW5kZXJpbmcuXG5sZXQgc3RyT3V0LFxuXHRpbmRlbnRBbW91bnQsIGluZGVudFN0cixcblx0dXNpbmdTb3VyY2VNYXBzLCBjdXJBc3QsIGluRmlsZVBhdGgsIHNvdXJjZU1hcCwgb3V0TGluZSwgb3V0Q29sdW1uLCBsYXN0TWFwcGVkQXN0LFxuXHQvLyBvcHRpb25zXG5cdHVnbHlcblxuZnVuY3Rpb24gc2V0VXAob3B0aW9ucywgaW5QYXRoLCBvdXRQYXRoKSB7XG5cdHVnbHkgPSBCb29sZWFuKG9wdGlvbnMudWdseSlcblxuXHRpbmRlbnRBbW91bnQgPSAwXG5cdF9zZXRJbmRlbnQoKVxuXHRzdHJPdXQgPSAnJ1xuXHR1c2luZ1NvdXJjZU1hcHMgPSBpblBhdGggIT09IHVuZGVmaW5lZFxuXHRpZiAodXNpbmdTb3VyY2VNYXBzKSB7XG5cdFx0aW5GaWxlUGF0aCA9IGluUGF0aFxuXHRcdHNvdXJjZU1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3Ioe2ZpbGU6IG91dFBhdGh9KVxuXHRcdG91dExpbmUgPSBTdGFydExpbmVcblx0XHRvdXRDb2x1bW4gPSBTdGFydENvbHVtblxuXHRcdGxhc3RNYXBwZWRBc3QgPSBudWxsXG5cdH1cbn1cblxuZnVuY3Rpb24gdGVhckRvd24oKSB7XG5cdHN0ck91dCA9ICcnXG5cdGluRmlsZVBhdGggPSBzb3VyY2VNYXAgPSBjdXJBc3QgPSBsYXN0TWFwcGVkQXN0ID0gdW5kZWZpbmVkXG59XG5cbi8vIFJlbmRlcnMgYSBzaW5nbGUgZXhwcmVzc2lvbi5cbmZ1bmN0aW9uIGUoYXN0KSB7XG5cdGlmICh1c2luZ1NvdXJjZU1hcHMpXG5cdFx0Y3VyQXN0ID0gYXN0XG5cdGFzdC5yZW5kZXIoKVxufVxuXG4vLyBPdXRwdXRzIGEgc3RyaW5nLlxuLy8gc3RyIG1heSBub3QgY29udGFpbiBuZXdsaW5lcy5cbmZ1bmN0aW9uIG8oc3RyKSB7XG5cdHN0ck91dCA9IHN0ck91dCArIHN0clxuXHRpZiAodXNpbmdTb3VyY2VNYXBzKVxuXHRcdF9tYXBTdHIoc3RyKVxufVxuXG5mdW5jdGlvbiBpbnRlcmxlYXZlKGFzdHMsIHN0cikge1xuXHRpZiAoIWlzRW1wdHkoYXN0cykpIHtcblx0XHRjb25zdCBtYXhJID0gYXN0cy5sZW5ndGggLSAxXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXhJOyBpID0gaSArIDEpIHtcblx0XHRcdGUoYXN0c1tpXSlcblx0XHRcdG8oc3RyKVxuXHRcdH1cblx0XHRlKGFzdHNbbWF4SV0pXG5cdH1cbn1cblxuZnVuY3Rpb24gcGFyZW4oYXN0cykge1xuXHRvKCcoJylcblx0aW50ZXJsZWF2ZShhc3RzLCAnLCcpXG5cdG8oJyknKVxufVxuXG5mdW5jdGlvbiBibG9jayhibG9ja0xpbmVzLCBsaW5lU2VwYXJhdG9yKSB7XG5cdGlmIChpc0VtcHR5KGJsb2NrTGluZXMpKVxuXHRcdG8oJ3t9Jylcblx0ZWxzZSB7XG5cdFx0bygneycpXG5cdFx0aW5kZW50KClcblx0XHRubCgpXG5cdFx0bGluZXMoYmxvY2tMaW5lcywgbGluZVNlcGFyYXRvcilcblx0XHR1bmluZGVudCgpXG5cdFx0bmwoKVxuXHRcdG8oJ30nKVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpbmVzKGxpbmVzLCBsaW5lU2VwYXJhdG9yKSB7XG5cdGlmIChsaW5lcy5sZW5ndGggPiAwKSB7XG5cdFx0Y29uc3QgbWF4SSA9IGxpbmVzLmxlbmd0aCAtIDFcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1heEk7IGkgPSBpICsgMSkge1xuXHRcdFx0ZShsaW5lc1tpXSlcblx0XHRcdG8obGluZVNlcGFyYXRvcilcblx0XHRcdG5sKClcblx0XHR9XG5cdFx0ZShsaW5lc1ttYXhJXSlcblx0fVxufVxuXG5jb25zdCBpbmRlbnRTdHJzID0gWycnXVxuZnVuY3Rpb24gX3NldEluZGVudCgpIHtcblx0aW5kZW50U3RyID0gaW5kZW50U3Ryc1tpbmRlbnRBbW91bnRdXG5cdHdoaWxlIChpbmRlbnRTdHIgPT09IHVuZGVmaW5lZCkge1xuXHRcdGluZGVudFN0cnMucHVzaChgJHtsYXN0KGluZGVudFN0cnMpfVxcdGApXG5cdFx0aW5kZW50U3RyID0gaW5kZW50U3Ryc1tpbmRlbnRBbW91bnRdXG5cdH1cbn1cblxuZnVuY3Rpb24gaW5kZW50KCkge1xuXHRpZiAoIXVnbHkpIHtcblx0XHRpbmRlbnRBbW91bnQgPSBpbmRlbnRBbW91bnQgKyAxXG5cdFx0X3NldEluZGVudCgpXG5cdH1cbn1cblxuZnVuY3Rpb24gdW5pbmRlbnQoKSB7XG5cdGlmICghdWdseSkge1xuXHRcdGluZGVudEFtb3VudCA9IGluZGVudEFtb3VudCAtIDFcblx0XHRfc2V0SW5kZW50KClcblx0fVxufVxuXG5mdW5jdGlvbiBubCgpIHtcblx0aWYgKCF1Z2x5KSB7XG5cdFx0c3RyT3V0ID0gYCR7c3RyT3V0fVxcbiR7aW5kZW50U3RyfWBcblx0XHRpZiAodXNpbmdTb3VyY2VNYXBzKVxuXHRcdFx0X21hcE5ld0xpbmUoKVxuXHR9XG59XG5cbi8vIFByaXZhdGVcbmZ1bmN0aW9uIF9tYXBTdHIoc3RyKSB7XG5cdGlmIChjdXJBc3QgIT09IGxhc3RNYXBwZWRBc3QgJiYgY3VyQXN0LmxvYyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0c291cmNlTWFwLmFkZE1hcHBpbmcoe1xuXHRcdFx0c291cmNlOiBpbkZpbGVQYXRoLFxuXHRcdFx0b3JpZ2luYWw6IGN1ckFzdC5sb2Muc3RhcnQsXG5cdFx0XHRnZW5lcmF0ZWQ6IG5ldyBQb3Mob3V0TGluZSwgb3V0Q29sdW1uKVxuXHRcdH0pXG5cdFx0bGFzdE1hcHBlZEFzdCA9IGN1ckFzdFxuXHR9XG5cdG91dENvbHVtbiA9IG91dENvbHVtbiArIHN0ci5sZW5ndGhcbn1cbmZ1bmN0aW9uIF9tYXBOZXdMaW5lKCkge1xuXHRvdXRMaW5lID0gb3V0TGluZSArIDFcblx0b3V0Q29sdW1uID0gU3RhcnRDb2x1bW4gKyBpbmRlbnRBbW91bnRcblx0Ly8gTWFwcGluZ3MgZW5kIGF0IGVuZCBvZiBsaW5lLiBNdXN0IGJlZ2luIGFuZXcuXG5cdGxhc3RNYXBwZWRBc3QgPSBudWxsXG59XG5cbi8vIEltcGxlbWVudGF0aW9ucyB1c2VkIG1vcmUgdGhhbiBvbmNlXG5cbmZ1bmN0aW9uIGZ1bigpIHtcblx0byh0aGlzLmdlbmVyYXRvciA/ICdmdW5jdGlvbionIDogJ2Z1bmN0aW9uJylcblx0aWYgKHRoaXMuaWQgIT09IG51bGwpIHtcblx0XHRvKCcgJylcblx0XHRlKHRoaXMuaWQpXG5cdH1cblx0cGFyZW4odGhpcy5wYXJhbXMpXG5cdGUodGhpcy5ib2R5KVxufVxuXG5mdW5jdGlvbiBhcnIoKSB7XG5cdGlmIChpc0VtcHR5KHRoaXMuZWxlbWVudHMpKVxuXHRcdG8oJ1tdJylcblx0ZWxzZSB7XG5cdFx0bygnWycpXG5cdFx0aW50ZXJsZWF2ZSh0aGlzLmVsZW1lbnRzLCAnLCcpXG5cdFx0bygnXScpXG5cdH1cbn1cblxuZnVuY3Rpb24gckNsYXNzKCkge1xuXHRvKCdjbGFzcyAnKVxuXHRpZiAodGhpcy5pZCAhPT0gbnVsbClcblx0XHRlKHRoaXMuaWQpXG5cdGlmICh0aGlzLnN1cGVyQ2xhc3MgIT09IG51bGwpIHtcblx0XHRvKCcgZXh0ZW5kcyAnKVxuXHRcdGUodGhpcy5zdXBlckNsYXNzKVxuXHR9XG5cdGUodGhpcy5ib2R5KVxufVxuXG5jb25zdFxuXHRmb3JJbk9mID0gKF8sIGtpbmQpID0+IHtcblx0XHRvKCdmb3IoJylcblx0XHRlKF8ubGVmdClcblx0XHRvKGtpbmQpXG5cdFx0ZShfLnJpZ2h0KVxuXHRcdG8oJyknKVxuXHRcdGUoXy5ib2R5KVxuXHR9XG5cbmNvbnN0XG5cdGltcGxlbWVudE1hbnkgPSAoaG9sZGVyLCBtZXRob2ROYW1lLCBuYW1lVG9JbXBsKSA9PiB7XG5cdFx0T2JqZWN0LmtleXMobmFtZVRvSW1wbCkuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGhvbGRlcltuYW1lXS5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBuYW1lVG9JbXBsW25hbWVdXG5cdFx0fSlcblx0fSxcblxuXHRpc0VtcHR5ID0gYXJyID0+XG5cdFx0YXJyLmxlbmd0aCA9PT0gMCxcblxuXHRsYXN0ID0gYXJyID0+XG5cdFx0YXJyW2Fyci5sZW5ndGggLSAxXVxuXG5pbXBsZW1lbnRNYW55KEFzdCwgJ3JlbmRlcicsIHtcblx0UHJvZ3JhbSgpIHtcblx0XHRsaW5lcyh0aGlzLmJvZHksICc7Jylcblx0fSxcblxuXHRJZGVudGlmaWVyKCkge1xuXHRcdG8odGhpcy5uYW1lKVxuXHR9LFxuXG5cdC8vIFN0YXRlbWVudHNcblx0RW1wdHlTdGF0ZW1lbnQoKSB7IH0sXG5cdEJsb2NrU3RhdGVtZW50KCkge1xuXHRcdGJsb2NrKHRoaXMuYm9keSwgJzsnKVxuXHR9LFxuXHRFeHByZXNzaW9uU3RhdGVtZW50KCkge1xuXHRcdGUodGhpcy5leHByZXNzaW9uKVxuXHR9LFxuXHRJZlN0YXRlbWVudCgpIHtcblx0XHRvKCdpZignKVxuXHRcdGUodGhpcy50ZXN0KVxuXHRcdG8oJyknKVxuXHRcdGUodGhpcy5jb25zZXF1ZW50KVxuXHRcdGlmICh0aGlzLmFsdGVybmF0ZSAhPT0gbnVsbCkge1xuXHRcdFx0aWYgKCEodGhpcy5jb25zZXF1ZW50IGluc3RhbmNlb2YgQmxvY2tTdGF0ZW1lbnQpKVxuXHRcdFx0XHRvKCc7Jylcblx0XHRcdG8oJyBlbHNlICcpXG5cdFx0XHRlKHRoaXMuYWx0ZXJuYXRlKVxuXHRcdH1cblx0fSxcblx0TGFiZWxlZFN0YXRlbWVudCgpIHtcblx0XHRlKHRoaXMubGFiZWwpXG5cdFx0bygnOicpXG5cdFx0ZSh0aGlzLmJvZHkpXG5cdH0sXG5cdEJyZWFrU3RhdGVtZW50KCkge1xuXHRcdG8oJ2JyZWFrJylcblx0XHRpZiAodGhpcy5sYWJlbCAhPT0gbnVsbCkge1xuXHRcdFx0bygnICcpXG5cdFx0XHRlKHRoaXMubGFiZWwpXG5cdFx0fVxuXHR9LFxuXHRDb250aW51ZVN0YXRlbWVudCgpIHtcblx0XHRvKCdjb250aW51ZScpXG5cdFx0aWYgKHRoaXMubGFiZWwgIT09IG51bGwpIHtcblx0XHRcdG8oJyAnKVxuXHRcdFx0ZSh0aGlzLmxhYmVsKVxuXHRcdH1cblx0fSxcblx0U3dpdGNoQ2FzZSgpIHtcblx0XHRpZiAodGhpcy50ZXN0ID09PSBudWxsKVxuXHRcdFx0bygnZGVmYXVsdCcpXG5cdFx0ZWxzZSB7XG5cdFx0XHRvKCdjYXNlICcpXG5cdFx0XHRlKHRoaXMudGVzdClcblx0XHR9XG5cdFx0bygnOicpXG5cdFx0c3dpdGNoICh0aGlzLmNvbnNlcXVlbnQubGVuZ3RoKSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdGUodGhpcy5jb25zZXF1ZW50WzBdKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aW5kZW50KClcblx0XHRcdFx0bmwoKVxuXHRcdFx0XHRsaW5lcyh0aGlzLmNvbnNlcXVlbnQsICc7Jylcblx0XHRcdFx0dW5pbmRlbnQoKVxuXHRcdH1cblx0fSxcblx0U3dpdGNoU3RhdGVtZW50KCkge1xuXHRcdG8oJ3N3aXRjaCgnKVxuXHRcdGUodGhpcy5kaXNjcmltaW5hbnQpXG5cdFx0bygnKScpXG5cdFx0YmxvY2sodGhpcy5jYXNlcywgJycpXG5cdH0sXG5cdFJldHVyblN0YXRlbWVudCgpIHtcblx0XHRpZiAodGhpcy5hcmd1bWVudCA9PT0gbnVsbClcblx0XHRcdG8oJ3JldHVybicpXG5cdFx0ZWxzZSB7XG5cdFx0XHRvKCdyZXR1cm4gJylcblx0XHRcdGUodGhpcy5hcmd1bWVudClcblx0XHR9XG5cdH0sXG5cdFRocm93U3RhdGVtZW50KCkge1xuXHRcdG8oJ3Rocm93ICcpXG5cdFx0ZSh0aGlzLmFyZ3VtZW50KVxuXHR9LFxuXHRDYXRjaENsYXVzZSgpIHtcblx0XHRvKCdjYXRjaCgnKVxuXHRcdGUodGhpcy5wYXJhbSlcblx0XHRvKCcpJylcblx0XHRlKHRoaXMuYm9keSlcblx0fSxcblx0VHJ5U3RhdGVtZW50KCkge1xuXHRcdG8oJ3RyeSAnKVxuXHRcdGUodGhpcy5ibG9jaylcblx0XHRpZiAodGhpcy5oYW5kbGVyICE9PSBudWxsKVxuXHRcdFx0ZSh0aGlzLmhhbmRsZXIpXG5cdFx0aWYgKHRoaXMuZmluYWxpemVyICE9PSBudWxsKSB7XG5cdFx0XHRvKCdmaW5hbGx5Jylcblx0XHRcdGUodGhpcy5maW5hbGl6ZXIpXG5cdFx0fVxuXHR9LFxuXHRXaGlsZVN0YXRlbWVudCgpIHtcblx0XHRvKCd3aGlsZSgnKVxuXHRcdGUodGhpcy50ZXN0KVxuXHRcdG8oJyknKVxuXHRcdGUodGhpcy5ib2R5KVxuXHR9LFxuXHREb1doaWxlU3RhdGVtZW50KCkge1xuXHRcdG8oJ2RvICcpXG5cdFx0ZSh0aGlzLmJvZHkpXG5cdFx0aWYgKCEodGhpcy5ib2R5IGluc3RhbmNlb2YgQmxvY2tTdGF0ZW1lbnQpKVxuXHRcdFx0bygnOycpXG5cdFx0bygnIHdoaWxlKCcpXG5cdFx0ZSh0aGlzLnRlc3QpXG5cdFx0bygnKScpXG5cdH0sXG5cdEZvclN0YXRlbWVudCgpIHtcblx0XHRvKCdmb3IoJylcblx0XHRpZiAodGhpcy5pbml0ICE9PSBudWxsKVxuXHRcdFx0ZSh0aGlzLmluaXQpXG5cdFx0bygnOycpXG5cdFx0aWYgKHRoaXMudGVzdCAhPT0gbnVsbClcblx0XHRcdGUodGhpcy50ZXN0KVxuXHRcdG8oJzsnKVxuXHRcdGlmICh0aGlzLnVwZGF0ZSAhPT0gbnVsbClcblx0XHRcdGUodGhpcy51cGRhdGUpXG5cdFx0bygnKScpXG5cdFx0ZSh0aGlzLmJvZHkpXG5cdH0sXG5cdEZvckluU3RhdGVtZW50KCkgeyBmb3JJbk9mKHRoaXMsICcgaW4gJykgfSxcblx0Rm9yT2ZTdGF0ZW1lbnQoKSB7IGZvckluT2YodGhpcywgJyBvZiAnKSB9LFxuXHREZWJ1Z2dlclN0YXRlbWVudCgpIHtcblx0XHRvKCdkZWJ1Z2dlcicpXG5cdH0sXG5cblx0Ly8gRGVjbGFyYXRpb25zXG5cdEZ1bmN0aW9uRGVjbGFyYXRpb246IGZ1bixcblx0VmFyaWFibGVEZWNsYXJhdG9yKCkge1xuXHRcdGUodGhpcy5pZClcblx0XHRpZiAodGhpcy5pbml0ICE9PSBudWxsKSB7XG5cdFx0XHRvKCc9Jylcblx0XHRcdGUodGhpcy5pbml0KVxuXHRcdH1cblx0fSxcblx0VmFyaWFibGVEZWNsYXJhdGlvbigpIHtcblx0XHRvKHRoaXMua2luZClcblx0XHRvKCcgJylcblx0XHRpbnRlcmxlYXZlKHRoaXMuZGVjbGFyYXRpb25zLCAnLCcpXG5cdH0sXG5cblx0Ly8gRXhwcmVzc2lvbnNcblx0VGhpc0V4cHJlc3Npb24oKSB7XG5cdFx0bygndGhpcycpXG5cdH0sXG5cdEFycmF5RXhwcmVzc2lvbjogYXJyLFxuXHRPYmplY3RFeHByZXNzaW9uKCkge1xuXHRcdGlmIChpc0VtcHR5KHRoaXMucHJvcGVydGllcykpXG5cdFx0XHRvKCd7fScpXG5cdFx0ZWxzZVxuXHRcdFx0YmxvY2sodGhpcy5wcm9wZXJ0aWVzLCAnLCcpXG5cdH0sXG5cdFByb3BlcnR5KCkge1xuXHRcdGNvbnN0IG91dHB1dEtleSA9ICgpID0+IHtcblx0XHRcdGlmICh0aGlzLmNvbXB1dGVkKSB7XG5cdFx0XHRcdG8oJ1snKVxuXHRcdFx0XHRlKHRoaXMua2V5KVxuXHRcdFx0XHRvKCddJylcblx0XHRcdH0gZWxzZVxuXHRcdFx0XHRlKHRoaXMua2V5KVxuXHRcdH1cblx0XHRjb25zdCBvdXRwdXRGdW4gPSAoKSA9PiB7XG5cdFx0XHRvdXRwdXRLZXkoKVxuXHRcdFx0cGFyZW4odGhpcy52YWx1ZS5wYXJhbXMpXG5cdFx0XHRlKHRoaXMudmFsdWUuYm9keSlcblx0XHR9XG5cblx0XHRpZiAodGhpcy5raW5kID09PSAnaW5pdCcpXG5cdFx0XHRpZiAodGhpcy5tZXRob2QpIHtcblx0XHRcdFx0aWYgKHRoaXMudmFsdWUuZ2VuZXJhdG9yKVxuXHRcdFx0XHRcdG8oJyonKVxuXHRcdFx0XHRvdXRwdXRGdW4oKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0S2V5KClcblx0XHRcdFx0bygnOicpXG5cdFx0XHRcdGUodGhpcy52YWx1ZSlcblx0XHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdG8odGhpcy5raW5kKVxuXHRcdFx0bygnICcpXG5cdFx0XHRvdXRwdXRGdW4oKVxuXHRcdH1cblx0fSxcblx0RnVuY3Rpb25FeHByZXNzaW9uOiBmdW4sXG5cdEFycm93RnVuY3Rpb25FeHByZXNzaW9uKCkge1xuXHRcdGlmICh0aGlzLnBhcmFtcy5sZW5ndGggPT09IDEgJiYgdGhpcy5wYXJhbXNbMF0gaW5zdGFuY2VvZiBJZGVudGlmaWVyKVxuXHRcdFx0ZSh0aGlzLnBhcmFtc1swXSlcblx0XHRlbHNlXG5cdFx0XHRwYXJlbih0aGlzLnBhcmFtcylcblx0XHRvKCc9PicpXG5cdFx0ZSh0aGlzLmJvZHkpXG5cdH0sXG5cdFNlcXVlbmNlRXhwcmVzc2lvbigpIHtcblx0XHRpbnRlcmxlYXZlKHRoaXMuZXhwcmVzc2lvbnMsICcsJylcblx0fSxcblx0VW5hcnlFeHByZXNzaW9uKCkge1xuXHRcdG8odGhpcy5vcGVyYXRvcilcblx0XHRvKCcgJylcblx0XHRlKHRoaXMuYXJndW1lbnQpXG5cdH0sXG5cdEJpbmFyeUV4cHJlc3Npb24oKSB7XG5cdFx0bygnKCcpXG5cdFx0ZSh0aGlzLmxlZnQpXG5cdFx0byh0aGlzLm9wZXJhdG9yID09PSAnaW5zdGFuY2VvZicgPyAnIGluc3RhbmNlb2YgJyA6IHRoaXMub3BlcmF0b3IpXG5cdFx0ZSh0aGlzLnJpZ2h0KVxuXHRcdG8oJyknKVxuXHR9LFxuXHRBc3NpZ25tZW50RXhwcmVzc2lvbigpIHtcblx0XHRlKHRoaXMubGVmdClcblx0XHRvKHRoaXMub3BlcmF0b3IpXG5cdFx0ZSh0aGlzLnJpZ2h0KVxuXHR9LFxuXHRVcGRhdGVFeHByZXNzaW9uKCkge1xuXHRcdGlmICh0aGlzLnByZWZpeCkge1xuXHRcdFx0byh0aGlzLm9wZXJhdG9yKVxuXHRcdFx0ZSh0aGlzLmFyZ3VtZW50KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRlKHRoaXMuYXJndW1lbnQpXG5cdFx0XHRvKHRoaXMub3BlcmF0b3IpXG5cdFx0fVxuXHR9LFxuXHRMb2dpY2FsRXhwcmVzc2lvbigpIHtcblx0XHRvKCcoJylcblx0XHRlKHRoaXMubGVmdClcblx0XHRvKHRoaXMub3BlcmF0b3IpXG5cdFx0ZSh0aGlzLnJpZ2h0KVxuXHRcdG8oJyknKVxuXHR9LFxuXHRDb25kaXRpb25hbEV4cHJlc3Npb24oKSB7XG5cdFx0bygnKCcpXG5cdFx0ZSh0aGlzLnRlc3QpXG5cdFx0bygnPycpXG5cdFx0ZSh0aGlzLmNvbnNlcXVlbnQpXG5cdFx0bygnOicpXG5cdFx0ZSh0aGlzLmFsdGVybmF0ZSlcblx0XHRvKCcpJylcblx0fSxcblx0TmV3RXhwcmVzc2lvbigpIHtcblx0XHRvKCduZXcgKCcpXG5cdFx0ZSh0aGlzLmNhbGxlZSlcblx0XHRvKCcpJylcblx0XHRwYXJlbih0aGlzLmFyZ3VtZW50cylcblx0fSxcblx0Q2FsbEV4cHJlc3Npb24oKSB7XG5cdFx0aWYgKHRoaXMuY2FsbGVlIGluc3RhbmNlb2YgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24pIHtcblx0XHRcdG8oJygnKVxuXHRcdFx0ZSh0aGlzLmNhbGxlZSlcblx0XHRcdG8oJyknKVxuXHRcdH0gZWxzZVxuXHRcdFx0ZSh0aGlzLmNhbGxlZSlcblx0XHRwYXJlbih0aGlzLmFyZ3VtZW50cylcblx0fSxcblx0U3ByZWFkRWxlbWVudCgpIHtcblx0XHRvKCcuLi4nKVxuXHRcdGUodGhpcy5hcmd1bWVudClcblx0fSxcblx0TWVtYmVyRXhwcmVzc2lvbigpIHtcblx0XHRlKHRoaXMub2JqZWN0KVxuXHRcdGlmICh0aGlzLmNvbXB1dGVkKSB7XG5cdFx0XHRvKCdbJylcblx0XHRcdGUodGhpcy5wcm9wZXJ0eSlcblx0XHRcdG8oJ10nKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodGhpcy5vYmplY3QgaW5zdGFuY2VvZiBMaXRlcmFsICYmXG5cdFx0XHRcdHR5cGVvZiB0aGlzLm9iamVjdC52YWx1ZSA9PT0gJ251bWJlcicgJiZcblx0XHRcdFx0dGhpcy5vYmplY3QudmFsdWUgPT09ICh0aGlzLm9iamVjdC52YWx1ZSB8IDApKVxuXHRcdFx0XHRvKCcuLicpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdG8oJy4nKVxuXHRcdFx0ZSh0aGlzLnByb3BlcnR5KVxuXHRcdH1cblx0fSxcblx0WWllbGRFeHByZXNzaW9uKCkge1xuXHRcdGlmICh0aGlzLmFyZ3VtZW50ID09PSBudWxsKVxuXHRcdFx0bygnKHlpZWxkKScpXG5cdFx0ZWxzZSB7XG5cdFx0XHRvKHRoaXMuZGVsZWdhdGUgPyAnKHlpZWxkKiAnIDogJyh5aWVsZCAnKVxuXHRcdFx0aWYgKHRoaXMuYXJndW1lbnQgIT09IG51bGwpXG5cdFx0XHRcdGUodGhpcy5hcmd1bWVudClcblx0XHRcdG8oJyknKVxuXHRcdH1cblx0fSxcblx0TGl0ZXJhbCgpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMudmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRvKCdcIicpXG5cdFx0XHRvKGVzY2FwZVN0cmluZ0ZvckxpdGVyYWwodGhpcy52YWx1ZSkpXG5cdFx0XHRvKCdcIicpXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdG8odGhpcy52YWx1ZSA9PT0gbnVsbCA/ICdudWxsJyA6IHRoaXMudmFsdWUudG9TdHJpbmcoKSlcblx0fSxcblxuXHQvLyBUZW1wbGF0ZXNcblx0VGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdG8odGhpcy52YWx1ZS5yYXcpXG5cdH0sXG5cdFRlbXBsYXRlTGl0ZXJhbCgpIHtcblx0XHRvKCdgJylcblx0XHRlKHRoaXMucXVhc2lzWzBdKVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5leHByZXNzaW9ucy5sZW5ndGg7IGkgPSBpICsgMSlcdCB7XG5cdFx0XHRvKCckeycpXG5cdFx0XHRlKHRoaXMuZXhwcmVzc2lvbnNbaV0pXG5cdFx0XHRvKCd9Jylcblx0XHRcdGUodGhpcy5xdWFzaXNbaSArIDFdKVxuXHRcdH1cblx0XHRvKCdgJylcblx0fSxcblx0VGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uKCkge1xuXHRcdGUodGhpcy50YWcpXG5cdFx0ZSh0aGlzLnF1YXNpKVxuXHR9LFxuXG5cdC8vIFBhdHRlcm5zXG5cdEFzc2lnbm1lbnRQcm9wZXJ0eSgpIHtcblx0XHRlKHRoaXMua2V5KVxuXHRcdGlmICh0aGlzLmtleSAhPT0gdGhpcy52YWx1ZSkge1xuXHRcdFx0bygnOicpXG5cdFx0XHRlKHRoaXMudmFsdWUpXG5cdFx0fVxuXHR9LFxuXHRPYmplY3RQYXR0ZXJuKCkge1xuXHRcdG8oJ3snKVxuXHRcdGludGVybGVhdmUodGhpcy5wcm9wZXJ0aWVzLCAnLCcpXG5cdFx0bygnfScpXG5cdH0sXG5cdEFycmF5UGF0dGVybjogYXJyLFxuXHRSZXN0RWxlbWVudCgpIHtcblx0XHRvKCcuLi4nKVxuXHRcdGUodGhpcy5hcmd1bWVudClcblx0fSxcblxuXHRNZXRob2REZWZpbml0aW9uKCkge1xuXHRcdGlmICh0aGlzLnN0YXRpYylcblx0XHRcdG8oJ3N0YXRpYyAnKVxuXG5cdFx0Y29uc3QgZnVuID0gdGhpcy52YWx1ZVxuXHRcdGNvbnN0IHBhcmFtcyA9IGZ1bi5wYXJhbXNcblx0XHRjb25zdCBib2R5ID0gZnVuLmJvZHlcblxuXHRcdGNvbnN0IHJLZXkgPSAoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5jb21wdXRlZCkge1xuXHRcdFx0XHRvKCdbJylcblx0XHRcdFx0ZSh0aGlzLmtleSlcblx0XHRcdFx0bygnXScpXG5cdFx0XHR9IGVsc2Vcblx0XHRcdFx0ZSh0aGlzLmtleSlcblx0XHR9XG5cblx0XHRpZiAoZnVuLmdlbmVyYXRvcilcblx0XHRcdG8oJyonKVxuXHRcdHN3aXRjaCAodGhpcy5raW5kKSB7XG5cdFx0XHRjYXNlICdjb25zdHJ1Y3Rvcic6XG5cdFx0XHRcdG8oJ2NvbnN0cnVjdG9yJylcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ21ldGhvZCc6XG5cdFx0XHRcdHJLZXkoKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnZ2V0JzogY2FzZSAnc2V0Jzpcblx0XHRcdFx0byh0aGlzLmtpbmQpXG5cdFx0XHRcdG8oJyAnKVxuXHRcdFx0XHRyS2V5KClcblx0XHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcih0aGlzLmtpbmQpXG5cdFx0fVxuXG5cdFx0cGFyZW4ocGFyYW1zKVxuXHRcdGUoYm9keSlcblx0fSxcblxuXHRDbGFzc0JvZHkoKSB7XG5cdFx0YmxvY2sodGhpcy5ib2R5LCAnJylcblx0fSxcblxuXHRDbGFzc0RlY2xhcmF0aW9uOiByQ2xhc3MsXG5cdENsYXNzRXhwcmVzc2lvbjogckNsYXNzLFxuXG5cdEltcG9ydERlY2xhcmF0aW9uKCkge1xuXHRcdG8oJ2ltcG9ydCAnKVxuXG5cdFx0bGV0IGRlZiwgbmFtZXNwYWNlXG5cdFx0Y29uc3Qgc3BlY2lmaWVycyA9IFtdXG5cdFx0Zm9yIChjb25zdCBzIG9mIHRoaXMuc3BlY2lmaWVycykge1xuXHRcdFx0aWYgKHMgaW5zdGFuY2VvZiBJbXBvcnREZWZhdWx0U3BlY2lmaWVyKVxuXHRcdFx0XHRpZiAoZGVmID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0ZGVmID0gc1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNdWx0aXBsZSBkZWZhdWx0IGltcG9ydHMnKVxuXHRcdFx0ZWxzZSBpZiAocyBpbnN0YW5jZW9mIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllcilcblx0XHRcdFx0aWYgKG5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdG5hbWVzcGFjZSA9IHNcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignTXVsdGlwbGUgbmFtZXNwYWNlIGltcG9ydHMnKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHQvLyBJbXBvcnRTcGVjaWZpZXJcblx0XHRcdFx0c3BlY2lmaWVycy5wdXNoKHMpXG5cdFx0fVxuXG5cdFx0bGV0IG5lZWRDb21tYSA9IGZhbHNlXG5cdFx0aWYgKGRlZiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRlKGRlZilcblx0XHRcdG5lZWRDb21tYSA9IHRydWVcblx0XHR9XG5cdFx0aWYgKG5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZiAobmVlZENvbW1hKVxuXHRcdFx0XHRvKCcsJylcblx0XHRcdGUobmFtZXNwYWNlKVxuXHRcdFx0bmVlZENvbW1hID0gdHJ1ZVxuXHRcdH1cblx0XHRpZiAoIWlzRW1wdHkoc3BlY2lmaWVycykpIHtcblx0XHRcdGlmIChuZWVkQ29tbWEpXG5cdFx0XHRcdG8oJywnKVxuXHRcdFx0bygneycpXG5cdFx0XHRpbnRlcmxlYXZlKHNwZWNpZmllcnMsICcsJylcblx0XHRcdG8oJ30nKVxuXHRcdH1cblxuXHRcdG8oJyBmcm9tICcpXG5cdFx0ZSh0aGlzLnNvdXJjZSlcblx0fSxcblx0SW1wb3J0U3BlY2lmaWVyKCkge1xuXHRcdGlmICh0aGlzLmltcG9ydGVkID09PSB0aGlzLmxvY2FsKVxuXHRcdFx0ZSh0aGlzLmxvY2FsKVxuXHRcdGVsc2Uge1xuXHRcdFx0ZSh0aGlzLmltcG9ydGVkKVxuXHRcdFx0bygnIGFzICcpXG5cdFx0XHRlKHRoaXMubG9jYWwpXG5cdFx0fVxuXHR9LFxuXHRJbXBvcnREZWZhdWx0U3BlY2lmaWVyKCkge1xuXHRcdGUodGhpcy5sb2NhbClcblx0fSxcblx0SW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyKCkge1xuXHRcdG8oJyogYXMgJylcblx0XHRlKHRoaXMubG9jYWwpXG5cdH0sXG5cblx0RXhwb3J0U3BlY2lmaWVyKCkge1xuXHRcdGUodGhpcy5sb2NhbClcblx0XHRpZiAodGhpcy5leHBvcnRlZCAhPT0gdGhpcy5sb2NhbCkge1xuXHRcdFx0bygnIGFzICcpXG5cdFx0XHRlKHRoaXMuZXhwb3J0ZWQpXG5cdFx0fVxuXHR9LFxuXHRFeHBvcnROYW1lZERlY2xhcmF0aW9uKCkge1xuXHRcdG8oJ2V4cG9ydCAnKVxuXHRcdGlmICh0aGlzLmRlY2xhcmF0aW9uID09PSBudWxsKSB7XG5cdFx0XHRvKCd7Jylcblx0XHRcdGludGVybGVhdmUodGhpcy5zcGVjaWZpZXJzLCAnLCcpXG5cdFx0XHRvKCd9Jylcblx0XHRcdGlmICh0aGlzLnNvdXJjZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRvKCcgZnJvbSAnKVxuXHRcdFx0XHRlKHRoaXMuc291cmNlKVxuXHRcdFx0fVxuXHRcdH0gZWxzZVxuXHRcdFx0ZSh0aGlzLmRlY2xhcmF0aW9uKVxuXHR9LFxuXHRFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24oKSB7XG5cdFx0bygnZXhwb3J0IGRlZmF1bHQgJylcblx0XHRlKHRoaXMuZGVjbGFyYXRpb24pXG5cdH0sXG5cdEV4cG9ydEFsbERlY2xhcmF0aW9uKCkge1xuXHRcdG8oJ2V4cG9ydCAqIGZyb20gJylcblx0XHRlKHRoaXMuc291cmNlKVxuXHR9XG59KVxuXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmdGb3JMaXRlcmFsKHN0cikge1xuXHRyZXR1cm4gc3RyLnJlcGxhY2UoL1tcXFxcXCJcXG5cXHRcXGJcXGZcXHZcXHJcXHUyMDI4XFx1MjAyOV0vZywgY2ggPT4gbGl0ZXJhbEVzY2FwZXMuZ2V0KGNoKSlcbn1cblxuY29uc3QgbGl0ZXJhbEVzY2FwZXMgPSBuZXcgTWFwKFtcblx0WydcXFxcJywgJ1xcXFxcXFxcJ10sXG5cdFsnXCInLCAnXFxcXFwiJ10sXG5cdFsnXFxuJywgJ1xcXFxuJ10sXG5cdFsnXFx0JywgJ1xcXFx0J10sXG5cdFsnXFxiJywgJ1xcXFxiJ10sXG5cdFsnXFxmJywgJ1xcXFxmJ10sXG5cdFsnXFx2JywgJ1xcXFx2J10sXG5cdFsnXFxyJywgJ1xcXFxyJ10sXG5cdFsnXFx1MjAyOCcsICdcXFxcdTIwMjgnXSxcblx0WydcXHUyMDI5JywgJ1xcXFx1MjAyOSddXSlcbiJdfQ==