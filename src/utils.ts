/**
 * Shuffle array and return new instance.
 */
export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => (Math.random() > 0.5 ? 1 : -1));
}
