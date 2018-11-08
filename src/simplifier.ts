import * as CAdES from 'cadesplugin-types';
import * as Simple from './simplifier/@';

document.addEventListener('DOMContentLoaded', async () => {
    // configuration

    let simpleCades = new Simple.SimpleCades();

    simpleCades.SignCadesOptions.include =
        CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN;
    simpleCades.SignCadesOptions.cadesType = CAdES.CADESCOM_CADES_TYPE.CADESCOM_CADES_BES;
    simpleCades.SignCadesOptions.detached = false;
    simpleCades.SignCadesOptions.contentEncoding = CAdES.CADESCOM_CONTENT_ENCODING_TYPE.CADESCOM_BASE64_TO_BINARY;

    // Getting certificate list

    let certificates = await simpleCades.getCertificates([
        {
            type: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_KEY_USAGE,
            criteria: CAdES.CAPICOM_KEY_USAGE.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE,
        },
        {
            type: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_TIME_VALID,
        },
    ]);

    if (certificates.length === 0) {
        console.log('Found %d sertificate(s).', certificates.length);
        return;
    }

    // UI

    let locker = 0;
    let select: HTMLSelectElement = document.getElementById('certificates') as HTMLSelectElement;
    let text: HTMLTextAreaElement = document.getElementById('text') as HTMLTextAreaElement;
    let ucs2le: HTMLInputElement = document.getElementById('ucs2le') as HTMLInputElement;
    let result: HTMLTextAreaElement = document.getElementById('result') as HTMLTextAreaElement;
    let dosign: HTMLButtonElement = document.getElementById('dosign') as HTMLButtonElement;

    // select.addEventListener('input', sign);
    // text.addEventListener('input', sign);
    // ucs2le.addEventListener('input', sign);
    dosign.addEventListener('click', sign);

    while (select.childNodes.length > 0) {
        select.childNodes[0].remove();
    }

    let option = document.createElement('option');
    option.value = '';
    select.appendChild(option);

    certificates.forEach((certificate, i) => {
        let caption = document.createTextNode(`${certificate.CN} [${certificate.Thumbprint}]`);
        let option = document.createElement('option');
        option.value = `${i}`;
        option.appendChild(caption);
        select.appendChild(option);
    });

    let date = new Date(2018, 7, 7, 2, 15, 0, 0);

    async function sign() {
        let localLocker = ++locker;
        let certificateIndex = parseInt(select.value);
        let certificate = certificates[certificateIndex];
        let useUcs2le = ucs2le.checked;
        if (!certificate) {
            result.value = '';
            return;
        }
        let textToSign = text.value;
        let signature = await simpleCades.signCades(
            textToSign,
            certificate,
            [new Simple.SimpleSigningTimeAttribute(date)],
            {
                contentEncoding: useUcs2le
                    ? CAdES.CADESCOM_CONTENT_ENCODING_TYPE.CADESCOM_STRING_TO_UCS2LE
                    : CAdES.CADESCOM_CONTENT_ENCODING_TYPE.CADESCOM_BASE64_TO_BINARY,
            }
        );
        if (localLocker === locker) {
            result.value = signature;
        }
    }
});
