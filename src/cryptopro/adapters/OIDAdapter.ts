import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';

export abstract class OIDAdapter<T = any> extends ComAdapter<T> {
    public abstract FriendlyName(): Promise<string>;
    public abstract SetFriendlyName(value: string): Promise<void>;
    public abstract Name(): Promise<CAdES.CAPICOM_OID>;
    public abstract SetName(value: CAdES.CAPICOM_OID): Promise<void>;
    public abstract Value(): Promise<string>;
    public abstract SetValue(value: string): Promise<void>;
}

export class OIDAdapterSync extends OIDAdapter<CAdES.Sync.IOID> {
    public FriendlyName(): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.FriendlyName));
    }

    public SetFriendlyName(value: string): Promise<void> {
        return new Promise(resolve => {
            this.comObj.FriendlyName = value;
            resolve();
        });
    }

    public Name(): Promise<CAdES.CAPICOM_OID> {
        return new Promise(resolve => resolve(this.comObj.Name));
    }

    public SetName(value: CAdES.CAPICOM_OID): Promise<void> {
        return new Promise(resolve => {
            this.comObj.Name = value;
            resolve();
        });
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
}

export class OIDAdapterAsync extends OIDAdapter<CAdES.Async.IOID> {
    public FriendlyName(): Promise<string> {
        return this.comObj.FriendlyName;
    }

    public SetFriendlyName(value: string): Promise<void> {
        return this.comObj.propset_FriendlyName(value);
    }

    public Name(): Promise<CAdES.CAPICOM_OID> {
        return this.comObj.Name;
    }

    public SetName(value: CAdES.CAPICOM_OID): Promise<void> {
        return this.comObj.propset_Name(value);
    }

    public Value(): Promise<string> {
        return this.comObj.Value;
    }

    public SetValue(value: string): Promise<void> {
        return this.comObj.propset_Value(value);
    }
}
