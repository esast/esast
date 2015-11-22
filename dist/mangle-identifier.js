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
			const n = Number.parseInt(charCode, 10);
			const ch = String.fromCharCode(n);
			return ch === '\0' ? match : ch;
		});
	}

	const forbiddenNames = exports.forbiddenNames = new Set(['abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'comment', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'function*', 'goto', 'if', 'implements', 'import', 'in', 'instanceOf', 'int', 'interface', 'label', 'long', 'module', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield']);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYW5nbGUtaWRlbnRpZmllci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBS3dCLGdCQUFnQjtTQU94QixXQUFXLEdBQVgsV0FBVztTQUtYLGNBQWMsR0FBZCxjQUFjO1NBS2QsUUFBUSxHQUFSLFFBQVE7O1VBakJBLGdCQUFnQjs7OztVQU94QixXQUFXOzs7O1VBS1gsY0FBYzs7OztVQUtkLFFBQVE7Ozs7Ozs7Ozs7Ozs7O09BZVgsY0FBYyxXQUFkLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUNyQyxVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1QsT0FBTyxFQUNQLFVBQVUsRUFDVixVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUixJQUFJLEVBQ0osUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDUCxTQUFTLEVBQ1QsT0FBTyxFQUNQLEtBQUssRUFDTCxVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixJQUFJLEVBQ0osWUFBWSxFQUNaLFFBQVEsRUFDUixJQUFJLEVBQ0osWUFBWSxFQUNaLEtBQUssRUFDTCxXQUFXLEVBQ1gsT0FBTyxFQUNQLE1BQU0sRUFDTixRQUFRLEVBQ1IsUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsUUFBUSxFQUNSLFFBQVEsRUFDUixPQUFPLEVBQ1AsUUFBUSxFQUNSLE9BQU8sRUFDUCxRQUFRLEVBQ1IsY0FBYyxFQUNkLE1BQU0sRUFDTixPQUFPLEVBQ1AsUUFBUSxFQUNSLFdBQVcsRUFDWCxNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixLQUFLLEVBQ0wsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sT0FBTyxDQUNQLENBQUMiLCJmaWxlIjoibWFuZ2xlLWlkZW50aWZpZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbkNvbnZlcnQgYSBuYW1lIHRvIGEgdmFsaWQgSmF2YVNjcmlwdCBpZGVudGlmaWVyLlxuQHBhcmFtIHtTdHJpbmd9IG5hbWUgQ2FuIGJlIGFueSBzdHJpbmcuXG5AcmV0dXJuIHtTdHJpbmd9XG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFuZ2xlSWRlbnRpZmllcihuYW1lKSB7XG5cdHJldHVybiBmb3JiaWRkZW5OYW1lcy5oYXMobmFtZSkgP1xuXHRcdGBfJHtuYW1lfWAgOlxuXHRcdG5hbWUucmVwbGFjZSgvW15hLXpBLVowLTkkX10vZywgXyA9PiBgXyR7Xy5jaGFyQ29kZUF0KDApfWApXG59XG5cbi8qKiBgZmFsc2VgIGlmZiBgbmFtZWAgaXMgYSB2YWxpZCBKYXZhU2NyaXB0IGlkZW50aWZpZXIuICovXG5leHBvcnQgZnVuY3Rpb24gbmVlZHNNYW5nbGUobmFtZSkge1xuXHRyZXR1cm4gZm9yYmlkZGVuTmFtZXMuaGFzKG5hbWUpIHx8ICFwcm9wZXJ0eU5hbWVPayhuYW1lKVxufVxuXG4vKiogYHRydWVgIGlmZiBgbmFtZWAgY2FuIGJlIHVzZWQgYXMgYSBwcm9wZXJ0eSBuYW1lIHVzaW5nIGRvdCBzeW50YXggKGBhLmJgKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eU5hbWVPayhuYW1lKSB7XG5cdHJldHVybiBuYW1lLnNlYXJjaCgvW15hLXpBLVowLTkkX10vKSA9PT0gLTFcbn1cblxuLyoqIFVuZG9lcyB7QGxpbmsgbWFuZ2xlSWRlbnRpZmllcn0uICovXG5leHBvcnQgZnVuY3Rpb24gdW5tYW5nbGUobmFtZSkge1xuXHRpZiAobmFtZVswXSA9PT0gJ18nKSB7XG5cdFx0Y29uc3QgcmVzdCA9IG5hbWUuc2xpY2UoMSlcblx0XHRpZiAoZm9yYmlkZGVuTmFtZXMuaGFzKHJlc3QpKVxuXHRcdFx0cmV0dXJuIHJlc3Rcblx0fVxuXHRyZXR1cm4gbmFtZS5yZXBsYWNlKC9fXFxkKy9nLCBtYXRjaCA9PiB7XG5cdFx0Y29uc3QgY2hhckNvZGUgPSBtYXRjaC5zbGljZSgxKVxuXHRcdGNvbnN0IG4gPSBOdW1iZXIucGFyc2VJbnQoY2hhckNvZGUsIDEwKVxuXHRcdGNvbnN0IGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShuKVxuXHRcdHJldHVybiBjaCA9PT0gJ1xcMCcgPyBtYXRjaCA6IGNoXG5cdH0pXG59XG5cbi8qKiBTZXQgb2YgSmF2YVNjcmlwdCBrZXl3b3Jkcy4gKi9cbmV4cG9ydCBjb25zdCBmb3JiaWRkZW5OYW1lcyA9IG5ldyBTZXQoW1xuXHQnYWJzdHJhY3QnLFxuXHQnYXJndW1lbnRzJyxcblx0J2Jvb2xlYW4nLFxuXHQnYnJlYWsnLFxuXHQnYnl0ZScsXG5cdCdjYXNlJyxcblx0J2NhdGNoJyxcblx0J2NoYXInLFxuXHQnY2xhc3MnLFxuXHQnY29tbWVudCcsXG5cdCdjb25zdCcsXG5cdCdjb250aW51ZScsXG5cdCdkZWJ1Z2dlcicsXG5cdCdkZWZhdWx0Jyxcblx0J2RlbGV0ZScsXG5cdCdkbycsXG5cdCdkb3VibGUnLFxuXHQnZWxzZScsXG5cdCdlbnVtJyxcblx0J2V2YWwnLFxuXHQnZXhwb3J0Jyxcblx0J2V4dGVuZHMnLFxuXHQnZmFsc2UnLFxuXHQnZmluYWwnLFxuXHQnZmluYWxseScsXG5cdCdmbG9hdCcsXG5cdCdmb3InLFxuXHQnZnVuY3Rpb24nLFxuXHQnZnVuY3Rpb24qJyxcblx0J2dvdG8nLFxuXHQnaWYnLFxuXHQnaW1wbGVtZW50cycsXG5cdCdpbXBvcnQnLFxuXHQnaW4nLFxuXHQnaW5zdGFuY2VPZicsXG5cdCdpbnQnLFxuXHQnaW50ZXJmYWNlJyxcblx0J2xhYmVsJyxcblx0J2xvbmcnLFxuXHQnbW9kdWxlJyxcblx0J25hdGl2ZScsXG5cdCduZXcnLFxuXHQnbnVsbCcsXG5cdCdwYWNrYWdlJyxcblx0J3ByaXZhdGUnLFxuXHQncHJvdGVjdGVkJyxcblx0J3B1YmxpYycsXG5cdCdyZXR1cm4nLFxuXHQnc2hvcnQnLFxuXHQnc3RhdGljJyxcblx0J3N1cGVyJyxcblx0J3N3aXRjaCcsXG5cdCdzeW5jaHJvbml6ZWQnLFxuXHQndGhpcycsXG5cdCd0aHJvdycsXG5cdCd0aHJvd3MnLFxuXHQndHJhbnNpZW50Jyxcblx0J3RydWUnLFxuXHQndHJ5Jyxcblx0J3R5cGVvZicsXG5cdCd2YXInLFxuXHQndm9pZCcsXG5cdCd3aGlsZScsXG5cdCd3aXRoJyxcblx0J3lpZWxkJ1xuXSlcbiJdfQ==