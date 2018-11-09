import * as CAdES from 'cadesplugin-types';
import { Certificate } from '../cryptopro/@';

export class CertificateInfo {
    public readonly Thumbprint: string;
    public readonly SerialNumber: string;
    public readonly CN: string;
    public readonly ValidFromDate: string;
    public readonly ValidToDate: string;

    constructor(thumbprint: string, serialNumber: string, cn: string, validFromDate: string, validToDate: string) {
        this.Thumbprint = thumbprint;
        this.SerialNumber = serialNumber;
        this.CN = cn;
        this.ValidFromDate = validFromDate;
        this.ValidToDate = validToDate;
    }

    public static async fromCertificate(certificate: Certificate | Promise<Certificate>): Promise<CertificateInfo> {
        certificate = await certificate;
        let [thumbprint, serialNumber, cn, validFromDate, validToDate] = await Promise.all([
            certificate.Thumbprint(),
            certificate.SerialNumber(),
            certificate.GetInfo(CAdES.CAPICOM_CERT_INFO_TYPE.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME),
            certificate.ValidFromDate(),
            certificate.ValidToDate(),
        ]);

        return new CertificateInfo(thumbprint, serialNumber, cn, validFromDate, validToDate);
    }
}
