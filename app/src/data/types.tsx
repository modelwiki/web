import firebase from 'firebase';

export type ModelDocumentList = {
    readonly selectedDocumentIndex: number|null,
    readonly documents: Array<ModelDocument>
};

export type ModelDocument = {
    readonly id: string | null,
    readonly title: string,
    readonly richText: any,
    readonly code: string
};

export type ModelDocumentStored = {
    readonly id: string | null,
    readonly title: string,
    readonly richText: string,
    readonly code: string
}