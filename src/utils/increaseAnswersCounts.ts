import { AnswersCountable } from './types';

export const increaseAnswersCounts = <TTerm extends AnswersCountable>(
  term: Readonly<TTerm>,
  increaseCorrect: boolean,
): TTerm => {
  const { answersCount, correctAnswersCount } = term;
  return {
    ...term,
    answersCount: answersCount + 1,
    correctAnswersCount: correctAnswersCount + (increaseCorrect ? 1 : 0),
  };
};
