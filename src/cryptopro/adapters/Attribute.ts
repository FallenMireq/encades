import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';
import { OID, wrapOID } from './OID';

export abstract class Attribute<T = CAdES.ICPAttribute2> extends ComWrapper<T> {
    public abstract async OID(): Promise<OID>;
    public abstract async Value(): Promise<string>;
    public abstract async SetValue(value: string): Promise<void>;
}

export class AttributeSync extends Attribute<CAdES.Sync.ICPAttribute2> {
    public async OID(): Promise<OID> {
        return wrapOID(this.comObj.OID);
    }
    public async Value(): Promise<string> {
        return this.comObj.Value;
    }
    public async SetValue(value: string): Promise<void> {
        this.comObj.Value = value;
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
