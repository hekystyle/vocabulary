import { combineReducers } from '@reduxjs/toolkit';
import { tableSlice } from './slices';

export const recordsReducer = combineReducers({
  table: tableSlice.reducer,
});
