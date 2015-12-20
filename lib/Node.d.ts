import Op from 'op/Op';
import Loc from './Loc';
declare abstract class Node {
    loc: Op<Loc>;
    toJSON(): Object;
    type: string;
    toString(): string;
}
export default Node;
