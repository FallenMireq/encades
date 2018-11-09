import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';
import { CertificatesAdapter, CertificatesAdapterSync, CertificatesAdapterAsync } from './CertificatesAdapter';
import { SignersAdapter, SignersAdapterSync, SignersAdapterAsync } from './SignersAdapter';
import { SignerAdapter, SignerAdapterSync, SignerAdapterAsync } from './SignerAdapter';
import { HashedDataAdapter, HashedDataAdapterSync, HashedDataAdapterAsync } from './HashedDataAdapter';

export abstract class SignedDataAdapter<T = any> extends ComAdapter<T> {
    public abstract Certificates(): Promise<CertificatesAdapter>;

    public abstract Content(): Promise<string>;
    public abstract SetContent(value: string): Promise<void>;

    public abstract Signers(): Promise<SignersAdapter>;

    public abstract ContentEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE>;
    public abstract SetContentEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void>;

    public abstract DisplayData(): Promise<CAdES.CADESCOM_DISPLAY_DATA>;
    public abstract SetDisplayData(value: CAdES.CADESCOM_DISPLAY_DATA): Promise<void>;

    public abstract CoSign(): Promise<string>;
    public abstract CoSign(Signer: SignerAdapter): Promise<string>;
    public abstract CoSign(Signer: SignerAdapter, EncodingType: CAdES.CAPICOM_ENCODING_TYPE): Promise<string>;

