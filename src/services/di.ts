import { AppDb } from 'db';
import { DelayedTermsRepository, IndexedDbTermsRepository, TermsRepository } from './terms';

export interface Services {
  db: AppDb;
  termsRepository: TermsRepository;
}

const DEFAULT_DELAY = 250 as const;

const db = new AppDb('Vocabulary');
export const SERVICES: Services = {
  db,
  termsRepository:
    process.env.NODE_ENV === 'development'
      ? new DelayedTermsRepository(
          new IndexedDbTermsRepository(db),
          process.env.DELAY ? parseInt(process.env.DELAY, 10) : DEFAULT_DELAY,
        )
      : new IndexedDbTermsRepository(db),
};
