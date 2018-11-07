import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';
import { Certificates, wrapCertificates } from './Certificates';
import { Signers, wrapSigners } from './Signers';
import { Signer } from './Signer';
import { HashedData } from './HashedData';

export abstract class SignedData<T = CAdES.ICPSignedData5> extends ComWrapper<T> {
    public abstract async Certificates(): Promise<Certificates>;

    public abstract async Content(): Promise<string>;
    public abstract async SetContent(value: string): Promise<void>;

    public abstract async Signers(): Promise<Signers>;

    public abstract async ContentEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE>;
    public abstract async SetContentEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void>;

    public abstract async DisplayData(): Promise<CAdES.CADESCOM_DISPLAY_DATA>;
    public abstract async SetDisplayData(value: CAdES.CADESCOM_DISPLAY_DATA): Promise<void>;

    public abstract async CoSign(): Promise<string>;
    public abstract async CoSign(Signer: Signer<any>): Promise<string>;
    public abstract async CoSign(Signer: Signer<any>, EncodingType: CAdES.CAPICOM_ENCODING_TYPE): Promise<string>;

    public abstract async Sign(): Promise<string>;
    public abstract async Sign(Signer: Signer<any>): Promise<string>;
    public abstract async Sign(Signer: Signer<any>, bDetached: boolean): Promise<string>;
    public abstract async Sign(
        Signer: Signer<any>,
        bDetached: boolean,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract async Verify(SignedMessage: string): Promise<string>;
    public abstract async Verify(SignedMessage: string, bDetached: boolean): Promise<string>;
    public abstract async Verify(
        SignedMessage: string,
        bDetached: boolean,
        VerifyFlag: CAdES.CAPICOM_SIGNED_DATA_VERIFY_FLAG
    ): Promise<string>;

    public abstract async CoSignCades(): Promise<string>;
    public abstract async CoSignCades(Signer: Signer<any>): Promise<string>;
    public abstract async CoSignCades(Signer: Signer<any>, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public abstract async CoSignCades(
        Signer: Signer<any>,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract async EnhanceCades(): Promise<string>;
    public abstract async EnhanceCades(CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public abstract async EnhanceCades(CadesType: CAdES.CADESCOM_CADES_TYPE, TSAAddress: string): Promise<string>;
    public abstract async EnhanceCades(
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        TSAAddress: string,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract async SignCades(): Promise<string>;
    public abstract async SignCades(Signer: Signer<any>): Promise<string>;
    public abstract async SignCades(Signer: Signer<any>, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public abstract async SignCades(
        Signer: Signer<any>,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        bDetached: boolean
    ): Promise<string>;
    public abstract async SignCades(
        Signer: Signer<any>,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        bDetached: boolean,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract async VerifyCades(SignedMessage: string): Promise<boolean>;
    public abstract async VerifyCades(SignedMessage: string, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<boolean>;

    public abstract async CoSignHash(Hash: HashedData<any>): Promise<string>;
    public abstract async CoSignHash(Hash: HashedData<any>, Signer: Signer<any>): Promise<string>;
    public abstract async CoSignHash(
        Hash: HashedData<any>,
        Signer: Signer<any>,
        CadesType: CAdES.CADESCOM_CADES_TYPE
    ): Promise<string>;
    public abstract async CoSignHash(
        Hash: HashedData<any>,
        Signer: Signer<any>,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract async SignHash(Hash: HashedData<any>): Promise<string>;
    public abstract async SignHash(Hash: HashedData<any>, Signer: Signer<any>): Promise<string>;
    public abstract async SignHash(
        Hash: HashedData<any>,
        Signer: Signer<any>,
        CadesType: CAdES.CADESCOM_CADES_TYPE
    ): Promise<string>;
    public abstract async SignHash(
        Hash: HashedData<any>,
        Signer: Signer<any>,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract async VerifyHash(Hash: HashedData<any>, SignedMessage: string): Promise<void>;
    public abstract async VerifyHash(
        Hash: HashedData<any>,
        SignedMessage: string,
        CadesType: CAdES.CADESCOM_CADES_TYPE
    ): Promise<void>;
}

export class SignedDataSync extends SignedData<CAdES.Sync.ICPSignedData5> {
    public async Certificates(): Promise<Certificates> {
        return wrapCertificates(this.comObj.Certificates);
    }

    public async Content(): Promise<string> {
        return this.comObj.Content;
    }

    public async SetContent(value: string): Promise<void> {
        this.comObj.Content = value;
    }

    public async Signers(): Promise<Signers> {
        return wrapSigners(this.comObj.Signers);
    }

    public async ContentEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE> {
        return this.comObj.ContentEncoding;
    }

    public async SetContentEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void> {
        this.comObj.ContentEncoding = value;
    }

    public async DisplayData(): Promise<CAdES.CADESCOM_DISPLAY_DATA> {
        return this.comObj.DisplayData;
    }

    public async SetDisplayData(value: CAdES.CADESCOM_DISPLAY_DATA): Promise<void> {
        this.comObj.DisplayData = value;
    }

    public async CoSign(
        Signer?: Signer<CAdES.Sync.ICPSigner6>,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.CoSign();
        } else if (EncodingType === undefined) {
            return this.comObj.CoSign(ComWrapper.unwrap(Signer));
        } else {
            return this.comObj.CoSign(ComWrapper.unwrap(Signer), EncodingType);
        }
    }

    public async Sign(
        Signer?: Signer<CAdES.Sync.ICPSigner6>,
        bDetached?: boolean,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.Sign();
        } else if (bDetached === undefined) {
            return this.comObj.Sign(ComWrapper.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.comObj.Sign(ComWrapper.unwrap(Signer), bDetached);
        } else {
            return this.comObj.Sign(ComWrapper.unwrap(Signer), bDetached, EncodingType);
        }
    }

    public async Verify(
        SignedMessage: string,
        bDetached?: boolean,
        VerifyFlag?: CAdES.CAPICOM_SIGNED_DATA_VERIFY_FLAG
    ): Promise<string> {
        if (bDetached === undefined) {
            return this.comObj.Verify(SignedMessage);
        } else if (VerifyFlag === undefined) {
            return this.comObj.Verify(SignedMessage, bDetached);
        } else {
            return this.comObj.Verify(SignedMessage, bDetached, VerifyFlag);
        }
    }

    public async CoSignCades(
        Signer?: Signer<CAdES.Sync.ICPSigner6>,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.CoSignCades();
        } else if (CadesType === undefined) {
            return this.comObj.CoSignCades(ComWrapper.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.comObj.CoSignCades(ComWrapper.unwrap(Signer), CadesType);
        } else {
            return this.comObj.CoSignCades(ComWrapper.unwrap(Signer), CadesType, EncodingType);
        }
    }

    public async EnhanceCades(
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        TSAAddress?: string,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (CadesType === undefined) {
            return this.comObj.EnhanceCades();
        } else if (TSAAddress === undefined) {
            return this.comObj.EnhanceCades(CadesType);
        } else if (EncodingType === undefined) {
            return this.comObj.EnhanceCades(CadesType, TSAAddress);
        } else {
            return this.comObj.EnhanceCades(CadesType, TSAAddress, EncodingType);
        }
    }

    public async SignCades(
        Signer?: Signer<CAdES.Sync.ICPSigner6>,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        bDetached?: boolean,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.SignCades();
        } else if (CadesType === undefined) {
            return this.comObj.SignCades(ComWrapper.unwrap(Signer));
        } else if (bDetached === undefined) {
            return this.comObj.SignCades(ComWrapper.unwrap(Signer), CadesType);
        } else if (EncodingType === undefined) {
            return this.comObj.SignCades(ComWrapper.unwrap(Signer), CadesType, bDetached);
        } else {
            return this.comObj.SignCades(ComWrapper.unwrap(Signer), CadesType, bDetached, EncodingType);
        }
    }

    public async VerifyCades(SignedMessage: string, CadesType?: CAdES.CADESCOM_CADES_TYPE): Promise<boolean> {
        if (CadesType === undefined) {
            return this.comObj.VerifyCades(SignedMessage);
        } else {
            return this.comObj.VerifyCades(SignedMessage, CadesType);
        }
    }

    public async CoSignHash(
        Hash: HashedData<CAdES.Sync.ICPHashedData>,
        Signer?: Signer<CAdES.Sync.ICPSigner6>,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.CoSignHash(ComWrapper.unwrap(Hash));
        } else if (CadesType === undefined) {
            return this.comObj.CoSignHash(ComWrapper.unwrap(Hash), ComWrapper.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.comObj.CoSignHash(ComWrapper.unwrap(Hash), ComWrapper.unwrap(Signer), CadesType);
        } else {
            return this.comObj.CoSignHash(ComWrapper.unwrap(Hash), ComWrapper.unwrap(Signer), CadesType, EncodingType);
        }
    }

    public async SignHash(
        Hash: HashedData<CAdES.Sync.ICPHashedData>,
        Signer?: Signer<CAdES.Sync.ICPSigner6>,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.SignHash(ComWrapper.unwrap(Hash));
        } else if (CadesType === undefined) {
            return this.comObj.SignHash(ComWrapper.unwrap(Hash), ComWrapper.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.comObj.SignHash(ComWrapper.unwrap(Hash), ComWrapper.unwrap(Signer), CadesType);
        } else {
            return this.comObj.SignHash(ComWrapper.unwrap(Hash), ComWrapper.unwrap(Signer), CadesType, EncodingType);
        }
    }

    public async VerifyHash(
        Hash: HashedData<CAdES.Sync.ICPHashedData>,
        SignedMessage: string,
        CadesType?: CAdES.CADESCOM_CADES_TYPE
    ): Promise<void> {
        if (CadesType === undefined) {
            return this.comObj.VerifyHash(ComWrapper.unwrap(Hash), SignedMessage);
        } else {
            return this.comObj.VerifyHash(ComWrapper.unwrap(Hash), SignedMessage, CadesType);
        }
    }
}

export class SignedDataAsync extends SignedData<CAdES.Async.ICPSignedData5> {
    public async Certificates(): Promise<Certificates> {
        return wrapCertificates(await this.comObj.Certificates);
    }

    public async Content(): Promise<string> {
        return await this.comObj.Content;
    }

    public async SetContent(value: string): Promise<void> {
        await this.comObj.propset_Content(value);
    }

    public async Signers(): Promise<Signers> {
        return wrapSigners(await this.comObj.Signers);
    }

    public async ContentEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE> {
        return await this.comObj.ContentEncoding;
    }

    public async SetContentEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void> {
        await this.comObj.propset_ContentEncoding(value);
    }

    public async DisplayData(): Promise<CAdES.CADESCOM_DISPLAY_DATA> {
        return await this.comObj.DisplayData;
    }

    public async SetDisplayData(value: CAdES.CADESCOM_DISPLAY_DATA): Promise<void> {
        await this.comObj.propset_DisplayData(value);
    }

    public async CoSign(
        Signer?: Signer<CAdES.Async.ICPSigner6>,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return await this.comObj.CoSign();
        } else if (EncodingType === undefined) {
            return await this.comObj.CoSign(ComWrapper.unwrap(Signer));
        } else {
            return await this.comObj.CoSign(ComWrapper.unwrap(Signer), EncodingType);
        }
    }

    public async Sign(
        Signer?: Signer<CAdES.Async.ICPSigner6>,
        bDetached?: boolean,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return await this.comObj.Sign();
        } else if (bDetached === undefined) {
            return await this.comObj.Sign(ComWrapper.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return await this.comObj.Sign(ComWrapper.unwrap(Signer), bDetached);
        } else {
            return await this.comObj.Sign(ComWrapper.unwrap(Signer), bDetached, EncodingType);
        }
    }

    public async Verify(
        SignedMessage: string,
        bDetached?: boolean,
        VerifyFlag?: CAdES.CAPICOM_SIGNED_DATA_VERIFY_FLAG
    ): Promise<string> {
        if (bDetached === undefined) {
            return await this.comObj.Verify(SignedMessage);
        } else if (VerifyFlag === undefined) {
            return await this.comObj.Verify(SignedMessage, bDetached);
        } else {
            return await this.comObj.Verify(SignedMessage, bDetached, VerifyFlag);
        }
    }

    public async CoSignCades(
        Signer?: Signer<CAdES.Async.ICPSigner6>,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return await this.comObj.CoSignCades();
        } else if (CadesType === undefined) {
            return await this.comObj.CoSignCades(ComWrapper.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return await this.comObj.CoSignCades(ComWrapper.unwrap(Signer), CadesType);
        } else {
            return await this.comObj.CoSignCades(ComWrapper.unwrap(Signer), CadesType, EncodingType);
        }
    }

    public async EnhanceCades(
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        TSAAddress?: string,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (CadesType === undefined) {
            return this.comObj.EnhanceCades();
        } else if (TSAAddress === undefined) {
            return this.comObj.EnhanceCades(CadesType);
        } else if (EncodingType === undefined) {
            return this.comObj.EnhanceCades(CadesType, TSAAddress);
        } else {
            return this.comObj.EnhanceCades(CadesType, TSAAddress, EncodingType);
        }
    }

    public async SignCades(
        Signer?: Signer<CAdES.Async.ICPSigner6>,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        bDetached?: boolean,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return await this.comObj.SignCades();
        } else if (CadesType === undefined) {
            return await this.comObj.SignCades(ComWrapper.unwrap(Signer));
        } else if (bDetached === undefined) {
            return await this.comObj.SignCades(ComWrapper.unwrap(Signer), CadesType);
        } else if (EncodingType === undefined) {
            return await this.comObj.SignCades(ComWrapper.unwrap(Signer), CadesType, bDetached);
        } else {
            return await this.comObj.SignCades(ComWrapper.unwrap(Signer), CadesType, bDetached, EncodingType);
        }
    }

    public async VerifyCades(SignedMessage: string, CadesType?: CAdES.CADESCOM_CADES_TYPE): Promise<boolean> {
        if (CadesType === undefined) {
            return await this.comObj.VerifyCades(SignedMessage);
        } else {
            return await this.comObj.VerifyCades(SignedMessage, CadesType);
        }
    }

    public async CoSignHash(
        Hash: HashedData<CAdES.Async.ICPHashedData>,
        Signer?: Signer<CAdES.Async.ICPSigner6>,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return await this.comObj.CoSignHash(ComWrapper.unwrap(Hash));
        } else if (CadesType === undefined) {
            return await this.comObj.CoSignHash(ComWrapper.unwrap(Hash), ComWrapper.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return await this.comObj.CoSignHash(ComWrapper.unwrap(Hash), ComWrapper.unwrap(Signer), CadesType);
        } else {
            return await this.comObj.CoSignHash(
                ComWrapper.unwrap(Hash),
                ComWrapper.unwrap(Signer),
                CadesType,
                EncodingType
            );
        }
    }

    public async SignHash(
        Hash: HashedData<CAdES.Async.ICPHashedData>,
        Signer?: Signer<CAdES.Async.ICPSigner6>,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return await this.comObj.SignHash(ComWrapper.unwrap(Hash));
        } else if (CadesType === undefined) {
            return await this.comObj.SignHash(ComWrapper.unwrap(Hash), ComWrapper.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return await this.comObj.SignHash(ComWrapper.unwrap(Hash), ComWrapper.unwrap(Signer), CadesType);
        } else {
            return await this.comObj.SignHash(
                ComWrapper.unwrap(Hash),
                ComWrapper.unwrap(Signer),
                CadesType,
                EncodingType
            );
        }
    }

    public async VerifyHash(
        Hash: HashedData<CAdES.Async.ICPHashedData>,
        SignedMessage: string,
        CadesType?: CAdES.CADESCOM_CADES_TYPE
    ): Promise<void> {
        if (CadesType === undefined) {
            return await this.comObj.VerifyHash(ComWrapper.unwrap(Hash), SignedMessage);
        } else {
            return await this.comObj.VerifyHash(ComWrapper.unwrap(Hash), SignedMessage, CadesType);
        }
    }
}

export function wrapSignedData(comObj: CAdES.Sync.ICPSignedData5): SignedData<CAdES.Sync.ICPSignedData5>;
export function wrapSignedData(comObj: CAdES.Async.ICPSignedData5): SignedData<CAdES.Async.ICPSignedData5>;
export function wrapSignedData(comObj: CAdES.ICPSignedData5): SignedData<CAdES.ICPSignedData5> {
    if (CAdES.isSync<CAdES.Sync.ICPSignedData5, CAdES.Async.ICPSignedData5>(comObj)) {
        return new SignedDataSync(comObj) as any;
    } else {
        return new SignedDataAsync(comObj) as any;
    }
}

export async function createSignedData(): Promise<SignedData> {
    if (CAdES.isSync<CAdES.Sync.IWebClassFactory, CAdES.Async.IWebClassFactory>(CAdES.cadesplugin)) {
        let comObj = CAdES.cadesplugin.CreateObject(CAdES.ProgIds.CadesSignedData);
        return wrapSignedData(comObj);
    } else {
        await CAdES.cadesplugin;
        let comObj = await CAdES.cadesplugin.CreateObjectAsync(CAdES.ProgIds.CadesSignedData);
        return wrapSignedData(comObj);
    }
}
