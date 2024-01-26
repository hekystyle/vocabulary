import { SynchronizerService } from '@/synchronization/service';
import { AuthApiClient } from './auth-api-client';
import { AppDb } from './db';
import { HttpTermsApi } from './http-terms-api';
import { Storage } from './Storage';
import { IndexedDbTermsRepository, TermsRepository } from './terms';

export interface Services {
  env: Pick<ImportMetaEnv, 'DEV' | 'VITE_DELAY'>;
  db: AppDb;
  indexedDbTermsRepository: IndexedDbTermsRepository;
  termsRepository: TermsRepository;
  authApiClient: AuthApiClient;
  httpTermsApi: HttpTermsApi;
  synchronizer: SynchronizerService;
  lastUpdateSyncedFromServerStorage: Storage<Date | undefined>;
}
