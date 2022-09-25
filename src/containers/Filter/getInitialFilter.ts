import { SortOrder } from 'antd/lib/table/interface';
import { parse } from 'qs';
import { evolve, pick } from 'ramda';
import { FilterValues } from './types';

const isSortOrder = (value: unknown): value is SortOrder => value === 'ascend' || value === 'descend' || value === null;

export const getInitialFilter = (search: string): Partial<FilterValues> => {
  const parsedQueryString = parse(search.replace(/^\?/, ''));
  const evolver: { [K in keyof FilterValues]: (value: string) => FilterValues[K] } = {
    page: value => parseInt(value, 10),
    sortField: value => value,
    sortOrder: value => (isSortOrder(value) ? value : null),
  } as const;
  return evolve(evolver, pick(Object.keys(evolver), parsedQueryString));
};
