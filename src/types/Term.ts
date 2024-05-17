import { Key } from 'react';
import { AnswersCountable } from '@/utils/types';

export interface TermV1 extends AnswersCountable {
  id: number;
  word: string;
  partOfSpeech: string;
  translation: string;
  definition: string;
}

export interface TermV2 extends Omit<TermV1, 'id'> {
  id: Key;
  readonly createdAt?: Date;
}

export interface Term extends TermV2 {
  tags: string[];
}
