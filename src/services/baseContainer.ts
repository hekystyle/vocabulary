import { AppDb } from 'services/db';
import { Container } from './Container';
import { Services } from './Services';
import { DelayedTermsRepository, IndexedDbTermsRepository } from './terms';

const DEFAULT_DELAY = 250 as const;

export const baseContainer = () =>
  /**
   * Shared container for prod, dev and test environments.
   */
  new Container<Services>({
    env: () => {
      throw new Error('Override env factory');
    },
    db: () => new AppDb('Vocabulary'),
    termsRepository: ({ get }) => {
      const database = get('db');
      const env = get('env');
      const repo = new IndexedDbTermsRepository(database);

      return env.DEV
        ? new DelayedTermsRepository(repo, env.VITE_DELAY ? parseInt(env.VITE_DELAY, 10) : DEFAULT_DELAY)
        : repo;
    },
  });
