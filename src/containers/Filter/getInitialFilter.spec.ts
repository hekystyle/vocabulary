import { getInitialFilter } from './getInitialFilter';

it.each([
  ['&page=2', { page: 2 }],
  ['&page=NaN', { page: NaN }],
])('should parse known field %p', (search, expected) => {
  const actual = getInitialFilter(search);
  expect(actual).toEqual(expected);
});

it('should omit unknown fields', () => {
  const actual = getInitialFilter('&unknown=foo');
  expect(actual).toEqual({});
});
