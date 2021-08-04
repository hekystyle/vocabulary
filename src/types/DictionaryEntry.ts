import { AnswersCountable, Definable } from "../utils";

export interface DictionaryEntry extends AnswersCountable, Definable {
  id?: number;
  word: string;
  partOfSpeech: string;
  translation: string;
}
