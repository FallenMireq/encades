import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';
import { OID, wrapOID } from './OID';

export abstract class Attribute<T = CAdES.ICPAttribute2> extends ComWrapper<T> {
    public abstract async OID(): Promise<OID>;
    public abstract async Value(): Promise<string>;
    public abstract async SetValue(value: string): Promise<void>;
    public abstract async Name(): Promise<CAdES.CADESCOM_ATTRIBUTE>;
    public abstract async SetName(value: CAdES.CADESCOM_ATTRIBUTE): Promise<void>;
    public abstract async ValueEncoding(): Promise<CAdES.CAPICOM_ENCODING_TYPE>;
    public abstract async SetValueEncoding(value: CAdES.CAPICOM_ENCODING_TYPE): Promise<void>;
}

export class AttributeSync extends Attribute<CAdES.Sync.ICPAttribute2> {
    public async OID(): Promise<OID> {
        this.comObj.ValueEncoding
        return wrapOID(this.comObj.OID);
    }
    public async Value(): Promise<string> {
        return this.comObj.Value;
    }
    public async SetValue(value: string): Promise<void> {
        this.comObj.Value = value;
    }
    public async Name(): Promise<CAdES.CADESCOM_ATTRIBUTE> {
        return this.comObj.Name;
    }
    public async SetName(value: CAdES.CADESCOM_ATTRIBUTE): Promise<void> {
        this.comObj.Name = value;
    }
    public async ValueEncoding(): Promise<CAdES.CAPICOM_ENCODING_TYPE> {
        return this.comObj.ValueEncoding;
    }
    public async SetValueEncoding(value: CAdES.CAPICOM_ENCODING_TYPE): Promise<void> {
        this.comObj.ValueEncoding = value;
    }
}

export class AttributeAsync extends Attribute<CAdES.Async.ICPAttribute2> {
    public async OID(): Promise<OID> {
        return wrapOID(await this.comObj.OID);
    }
    public async Value(): Promise<string> {
        return await this.comObj.Value;
    }
    public async SetValue(value: string): Promise<void> {
        await this.comObj.propset_Value(value);
    }
    public async Name(): Promise<CAdES.CADESCOM_ATTRIBUTE> {
        return await this.comObj.Name;
    }
    public async SetName(value: CAdES.CADESCOM_ATTRIBUTE): Promise<void> {
        this.comObj.propset_Name(value);
    }
    public async ValueEncoding(): Promise<CAdES.CAPICOM_ENCODING_TYPE> {
        return await this.comObj.ValueEncoding;
    }
    public async SetValueEncoding(value: CAdES.CAPICOM_ENCODING_TYPE): Promise<void> {
        await this.comObj.propset_ValueEncoding(value);
    }
}

export function wrapAttribute(comObj: CAdES.Sync.ICPAttribute2): Attribute<CAdES.Sync.ICPAttribute2>;
export function wrapAttribute(comObj: CAdES.Async.ICPAttribute2): Attribute<CAdES.Async.ICPAttribute2>;
export function wrapAttribute(comObj: CAdES.ICPAttribute2): Attribute<CAdES.ICPAttribute2> {
    if (CAdES.isSync<CAdES.Sync.ICPAttribute2, CAdES.Async.ICPAttribute2>(comObj)) {
        return new AttributeSync(comObj);
    } else {
        return new AttributeAsync(comObj);
    }
}

export async function createAttribute(): Promise<Attribute> {
    if (CAdES.isSync<CAdES.Sync.IWebClassFactory, CAdES.Async.IWebClassFactory>(CAdES.cadesplugin)) {
        let comObj = CAdES.cadesplugin.CreateObject(CAdES.ProgIds.CPAttribute);
        return wrapAttribute(comObj);
    } else {
        await CAdES.cadesplugin;
        let comObj = await CAdES.cadesplugin.CreateObjectAsync(CAdES.ProgIds.CPAttribute);
        return wrapAttribute(comObj);
    }
}
