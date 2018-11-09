import * as CAdES from 'cadesplugin-types';

import { SuperAdapter } from './SuperAdapter';
import { SignerAdapter } from './adapters/@';
import { Certificate } from './Certificate';
import { Attributes } from './Attributes';

export class Signer extends SuperAdapter<SignerAdapter> {
    public Certificate(): Promise<Certificate> {
        return this.adapter.Certificate().then(x => new Certificate(x));
    }

    public SetCertificate(certificate: Certificate): Promise<void> {
        return this.adapter.SetCertificate(SuperAdapter.unwrap(certificate));
    }

    public Options(): Promise<CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION> {
        return this.adapter.Options();
    }

    public SetOptions(options: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void> {
        return this.adapter.SetOptions(options);
    }

    public AuthenticatedAttributes2(): Promise<Attributes> {
        return this.adapter.AuthenticatedAttributes2().then(x => new Attributes(x));
    }
}
