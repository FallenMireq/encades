import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';
import { Certificate, wrapCertificate } from './Certificate';

export abstract class CPSigner<T = CAdES.ICPSigner6> extends ComWrapper<T> {
    public abstract async Certificate(): Promise<Certificate>;
    public abstract async SetCertificate(certificate: Certificate): Promise<void>;
    public abstract async Options(): Promise<CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION>;
    public abstract async SetOptions(certificate: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void>;

    public abstract async AuthenticatedAttributes2(): Promise<CAdES.ICPAttributes>;
}

export class CPSignerSync extends CPSigner<CAdES.Sync.ICPSigner6> {
    public async Certificate(): Promise<Certificate> {
        return wrapCertificate(this.comObj.Certificate as CAdES.Sync.ICPCertificate);
    }

    public async SetCertificate(certificate: Certificate<CAdES.Async.ICPCertificate>): Promise<void> {
        this.comObj.Certificate = ComWrapper.getComObject(certificate);
    }

    public async Options(): Promise<CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION> {
        return this.comObj.Options;
    }
    public async SetOptions(options: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void> {
        this.comObj.Options = options;
    }

    public async AuthenticatedAttributes2(): Promise<CAdES.ICPAttributes> {
        return this.comObj.AuthenticatedAttributes2;
    }
}

export class CPSignerAsync extends CPSigner<CAdES.Async.ICPSigner6> {
    public async Certificate(): Promise<Certificate> {
        return wrapCertificate((await this.comObj.Certificate) as CAdES.Async.ICPCertificate);
    }

    public async SetCertificate(certificate: Certificate<CAdES.Async.ICPCertificate>): Promise<void> {
        await this.comObj.propset_Certificate(ComWrapper.getComObject(certificate));
    }

    public async Options(): Promise<CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION> {
        return await this.comObj.Options;
    }
    public async SetOptions(options: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void> {
        await this.comObj.propset_Options(options);
    }

    public async AuthenticatedAttributes2(): Promise<CAdES.ICPAttributes> {
        return await this.comObj.AuthenticatedAttributes2;
    }
}

export function wrapCPSigner(comObj: CAdES.Sync.ICPSigner6): CPSigner<CAdES.Sync.ICPSigner6>;
export function wrapCPSigner(comObj: CAdES.Async.ICPSigner6): CPSigner<CAdES.Async.ICPSigner6>;
export function wrapCPSigner(comObj: CAdES.ICPSigner6): CPSigner<CAdES.ICPSigner6> {
    return CAdES.isSync<CAdES.Sync.ICPSigner6, CAdES.Async.ICPSigner6>(comObj)
        ? new CPSignerSync(comObj)
        : new CPSignerAsync(comObj);
}
