import { useEffect, useState } from "react";
import { DictionaryApi } from "services/dictionaryApi";
import styled from "styled-components";
import { Word } from "types";

const StyledUl = styled.ul`
  color: white;
`;

export interface DefinitionsListProps {
  word: string;
  onPartOfSpeechClick?: (partOfSpeech: string) => void;
  onDefinitionClick?: (values: {
    partOfSpeech: string;
    definition: string;
  }) => void;
}

export function DefinitionsList(props: DefinitionsListProps) {
  const { word, onPartOfSpeechClick, onDefinitionClick } = props;
  const [entry, setEntry] = useState<Word | undefined>();

  useEffect(() => {
    if (word === "") {
      setEntry(undefined);
      return;
    }
    const api = new DictionaryApi();
    api
      .word(word)
      .then((result) => {
        setEntry(result[0]);
      })
      .catch((reason) => console.error(reason));

    return () => api.abort();
  }, [word]);

  return (
    <StyledUl>
      {entry?.meanings.map((meaning, i) => (
        <li key={i}>
          <div
            onClick={() =>
              onPartOfSpeechClick && onPartOfSpeechClick(meaning.partOfSpeech)
            }
          >
            {meaning.partOfSpeech}
          </div>
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
    </StyledUl>
  );
}
