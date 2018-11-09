import * as CAdES from 'cadesplugin-types';

import { SuperAdapter } from './SuperAdapter';
import { SignedDataAdapter } from './adapters/@';
import { Certificates } from './Certificates';
import { Signers } from './Signers';
import { Signer } from './Signer';
import { HashedData } from './HashedData';

export class SignedData extends SuperAdapter<SignedDataAdapter> {
    public Certificates(): Promise<Certificates> {
        return this.adapter.Certificates().then(x => new Certificates(x));
    }

    public Content(): Promise<string> {
        return this.adapter.Content();
    }

    public SetContent(value: string): Promise<void> {
        return this.adapter.SetContent(value);
    }

    public Signers(): Promise<Signers> {
        return this.adapter.Signers().then(x => new Signers(x));
    }

    public ContentEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE> {
        return this.adapter.ContentEncoding();
    }

    public SetContentEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void> {
        return this.adapter.SetContentEncoding(value);
    }

    public DisplayData(): Promise<CAdES.CADESCOM_DISPLAY_DATA> {
        return this.adapter.DisplayData();
    }

    public SetDisplayData(value: CAdES.CADESCOM_DISPLAY_DATA): Promise<void> {
        return this.adapter.SetDisplayData(value);
    }

    public CoSign(): Promise<string>;
    public CoSign(Signer: Signer): Promise<string>;
    public CoSign(Signer: Signer, EncodingType: CAdES.CAPICOM_ENCODING_TYPE): Promise<string>;
    public CoSign(Signer?: Signer, EncodingType?: CAdES.CAPICOM_ENCODING_TYPE): Promise<string> {
        if (Signer === undefined) {
            return this.adapter.CoSign();
        } else if (EncodingType === undefined) {
            return this.adapter.CoSign(SuperAdapter.unwrap(Signer));
        } else {
            return this.adapter.CoSign(SuperAdapter.unwrap(Signer), EncodingType);
        }
    }

