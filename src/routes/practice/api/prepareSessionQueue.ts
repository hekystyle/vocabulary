import { groupWith } from 'ramda';
import { AppDb } from 'services/db';
import { Term } from 'types/Term';
import { hasDefinition } from 'utils/hasDefinition';
import { hasTranslation } from 'utils/hasTranslation';
import { shuffle } from 'utils/shuffle';
import { SCORE_ALGO_MAP } from '../constants';
import { Config } from '../store';

export const prepareSessionQueue =
  (db: AppDb) =>
  async ({ ignoreScoreOfNewTerms, scoreAlgorithm, tags }: Config): Promise<Array<Term['id']>> => {
    const computed: Array<{ id: Term['id']; score: number }> = [];

    const tagsSet = new Set(tags);

    await db.terms
      .filter(
        term =>
          (hasTranslation(term) || hasDefinition(term)) &&
          (tagsSet.size === 0 || term.tags.some(tag => tagsSet.has(tag))),
      )
      .each(term => {
        computed.push({
          id: term.id,
          score: ignoreScoreOfNewTerms && term.answersCount < 10 ? 0 : SCORE_ALGO_MAP[scoreAlgorithm](term),
        });
      });

    computed.sort((a, b) => b.score - a.score);

    return groupWith((a, b) => a.score === b.score, computed)
      .map(list => shuffle(list))
      .reduce<Array<undefined | number>>((queue, newTerms) => [...queue, ...newTerms.map(p => p.id)], []);
  };
