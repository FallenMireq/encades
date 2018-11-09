import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';
import { CertificateAdapter, CertificateAdapterSync, CertificateAdapterAsync } from './CertificateAdapter';

export abstract class CertificatesAdapter<T = any> extends ComAdapter<T> {
    public abstract Count(): Promise<number>;

    public abstract Item(Index: number): Promise<CertificateAdapter>;

    public abstract Find(FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE): Promise<CertificatesAdapter<T>>;
    public abstract Find(FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE, varCriteria: any): Promise<CertificatesAdapter<T>>;
    public abstract Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria: any,
        bFindValidOnly: boolean
    ): Promise<CertificatesAdapter<T>>;
}

export class CertificatesAdapterSync extends CertificatesAdapter<CAdES.Sync.ICertificates> {
    public Count(): Promise<number> {
        return new Promise(resolve => resolve(this.comObj.Count));
    }

    public Item(Index: number): Promise<CertificateAdapterSync> {
        return new Promise(resolve =>
            resolve(new CertificateAdapterSync(this.comObj.Item(Index) as CAdES.Sync.ICPCertificate))
        );
    }

    public Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria?: any,
        bFindValidOnly?: boolean
    ): Promise<CertificatesAdapterSync> {
        return new Promise<CAdES.Sync.ICertificates>(resolve => {
            if (varCriteria === undefined) {
                resolve(this.comObj.Find(FindType));
            } else if (bFindValidOnly === undefined) {
                resolve(this.comObj.Find(FindType, varCriteria));
            } else {
                resolve(this.comObj.Find(FindType, varCriteria, bFindValidOnly));
            }
        }).then(x => new CertificatesAdapterSync(x));
    }
}

export class CertificatesAdapterAsync extends CertificatesAdapter<CAdES.Async.ICertificates> {
    public Count(): Promise<number> {
        return this.comObj.Count;
    }

    public Item(Index: number): Promise<CertificateAdapterAsync> {
        return this.comObj.Item(Index).then(x => new CertificateAdapterAsync(x as CAdES.Async.ICPCertificate));
    }

    public Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria?: any,
        bFindValidOnly?: boolean
    ): Promise<CertificatesAdapterAsync> {
        let promise: Promise<CAdES.Async.ICertificates>;

        if (varCriteria === undefined) {
            promise = this.comObj.Find(FindType);
        } else if (bFindValidOnly === undefined) {
            promise = this.comObj.Find(FindType, varCriteria);
        } else {
            promise = this.comObj.Find(FindType, varCriteria, bFindValidOnly);
        }

        return promise.then(x => new CertificatesAdapterAsync(x));
    }
}
