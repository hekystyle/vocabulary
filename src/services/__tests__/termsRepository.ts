/* eslint-disable class-methods-use-this */
import { Term } from '@/types/Term';
import { TermsRepository } from '../terms';

export class TestTermsRepository implements TermsRepository {
  get(): Promise<{ terms: Term[]; total: number }> {
    throw new Error('Method not implemented.');
  }

  getById(): Promise<Term | undefined> {
    throw new Error('Method not implemented.');
  }

  create(): Promise<Term | undefined> {
    throw new Error('Method not implemented.');
  }

  update(): Promise<Term | undefined> {
    throw new Error('Method not implemented.');
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getWords(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  getUniquePartsOfSpeech(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  getUniqueTags(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
}
