import { baseContainer } from 'services/baseContainer';
import { TestTermsRepository } from './termsRepository';

export const testContainer = () =>
  baseContainer()
    .overrideFactory('env', () => ({
      DEV: true,
      VITE_DELAY: String(0),
    }))
    .overrideFactory('termsRepository', () => new TestTermsRepository());
