import { AppDb } from './db';
import { TermsRepository } from './terms';

export interface Services {
  env: Pick<ImportMetaEnv, 'DEV' | 'VITE_DELAY'>;
  db: AppDb;
  termsRepository: TermsRepository;
}
