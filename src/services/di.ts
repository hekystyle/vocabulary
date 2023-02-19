import { AppDb } from 'services/db';
import { DelayedTermsRepository, IndexedDbTermsRepository, TermsRepository } from './terms';

export interface Services {
  db: AppDb;
  termsRepository: TermsRepository;
}

const DEFAULT_DELAY = 250 as const;

const db = new AppDb('Vocabulary');
export const SERVICES: Services = {
  db,
  termsRepository: import.meta.env.DEV
    ? new DelayedTermsRepository(
        new IndexedDbTermsRepository(db),
        import.meta.env.VITE_DELAY ? parseInt(import.meta.env.VITE_DELAY, 10) : DEFAULT_DELAY,
      )
    : new IndexedDbTermsRepository(db),
};
