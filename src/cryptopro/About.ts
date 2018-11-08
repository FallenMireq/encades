import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';
import { Version, wrapVersion } from './Version';

export abstract class About<T = CAdES.IAbout4> extends ComWrapper<T> {
    public abstract async MajorVersion(): Promise<number>;
    public abstract async MinorVersion(): Promise<number>;
    public abstract async BuildVersion(): Promise<number>;
    public abstract async Version(): Promise<string>;
    public abstract async PluginVersion(): Promise<Version>;

    public abstract async CSPVersion(ProviderName: string, ProviderType: number): Promise<Version>;
    public abstract async CSPName(ProviderType: number): Promise<string>;
}

export class AboutSync extends About<CAdES.Sync.IAbout4> {
    public async MajorVersion(): Promise<number> {
        return this.comObj.MajorVersion;
    }

    public async MinorVersion(): Promise<number> {
        return this.comObj.MinorVersion;
    }

    public async BuildVersion(): Promise<number> {
        return this.comObj.BuildVersion;
    }

    public async Version(): Promise<string> {
        return this.comObj.Version;
    }

    public async PluginVersion(): Promise<Version<CAdES.Sync.IVersion>> {
        return wrapVersion(this.comObj.PluginVersion);
    }

    public async CSPVersion(ProviderName: string, ProviderType: number): Promise<Version<CAdES.Sync.IVersion>> {
        return wrapVersion(this.comObj.CSPVersion(ProviderName, ProviderType));
    }

    public async CSPName(ProviderType: number): Promise<string> {
        return this.comObj.CSPName(ProviderType);
    }
}

export class AboutAsync extends About<CAdES.Async.IAbout4> {
    public async MajorVersion(): Promise<number> {
        return await this.comObj.MajorVersion;
    }

    public async MinorVersion(): Promise<number> {
        return await this.comObj.MinorVersion;
    }

    public async BuildVersion(): Promise<number> {
        return await this.comObj.BuildVersion;
    }

    public async Version(): Promise<string> {
        return await this.comObj.Version;
    }

    public async PluginVersion(): Promise<Version<CAdES.Async.IVersion>> {
        return wrapVersion(await this.comObj.PluginVersion);
    }

    public async CSPVersion(ProviderName: string, ProviderType: number): Promise<Version<CAdES.Async.IVersion>> {
        return wrapVersion(await this.comObj.CSPVersion(ProviderName, ProviderType));
    }

    public async CSPName(ProviderType: number): Promise<string> {
        return await this.comObj.CSPName(ProviderType);
    }
}

export function wrapAbout(comObj: CAdES.Sync.IAbout4): About<CAdES.Sync.IAbout4>;
export function wrapAbout(comObj: CAdES.Async.IAbout4): About<CAdES.Async.IAbout4>;
export function wrapAbout(comObj: CAdES.IAbout4): About<CAdES.IAbout4> {
    if (CAdES.isSync<CAdES.Sync.IAbout4, CAdES.Async.IAbout4>(comObj)) {
        return new AboutSync(comObj);
    } else {
        return new AboutAsync(comObj);
    }
}

export async function createAbout(): Promise<About> {
    if (CAdES.isSync<CAdES.Sync.IWebClassFactory, CAdES.Async.IWebClassFactory>(CAdES.cadesplugin)) {
        let comObj = CAdES.cadesplugin.CreateObject(CAdES.ProgIds.About);
        return wrapAbout(comObj);
    } else {
        await CAdES.cadesplugin;
        let comObj = await CAdES.cadesplugin.CreateObjectAsync(CAdES.ProgIds.About);
        return wrapAbout(comObj);
    }
}
