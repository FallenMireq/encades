import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';

export abstract class CertificateAdapter<T = any> extends ComAdapter<T> {
    public abstract SerialNumber(): Promise<string>;
    public abstract SubjectName(): Promise<string>;
    public abstract Thumbprint(): Promise<string>;
    public abstract ValidFromDate(): Promise<string>;
    public abstract ValidToDate(): Promise<string>;
    public abstract Version(): Promise<number>;

    public abstract GetInfo(InfoType: CAdES.CAPICOM_CERT_INFO_TYPE): Promise<string>;
    public abstract HasPrivateKey(): Promise<boolean>;
}

export class CertificateAdapterSync extends CertificateAdapter<CAdES.Sync.ICPCertificate> {
    public SerialNumber(): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.SerialNumber));
    }

    public SubjectName(): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.SubjectName));
    }

    public Thumbprint(): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.Thumbprint));
    }

    public ValidFromDate(): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.ValidFromDate));
    }

    public ValidToDate(): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.ValidToDate));
    }

    public Version(): Promise<number> {
        return new Promise(resolve => resolve(this.comObj.Version));
    }

    public GetInfo(InfoType: CAdES.CAPICOM_CERT_INFO_TYPE): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.GetInfo(InfoType)));
    }

    public HasPrivateKey(): Promise<boolean> {
        return new Promise(resolve => resolve(this.comObj.HasPrivateKey()));
    }
}

export class CertificateAdapterAsync extends CertificateAdapter<CAdES.Async.ICPCertificate> {
    public SerialNumber(): Promise<string> {
        return this.comObj.SerialNumber;
    }

    public SubjectName(): Promise<string> {
        return this.comObj.SubjectName;
    }

    public Thumbprint(): Promise<string> {
        return this.comObj.Thumbprint;
    }

    public ValidFromDate(): Promise<string> {
        return this.comObj.ValidFromDate;
    }

    public ValidToDate(): Promise<string> {
        return this.comObj.ValidToDate;
    }

    public Version(): Promise<number> {
        return this.comObj.Version;
    }

    public GetInfo(InfoType: CAdES.CAPICOM_CERT_INFO_TYPE): Promise<string> {
        return this.comObj.GetInfo(InfoType);
    }

    public HasPrivateKey(): Promise<boolean> {
        return this.comObj.HasPrivateKey();
    }
}
