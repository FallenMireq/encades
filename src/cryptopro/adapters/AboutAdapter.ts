import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';
import { VersionAdapter, VersionAdapterSync, VersionAdapterAsync } from './VersionAdapter';

export abstract class AboutAdapter<T = any> extends ComAdapter<T> {
    public abstract MajorVersion(): Promise<number>;
    public abstract MinorVersion(): Promise<number>;
    public abstract BuildVersion(): Promise<number>;
    public abstract Version(): Promise<string>;
    public abstract PluginVersion(): Promise<VersionAdapter>;

    public abstract CSPVersion(ProviderName: string, ProviderType: number): Promise<VersionAdapter>;
    public abstract CSPName(ProviderType: number): Promise<string>;
}

export class AboutAdapterSync extends AboutAdapter<CAdES.Sync.IAbout4> {
    public MajorVersion(): Promise<number> {
        return Promise.resolve(this.comObj.MajorVersion);
    }

    public MinorVersion(): Promise<number> {
        return Promise.resolve(this.comObj.MinorVersion);
    }

    public BuildVersion(): Promise<number> {
        return Promise.resolve(this.comObj.BuildVersion);
    }

    public Version(): Promise<string> {
        return Promise.resolve(this.comObj.Version);
    }

    public PluginVersion(): Promise<VersionAdapterSync> {
        return Promise.resolve(this.comObj.PluginVersion).then(x => new VersionAdapterSync(x));
    }

    public CSPVersion(ProviderName: string, ProviderType: number): Promise<VersionAdapterSync> {
        return Promise.resolve(this.comObj.CSPVersion(ProviderName, ProviderType)).then(x => new VersionAdapterSync(x));
    }

    public CSPName(ProviderType: number): Promise<string> {
        return Promise.resolve(this.comObj.CSPName(ProviderType));
    }
}

export class AboutAdapterAsync extends AboutAdapter<CAdES.Async.IAbout4> {
    public MajorVersion(): Promise<number> {
        return this.comObj.MajorVersion;
    }

    public MinorVersion(): Promise<number> {
        return this.comObj.MinorVersion;
    }

    public BuildVersion(): Promise<number> {
        return this.comObj.BuildVersion;
    }

    public Version(): Promise<string> {
        return this.comObj.Version;
    }

    public PluginVersion(): Promise<VersionAdapterAsync> {
        return this.comObj.PluginVersion.then(x => new VersionAdapterAsync(x));
    }

    public CSPVersion(ProviderName: string, ProviderType: number): Promise<VersionAdapterAsync> {
        return this.comObj.CSPVersion(ProviderName, ProviderType).then(x => new VersionAdapterAsync(x));
    }

    public CSPName(ProviderType: number): Promise<string> {
        return this.comObj.CSPName(ProviderType);
    }
}
