export interface Storage<T> {
  get(): Promise<T | undefined>;
  set(value: T): Promise<void>;
}
