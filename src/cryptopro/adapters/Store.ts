import * as CAdES from 'cadesplugin-types';
import { CPCertificates } from './Certificates';

abstract class Store {
    public abstract async Certificates(): Promise<CPCertificates>;
    public abstract async Location(): Promise<CAdES.CADESCOM_STORE_LOCATION>;
    public abstract async Name(): Promise<CAdES.CAPICOM_STORE_NAMES | string>;

    public abstract async Open(): Promise<void>;
    public abstract async Open(
        StoreLocation: CAdES.CADESCOM_STORE_LOCATION
    ): Promise<void>;
    public abstract async Open(
        StoreLocation: CAdES.CADESCOM_STORE_LOCATION,
        StoreName: CAdES.CAPICOM_STORE_NAMES | string
    ): Promise<void>;
    public abstract async Open(
        StoreLocation: CAdES.CADESCOM_STORE_LOCATION,
        StoreName: CAdES.CAPICOM_STORE_NAMES | string,
        OpenMode: CAdES.CAPICOM_STORE_OPEN_MODE
    ): Promise<void>;

    public abstract async Close(): Promise<void>;
}

export class StoreSync extends Store {
    public constructor(protected comObj: CAdES.Sync.IStore) {
        super();
    }

    public async Certificates(): Promise<CPCertificates> {
        return
    }
    public async Location(): Promise<CAdES.CADESCOM_STORE_LOCATION> {}
    public async Name(): Promise<CAdES.CAPICOM_STORE_NAMES | string> {}

    public async Open(
        StoreLocation?: CAdES.CADESCOM_STORE_LOCATION,
        StoreName?: CAdES.CAPICOM_STORE_NAMES | string,
        OpenMode?: CAdES.CAPICOM_STORE_OPEN_MODE
    ) {
        if (StoreLocation === undefined) {
            this.comObj.Open();
        } else if (StoreName === undefined) {
            this.comObj.Open(StoreLocation);
        } else if (OpenMode === undefined) {
            this.comObj.Open(StoreLocation, StoreName);
        } else {
            this.comObj.Open(StoreLocation, StoreName, OpenMode);
        }
    }

    public async Close() {
        this.comObj.Close();
    }
}

export class StoreAsync extends Store {
    public constructor(protected comObj: CAdES.Async.IStore) {
        super();
    }

    public async Open(
        StoreLocation?: CAdES.CADESCOM_STORE_LOCATION,
        StoreName?: CAdES.CAPICOM_STORE_NAMES | string,
        OpenMode?: CAdES.CAPICOM_STORE_OPEN_MODE
    ) {
        if (StoreLocation === undefined) {
            await this.comObj.Open();
        } else if (StoreName === undefined) {
            await this.comObj.Open(StoreLocation);
        } else if (OpenMode === undefined) {
            await this.comObj.Open(StoreLocation, StoreName);
        } else {
            await this.comObj.Open(StoreLocation, StoreName, OpenMode);
        }
    }

    public async Close() {
        await this.comObj.Close();
    }
}

export function createStore(comObj: CAdES.Sync.IStore | CAdES.Async.IStore): Store {
    if (CAdES.isSync(comObj)) {
        return new StoreSync(comObj);
    } else {
        return new StoreAsync(comObj);
    }
}
