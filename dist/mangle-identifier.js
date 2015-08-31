if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	exports.default = name => forbiddenNames.has(name) ? '_' + name : name.replace(/[^a-zA-Z0-9$_]/g, _ => '_' + _.charCodeAt(0));

	const needsMangle = name => forbiddenNames.has(name) || !propertyNameOk(name),
	      propertyNameOk = name => name.search(/[^a-zA-Z0-9$_]/) === -1;

	exports.needsMangle = needsMangle;
	exports.propertyNameOk = propertyNameOk;
	const unmangle = name => {
		if (name[0] === '_') {
			const rest = name.slice(1);
			if (forbiddenNames.has(rest)) return rest;
		}
		return name.replace(/_\d+/g, match => {
			const charCode = match.slice(1);
			const n = Number.parseInt(charCode);
			const ch = String.fromCharCode(n);
			return ch === '\0' ? match : ch;
		});
	};

	exports.unmangle = unmangle;
	const forbiddenNames = new Set(['abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'comment', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'function*', 'goto', 'if', 'implements', 'import', 'in', 'instanceOf', 'int', 'interface', 'label', 'long', 'module', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield']);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hbmdsZS1pZGVudGlmaWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O21CQUFlLElBQUksSUFDbEIsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FDdkIsR0FBRyxHQUFHLElBQUksR0FDVixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEQsT0FDTixXQUFXLEdBQUcsSUFBSSxJQUNqQixjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztPQUVsRCxjQUFjLEdBQUcsSUFBSSxJQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Ozs7QUFFL0IsT0FDTixRQUFRLEdBQUcsSUFBSSxJQUFJO0FBQ2xCLE1BQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtBQUNwQixTQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzFCLE9BQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFDM0IsT0FBTyxJQUFJLENBQUE7R0FDWjtBQUNELFNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJO0FBQ3JDLFNBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDL0IsU0FBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNuQyxTQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLFVBQU8sRUFBRSxLQUFLLElBQUksR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFBO0dBQy9CLENBQUMsQ0FBQTtFQUNGLENBQUE7OztBQUVGLE9BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLENBQzlCLFVBQVUsRUFDVixXQUFXLEVBQ1gsU0FBUyxFQUNULE9BQU8sRUFDUCxNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sT0FBTyxFQUNQLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLElBQUksRUFDSixRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFDVCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsRUFDVCxPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLElBQUksRUFDSixZQUFZLEVBQ1osUUFBUSxFQUNSLElBQUksRUFDSixZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxPQUFPLEVBQ1AsTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFdBQVcsRUFDWCxRQUFRLEVBQ1IsUUFBUSxFQUNSLE9BQU8sRUFDUCxRQUFRLEVBQ1IsT0FBTyxFQUNQLFFBQVEsRUFDUixjQUFjLEVBQ2QsTUFBTSxFQUNOLE9BQU8sRUFDUCxRQUFRLEVBQ1IsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sRUFDTixPQUFPLENBQ1AsQ0FBQyxDQUFBIiwiZmlsZSI6Im1hbmdsZS1pZGVudGlmaWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgbmFtZSA9PlxuXHRmb3JiaWRkZW5OYW1lcy5oYXMobmFtZSkgP1xuXHRcdCdfJyArIG5hbWUgOlxuXHRcdG5hbWUucmVwbGFjZSgvW15hLXpBLVowLTkkX10vZywgXyA9PiAnXycgKyBfLmNoYXJDb2RlQXQoMCkpXG5cbmV4cG9ydCBjb25zdFxuXHRuZWVkc01hbmdsZSA9IG5hbWUgPT5cblx0XHRmb3JiaWRkZW5OYW1lcy5oYXMobmFtZSkgfHwgIXByb3BlcnR5TmFtZU9rKG5hbWUpLFxuXG5cdHByb3BlcnR5TmFtZU9rID0gbmFtZSA9PlxuXHRcdG5hbWUuc2VhcmNoKC9bXmEtekEtWjAtOSRfXS8pID09PSAtMVxuXG5leHBvcnQgY29uc3Rcblx0dW5tYW5nbGUgPSBuYW1lID0+IHtcblx0XHRpZiAobmFtZVswXSA9PT0gJ18nKSB7XG5cdFx0XHRjb25zdCByZXN0ID0gbmFtZS5zbGljZSgxKVxuXHRcdFx0aWYgKGZvcmJpZGRlbk5hbWVzLmhhcyhyZXN0KSlcblx0XHRcdFx0cmV0dXJuIHJlc3Rcblx0XHR9XG5cdFx0cmV0dXJuIG5hbWUucmVwbGFjZSgvX1xcZCsvZywgbWF0Y2ggPT4ge1xuXHRcdFx0Y29uc3QgY2hhckNvZGUgPSBtYXRjaC5zbGljZSgxKVxuXHRcdFx0Y29uc3QgbiA9IE51bWJlci5wYXJzZUludChjaGFyQ29kZSlcblx0XHRcdGNvbnN0IGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShuKVxuXHRcdFx0cmV0dXJuIGNoID09PSAnXFwwJyA/IG1hdGNoIDogY2hcblx0XHR9KVxuXHR9XG5cbmNvbnN0IGZvcmJpZGRlbk5hbWVzID0gbmV3IFNldChbXG5cdCdhYnN0cmFjdCcsXG5cdCdhcmd1bWVudHMnLFxuXHQnYm9vbGVhbicsXG5cdCdicmVhaycsXG5cdCdieXRlJyxcblx0J2Nhc2UnLFxuXHQnY2F0Y2gnLFxuXHQnY2hhcicsXG5cdCdjbGFzcycsXG5cdCdjb21tZW50Jyxcblx0J2NvbnN0Jyxcblx0J2NvbnRpbnVlJyxcblx0J2RlYnVnZ2VyJyxcblx0J2RlZmF1bHQnLFxuXHQnZGVsZXRlJyxcblx0J2RvJyxcblx0J2RvdWJsZScsXG5cdCdlbHNlJyxcblx0J2VudW0nLFxuXHQnZXZhbCcsXG5cdCdleHBvcnQnLFxuXHQnZXh0ZW5kcycsXG5cdCdmYWxzZScsXG5cdCdmaW5hbCcsXG5cdCdmaW5hbGx5Jyxcblx0J2Zsb2F0Jyxcblx0J2ZvcicsXG5cdCdmdW5jdGlvbicsXG5cdCdmdW5jdGlvbionLFxuXHQnZ290bycsXG5cdCdpZicsXG5cdCdpbXBsZW1lbnRzJyxcblx0J2ltcG9ydCcsXG5cdCdpbicsXG5cdCdpbnN0YW5jZU9mJyxcblx0J2ludCcsXG5cdCdpbnRlcmZhY2UnLFxuXHQnbGFiZWwnLFxuXHQnbG9uZycsXG5cdCdtb2R1bGUnLFxuXHQnbmF0aXZlJyxcblx0J25ldycsXG5cdCdudWxsJyxcblx0J3BhY2thZ2UnLFxuXHQncHJpdmF0ZScsXG5cdCdwcm90ZWN0ZWQnLFxuXHQncHVibGljJyxcblx0J3JldHVybicsXG5cdCdzaG9ydCcsXG5cdCdzdGF0aWMnLFxuXHQnc3VwZXInLFxuXHQnc3dpdGNoJyxcblx0J3N5bmNocm9uaXplZCcsXG5cdCd0aGlzJyxcblx0J3Rocm93Jyxcblx0J3Rocm93cycsXG5cdCd0cmFuc2llbnQnLFxuXHQndHJ1ZScsXG5cdCd0cnknLFxuXHQndHlwZW9mJyxcblx0J3ZhcicsXG5cdCd2b2lkJyxcblx0J3doaWxlJyxcblx0J3dpdGgnLFxuXHQneWllbGQnXG5dKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=