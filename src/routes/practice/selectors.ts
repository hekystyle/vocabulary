import { last } from 'ramda';
import { AppState } from 'reducer';
import { selectById } from 'routes/list/adapters';
import { Term } from 'types/Term';

export const selectIsActive = (state: AppState): boolean => state.practice.session.isActive;

export const selectIsAnswerRevealed = (state: AppState): boolean => state.practice.session.isRevealed;

export const selectActualRecord = (state: AppState): undefined | Term => {
  const termId = last(state.practice.session.stack);
  return termId ? selectById(state, termId) : undefined;
};

export const selectPlayAfterReveal = (state: AppState): boolean =>
  state.practice.session.config?.playAfterReveal ?? false;
