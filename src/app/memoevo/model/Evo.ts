/**
 * item of interest related to a topic.
 */
export interface Evo {
    _id: string;
    createDate: string;

    parentMemo: string;     // attach to Memo

    title: string;
    description: string;
}
