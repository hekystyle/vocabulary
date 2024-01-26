import { AnswersCountable } from '@/utils/types';
import { StrictOmit } from './StrictOmit';

export interface TermV1 extends AnswersCountable {
  id: number;
  word: string;
  partOfSpeech: string;
  translation: string;
  definition: string;
}

export interface TermV2 extends Omit<TermV1, 'id'> {
  id?: number;
  readonly createdAt?: Date;
}

export interface TermV3 extends TermV2 {
  tags: string[];
}

export interface Term extends StrictOmit<TermV3, 'createdAt'> {
  serverId?: string | null;
  updatedAt: Date;
  createdAt: Date;
}
