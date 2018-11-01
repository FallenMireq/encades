import { cadesplugin } from './cadesplugin';

import { Base64 } from '../../util/Base64';

import { CertificateData } from '../../models/CertificateData';
import { SignParams } from '../../models/SignParams';
import { Challenge } from '../../models/Challenge';
import { SignedChallenge } from '../../models/SignedChallenge';

export async function signChallengeAsync(
    certificateData: CertificateData,
    signParams: SignParams,
    challenge: Challenge
): Promise<SignedChallenge> {
    await cadesplugin;
    let store = await cadesplugin.CreateObjectAsync('CAdESCOM.Store');
    await store.Open();

    let certificates = await store.Certificates;
    certificates = await certificates.Find(
        cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH,
        certificateData.thumbprint
    );

    let certificate = await certificates.Item(1);

    let data = challenge.data;

    if (signParams.encodeToBase64) {
        data = Base64.encode(data);
    }

    let signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
    await signer.propset_Certificate(certificate);

    switch (signParams.certificateIncludeOption) {
        case 0:
            await signer.propset_Options(
                cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT
            );
            break;
        case 1:
            await signer.propset_Options(
                cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN
            );
            break;
        case 2:
            await signer.propset_Options(
                cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY
            );
            break;
    }

    if (signParams.getCadesDateTime()) {
        let dateTimeAttribute = await cadesplugin.CreateObjectAsync(
            'CAdESCOM.CPAttribute'
        );
        await dateTimeAttribute.propset_Name(
            cadesplugin.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME
        );
        await dateTimeAttribute.propset_Value(signParams.getCadesDateTime());

        let attributes = await signer.AuthenticatedAttributes2;
        await attributes.Add(dateTimeAttribute);
    }

    let signedData = await cadesplugin.CreateObjectAsync(
        'CAdESCOM.CadesSignedData'
    );
    await signedData.propset_ContentEncoding(signParams.contentEncoding);
    await signedData.propset_Content(data);

    let signature = await signedData.SignCades(
        signer,
        cadesplugin.CADESCOM_CADES_BES,
        signParams.detached,
        signParams.encodingType
    );

    await store.Close();

    return new SignedChallenge(challenge.data, signature);
}
