import { AppDb } from 'services/db';
import { Services } from 'services/di';
import { TestTermsRepository } from './termsRepository';

const db = new AppDb('Vocabulary');

export const TEST_SERVICES = {
  db,
  termsRepository: new TestTermsRepository(),
} satisfies Services;
