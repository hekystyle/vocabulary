import { computeAnswersAbsoluteScore } from 'utils/computeAnswersAbsoluteScore';
import { computeAnswersRelativeScore } from 'utils/computeAnswersRelativeScore';

export enum ScoreAlgorithm {
  relative,
  absolute,
}

export const SCORE_ALGO_MAP = {
  [ScoreAlgorithm.relative]: computeAnswersRelativeScore,
  [ScoreAlgorithm.absolute]: computeAnswersAbsoluteScore,
} as const;
