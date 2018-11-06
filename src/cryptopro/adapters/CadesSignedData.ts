import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';
import { Certificates, wrapCertificates } from './Certificates';
import { Signers, wrapSigners } from './Signers';

export abstract class SignedData<T = CAdES.ICPSignedData5> extends ComWrapper<T> {
    public abstract async Certificates(): Promise<Certificates>;
    public abstract async Content(): Promise<string>;
    public abstract async SetContent(value: string): Promise<void>;
    public abstract async Signers(): Promise<Signers>;

    public abstract async CoSign(Signer: Signer): Promise<Signers>;
    public abstract async CoSign(): Promise<Signers>;
    public abstract async CoSign(): Promise<Signers>;
    public abstract async Sign(): Promise<Signers>;
    public abstract async Verify(): Promise<Signers>;
}

export class SignedDataSync extends SignedData<CAdES.Sync.ICPSignedData5> {
    qwe() {
        // this.comObj.Certificates;
        // this.comObj.Content;
        // this.comObj.Signers;
        // this.comObj.ContentEncoding;
        // this.comObj.DisplayData;

        this.comObj.CoSign();
        // this.comObj.Sign();
        // this.comObj.Verify();
        // this.comObj.CoSignCades();
        // this.comObj.EnhanceCades();
        // this.comObj.SignCades();
        // this.comObj.VerifyCades();
        // this.comObj.CoSignHash();
        // this.comObj.SignHash();
        // this.comObj.VerifyHash();
    }
}

export class SignedDataAsync extends SignedData<CAdES.Async.ICPSignedData5> {

}

export function wrapAbout(comObj: CAdES.Sync.ICPSignedData5): SignedData<CAdES.Sync.ICPSignedData5>;
export function wrapAbout(comObj: CAdES.Async.ICPSignedData5): SignedData<CAdES.Async.ICPSignedData5>;
export function wrapAbout(comObj: CAdES.ICPSignedData5): SignedData<CAdES.ICPSignedData5> {
    if (CAdES.isSync<CAdES.Sync.ICPSignedData5, CAdES.Async.ICPSignedData5>(comObj)) {
        return new SignedDataSync(comObj);
    } else {
        return new SignedDataAsync(comObj);
    }
}

export async function createAbout(): Promise<SignedData> {
    if (CAdES.isSync<CAdES.Sync.IWebClassFactory, CAdES.Async.IWebClassFactory>(CAdES.cadesplugin)) {
        let comObj = CAdES.cadesplugin.CreateObject(CAdES.ProgIds.CadesSignedData);
        return wrapAbout(comObj);
    } else {
        await CAdES.cadesplugin;
        let comObj = await CAdES.cadesplugin.CreateObjectAsync(CAdES.ProgIds.CadesSignedData);
        return wrapAbout(comObj);
    }
}
