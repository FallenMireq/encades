import * as CAdES from 'cadesplugin-types';
import { createStore, Store, Certificate, createSigner, createSignedData } from './cryptopro/adapters/@';
import { Base64 } from './util/Base64';

async function findMyTestCertificate(store: Store) {
    let certificates = await store.Certificates();

    certificates = await certificates.Find(
        CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_KEY_USAGE,
        CAdES.CAPICOM_KEY_USAGE.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE
    );
    certificates = await certificates.Find(CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
    certificates = await certificates.Find(
        CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME,
        'TestName'
    );

    return await certificates.Item(1);
}

// CADESCOM_STORE_LOCATION
// CAPICOM_STORE_NAMES
// find filters
// extract data?

async function work() {
    let store = await createStore();
    await store.Open(
        CAdES.CADESCOM_STORE_LOCATION.CAPICOM_CURRENT_USER_STORE,
        CAdES.CAPICOM_STORE_NAMES.CAPICOM_MY_STORE
    );

    let certificates = await store.Certificates();
    // certificates = await certificates.Find(
    //     CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_KEY_USAGE,
    //     CAdES.CAPICOM_KEY_USAGE.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE
    // );
    // certificates = await certificates.Find(CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
    // certificates = await certificates.Find(
    //     CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME,
    //     'TestName'
    // );

    let certificatesCount = await certificates.Count();
    console.log(certificatesCount);

    let certificatesListAwaiters: Array<Promise<{ Thumbprint: string; SerialNumber: string; CN: string }>> = [];

    let w = performance.now();
    for (let index = 0; index < certificatesCount; index++) {
        // let q = await certificates.Item(index + 1);
        // if (await q.GetInfo(CAdES.CAPICOM_CERT_INFO_TYPE.CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME) === 'DO_NOT_TRUST_FiddlerRoot') {
        //     continue;
        // }
        // certificatesListAwaiters.push(Promise.resolve({
        //     Thumbprint: await q.Thumbprint(),
        //     SerialNumber: await q.SerialNumber(),
        //     CN: await q.GetInfo(CAdES.CAPICOM_CERT_INFO_TYPE.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME),
        //     qwe: await q.SubjectName(),
        //     rty: await q.GetInfo(CAdES.CAPICOM_CERT_INFO_TYPE.CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME),
        // }));
        // certificatesListAwaiters.push(readCertificate(Promise.resolve(q)));
        certificatesListAwaiters.push(readCertificate(certificates.Item(index + 1)));
    }
    console.log(performance.now() - w);

    let certificatesList = await Promise.all(certificatesListAwaiters);

    // actually, should we wait for store close?
    await store.Close();

    return certificatesList;
}

async function readCertificate(
    certificatePromise: Promise<Certificate>
): Promise<{ Thumbprint: string; SerialNumber: string; CN: string }> {
    let certificate = await certificatePromise;
    let [Thumbprint, SerialNumber, CN] = await Promise.all([
        certificate.Thumbprint(),
        certificate.SerialNumber(),
        certificate.GetInfo(CAdES.CAPICOM_CERT_INFO_TYPE.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME),
    ]);
    return { Thumbprint, SerialNumber, CN };
}

// let q: any = CAdES.cadesplugin;
// q.set_log_level(q.LOG_LEVEL_DEBUG);

work().then(cs => cs.forEach(c => console.log(c)));

// text
// certificate
// CAPICOM_CERTIFICATE_INCLUDE_OPTION
// Signer.AuthenticatedAttributes2
// CADESCOM_CADES_TYPE
// bDetached

async function sign(text: string): Promise<string> {
    let store = await createStore();
    await store.Open(
        CAdES.CADESCOM_STORE_LOCATION.CAPICOM_CURRENT_USER_STORE,
        CAdES.CAPICOM_STORE_NAMES.CAPICOM_MY_STORE,
        CAdES.CAPICOM_STORE_OPEN_MODE.CAPICOM_STORE_OPEN_READ_ONLY
    );

    let data = Base64.encode(text);
    let certificate = await findMyTestCertificate(store);

    let signer = await createSigner();
    signer.SetCertificate(certificate);

    let signedData = await createSignedData();
    await signedData.SetContentEncoding(CAdES.CADESCOM_CONTENT_ENCODING_TYPE.CADESCOM_BASE64_TO_BINARY);
    await signedData.SetContent(data);

    let signature = await signedData.SignCades(
        signer,
        CAdES.CADESCOM_CADES_TYPE.CADESCOM_CADES_BES,
        true,
        CAdES.CAPICOM_ENCODING_TYPE.CAPICOM_ENCODE_BASE64
    );

    await store.Close();

    return signature;
}

// sign('123').then(x => console.log(x));
