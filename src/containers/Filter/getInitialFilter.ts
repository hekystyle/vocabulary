import { evolve, pick } from 'ramda';
import { FilterValues } from './types';

export const getInitialFilter = (search: string): Partial<FilterValues> => {
  const searchParams = new URLSearchParams(search);
  const evolver: { [K in keyof FilterValues]: (value: string) => FilterValues[K] } = {
    page: value => parseInt(value, 10),
  } as const;
  return evolve(evolver, pick(Object.keys(evolver), Object.fromEntries(searchParams.entries())));
};
