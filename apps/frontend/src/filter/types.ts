import { SortOrder } from 'antd/es/table/interface';
import { z } from 'zod';

export const sorterSchema = z.object({
  field: z.string(),
  order: z.enum(['ascend', 'descend'] as const satisfies SortOrder[]),
});

export type Sorter = z.infer<typeof sorterSchema>;

export interface Sortable {
  sortBy: Sorter[];
}

export interface FilterValues extends Sortable {
  page: number;
}

export type FilterUpdater = (update: Partial<FilterValues>) => void;

export interface FilterShape {
  filter: Partial<FilterValues>;
  update: FilterUpdater;
  setFields: (fields?: ReadonlyArray<keyof FilterValues>) => void;
}
