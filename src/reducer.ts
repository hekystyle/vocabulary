import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DictionaryEntry } from "./types/DictionaryEntry";
import { Answer } from "./utils";

export type AppState = DictionaryEntry[];

const initialState: AppState = [];

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    create: {
      reducer: (state, action: PayloadAction<DictionaryEntry>) =>
        state.concat(action.payload),
      prepare: (entry: DictionaryEntry) => {
        return {
          payload: {
            id: Date.now(),
            ...entry,
          },
        };
      },
    },
    update: (state, action: PayloadAction<DictionaryEntry>) => {
      const i = state.findIndex((p) => p.id === action.payload.id);
      if (i > -1) state[i] = action.payload;
      return state;
    },
    delete: (state, action: PayloadAction<DictionaryEntry>) =>
      state.filter((p) => p.id !== action.payload.id),
    answer: (
      state,
      { payload: { entity, isCorrect } }: PayloadAction<Answer<DictionaryEntry>>
    ) => {
      const record = state.find((p) => p.id === entity.id);
      if (record) {
        record.answersCount++;
        if (isCorrect) record.correctAnswersCount++;
      }
    },
  },
});
