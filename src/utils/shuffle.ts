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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    copy[total] = copy[index]!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    copy[index] = temp!;
  }

  return copy;
}
