import { Definable, hasDefinition, hasTranslation, Translateable } from "utils/utils";

export enum Knowledge {
  translation,
  definition,
}

export const FILTERS = {
  [Knowledge.definition]: hasDefinition,
  [Knowledge.translation]: hasTranslation,
};

export const SELECTORS = {
  [Knowledge.definition]: (d: Definable) => d.definition,
  [Knowledge.translation]: (t: Translateable) => t.translation,
};
