import { DefaultOptionType } from 'antd/lib/select';
import { AppDb } from 'db';
import { options } from '../utils/options';

export const getUniquePartsOfSpeech = (db: AppDb) => async (): Promise<string[]> => {
  const set = new Set<string>();
  await db.terms.each(term => set.add(term.partOfSpeech));
  return [...set];
};

export const getUniquePartOfSpeechOptions = (db: AppDb) => async (): Promise<DefaultOptionType[]> => {
  const partsOfSpeech = await getUniquePartsOfSpeech(db)();
  return options(partsOfSpeech);
};
