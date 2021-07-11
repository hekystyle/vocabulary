/**
 * Shuffle array and return new instance.
 */
export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  newArray.sort(() => (Math.random() > 0.5 ? 1 : -1));
  return newArray;
}
