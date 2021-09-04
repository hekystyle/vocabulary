import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { practiceReducer } from "routes/practice/reducer";
import { DictionaryEntry } from "./types/DictionaryEntry";
import { Answer } from "./utils/utils";

const initialState: DictionaryEntry[] = [];

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
            ...entry,
            id: Date.now(),
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

export const rootReducer = combineReducers({
  dictionary: dictionarySlice.reducer,
  practice: practiceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
