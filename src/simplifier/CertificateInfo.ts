import * as CAdES from 'cadesplugin-types';
import { Certificate } from '../cryptopro/adapters/@';

export class CertificateInfo {
    public readonly Thumbprint: string;
    public readonly SerialNumber: string;
    public readonly CN: string;

    constructor (thumbprint: string, serialNumber: string, cn: string) {
        this.Thumbprint = thumbprint;
        this.SerialNumber = serialNumber;
        this.CN = cn;
    }

    public static async fromCertificate(certificate: Certificate | Promise<Certificate>): Promise<CertificateInfo> {
        certificate = await certificate;
        let [thumbprint, serialNumber, cn] = await Promise.all([
            certificate.Thumbprint(),
            certificate.SerialNumber(),
            certificate.GetInfo(CAdES.CAPICOM_CERT_INFO_TYPE.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME),
        ]);

        return new CertificateInfo(thumbprint, serialNumber, cn);
    }
}