    public Sign(): Promise<string>;
    public Sign(Signer: Signer): Promise<string>;
    public Sign(Signer: Signer, bDetached: boolean): Promise<string>;
    public Sign(Signer: Signer, bDetached: boolean, EncodingType: CAdES.CAPICOM_ENCODING_TYPE): Promise<string>;
    public Sign(Signer?: Signer, bDetached?: boolean, EncodingType?: CAdES.CAPICOM_ENCODING_TYPE): Promise<string> {
        if (Signer === undefined) {
            return this.adapter.Sign();
        } else if (bDetached === undefined) {
            return this.adapter.Sign(SuperAdapter.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.adapter.Sign(SuperAdapter.unwrap(Signer), bDetached);
        } else {
            return this.adapter.Sign(SuperAdapter.unwrap(Signer), bDetached, EncodingType);
        }
    }

    public Verify(SignedMessage: string): Promise<string>;
    public Verify(SignedMessage: string, bDetached: boolean): Promise<string>;
    public Verify(
        SignedMessage: string,
        bDetached: boolean,
        VerifyFlag: CAdES.CAPICOM_SIGNED_DATA_VERIFY_FLAG
    ): Promise<string>;
    public Verify(
        SignedMessage: string,
        bDetached?: boolean,
        VerifyFlag?: CAdES.CAPICOM_SIGNED_DATA_VERIFY_FLAG
    ): Promise<string> {
        if (bDetached === undefined) {
            return this.adapter.Verify(SignedMessage);
        } else if (VerifyFlag === undefined) {
            return this.adapter.Verify(SignedMessage, bDetached);
        } else {
            return this.adapter.Verify(SignedMessage, bDetached, VerifyFlag);
        }
    }

    public CoSignCades(): Promise<string>;
    public CoSignCades(Signer: Signer): Promise<string>;
    public CoSignCades(Signer: Signer, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public CoSignCades(
        Signer: Signer,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;
    public CoSignCades(
        Signer?: Signer,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.adapter.CoSignCades();
        } else if (CadesType === undefined) {
            return this.adapter.CoSignCades(SuperAdapter.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.adapter.CoSignCades(SuperAdapter.unwrap(Signer), CadesType);
        } else {
            return this.adapter.CoSignCades(SuperAdapter.unwrap(Signer), CadesType, EncodingType);
        }
    }

    public EnhanceCades(): Promise<string>;
    public EnhanceCades(CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public EnhanceCades(CadesType: CAdES.CADESCOM_CADES_TYPE, TSAAddress: string): Promise<string>;
    public EnhanceCades(
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        TSAAddress: string,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;
    public EnhanceCades(
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        TSAAddress?: string,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (CadesType === undefined) {
            return this.adapter.EnhanceCades();
        } else if (TSAAddress === undefined) {
            return this.adapter.EnhanceCades(CadesType);
        } else if (EncodingType === undefined) {
            return this.adapter.EnhanceCades(CadesType, TSAAddress);
        } else {
            return this.adapter.EnhanceCades(CadesType, TSAAddress, EncodingType);
        }
    }

    public SignCades(): Promise<string>;
    public SignCades(Signer: Signer): Promise<string>;
    public SignCades(Signer: Signer, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public SignCades(Signer: Signer, CadesType: CAdES.CADESCOM_CADES_TYPE, bDetached: boolean): Promise<string>;
    public SignCades(
        Signer: Signer,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        bDetached: boolean,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;
    public SignCades(
        Signer?: Signer,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        bDetached?: boolean,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.adapter.SignCades();
        } else if (CadesType === undefined) {
            return this.adapter.SignCades(SuperAdapter.unwrap(Signer));
        } else if (bDetached === undefined) {
            return this.adapter.SignCades(SuperAdapter.unwrap(Signer), CadesType);
        } else if (EncodingType === undefined) {
            return this.adapter.SignCades(SuperAdapter.unwrap(Signer), CadesType, bDetached);
        } else {
            return this.adapter.SignCades(SuperAdapter.unwrap(Signer), CadesType, bDetached, EncodingType);
        }
    }

    public VerifyCades(SignedMessage: string): Promise<boolean>;
    public VerifyCades(SignedMessage: string, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<boolean>;
    public VerifyCades(SignedMessage: string, CadesType?: CAdES.CADESCOM_CADES_TYPE): Promise<boolean> {
        if (CadesType === undefined) {
            return this.adapter.VerifyCades(SignedMessage);
        } else {
            return this.adapter.VerifyCades(SignedMessage, CadesType);
        }
    }

    public CoSignHash(Hash: HashedData): Promise<string>;
    public CoSignHash(Hash: HashedData, Signer: Signer): Promise<string>;
    public CoSignHash(Hash: HashedData, Signer: Signer, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public CoSignHash(
        Hash: HashedData,
        Signer: Signer,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;
    public CoSignHash(
        Hash: HashedData,
        Signer?: Signer,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.adapter.CoSignHash(SuperAdapter.unwrap(Hash));
        } else if (CadesType === undefined) {
            return this.adapter.CoSignHash(SuperAdapter.unwrap(Hash), SuperAdapter.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.adapter.CoSignHash(SuperAdapter.unwrap(Hash), SuperAdapter.unwrap(Signer), CadesType);
        } else {
            return this.adapter.CoSignHash(
                SuperAdapter.unwrap(Hash),
                SuperAdapter.unwrap(Signer),
                CadesType,
                EncodingType
            );
        }
    }

    public SignHash(Hash: HashedData): Promise<string>;
    public SignHash(Hash: HashedData, Signer: Signer): Promise<string>;
    public SignHash(Hash: HashedData, Signer: Signer, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public SignHash(
        Hash: HashedData,
        Signer: Signer,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;
    public SignHash(
        Hash: HashedData,
        Signer?: Signer,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.adapter.SignHash(SuperAdapter.unwrap(Hash));
        } else if (CadesType === undefined) {
            return this.adapter.SignHash(SuperAdapter.unwrap(Hash), SuperAdapter.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.adapter.SignHash(SuperAdapter.unwrap(Hash), SuperAdapter.unwrap(Signer), CadesType);
        } else {
            return this.adapter.SignHash(
                SuperAdapter.unwrap(Hash),
                SuperAdapter.unwrap(Signer),
                CadesType,
                EncodingType
            );
        }
    }

    public VerifyHash(Hash: HashedData, SignedMessage: string): Promise<void>;
    public VerifyHash(Hash: HashedData, SignedMessage: string, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<void>;
    public VerifyHash(Hash: HashedData, SignedMessage: string, CadesType?: CAdES.CADESCOM_CADES_TYPE): Promise<void> {
        if (CadesType === undefined) {
            return this.adapter.VerifyHash(SuperAdapter.unwrap(Hash), SignedMessage);
        } else {
            return this.adapter.VerifyHash(SuperAdapter.unwrap(Hash), SignedMessage, CadesType);
        }
    }
}
