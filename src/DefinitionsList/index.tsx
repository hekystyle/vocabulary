import { useEffect, useState } from "react";
import { ApiResult, Word } from "../types";

export interface DefinitionsListProps {
  word: string;
  onDefinitionClick?: (value: {
    partOfSpeech: string;
    definition: string;
  }) => void;
}

export function DefinitionsList(props: DefinitionsListProps) {
  const { word, onDefinitionClick } = props;
  const [entry, setEntry] = useState<Word | undefined>();

  useEffect(() => {
    if (word === "") {
      setEntry(undefined);
      return;
    }
    const controller = new AbortController();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((result: ApiResult) => {
        setEntry(result[0]);
      })
      .catch((reason) => console.error(reason));

    return () => controller.abort();
  }, [word]);

  return (
    <ul>
      {entry?.meanings.map((meaning, i) => (
        <li key={i}>
          {meaning.partOfSpeech}
          <ul>
            {meaning.definitions.map((definition, j) => (
              <li
                key={j}
                onClick={() =>
                  onDefinitionClick &&
                  onDefinitionClick({
                    partOfSpeech: meaning.partOfSpeech,
                    definition: definition.definition,
                  })
                }
              >
                {definition.definition}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
