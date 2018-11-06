import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';
import { Attribute, wrapAttribute } from './Attribute';

export abstract class Attributes<T = CAdES.ICPAttributes> extends ComWrapper<T> {
    public abstract async Count(): Promise<number>;

    public abstract async Add(attribute: Attribute): Promise<void>;
    public abstract async Item(index: number): Promise<Attribute>;
    public abstract async Clear(): Promise<void>;
    public abstract async Remove(index: number): Promise<void>;
}

export class AttributesSync extends Attributes<CAdES.Sync.ICPAttributes> {
    public async Count(): Promise<number> {
        return this.comObj.Count;
    }

    public async Add(attribute: Attribute<CAdES.Sync.ICPAttribute2>): Promise<void> {
        this.comObj.Add(ComWrapper.unwrap(attribute));
    }

    public async Item(index: number): Promise<Attribute<CAdES.Sync.ICPAttribute2>> {
        return wrapAttribute(this.comObj.Item(index));
    }

    public async Clear(): Promise<void> {
        this.comObj.Clear();
    }

    public async Remove(index: number): Promise<void> {
        this.comObj.Remove(index);
    }
}

export class AttributesAsync extends Attributes<CAdES.Async.ICPAttributes> {
    public async Count(): Promise<number> {
        return await this.comObj.Count;
    }

    public async Add(attribute: Attribute<CAdES.Async.ICPAttribute2>): Promise<void> {
        await this.comObj.Add(ComWrapper.unwrap(attribute));
    }

    public async Item(index: number): Promise<Attribute<CAdES.Async.ICPAttribute2>> {
        return wrapAttribute(await this.comObj.Item(index));
    }

    public async Clear(): Promise<void> {
        await this.comObj.Clear();
    }

    public async Remove(index: number): Promise<void> {
        await this.comObj.Remove(index);
    }
}

export function wrapAttributes(comObj: CAdES.Sync.ICPAttributes): Attributes<CAdES.Sync.ICPAttributes>;
export function wrapAttributes(comObj: CAdES.Async.ICPAttributes): Attributes<CAdES.Async.ICPAttributes>;
export function wrapAttributes(comObj: CAdES.ICPAttributes): Attributes<CAdES.ICPAttributes> {
    if (CAdES.isSync<CAdES.Sync.ICPAttributes, CAdES.Async.ICPAttributes>(comObj)) {
        return new AttributesSync(comObj);
    } else {
        return new AttributesAsync(comObj);
    }
}
