import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';
import { SignerAdapter, SignerAdapterSync, SignerAdapterAsync } from './SignerAdapter';

export abstract class SignersAdapter<T = any> extends ComAdapter<T> {
    public abstract Count(): Promise<number>;

    public abstract Item(Index: number): Promise<SignerAdapter>;
}

export class SignersAdapterSync extends SignersAdapter<CAdES.Sync.ISigners> {
    public Count(): Promise<number> {
        return new Promise(resolve => resolve(this.comObj.Count));
    }

    public Item(Index: number): Promise<SignerAdapterSync> {
        return new Promise(resolve => resolve(new SignerAdapterSync(this.comObj.Item(Index) as CAdES.Sync.ICPSigner6)));
    }
}

export class SignersAdapterAsync extends SignersAdapter<CAdES.Async.ISigners> {
    public Count(): Promise<number> {
        return this.comObj.Count;
    }

    public Item(Index: number): Promise<SignerAdapterAsync> {
        return this.comObj.Item(Index).then(x => new SignerAdapterAsync(x as CAdES.Async.ICPSigner6));
    }
}
