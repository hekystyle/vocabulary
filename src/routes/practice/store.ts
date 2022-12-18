import { atom } from 'recoil';
import { Term } from 'types/Term';
import { ScoreAlgorithm } from './constants';

export interface Config {
  scoreAlgorithm: ScoreAlgorithm;
  playAfterReveal: boolean;
  ignoreScoreOfNewTerms: boolean;
  tags: string[];
}

export interface PracticeSession {
  config: Config | undefined;
  isActive: boolean;
  queue: Array<Term['id']>;
  isRevealed: boolean;
}

export const sessionState = atom<PracticeSession>({
  key: 'practice/session',
  default: {
    config: undefined,
    isActive: false,
    queue: [],
    isRevealed: false,
  },
});
