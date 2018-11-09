import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';

export abstract class HashedDataAdapter<T = any> extends ComAdapter<T> {
    public abstract Algorithm(): Promise<CAdES.CADESCOM_HASH_ALGORITHM>;
    public abstract SetAlgorithm(value: CAdES.CADESCOM_HASH_ALGORITHM): Promise<void>;
    public abstract Value(): Promise<string>;
    public abstract DataEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE>;
    public abstract SetDataEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void>;

    public abstract Hash(newVal: string): Promise<void>;
    public abstract SetHashValue(newVal: string): Promise<void>;
}

export class HashedDataAdapterSync extends HashedDataAdapter<CAdES.Sync.ICPHashedData> {
    public Algorithm(): Promise<CAdES.CADESCOM_HASH_ALGORITHM> {
        return new Promise(resolve => resolve(this.comObj.Algorithm as any));
    }

    public SetAlgorithm(value: CAdES.CADESCOM_HASH_ALGORITHM): Promise<void> {
        return new Promise(resolve => {
            this.comObj.Algorithm = value as any;
            resolve();
        });
    }

    public Value(): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.Value));
    }

    public DataEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE> {
        return new Promise(resolve => resolve(this.comObj.DataEncoding));
    }

    public SetDataEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void> {
        return new Promise(resolve => {
            this.comObj.DataEncoding = value;
            resolve();
        });
    }

    public Hash(newVal: string): Promise<void> {
        return new Promise(resolve => resolve(this.comObj.Hash(newVal)));
    }

    public SetHashValue(newVal: string): Promise<void> {
        return new Promise(resolve => resolve(this.comObj.SetHashValue(newVal)));
    }
}

export class HashedDataAdapterAsync extends HashedDataAdapter<CAdES.Async.ICPHashedData> {
    public Algorithm(): Promise<CAdES.CADESCOM_HASH_ALGORITHM> {
        return this.comObj.Algorithm as any;
    }

    public SetAlgorithm(value: CAdES.CADESCOM_HASH_ALGORITHM): Promise<void> {
        return this.comObj.propset_Algorithm(value as any);
    }

    public Value(): Promise<string> {
        return this.comObj.Value;
    }

    public DataEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE> {
        return this.comObj.DataEncoding;
    }

    public SetDataEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void> {
        return this.comObj.propset_DataEncoding(value);
    }

    public Hash(newVal: string): Promise<void> {
        return this.comObj.Hash(newVal);
    }

    public SetHashValue(newVal: string): Promise<void> {
        return this.comObj.SetHashValue(newVal);
    }
}
