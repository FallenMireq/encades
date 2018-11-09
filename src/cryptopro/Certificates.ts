import * as CAdES from 'cadesplugin-types';

import { SuperAdapter } from './SuperAdapter';
import { CertificatesAdapter } from './adapters/@';
import { Certificate } from './Certificate';

export class Certificates extends SuperAdapter<CertificatesAdapter> {
    public Count(): Promise<number> {
        return this.adapter.Count();
    }

    public Item(Index: number): Promise<Certificate> {
        return this.adapter.Item(Index).then(x => new Certificate(x));
    }

    public Find(FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE): Promise<Certificates>;
    public Find(FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE, varCriteria: any): Promise<Certificates>;
    public Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria: any,
        bFindValidOnly: boolean
    ): Promise<Certificates>;
    public Find(
        FindType: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE,
        varCriteria?: any,
        bFindValidOnly?: boolean
    ): Promise<Certificates> {
        let promise: Promise<CertificatesAdapter>;

        if (varCriteria === undefined) {
            promise = this.adapter.Find(FindType);
        } else if (bFindValidOnly === undefined) {
            promise = this.adapter.Find(FindType, varCriteria);
        } else {
            promise = this.adapter.Find(FindType, varCriteria, bFindValidOnly);
        }

        return promise.then(x => new Certificates(x));
    }
}
