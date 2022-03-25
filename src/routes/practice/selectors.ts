import { last } from 'ramda';
import { AppState } from 'reducer';
import { Term } from 'types/Term';

export const selectIsActive = (state: AppState): boolean => state.practice.session.isActive;

export const selectIsAnswerRevealed = (state: AppState): boolean => state.practice.session.isRevealed;

export const selectLastQueueId = (state: AppState): undefined | Term['id'] => last(state.practice.session.stack);

export const selectPlayAfterReveal = (state: AppState): boolean =>
  state.practice.session.config?.playAfterReveal ?? false;
