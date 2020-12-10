export type ModelDocumentList = {
    selectedDocumentIndex: number|null,
    documents: Array<ModelDocument>
};

export type ModelDocument = {
    richText: any,
    code: string
};

