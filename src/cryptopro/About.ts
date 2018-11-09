import { SuperAdapter } from './SuperAdapter';
import { AboutAdapter } from './adapters/@';
import { Version } from './Version';

export class About extends SuperAdapter<AboutAdapter> {
    public MajorVersion(): Promise<number> {
        return this.adapter.MajorVersion();
    }

    public MinorVersion(): Promise<number> {
        return this.adapter.MinorVersion();
    }

    public BuildVersion(): Promise<number> {
        return this.adapter.BuildVersion();
    }

    public Version(): Promise<string> {
        return this.adapter.Version();
    }

    public PluginVersion(): Promise<Version> {
        return this.adapter.PluginVersion().then(x => new Version(x));
    }

    public CSPVersion(ProviderName: string, ProviderType: number): Promise<Version> {
        return this.adapter.CSPVersion(ProviderName, ProviderType).then(x => new Version(x));
    }

    public CSPName(ProviderType: number): Promise<string> {
        return this.adapter.CSPName(ProviderType);
    }
}
