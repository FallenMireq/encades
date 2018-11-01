import { cadesplugin } from './cadesplugin';
import { CertificateData } from '../../models/CertificateData';

export function getCertificates(): CertificateData[] {
    let store = cadesplugin.CreateObject('CAdESCOM.Store');
    store.Open();

    let certificates = store.Certificates;
    certificates = certificates.Find(
        cadesplugin.CAPICOM_CERTIFICATE_FIND_KEY_USAGE,
        cadesplugin.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE
    );
    certificates = certificates.Find(
        cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID
    );

    let certificatesCount = certificates.Count;
    let certificatesList: CertificateData[] = [];

    for (let index = 0; index < certificatesCount; index++) {
        let certificate = certificates.Item(index + 1);

        let commonName = certificate.SubjectName;
        commonName = commonName.substr(commonName.indexOf('CN') + 3);
        commonName = commonName.substr(0, commonName.indexOf(','));

        let certificateData = new CertificateData(
            certificate.Thumbprint,
            certificate.SerialNumber,
            commonName
        );

        certificatesList.push(certificateData);
    }

    store.Close();

    return certificatesList;
}
