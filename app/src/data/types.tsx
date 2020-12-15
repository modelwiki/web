export type ModelDocumentList = {
    readonly selectedDocumentIndex: number|null,
    readonly documents: Array<ModelDocument>
};

export type ModelDocument = {
    readonly richText: any,
    readonly code: string
};

