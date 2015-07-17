if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './ast', './mangle-identifier', './specialize'], function (exports, _ast, _mangleIdentifier, _specialize) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mangleIdentifier2 = _interopRequireDefault(_mangleIdentifier);

	const nameToId = new Map();
	const propertyToIdOrLiteral = new Map();

	const escapeStringForLiteral = str => str.replace(/[\\"\n\t\b\f\v\r\u2028\u2029]/g, ch => literalEscapes[ch]),
	      escapeStringForTemplate = str => str.replace(/[{\\`\n\t\b\f\v\r\u2028\u2029]/g, ch => templateEscapes[ch]),
	      idCached = name => {
		let _ = nameToId.get(name);
		if (_ === undefined) {
			_ = (0, _ast.Identifier)((0, _mangleIdentifier2.default)(name));
			nameToId.set(name, _);
		}
		return _;
	},
	      loc = (ast, loc) => {
		ast.loc = loc;
		return ast;
	},
	      member = (object, propertyName) => (0, _specialize.memberExpression)(object, propertyIdOrLiteralCached(propertyName)),
	      propertyIdOrLiteralCached = propertyName => {
		let _ = propertyToIdOrLiteral.get(propertyName);
		if (_ === undefined) {
			_ = (0, _mangleIdentifier.propertyNameOk)(propertyName) ? (0, _ast.Identifier)(propertyName) : (0, _ast.Literal)(propertyName);
			propertyToIdOrLiteral.set(propertyName, _);
		}
		return _;
	},
	     

	// TODO:ES6 arrow functions
	thunk = value => (0, _specialize.functionExpressionThunk)((0, _ast.BlockStatement)([(0, _ast.ReturnStatement)(value)]), false),
	      toStatement = _ => _ instanceof _ast.Statement || _ instanceof _ast.Declaration ? _ : (0, _ast.ExpressionStatement)(_);

	exports.escapeStringForLiteral = escapeStringForLiteral;
	exports.escapeStringForTemplate = escapeStringForTemplate;
	exports.idCached = idCached;
	exports.loc = loc;
	exports.member = member;
	exports.propertyIdOrLiteralCached = propertyIdOrLiteralCached;
	exports.thunk = thunk;
	exports.toStatement = toStatement;
	const literalEscapes = {
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
	},
	      templateEscapes = {
		// Needed to make sure "${" is escaped.
		'{': '\\{',
		'`': '\\`',
		'\\': '\\\\',
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
//# sourceMappingURL=data:application/json;base64,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O0FBQ1gsTUFBSSxFQUFFLEtBQUs7QUFDWCxVQUFRLEVBQUUsU0FBUztBQUNuQixVQUFRLEVBQUUsU0FBUztFQUNuQixDQUFBIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCbG9ja1N0YXRlbWVudCwgRGVjbGFyYXRpb24sIEV4cHJlc3Npb25TdGF0ZW1lbnQsIElkZW50aWZpZXIsIExpdGVyYWwsXG5cdFJldHVyblN0YXRlbWVudCwgU3RhdGVtZW50IH0gZnJvbSAnLi9hc3QnXG5pbXBvcnQgbWFuZ2xlSWRlbnRpZmllciwgeyBwcm9wZXJ0eU5hbWVPayB9IGZyb20gJy4vbWFuZ2xlLWlkZW50aWZpZXInXG5pbXBvcnQgeyBmdW5jdGlvbkV4cHJlc3Npb25UaHVuaywgbWVtYmVyRXhwcmVzc2lvbiB9IGZyb20gJy4vc3BlY2lhbGl6ZSdcblxuY29uc3QgbmFtZVRvSWQgPSBuZXcgTWFwKClcbmNvbnN0IHByb3BlcnR5VG9JZE9yTGl0ZXJhbCA9IG5ldyBNYXAoKVxuXG5leHBvcnQgY29uc3Rcblx0ZXNjYXBlU3RyaW5nRm9yTGl0ZXJhbCA9IHN0ciA9PlxuXHRcdHN0ci5yZXBsYWNlKC9bXFxcXFwiXFxuXFx0XFxiXFxmXFx2XFxyXFx1MjAyOFxcdTIwMjldL2csIGNoID0+IGxpdGVyYWxFc2NhcGVzW2NoXSksXG5cblx0ZXNjYXBlU3RyaW5nRm9yVGVtcGxhdGUgPSBzdHIgPT5cblx0XHRzdHIucmVwbGFjZSgvW3tcXFxcYFxcblxcdFxcYlxcZlxcdlxcclxcdTIwMjhcXHUyMDI5XS9nLCBjaCA9PiB0ZW1wbGF0ZUVzY2FwZXNbY2hdKSxcblxuXHRpZENhY2hlZCA9IG5hbWUgPT4ge1xuXHRcdGxldCBfID0gbmFtZVRvSWQuZ2V0KG5hbWUpXG5cdFx0aWYgKF8gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XyA9IElkZW50aWZpZXIobWFuZ2xlSWRlbnRpZmllcihuYW1lKSlcblx0XHRcdG5hbWVUb0lkLnNldChuYW1lLCBfKVxuXHRcdH1cblx0XHRyZXR1cm4gX1xuXHR9LFxuXG5cdGxvYyA9IChhc3QsIGxvYykgPT4ge1xuXHRcdGFzdC5sb2MgPSBsb2Ncblx0XHRyZXR1cm4gYXN0XG5cdH0sXG5cblx0bWVtYmVyID0gKG9iamVjdCwgcHJvcGVydHlOYW1lKSA9PlxuXHRcdG1lbWJlckV4cHJlc3Npb24ob2JqZWN0LCBwcm9wZXJ0eUlkT3JMaXRlcmFsQ2FjaGVkKHByb3BlcnR5TmFtZSkpLFxuXG5cdHByb3BlcnR5SWRPckxpdGVyYWxDYWNoZWQgPSBwcm9wZXJ0eU5hbWUgPT4ge1xuXHRcdGxldCBfID0gcHJvcGVydHlUb0lkT3JMaXRlcmFsLmdldChwcm9wZXJ0eU5hbWUpXG5cdFx0aWYgKF8gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XyA9IHByb3BlcnR5TmFtZU9rKHByb3BlcnR5TmFtZSkgPyBJZGVudGlmaWVyKHByb3BlcnR5TmFtZSkgOiBMaXRlcmFsKHByb3BlcnR5TmFtZSlcblx0XHRcdHByb3BlcnR5VG9JZE9yTGl0ZXJhbC5zZXQocHJvcGVydHlOYW1lLCBfKVxuXHRcdH1cblx0XHRyZXR1cm4gX1xuXHR9LFxuXG5cdC8vIFRPRE86RVM2IGFycm93IGZ1bmN0aW9uc1xuXHR0aHVuayA9IHZhbHVlID0+XG5cdFx0ZnVuY3Rpb25FeHByZXNzaW9uVGh1bmsoQmxvY2tTdGF0ZW1lbnQoWyBSZXR1cm5TdGF0ZW1lbnQodmFsdWUpIF0pLCBmYWxzZSksXG5cblx0dG9TdGF0ZW1lbnQgPSBfID0+XG5cdFx0KF8gaW5zdGFuY2VvZiBTdGF0ZW1lbnQgfHwgXyBpbnN0YW5jZW9mIERlY2xhcmF0aW9uKSA/IF8gOiBFeHByZXNzaW9uU3RhdGVtZW50KF8pXG5cbmNvbnN0XG5cdGxpdGVyYWxFc2NhcGVzID0ge1xuXHRcdCdcXFxcJzogJ1xcXFxcXFxcJyxcblx0XHQnXCInOiAnXFxcXFwiJyxcblx0XHQnXFxuJzogJ1xcXFxuJyxcblx0XHQnXFx0JzogJ1xcXFx0Jyxcblx0XHQnXFxiJzogJ1xcXFxiJyxcblx0XHQnXFxmJzogJ1xcXFxmJyxcblx0XHQnXFx2JzogJ1xcXFx2Jyxcblx0XHQnXFxyJzogJ1xcXFxyJyxcblx0XHQnXFx1MjAyOCc6ICdcXFxcdTIwMjgnLFxuXHRcdCdcXHUyMDI5JzogJ1xcXFx1MjAyOSdcblx0fSxcblx0dGVtcGxhdGVFc2NhcGVzID0ge1xuXHRcdC8vIE5lZWRlZCB0byBtYWtlIHN1cmUgXCIke1wiIGlzIGVzY2FwZWQuXG5cdFx0J3snOiAnXFxcXHsnLFxuXHRcdCdgJzogJ1xcXFxgJyxcblx0XHQnXFxcXCc6ICdcXFxcXFxcXCcsXG5cdFx0J1xcbic6ICdcXFxcbicsXG5cdFx0J1xcdCc6ICdcXFxcdCcsXG5cdFx0J1xcYic6ICdcXFxcYicsXG5cdFx0J1xcZic6ICdcXFxcZicsXG5cdFx0J1xcdic6ICdcXFxcdicsXG5cdFx0J1xccic6ICdcXFxccicsXG5cdFx0J1xcdTIwMjgnOiAnXFxcXHUyMDI4Jyxcblx0XHQnXFx1MjAyOSc6ICdcXFxcdTIwMjknXG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9