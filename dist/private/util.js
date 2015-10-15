if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const assert = cond => {
		if (!cond) throw new Error('Assertion failed.');
	},
	      implementMany = (holder, methodName, nameToImpl) => {
		Object.keys(nameToImpl).forEach(name => {
			holder[name].prototype[methodName] = nameToImpl[name];
		});
	},
	      isEmpty = arr => arr.length === 0,
	      last = arr => {
		assert(!isEmpty(arr));
		return arr[arr.length - 1];
	};
	exports.assert = assert;
	exports.implementMany = implementMany;
	exports.isEmpty = isEmpty;
	exports.last = last;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiLCJwcml2YXRlL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FPLE9BQ04sTUFBTSxHQUFHLElBQUksSUFBSTtBQUNoQixNQUFJLENBQUMsSUFBSSxFQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtFQUNyQztPQUVELGFBQWEsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxLQUFLO0FBQ25ELFFBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSTtBQUN2QyxTQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUNyRCxDQUFDLENBQUE7RUFDRjtPQUVELE9BQU8sR0FBRyxHQUFHLElBQ1osR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDO09BRWpCLElBQUksR0FBRyxHQUFHLElBQUk7QUFDYixRQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNyQixTQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0VBQzFCLENBQUEiLCJmaWxlIjoicHJpdmF0ZS91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsLCJleHBvcnQgY29uc3Rcblx0YXNzZXJ0ID0gY29uZCA9PiB7XG5cdFx0aWYgKCFjb25kKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdBc3NlcnRpb24gZmFpbGVkLicpXG5cdH0sXG5cblx0aW1wbGVtZW50TWFueSA9IChob2xkZXIsIG1ldGhvZE5hbWUsIG5hbWVUb0ltcGwpID0+IHtcblx0XHRPYmplY3Qua2V5cyhuYW1lVG9JbXBsKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0aG9sZGVyW25hbWVdLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG5hbWVUb0ltcGxbbmFtZV1cblx0XHR9KVxuXHR9LFxuXG5cdGlzRW1wdHkgPSBhcnIgPT5cblx0XHRhcnIubGVuZ3RoID09PSAwLFxuXG5cdGxhc3QgPSBhcnIgPT4ge1xuXHRcdGFzc2VydCghaXNFbXB0eShhcnIpKVxuXHRcdHJldHVybiBhcnJbYXJyLmxlbmd0aCAtIDFdXG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9
