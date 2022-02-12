import { AnswersCountable } from 'utils/types';

export interface Term extends AnswersCountable {
  id: number;
  word: string;
  partOfSpeech: string;
  translation: string;
  definition: string;
}
