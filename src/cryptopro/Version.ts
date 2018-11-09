import { SuperAdapter } from './SuperAdapter';
import { VersionAdapter } from './adapters/@';

export class Version extends SuperAdapter<VersionAdapter> {
    public MajorVersion(): Promise<number> {
        return this.adapter.MajorVersion();
    }

    public MinorVersion(): Promise<number> {
        return this.adapter.MinorVersion();
    }

    public BuildVersion(): Promise<number> {
        return this.adapter.BuildVersion();
    }

    public ToString(): Promise<string> {
        return this.adapter.ToString();
    }
}
