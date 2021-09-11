import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Term } from "types/Term";
import { Answer } from "utils/utils";

const initialState: Term[] = [];

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    create: {
      reducer: (state, action: PayloadAction<Term>) =>
        state.concat(action.payload),
      prepare: (entry: Term) => {
        return {
          payload: {
            ...entry,
            id: Date.now(),
          },
        };
      },
    },
    update: (state, action: PayloadAction<Term>) => {
      const i = state.findIndex((p) => p.id === action.payload.id);
      if (i > -1) state[i] = action.payload;
      return state;
    },
    delete: (state, action: PayloadAction<Term>) =>
      state.filter((p) => p.id !== action.payload.id),
    answer: (
      state,
      { payload: { entity, isCorrect } }: PayloadAction<Answer<Term>>
    ) => {
      const record = state.find((p) => p.id === entity.id);
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
