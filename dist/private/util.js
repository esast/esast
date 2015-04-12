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
	    type = function type(instance, itsType) {
		if (!itsType.prototype.isPrototypeOf(Object(instance))) throw new Error('' + instance + ' is not a ' + itsType + '.');
	};

	exports.assert = assert;
	exports.implementMany = implementMany;
	exports.isEmpty = isEmpty;
	exports.pAdd = pAdd;
	exports.type = type;
	var clone = function clone(obj) {
		var nu = Object.create(Object.getPrototypeOf(obj));
		Object.getOwnPropertyNames(obj).forEach(function (name) {
			nu[name] = obj[name];
		});
		return nu;
	};
});
//# sourceMappingURL=../private/util.js.map