    public abstract Sign(): Promise<string>;
    public abstract Sign(Signer: SignerAdapter): Promise<string>;
    public abstract Sign(Signer: SignerAdapter, bDetached: boolean): Promise<string>;
    public abstract Sign(
        Signer: SignerAdapter,
        bDetached: boolean,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract Verify(SignedMessage: string): Promise<string>;
    public abstract Verify(SignedMessage: string, bDetached: boolean): Promise<string>;
    public abstract Verify(
        SignedMessage: string,
        bDetached: boolean,
        VerifyFlag: CAdES.CAPICOM_SIGNED_DATA_VERIFY_FLAG
    ): Promise<string>;

    public abstract CoSignCades(): Promise<string>;
    public abstract CoSignCades(Signer: SignerAdapter): Promise<string>;
    public abstract CoSignCades(Signer: SignerAdapter, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public abstract CoSignCades(
        Signer: SignerAdapter,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract EnhanceCades(): Promise<string>;
    public abstract EnhanceCades(CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public abstract EnhanceCades(CadesType: CAdES.CADESCOM_CADES_TYPE, TSAAddress: string): Promise<string>;
    public abstract EnhanceCades(
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        TSAAddress: string,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract SignCades(): Promise<string>;
    public abstract SignCades(Signer: SignerAdapter): Promise<string>;
    public abstract SignCades(Signer: SignerAdapter, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<string>;
    public abstract SignCades(
        Signer: SignerAdapter,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        bDetached: boolean
    ): Promise<string>;
    public abstract SignCades(
        Signer: SignerAdapter,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        bDetached: boolean,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract VerifyCades(SignedMessage: string): Promise<boolean>;
    public abstract VerifyCades(SignedMessage: string, CadesType: CAdES.CADESCOM_CADES_TYPE): Promise<boolean>;

    public abstract CoSignHash(Hash: HashedDataAdapter): Promise<string>;
    public abstract CoSignHash(Hash: HashedDataAdapter, Signer: SignerAdapter): Promise<string>;
    public abstract CoSignHash(
        Hash: HashedDataAdapter,
        Signer: SignerAdapter,
        CadesType: CAdES.CADESCOM_CADES_TYPE
    ): Promise<string>;
    public abstract CoSignHash(
        Hash: HashedDataAdapter,
        Signer: SignerAdapter,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract SignHash(Hash: HashedDataAdapter): Promise<string>;
    public abstract SignHash(Hash: HashedDataAdapter, Signer: SignerAdapter): Promise<string>;
    public abstract SignHash(
        Hash: HashedDataAdapter,
        Signer: SignerAdapter,
        CadesType: CAdES.CADESCOM_CADES_TYPE
    ): Promise<string>;
    public abstract SignHash(
        Hash: HashedDataAdapter,
        Signer: SignerAdapter,
        CadesType: CAdES.CADESCOM_CADES_TYPE,
        EncodingType: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string>;

    public abstract VerifyHash(Hash: HashedDataAdapter, SignedMessage: string): Promise<void>;
    public abstract VerifyHash(
        Hash: HashedDataAdapter,
        SignedMessage: string,
        CadesType: CAdES.CADESCOM_CADES_TYPE
    ): Promise<void>;
}

export class SignedDataAdapterSync extends SignedDataAdapter<CAdES.Sync.ICPSignedData5> {
    public Certificates(): Promise<CertificatesAdapterSync> {
        return new Promise(resolve => resolve(new CertificatesAdapterSync(this.comObj.Certificates)));
    }

    public Content(): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.Content));
    }

    public SetContent(value: string): Promise<void> {
        return new Promise(resolve => {
            this.comObj.Content = value;
            resolve();
        });
    }

    public Signers(): Promise<SignersAdapterSync> {
        return new Promise(resolve => resolve(new SignersAdapterSync(this.comObj.Signers)));
    }

    public ContentEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE> {
        return new Promise(resolve => resolve(this.comObj.ContentEncoding));
    }

    public SetContentEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void> {
        return new Promise(resolve => {
            this.comObj.ContentEncoding = value;
            resolve();
        });
    }

    public DisplayData(): Promise<CAdES.CADESCOM_DISPLAY_DATA> {
        return new Promise(resolve => resolve(this.comObj.DisplayData));
    }

    public SetDisplayData(value: CAdES.CADESCOM_DISPLAY_DATA): Promise<void> {
        return new Promise(resolve => {
            this.comObj.DisplayData = value;
            resolve();
        });
    }

    public CoSign(Signer?: SignerAdapterSync, EncodingType?: CAdES.CAPICOM_ENCODING_TYPE): Promise<string> {
        return new Promise(resolve => {
            if (Signer === undefined) {
                resolve(this.comObj.CoSign());
            } else if (EncodingType === undefined) {
                resolve(this.comObj.CoSign(ComAdapter.unwrap(Signer)));
            } else {
                resolve(this.comObj.CoSign(ComAdapter.unwrap(Signer), EncodingType));
            }
        });
    }

    public Sign(
        Signer?: SignerAdapterSync,
        bDetached?: boolean,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        return new Promise(resolve => {
            if (Signer === undefined) {
                resolve(this.comObj.Sign());
            } else if (bDetached === undefined) {
                resolve(this.comObj.Sign(ComAdapter.unwrap(Signer)));
            } else if (EncodingType === undefined) {
                resolve(this.comObj.Sign(ComAdapter.unwrap(Signer), bDetached));
            } else {
                resolve(this.comObj.Sign(ComAdapter.unwrap(Signer), bDetached, EncodingType));
            }
        });
    }

    public Verify(
        SignedMessage: string,
        bDetached?: boolean,
        VerifyFlag?: CAdES.CAPICOM_SIGNED_DATA_VERIFY_FLAG
    ): Promise<string> {
        return new Promise(resolve => {
            if (bDetached === undefined) {
                resolve(this.comObj.Verify(SignedMessage));
            } else if (VerifyFlag === undefined) {
                resolve(this.comObj.Verify(SignedMessage, bDetached));
            } else {
                resolve(this.comObj.Verify(SignedMessage, bDetached, VerifyFlag));
            }
        });
    }

    public CoSignCades(
        Signer?: SignerAdapterSync,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        return new Promise(resolve => {
            if (Signer === undefined) {
                resolve(this.comObj.CoSignCades());
            } else if (CadesType === undefined) {
                resolve(this.comObj.CoSignCades(ComAdapter.unwrap(Signer)));
            } else if (EncodingType === undefined) {
                resolve(this.comObj.CoSignCades(ComAdapter.unwrap(Signer), CadesType));
            } else {
                resolve(this.comObj.CoSignCades(ComAdapter.unwrap(Signer), CadesType, EncodingType));
            }
        });
    }

    public EnhanceCades(
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        TSAAddress?: string,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        return new Promise(resolve => {
            if (CadesType === undefined) {
                resolve(this.comObj.EnhanceCades());
            } else if (TSAAddress === undefined) {
                resolve(this.comObj.EnhanceCades(CadesType));
            } else if (EncodingType === undefined) {
                resolve(this.comObj.EnhanceCades(CadesType, TSAAddress));
            } else {
                resolve(this.comObj.EnhanceCades(CadesType, TSAAddress, EncodingType));
            }
        });
    }

    public SignCades(
        Signer?: SignerAdapterSync,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        bDetached?: boolean,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        return new Promise(resolve => {
            if (Signer === undefined) {
                resolve(this.comObj.SignCades());
            } else if (CadesType === undefined) {
                resolve(this.comObj.SignCades(ComAdapter.unwrap(Signer)));
            } else if (bDetached === undefined) {
                resolve(this.comObj.SignCades(ComAdapter.unwrap(Signer), CadesType));
            } else if (EncodingType === undefined) {
                resolve(this.comObj.SignCades(ComAdapter.unwrap(Signer), CadesType, bDetached));
            } else {
                resolve(this.comObj.SignCades(ComAdapter.unwrap(Signer), CadesType, bDetached, EncodingType));
            }
        });
    }

    public VerifyCades(SignedMessage: string, CadesType?: CAdES.CADESCOM_CADES_TYPE): Promise<boolean> {
        return new Promise(resolve => {
            if (CadesType === undefined) {
                resolve(this.comObj.VerifyCades(SignedMessage));
            } else {
                resolve(this.comObj.VerifyCades(SignedMessage, CadesType));
            }
        });
    }

    public CoSignHash(
        Hash: HashedDataAdapterSync,
        Signer?: SignerAdapterSync,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        return new Promise(resolve => {
            if (Signer === undefined) {
                resolve(this.comObj.CoSignHash(ComAdapter.unwrap(Hash)));
            } else if (CadesType === undefined) {
                resolve(this.comObj.CoSignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer)));
            } else if (EncodingType === undefined) {
                resolve(this.comObj.CoSignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer), CadesType));
            } else {
                resolve(
                    this.comObj.CoSignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer), CadesType, EncodingType)
                );
            }
        });
    }

