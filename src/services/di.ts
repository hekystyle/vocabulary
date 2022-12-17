import { AppDb } from 'db';
import { DelayedTermsRepository, IndexedDbTermsRepository, ITermsRepository } from './terms';

export type Services = Readonly<{
  db: AppDb;
  termsRepository: ITermsRepository;
}>;

const DEFAULT_DELAY = 500 as const;

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
