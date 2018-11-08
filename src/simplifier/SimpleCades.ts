import * as CAdES from 'cadesplugin-types';
import { createStore, Certificate, createSigner, createSignedData, createAttribute } from '../cryptopro/adapters/@';
import { Base64 } from '../util/Base64';

import { CertificateInfo } from './CertificateInfo';
import { SimpleAttribute } from './SimpleAttribute';

export interface IFilterCriteria {
    type: CAdES.CAPICOM_CERTIFICATE_FIND_TYPE;
    criteria?: any;
    validOnly?: boolean;
}

export interface ISignCadesOptions {
    include: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION;
    cadesType: CAdES.CADESCOM_CADES_TYPE;
    detached: boolean;
}

export class SignCadesOptions implements ISignCadesOptions {
    public include: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION;
    public cadesType: CAdES.CADESCOM_CADES_TYPE;
    public detached: boolean;

    constructor(options?: Partial<ISignCadesOptions>) {
        options = options || {};
        let defaults = {
            include: CAdES.CAPICOM_CERTIFICATE_INCLUDE_OPTION.CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT,
            cadesType: CAdES.CADESCOM_CADES_TYPE.CADESCOM_CADES_X_LONG_TYPE_1,
            detached: false,
        };

        this.include = options.include !== undefined ? options.include : defaults.include;
        this.cadesType = options.cadesType !== undefined ? options.cadesType : defaults.cadesType;
        this.detached = options.detached !== undefined ? options.detached : defaults.detached;
    }

    public toObject(overrides?: Partial<ISignCadesOptions>): ISignCadesOptions {
        overrides = overrides || {};
        return {
            include: overrides.include !== undefined ? overrides.include : this.include,
            cadesType: overrides.cadesType !== undefined ? overrides.cadesType : this.cadesType,
            detached: overrides.detached !== undefined ? overrides.detached : this.detached,
        };
    }
}

export class SimpleCades {
    public readonly StoreLocation: CAdES.CADESCOM_STORE_LOCATION;
    public readonly StoreName: CAdES.CAPICOM_STORE_NAMES | string;
    public readonly SignCadesOptions: SignCadesOptions;

    public constructor(
        storeLocation: CAdES.CADESCOM_STORE_LOCATION = CAdES.CADESCOM_STORE_LOCATION.CAPICOM_CURRENT_USER_STORE,
        storeName: CAdES.CAPICOM_STORE_NAMES | string = CAdES.CAPICOM_STORE_NAMES.CAPICOM_MY_STORE,
        signCadesOptions?: ISignCadesOptions
    ) {
        this.StoreLocation = storeLocation;
        this.StoreName = storeName;
        this.SignCadesOptions = new SignCadesOptions(signCadesOptions);
    }

    public async getCertificates(filters: IFilterCriteria[]): Promise<CertificateInfo[]> {
        let store = await createStore();
        await store.Open(this.StoreLocation, this.StoreName);

        let certificates = await store.Certificates();
        for (let i = 0; i < filters.length; i++) {
            let filter = filters[i];
            if (filter.criteria === undefined) {
                certificates = await certificates.Find(filter.type);
            } else if (filter.validOnly === undefined) {
                certificates = await certificates.Find(filter.type, filter.criteria);
            } else {
                certificates = await certificates.Find(filter.type, filter.criteria, filter.validOnly);
            }
        }

        let certificatesCount = await certificates.Count();

        let certificatesListAwaiters: Promise<Certificate>[] = [];

        for (let index = 0; index < certificatesCount; index++) {
            certificatesListAwaiters.push(certificates.Item(index + 1));
        }

        let certificatesList = await Promise.all(certificatesListAwaiters.map(CertificateInfo.fromCertificate));

        await store.Close();

        return certificatesList;
    }

    public async signCades(text: string, certificateInfo: CertificateInfo, attributes: SimpleAttribute[] = [], options?: Partial<ISignCadesOptions>): Promise<string> {
        let base64 = Base64.encode(text);
        return this.signCades64(base64, certificateInfo, attributes, options);
    }

    public async signCades64(data: string, certificateInfo: CertificateInfo, attributes: SimpleAttribute[] = [], options?: Partial<ISignCadesOptions>): Promise<string> {

        let trustedOptions = this.SignCadesOptions.toObject(options);

        let store = await createStore();
        await store.Open(this.StoreLocation, this.StoreName);

        let certificates = await store.Certificates();
        certificates.Find(
            CAdES.CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_SHA1_HASH,
            certificateInfo.Thumbprint
        );

        let certificate = null;
        let count = await certificates.Count();
        for (let i = 1; i <= count; i++) {
            let cert = await certificates.Item(i);
            if ((await cert.SerialNumber()) !== certificateInfo.SerialNumber) {
                continue;
            }
            if (certificate !== null) {
                throw new Error('Collision');
            }
            certificate = cert;
        }

        if (certificate === null)
            throw new Error('Certificate not found');

        let signer = await createSigner();
        await signer.SetCertificate(certificate);
        await signer.SetOptions(trustedOptions.include);

        if (attributes.length > 0) {
            let cadesAttributes = await signer.AuthenticatedAttributes2();
            for (let i = 0; i < attributes.length; i++) {
                let attr = await createAttribute();
                await attr.SetName(attributes[i].Name);
                await attr.SetValue(attributes[i].Value);
                await cadesAttributes.Add(attr);
            }
        }

        let signedData = await createSignedData();
        await signedData.SetContentEncoding(CAdES.CADESCOM_CONTENT_ENCODING_TYPE.CADESCOM_BASE64_TO_BINARY);
        await signedData.SetContent(data);

        let signature = await signedData.SignCades(
            signer,
            trustedOptions.cadesType,
            trustedOptions.detached,
            CAdES.CAPICOM_ENCODING_TYPE.CAPICOM_ENCODE_BASE64
        );

        await store.Close();

        return signature;
    }
}
