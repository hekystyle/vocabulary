import { AppDb } from 'services/db';
import { Container } from './Container';
import { Services } from './Services';
import { DelayedTermsRepository, IndexedDbTermsRepository, TermsRepository } from './terms';

const DEFAULT_DELAY = 250 as const;

export class AppContainer extends Container<Services> implements Services {
  constructor() {
    super({
      db: () => new AppDb('Vocabulary'),
      termsRepository: ({ get }) => {
        const database = get('db');
        const repo = new IndexedDbTermsRepository(database);

        return import.meta.env.DEV
          ? new DelayedTermsRepository(
              repo,
              import.meta.env.VITE_DELAY ? parseInt(import.meta.env.VITE_DELAY, 10) : DEFAULT_DELAY,
            )
          : repo;
      },
    });
  }

  get db(): AppDb {
    return this.get('db');
  }

  get termsRepository(): TermsRepository {
    return this.get('termsRepository');
  }
}
