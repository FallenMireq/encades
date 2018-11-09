import * as CAdES from 'cadesplugin-types';

import { SuperAdapter } from './SuperAdapter';
import { AttributeAdapter } from './adapters/@';
import { OID } from './OID';

export class Attribute extends SuperAdapter<AttributeAdapter> {
    public OID(): Promise<OID> {
        return this.adapter.OID().then(x => new OID(x));
    }

    public Value(): Promise<string> {
        return this.adapter.Value();
    }

    public SetValue(value: string): Promise<void> {
        return this.adapter.SetValue(value);
    }

    public Name(): Promise<CAdES.CADESCOM_ATTRIBUTE> {
        return this.adapter.Name();
    }

    public SetName(value: CAdES.CADESCOM_ATTRIBUTE): Promise<void> {
        return this.adapter.SetName(value);
    }

    public ValueEncoding(): Promise<CAdES.CAPICOM_ENCODING_TYPE> {
        return this.adapter.ValueEncoding();
    }

    public SetValueEncoding(value: CAdES.CAPICOM_ENCODING_TYPE): Promise<void> {
        return this.adapter.SetValueEncoding(value);
    }
}
