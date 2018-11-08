import * as CAdES from 'cadesplugin-types';
import * as Simple from './simplifier/@';

async function run() {
    let simpleCades = new Simple.SimpleCades();

    simpleCades.SignCadesOptions.include = CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN;
    simpleCades.SignCadesOptions.cadesType = CAdES.CADESCOM_CADES_TYPE.CADESCOM_CADES_BES;
    simpleCades.SignCadesOptions.detached = true;


    // Getting certificate list

    let certificates = await simpleCades.getCertificates([
        {
            type: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME,
            criteria: 'TestName',
        },
    ]);

    if (certificates.length !== 1) {
        console.log('Found %d sertificate(s).', certificates.length);
        return;
    }

    console.log(certificates[0]);

    // signing

    let date = new Date(2017, 7, 7, 2, 15, 0, 0);

    let signature = await simpleCades.signCades('Hello, world!', certificates[0], [
        new Simple.SimpleSigningTimeAttribute(date),
    ]);

    console.log(signature);
}

run();
