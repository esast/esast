'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.mangleIdentifier = mod.exports;
	}
})(this, function (exports) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = mangleIdentifier;
	exports.needsMangle = needsMangle;
	exports.propertyNameOk = propertyNameOk;
	exports.unmangle = unmangle;

	function mangleIdentifier(name) {
		return forbiddenNames.has(name) ? `_${ name }` : name.replace(/[^a-zA-Z0-9$_]/g, _ => `_${ _.charCodeAt(0) }`);
	}

	function needsMangle(name) {
		return forbiddenNames.has(name) || !propertyNameOk(name);
	}

	function propertyNameOk(name) {
		return name.search(/[^a-zA-Z0-9$_]/) === -1;
	}

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

	const forbiddenNames = exports.forbiddenNames = new Set(['abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'comment', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'function*', 'goto', 'if', 'implements', 'import', 'in', 'instanceOf', 'int', 'interface', 'label', 'long', 'module', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield']);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYW5nbGUtaWRlbnRpZmllci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBS3dCLGdCQUFnQjtTQU94QixXQUFXLEdBQVgsV0FBVztTQUtYLGNBQWMsR0FBZCxjQUFjO1NBS2QsUUFBUSxHQUFSLFFBQVE7O1VBakJBLGdCQUFnQjs7OztVQU94QixXQUFXOzs7O1VBS1gsY0FBYzs7OztVQUtkLFFBQVE7Ozs7Ozs7Ozs7Ozs7O09BZVgsY0FBYyxXQUFkLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUNyQyxVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1QsT0FBTyxFQUNQLFVBQVUsRUFDVixVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUixJQUFJLEVBQ0osUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDUCxTQUFTLEVBQ1QsT0FBTyxFQUNQLEtBQUssRUFDTCxVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixJQUFJLEVBQ0osWUFBWSxFQUNaLFFBQVEsRUFDUixJQUFJLEVBQ0osWUFBWSxFQUNaLEtBQUssRUFDTCxXQUFXLEVBQ1gsT0FBTyxFQUNQLE1BQU0sRUFDTixRQUFRLEVBQ1IsUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsUUFBUSxFQUNSLFFBQVEsRUFDUixPQUFPLEVBQ1AsUUFBUSxFQUNSLE9BQU8sRUFDUCxRQUFRLEVBQ1IsY0FBYyxFQUNkLE1BQU0sRUFDTixPQUFPLEVBQ1AsUUFBUSxFQUNSLFdBQVcsRUFDWCxNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixLQUFLLEVBQ0wsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sT0FBTyxDQUNQLENBQUMiLCJmaWxlIjoibWFuZ2xlLWlkZW50aWZpZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbkNvbnZlcnQgYSBuYW1lIHRvIGEgdmFsaWQgSmF2YVNjcmlwdCBpZGVudGlmaWVyLlxuQHBhcmFtIHtTdHJpbmd9IG5hbWUgQ2FuIGJlIGFueSBzdHJpbmcuXG5AcmV0dXJuIHtTdHJpbmd9XG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFuZ2xlSWRlbnRpZmllcihuYW1lKSB7XG5cdHJldHVybiBmb3JiaWRkZW5OYW1lcy5oYXMobmFtZSkgP1xuXHRcdGBfJHtuYW1lfWAgOlxuXHRcdG5hbWUucmVwbGFjZSgvW15hLXpBLVowLTkkX10vZywgXyA9PiBgXyR7Xy5jaGFyQ29kZUF0KDApfWApXG59XG5cbi8qKiBgZmFsc2VgIGlmZiBgbmFtZWAgaXMgYSB2YWxpZCBKYXZhU2NyaXB0IGlkZW50aWZpZXIuICovXG5leHBvcnQgZnVuY3Rpb24gbmVlZHNNYW5nbGUobmFtZSkge1xuXHRyZXR1cm4gZm9yYmlkZGVuTmFtZXMuaGFzKG5hbWUpIHx8ICFwcm9wZXJ0eU5hbWVPayhuYW1lKVxufVxuXG4vKiogYHRydWVgIGlmZiBgbmFtZWAgY2FuIGJlIHVzZWQgYXMgYSBwcm9wZXJ0eSBuYW1lIHVzaW5nIGRvdCBzeW50YXggKGBhLmJgKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eU5hbWVPayhuYW1lKSB7XG5cdHJldHVybiBuYW1lLnNlYXJjaCgvW15hLXpBLVowLTkkX10vKSA9PT0gLTFcbn1cblxuLyoqIFVuZG9lcyB7QGxpbmsgbWFuZ2xlSWRlbnRpZmllcn0uICovXG5leHBvcnQgZnVuY3Rpb24gdW5tYW5nbGUobmFtZSkge1xuXHRpZiAobmFtZVswXSA9PT0gJ18nKSB7XG5cdFx0Y29uc3QgcmVzdCA9IG5hbWUuc2xpY2UoMSlcblx0XHRpZiAoZm9yYmlkZGVuTmFtZXMuaGFzKHJlc3QpKVxuXHRcdFx0cmV0dXJuIHJlc3Rcblx0fVxuXHRyZXR1cm4gbmFtZS5yZXBsYWNlKC9fXFxkKy9nLCBtYXRjaCA9PiB7XG5cdFx0Y29uc3QgY2hhckNvZGUgPSBtYXRjaC5zbGljZSgxKVxuXHRcdGNvbnN0IG4gPSBOdW1iZXIucGFyc2VJbnQoY2hhckNvZGUpXG5cdFx0Y29uc3QgY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKG4pXG5cdFx0cmV0dXJuIGNoID09PSAnXFwwJyA/IG1hdGNoIDogY2hcblx0fSlcbn1cblxuLyoqIFNldCBvZiBKYXZhU2NyaXB0IGtleXdvcmRzLiAqL1xuZXhwb3J0IGNvbnN0IGZvcmJpZGRlbk5hbWVzID0gbmV3IFNldChbXG5cdCdhYnN0cmFjdCcsXG5cdCdhcmd1bWVudHMnLFxuXHQnYm9vbGVhbicsXG5cdCdicmVhaycsXG5cdCdieXRlJyxcblx0J2Nhc2UnLFxuXHQnY2F0Y2gnLFxuXHQnY2hhcicsXG5cdCdjbGFzcycsXG5cdCdjb21tZW50Jyxcblx0J2NvbnN0Jyxcblx0J2NvbnRpbnVlJyxcblx0J2RlYnVnZ2VyJyxcblx0J2RlZmF1bHQnLFxuXHQnZGVsZXRlJyxcblx0J2RvJyxcblx0J2RvdWJsZScsXG5cdCdlbHNlJyxcblx0J2VudW0nLFxuXHQnZXZhbCcsXG5cdCdleHBvcnQnLFxuXHQnZXh0ZW5kcycsXG5cdCdmYWxzZScsXG5cdCdmaW5hbCcsXG5cdCdmaW5hbGx5Jyxcblx0J2Zsb2F0Jyxcblx0J2ZvcicsXG5cdCdmdW5jdGlvbicsXG5cdCdmdW5jdGlvbionLFxuXHQnZ290bycsXG5cdCdpZicsXG5cdCdpbXBsZW1lbnRzJyxcblx0J2ltcG9ydCcsXG5cdCdpbicsXG5cdCdpbnN0YW5jZU9mJyxcblx0J2ludCcsXG5cdCdpbnRlcmZhY2UnLFxuXHQnbGFiZWwnLFxuXHQnbG9uZycsXG5cdCdtb2R1bGUnLFxuXHQnbmF0aXZlJyxcblx0J25ldycsXG5cdCdudWxsJyxcblx0J3BhY2thZ2UnLFxuXHQncHJpdmF0ZScsXG5cdCdwcm90ZWN0ZWQnLFxuXHQncHVibGljJyxcblx0J3JldHVybicsXG5cdCdzaG9ydCcsXG5cdCdzdGF0aWMnLFxuXHQnc3VwZXInLFxuXHQnc3dpdGNoJyxcblx0J3N5bmNocm9uaXplZCcsXG5cdCd0aGlzJyxcblx0J3Rocm93Jyxcblx0J3Rocm93cycsXG5cdCd0cmFuc2llbnQnLFxuXHQndHJ1ZScsXG5cdCd0cnknLFxuXHQndHlwZW9mJyxcblx0J3ZhcicsXG5cdCd2b2lkJyxcblx0J3doaWxlJyxcblx0J3dpdGgnLFxuXHQneWllbGQnXG5dKVxuIl19