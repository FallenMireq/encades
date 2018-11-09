import { ComAdapter } from './adapters/@';

export abstract class SuperAdapter<T extends ComAdapter<any>> {
    public constructor(protected readonly adapter: T) {}

    public static unwrap<T extends ComAdapter<any>>(wrapper: SuperAdapter<T>): T {
        return wrapper.adapter;
    }
}
