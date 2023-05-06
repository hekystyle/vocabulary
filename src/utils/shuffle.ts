/**
 * Create new instance of received array and shuffle it.
 * Algorithm source: https://bost.ocks.org/mike/shuffle/
 */
export function shuffle<T>(source: readonly T[]): T[] {
  const copy = [...source];

  let total = copy.length;

  // While there remain elements to shuffle…
  while (total) {
    // Pick a remaining element…
    const index = Math.floor(Math.random() * total);
    total -= 1;

    // And swap it with the current element.
    const temp = copy[total];
    // @ts-expect-error - TS doesn't know that `total` is always less than `copy` length
    copy[total] = copy[index];
    // @ts-expect-error - TS doesn't know that `index` is always less than `copy` length
    copy[index] = temp;
  }

  return copy;
}
