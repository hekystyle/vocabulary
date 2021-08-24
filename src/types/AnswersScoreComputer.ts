import { AnswersCountable } from "utils/utils";

export type AnswersScoreComputer = <T extends AnswersCountable>(
  item: T
) => number;
