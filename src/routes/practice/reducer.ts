import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Term } from 'types/Term';
import { ScoreAlgorithm } from './constants';

export interface Config {
  scoreAlgorithm: ScoreAlgorithm;
  playAfterReveal: boolean;
  ignoreScoreOfNewTerms: boolean;
}

export interface SessionState {
  config: Config | undefined;
  isActive: boolean;
  stack: Term['id'][];
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
    start: (state, { payload: { queue, config } }: PayloadAction<{ queue: Term['id'][]; config: Config }>) => ({
      config,
      isActive: true,
      stack: queue,
      isRevealed: false,
    }),
    reveal: state => ({
      ...state,
      isRevealed: true,
    }),
    next: state => {
      state.stack.pop();
      // eslint-disable-next-line no-param-reassign
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
