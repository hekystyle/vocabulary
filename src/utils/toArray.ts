export const toArray = <T>(value: T | readonly T[]): T[] => (value instanceof Array ? [...value] : [value]);
