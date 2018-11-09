import { SuperAdapter } from './SuperAdapter';
import { AttributesAdapter } from './adapters/@';
import { Attribute } from './Attribute';

export class Attributes extends SuperAdapter<AttributesAdapter> {
    public Count(): Promise<number> {
        return this.adapter.Count();
    }

    public Add(attribute: Attribute): Promise<void> {
        return this.adapter.Add(SuperAdapter.unwrap(attribute));
    }

    public Item(index: number): Promise<Attribute> {
        return this.adapter.Item(index).then(x => new Attribute(x));
    }

    public Clear(): Promise<void> {
        return this.adapter.Clear();
    }

    public Remove(index: number): Promise<void> {
        return this.adapter.Remove(index);
    }
}
