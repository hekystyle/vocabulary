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
  private controller = new AbortController();

  public abort() {
    this.controller.abort();
  }

  public async word(word: string): Promise<Word[]> {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`,
      {
        headers: {
          Accept: "application/json",
        },
        signal: this.controller.signal,
      }
    );

    return await response.json();
  }
}
