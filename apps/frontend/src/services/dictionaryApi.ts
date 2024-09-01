import { z } from 'zod';

export const definitionSchema = z.object({
  definition: z.string(),
  synonyms: z.array(z.string()),
  antonyms: z.array(z.string()),
  example: z.string().optional().default(''),
});

export type Definition = z.infer<typeof definitionSchema>;

export const meaningSchema = z.object({
  partOfSpeech: z.string(),
  definitions: z.array(definitionSchema),
  synonyms: z.array(z.string()),
  antonyms: z.array(z.string()),
});

export type Meaning = z.infer<typeof meaningSchema>;

export const licenseSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export type License = z.infer<typeof licenseSchema>;

export const phoneticSchema = z.object({
  text: z.string(),
  audio: z.string().url(),
  sourceUrl: z.string().url(),
  license: licenseSchema,
});

export type Phonetic = z.infer<typeof phoneticSchema>;

export const wordSchema = z.object({
  word: z.string(),
  phonetic: z.string(),
  phonetics: z.array(phoneticSchema),
  meanings: z.array(meaningSchema),
  license: licenseSchema,
  sourceUrls: z.array(z.string().url()),
});

export type Word = z.infer<typeof wordSchema>;

export const fetchWord = async (word: string, { signal }: Pick<RequestInit, 'signal'> = {}): Promise<Word[]> => {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${encodeURIComponent(word)}`, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  });

  const data: unknown = await response.json();

  return z.array(wordSchema).parse(data);
};
