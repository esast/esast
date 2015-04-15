if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	var assert = function assert(cond) {
		if (!cond) throw new Error('Assertion failed.');
	},
	    implementMany = function implementMany(holder, methodName, nameToImpl) {
		Object.keys(nameToImpl).forEach(function (name) {
			holder[name].prototype[methodName] = nameToImpl[name];
		});
		return function (target) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			return target[methodName].apply(target, [target].concat(args));
		};
	},
	    isEmpty = function isEmpty(arr) {
		return arr.length === 0;
	},
	    pAdd = function pAdd(obj, newName, newVal) {
		if (Object.prototype.hasOwnProperty.call(obj, newName)) throw new Error('Already has property ' + newName + ', have ' + Object.keys(obj));
		var _ = clone(obj);
		_[newName] = newVal;
		return _;
	},
	   

	// TODO: Support Sets and Unions
	type = function type(instance, itsType) {
		if (!itsType.prototype.isPrototypeOf(Object(instance))) throw new Error('' + instance + ' is not a ' + itsType + '.');
	},
	   

	// multi-line string literals like:
	// `
	//	a
	//		b
	//	c`
	// have too much indentation.
	// This will change it to "a\n\tb\nc" by detecting the first line's indentation.
	dedent = function dedent(str) {
		if (str[0] !== '\n') {
			return str;
		}str = str.slice(1);

		var indent = undefined;
		for (indent = 0; indent < str.length; indent = indent + 1) if (str[indent] !== '\t') break;

		var dedentedLines = str.split('\n').map(function (line) {
			return line.slice(indent);
		});
		return dedentedLines.join('\n');
	};

	exports.assert = assert;
	exports.implementMany = implementMany;
	exports.isEmpty = isEmpty;
	exports.pAdd = pAdd;
	exports.type = type;
	exports.dedent = dedent;
	var clone = function clone(obj) {
		var nu = Object.create(Object.getPrototypeOf(obj));
		Object.getOwnPropertyNames(obj).forEach(function (name) {
			nu[name] = obj[name];
		});
		return nu;
	};
});
//# sourceMappingURL=../private/util.js.map