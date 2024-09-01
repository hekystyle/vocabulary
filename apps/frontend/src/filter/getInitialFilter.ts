import qs from 'qs';
import { z } from 'zod';
import { FilterValues, sorterSchema } from './types';

export const getInitialFilter = (search: string): Partial<FilterValues> => {
  const parsedSearch = qs.parse(search, {
    ignoreQueryPrefix: true,
    allowDots: true,
  });

  const result = z
    .object({
      page: z.coerce.number().int().positive().safe(),
      sortBy: z.array(sorterSchema),
    })
    .partial()
    .safeParse(parsedSearch);

  return result.success ? result.data : {};
};
