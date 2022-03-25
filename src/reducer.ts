import { combineReducers } from '@reduxjs/toolkit';
import { recordsReducer } from 'routes/list/reducers';
import { practiceReducer } from 'routes/practice/reducer';

export const rootReducer = combineReducers({
  records: recordsReducer,
  practice: practiceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
