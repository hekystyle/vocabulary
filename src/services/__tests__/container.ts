import { Container } from 'services/Container';
import { AppDb } from 'services/db';
import { Services } from 'services/Services';
import { TermsRepository } from 'services/terms';
import { TestTermsRepository } from './termsRepository';

export class TestContainer extends Container<Services> implements Services {
  constructor() {
    super({
      db: () => new AppDb('Vocabulary'),
      termsRepository: () => new TestTermsRepository(),
    });
  }

  get db(): AppDb {
    return this.get('db');
  }

  get termsRepository(): TermsRepository {
    return this.get('termsRepository');
  }
}