    public SignHash(
        Hash: HashedDataAdapterSync,
        Signer?: SignerAdapterSync,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        return new Promise(resolve => {
            if (Signer === undefined) {
                resolve(this.comObj.SignHash(ComAdapter.unwrap(Hash)));
            } else if (CadesType === undefined) {
                resolve(this.comObj.SignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer)));
            } else if (EncodingType === undefined) {
                resolve(this.comObj.SignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer), CadesType));
            } else {
                resolve(
                    this.comObj.SignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer), CadesType, EncodingType)
                );
            }
        });
    }

    public VerifyHash(
        Hash: HashedDataAdapterSync,
        SignedMessage: string,
        CadesType?: CAdES.CADESCOM_CADES_TYPE
    ): Promise<void> {
        return new Promise(resolve => {
            if (CadesType === undefined) {
                resolve(this.comObj.VerifyHash(ComAdapter.unwrap(Hash), SignedMessage));
            } else {
                resolve(this.comObj.VerifyHash(ComAdapter.unwrap(Hash), SignedMessage, CadesType));
            }
        });
    }
}

export class SignedDataAdapterAsync extends SignedDataAdapter<CAdES.Async.ICPSignedData5> {
    public Certificates(): Promise<CertificatesAdapterAsync> {
        return this.comObj.Certificates.then(x => new CertificatesAdapterAsync(x));
    }

    public Content(): Promise<string> {
        return this.comObj.Content;
    }

    public SetContent(value: string): Promise<void> {
        return this.comObj.propset_Content(value);
    }

    public Signers(): Promise<SignersAdapterAsync> {
        return this.comObj.Signers.then(x => new SignersAdapterAsync(x));
    }

    public ContentEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE> {
        return this.comObj.ContentEncoding;
    }

    public SetContentEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void> {
        return this.comObj.propset_ContentEncoding(value);
    }

