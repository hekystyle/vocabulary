import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { groupWith } from "ramda";
import { DictionaryEntry } from "types/DictionaryEntry";
import { shuffle } from "utils/shuffle";
import {
  computeAnswersAbsoluteScore,
  computeAnswersRelativeScore,
  hasDefinition,
  hasTranslation,
} from "utils/utils";

export enum ScoreAlgorithm {
  relative,
  absolute,
}

const SCORE_ALGO_MAP = {
  [ScoreAlgorithm.relative]: computeAnswersRelativeScore,
  [ScoreAlgorithm.absolute]: computeAnswersAbsoluteScore,
};

export interface Config {
  scoreAlgorithm: ScoreAlgorithm;
  playAfterReveal: boolean;
}

export interface SessionState {
  config: Config | undefined;
  isActive: boolean;
  stack: number[];
  isRevealed: boolean;
}

const initialState: SessionState = {
  config: undefined,
  isActive: false,
  stack: [],
  isRevealed: false,
};

export const sessionSlice = createSlice({
  name: "practice/session",
  initialState,
  reducers: {
    start: {
      reducer: (
        state,
        {
          payload: { stack, config },
        }: PayloadAction<{ stack: number[]; config: Config }>
      ) => ({
        config,
        isActive: true,
        stack,
        isRevealed: false,
      }),
      prepare: (config: Config, terms: DictionaryEntry[]) => {
        const filteredTerms = terms.filter(
          (p) => hasTranslation(p) || hasDefinition(p)
        );

        const computedRecords = filteredTerms
          .map((r) => ({
            id: r.id,
            score: SCORE_ALGO_MAP[config.scoreAlgorithm](r),
          }))
          .sort((a, b) => b.score - a.score);

        const stack = groupWith((a, b) => a.score === b.score, computedRecords)
          .map((list) => shuffle(list))
          .reduce<number[]>(
            (stack, terms) => [...stack, ...terms.map((p) => p.id)],
            []
          );
        return {
          payload: {
            config,
            stack,
          },
        };
      },
    },
    reveal: (state) => ({
      ...state,
      isRevealed: true,
    }),
    next: (state) => {
      state.stack.pop();
      state.isRevealed = false;
      return state;
    },
    close: () => ({
      config: undefined,
      isActive: false,
      stack: [],
      isRevealed: false,
    }),
  },
});

export const practiceReducer = combineReducers({
  session: sessionSlice.reducer,
});
