import { equals } from 'ramda';
import { computeAnswersAbsoluteScore } from '@/utils/computeAnswersAbsoluteScore';
import { computeAnswersRelativeScore } from '@/utils/computeAnswersRelativeScore';

export enum ScoreAlgorithm {
  Relative = 'relative',
  Absolute = 'absolute',
}

export const isScoreAlgorithm = (value: unknown): value is ScoreAlgorithm =>
  typeof value === 'string' && Object.values(ScoreAlgorithm).some(equals(value));

export const SCORE_ALGO_MAP = {
  [ScoreAlgorithm.Relative]: computeAnswersRelativeScore,
  [ScoreAlgorithm.Absolute]: computeAnswersAbsoluteScore,
} as const;
