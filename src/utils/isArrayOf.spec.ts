import { isArrayOf } from './isArrayOf';

test.each([
  [false, undefined],
  [false, null],
  [false, 0],
  [false, false],
  [false, ''],
  [false, function foo() {}],
  [false, () => {}],
  [false, {}],
  [true, []],
])('should return %p for %p', (expected, value) => {
  expect.hasAssertions();

  const is = (item: unknown): item is unknown => true;

  const actual = isArrayOf(value, is);

  expect(actual).toBe(expected);
});
