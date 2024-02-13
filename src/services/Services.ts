import { AuthApiClient } from './auth-api-client';
import { AppDb } from './db';
import { HttpTermsApi } from './http-terms-api';
import { TermsRepository } from './terms';

export type Env = Pick<ImportMetaEnv, 'DEV' | 'VITE_DELAY'>;

export interface Services {
  env: Env;
  db: AppDb;
  termsRepository: TermsRepository;
  authApiClient: AuthApiClient;
  httpTermsApi: HttpTermsApi;
}
