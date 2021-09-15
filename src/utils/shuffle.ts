/**
 * Shuffle array and return new instance.
 */
export function shuffle<T>(source: readonly T[]): T[] {
  const copy = [...source];

  let total = copy.length;

  // While there remain elements to shuffle…
  while (total) {
    // Pick a remaining element…
    const index = Math.floor(Math.random() * total--);

    // And swap it with the current element.
    const temp = copy[total];
    copy[total] = copy[index];
    copy[index] = temp;
  }

  return copy;
}
