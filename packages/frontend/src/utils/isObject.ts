export function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object';
}
