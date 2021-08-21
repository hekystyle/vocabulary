import { groupWith } from "ramda";
import { useState } from "react";
import { DictionaryEntry } from "types/DictionaryEntry";
import {
  computeAnswersScore,
  hasDefinition,
  hasTranslation,
  shuffle,
} from "utils";

interface Session {
  stack: DictionaryEntry[];
  actualRecord?: DictionaryEntry;
}

export const useSession = (records: DictionaryEntry[]) => {
  const [{ actualRecord }, setProgress] = useState<Session>(() => {
    const filteredRecords = records.filter(
      (p) => hasTranslation(p) || hasDefinition(p)
    );

    const stack = groupWith(
      (a, b) => computeAnswersScore(a) === computeAnswersScore(b),
      filteredRecords
    )
      .map((list) => shuffle(list))
      .reduce((prev, curr) => [...prev, ...curr], []);

    const actualRecord = stack.pop();

    return { stack, actualRecord };
  });

  return {
    actualRecord,
    next: () =>
      setProgress((state) => {
        const stack = [...(state?.stack ?? [])];

        const actualRecord = stack.pop();

        return { stack, actualRecord };
      }),
  };
};
