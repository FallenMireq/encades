export abstract class ComAdapter<T> {
    public constructor(protected readonly comObj: T) {}

    public static unwrap<T>(wrapper: ComAdapter<T>): T {
        return wrapper.comObj;
    }
}
