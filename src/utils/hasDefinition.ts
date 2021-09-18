export interface Definable {
  definition: string;
}

export const hasDefinition = (definable: Definable) =>
  definable.definition !== "";
