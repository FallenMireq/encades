import * as CAdES from 'cadesplugin-types';

export abstract class CPCertificate {}

export class CPCertificateSync extends CPCertificate {
    public constructor(protected comObj: CAdES.Sync.ICPCertificate) {
        super();
    }
}

export class CPCertificateAsync extends CPCertificate {
    public constructor(protected comObj: CAdES.Async.ICPCertificate) {
        super();
    }
}

export function createCPCertificate(
    comObj: CAdES.Sync.ICPCertificate | CAdES.Async.ICPCertificate
): CPCertificate {
    return CAdES.isSync(comObj)
        ? new CPCertificateSync(comObj as CAdES.Sync.ICPCertificate)
        : new CPCertificateAsync(comObj as CAdES.Async.ICPCertificate);
}
