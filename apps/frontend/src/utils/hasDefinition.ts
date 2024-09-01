export interface Definable {
  definition: string;
}

export const hasDefinition = (definable: Definable): boolean => definable.definition !== '';
