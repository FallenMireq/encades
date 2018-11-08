import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';

export abstract class Certificate<T = CAdES.ICPCertificate> extends ComWrapper<T> {
    public abstract async SerialNumber(): Promise<string>;
    public abstract async SubjectName(): Promise<string>;
    public abstract async Thumbprint(): Promise<string>;
    public abstract async ValidFromDate(): Promise<string>;
    public abstract async ValidToDate(): Promise<string>;
    public abstract async Version(): Promise<number>;

    public abstract async GetInfo(InfoType: CAdES.CAPICOM_CERT_INFO_TYPE): Promise<string>;
    public abstract async HasPrivateKey(): Promise<boolean>;
}

export class CertificateSync extends Certificate<CAdES.Sync.ICPCertificate> {
    public async SerialNumber(): Promise<string> {
        return this.comObj.SerialNumber;
    }
    public async SubjectName(): Promise<string> {
        return this.comObj.SubjectName;
    }
    public async Thumbprint(): Promise<string> {
        return this.comObj.Thumbprint;
    }
    public async ValidFromDate(): Promise<string> {
        return this.comObj.ValidFromDate;
    }
    public async ValidToDate(): Promise<string> {
        return this.comObj.ValidToDate;
    }
    public async Version(): Promise<number> {
        return this.comObj.Version;
    }

    public async GetInfo(InfoType: CAdES.CAPICOM_CERT_INFO_TYPE): Promise<string> {
        return this.comObj.GetInfo(InfoType);
    }
    public async HasPrivateKey(): Promise<boolean> {
        return this.comObj.HasPrivateKey();
    }
}

export class CertificateAsync extends Certificate<CAdES.Async.ICPCertificate> {
    public async SerialNumber(): Promise<string> {
        return await this.comObj.SerialNumber;
    }
    public async SubjectName(): Promise<string> {
        return await this.comObj.SubjectName;
    }
    public async Thumbprint(): Promise<string> {
        return await this.comObj.Thumbprint;
    }
    public async ValidFromDate(): Promise<string> {
        return await this.comObj.ValidFromDate;
    }
    public async ValidToDate(): Promise<string> {
        return await this.comObj.ValidToDate;
    }
    public async Version(): Promise<number> {
        return await this.comObj.Version;
    }

    public async GetInfo(InfoType: CAdES.CAPICOM_CERT_INFO_TYPE): Promise<string> {
        return await this.comObj.GetInfo(InfoType);
    }
    public async HasPrivateKey(): Promise<boolean> {
        return await this.comObj.HasPrivateKey();
    }
}

export function wrapCertificate(comObj: CAdES.Sync.ICPCertificate): Certificate<CAdES.Sync.ICPCertificate>;
export function wrapCertificate(comObj: CAdES.Async.ICPCertificate): Certificate<CAdES.Async.ICPCertificate>;
export function wrapCertificate(comObj: CAdES.ICPCertificate): Certificate<CAdES.ICPCertificate> {
    if (CAdES.isSync<CAdES.Sync.ICPCertificate, CAdES.Async.ICPCertificate>(comObj)) {
        return new CertificateSync(comObj);
    } else {
        return new CertificateAsync(comObj);
    }
}
