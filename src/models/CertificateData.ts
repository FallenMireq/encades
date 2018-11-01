export interface ICertificateDataData {
    thumbprint: string;
    serialNumber: string;
    commonName: string;
}

export class CertificateData {
    constructor(
        public thumbprint: string,
        public serialNumber: string,
        public commonName: string
    ) {}

    public static fromObject(data: ICertificateDataData): CertificateData {
        return new CertificateData(
            data.thumbprint,
            data.serialNumber,
            data.commonName
        );
    }
}
