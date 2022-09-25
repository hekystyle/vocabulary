export const toArray = <T>(value: T | readonly T[]): readonly T[] => (value instanceof Array ? value : [value]);
