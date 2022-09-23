/* eslint-disable max-classes-per-file */
import { plainToInstance, Type } from 'class-transformer';
import { IsArray, IsDefined, IsString, ValidateNested, validateOrReject } from 'class-validator';

export interface IWord {
  meanings: IMeaning[];
}

export interface IMeaning {
  partOfSpeech: string;
  definitions: IDefinition[];
}

export interface IDefinition {
  definition: string;
}

export class Definition implements IDefinition {
  @IsDefined()
  @IsString()
  definition = '';
}

export class Meaning implements IMeaning {
  @IsDefined()
  @IsString()
  partOfSpeech = '';

  @IsDefined()
  @IsArray()
  @Type(() => Definition)
  @ValidateNested({ each: true })
  definitions: Definition[] = [];
}

export class Word implements IWord {
  @IsDefined()
  @IsArray()
  @Type(() => Meaning)
  @ValidateNested({ each: true })
  meanings: Meaning[] = [];
}

export const fetchWord = async (word: string, { signal }: Pick<RequestInit, 'signal'> = {}): Promise<Word[]> => {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${encodeURIComponent(word)}`, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  });

  const result: unknown = await response.json();

  if (!Array.isArray(result)) throw new Error(`Invalid response, expected array, got ${typeof result}`);

  const instances = plainToInstance(Word, result);

  await Promise.all(instances.map(async i => validateOrReject(i)));

  return instances;
};
