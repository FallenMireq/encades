import * as CAdES from 'cadesplugin-types';

import { SuperAdapter } from './SuperAdapter';
import { OIDAdapter } from './adapters/@';

export class OID extends SuperAdapter<OIDAdapter> {
    public FriendlyName(): Promise<string> {
        return this.adapter.FriendlyName();
    }

    public SetFriendlyName(value: string): Promise<void> {
        return this.adapter.SetFriendlyName(value);
    }

    public Name(): Promise<CAdES.CAPICOM_OID> {
        return this.adapter.Name();
    }

    public SetName(value: CAdES.CAPICOM_OID): Promise<void> {
        return this.adapter.SetName(value);
    }

    public Value(): Promise<string> {
        return this.adapter.Value();
    }

    public SetValue(value: string): Promise<void> {
        return this.adapter.SetValue(value);
    }
}
