import * as CAdES from 'cadesplugin-types';
import { CPCertificate, createCPCertificate } from './Certificate';

export abstract class CPCertificates {
    public abstract async Count(): Promise<number>;

    public abstract async Item(Index: number): Promise<CPCertificate>;

    public abstract async Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE
    ): Promise<CPCertificates>;
    public abstract async Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria: any
    ): Promise<CPCertificates>;
    public abstract async Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria: any,
        bFindValidOnly: boolean
    ): Promise<CPCertificates>;
}

export class CPCertificatesSync extends CPCertificates {
    public constructor(protected comObj: CAdES.Sync.ICertificates) {
        super();
    }

    public async Count(): Promise<number> {
        return this.comObj.Count;
    }

    public async Item(Index: number): Promise<CPCertificate> {
        return createCPCertificate(await this.comObj.Item(Index) as CAdES.Sync.ICPCertificate);
    }

    public async Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria?: any,
        bFindValidOnly?: boolean
    ): Promise<CPCertificates> {
        let resultCom: CAdES.Sync.ICertificates;

        if (varCriteria === undefined) {
            resultCom = this.comObj.Find(FindType);
        } else if (bFindValidOnly === undefined) {
            resultCom = this.comObj.Find(FindType, varCriteria);
        } else {
            resultCom = this.comObj.Find(FindType, varCriteria, bFindValidOnly);
        }

        return createCPCertificates(resultCom);
    }
}

export class CPCertificatesAsync extends CPCertificates {
    public constructor(protected comObj: CAdES.Async.ICertificates) {
        super();
    }

    public async Count(): Promise<number> {
        return await this.comObj.Count;
    }

    public async Item(Index: number): Promise<CPCertificate> {
        return createCPCertificate(await this.comObj.Item(Index) as CAdES.Async.ICPCertificate);
    }

    public async Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria?: any,
        bFindValidOnly?: boolean
    ): Promise<CPCertificates> {
        let resultCom: CAdES.Async.ICertificates;

        if (varCriteria === undefined) {
            resultCom = await this.comObj.Find(FindType);
        } else if (bFindValidOnly === undefined) {
            resultCom = await this.comObj.Find(FindType, varCriteria);
        } else {
            resultCom = await this.comObj.Find(FindType, varCriteria, bFindValidOnly);
        }

        return createCPCertificates(resultCom);
    }
}

export function createCPCertificates(
    comObj: CAdES.Sync.ICertificates | CAdES.Async.ICertificates
): CPCertificates {
    return CAdES.isSync(comObj)
        ? new CPCertificatesSync(comObj as CAdES.Sync.ICertificates)
        : new CPCertificatesAsync(comObj as CAdES.Async.ICertificates);
}
