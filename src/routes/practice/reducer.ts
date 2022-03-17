import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { groupWith } from 'ramda';
import { Term } from 'types/Term';
import { hasDefinition } from 'utils/hasDefinition';
import { hasTranslation } from 'utils/hasTranslation';
import { shuffle } from 'utils/shuffle';
import { ScoreAlgorithm, SCORE_ALGO_MAP } from './constants';

export interface Config {
  scoreAlgorithm: ScoreAlgorithm;
  playAfterReveal: boolean;
  ignoreScoreOfNewTerms: boolean;
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
  name: 'practice/session',
  initialState,
  reducers: {
    start: {
      reducer: (state, { payload: { stack, config } }: PayloadAction<{ stack: number[]; config: Config }>) => ({
        config,
        isActive: true,
        stack,
        isRevealed: false,
      }),
      prepare: (config: Config, terms: Term[]) => {
        const { ignoreScoreOfNewTerms, scoreAlgorithm } = config;
        const filteredTerms = terms.filter(p => hasTranslation(p) || hasDefinition(p));

        const computedRecords = filteredTerms
          .map(term => ({
            id: term.id,
            score: ignoreScoreOfNewTerms && term.answersCount < 10 ? 0 : SCORE_ALGO_MAP[scoreAlgorithm](term),
          }))
          .sort((a, b) => b.score - a.score);

        const stack = groupWith((a, b) => a.score === b.score, computedRecords)
          .map(list => shuffle(list))
          .reduce<number[]>((currentStack, newTerms) => [...currentStack, ...newTerms.map(p => p.id)], []);
        return {
          payload: {
            config,
            stack,
          },
        };
      },
    },
    reveal: state => ({
      ...state,
      isRevealed: true,
    }),
    next: state => {
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
