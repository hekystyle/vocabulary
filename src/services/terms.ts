import { Term } from 'types/Term';
import { AppDb } from './db';

export interface ITermsApiClient {
  getOne(args: { id: Term['id'] }): Promise<Term | undefined>;
}

export class TermsApiClient implements ITermsApiClient {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private db: AppDb) {}

  async getOne(args: { id: Term['id'] }): Promise<Term | undefined> {
    return args.id !== undefined ? this.db.terms.get(args.id) : undefined;
  }
}
