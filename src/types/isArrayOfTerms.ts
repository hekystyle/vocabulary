import { isTerm } from './isTerm';
import { Term } from './Term';

export function isArrayOfTerms(val: unknown): val is Term[] {
  return Array.isArray(val) && val.every(item => isTerm(item));
}
