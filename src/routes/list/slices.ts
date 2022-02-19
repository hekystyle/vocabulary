import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Term } from 'types/Term';
import { termAdapter } from './adapters';

export interface Answer<T> {
  isCorrect: boolean;
  entity: T;
}

const initialState = termAdapter.getInitialState();

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    addOne: {
      reducer: termAdapter.addOne.bind(termAdapter),
      prepare: (entry: Term) => ({
        payload: {
          ...entry,
          id: Date.now(),
        },
      }),
    },
    updateOne: termAdapter.updateOne.bind(termAdapter),
    removeOne: termAdapter.removeOne.bind(termAdapter),
    answer: (state, { payload: { entity, isCorrect } }: PayloadAction<Answer<Term>>) => {
      const record = state.entities[entity.id];
      if (record) {
        record.answersCount += 1;
        if (isCorrect) record.correctAnswersCount += 1;
      }
    },
  },
});

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
