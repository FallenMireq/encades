import * as CAdES from 'cadesplugin-types';

import { SuperAdapter } from './SuperAdapter';
import { StoreAdapter } from './adapters/@';
import { Certificates } from './Certificates';

export class Store extends SuperAdapter<StoreAdapter> {
    public Certificates(): Promise<Certificates> {
        return this.adapter.Certificates().then(x => new Certificates(x));
    }

    public Location(): Promise<CAdES.CADESCOM_STORE_LOCATION> {
        return this.adapter.Location();
    }

    public Name(): Promise<CAdES.CAPICOM_STORE_NAMES | string> {
        return this.adapter.Name();
    }

    public Open(): Promise<void>;
    public Open(StoreLocation: CAdES.CADESCOM_STORE_LOCATION): Promise<void>;
    public Open(
        StoreLocation: CAdES.CADESCOM_STORE_LOCATION,
        StoreName: CAdES.CAPICOM_STORE_NAMES | string
    ): Promise<void>;
    public Open(
        StoreLocation: CAdES.CADESCOM_STORE_LOCATION,
        StoreName: CAdES.CAPICOM_STORE_NAMES | string,
        OpenMode: CAdES.CAPICOM_STORE_OPEN_MODE
    ): Promise<void>;
    public Open(
        StoreLocation?: CAdES.CADESCOM_STORE_LOCATION,
        StoreName?: CAdES.CAPICOM_STORE_NAMES | string,
        OpenMode?: CAdES.CAPICOM_STORE_OPEN_MODE
    ): Promise<void> {
        if (StoreLocation === undefined) {
            return this.adapter.Open();
        } else if (StoreName === undefined) {
            return this.adapter.Open(StoreLocation);
        } else if (OpenMode === undefined) {
            return this.adapter.Open(StoreLocation, StoreName);
        } else {
            return this.adapter.Open(StoreLocation, StoreName, OpenMode);
        }
    }

    public Close(): Promise<void> {
        return this.adapter.Close();
    }
}
