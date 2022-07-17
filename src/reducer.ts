import { combineReducers } from '@reduxjs/toolkit';
import { practiceReducer } from 'routes/practice/reducer';

export const rootReducer = combineReducers({
  practice: practiceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
