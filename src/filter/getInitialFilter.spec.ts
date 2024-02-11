import { expect, it } from 'vitest';
import { getInitialFilter } from './getInitialFilter';

it.each([
  [`?page=2&sortBy[0][field]=foo&sortBy[0][order]=ascend`, { page: 2, sortBy: [{ field: 'foo', order: 'ascend' }] }],
  [`?page=2&sortBy[0][field]=bar&sortBy[0][order]=descend`, { page: 2, sortBy: [{ field: 'bar', order: 'descend' }] }],
  ['?page=NaN', {}],
])('should parse known field %s', (search, expected) => {
  const actual = getInitialFilter(search);
  expect(actual).toEqual(expected);
});

it('should omit unknown fields', () => {
  const actual = getInitialFilter('?unknown=foo');
  expect(actual).toEqual({});
});
