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
	},
	    isEmpty = function isEmpty(arr) {
		return arr.length === 0;
	},
	    last = function last(arr) {
		assert(!isEmpty(arr));
		return arr[arr.length - 1];
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
	},
	   

	// TODO:ES6 Just use `new Set`
	newSet = function newSet(setMembers) {
		var set = new Set();
		setMembers.forEach(function (_) {
			return set.add(_);
		});
		return set;
	};

	exports.assert = assert;
	exports.implementMany = implementMany;
	exports.isEmpty = isEmpty;
	exports.last = last;
	exports.pAdd = pAdd;
	exports.type = type;
	exports.dedent = dedent;
	exports.newSet = newSet;
	var clone = function clone(obj) {
		var nu = Object.create(Object.getPrototypeOf(obj));
		Object.getOwnPropertyNames(obj).forEach(function (name) {
			nu[name] = obj[name];
		});
		return nu;
	};
});
//# sourceMappingURL=../private/util.js.map