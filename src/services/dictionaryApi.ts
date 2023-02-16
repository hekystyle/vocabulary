/* eslint-disable max-classes-per-file */
import { plainToInstance, Type } from 'class-transformer';
import { IsArray, IsDefined, IsString, IsUrl, ValidateNested, validateOrReject } from 'class-validator';

export class Definition {
  @IsDefined()
  @IsString()
  definition!: string;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  synonyms!: string[];

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  antonyms!: string[];

  @IsString()
  example = '';
}

export class Meaning {
  @IsDefined()
  @IsString()
  partOfSpeech!: string;

  @IsDefined()
  @IsArray()
  @Type(() => Definition)
  @ValidateNested({ each: true })
  definitions!: Definition[];

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  synonyms!: string[];

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  antonyms!: string[];
}

class License {
  @IsDefined()
  @IsString()
  name!: string;

  @IsDefined()
  @IsUrl()
  url!: string;
}

class Phonetic {
  @IsDefined()
  @IsString()
  text!: string;

  @IsDefined()
  @IsUrl()
  audio!: string;

  @IsDefined()
  @IsUrl()
  sourceUrl!: string;

  @IsDefined()
  @Type(() => License)
  @ValidateNested()
  license!: License;
}

export class Word {
  @IsDefined()
  @IsString()
  word!: string;

  @IsDefined()
  @IsString()
  phonetic!: string;

  @IsDefined()
  @IsArray()
  @Type(() => Phonetic)
  @ValidateNested({ each: true })
  phonetics!: Phonetic[];

  @IsDefined()
  @IsArray()
  @Type(() => Meaning)
  @ValidateNested({ each: true })
  meanings!: Meaning[];

  @IsDefined()
  @Type(() => License)
  @ValidateNested()
  license!: License;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  sourceUrls!: string[];
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

  await Promise.all(instances.map(async i => await validateOrReject(i)));

  return instances;
};
