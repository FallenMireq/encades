import * as CAdES from 'cadesplugin-types';

import { AboutAdapter, AboutAdapterSync, AboutAdapterAsync } from './AboutAdapter';
import { AttributeAdapter, AttributeAdapterSync, AttributeAdapterAsync } from './AttributeAdapter';
import { CertificateAdapter, CertificateAdapterSync, CertificateAdapterAsync } from './CertificateAdapter';
import { HashedDataAdapter, HashedDataAdapterSync, HashedDataAdapterAsync } from './HashedDataAdapter';
import { SignedDataAdapter, SignedDataAdapterSync, SignedDataAdapterAsync } from './SignedDataAdapter';
import { SignerAdapter, SignerAdapterSync, SignerAdapterAsync } from './SignerAdapter';
import { StoreAdapter, StoreAdapterSync, StoreAdapterAsync } from './StoreAdapter';

export interface IWebFactoryAdapter {
    CreateObject(progId: CAdES.ProgIds.About): Promise<AboutAdapter>;
    CreateObject(progId: CAdES.ProgIds.CadesSignedData): Promise<SignedDataAdapter>;
    CreateObject(progId: CAdES.ProgIds.CPAttribute): Promise<AttributeAdapter>;
    CreateObject(progId: CAdES.ProgIds.CPCertificate): Promise<CertificateAdapter>;
    CreateObject(progId: CAdES.ProgIds.CPEnvelopedData): Promise<any>;
    CreateObject(progId: CAdES.ProgIds.CPHashedData): Promise<HashedDataAdapter>;
    CreateObject(progId: CAdES.ProgIds.CPSigner): Promise<SignerAdapter>;
    CreateObject(progId: CAdES.ProgIds.PrivateKeyUsageValidator): Promise<any>;
    CreateObject(progId: CAdES.ProgIds.RawSignature): Promise<any>;
    CreateObject(progId: CAdES.ProgIds.SignedXML): Promise<any>;
    CreateObject(progId: CAdES.ProgIds.Store): Promise<StoreAdapter>;
    CreateObject(progId: CAdES.ProgIds.SymmetricAlgorithm): Promise<any>;
    CreateObject(progId: CAdES.ProgIds): Promise<any>;
}

export class WebFactoryAdapterSync implements IWebFactoryAdapter {
    protected static _adapters = {
        [CAdES.ProgIds.About]: (x: CAdES.Sync.IAbout4) => new AboutAdapterSync(x),
        [CAdES.ProgIds.CadesSignedData]: (x: CAdES.Sync.ICPSignedData5) => new SignedDataAdapterSync(x),
        [CAdES.ProgIds.CPAttribute]: (x: CAdES.Sync.ICPAttribute2) => new AttributeAdapterSync(x),
        [CAdES.ProgIds.CPCertificate]: (x: CAdES.Sync.ICPCertificate) => new CertificateAdapterSync(x),
        [CAdES.ProgIds.CPEnvelopedData]: null,
        [CAdES.ProgIds.CPHashedData]: (x: CAdES.Sync.ICPHashedData) => new HashedDataAdapterSync(x),
        [CAdES.ProgIds.CPSigner]: (x: CAdES.Sync.ICPSigner6) => new SignerAdapterSync(x),
        [CAdES.ProgIds.PrivateKeyUsageValidator]: null,
        [CAdES.ProgIds.RawSignature]: null,
        [CAdES.ProgIds.SignedXML]: null,
        [CAdES.ProgIds.Store]: (x: CAdES.Sync.IStore) => new StoreAdapterSync(x),
        [CAdES.ProgIds.SymmetricAlgorithm]: null,
    };

    public CreateObject(progId: CAdES.ProgIds): Promise<any> {
        if (!WebFactoryAdapterSync._adapters.hasOwnProperty(progId)) {
            throw new Error('Invalid progId');
        }

        let factory: ((x: any) => any) | null = WebFactoryAdapterSync._adapters[progId];

        if (factory === null) {
            throw new Error('Not implemented yet...');
        }

        let existingFactory = factory;

        return new Promise(resolve =>
            resolve((CAdES.cadesplugin as CAdES.Sync.IWebClassFactory).CreateObject(progId))
        ).then(x => existingFactory(x));
    }
}

export class WebFactoryAdapterAsync implements IWebFactoryAdapter {
    protected static _adapters = {
        [CAdES.ProgIds.About]: (x: CAdES.Async.IAbout4) => new AboutAdapterAsync(x),
        [CAdES.ProgIds.CadesSignedData]: (x: CAdES.Async.ICPSignedData5) => new SignedDataAdapterAsync(x),
        [CAdES.ProgIds.CPAttribute]: (x: CAdES.Async.ICPAttribute2) => new AttributeAdapterAsync(x),
        [CAdES.ProgIds.CPCertificate]: (x: CAdES.Async.ICPCertificate) => new CertificateAdapterAsync(x),
        [CAdES.ProgIds.CPEnvelopedData]: null,
        [CAdES.ProgIds.CPHashedData]: (x: CAdES.Async.ICPHashedData) => new HashedDataAdapterAsync(x),
        [CAdES.ProgIds.CPSigner]: (x: CAdES.Async.ICPSigner6) => new SignerAdapterAsync(x),
        [CAdES.ProgIds.PrivateKeyUsageValidator]: null,
        [CAdES.ProgIds.RawSignature]: null,
        [CAdES.ProgIds.SignedXML]: null,
        [CAdES.ProgIds.Store]: (x: CAdES.Async.IStore) => new StoreAdapterAsync(x),
        [CAdES.ProgIds.SymmetricAlgorithm]: null,
    };

    public CreateObject(progId: CAdES.ProgIds): Promise<any> {
        if (!WebFactoryAdapterAsync._adapters.hasOwnProperty(progId)) {
            throw new Error('Invalid progId');
        }

        let factory: ((x: any) => any) | null = WebFactoryAdapterAsync._adapters[progId];

        if (factory === null) {
            throw new Error('Not implemented yet...');
        }

        let existingFactory = factory;

        return (CAdES.cadesplugin as any)
            .then(() => (CAdES.cadesplugin as CAdES.Async.IWebClassFactory).CreateObjectAsync(progId))
            .then((x: any) => existingFactory(x));
    }
}

export const webFactoryAdapter: IWebFactoryAdapter = CAdES.isSync(CAdES.cadesplugin)
    ? new WebFactoryAdapterSync()
    : new WebFactoryAdapterAsync();
