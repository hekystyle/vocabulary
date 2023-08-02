import { expect, it } from 'vitest';
import { isObject } from './isObject';

it.each([
  [false, undefined],
  [false, null],
  [false, function a() {}],
  [false, () => {}],
  [true, {}],
])('should return %p for %p', (expected, value) => {
  expect.hasAssertions();
  const actual = isObject(value);
  expect(actual).toBe(expected);
});
