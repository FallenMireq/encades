import { isAsync } from './helpers/cadesplugin';
import { getCertificates } from './helpers/getCertificates';
import { getCertificatesAsync } from './helpers/getCertificatesAsync';
import { signChallenge } from './helpers/signChallenge';
import { signChallengeAsync } from './helpers/signChallengeAsync';

import { CertificateData } from '../models/CertificateData';
import { SignParams } from '../models/SignParams';
import { Challenge } from '../models/Challenge';
import { SignedChallenge } from '../models/SignedChallenge';

export class CryptoService {
    public getCertificates(): Promise<CertificateData[]> {
        return isAsync
            ? getCertificatesAsync()
            : Promise.resolve(getCertificates());
    }

    public signChallenge(
        certificateData: CertificateData,
        signParams: SignParams,
        challenge: Challenge
    ): Promise<SignedChallenge> {
        return isAsync
            ? signChallengeAsync(certificateData, signParams, challenge)
            : Promise.resolve(
                  signChallenge(certificateData, signParams, challenge)
              );
    }
}
