import { DefaultOptionType } from 'antd/lib/select';
import { db } from 'db';
import { options } from '../utils/options';

export const getUniquePartsOfSpeech = async (): Promise<string[]> => {
  const set = new Set<string>();
  await db.terms.each(term => set.add(term.partOfSpeech));
  return [...set];
};

export const getUniquePartOfSpeechOptions = async (): Promise<DefaultOptionType[]> => {
  const partsOfSpeech = await getUniquePartsOfSpeech();
  return options(partsOfSpeech);
};
