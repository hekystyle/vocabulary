import { AppDb } from './db';
import type { TermsRepository } from './terms';

export interface Services {
  db: AppDb;
  termsRepository: TermsRepository;
}
