import { db } from 'db';
import { Term } from 'types/Term';
import { computeSkip, Pagination } from 'utils/computeSkip';

export const getTerms = async ({ page, pageSize }: Pagination): Promise<{ terms: Term[]; total: number }> => {
  const skip = computeSkip({ page, pageSize });

  const [terms, total] = await Promise.all([
    db.terms.orderBy('createdAt').offset(skip).limit(pageSize).toArray(),
    db.terms.count(),
  ]);

  return { terms, total };
};
