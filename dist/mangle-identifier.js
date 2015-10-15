if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	/**
 Convert a name to a valid JavaScript identifier.
 @param {String} name Can be any string.
 @return {String}
 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.default = mangleIdentifier;
	exports.needsMangle = needsMangle;
	exports.propertyNameOk = propertyNameOk;
	exports.unmangle = unmangle;

	function mangleIdentifier(name) {
		return forbiddenNames.has(name) ? `_${ name }` : name.replace(/[^a-zA-Z0-9$_]/g, _ => `_${ _.charCodeAt(0) }`);
	}

	/** `false` iff `name` is a valid JavaScript identifier. */

	function needsMangle(name) {
		return forbiddenNames.has(name) || !propertyNameOk(name);
	}

	/** `true` iff `name` can be used as a property name using dot syntax (`a.b`). */

	function propertyNameOk(name) {
		return name.search(/[^a-zA-Z0-9$_]/) === -1;
	}

	/** Undoes {@link mangleIdentifier}. */

	function unmangle(name) {
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
	}

	/** Set of JavaScript keywords. */
	const forbiddenNames = new Set(['abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'comment', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'function*', 'goto', 'if', 'implements', 'import', 'in', 'instanceOf', 'int', 'interface', 'label', 'long', 'module', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield']);
	exports.forbiddenNames = forbiddenNames;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hbmdsZS1pZGVudGlmaWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OzttQkFLd0IsZ0JBQWdCOzs7OztBQUF6QixVQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUM5QyxTQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQzlCLENBQUMsQ0FBQyxHQUFFLElBQUksRUFBQyxDQUFDLEdBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtFQUM1RDs7OztBQUdNLFVBQVMsV0FBVyxDQUFDLElBQUksRUFBRTtBQUNqQyxTQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7RUFDeEQ7Ozs7QUFHTSxVQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUU7QUFDcEMsU0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7RUFDM0M7Ozs7QUFHTSxVQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDOUIsTUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO0FBQ3BCLFNBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDMUIsT0FBSSxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUMzQixPQUFPLElBQUksQ0FBQTtHQUNaO0FBQ0QsU0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUk7QUFDckMsU0FBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMvQixTQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ25DLFNBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakMsVUFBTyxFQUFFLEtBQUssSUFBSSxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUE7R0FDL0IsQ0FBQyxDQUFBO0VBQ0Y7OztBQUdNLE9BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLENBQ3JDLFVBQVUsRUFDVixXQUFXLEVBQ1gsU0FBUyxFQUNULE9BQU8sRUFDUCxNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sT0FBTyxFQUNQLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLElBQUksRUFDSixRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFDVCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsRUFDVCxPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLElBQUksRUFDSixZQUFZLEVBQ1osUUFBUSxFQUNSLElBQUksRUFDSixZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxPQUFPLEVBQ1AsTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFdBQVcsRUFDWCxRQUFRLEVBQ1IsUUFBUSxFQUNSLE9BQU8sRUFDUCxRQUFRLEVBQ1IsT0FBTyxFQUNQLFFBQVEsRUFDUixjQUFjLEVBQ2QsTUFBTSxFQUNOLE9BQU8sRUFDUCxRQUFRLEVBQ1IsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sRUFDTixPQUFPLENBQ1AsQ0FBQyxDQUFBIiwiZmlsZSI6Im1hbmdsZS1pZGVudGlmaWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG5Db252ZXJ0IGEgbmFtZSB0byBhIHZhbGlkIEphdmFTY3JpcHQgaWRlbnRpZmllci5cbkBwYXJhbSB7U3RyaW5nfSBuYW1lIENhbiBiZSBhbnkgc3RyaW5nLlxuQHJldHVybiB7U3RyaW5nfVxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hbmdsZUlkZW50aWZpZXIobmFtZSkge1xuXHRyZXR1cm4gZm9yYmlkZGVuTmFtZXMuaGFzKG5hbWUpID9cblx0XHRgXyR7bmFtZX1gIDpcblx0XHRuYW1lLnJlcGxhY2UoL1teYS16QS1aMC05JF9dL2csIF8gPT4gYF8ke18uY2hhckNvZGVBdCgwKX1gKVxufVxuXG4vKiogYGZhbHNlYCBpZmYgYG5hbWVgIGlzIGEgdmFsaWQgSmF2YVNjcmlwdCBpZGVudGlmaWVyLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5lZWRzTWFuZ2xlKG5hbWUpIHtcblx0cmV0dXJuIGZvcmJpZGRlbk5hbWVzLmhhcyhuYW1lKSB8fCAhcHJvcGVydHlOYW1lT2sobmFtZSlcbn1cblxuLyoqIGB0cnVlYCBpZmYgYG5hbWVgIGNhbiBiZSB1c2VkIGFzIGEgcHJvcGVydHkgbmFtZSB1c2luZyBkb3Qgc3ludGF4IChgYS5iYCkuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlOYW1lT2sobmFtZSkge1xuXHRyZXR1cm4gbmFtZS5zZWFyY2goL1teYS16QS1aMC05JF9dLykgPT09IC0xXG59XG5cbi8qKiBVbmRvZXMge0BsaW5rIG1hbmdsZUlkZW50aWZpZXJ9LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVubWFuZ2xlKG5hbWUpIHtcblx0aWYgKG5hbWVbMF0gPT09ICdfJykge1xuXHRcdGNvbnN0IHJlc3QgPSBuYW1lLnNsaWNlKDEpXG5cdFx0aWYgKGZvcmJpZGRlbk5hbWVzLmhhcyhyZXN0KSlcblx0XHRcdHJldHVybiByZXN0XG5cdH1cblx0cmV0dXJuIG5hbWUucmVwbGFjZSgvX1xcZCsvZywgbWF0Y2ggPT4ge1xuXHRcdGNvbnN0IGNoYXJDb2RlID0gbWF0Y2guc2xpY2UoMSlcblx0XHRjb25zdCBuID0gTnVtYmVyLnBhcnNlSW50KGNoYXJDb2RlKVxuXHRcdGNvbnN0IGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShuKVxuXHRcdHJldHVybiBjaCA9PT0gJ1xcMCcgPyBtYXRjaCA6IGNoXG5cdH0pXG59XG5cbi8qKiBTZXQgb2YgSmF2YVNjcmlwdCBrZXl3b3Jkcy4gKi9cbmV4cG9ydCBjb25zdCBmb3JiaWRkZW5OYW1lcyA9IG5ldyBTZXQoW1xuXHQnYWJzdHJhY3QnLFxuXHQnYXJndW1lbnRzJyxcblx0J2Jvb2xlYW4nLFxuXHQnYnJlYWsnLFxuXHQnYnl0ZScsXG5cdCdjYXNlJyxcblx0J2NhdGNoJyxcblx0J2NoYXInLFxuXHQnY2xhc3MnLFxuXHQnY29tbWVudCcsXG5cdCdjb25zdCcsXG5cdCdjb250aW51ZScsXG5cdCdkZWJ1Z2dlcicsXG5cdCdkZWZhdWx0Jyxcblx0J2RlbGV0ZScsXG5cdCdkbycsXG5cdCdkb3VibGUnLFxuXHQnZWxzZScsXG5cdCdlbnVtJyxcblx0J2V2YWwnLFxuXHQnZXhwb3J0Jyxcblx0J2V4dGVuZHMnLFxuXHQnZmFsc2UnLFxuXHQnZmluYWwnLFxuXHQnZmluYWxseScsXG5cdCdmbG9hdCcsXG5cdCdmb3InLFxuXHQnZnVuY3Rpb24nLFxuXHQnZnVuY3Rpb24qJyxcblx0J2dvdG8nLFxuXHQnaWYnLFxuXHQnaW1wbGVtZW50cycsXG5cdCdpbXBvcnQnLFxuXHQnaW4nLFxuXHQnaW5zdGFuY2VPZicsXG5cdCdpbnQnLFxuXHQnaW50ZXJmYWNlJyxcblx0J2xhYmVsJyxcblx0J2xvbmcnLFxuXHQnbW9kdWxlJyxcblx0J25hdGl2ZScsXG5cdCduZXcnLFxuXHQnbnVsbCcsXG5cdCdwYWNrYWdlJyxcblx0J3ByaXZhdGUnLFxuXHQncHJvdGVjdGVkJyxcblx0J3B1YmxpYycsXG5cdCdyZXR1cm4nLFxuXHQnc2hvcnQnLFxuXHQnc3RhdGljJyxcblx0J3N1cGVyJyxcblx0J3N3aXRjaCcsXG5cdCdzeW5jaHJvbml6ZWQnLFxuXHQndGhpcycsXG5cdCd0aHJvdycsXG5cdCd0aHJvd3MnLFxuXHQndHJhbnNpZW50Jyxcblx0J3RydWUnLFxuXHQndHJ5Jyxcblx0J3R5cGVvZicsXG5cdCd2YXInLFxuXHQndm9pZCcsXG5cdCd3aGlsZScsXG5cdCd3aXRoJyxcblx0J3lpZWxkJ1xuXSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9
