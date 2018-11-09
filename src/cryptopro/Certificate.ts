import * as CAdES from 'cadesplugin-types';

import { SuperAdapter } from './SuperAdapter';
import { CertificateAdapter } from './adapters/@';

export class Certificate extends SuperAdapter<CertificateAdapter> {
    public SerialNumber(): Promise<string> {
        return this.adapter.SerialNumber();
    }

    public SubjectName(): Promise<string> {
        return this.adapter.SubjectName();
    }

    public Thumbprint(): Promise<string> {
        return this.adapter.Thumbprint();
    }

    public ValidFromDate(): Promise<string> {
        return this.adapter.ValidFromDate();
    }

    public ValidToDate(): Promise<string> {
        return this.adapter.ValidToDate();
    }

    public Version(): Promise<number> {
        return this.adapter.Version();
    }

    public GetInfo(InfoType: CAdES.CAPICOM_CERT_INFO_TYPE): Promise<string> {
        return this.adapter.GetInfo(InfoType);
    }

    public HasPrivateKey(): Promise<boolean> {
        return this.adapter.HasPrivateKey();
    }
}
