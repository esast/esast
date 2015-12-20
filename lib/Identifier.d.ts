import Expression from './Expression';
import Pattern from './Pattern';
export default class Identifier extends Expression implements Pattern {
    name: string;
    constructor(name: string);
    isPattern(): void;
}
