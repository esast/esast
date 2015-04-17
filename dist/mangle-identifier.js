if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './private/util'], function (exports, _privateUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	exports['default'] = function (name) {
		return forbiddenNames.has(name) ? '_' + name : name.replace(/[^a-zA-Z0-9$_]/g, function (ch) {
			return '_' + ch.charCodeAt(0);
		});
	};

	var needsMangle = function needsMangle(name) {
		return forbiddenNames.has(name) || !propertyNameOk(name);
	},
	    propertyNameOk = function propertyNameOk(name) {
		return name.search(/[^a-zA-Z0-9$_]/) === -1;
	};

	exports.needsMangle = needsMangle;
	exports.propertyNameOk = propertyNameOk;
	var forbiddenNames = _privateUtil.newSet(['abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'comment', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'function*', 'global', 'goto', 'if', 'implements', 'import', 'in', 'instanceOf', 'int', 'interface', 'label', 'long', 'module', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'yield*']);
});
//# sourceMappingURL=mangle-identifier.js.map