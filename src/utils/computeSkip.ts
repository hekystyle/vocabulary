export interface Pagination {
  page: number;
  pageSize: number;
}

export function computeSkip({ page, pageSize }: Pagination): number {
  return (page - 1) * pageSize;
}
