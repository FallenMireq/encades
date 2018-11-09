import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';
import { AttributeAdapter, AttributeAdapterSync, AttributeAdapterAsync } from './AttributeAdapter';

export abstract class AttributesAdapter<T = any> extends ComAdapter<T> {
    public abstract Count(): Promise<number>;

    public abstract Add(attribute: AttributeAdapter): Promise<void>;
    public abstract Item(index: number): Promise<AttributeAdapter>;
    public abstract Clear(): Promise<void>;
    public abstract Remove(index: number): Promise<void>;
}

export class AttributesAdapterSync extends AttributesAdapter<CAdES.Sync.ICPAttributes> {
    public Count(): Promise<number> {
        return new Promise(resolve => resolve(this.comObj.Count));
    }

    public Add(attribute: AttributeAdapterSync): Promise<void> {
        return new Promise(resolve => resolve(this.comObj.Add(ComAdapter.unwrap(attribute))));
    }

    public Item(index: number): Promise<AttributeAdapterSync> {
        return new Promise(resolve => resolve(new AttributeAdapterSync(this.comObj.Item(index))));
    }

    public Clear(): Promise<void> {
        return new Promise(resolve => resolve(this.comObj.Clear()));
    }

    public Remove(index: number): Promise<void> {
        return new Promise(resolve => resolve(this.comObj.Remove(index)));
    }
}

export class AttributesAdapterAsync extends AttributesAdapter<CAdES.Async.ICPAttributes> {
    public Count(): Promise<number> {
        return this.comObj.Count;
    }

    public Add(attribute: AttributeAdapterAsync): Promise<void> {
        return this.comObj.Add(ComAdapter.unwrap(attribute));
    }

    public Item(index: number): Promise<AttributeAdapterAsync> {
        return this.comObj.Item(index).then(x => new AttributeAdapterAsync(x));
    }

    public Clear(): Promise<void> {
        return this.comObj.Clear();
    }

    public Remove(index: number): Promise<void> {
        return this.comObj.Remove(index);
    }
}
