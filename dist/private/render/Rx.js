if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../ast', '../util', './source-map/source-node', './source-map/source-map-generator', '../../Loc'], function (exports, module, _ast, _util, _sourceMapSourceNode, _sourceMapSourceMapGenerator, _Loc) {
	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var Rx = (function () {
		function Rx(inFilePath, outFilePath) {
			_classCallCheck(this, Rx);

			this.indentStr = '';
			this.strParts = [];

			this.usingSourceMaps = inFilePath !== undefined;
			if (this.usingSourceMaps) {
				this.inFilePath = inFilePath;
				this.map = new _sourceMapSourceMapGenerator.SourceMapGenerator({
					file: outFilePath
					// skipValidation: true
				});
				this.line = _Loc.StartLine;
				this.column = _Loc.StartColumn;

				this.lastMappedAst = null;
			}
		}

		_createClass(Rx, [{
			key: 'finish',
			value: function finish() {
				return this.strParts.join('');
			}
		}, {
			key: 'e',
			value: function e(ast) {
				this.curAst = ast;
				ast.render(this);
			}
		}, {
			key: 'o',

			// str may not contain newlines.
			value: function o(str) {
				this._o(str);
				this._mapStr(str);
			}
		}, {
			key: 'interleave',
			value: function interleave(asts, str) {
				if (!_util.isEmpty(asts)) {
					var maxI = asts.length - 1;
					for (var i = 0; i < maxI; i = i + 1) {
						this.e(asts[i]);
						this.o(str);
					}
					this.e(asts[maxI]);
				}
			}
		}, {
			key: 'paren',
			value: function paren(asts) {
				this.o('(');
				this.interleave(asts, ', ');
				this.o(')');
			}
		}, {
			key: 'block',
			value: function block(lines, lineSeparator) {
				var _this = this;

				if (_util.isEmpty(lines)) this.o('{ }');else {
					lineSeparator = lineSeparator;
					this.o('{');
					this.indent(function () {
						_this.nl();
						var maxI = lines.length - 1;
						for (var i = 0; i < maxI; i = i + 1) {
							_this.e(lines[i]);
							_this.o(lineSeparator);
							_this.nl();
						}
						_this.e(lines[maxI]);
					});
					this.nl();
					this.o('}');
				}
			}
		}, {
			key: 'lines',
			value: (function (_lines) {
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
					this.e(lines[i]);
					this.o(';');
					this.nl();
				}
				this.e(lines[maxI]);
			})
		}, {
			key: 'indent',
			value: function indent(doIndented) {
				var oldIndent = this.indentStr;
				this.indentStr = this.indentStr + '\t';
				doIndented();
				this.indentStr = oldIndent;
			}
		}, {
			key: 'nl',
			value: function nl() {
				this._o('\n');
				this._mapNewLine();
				this.o(this.indentStr);
			}
		}, {
			key: '_o',

			// Private

			value: function _o(str) {
				this.strParts.push(str);
			}
		}, {
			key: '_mapStr',
			value: function _mapStr(str) {
				if (this.usingSourceMaps) {
					if (this.curAst.loc && this.curAst !== this.lastMappedAst) {
						this.map.addMapping({
							source: this.inFilePath,
							original: this.curAst.loc.start,
							generated: _Loc.Pos(this.line, this.column)
						});
						this.lastMappedAst = this.curAst;
					}
					this.column = this.column + str.length;
				}
			}
		}, {
			key: '_mapNewLine',
			value: function _mapNewLine() {
				if (this.usingSourceMaps) {
					this.line = this.line + 1;
					this.column = _Loc.StartColumn;
					// Mappings end at end of line.
					this.lastMappedAst = null;
				}
			}
		}]);

		return Rx;
	})();

	module.exports = Rx;
});
//# sourceMappingURL=../../private/render/Rx.js.map