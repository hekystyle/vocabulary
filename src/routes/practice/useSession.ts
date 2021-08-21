import { groupWith } from "ramda";
import { useState } from "react";
import { DictionaryEntry } from "types/DictionaryEntry";
import {
  computeAnswersRelativeScore,
  hasDefinition,
  hasTranslation,
  shuffle,
} from "utils/utils";

interface Session {
  stack: number[];
  selected: number | undefined;
}

export const useSession = (records: DictionaryEntry[]) => {
  const [{ selected }, setProgress] = useState<Session>(() => {
    const filteredRecords = records.filter(
      (p) => hasTranslation(p) || hasDefinition(p)
    );

    const computedRecords = filteredRecords
      .map((r) => ({
        id: r.id,
        score: computeAnswersRelativeScore(r),
      }))
      .sort((a, b) => b.score - a.score);

    const stack = groupWith((a, b) => a.score === b.score, computedRecords)
      .map((list) => shuffle(list))
      .reduce<number[]>(
        (acc, current) => [
          ...acc,
          ...current.map((p) => p.id ?? -1).filter((id) => id !== -1),
        ],
        []
      );

    const currentID = stack.pop();

    return { stack, selected: currentID };
  });

  return {
    selected,
    next: () =>
      setProgress((state) => {
        const stack = [...(state?.stack ?? [])];

        const actualRecord = stack.pop();

        return { stack, selected: actualRecord };
      }),
  };
};
