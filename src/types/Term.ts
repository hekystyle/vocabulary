import { AnswersCountable } from 'utils/types';

export interface TermV1 extends AnswersCountable {
  id: number;
  word: string;
  partOfSpeech: string;
  translation: string;
  definition: string;
}

export interface Term extends Omit<TermV1, 'id'> {
  id?: number;
  readonly createdAt?: Date;
}
