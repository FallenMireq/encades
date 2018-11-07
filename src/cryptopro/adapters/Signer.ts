import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';
import { Attributes, wrapAttributes } from './Attributes';
import { Certificate, wrapCertificate } from './Certificate';

export abstract class Signer<T = CAdES.ICPSigner6> extends ComWrapper<T> {
    public abstract async Certificate(): Promise<Certificate>;
    public abstract async SetCertificate(certificate: Certificate): Promise<void>;
    public abstract async Options(): Promise<CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION>;
    public abstract async SetOptions(certificate: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void>;

    public abstract async AuthenticatedAttributes2(): Promise<Attributes>;
}

export class SignerSync extends Signer<CAdES.Sync.ICPSigner6> {
    public async Certificate(): Promise<Certificate> {
        return wrapCertificate(this.comObj.Certificate as CAdES.Sync.ICPCertificate);
    }

    public async SetCertificate(certificate: Certificate<CAdES.Async.ICPCertificate>): Promise<void> {
        this.comObj.Certificate = ComWrapper.unwrap(certificate);
    }

    public async Options(): Promise<CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION> {
        return this.comObj.Options;
    }
    public async SetOptions(options: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void> {
        this.comObj.Options = options;
    }

    public async AuthenticatedAttributes2(): Promise<Attributes> {
        return wrapAttributes(this.comObj.AuthenticatedAttributes2);
    }
}

export class SignerAsync extends Signer<CAdES.Async.ICPSigner6> {
    public async Certificate(): Promise<Certificate> {
        return wrapCertificate((await this.comObj.Certificate) as CAdES.Async.ICPCertificate);
    }

    public async SetCertificate(certificate: Certificate<CAdES.Async.ICPCertificate>): Promise<void> {
        await this.comObj.propset_Certificate(ComWrapper.unwrap(certificate));
    }

    public async Options(): Promise<CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION> {
        return await this.comObj.Options;
    }
    public async SetOptions(options: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void> {
        await this.comObj.propset_Options(options);
    }

    public async AuthenticatedAttributes2(): Promise<Attributes> {
        return wrapAttributes(await this.comObj.AuthenticatedAttributes2);
    }
}

export function wrapSigner(comObj: CAdES.Sync.ICPSigner6): Signer<CAdES.Sync.ICPSigner6>;
export function wrapSigner(comObj: CAdES.Async.ICPSigner6): Signer<CAdES.Async.ICPSigner6>;
export function wrapSigner(comObj: CAdES.ICPSigner6): Signer<CAdES.ICPSigner6> {
    return CAdES.isSync<CAdES.Sync.ICPSigner6, CAdES.Async.ICPSigner6>(comObj)
        ? new SignerSync(comObj)
        : new SignerAsync(comObj);
}

export async function createSigner(): Promise<Signer> {
    if (CAdES.isSync<CAdES.Sync.IWebClassFactory, CAdES.Async.IWebClassFactory>(CAdES.cadesplugin)) {
        let comObj = CAdES.cadesplugin.CreateObject(CAdES.ProgIds.CPSigner);
        return wrapSigner(comObj);
    } else {
        await CAdES.cadesplugin;
        let comObj = await CAdES.cadesplugin.CreateObjectAsync(CAdES.ProgIds.CPSigner);
        return wrapSigner(comObj);
    }
}
