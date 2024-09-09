export interface Translateable {
  translation: string;
}

export const hasTranslation = (translateable: Translateable): boolean => translateable.translation !== '';
