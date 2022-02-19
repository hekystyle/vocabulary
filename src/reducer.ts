import { combineReducers } from '@reduxjs/toolkit';
import { recordsReducer } from 'routes/list/reducers';
import { dictionarySlice } from 'routes/list/slices';
import { practiceReducer } from 'routes/practice/reducer';

export const rootReducer = combineReducers({
  records: recordsReducer,
  dictionary: dictionarySlice.reducer,
  practice: practiceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
