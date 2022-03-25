import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableState {
  page: number;
}

export const tableSlice = createSlice({
  name: 'records/table',
  initialState: {
    page: 1,
  } as TableState,
  reducers: {
    update: (state, { payload }: PayloadAction<Partial<TableState>>) => ({
      ...state,
      ...payload,
    }),
  },
});
