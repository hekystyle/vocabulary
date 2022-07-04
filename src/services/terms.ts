import { AppDb } from 'db';
import { Term } from 'types/Term';
import { computeSkip, Pagination } from 'utils/computeSkip';

type FindArgs = Pagination;

export interface TermsApiClient {
  find(args: FindArgs): Promise<{ terms: Term[]; total: number }>;
}

export class LocalTermsApiClient implements TermsApiClient {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(protected readonly db: AppDb) {}

  public async find(args: FindArgs): Promise<{ terms: Term[]; total: number }> {
    const skip = computeSkip(args);

    const [terms, total] = await Promise.all([
      this.db.terms.orderBy('createdAt').offset(skip).limit(args.pageSize).toArray(),
      this.db.terms.count(),
    ]);

    return { terms, total };
  }
}
