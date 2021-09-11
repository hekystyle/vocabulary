import { AnswersCountable, Definable } from "../utils/utils";

export interface Term extends AnswersCountable, Definable {
  id: number;
  word: string;
  partOfSpeech: string;
  translation: string;
}
