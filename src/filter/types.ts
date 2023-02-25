import { SortOrder } from 'antd/es/table/interface';

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
  setFields: (fields?: ReadonlyArray<keyof FilterValues>) => void;
}
