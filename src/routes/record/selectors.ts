import { createSelector } from "reselect";
import { selectAll } from "routes/list/adapters";

export const selectTermOptions = createSelector(selectAll, (terms) =>
  terms.map(({ word }) => ({ value: word }))
);

export const selectUniqPartOfSpeechOptions = createSelector(
  selectAll,
  (terms) =>
    Array.from(new Set(terms.map((term) => term.partOfSpeech))).map(
      (partOfSpeech) => ({ value: partOfSpeech })
    )
);
