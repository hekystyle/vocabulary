export function isArrayOf<T>(val: unknown, is: (item: unknown) => item is T): val is T[] {
  return Array.isArray(val) && val.every(item => is(item));
}
