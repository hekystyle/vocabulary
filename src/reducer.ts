import { combineReducers } from '@reduxjs/toolkit';
import { dictionarySlice, recordsReducer } from 'routes/list/reducer';
import { practiceReducer } from 'routes/practice/reducer';

export const rootReducer = combineReducers({
  records: recordsReducer,
  dictionary: dictionarySlice.reducer,
  practice: practiceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
