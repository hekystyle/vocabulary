import { DefaultOptionType } from 'antd/lib/select';
import { db } from 'db';
import { options } from '../utils/options';

export const getTermWords = async (search: string): Promise<string[]> => {
  const set = new Set<string>();
  await db.terms
    .where('word')
    .startsWithIgnoreCase(search)
    .each(term => {
      set.add(term.word);
    });
  return Array.from(set);
};

export const getTermWordsOptions = async (search: string): Promise<DefaultOptionType[]> => {
  const words = await getTermWords(search);
  return options(words);
};
