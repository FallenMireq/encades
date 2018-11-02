import * as CAdES from 'cadesplugin-types';
import { createStore, CPCertificate } from './cryptopro/adapters/@';

async function work() {
    let store = await createStore();
    await store.Open(
        CAdES.CADESCOM_STORE_LOCATION.CAPICOM_CURRENT_USER_STORE,
        CAdES.CAPICOM_STORE_NAMES.CAPICOM_MY_STORE,
        CAdES.CAPICOM_STORE_OPEN_MODE.CAPICOM_STORE_OPEN_READ_ONLY
    );

    let certificates = await store.Certificates();
    certificates = await certificates.Find(
        CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_KEY_USAGE,
        CAdES.CAPICOM_KEY_USAGE.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE
    );
    certificates = await certificates.Find(
        CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_TIME_VALID
    );
    certificates = await certificates.Find(
        CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME,
        'TestName'
    );

    let certificatesCount = await certificates.Count();

    let certificatesListAwaiters: Array<
        Promise<{ Thumbprint: string; SerialNumber: string; CN: string }>
    > = [];

    for (let index = 0; index < certificatesCount; index++) {
        certificatesListAwaiters.push(
            readCertificate(certificates.Item(index + 1))
        );
    }

    let certificatesList = await Promise.all(certificatesListAwaiters);

    // actually, should we wait for store close?
    await store.Close();

    return certificatesList;
}

async function readCertificate(
    certificatePromise: Promise<CPCertificate>
): Promise<{ Thumbprint: string; SerialNumber: string; CN: string }> {
    let certificate = await certificatePromise;
    let [Thumbprint, SerialNumber, CN] = await Promise.all([
        certificate.Thumbprint(),
        certificate.SerialNumber(),
        certificate.GetInfo(
            CAdES.CAPICOM_CERT_INFO_TYPE.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME
        ),
    ]);
    return { Thumbprint, SerialNumber, CN };
}

let q: any = CAdES.cadesplugin;
q.set_log_level(q.LOG_LEVEL_DEBUG);

work().then(cs => cs.forEach(c => console.log(c)));
setTimeout(() => {
    console.log('newrequest');
    work().then(cs => cs.forEach(c => console.log(c)));
}, 2000);
