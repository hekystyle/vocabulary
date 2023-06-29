import { expect, it } from '@jest/globals';
import { getInitialFilter } from './getInitialFilter';

it.each([
  [`?page=2&sortField=foo&sortOrder=ascend`, { page: 2, sortField: 'foo', sortOrder: 'ascend' }],
  [`?page=2&sortField=bar&sortOrder=descend`, { page: 2, sortField: 'bar', sortOrder: 'descend' }],
  ['?page=NaN', { page: NaN }],
])('should parse known field %p', (search, expected) => {
  const actual = getInitialFilter(search);
  expect(actual).toEqual(expected);
});

it('should omit unknown fields', () => {
  const actual = getInitialFilter('?unknown=foo');
  expect(actual).toEqual({});
});
