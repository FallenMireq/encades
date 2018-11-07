import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';

export abstract class HashedData<T = CAdES.ICPHashedData> extends ComWrapper<T> {
    public abstract async Algorithm(): Promise<CAdES.CADESCOM_HASH_ALGORITHM>;
    public abstract async SetAlgorithm(value: CAdES.CADESCOM_HASH_ALGORITHM): Promise<void>;
    public abstract async Value(): Promise<string>;
    public abstract async DataEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE>;
    public abstract async SetDataEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void>;

    public abstract async Hash(newVal: string): Promise<void>;
    public abstract async SetHashValue(newVal: string): Promise<void>;
}

export class HashedDataSync extends HashedData<CAdES.Sync.ICPHashedData> {
    public async Algorithm(): Promise<CAdES.CADESCOM_HASH_ALGORITHM> {
        return this.comObj.Algorithm as any;
    }

    public async SetAlgorithm(value: CAdES.CADESCOM_HASH_ALGORITHM): Promise<void> {
        this.comObj.Algorithm = value as any;
    }

    public async Value(): Promise<string> {
        return this.comObj.Value;
    }

    public async DataEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE> {
        return this.comObj.DataEncoding;
    }

    public async SetDataEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void> {
        this.comObj.DataEncoding = value;
    }

    public async Hash(newVal: string): Promise<void> {
        this.comObj.Hash(newVal);
    }

    public async SetHashValue(newVal: string): Promise<void> {
        this.comObj.SetHashValue(newVal);
    }
}

export class HashedDataAsync extends HashedData<CAdES.Async.ICPHashedData> {
    public async Algorithm(): Promise<CAdES.CADESCOM_HASH_ALGORITHM> {
        return await this.comObj.Algorithm as any;
    }

    public async SetAlgorithm(value: CAdES.CADESCOM_HASH_ALGORITHM): Promise<void> {
        await this.comObj.propset_Algorithm(value as any);
    }

    public async Value(): Promise<string> {
        return await this.comObj.Value;
    }

    public async DataEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE> {
        return await this.comObj.DataEncoding;
    }

    public async SetDataEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void> {
        await this.comObj.propset_DataEncoding(value);
    }

    public async Hash(newVal: string): Promise<void> {
        await this.comObj.Hash(newVal);
    }

    public async SetHashValue(newVal: string): Promise<void> {
        await this.comObj.SetHashValue(newVal);
    }
}

export function wrapHashedData(comObj: CAdES.Sync.ICPHashedData): HashedData<CAdES.Sync.ICPHashedData>;
export function wrapHashedData(comObj: CAdES.Async.ICPHashedData): HashedData<CAdES.Async.ICPHashedData>;
export function wrapHashedData(comObj: CAdES.ICPHashedData): HashedData<CAdES.ICPHashedData> {
    if (CAdES.isSync<CAdES.Sync.ICPHashedData, CAdES.Async.ICPHashedData>(comObj)) {
        return new HashedDataSync(comObj);
    } else {
        return new HashedDataAsync(comObj);
    }
}

export async function createHashedData(): Promise<HashedData> {
    if (CAdES.isSync<CAdES.Sync.IWebClassFactory, CAdES.Async.IWebClassFactory>(CAdES.cadesplugin)) {
        let comObj = CAdES.cadesplugin.CreateObject(CAdES.ProgIds.CPHashedData);
        return wrapHashedData(comObj);
    } else {
        await CAdES.cadesplugin;
        let comObj = await CAdES.cadesplugin.CreateObjectAsync(CAdES.ProgIds.CPHashedData);
        return wrapHashedData(comObj);
    }
}
