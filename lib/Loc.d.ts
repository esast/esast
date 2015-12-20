export default class Loc {
    start: Pos;
    end: Pos;
    static singleChar(pos: Pos): Loc;
    constructor(start: Pos, end: Pos);
    compare(loc: Loc): number;
    toString(): string;
}
export declare class Pos {
    line: number;
    column: number;
    static start: Pos;
    constructor(line: number, column: number);
    compare(pos: Pos): number;
    next(ch: string): Pos;
    onNextLine(): Pos;
    onNextColumn(): Pos;
    onPrevColumn(): Pos;
    toString(): string;
}
