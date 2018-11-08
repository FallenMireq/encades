import * as CAdES from 'cadesplugin-types';
import { ComWrapper } from './ComWrapper';

export abstract class Version<T = CAdES.IVersion> extends ComWrapper<T> {
    public abstract async MajorVersion(): Promise<number>;
    public abstract async MinorVersion(): Promise<number>;
    public abstract async BuildVersion(): Promise<number>;

    public abstract async ToString(): Promise<string>;
}

export class VersionSync extends Version<CAdES.Sync.IVersion> {
    public async MajorVersion(): Promise<number> {
        return this.comObj.MajorVersion;
    }
    public async MinorVersion(): Promise<number> {
        return this.comObj.MinorVersion;
    }
    public async BuildVersion(): Promise<number> {
        return this.comObj.BuildVersion;
    }
    public async ToString(): Promise<string> {
        return this.comObj.toString();
    }
}

export class VersionAsync extends Version<CAdES.Async.IVersion> {
    public async MajorVersion(): Promise<number> {
        return await this.comObj.MajorVersion;
    }
    public async MinorVersion(): Promise<number> {
        return await this.comObj.MinorVersion;
    }
    public async BuildVersion(): Promise<number> {
        return await this.comObj.BuildVersion;
    }
    public async ToString(): Promise<string> {
        return await this.comObj.toString();
    }
}

export function wrapVersion(comObj: CAdES.Sync.IVersion): Version<CAdES.Sync.IVersion>;
export function wrapVersion(comObj: CAdES.Async.IVersion): Version<CAdES.Async.IVersion>;
export function wrapVersion(comObj: CAdES.IVersion): Version<CAdES.IVersion> {
    if (CAdES.isSync<CAdES.Sync.IVersion, CAdES.Async.IVersion>(comObj)) {
        return new VersionSync(comObj);
    } else {
        return new VersionAsync(comObj);
    }
}
