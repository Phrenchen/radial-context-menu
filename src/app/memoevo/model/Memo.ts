import { Consumer, IIterable } from './Types';
import { INode } from './LinkedList';

/**
 * a topic.
 * root of a thread.
 * Evos reference a Memo and add items of interest.
 */

export class Memo<GenericMemo> implements INode<GenericMemo> {
    public _id: string;
    public createDate: Date;

    public value: GenericMemo;
    public next?: INode<GenericMemo>;
    public previous?: INode<GenericMemo>;



    constructor(public title: string,
                public description: string,
                public memoHashtags: string,
                public thumbnail: string,
                public url: string,
                public neighbours: Array<string> = new Array<string>(),
                public creatorId: string
                ) {
    }

    // tslint:disable-next-line:no-shadowed-variable
    public identity<T>(arg: T): T {
        return arg;
    }

    public toString(): string {
        return 'memo: ' + this.title +
               '. creator: ' + this.creatorId +
               '. neighbour: ' + this.neighbours.length;
    }

}
