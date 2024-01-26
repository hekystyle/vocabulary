import { AppDb } from '@/services/db';
import { SynchronizerService } from '@/synchronization/service';
import { AuthApiClient } from './auth-api-client';
import { Container } from './Container';
import { HttpTermsApi } from './http-terms-api';
import { LocalDateStorage } from './LocalDateStorage';
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
    indexedDbTermsRepository: ({ get }) => new IndexedDbTermsRepository(get('db')),
    termsRepository: ({ get }) => {
      const env = get('env');
      const repo = get('indexedDbTermsRepository');

      return env.DEV
        ? new DelayedTermsRepository(repo, env.VITE_DELAY ? parseInt(env.VITE_DELAY, 10) : DEFAULT_DELAY)
        : repo;
    },
    authApiClient: () => new AuthApiClient(),
    httpTermsApi: () => new HttpTermsApi(),
    synchronizer: ({ get }) =>
      new SynchronizerService(
        get('httpTermsApi'),
        get('indexedDbTermsRepository'),
        get('lastUpdateSyncedFromServerStorage'),
      ),
    lastUpdateSyncedFromServerStorage: () => new LocalDateStorage('lastUpdateSyncedFromServer'),
  });
