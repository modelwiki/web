import firebase from 'firebase';

export type ModelDocumentList = {
    readonly selectedDocumentIndex: number|null,
    readonly documents: Array<ModelDocument>
};

export type ModelDocument = {
    readonly id: string | null,
    readonly title: string,
    readonly richText: any,
    readonly code: string,
    readonly descriptorCode: string
};

export type ModelDocumentStored = {
    readonly id: string | null,
    readonly title: string,
    readonly richText: string,
    readonly code: string,
    readonly descriptorCode: string
}

export type Descriptor = {
    defaultValue: number,
    min: number, 
    max: number, 
    step: number, 
    prefix: string, 
    suffix: string,
    thousands: 'comma' | 'si',
};
