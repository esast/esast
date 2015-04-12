if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../ast', '../util', './source-map/source-node'], function (exports, module, _ast, _util, _sourceMapSourceNode) {
	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var Rx = (function () {
		function Rx(inFilePath) {
			_classCallCheck(this, Rx);

			this.inFilePath = inFilePath;
			this.indentStr = '';
		}

		_createClass(Rx, [{
			key: 'render',
			value: function render(ast) {
				var oldCur = this.cur;
				this.cur = [];
				ast.render(ast, this);
				var content = this.cur;
				this.cur = oldCur;
				if (ast.loc) {
					return new _sourceMapSourceNode.SourceNode(ast.loc.start.line, ast.loc.start.column, this.inFilePath, content);
				} else {
					return content;
				}
			}
		}, {
			key: 'e',
			value: function e(ast) {
				_util.type(ast, _ast.ESNode);
				this.cur.push(this.render(ast));
			}
		}, {
			key: 'o',
			value: function o(str) {
				_util.type(str, String);
				this.cur.push(str);
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
			key: 'block',
			value: function block(lines, lineSeparator) {
				var _this = this;

				lineSeparator = lineSeparator + '\t';
				this.o('{');
				this.indent(function () {
					_this.o(_this.nl);
					_this.interleave(lines, lineSeparator);
				});
				this.o(this.nl);
				this.o('}');
			}
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
			get: function () {
				return '\n' + this.indentStr;
			}
		}, {
			key: 'cnl',
			get: function () {
				return ',\n' + this.indentStr;
			}
		}, {
			key: 'snl',
			get: function () {
				return ';\n' + this.indentStr;
			}
		}]);

		return Rx;
	})();

	module.exports = Rx;
});
//# sourceMappingURL=../../private/render/Rx.js.map