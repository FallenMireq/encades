export abstract class ComWrapper<T> {
    public constructor(protected comObj: T) {}

    public static unwrap<T>(wrapper: ComWrapper<T>): T {
        return wrapper.comObj;
    }
}