    public DisplayData(): Promise<CAdES.CADESCOM_DISPLAY_DATA> {
        return this.comObj.DisplayData;
    }

    public SetDisplayData(value: CAdES.CADESCOM_DISPLAY_DATA): Promise<void> {
        return this.comObj.propset_DisplayData(value);
    }

    public CoSign(Signer?: SignerAdapterAsync, EncodingType?: CAdES.CAPICOM_ENCODING_TYPE): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.CoSign();
        } else if (EncodingType === undefined) {
            return this.comObj.CoSign(ComAdapter.unwrap(Signer));
        } else {
            return this.comObj.CoSign(ComAdapter.unwrap(Signer), EncodingType);
        }
    }

    public Sign(
        Signer?: SignerAdapterAsync,
        bDetached?: boolean,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.Sign();
        } else if (bDetached === undefined) {
            return this.comObj.Sign(ComAdapter.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.comObj.Sign(ComAdapter.unwrap(Signer), bDetached);
        } else {
            return this.comObj.Sign(ComAdapter.unwrap(Signer), bDetached, EncodingType);
        }
    }

    public Verify(
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

    public CoSignCades(
        Signer?: SignerAdapterAsync,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.CoSignCades();
        } else if (CadesType === undefined) {
            return this.comObj.CoSignCades(ComAdapter.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.comObj.CoSignCades(ComAdapter.unwrap(Signer), CadesType);
        } else {
            return this.comObj.CoSignCades(ComAdapter.unwrap(Signer), CadesType, EncodingType);
        }
    }

    public EnhanceCades(
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

    public SignCades(
        Signer?: SignerAdapterAsync,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        bDetached?: boolean,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.SignCades();
        } else if (CadesType === undefined) {
            return this.comObj.SignCades(ComAdapter.unwrap(Signer));
        } else if (bDetached === undefined) {
            return this.comObj.SignCades(ComAdapter.unwrap(Signer), CadesType);
        } else if (EncodingType === undefined) {
            return this.comObj.SignCades(ComAdapter.unwrap(Signer), CadesType, bDetached);
        } else {
            return this.comObj.SignCades(ComAdapter.unwrap(Signer), CadesType, bDetached, EncodingType);
        }
    }

    public VerifyCades(SignedMessage: string, CadesType?: CAdES.CADESCOM_CADES_TYPE): Promise<boolean> {
        if (CadesType === undefined) {
            return this.comObj.VerifyCades(SignedMessage);
        } else {
            return this.comObj.VerifyCades(SignedMessage, CadesType);
        }
    }

    public CoSignHash(
        Hash: HashedDataAdapterAsync,
        Signer?: SignerAdapterAsync,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.CoSignHash(ComAdapter.unwrap(Hash));
        } else if (CadesType === undefined) {
            return this.comObj.CoSignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.comObj.CoSignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer), CadesType);
        } else {
            return this.comObj.CoSignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer), CadesType, EncodingType);
        }
    }

    public SignHash(
        Hash: HashedDataAdapterAsync,
        Signer?: SignerAdapterAsync,
        CadesType?: CAdES.CADESCOM_CADES_TYPE,
        EncodingType?: CAdES.CAPICOM_ENCODING_TYPE
    ): Promise<string> {
        if (Signer === undefined) {
            return this.comObj.SignHash(ComAdapter.unwrap(Hash));
        } else if (CadesType === undefined) {
            return this.comObj.SignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer));
        } else if (EncodingType === undefined) {
            return this.comObj.SignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer), CadesType);
        } else {
            return this.comObj.SignHash(ComAdapter.unwrap(Hash), ComAdapter.unwrap(Signer), CadesType, EncodingType);
        }
    }

    public VerifyHash(
        Hash: HashedDataAdapterAsync,
        SignedMessage: string,
        CadesType?: CAdES.CADESCOM_CADES_TYPE
    ): Promise<void> {
        if (CadesType === undefined) {
            return this.comObj.VerifyHash(ComAdapter.unwrap(Hash), SignedMessage);
        } else {
            return this.comObj.VerifyHash(ComAdapter.unwrap(Hash), SignedMessage, CadesType);
        }
    }
}
