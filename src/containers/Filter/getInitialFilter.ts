import { SortOrder } from 'antd/lib/table/interface';
import { evolve, pick } from 'ramda';
import { FilterValues } from './types';

const isSortOrder = (value: unknown): value is SortOrder => value === 'ascend' || value === 'descend' || value === null;

export const getInitialFilter = (search: string): Partial<FilterValues> => {
  const searchParams = new URLSearchParams(search);
  const evolver: { [K in keyof FilterValues]: (value: string) => FilterValues[K] } = {
    page: value => parseInt(value, 10),
    sortField: value => value,
    sortOrder: value => (isSortOrder(value) ? value : null),
  } as const;
  return evolve(evolver, pick(Object.keys(evolver), Object.fromEntries(searchParams.entries())));
};
