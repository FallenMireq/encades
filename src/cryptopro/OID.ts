import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';

export abstract class OID<T = CAdES.IOID> extends ComWrapper<T> {
    public abstract async FriendlyName(): Promise<string>;
    public abstract async SetFriendlyName(value: string): Promise<void>;
    public abstract async Name(): Promise<CAdES.CAPICOM_OID>;
    public abstract async SetName(value: CAdES.CAPICOM_OID): Promise<void>;
    public abstract async Value(): Promise<string>;
    public abstract async SetValue(value: string): Promise<void>;
}

export class OIDSync extends OID<CAdES.Sync.IOID> {
    public async FriendlyName(): Promise<string> {
        return this.comObj.FriendlyName;
    }

    public async SetFriendlyName(value: string): Promise<void> {
        this.comObj.FriendlyName = value;
    }

    public async Name(): Promise<CAdES.CAPICOM_OID> {
        return this.comObj.Name;
    }

    public async SetName(value: CAdES.CAPICOM_OID): Promise<void> {
        this.comObj.Name = value;
    }

    public async Value(): Promise<string> {
        return this.comObj.Value;
    }

    public async SetValue(value: string): Promise<void> {
        this.comObj.Value = value;
    }
}

export class OIDAsync extends OID<CAdES.Async.IOID> {
    public async FriendlyName(): Promise<string> {
        return await this.comObj.FriendlyName;
    }

    public async SetFriendlyName(value: string): Promise<void> {
        await this.comObj.propset_FriendlyName(value);
    }

    public async Name(): Promise<CAdES.CAPICOM_OID> {
        return await this.comObj.Name;
    }

    public async SetName(value: CAdES.CAPICOM_OID): Promise<void> {
        this.comObj.propset_Name(value);
    }

    public async Value(): Promise<string> {
        return await this.comObj.Value;
    }

    public async SetValue(value: string): Promise<void> {
        this.comObj.propset_Value(value);
    }
}

export function wrapOID(comObj: CAdES.Sync.IOID): OID<CAdES.Sync.IOID>;
export function wrapOID(comObj: CAdES.Async.IOID): OID<CAdES.Async.IOID>;
export function wrapOID(comObj: CAdES.IOID): OID<CAdES.IOID> {
    if (CAdES.isSync<CAdES.Sync.IOID, CAdES.Async.IOID>(comObj)) {
        return new OIDSync(comObj);
    } else {
        return new OIDAsync(comObj);
    }
}
