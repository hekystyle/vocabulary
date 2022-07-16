import { FC } from 'react';
import { useQuery } from 'react-query';
import { DictionaryApi, Word } from 'services/dictionaryApi';
import styled from 'styled-components';

const StyledUl = styled.ul`
  color: white;
`;

export interface DefinitionsListProps {
  word: string;
  onPartOfSpeechClick?: (partOfSpeech: string) => void;
  onDefinitionClick?: (values: { partOfSpeech: string; definition: string }) => void;
}

export const DefinitionsList: FC<DefinitionsListProps> = props => {
  const { word, onPartOfSpeechClick, onDefinitionClick } = props;

  const { data: entry } = useQuery(
    ['dictionary', word],
    async ({ signal }): Promise<Word | undefined> => {
      if (word === '') return undefined;
      const result = await DictionaryApi.getWord(word, { signal });
      return result[0];
    },
    {
      onError: error => console.error(error),
    },
  );

  return (
    <StyledUl>
      {entry?.meanings.map(meaning => (
        <li key={meaning.partOfSpeech}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => onPartOfSpeechClick?.(meaning.partOfSpeech)}
            onKeyPress={() => onPartOfSpeechClick?.(meaning.partOfSpeech)}
          >
            {meaning.partOfSpeech}
          </div>
          <ul>
            {meaning.definitions.map(definition => (
              <li key={definition.definition}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    onDefinitionClick?.({
                      partOfSpeech: meaning.partOfSpeech,
                      definition: definition.definition,
                    })
                  }
                  onKeyPress={() =>
                    onDefinitionClick?.({
                      partOfSpeech: meaning.partOfSpeech,
                      definition: definition.definition,
                    })
                  }
                >
                  {definition.definition}
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </StyledUl>
  );
};
