import { cadesplugin } from './cadesplugin';
import { CertificateData } from '../../models/CertificateData';

export async function getCertificatesAsync(): Promise<CertificateData[]> {
    await cadesplugin;
    let store = await cadesplugin.CreateObjectAsync('CAdESCOM.Store');
    await store.Open();
    let certificates = await store.Certificates;
    certificates = await certificates.Find(
        cadesplugin.CAPICOM_CERTIFICATE_FIND_KEY_USAGE,
        cadesplugin.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE
    );
    certificates = await certificates.Find(
        cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID
    );

    let certificatesCount = await certificates.Count;

    let certificatesList: CertificateData[] = [];

    for (let index = 0; index < certificatesCount; index++) {
        let certificate = await certificates.Item(index + 1);

        let commonName = await certificate.SubjectName;
        commonName = commonName.substr(commonName.indexOf('CN') + 3);
        commonName = commonName.substr(0, commonName.indexOf(','));

        let certificateData = new CertificateData(
            await certificate.Thumbprint,
            await certificate.SerialNumber,
            commonName
        );

        certificatesList.push(certificateData);
    }

    await store.Close();

    return certificatesList;
}
