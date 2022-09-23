import { AppDb } from 'db';
import { IndexedDbTermsRepository, ITermsRepository } from './terms';

export type Services = Readonly<{
  db: AppDb;
  termsRepository: ITermsRepository;
}>;

const db = new AppDb('Vocabulary');
export const SERVICES: Services = {
  db,
  termsRepository: new IndexedDbTermsRepository(db),
};
