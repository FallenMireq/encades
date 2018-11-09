import * as CAdES from 'cadesplugin-types';

import { ComAdapter } from './ComAdapter';

export abstract class VersionAdapter<T = any> extends ComAdapter<T> {
    public abstract MajorVersion(): Promise<number>;
    public abstract MinorVersion(): Promise<number>;
    public abstract BuildVersion(): Promise<number>;

    public abstract ToString(): Promise<string>;
}

export class VersionAdapterSync extends VersionAdapter<CAdES.Sync.IVersion> {
    public MajorVersion(): Promise<number> {
        return new Promise(resolve => resolve(this.comObj.MajorVersion));
    }
    public MinorVersion(): Promise<number> {
        return new Promise(resolve => resolve(this.comObj.MinorVersion));
    }
    public BuildVersion(): Promise<number> {
        return new Promise(resolve => resolve(this.comObj.BuildVersion));
    }
    public ToString(): Promise<string> {
        return new Promise(resolve => resolve(this.comObj.toString()));
    }
}

export class VersionAdapterAsync extends VersionAdapter<CAdES.Async.IVersion> {
    public MajorVersion(): Promise<number> {
        return this.comObj.MajorVersion;
    }
    public MinorVersion(): Promise<number> {
        return this.comObj.MinorVersion;
    }
    public BuildVersion(): Promise<number> {
        return this.comObj.BuildVersion;
    }
    public ToString(): Promise<string> {
        return this.comObj.toString();
    }
}
