import { AppState } from 'reducer';

export const selectCurrentPage = (state: AppState): number => state.records.table.page;
