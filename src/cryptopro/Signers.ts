import * as CAdES from 'cadesplugin-types';
import { Signer, wrapSigner } from './Signer';
import { ComWrapper } from './ComWrapper';

export abstract class Signers<T = CAdES.ISigners> extends ComWrapper<T> {
    public abstract async Count(): Promise<number>;

    public abstract async Item(Index: number): Promise<Signer>;
}

export class SignersSync extends Signers<CAdES.Sync.ISigners> {
    public async Count(): Promise<number> {
        return this.comObj.Count;
    }

    public async Item(Index: number): Promise<Signer<CAdES.Sync.ICPSigner6>> {
        return wrapSigner((await this.comObj.Item(Index)) as CAdES.Sync.ICPSigner6);
    }
}

export class SignersAsync extends Signers<CAdES.Async.ISigners> {
    public async Count(): Promise<number> {
        return await this.comObj.Count;
    }

    public async Item(Index: number): Promise<Signer<CAdES.Async.ICPSigner6>> {
        return wrapSigner((await this.comObj.Item(Index)) as CAdES.Async.ICPSigner6);
    }
}

export function wrapSigners(comObj: CAdES.Sync.ISigners): Signers<CAdES.Sync.ISigners>;
export function wrapSigners(comObj: CAdES.Async.ISigners): Signers<CAdES.Async.ISigners>;
export function wrapSigners(comObj: CAdES.ISigners): Signers<CAdES.ISigners> {
    return CAdES.isSync(comObj)
        ? new SignersSync(comObj as CAdES.Sync.ISigners)
        : new SignersAsync(comObj as CAdES.Async.ISigners);
}
