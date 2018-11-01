import { cadesplugin } from './cadesplugin';

import { Base64 } from '../../util/Base64';

import { CertificateData } from '../../models/CertificateData';
import { SignParams } from '../../models/SignParams';
import { Challenge } from '../../models/Challenge';
import { SignedChallenge } from '../../models/SignedChallenge';

export function signChallenge(
    certificateData: CertificateData,
    signParams: SignParams,
    challenge: Challenge
): SignedChallenge {
    let store = cadesplugin.CreateObject('CAdESCOM.Store');
    store.Open();

    let certificates = store.Certificates;
    certificates = certificates.Find(
        cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH,
        certificateData.thumbprint
    );

    let certificate = certificates.Item(1);

    let data = challenge.data;

    if (signParams.encodeToBase64) {
        data = Base64.encode(data);
    }

    let signer = cadesplugin.CreateObject('CAdESCOM.CPSigner');
    signer.Certificate = certificate;

    switch (signParams.certificateIncludeOption) {
        case 0:
            signer.Options =
                cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT;
            break;
        case 1:
            signer.Options =
                cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN;
            break;
        case 2:
            signer.Options =
                cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY;
            break;
    }

    if (signParams.getCadesDateTime()) {
        let dateTimeAttribute = cadesplugin.CreateObject(
            'CAdESCOM.CPAttribute'
        );
        dateTimeAttribute.Name =
            cadesplugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME;
        dateTimeAttribute.Value = signParams.getCadesDateTime();

        let attributes = signer.AuthenticatedAttributes2;
        attributes.Add(dateTimeAttribute);
    }

    let signedData = cadesplugin.CreateObject('CAdESCOM.CadesSignedData');
    signedData.ContentEncoding = signParams.contentEncoding;
    signedData.Content = data;

    let signature = signedData.SignCades(
        signer,
        cadesplugin.CADESCOM_CADES_BES,
        signParams.detached,
        signParams.encodingType
    );

    store.Close();

    return new SignedChallenge(challenge.data, signature);
}
