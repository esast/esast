if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './util'], function (exports, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	exports['default'] = function (name, superType, doc, namesTypes) {
		var protoProps = arguments[4] === undefined ? {} : arguments[4];

		var props = [];
		_util.assert(namesTypes.length % 2 === 0);
		for (var i = 0; i < namesTypes.length; i = i + 2) {
			props.push({ name: namesTypes[i], type: namesTypes[i + 1] });
		}var args = props.map(function (_) {
			return _.name;
		}).join(', ');

		var body = 'return function ' + name + '(' + args + ') {\n\tif (!(this instanceof ' + name + '))\n\t\treturn new ' + name + '(' + args + ');\n';

		props.forEach(function (_ref) {
			var name = _ref.name;

			body = body + ('this.' + name + ' = ' + name + '; if (this.' + name + ' === undefined) this.' + name + ' = null;\n\t');
		});
		body = body + 'this.postConstruct()\n}';
		var type = Function(body)();
		var prototypeDefaults = {
			constructor: type,
			// Default is to do nothing. May be overridden.
			postConstruct: function postConstruct() {},
			toJSON: function toJSON() {
				var _this = this;

				var obj = {};
				obj.type = this.type;
				// Sort to make JSON rendering deterministic.
				Object.keys(this).sort().forEach(function (key) {
					obj[key] = _this[key];
				});
				return obj;
			},
			// Don't use JSON.stringify because we want other things below this to use their toString().
			toString: function toString() {
				return inspect(this);
			}
		};
		var prototype = Object.assign(Object.create(superType.prototype), prototypeDefaults, protoProps);
		return Object.assign(type, {
			doc: doc,
			props: props,
			prototype: prototype,
			toString: function toString() {
				return this.name;
			}
		});
	};

	var abstract = function abstract(name, superType, doc) {
		var type = Function('return function ' + name + '() { throw new Error("' + name + ' is an abstract type.") }')();
		return Object.assign(type, {
			doc: doc,
			prototype: Object.create(superType.prototype),
			toString: function toString() {
				return name;
			}
		});
	};

	exports.abstract = abstract;
	var show = (function (_show) {
		function show(_x) {
			return _show.apply(this, arguments);
		}

		show.toString = function () {
			return _show.toString();
		};

		return show;
	})(function (_) {
		if (_ instanceof Array) {
			var parts = _.map(function (em) {
				return indent(show(em));
			}).join(',\n\t');
			return '[\n\t' + parts + '\n]';
		} else if (_ === null) return 'null';else if (typeof _ === 'string') return '"' + _ + '"';else return _.toString();
	});

	var inspect = function inspect(obj) {
		var type = obj.constructor;
		var props = type.props.map(function (_ref2) {
			var name = _ref2.name;
			return '\n\t' + indent(show(obj[name]));
		}).join(',');
		var loc = obj.loc === undefined ? '' : '@' + obj.loc;
		return '' + type + '' + loc + '(' + props + ')';
	};

	/*
 const inspect = obj => {
 	const keys = Object.keys(obj).sort()
 	keys.unshift('type')
 	const props = keys
 		.map(key => `${key}: ${indent(show(obj[key]))}`)
 		.join(',\n\t')
 	return `{\n\t${props}\n}`
 }
 */
	var indent = function indent(str) {
		return str.replace(/\n/g, '\n\t');
	};
});
//# sourceMappingURL=../private/tuple.js.map