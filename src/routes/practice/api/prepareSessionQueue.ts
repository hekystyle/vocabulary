import { db } from 'db';
import { groupWith } from 'ramda';
import { Term } from 'types/Term';
import { hasDefinition } from 'utils/hasDefinition';
import { hasTranslation } from 'utils/hasTranslation';
import { shuffle } from 'utils/shuffle';
import { SCORE_ALGO_MAP } from '../constants';
import { Config } from '../reducer';

export const prepareSessionQueue = async ({
  ignoreScoreOfNewTerms,
  scoreAlgorithm,
}: Config): Promise<Array<Term['id']>> => {
  const computed: Array<{ id: Term['id']; score: number }> = [];

  await db.terms
    .filter(p => hasTranslation(p) || hasDefinition(p))
    .each(term => {
      computed.push({
        id: term.id,
        score: ignoreScoreOfNewTerms && term.answersCount < 10 ? 0 : SCORE_ALGO_MAP[scoreAlgorithm](term),
      });
    });

  computed.sort((a, b) => b.score - a.score);

  const queue = groupWith((a, b) => a.score === b.score, computed)
    .map(list => shuffle(list))
    .reduce<(undefined | number)[]>((currentStack, newTerms) => [...currentStack, ...newTerms.map(p => p.id)], []);

  return queue;
};