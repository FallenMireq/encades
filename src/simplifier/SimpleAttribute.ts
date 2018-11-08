import * as CAdES from 'cadesplugin-types';

export abstract class SimpleAttribute {
    public readonly Name: CAdES.CADESCOM_ATTRIBUTE;
    public readonly Value: string;

    constructor(name: CAdES.CADESCOM_ATTRIBUTE, value: string) {
        this.Name = name;
        this.Value = value;
    }
}

export class SimpleSigningTimeAttribute extends SimpleAttribute {
    public constructor(value: Date | string) {
        let strValue = value instanceof Date ? value.toISOString() : value;
        super(CAdES.CADESCOM_ATTRIBUTE.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME, strValue);
    }
}

export class SimpleDocumentNameAttribute extends SimpleAttribute {
    public constructor(value: string) {
        super(CAdES.CADESCOM_ATTRIBUTE.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME, value);
    }
}

export class SimpleDocumentDescriptionAttribute extends SimpleAttribute {
    public constructor(value: string) {
        super(CAdES.CADESCOM_ATTRIBUTE.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION, value);
    }
}
