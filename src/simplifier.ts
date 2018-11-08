import * as CAdES from 'cadesplugin-types';
import * as Simple from './simplifier/@';

async function run() {
    // configuration

    let simpleCades = new Simple.SimpleCades();

    simpleCades.SignCadesOptions.include =
        CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN;
    simpleCades.SignCadesOptions.cadesType = CAdES.CADESCOM_CADES_TYPE.CADESCOM_CADES_BES;
    simpleCades.SignCadesOptions.detached = true;

    // Getting certificate list

    let certificates = await simpleCades.getCertificates([{
        type: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_KEY_USAGE,
        criteria: CAdES.CAPICOM_KEY_USAGE.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE,
    }, {
        type: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_TIME_VALID,
    }]);

    if (certificates.length === 0) {
        console.log('Found %d sertificate(s).', certificates.length);
        return;
    }

    let certificate = certificates[0];
    console.log(certificate);

    // Signing

    let date = new Date(2017, 7, 7, 2, 15, 0, 0);

    let signature = await simpleCades.signCades('Hello, world!', certificate, [
        new Simple.SimpleSigningTimeAttribute(date),
    ]);

    console.log(signature);
}

run();
