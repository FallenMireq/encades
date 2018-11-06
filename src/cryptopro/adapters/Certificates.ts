import * as CAdES from 'cadesplugin-types';
import { Certificate, wrapCertificate } from './Certificate';
import { ComWrapper } from './ComWrapper';

export abstract class Certificates<T = CAdES.ICertificates> extends ComWrapper<T> {
    public abstract async Count(): Promise<number>;

    public abstract async Item(Index: number): Promise<Certificate>;

    public abstract async Find(FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE): Promise<Certificates>;
    public abstract async Find(FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE, varCriteria: any): Promise<Certificates>;
    public abstract async Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria: any,
        bFindValidOnly: boolean
    ): Promise<Certificates>;
}

export class CertificatesSync extends Certificates<CAdES.Sync.ICertificates> {
    public async Count(): Promise<number> {
        return this.comObj.Count;
    }

    public async Item(Index: number): Promise<Certificate<CAdES.Sync.ICPCertificate>> {
        return wrapCertificate((await this.comObj.Item(Index)) as CAdES.Sync.ICPCertificate);
    }

    public async Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria?: any,
        bFindValidOnly?: boolean
    ): Promise<Certificates<CAdES.Sync.ICertificates>> {
        let resultCom: CAdES.Sync.ICertificates;

        if (varCriteria === undefined) {
            resultCom = this.comObj.Find(FindType);
        } else if (bFindValidOnly === undefined) {
            resultCom = this.comObj.Find(FindType, varCriteria);
        } else {
            resultCom = this.comObj.Find(FindType, varCriteria, bFindValidOnly);
        }

        return wrapCertificates(resultCom);
    }
}

export class CertificatesAsync extends Certificates<CAdES.Async.ICertificates> {
    public async Count(): Promise<number> {
        return await this.comObj.Count;
    }

    public async Item(Index: number): Promise<Certificate<CAdES.Async.ICPCertificate>> {
        return wrapCertificate((await this.comObj.Item(Index)) as CAdES.Async.ICPCertificate);
    }

    public async Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria?: any,
        bFindValidOnly?: boolean
    ): Promise<Certificates<CAdES.Async.ICertificates>> {
        let resultCom: CAdES.Async.ICertificates;

        if (varCriteria === undefined) {
            resultCom = await this.comObj.Find(FindType);
        } else if (bFindValidOnly === undefined) {
            resultCom = await this.comObj.Find(FindType, varCriteria);
        } else {
            resultCom = await this.comObj.Find(FindType, varCriteria, bFindValidOnly);
        }

        return wrapCertificates(resultCom);
    }
}

export function wrapCertificates(comObj: CAdES.Sync.ICertificates): Certificates<CAdES.Sync.ICertificates>;
export function wrapCertificates(comObj: CAdES.Async.ICertificates): Certificates<CAdES.Async.ICertificates>;
export function wrapCertificates(comObj: CAdES.ICertificates): Certificates<CAdES.ICertificates> {
    return CAdES.isSync(comObj)
        ? new CertificatesSync(comObj as CAdES.Sync.ICertificates)
        : new CertificatesAsync(comObj as CAdES.Async.ICertificates);
}
