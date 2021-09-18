export interface Translateable {
  translation: string;
}

export const hasTranslation = (translateable: Translateable) =>
  translateable.translation !== "";
