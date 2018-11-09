import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';
import { OIDAdapter, OIDAdapterSync, OIDAdapterAsync } from './OIDAdapter';

export abstract class AttributeAdapter<T = any> extends ComAdapter<T> {
    public abstract OID(): Promise<OIDAdapter>;
    public abstract Value(): Promise<string>;
    public abstract SetValue(value: string): Promise<void>;
    public abstract Name(): Promise<CAdES.CADESCOM_ATTRIBUTE>;
    public abstract SetName(value: CAdES.CADESCOM_ATTRIBUTE): Promise<void>;
    public abstract ValueEncoding(): Promise<CAdES.CAPICOM_ENCODING_TYPE>;
    public abstract SetValueEncoding(value: CAdES.CAPICOM_ENCODING_TYPE): Promise<void>;
}

export class AttributeAdapterSync extends AttributeAdapter<CAdES.Sync.ICPAttribute2> {
    public OID(): Promise<OIDAdapterSync> {
        return new Promise(resolve => resolve(new OIDAdapterSync(this.comObj.OID)));
    }

    public Value(): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.Value));
    }

    public SetValue(value: string): Promise<void> {
        return new Promise(resolve => {
            this.comObj.Value = value;
            resolve();
        });
    }

    public Name(): Promise<CAdES.CADESCOM_ATTRIBUTE> {
        return new Promise(resolve => resolve(this.comObj.Name));
    }

    public SetName(value: CAdES.CADESCOM_ATTRIBUTE): Promise<void> {
        return new Promise(resolve => {
            this.comObj.Name = value;
            resolve();
        });
    }

    public ValueEncoding(): Promise<CAdES.CAPICOM_ENCODING_TYPE> {
        return new Promise(resolve => resolve(this.comObj.ValueEncoding));
    }

    public SetValueEncoding(value: CAdES.CAPICOM_ENCODING_TYPE): Promise<void> {
        return new Promise(resolve => {
            this.comObj.ValueEncoding = value;
            resolve();
        });
    }
}

export class AttributeAdapterAsync extends AttributeAdapter<CAdES.Async.ICPAttribute2> {
    public OID(): Promise<OIDAdapterAsync> {
        return this.comObj.OID.then(x => new OIDAdapterAsync(x));
    }

    public Value(): Promise<string> {
        return this.comObj.Value;
    }

    public SetValue(value: string): Promise<void> {
        return this.comObj.propset_Value(value);
    }

    public Name(): Promise<CAdES.CADESCOM_ATTRIBUTE> {
        return this.comObj.Name;
    }

    public SetName(value: CAdES.CADESCOM_ATTRIBUTE): Promise<void> {
        return this.comObj.propset_Name(value);
    }

    public ValueEncoding(): Promise<CAdES.CAPICOM_ENCODING_TYPE> {
        return this.comObj.ValueEncoding;
    }

    public SetValueEncoding(value: CAdES.CAPICOM_ENCODING_TYPE): Promise<void> {
        return this.comObj.propset_ValueEncoding(value);
    }
}
