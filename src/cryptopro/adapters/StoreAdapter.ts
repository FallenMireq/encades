import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';
import { CertificatesAdapter, CertificatesAdapterSync, CertificatesAdapterAsync } from './CertificatesAdapter';

export abstract class StoreAdapter<T = any> extends ComAdapter<T> {
    public abstract Certificates(): Promise<CertificatesAdapter>;
    public abstract Location(): Promise<CAdES.CADESCOM_STORE_LOCATION>;
    public abstract Name(): Promise<CAdES.CAPICOM_STORE_NAMES | string>;

    public abstract Open(): Promise<void>;
    public abstract Open(StoreLocation: CAdES.CADESCOM_STORE_LOCATION): Promise<void>;
    public abstract Open(StoreLocation: CAdES.CADESCOM_STORE_LOCATION, StoreName: CAdES.CAPICOM_STORE_NAMES | string): Promise<void>;
    public abstract Open(
        StoreLocation: CAdES.CADESCOM_STORE_LOCATION,
        StoreName: CAdES.CAPICOM_STORE_NAMES | string,
        OpenMode: CAdES.CAPICOM_STORE_OPEN_MODE
    ): Promise<void>;

    public abstract Close(): Promise<void>;
}

export class StoreAdapterSync extends StoreAdapter<CAdES.Sync.IStore> {
    public Certificates(): Promise<CertificatesAdapterSync> {
        return new Promise(resolve => resolve(new CertificatesAdapterSync(this.comObj.Certificates)));
    }

    public Location(): Promise<CAdES.CADESCOM_STORE_LOCATION> {
        return new Promise(resolve => resolve(this.comObj.Location));
    }

    public Name(): Promise<CAdES.CAPICOM_STORE_NAMES | string> {
        return new Promise(resolve => resolve(this.comObj.Name));
    }

    public Open(
        StoreLocation?: CAdES.CADESCOM_STORE_LOCATION,
        StoreName?: CAdES.CAPICOM_STORE_NAMES | string,
        OpenMode?: CAdES.CAPICOM_STORE_OPEN_MODE
    ): Promise<void> {
        return new Promise<void>(resolve => {
            if (StoreLocation === undefined) {
                resolve(this.comObj.Open());
            } else if (StoreName === undefined) {
                resolve(this.comObj.Open(StoreLocation));
            } else if (OpenMode === undefined) {
                resolve(this.comObj.Open(StoreLocation, StoreName));
            } else {
                resolve(this.comObj.Open(StoreLocation, StoreName, OpenMode));
            }
        });
    }

    public Close(): Promise<void> {
        return new Promise(resolve => resolve(this.comObj.Close()));
    }
}

export class StoreAdapterAsync extends StoreAdapter<CAdES.Async.IStore> {
    public Certificates(): Promise<CertificatesAdapterAsync> {
        return this.comObj.Certificates.then(x => new CertificatesAdapterAsync(x));
    }

    public Location(): Promise<CAdES.CADESCOM_STORE_LOCATION> {
        return this.comObj.Location;
    }

    public Name(): Promise<CAdES.CAPICOM_STORE_NAMES | string> {
        return this.comObj.Name;
    }

    public Open(
        StoreLocation?: CAdES.CADESCOM_STORE_LOCATION,
        StoreName?: CAdES.CAPICOM_STORE_NAMES | string,
        OpenMode?: CAdES.CAPICOM_STORE_OPEN_MODE
    ): Promise<void> {
        if (StoreLocation === undefined) {
            return this.comObj.Open();
        } else if (StoreName === undefined) {
            return this.comObj.Open(StoreLocation);
        } else if (OpenMode === undefined) {
            return this.comObj.Open(StoreLocation, StoreName);
        } else {
            return this.comObj.Open(StoreLocation, StoreName, OpenMode);
        }
    }

    public Close(): Promise<void> {
        return this.comObj.Close();
    }
}
