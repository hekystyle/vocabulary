import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import styled from 'styled-components';
import * as DictionaryApi from '@/services/dictionaryApi';
import type { Word } from '@/services/dictionaryApi';
import { QUERY_KEYS } from '@/utils/queryKeys';

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

  const { data: entry } = useQuery({
    queryKey: QUERY_KEYS.dictionary.word(word),
    queryFn: async ({ signal }): Promise<Word | undefined> => {
      const result = await DictionaryApi.fetchWord(word, { signal });
      return result[0];
    },
    enabled: word !== '',
  });

  return (
    <StyledUl key={word}>
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
