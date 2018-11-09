import * as CAdES from 'cadesplugin-types';

import { webFactoryAdapter } from './adapters/@';
import { About } from './About';
import { SignedData } from './SignedData';
import { Attribute } from './Attribute';
import { Certificate } from './Certificate';
import { HashedData } from './HashedData';
import { Signer } from './Signer';
import { Store } from './Store';

export class WebFactory {
    protected static adapter = webFactoryAdapter;

    public About(): Promise<About> {
        return WebFactory.adapter.CreateObject(CAdES.ProgIds.About).then(x => new About(x));
    }

    public SignedData(): Promise<SignedData> {
        return WebFactory.adapter.CreateObject(CAdES.ProgIds.CadesSignedData).then(x => new SignedData(x));
    }

    public Attribute(): Promise<Attribute> {
        return WebFactory.adapter.CreateObject(CAdES.ProgIds.CPAttribute).then(x => new Attribute(x));
    }

    public Certificate(): Promise<Certificate> {
        return WebFactory.adapter.CreateObject(CAdES.ProgIds.CPCertificate).then(x => new Certificate(x));
    }

    public HashedData(): Promise<HashedData> {
        return WebFactory.adapter.CreateObject(CAdES.ProgIds.CPHashedData).then(x => new HashedData(x));
    }

    public Signer(): Promise<Signer> {
        return WebFactory.adapter.CreateObject(CAdES.ProgIds.CPSigner).then(x => new Signer(x));
    }

    public Store(): Promise<Store> {
        return WebFactory.adapter.CreateObject(CAdES.ProgIds.Store).then(x => new Store(x));
    }
}
