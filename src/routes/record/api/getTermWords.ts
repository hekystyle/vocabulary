import { DefaultOptionType } from 'antd/lib/select';
import { AppDb } from 'services/db';
import { options } from '../utils/options';

export const getTermWords =
  (db: AppDb) =>
  async (search: string): Promise<string[]> => {
    const set = new Set<string>();
    await db.terms
      .where('word')
      .startsWithIgnoreCase(search)
      .each(term => {
        set.add(term.word);
      });
    return Array.from(set);
  };

export const getTermWordsOptions =
  (db: AppDb) =>
  async (search: string): Promise<DefaultOptionType[]> => {
    const words = await getTermWords(db)(search);
    return options(words);
  };
