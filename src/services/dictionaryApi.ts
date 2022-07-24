export interface Word {
  meanings: Meaning[];
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface Definition {
  definition: string;
}

export class DictionaryApi {
  public static async word(word: string, { signal }: Pick<RequestInit, 'signal'> = {}): Promise<Word[]> {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`, {
      headers: {
        Accept: 'application/json',
      },
      signal,
    });

    // TODO: add validation (https://github.com/hekystyle/vocabulary/issues/14)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await response.json();
  }
}
