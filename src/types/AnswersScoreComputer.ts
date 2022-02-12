import { AnswersCountable } from 'utils/types';

export type AnswersScoreComputer = <T extends AnswersCountable>(item: T) => number;
