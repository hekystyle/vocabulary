export interface FilterValues {
  page: number;
}

export type FilterUpdater = (update: Partial<FilterValues>) => void;

export interface FilterShape {
  filter: Partial<FilterValues>;
  update: FilterUpdater;
  setFields: (fields?: Array<keyof FilterValues>) => void;
}
