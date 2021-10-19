import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Term } from "types/Term";
import { termAdapter } from "./adapters";

export interface Answer<T> {
  isCorrect: boolean;
  entity: T;
}

const initialState = termAdapter.getInitialState();

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    addOne: {
      reducer: termAdapter.addOne,
      prepare: (entry: Term) => {
        return {
          payload: {
            ...entry,
            id: Date.now(),
          },
        };
      },
    },
    updateOne: termAdapter.updateOne,
    removeOne: termAdapter.removeOne,
    answer: (
      state,
      { payload: { entity, isCorrect } }: PayloadAction<Answer<Term>>
    ) => {
      const record = state.entities[entity.id];
      if (record) {
        record.answersCount++;
        if (isCorrect) record.correctAnswersCount++;
      }
    },
  },
});

export interface TableState {
  page: number;
}

export const tableSlice = createSlice({
  name: "records/table",
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

export const recordsReducer = combineReducers({
  table: tableSlice.reducer,
});
