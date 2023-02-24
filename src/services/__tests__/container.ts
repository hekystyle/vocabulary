import { Container } from 'services/Container';
import { AppDb } from 'services/db';
import { Services } from 'services/Services';
import { TestTermsRepository } from './termsRepository';

export class TestContainer extends Container<Services> {
  constructor() {
    super({
      db: () => new AppDb('Vocabulary'),
      termsRepository: () => new TestTermsRepository(),
    });
  }
}
