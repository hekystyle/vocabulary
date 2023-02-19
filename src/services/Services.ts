import { AppDb } from './db';
import { TermsRepository } from './terms';

export interface Services {
  db: AppDb;
  termsRepository: TermsRepository;
}
