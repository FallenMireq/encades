import * as CAdES from 'cadesplugin-types';

import { SuperAdapter } from './SuperAdapter';
import { HashedDataAdapter } from './adapters/@';

export class HashedData extends SuperAdapter<HashedDataAdapter> {
    public Algorithm(): Promise<CAdES.CADESCOM_HASH_ALGORITHM> {
        return this.adapter.Algorithm();
    }

    public SetAlgorithm(value: CAdES.CADESCOM_HASH_ALGORITHM): Promise<void> {
        return this.adapter.SetAlgorithm(value);
    }

    public Value(): Promise<string> {
        return this.adapter.Value();
    }

    public DataEncoding(): Promise<CAdES.CADESCOM_CONTENT_ENCODING_TYPE> {
        return this.adapter.DataEncoding();
    }

    public SetDataEncoding(value: CAdES.CADESCOM_CONTENT_ENCODING_TYPE): Promise<void> {
        return this.adapter.SetDataEncoding(value);
    }

    public Hash(newVal: string): Promise<void> {
        return this.adapter.Hash(newVal);
    }

    public SetHashValue(newVal: string): Promise<void> {
        return this.adapter.SetHashValue(newVal);
    }
}
