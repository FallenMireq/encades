import { SuperAdapter } from './SuperAdapter';
import { SignersAdapter } from './adapters/@';
import { Signer } from './Signer';

export class Signers extends SuperAdapter<SignersAdapter> {
    public Count(): Promise<number> {
        return this.adapter.Count();
    }

    public Item(Index: number): Promise<Signer> {
        return this.adapter.Item(Index).then(x => new Signer(x));
    }
}
