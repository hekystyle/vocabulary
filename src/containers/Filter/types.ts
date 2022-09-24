import { SortOrder } from 'antd/lib/table/interface';

export interface Sorting {
  sortField: string;
  sortOrder: SortOrder;
}

export interface FilterValues extends Sorting {
  page: number;
}

export type FilterUpdater = (update: Partial<FilterValues>) => void;

export interface FilterShape {
  filter: Partial<FilterValues>;
  update: FilterUpdater;
  setFields: (fields?: Array<keyof FilterValues>) => void;
}
