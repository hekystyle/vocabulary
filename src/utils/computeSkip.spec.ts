import { type Pagination, computeSkip } from './computeSkip';

test.each([
  [0, { page: 1, pageSize: 20 }],
  [20, { page: 2, pageSize: 20 }],
])('should return %p for %p', (expected, pagination: Pagination) => {
  expect.hasAssertions();
  const actual = computeSkip(pagination);
  expect(actual).toBe(expected);
});
