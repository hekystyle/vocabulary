import { expect, it } from '@jest/globals';
import { toArray } from './toArray';

it('should return same array', () => {
  const arr = [] as const;
  const actual = toArray(arr);
  expect(actual).toBe(arr);
});

it('should return array with value', () => {
  const actual = toArray(1);
  expect(actual).toEqual([1]);
});
