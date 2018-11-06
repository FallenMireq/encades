export abstract class ComWrapper<T> {
    public constructor(protected comObj: T) {}

    public static getComObject<T>(wrapper: ComWrapper<T>): T {
        return wrapper.comObj;
    }
}
