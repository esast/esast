(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";

    class Loc {
        constructor(start, end) {
            this.start = start;
            this.end = end;
        }
        static singleChar(pos) {
            return new Loc(pos, pos.onNextColumn());
        }
        compare(loc) {
            const startDiff = this.start.compare(loc.start);
            return startDiff === 0 ? this.end.compare(loc.end) : startDiff;
        }
        toString() {
            return `${ this.start }-${ this.end }`;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Loc;
    class Pos {
        constructor(line, column) {
            this.line = line;
            this.column = column;
        }
        compare(pos) {
            const lineDiff = this.line - pos.line;
            return lineDiff === 0 ? this.column - pos.column : lineDiff;
        }
        next(ch) {
            return ch === '\n' ? this.onNextLine() : this.onNextColumn();
        }
        onNextLine() {
            return new Pos(this.line + 1, Pos.start.column);
        }
        onNextColumn() {
            return new Pos(this.line, this.column + 1);
        }
        onPrevColumn() {
            return new Pos(this.line, this.column - 1);
        }
        toString() {
            return `${ this.line }:${ this.column }`;
        }
    }
    Pos.start = new Pos(1, 0);
    exports.Pos = Pos;
});
//# sourceMappingURL=Loc.js.map
