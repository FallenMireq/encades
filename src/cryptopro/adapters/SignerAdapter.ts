import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';
import { AttributesAdapter, AttributesAdapterSync, AttributesAdapterAsync } from './AttributesAdapter';
import { CertificateAdapter, CertificateAdapterSync, CertificateAdapterAsync } from './CertificateAdapter';

export abstract class SignerAdapter<T = any> extends ComAdapter<T> {
    public abstract Certificate(): Promise<CertificateAdapter>;
    public abstract SetCertificate(certificate: CertificateAdapter): Promise<void>;
    public abstract Options(): Promise<CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION>;
    public abstract SetOptions(certificate: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void>;

    public abstract AuthenticatedAttributes2(): Promise<AttributesAdapter>;
}

export class SignerAdapterSync extends SignerAdapter<CAdES.Sync.ICPSigner6> {
    public Certificate(): Promise<CertificateAdapterSync> {
        return new Promise(resolve =>
            resolve(new CertificateAdapterSync(this.comObj.Certificate as CAdES.Sync.ICPCertificate))
        );
    }

    public SetCertificate(certificate: CertificateAdapterSync): Promise<void> {
        return new Promise(resolve => {
            this.comObj.Certificate = ComAdapter.unwrap(certificate);
            resolve();
        });
    }

    public Options(): Promise<CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION> {
        return new Promise(resolve => resolve(this.comObj.Options));
    }

    public SetOptions(options: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void> {
        return new Promise(resolve => {
            this.comObj.Options = options;
            resolve();
        });
    }

    public AuthenticatedAttributes2(): Promise<AttributesAdapterSync> {
        return new Promise(resolve => resolve(new AttributesAdapterSync(this.comObj.AuthenticatedAttributes2)));
    }
}

export class SignerAdapterAsync extends SignerAdapter<CAdES.Async.ICPSigner6> {
    public Certificate(): Promise<CertificateAdapterAsync> {
        return this.comObj.Certificate.then(x => new CertificateAdapterAsync(x as CAdES.Async.ICPCertificate));
    }

    public SetCertificate(certificate: CertificateAdapterAsync): Promise<void> {
        return this.comObj.propset_Certificate(ComAdapter.unwrap(certificate));
    }

    public Options(): Promise<CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION> {
        return this.comObj.Options;
    }

    public SetOptions(options: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void> {
        return this.comObj.propset_Options(options);
    }

    public AuthenticatedAttributes2(): Promise<AttributesAdapterAsync> {
        return this.comObj.AuthenticatedAttributes2.then(x => new AttributesAdapterAsync(x));
    }
}
